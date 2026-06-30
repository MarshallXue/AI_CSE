import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookmarkPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Volume2,
  X,
} from "lucide-react";
import vocabularyEntries from "../data/vocabulary-entries.json";
import { pinyin } from "pinyin-pro";

export const VOCAB_OPEN_CALENDAR_EVENT = "ai-cse:vocab-open-calendar";
export const VOCAB_OPEN_SETTINGS_EVENT = "ai-cse:vocab-open-settings";

interface VocabItem {
  id: string;
  word: string;
  pinyin?: string;
  partOfSpeech: string;
  tags: string[];
  definition: string;
  example: string;
  source: string;
}

interface VocabGroup {
  id: string;
  title: string;
  type: string;
  description: string;
  examHint: string;
  masteredCount: number;
  words: VocabItem[];
}

interface RawVocabEntry {
  word: string;
  kind: string;
  volume: string;
  source_file: string;
  group_no_raw: string | null;
  group_name: string | null;
  group_expected_count: number | null;
  sub_category: string | null;
  meaning: string;
  examples: string[];
  pages: number[];
}

function makeGroupTitle(entry: RawVocabEntry) {
  const groupNo = entry.group_no_raw ? `第${entry.group_no_raw}组` : "未分组";
  return `${groupNo} · ${entry.group_name ?? "词汇辨析"}`;
}

function getEntrySource(entry: RawVocabEntry) {
  const pageText = entry.pages.length > 0 ? `第 ${entry.pages.join("、")} 页` : "页码未识别";
  return `${entry.volume} · ${pageText}`;
}

const PINYIN_OVERRIDES: Record<string, string> = {
  虚与委蛇: "xū yǔ wēi yí",
  各行其是: "gè xíng qí shì",
  老调重弹: "lǎo diào chóng tán",
  车载斗量: "chē zài dǒu liáng",
  数见不鲜: "shuò jiàn bù xiān",
};

function getWordPinyin(word: string) {
  return PINYIN_OVERRIDES[word] ?? pinyin(word, {
    toneType: "symbol",
    type: "array",
    toneSandhi: false,
  }).join(" ");
}

function buildVocabGroups(entries: RawVocabEntry[]): VocabGroup[] {
  const groups = new Map<string, VocabGroup>();
  const groupCategories = new Map<string, Set<string>>();

  entries.forEach((entry, index) => {
    const groupKey = [
      entry.volume,
      entry.kind,
      entry.group_no_raw ?? "unknown",
      entry.group_name ?? "词汇辨析",
    ].join("-");
    const category = entry.sub_category ?? undefined;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        id: groupKey,
        title: makeGroupTitle(entry),
        type: entry.kind,
        description: "",
        examHint: "",
        masteredCount: 0,
        words: [],
      });
      groupCategories.set(groupKey, new Set<string>());
    }

    const group = groups.get(groupKey)!;
    if (category) {
      groupCategories.get(groupKey)!.add(category);
    }
    group.words.push({
      id: `${groupKey}-${index}`,
      word: entry.word,
      pinyin: getWordPinyin(entry.word),
      partOfSpeech: entry.kind,
      tags: category ? [entry.volume, category] : [entry.volume],
      definition: entry.meaning || entry.examples[0] || "暂无释义",
      example: entry.examples[0] || "暂无例句",
      source: getEntrySource(entry),
    });
  });

  return Array.from(groups.entries()).map(([groupKey, group]) => {
    const categories = Array.from(groupCategories.get(groupKey) ?? []);
    const previewWords = group.words.slice(0, 6).map((word) => word.word).join("、");
    return {
      ...group,
      type: `${group.type} · ${categories.length} 类`,
      description: categories.slice(0, 4).join("、"),
      examHint: `${group.title.replace(/^第.+?组 · /, "")}：${previewWords}`,
    };
  });
}

function getTodayKey() {
  return formatDateKey(new Date());
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateKey: string, offset: number) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return formatDateKey(date);
}

function formatDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function hashDateKey(dateKey: string) {
  return dateKey.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function getDailyGroups(groups: VocabGroup[], dateKey: string, count: number) {
  if (groups.length === 0) return [];
  const start = hashDateKey(dateKey) % groups.length;
  return Array.from({ length: Math.min(count, groups.length) }, (_, index) => (
    groups[(start + index) % groups.length]
  ));
}

const vocabGroups: VocabGroup[] = [
  {
    id: "productive-force",
    title: "发展动能辨析",
    type: "同义近义",
    description: "围绕经济高质量发展、产业升级和创新驱动的常见政策表达。",
    examHint: "常出现在时政常识、申论概括和公文表达题中。",
    masteredCount: 1,
    words: [
      {
        id: "1",
        word: "新质生产力",
        partOfSpeech: "名词",
        tags: ["高频考点", "2024年热词"],
        definition: "以科技创新为主导，摆脱传统增长路径依赖，具有高科技、高效能、高质量特征的先进生产力形态。",
        example: "习近平强调，要因地制宜发展新质生产力，推动传统产业转型升级。",
        source: "2024年两会政府工作报告",
      },
      {
        id: "1-2",
        word: "高质量发展",
        pinyin: "gāo zhì liàng fā zhǎn",
        partOfSpeech: "名词",
        tags: ["核心表述", "经济政策"],
        definition: "从有没有转向好不好，强调质量、效率、公平、可持续和安全的发展方式。",
        example: "推动高质量发展，是全面建设社会主义现代化国家的首要任务。",
        source: "党的二十大报告",
      },
      {
        id: "1-3",
        word: "新动能",
        pinyin: "xīn dòng néng",
        partOfSpeech: "名词",
        tags: ["经济表达"],
        definition: "由新技术、新产业、新业态、新模式形成的发展动力，强调增长来源的更新。",
        example: "要加快培育新动能，推动传统产业向数字化、智能化方向升级。",
        source: "政府工作报告常用表述",
      },
    ],
  },
  {
    id: "policy-method",
    title: "治理方法辨析",
    type: "易混表达",
    description: "区分政策制定、资源配置和多部门协作时常见的行政管理词。",
    examHint: "容易在言语填空、公文写作和基层治理材料中混用。",
    masteredCount: 0,
    words: [
      {
        id: "2",
        word: "精准施策",
        pinyin: "jīng zhǔn shī cè",
        partOfSpeech: "动词",
        tags: ["行政管理"],
        definition: "针对不同地区、不同群体、不同问题，制定并采取精确、有针对性的政策措施，避免“一刀切”。",
        example: "各地要因地制宜、精准施策，结合本地实际推动经济社会发展。",
        source: "中央政策文件常用表述",
      },
      {
        id: "2-2",
        word: "因地制宜",
        pinyin: "yīn dì zhì yí",
        partOfSpeech: "动词",
        tags: ["政策方法"],
        definition: "根据不同地区的自然条件、资源禀赋和发展阶段采取合适措施。",
        example: "发展县域特色产业，要因地制宜选择主导产业和发展路径。",
        source: "基层治理与乡村振兴材料",
      },
      {
        id: "3",
        word: "统筹协调",
        pinyin: "tǒng chóu xié tiáo",
        partOfSpeech: "动词",
        tags: ["综合管理"],
        definition: "对多方面工作进行全面衡量和整体安排，使各部门、各层级相互配合、协调运转。",
        example: "要统筹协调推进城乡一体化发展，促进资源要素合理流动。",
        source: "政府工作报告、公文写作常用词",
      },
    ],
  },
  {
    id: "shared-prosperity",
    title: "公平发展辨析",
    type: "申论高频",
    description: "辨析共同富裕、均衡发展和协调发展在材料分析中的侧重点。",
    examHint: "适合积累为综合分析题和大作文的规范表达。",
    masteredCount: 1,
    words: [
      {
        id: "4",
        word: "共同富裕",
        pinyin: "gòng tóng fù yù",
        partOfSpeech: "名词",
        tags: ["重大战略", "必考考点"],
        definition: "全体人民通过辛勤劳动和相互帮助，在物质生活和精神生活两个层面共同走向富裕的状态。",
        example: "扎实推进共同富裕，是中国式现代化的重要特征和本质要求。",
        source: "党的二十大报告",
      },
      {
        id: "4-2",
        word: "均衡发展",
        pinyin: "jūn héng fā zhǎn",
        partOfSpeech: "名词",
        tags: ["区域协调"],
        definition: "强调不同区域、城乡、群体之间发展水平差距逐步缩小，公共资源配置更加合理。",
        example: "推进义务教育均衡发展，关键是补齐薄弱地区和薄弱学校短板。",
        source: "公共服务均等化相关材料",
      },
      {
        id: "4-3",
        word: "协调发展",
        pinyin: "xié tiáo fā zhǎn",
        partOfSpeech: "名词",
        tags: ["新发展理念"],
        definition: "强调发展中的整体性和协同性，处理好区域、城乡、经济社会等多方面关系。",
        example: "协调发展注重解决发展不平衡问题，增强发展的整体效能。",
        source: "新发展理念相关材料",
      },
    ],
  },
];

function TagPill({ label, tone = "blue" }: { label: string; tone?: "blue" | "gold" | "green" }) {
  const colors = {
    blue: { color: "#2B5FBF", bg: "#EEF3FF" },
    gold: { color: "#8A6A10", bg: "#FBF4E0" },
    green: { color: "#2E7A3C", bg: "#EAF5EC" },
  }[tone];

  return (
    <span
      className="whitespace-nowrap rounded-[6px] px-[7px] py-[2px] font-['Noto_Sans_SC:Medium',sans-serif] text-[11px] font-medium"
      style={{ color: colors.color, backgroundColor: colors.bg }}
    >
      {label}
    </span>
  );
}

type VocabGroupStatus = "未开始" | "已打开" | "已进入复盘";

function VocabGroupCard({
  group,
  status,
  onOpen,
}: {
  group: VocabGroup;
  status: VocabGroupStatus;
  onOpen: () => void;
}) {
  const previewWords = group.words.slice(0, 5);
  const statusTone = {
    未开始: {
      color: "var(--app-muted)",
      bg: "var(--app-paper)",
      label: "未开始",
    },
    已打开: {
      color: "var(--app-amber)",
      bg: "var(--app-amber-soft)",
      label: "已打开",
    },
    已进入复盘: {
      color: "var(--app-green)",
      bg: "var(--app-green-soft)",
      label: "已进入复盘",
    },
  }[status];

  return (
    <button
      onClick={onOpen}
      className="vocab-stack-pressable mx-4 mb-3 block w-[calc(100%-32px)] rounded-[var(--app-radius-card)] bg-[var(--app-surface)] p-[15px] text-left"
      style={{
        border: "1px solid rgba(30,58,95,0.07)",
        boxShadow: "var(--app-shadow-hairline)",
      }}
      aria-label={`打开${group.title}`}
    >
      <div className="flex items-start justify-between gap-[12px]">
        <div className="min-w-0">
          <div className="flex items-center gap-[8px]">
            <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[9px] bg-[var(--app-navy-soft)]">
              <Layers3 size={15} color="var(--app-navy)" strokeWidth={1.9} />
            </span>
            <p className="truncate text-[16px] font-bold leading-[23px] text-[var(--app-ink)]">
              {group.title}
            </p>
          </div>
          <p className="mt-[6px] text-[12px] leading-[18px] text-[var(--app-muted)]">
            {group.type} · {group.words.length} 个词
          </p>
        </div>

        <span
          className="shrink-0 rounded-full px-[8px] py-[4px] text-[11px] font-medium leading-[15px]"
          style={{ color: statusTone.color, backgroundColor: statusTone.bg }}
        >
          {statusTone.label}
        </span>
      </div>

      {group.description && (
        <p className="app-text-pretty mt-[10px] line-clamp-2 text-[12.5px] leading-[20px] text-[var(--app-body)]">
          {group.description}
        </p>
      )}

      <div className="mt-[13px] flex flex-wrap gap-[7px]">
        {previewWords.map((item) => (
          <span
            key={item.id}
            className="rounded-[10px] bg-[var(--app-paper)] px-[9px] py-[6px] text-[13px] font-medium leading-[18px] text-[var(--app-ink)]"
            style={{ boxShadow: "inset 0 0 0 1px rgba(30,58,95,0.06)" }}
          >
            {item.word}
          </span>
        ))}
      </div>

      <div className="mt-[13px] flex items-center justify-between gap-[12px] border-t border-[rgba(30,58,95,0.07)] pt-[11px]">
        <p className="line-clamp-1 text-[12px] leading-[18px] text-[var(--app-muted)]">
          {group.examHint}
        </p>
        <ChevronRight size={17} color="var(--app-faint)" strokeWidth={2} />
      </div>
    </button>
  );
}

function ModalStackPreview({
  words,
  activeIndex,
}: {
  words: VocabItem[];
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-[20px] top-[34px] z-0 h-[330px]">
      {[2, 1].map((offset) => {
        const item = words[(activeIndex + offset) % words.length];
        return (
          <div
            key={`${item.id}-${offset}`}
            className="absolute inset-x-0 rounded-[22px] bg-white"
            style={{
              height: 318,
              transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.035})`,
              opacity: offset === 1 ? 0.46 : 0.24,
              boxShadow: "0 14px 34px rgba(4,16,32,0.16)",
            }}
          />
        );
      })}
    </div>
  );
}
function VocabDetailCard({
  item,
  examHint,
}: {
  item: VocabItem;
  examHint: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <div
      className="no-scrollbar max-h-[560px] min-h-[360px] overflow-y-auto rounded-[22px] bg-white p-[18px]"
      style={{
        boxShadow: "0 18px 42px rgba(27,45,79,0.16), 0 0 0 0.833px rgba(27,45,79,0.06)",
      }}
    >
      <div className="mb-[10px] flex items-start justify-between gap-[12px]">
        <div>
          <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[24px] font-bold leading-[32px] tracking-[-0.4px] text-[#1B2D4F]">
            {item.word}
          </p>
          {item.pinyin && (
            <p className="mt-[2px] font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] tracking-[0.5px] text-[#7A8FA6]">
              {item.pinyin}
            </p>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f2f6fb]">
            <Volume2 size={15} color="#6d8196" strokeWidth={1.8} />
          </button>
          <button
            onClick={() => setAdded(!added)}
            className="flex h-[32px] items-center gap-[5px] rounded-full px-[10px]"
            style={{
              backgroundColor: added ? "#EEF3FF" : "#f7f9fc",
              color: added ? "#2B5FBF" : "#7A8FA6",
            }}
          >
            {added ? <Check size={13} /> : <BookmarkPlus size={13} />}
            <span className="font-['Noto_Sans_SC:Medium',sans-serif] text-[11px] font-medium">
              {added ? "已加入" : "生词本"}
            </span>
          </button>
        </div>
      </div>

      <div className="mb-[14px] flex flex-wrap gap-[7px]">
        <TagPill label={item.partOfSpeech} />
        {item.tags.map((tag) => (
          <TagPill key={tag} label={tag} tone="gold" />
        ))}
      </div>

      <div className="mb-[14px] rounded-[16px] bg-[#f7f9fc] p-[14px]">
        <p className="mb-[6px] font-['Noto_Sans_SC:Bold',sans-serif] text-[12px] font-bold text-[#7A8FA6]">
          解释
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[14px] leading-[24px] text-[#2E4057]">
          {item.definition}
        </p>
      </div>

      <div className="rounded-[16px] bg-[#f4f7fb] p-[14px]">
        <p className="mb-[6px] font-['Noto_Sans_SC:Bold',sans-serif] text-[12px] font-bold text-[#7A8FA6]">
          例句
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13.5px] leading-[23px] text-[#4A6070]">
          {item.example}
        </p>
      </div>

      <div className="mt-[14px] rounded-[16px] bg-[#f7f9fc] p-[14px]">
        <p className="mb-[6px] font-['Noto_Sans_SC:Bold',sans-serif] text-[12px] font-bold text-[#7A8FA6]">
          辨析提醒
        </p>
        <p className="font-['Noto_Sans_SC:Regular',sans-serif] text-[13px] leading-[22px] text-[#4A6070]">
          {examHint}
        </p>
      </div>

      <p className="mt-[12px] font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#B0BEC8]">
        来源：{item.source}
      </p>
    </div>
  );
}

function VocabGroupSheet({
  group,
  onClose,
}: {
  group: VocabGroup;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const activeItem = group.words[activeIndex];

  const go = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return group.words.length - 1;
      if (next >= group.words.length) return 0;
      return next;
    });
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex items-center justify-center bg-[rgba(10,18,30,0.48)] px-[18px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[360px]"
        initial={{ y: 18, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.96 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalStackPreview words={group.words} activeIndex={activeIndex} />

        <div className="relative z-10 rounded-[28px] bg-[#eef3f8] p-[12px] shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
          <button
            onClick={onClose}
            className="absolute right-[-8px] top-[-10px] z-30 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(27,45,79,0.12)]"
            aria-label="关闭词汇辨析"
          >
            <X size={17} color="#52677E" strokeWidth={2} />
          </button>

          <div
            className="relative"
            onPointerDown={(event) => setDragStart(event.clientX)}
            onPointerUp={(event) => {
              if (dragStart === null) return;
              const delta = event.clientX - dragStart;
              if (Math.abs(delta) > 42) go(delta < 0 ? 1 : -1);
              setDragStart(null);
            }}
            onPointerCancel={() => setDragStart(null)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 28, rotate: 1.5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -24, rotate: -1.2 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <VocabDetailCard item={activeItem} examHint={group.examHint} />
            </motion.div>
          </AnimatePresence>

            <button
              onClick={() => go(-1)}
              className="absolute left-[-6px] top-1/2 z-20 flex h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_22px_rgba(27,45,79,0.16)]"
              aria-label="上一个词语"
            >
              <ChevronLeft size={19} color="#1E3A5F" strokeWidth={2.1} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-[-6px] top-1/2 z-20 flex h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_22px_rgba(27,45,79,0.16)]"
              aria-label="下一个词语"
            >
              <ChevronRight size={19} color="#1E3A5F" strokeWidth={2.1} />
            </button>
          </div>

          <div className="mt-[12px] flex items-center justify-center">
            <div className="flex items-center gap-[6px]">
              {group.words.map((word, index) => (
                <button
                  key={word.id}
                  onClick={() => setActiveIndex(index)}
                  className="h-[6px] rounded-full transition-all"
                  style={{
                    width: activeIndex === index ? 18 : 6,
                    backgroundColor: activeIndex === index ? "#1E3A5F" : "#c9d4e0",
                  }}
                  aria-label={`切换到${word.word}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VocabSettingsSheet({
  dailyGroupCount,
  onChange,
  onClose,
}: {
  dailyGroupCount: number;
  onChange: (count: number) => void;
  onClose: () => void;
}) {
  const options = [1, 2, 3, 4, 5, 6];

  return (
    <motion.div
      className="absolute inset-0 z-[90] flex items-end bg-[rgba(10,18,30,0.32)] px-[14px] pb-[104px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="w-full rounded-[24px] bg-white p-[16px]"
        style={{ boxShadow: "0 22px 56px rgba(4,16,32,0.2)" }}
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-[14px] flex items-center justify-between">
          <div>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[17px] font-bold text-[#1B2D4F]">
              今日词汇设置
            </p>
            <p className="mt-[3px] font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#8da0b4]">
              设置每天自动推送的词汇组数
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f2f6fb]"
            aria-label="关闭设置"
          >
            <X size={16} color="#52677E" strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-[8px]">
          {options.map((count) => {
            const active = dailyGroupCount === count;
            return (
              <button
                key={count}
                onClick={() => onChange(count)}
                className="rounded-[14px] px-[10px] py-[12px] text-center"
                style={{
                  backgroundColor: active ? "#1E3A5F" : "#f4f7fb",
                  color: active ? "#fff" : "#40566d",
                  boxShadow: active ? "0 8px 18px rgba(30,58,95,0.18)" : "0 0 0 0.833px rgba(27,45,79,0.04)",
                }}
              >
                <span className="font-['Noto_Sans_SC:Bold',sans-serif] text-[18px] font-bold">
                  {count}
                </span>
                <span className="ml-[3px] font-['Noto_Sans_SC:Regular',sans-serif] text-[12px]">
                  组
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-[12px] rounded-[14px] bg-[#f7f9fc] px-[12px] py-[10px] font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] leading-[20px] text-[#6b7e94]">
          调整后，今日页会只展示对应数量的词汇组；完整词库仍保留在本地数据里，后面可以接错题库或复盘页。
        </p>
      </motion.div>
    </motion.div>
  );
}

function VocabCalendarSheet({
  todayKey,
  selectedDateKey,
  dailyGroupCount,
  allGroups,
  onSelectDate,
  onClose,
}: {
  todayKey: string;
  selectedDateKey: string;
  dailyGroupCount: number;
  allGroups: VocabGroup[];
  onSelectDate: (dateKey: string) => void;
  onClose: () => void;
}) {
  const days = Array.from({ length: 14 }, (_, index) => addDays(todayKey, -index));

  return (
    <motion.div
      className="absolute inset-0 z-[90] flex items-end bg-[rgba(10,18,30,0.32)] px-[14px] pb-[104px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="no-scrollbar max-h-[560px] w-full overflow-y-auto rounded-[24px] bg-white p-[16px]"
        style={{ boxShadow: "0 22px 56px rgba(4,16,32,0.2)" }}
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-[14px] flex items-center justify-between">
          <div>
            <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[17px] font-bold text-[#1B2D4F]">
              词汇日历
            </p>
            <p className="mt-[3px] font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#8da0b4]">
              回看最近 14 天的每日词汇
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f2f6fb]"
            aria-label="关闭日历"
          >
            <X size={16} color="#52677E" strokeWidth={2} />
          </button>
        </div>

        <div className="space-y-[8px]">
          {days.map((dateKey) => {
            const groups = getDailyGroups(allGroups, dateKey, dailyGroupCount);
            const wordsCount = groups.reduce((sum, group) => sum + group.words.length, 0);
            const selected = selectedDateKey === dateKey;
            return (
              <button
                key={dateKey}
                onClick={() => {
                  onSelectDate(dateKey);
                  onClose();
                }}
                className="block w-full rounded-[16px] px-[12px] py-[11px] text-left"
                style={{
                  backgroundColor: selected ? "#EEF3FF" : "#f7f9fc",
                  boxShadow: selected
                    ? "0 0 0 1px rgba(43,95,191,0.18)"
                    : "0 0 0 0.833px rgba(27,45,79,0.04)",
                }}
              >
                <div className="flex items-center justify-between gap-[10px]">
                  <div>
                    <p className="font-['Noto_Sans_SC:Bold',sans-serif] text-[14px] font-bold text-[#1B2D4F]">
                      {dateKey === todayKey ? "今天" : formatDateLabel(dateKey)}
                    </p>
                    <p className="mt-[3px] line-clamp-1 font-['Noto_Sans_SC:Regular',sans-serif] text-[12px] text-[#6b7e94]">
                      {groups.map((group) => group.title.replace(/^第.+?组 · /, "")).join("、")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-[9px] bg-white px-[8px] py-[4px] font-['Noto_Sans_SC:Medium',sans-serif] text-[11px] font-medium text-[#7A8FA6]">
                    {groups.length} 组 · {wordsCount} 词
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VocabTab() {
  const extractedGroups = useMemo(
    () => buildVocabGroups(vocabularyEntries as RawVocabEntry[]),
    [],
  );
  const allGroups = extractedGroups.length > 0 ? extractedGroups : vocabGroups;
  const todayKey = useMemo(() => getTodayKey(), []);
  const [dailyGroupCount, setDailyGroupCount] = useState(3);
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [openedGroupIds, setOpenedGroupIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const openCalendar = () => setCalendarOpen(true);
    const openSettings = () => setSettingsOpen(true);

    window.addEventListener(VOCAB_OPEN_CALENDAR_EVENT, openCalendar);
    window.addEventListener(VOCAB_OPEN_SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(VOCAB_OPEN_CALENDAR_EVENT, openCalendar);
      window.removeEventListener(VOCAB_OPEN_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const displayGroups = useMemo(
    () => getDailyGroups(allGroups, selectedDateKey, dailyGroupCount),
    [allGroups, dailyGroupCount, selectedDateKey],
  );
  const totalWords = displayGroups.reduce((sum, group) => sum + group.words.length, 0);
  const allWords = allGroups.reduce((sum, group) => sum + group.words.length, 0);
  const masteredWords = displayGroups.reduce((sum, group) => sum + group.masteredCount, 0);
  const progress = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const selectedGroup = useMemo(
    () => displayGroups.find((group) => group.id === selectedGroupId) ?? null,
    [displayGroups, selectedGroupId],
  );

  const getGroupStatus = (groupId: string, index: number): VocabGroupStatus => {
    if (openedGroupIds.has(groupId)) return "已进入复盘";
    if (index === 1) return "已打开";
    return "未开始";
  };

  const openGroup = (groupId: string) => {
    setOpenedGroupIds((current) => new Set(current).add(groupId));
    setSelectedGroupId(groupId);
  };

  return (
    <div className="pt-1 pb-4">
      <div className="mx-4 mb-3 flex items-start justify-between gap-[10px]">
        <div>
          <span style={{ fontSize: 12, color: "#9BAABB" }}>
            {selectedDateKey === todayKey ? "今日" : formatDateLabel(selectedDateKey)} {displayGroups.length} 组 · {totalWords} 个词 · 已掌握 {masteredWords} 词
          </span>
          <p className="mt-[3px] font-['Noto_Sans_SC:Regular',sans-serif] text-[11px] text-[#B0BEC8]">
            词库共 {allGroups.length} 组 · {allWords} 个词
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-[7px]">
          <div className="flex items-center gap-1.5">
            <div
              className="overflow-hidden rounded-full"
              style={{ width: 54, height: 4, backgroundColor: "#E4E9F0" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: "#1E3A5F" }}
              />
            </div>
            <span style={{ fontSize: 11, color: "#9BAABB" }}>{progress}%</span>
          </div>
        </div>
      </div>

      {displayGroups.map((group, index) => (
        <VocabGroupCard
          key={group.id}
          group={group}
          status={getGroupStatus(group.id, index)}
          onOpen={() => openGroup(group.id)}
        />
      ))}

      <p className="mt-2 text-center text-[11px] text-[var(--app-faint)]">
        成组辨析，默认以“需巩固”进入复盘
      </p>

      <AnimatePresence>
        {selectedGroup && (
          <VocabGroupSheet group={selectedGroup} onClose={() => setSelectedGroupId(null)} />
        )}
        {settingsOpen && (
          <VocabSettingsSheet
            dailyGroupCount={dailyGroupCount}
            onChange={setDailyGroupCount}
            onClose={() => setSettingsOpen(false)}
          />
        )}
        {calendarOpen && (
          <VocabCalendarSheet
            todayKey={todayKey}
            selectedDateKey={selectedDateKey}
            dailyGroupCount={dailyGroupCount}
            allGroups={allGroups}
            onSelectDate={setSelectedDateKey}
            onClose={() => setCalendarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
