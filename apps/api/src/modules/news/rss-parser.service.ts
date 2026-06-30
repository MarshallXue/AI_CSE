import { Injectable } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";

export type ParsedRssItem = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
};

type RssItemNode = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
};

@Injectable()
export class RssParserService {
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true
  });

  parse(xml: string): ParsedRssItem[] {
    const parsed = this.parser.parse(xml) as {
      rss?: {
        channel?: {
          item?: RssItemNode | RssItemNode[];
        };
      };
    };
    const rawItems = parsed.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    return items
      .map((item) => ({
        title: this.cleanText(item.title),
        link: this.cleanText(item.link),
        pubDate: this.cleanText(item.pubDate) || undefined,
        description: this.cleanText(item.description) || undefined
      }))
      .filter((item) => item.title && item.link);
  }

  private cleanText(value?: string): string {
    return (value ?? "").replace(/<[^>]*>/g, "").trim();
  }
}
