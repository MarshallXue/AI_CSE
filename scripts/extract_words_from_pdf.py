from __future__ import annotations

import argparse
import json
import re
from dataclasses import asdict, dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any

from pypdf import PdfReader


GROUP_RE = re.compile(r"^【第(.+?)组】\s*(.*?)(?:（(\d+)\s*个）)?$")
ENTRY_RE = re.compile(r"^✎\s*(.+?)\s*$")
QUESTION_RE = re.compile(r"^例题\s*(\d+)(?:（(.+?)）)?")
OPTION_RE = re.compile(r"^([A-D])\s*[．.]\s*(.+)$")
OPTION_MARK_RE = re.compile(r"([A-D])\s*[．.]")
PAGE_RE = re.compile(r"^第\s*\d+\s*页$")
SECTION_RE = re.compile(r"^\d+\.\d+\s*(成语解释|真题示例|实词解释)\s*$")
CATEGORY_COUNT_RE = re.compile(r"^(.+?)\s+(\d+)\s+(.+)$")
CATEGORY_ONLY_RE = re.compile(r"^(.+?)\s+(\d+)$")


@dataclass
class WordEntry:
    word: str
    kind: str
    volume: str
    source_file: str
    group_no_raw: str | None = None
    group_name: str | None = None
    group_expected_count: int | None = None
    sub_category: str | None = None
    meaning: str = ""
    examples: list[str] = field(default_factory=list)
    pages: list[int] = field(default_factory=list)


@dataclass
class ExamQuestion:
    question_no: int | None
    source: str | None
    kind: str
    volume: str
    source_file: str
    group_no_raw: str | None = None
    group_name: str | None = None
    stem: str = ""
    options: dict[str, str] = field(default_factory=dict)
    raw_lines: list[str] = field(default_factory=list)
    pages: list[int] = field(default_factory=list)


def clean_line(line: str) -> str:
    line = line.strip()
    line = line.replace("\u200b", "")
    line = re.sub(r"\s+", " ", line)
    return line


def is_noise_line(line: str) -> bool:
    if not line:
        return True
    if PAGE_RE.match(line):
        return True
    if line.startswith("关注“花生十三”公众号"):
        return True
    return False


def normalize_text(parts: list[str]) -> str:
    text = "".join(part.strip() for part in parts if part.strip())
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def clean_word_token(word: str) -> str:
    word = word.strip(" ，,。；;")
    word = re.sub(r"（[^）]*）$", "", word)
    return word.strip()


def detect_volume(pdf_path: Path) -> str:
    if "上册" in pdf_path.name:
        return "上册"
    if "下册" in pdf_path.name:
        return "下册"
    return pdf_path.stem


def strip_group_count(group_name: str) -> tuple[str, int | None]:
    match = re.search(r"（(\d+)\s*个）$", group_name)
    if not match:
        return group_name.strip(), None
    return group_name[: match.start()].strip(), int(match.group(1))


def parse_category_line(line: str) -> tuple[str, list[str]] | None:
    if line.startswith("【例】") or line.startswith("例题"):
        return None
    if SECTION_RE.match(line) or GROUP_RE.match(line) or ENTRY_RE.match(line):
        return None
    if OPTION_RE.match(line):
        return None

    match = CATEGORY_COUNT_RE.match(line)
    if match:
        label = match.group(1).strip()
        words_text = match.group(3).strip()
    else:
        pieces = line.split(maxsplit=1)
        if len(pieces) != 2:
            return None
        label, words_text = pieces[0].strip(), pieces[1].strip()
        if "、" not in words_text and any(marker in words_text for marker in ["。", "；", "："]):
            return None
    if re.fullmatch(r"\d+(?:\.\d+)?", label):
        return None

    words = [
        clean_word_token(word)
        for word in re.split(r"[、，,]", words_text)
        if clean_word_token(word)
    ]
    if not label or not words:
        return None
    return label, words


def parse_category_continuation(line: str) -> list[str] | None:
    if any(marker in line for marker in ["【例】", "例题", "。", "：", "；"]):
        return None
    if SECTION_RE.match(line) or GROUP_RE.match(line) or ENTRY_RE.match(line):
        return None
    if OPTION_RE.match(line):
        return None
    if "、" not in line and " " not in line and len(line) <= 8:
        return [clean_word_token(line)]
    if "、" not in line:
        return None

    words = [
        clean_word_token(word)
        for word in re.split(r"[、，,]", line)
        if clean_word_token(word)
    ]
    return words or None


def looks_like_category_prefix(line: str) -> bool:
    if not line or len(line) > 18:
        return False
    if any(marker in line for marker in ["【", "】", "例题", "。", "：", "；"]):
        return False
    if SECTION_RE.match(line) or ENTRY_RE.match(line) or PAGE_RE.match(line):
        return False
    return True


def parse_question_header(line: str) -> tuple[int | None, str | None] | None:
    match = QUESTION_RE.match(line)
    if not match:
        return None
    question_no = int(match.group(1)) if match.group(1) else None
    source = match.group(2).strip() if match.group(2) else None
    return question_no, source


