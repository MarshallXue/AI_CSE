import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";

export type ExtractedQstheoryArticle = {
  title: string | null;
  author: string | null;
  sourceLabel: string | null;
  publishedAt: Date | null;
  content: string | null;
  imageUrl: string | null;
};

const SECTION_LABELS = new Set([
  "深度调研",
  "求是专访",
  "学习问答",
  "文化中国",
  "理论文选",
  "求是网评",
  "党员来信",
  "体系化学理化研究阐释"
]);

@Injectable()
export class QstheoryArticleExtractorService {
  extract(html: string, pageUrl: string): ExtractedQstheoryArticle {
    const $ = cheerio.load(html);

    $("script, style, nav, footer, header, aside").remove();

    const title = normalize($("h1").first().text());
    const appellations = $(".appellation")
      .toArray()
      .map((item) => normalize($(item).text()))
      .filter((text): text is string => Boolean(text));
    const paragraphs = $("#detailContent p")
      .toArray()
      .map((item) => normalize($(item).text()))
      .filter((text): text is string => Boolean(text && !isSectionLabel(text) && text !== title));

    return {
      title,
      author: readAuthor(appellations),
      sourceLabel: readSourceLabel(appellations),
      publishedAt: parseQstheoryDate(normalize($(".pubtime").first().text())),
      content: paragraphs.length > 0 ? paragraphs.join("\n\n") : null,
      imageUrl: readFirstImageUrl($, pageUrl)
    };
  }
}

export function readSourceLabel(appellations: string[]): string | null {
  const source = appellations.find((item) => item.startsWith("来源："));
  return source?.replace(/^来源：/, "").trim() || null;
}

export function readAuthor(appellations: string[]): string | null {
  const author = appellations.find((item) => item.startsWith("作者："));
  return author?.replace(/^作者：/, "").trim() || null;
}

export function parseQstheoryDate(value: string | null): Date | null {
  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})$/);
  const date = new Date(match ? `${match[1]}T${match[2]}+08:00` : value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readFirstImageUrl($: cheerio.CheerioAPI, pageUrl: string): string | null {
  const value = $("#detailContent img").first().attr("src");

  if (!value) {
    return null;
  }

  return new URL(value, pageUrl).toString();
}

function isSectionLabel(text: string): boolean {
  return SECTION_LABELS.has(text);
}

function normalize(value?: string): string | null {
  const text = (value ?? "")
    .replace(/&emsp;/g, " ")
    .replace(/[\s\u00a0\u3000]+/g, " ")
    .trim();

  return text || null;
}
