import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { ArticleExtractorService } from "./article-extractor.service";
import { NewsArticleResponse, toNewsArticleResponse } from "./news.presenter";
import { rssSources } from "./rss-sources";
import { RssParserService } from "./rss-parser.service";

type RefreshError = {
  sourceId: string;
  message: string;
};

type RefreshNewsResult = {
  saved: number;
  errors: RefreshError[];
};

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rssParser: RssParserService,
    private readonly articleExtractor: ArticleExtractorService
  ) {}

  async refreshNews(): Promise<RefreshNewsResult> {
    const errors: RefreshError[] = [];
    let saved = 0;

    for (const source of rssSources.filter((item) => item.enabled)) {
      try {
        const xml = await this.fetchText(source.url, "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8");
        const items = this.rssParser.parse(xml);

        for (const item of items) {
          const html = await this.fetchText(item.link, "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8");
          const article = this.articleExtractor.extract(html, item.link);
          const publishedAt = article.publishedAt ?? this.parseDate(item.pubDate);

          await this.prisma.newsArticle.upsert({
            where: {
              link: item.link
            },
            update: {
              sourceId: source.id,
              sourceName: source.name,
              category: source.category,
              title: article.title ?? item.title,
              summary: item.description ?? null,
              content: article.content,
              imageUrl: article.imageUrl,
              publishedAt,
              fetchedAt: new Date()
            },
            create: {
              sourceId: source.id,
              sourceName: source.name,
              category: source.category,
              title: article.title ?? item.title,
              link: item.link,
              summary: item.description ?? null,
              content: article.content,
              imageUrl: article.imageUrl,
              publishedAt
            }
          });
          saved += 1;
        }
      } catch (error) {
        errors.push({
          sourceId: source.id,
          message: error instanceof Error ? error.message : "未知错误"
        });
      }
    }

    return {
      saved,
      errors
    };
  }

  async listToday(): Promise<NewsArticleResponse[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const articles = await this.prisma.newsArticle.findMany({
      where: {
        publishedAt: {
          gte: today
        }
      },
      orderBy: [
        {
          publishedAt: "desc"
        },
        {
          fetchedAt: "desc"
        }
      ],
      take: 20
    });

    return articles.map(toNewsArticleResponse);
  }

  private async fetchText(url: string, accept: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: accept
      }
    });

    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`);
    }

    return response.text();
  }

  private parseDate(value?: string): Date | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}