def extract_options(line: str) -> tuple[str, dict[str, str]] | None:
    matches = list(OPTION_MARK_RE.finditer(line))
    if not matches:
        return None

    leading_text = line[: matches[0].start()].strip()
    options: dict[str, str] = {}
    for index, match in enumerate(matches):
        key = match.group(1)
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(line)
        options[key] = line[start:end].strip()
    return leading_text, options


def append_page(pages: list[int], page_number: int) -> None:
    if not pages or pages[-1] != page_number:
        pages.append(page_number)


def extract_pdf(pdf_path: Path) -> tuple[list[WordEntry], list[ExamQuestion], dict[str, Any]]:
    reader = PdfReader(str(pdf_path))
    volume = detect_volume(pdf_path)
    kind = "unknown"
    group_no_raw: str | None = None
    group_name: str | None = None
    group_expected_count: int | None = None
    pending_group_no: str | None = None
    pending_group_count: int | None = None
    skip_repeated_group_name = False
    group_word_categories: dict[str, str] = {}
    current_category_label: str | None = None
    pending_category_prefix: str | None = None

    entries: list[WordEntry] = []
    questions: list[ExamQuestion] = []
    current_entry: WordEntry | None = None
    current_question: ExamQuestion | None = None
    current_example_parts: list[str] | None = None
    meaning_parts: list[str] = []
    question_stem_parts: list[str] = []

    def finish_example() -> None:
        nonlocal current_example_parts
        if current_entry and current_example_parts:
            example = normalize_text(current_example_parts)
            if example:
                current_entry.examples.append(example)
        current_example_parts = None

    def finish_entry() -> None:
        nonlocal current_entry, meaning_parts
        finish_example()
        if current_entry:
            current_entry.meaning = normalize_text(meaning_parts)
            entries.append(current_entry)
        current_entry = None
        meaning_parts = []

    def finish_question() -> None:
        nonlocal current_question, question_stem_parts
        if current_question:
            current_question.stem = normalize_text(question_stem_parts)
            questions.append(current_question)
        current_question = None
        question_stem_parts = []

    for page_index, page in enumerate(reader.pages, start=1):
        page_text = page.extract_text() or ""
        raw_lines = [clean_line(line) for line in page_text.splitlines()]
        lines = [line for line in raw_lines if not is_noise_line(line)]

        for line in lines:
            if line == "高频成语篇":
                kind = "成语"
                continue
            if line == "高频实词篇":
                kind = "实词"
                continue

            group_match = GROUP_RE.match(line)
            if group_match:
                next_group_no_raw = group_match.group(1).strip()
                inline_name = group_match.group(2).strip()
                inline_name, inline_count = strip_group_count(inline_name)

                if next_group_no_raw == group_no_raw and not inline_name:
                    skip_repeated_group_name = True
                    continue

                finish_question()
                finish_entry()
                group_no_raw = next_group_no_raw
                group_expected_count = int(group_match.group(3)) if group_match.group(3) else None
                if inline_count is not None:
                    group_expected_count = inline_count
                group_word_categories = {}
                current_category_label = None
                pending_category_prefix = None
                if inline_name:
                    group_name = inline_name
                    pending_group_no = None
                    pending_group_count = None
                else:
                    group_name = None
                    pending_group_no = group_no_raw
                    pending_group_count = group_expected_count
                continue

            if skip_repeated_group_name:
                repeated_name, repeated_count = strip_group_count(line)
                if repeated_name == group_name:
                    if repeated_count is not None:
                        group_expected_count = repeated_count
                    skip_repeated_group_name = False
                    continue
                skip_repeated_group_name = False

            if pending_group_no and group_name is None:
                if not SECTION_RE.match(line) and not line.startswith("✎"):
                    group_name, line_count = strip_group_count(line)
                    if line_count is not None:
                        group_expected_count = line_count
                    pending_group_no = None
                    pending_group_count = None
                    continue

            section_match = SECTION_RE.match(line)
            if section_match:
                if section_match.group(1) == "真题示例":
                    finish_entry()
                continue

            if group_name == "近似成语" and "、" in line:
                if current_entry:
                    finish_entry()
                for chunk in line.split():
                    words = parse_category_continuation(chunk)
                    if not words:
                        continue
                    label = "、".join(words)
                    for word in words:
                        group_word_categories.setdefault(word, label)
                    current_category_label = label
                pending_category_prefix = None
                continue

            category = None
            if pending_category_prefix:
                if re.match(r"^\d+\s+", line):
                    pending_category_prefix = None
                else:
                    category = parse_category_line(f"{pending_category_prefix}{line}")
                    if not category:
                        continuation_words = parse_category_continuation(line)
                        if continuation_words:
                            label = pending_category_prefix
                            for word in continuation_words:
                                group_word_categories.setdefault(word, label)
                            current_category_label = label
                            pending_category_prefix = None
                            continue
                        pending_category_prefix = None
            if not category:
                category = parse_category_line(line)
            if category:
                if current_entry:
                    finish_entry()
                label, words = category
                for word in words:
                    group_word_categories.setdefault(word, label)
                current_category_label = label
                pending_category_prefix = None
                continue

            category_only_match = CATEGORY_ONLY_RE.match(line)
            if (
                category_only_match
                and not current_entry
                and not re.fullmatch(r"\d+(?:\.\d+)?", category_only_match.group(1).strip())
            ):
                current_category_label = category_only_match.group(1).strip()
                pending_category_prefix = None
                continue

            if current_category_label and not current_entry:
                continuation_words = parse_category_continuation(line)
                if continuation_words:
                    for word in continuation_words:
                        group_word_categories.setdefault(word, current_category_label)
                    continue

            if not current_entry and looks_like_category_prefix(line):
                pending_category_prefix = line
                continue

            question_header = parse_question_header(line)
            if question_header:
                finish_entry()
                finish_question()
                question_no, source = question_header
                current_question = ExamQuestion(
                    question_no=question_no,
                    source=source,
                    kind=kind,
                    volume=volume,
                    source_file=pdf_path.name,
                    group_no_raw=group_no_raw,
                    group_name=group_name,
                    raw_lines=[line],
                    pages=[page_index],
                )
                continue

            if current_question:
                append_page(current_question.pages, page_index)
                current_question.raw_lines.append(line)
                extracted_options = extract_options(line)
                if extracted_options:
                    leading_text, options = extracted_options
                    if leading_text:
                        question_stem_parts.append(leading_text)
                    current_question.options.update(options)
                elif current_question.options:
                    last_key = next(reversed(current_question.options))
                    current_question.options[last_key] += line
                else:
                    question_stem_parts.append(line)
                continue

            entry_match = ENTRY_RE.match(line)
            if entry_match:
                finish_entry()
                word = entry_match.group(1).strip()
                sub_category = group_word_categories.get(word)
                if sub_category is None and group_name != "近似成语":
                    sub_category = current_category_label
                current_entry = WordEntry(
                    word=word,
                    kind=kind,
                    volume=volume,
                    source_file=pdf_path.name,
                    group_no_raw=group_no_raw,
                    group_name=group_name,
                    group_expected_count=group_expected_count,
                    sub_category=sub_category,
                    pages=[page_index],
                )
                continue

            if current_entry:
                append_page(current_entry.pages, page_index)
                if line.startswith("【例】"):
                    finish_example()
                    current_example_parts = [line.removeprefix("【例】")]
                elif current_example_parts is not None:
                    current_example_parts.append(line)
                else:
                    meaning_parts.append(line)

    finish_question()
    finish_entry()

    summary = {
        "source_file": pdf_path.name,
        "volume": volume,
        "pages": len(reader.pages),
        "entries": len(entries),
        "questions": len(questions),
        "entry_kind_counts": count_by(entries, "kind"),
    }
    return entries, questions, summary


