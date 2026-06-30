import type { NewsArticle } from "@prisma/client";

export type NewsArticleResponse = {
  id: string;
  sourceName: string;
  sourceType: string;
  sourceLabel: string | null;
  category: string;
  title: string;
  link: string;
  author: string | null;
  summary: string | null;
  content: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  readTime: number;
};

export function toNewsArticleResponse(article: NewsArticle): NewsArticleResponse {
  const textLength = article.content?.length ?? article.summary?.length ?? 0;

  return {
    id: article.id,
    sourceName: article.sourceName,
    sourceType: article.sourceType,
    sourceLabel: article.sourceLabel,
    category: article.category,
    title: article.title,
    link: article.link,
    author: article.author,
    summary: article.summary,
    content: article.content,
    imageUrl: article.imageUrl,
    publishedAt: article.publishedAt?.toISOString() ?? null,
    readTime: Math.max(1, Math.ceil(textLength / 500))
  };
}
