import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";

export type ParsedQstheoryListItem = {
  title: string;
  link: string;
};

const NAVIGATION_TITLES = new Set(["更多", "首页", "理论资源导航"]);

@Injectable()
export class QstheoryListParserService {
  parse(html: string, sourceUrl: string): ParsedQstheoryListItem[] {
    const $ = cheerio.load(html);
    const seen = new Set<string>();
    const items: ParsedQstheoryListItem[] = [];

    $("a[href]").each((_, element) => {
      const rawHref = $(element).attr("href");
      const title = normalize($(element).text());

      if (!rawHref || !title || isNavigationTitle(title)) {
        return;
      }

      const link = normalizeQstheoryUrl(rawHref, sourceUrl);
      if (!link || !isQstheoryArticleUrl(link) || seen.has(link)) {
        return;
      }

      seen.add(link);
      items.push({ title, link });
    });

    return items;
  }
}

export function isQstheoryArticleUrl(url: string): boolean {
  return /^https:\/\/www\.qstheory\.cn\/\d{8}\/[a-zA-Z0-9]+\/c\.html$/.test(url);
}

export function normalizeQstheoryUrl(rawHref: string, sourceUrl: string): string | null {
  const href = rawHref.trim();
  if (!href || href.startsWith("javascript:") || href.startsWith("#")) {
    return null;
  }

  try {
    const url = new URL(href, sourceUrl);
    if (!["www.qstheory.cn", "qstheory.cn"].includes(url.hostname)) {
      return null;
    }

    const articlePath = url.pathname.match(/\/(\d{8})\/([a-zA-Z0-9]+)\/c\.html$/);
    if (articlePath) {
      url.pathname = `/${articlePath[1]}/${articlePath[2]}/c.html`;
    }

    url.protocol = "https:";
    url.hostname = "www.qstheory.cn";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function isNavigationTitle(title: string): boolean {
  return NAVIGATION_TITLES.has(title);
}

function normalize(value: string): string {
  return value.replace(/[\s\u00a0\u3000]+/g, " ").trim();
}