def count_by(items: list[Any], attr: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for item in items:
        key = getattr(item, attr) or "unknown"
        counts[key] = counts.get(key, 0) + 1
    return counts


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract vocabulary entries from civil-service PDF wordbooks.")
    parser.add_argument("--words-dir", type=Path, default=Path("words"))
    parser.add_argument("--output-dir", type=Path, default=Path("words/parsed"))
    args = parser.parse_args()

    pdf_paths = sorted(args.words_dir.glob("*.pdf"))
    if not pdf_paths:
        raise SystemExit(f"No PDF files found in {args.words_dir}")

    all_entries: list[WordEntry] = []
    all_questions: list[ExamQuestion] = []
    source_summaries: list[dict[str, Any]] = []

    for pdf_path in pdf_paths:
        entries, questions, summary = extract_pdf(pdf_path)
        all_entries.extend(entries)
        all_questions.extend(questions)
        source_summaries.append(summary)

    generated_at = datetime.now().astimezone().isoformat(timespec="seconds")
    entries_data = [asdict(entry) for entry in all_entries]
    questions_data = [asdict(question) for question in all_questions]
    summary_data = {
        "generated_at": generated_at,
        "source_count": len(pdf_paths),
        "sources": source_summaries,
        "total_entries": len(entries_data),
        "total_questions": len(questions_data),
        "entry_kind_counts": {
            "成语": sum(1 for entry in all_entries if entry.kind == "成语"),
            "实词": sum(1 for entry in all_entries if entry.kind == "实词"),
            "unknown": sum(1 for entry in all_entries if entry.kind == "unknown"),
        },
    }

    write_json(args.output_dir / "vocabulary_entries.json", entries_data)
    write_json(args.output_dir / "exam_questions.json", questions_data)
    write_json(args.output_dir / "extraction_summary.json", summary_data)
    write_json(
        args.output_dir / "vocabulary_bundle.json",
        {
            "summary": summary_data,
            "entries": entries_data,
            "questions": questions_data,
        },
    )

    print(json.dumps(summary_data, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
