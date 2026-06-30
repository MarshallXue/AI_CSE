import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { QstheoryArticleExtractorService } from "./qstheory-article-extractor.service";
import { QstheoryListParserService } from "./qstheory-list-parser.service";
import { qstheorySources } from "./qstheory-sources";

type RefreshQstheoryError = {
  sourceId: string;
  target: string;
  message: string;
};

export type RefreshQstheoryResult = {
  saved: number;
  skipped: number;
  errors: RefreshQstheoryError[];
};

const MAX_ARTICLES_PER_SOURCE = 10;

@Injectable()
export class QstheoryRefreshService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly listParser: QstheoryListParserService,
    private readonly articleExtractor: QstheoryArticleExtractorService
  ) {}

  async refresh(): Promise<RefreshQstheoryResult> {
    const errors: RefreshQstheoryError[] = [];
    let saved = 0;
    let skipped = 0;

    for (const source of qstheorySources.filter((item) => item.enabled)) {
      try {
        const html = await this.fetchHtml(source.url);
        const items = this.listParser.parse(html, source.url).slice(0, MAX_ARTICLES_PER_SOURCE);

        for (const item of items) {
          try {
            const articleHtml = await this.fetchHtml(item.link);
            const article = this.articleExtractor.extract(articleHtml, item.link);

            if (!article.content) {
              skipped += 1;
              errors.push({
                sourceId: source.id,
                target: item.link,
                message: "文章正文为空"
              });
              continue;
            }

            await this.prisma.newsArticle.upsert({
              where: {
                link: item.link
              },
              update: {
                sourceId: source.id,
                sourceName: source.name,
                sourceType: "qstheory-list",
                sourceLabel: article.sourceLabel,
                category: source.category,
                title: article.title ?? item.title,
                author: article.author,
                summary: null,
                content: article.content,
                imageUrl: article.imageUrl,
                publishedAt: article.publishedAt,
                fetchedAt: new Date()
              },
              create: {
                sourceId: source.id,
                sourceName: source.name,
                sourceType: "qstheory-list",
                sourceLabel: article.sourceLabel,
                category: source.category,
                title: article.title ?? item.title,
                link: item.link,
                author: article.author,
                summary: null,
                content: article.content,
                imageUrl: article.imageUrl,
                publishedAt: article.publishedAt
              }
            });
            saved += 1;
          } catch (error) {
            errors.push({
              sourceId: source.id,
              target: item.link,
              message: error instanceof Error ? error.message : "未知错误"
            });
          }
        }
      } catch (error) {
        errors.push({
          sourceId: source.id,
          target: source.url,
          message: error instanceof Error ? error.message : "未知错误"
        });
      }
    }

    return {
      saved,
      skipped,
      errors
    };
  }

  private async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8"
      }
    });

    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`);
    }

    return response.text();
  }
}
