import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";

export type ExtractedArticle = {
  title: string | null;
  imageUrl: string | null;
  publishedAt: Date | null;
  content: string | null;
};

@Injectable()
export class ArticleExtractorService {
  extract(html: string, pageUrl: string): ExtractedArticle {
    const $ = cheerio.load(html);

    $("script, style, nav, footer, header, aside").remove();

    const title = this.readTitle($);
    const imageUrl = this.readImageUrl($, pageUrl);
    const publishedAt = this.readPublishedAt($, html);
    const content = this.readArticleText($);

    return {
      title,
      imageUrl,
      publishedAt,
      content
    };
  }

  private readTitle($: cheerio.CheerioAPI): string | null {
    const value =
      $("meta[property='og:title']").attr("content") ??
      $("meta[name='twitter:title']").attr("content") ??
      $("h1").first().text() ??
      $("title").first().text();

    return this.normalize(value);
  }

  private readImageUrl($: cheerio.CheerioAPI, pageUrl: string): string | null {
    const value =
      $("meta[property='og:image']").attr("content") ??
      $("meta[name='twitter:image']").attr("content") ??
      $("article img").first().attr("src") ??
      $("main img").first().attr("src") ??
      $(".left_zw img").first().attr("src");

    if (!value) {
      return null;
    }

    return new URL(value, pageUrl).toString();
  }

  private readPublishedAt($: cheerio.CheerioAPI, html: string): Date | null {
    const value =
      $("meta[property='article:published_time']").attr("content") ??
      $("meta[name='pubdate']").attr("content") ??
      $("time").first().attr("datetime") ??
      $("time").first().text();

    if (value) {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    }

    const commentDate = html.match(/published at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/)?.[1];
    if (!commentDate) {
      return null;
    }

    const date = new Date(`${commentDate.replace(" ", "T")}+08:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private readArticleText($: cheerio.CheerioAPI): string | null {
    const selectors = ["article", "main", ".left_zw", "#cont_1_1_2", ".content", ".article", "body"];

    for (const selector of selectors) {
      const text = this.readBestTextFromContainers($, selector);

      if (text && text.length >= 40) {
        return text;
      }
    }

    return this.readBestTextFromContainers($, selectors.join(", ")) || null;
  }

  private readBestTextFromContainers($: cheerio.CheerioAPI, selector: string): string | null {
    let bestText = "";

    for (const container of $(selector).toArray()) {
      const paragraphs = $(container)
        .find("p")
        .toArray()
        .map((paragraph) => this.normalize($(paragraph).text()))
        .filter((text): text is string => Boolean(text));
      const text = paragraphs.join("\n\n");

      if (text.length > bestText.length) {
        bestText = text;
      }
    }

    return bestText || null;
  }

  private normalize(value?: string): string | null {
    const text = (value ?? "").replace(/\s+/g, " ").trim();
    return text || null;
  }
}
