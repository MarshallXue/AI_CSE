import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { ArticleExtractorService } from "../src/modules/news/article-extractor.service";
import { rssSources, type RssSource } from "../src/modules/news/rss-sources";
import { RssParserService, type ParsedRssItem } from "../src/modules/news/rss-parser.service";

type ParsedArticle = {
  source: RssSource;
  item: ParsedRssItem;
  title: string;
  imageUrl: string;
  publishedAt: Date | null;
  paragraphCount: number;
  characterCount: number;
  topics: string[];
};

type FetchError = {
  target: string;
  message: string;
};

const MAX_ARTICLES = 8;
const MAX_PER_SOURCE = 2;
const OUTPUT_PATH = resolve(process.cwd(), "../../docs/samples/rss-news-with-images.md");

const rssParser = new RssParserService();
const articleExtractor = new ArticleExtractorService();

async function main() {
  const articles: ParsedArticle[] = [];
  const errors: FetchError[] = [];
  const enabledSources = rssSources.filter((source) => source.enabled);
  const seenLinks = new Set<string>();

  for (const source of enabledSources) {
    let sourceMatches = 0;

    try {
      const xml = await fetchText(source.url, "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8");
      const items = rssParser.parse(xml);

      for (const item of items) {
        if (articles.length >= MAX_ARTICLES || sourceMatches >= MAX_PER_SOURCE) {
          break;
        }
        if (seenLinks.has(item.link)) {
          continue;
        }

        try {
          const html = await fetchText(item.link, "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8");
          const article = articleExtractor.extract(html, item.link);

          if (!article.imageUrl || !article.content) {
            continue;
          }

          const paragraphs = article.content.split(/\n{2,}/).map((text) => text.trim()).filter(Boolean);

          articles.push({
            source,
            item,
            title: article.title ?? item.title,
            imageUrl: article.imageUrl,
            publishedAt: article.publishedAt ?? parseDate(item.pubDate),
            paragraphCount: paragraphs.length,
            characterCount: article.content.replace(/\s/g, "").length,
            topics: extractTopics(article.content)
          });
          seenLinks.add(item.link);
          sourceMatches += 1;
        } catch (error) {
          errors.push({
            target: item.link,
            message: error instanceof Error ? error.message : "未知错误"
          });
        }
      }
    } catch (error) {
      errors.push({
        target: source.url,
        message: error instanceof Error ? error.message : "未知错误"
      });
    }

    if (articles.length >= MAX_ARTICLES) {
      break;
    }
  }

  const markdown = renderMarkdown({
    articles,
    enabledSources,
    errors
  });

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, markdown, "utf8");

  console.log(`Generated ${articles.length} articles: ${OUTPUT_PATH}`);
  if (errors.length > 0) {
    console.log(`Fetch warnings: ${errors.length}`);
  }
}

async function fetchText(url: string, accept: string): Promise<string> {
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

function parseDate(value?: string): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function extractTopics(content: string): string[] {
  const stopwords = new Set([
    "记者",
    "中新网",
    "日电",
    "表示",
    "介绍",
    "相关",
    "目前",
    "进行",
    "通过",
    "同时",
    "其中",
    "以及",
    "工作",
    "一个",
    "方面",
    "进一步"
  ]);
  const counts = new Map<string, number>();

  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("zh", { granularity: "word" });

    for (const segment of segmenter.segment(content)) {
      const word = segment.segment.trim();
      if (!segment.isWordLike || !isUsefulTopic(word, stopwords)) {
        continue;
      }
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  } else {
    for (const word of content.match(/[\u4e00-\u9fa5]{2,6}/g) ?? []) {
      if (!isUsefulTopic(word, stopwords)) {
        continue;
      }
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"))
    .slice(0, 8)
    .map(([word]) => word);
}

function isUsefulTopic(word: string, stopwords: Set<string>): boolean {
  return /^[\u4e00-\u9fa5A-Za-z0-9]+$/.test(word) && word.length >= 2 && !stopwords.has(word);
}

function renderMarkdown(input: {
  articles: ParsedArticle[];
  enabledSources: RssSource[];
  errors: FetchError[];
}): string {
  const generatedAt = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date());
  const sourceNames = input.enabledSources.map((source) => source.name).join("、");

  const lines = [
    "# RSS 有图新闻解析排版样例",
    "",
    `> 生成时间：${generatedAt}`,
    ">",
    "> 说明：本文档用于验证 RSS 原文解析和详情页排版效果。为避免直接复制完整版权正文，这里展示解析字段、封面图、正文统计、主题词和结构化摘要；正式产品可在授权范围内展示完整正文，或保留原文链接。",
    "",
    "## 抓取概览",
    "",
    "| 字段 | 内容 |",
    "| --- | --- |",
    `| 已启用 RSS 源 | ${escapeTable(sourceNames)} |`,
    `| 有图文章数量 | ${input.articles.length} |`,
    `| 每源最多选取 | ${MAX_PER_SOURCE} 篇 |`,
    `| 总文章上限 | ${MAX_ARTICLES} 篇 |`,
    `| 抓取警告 | ${input.errors.length} 条 |`,
    ""
  ];

  input.articles.forEach((article, index) => {
    const publishedAt = formatDate(article.publishedAt);
    const topics = article.topics.length > 0 ? article.topics.join("、") : "未提取到稳定主题词";
    const summary = `这篇新闻来自${article.source.name}，围绕“${article.title}”展开。解析器已识别出封面图、发布时间和正文段落，适合按标题、元信息、图片、内容要点和原文链接的顺序进入详情页。`;

    lines.push(
      `## ${index + 1}. ${article.title}`,
      "",
      `![${escapeAlt(article.title)}](${article.imageUrl})`,
      "",
      "| 字段 | 解析结果 |",
      "| --- | --- |",
      `| 来源 | ${escapeTable(article.source.name)} |`,
      `| 分类 | ${article.source.category} |`,
      `| 发布时间 | ${escapeTable(publishedAt)} |`,
      `| 原文链接 | [打开原文](${article.item.link}) |`,
      `| 正文自然段 | ${article.paragraphCount} 段 |`,
      `| 正文长度 | 约 ${article.characterCount} 字 |`,
      `| 封面图 | 是 |`,
      "",
      "### 内容解析",
      "",
      summary,
      "",
      `- 高频主题词：${topics}`,
      `- 备考价值：${article.source.examValue}`,
      "- 推荐版式：标题下方放来源和时间，随后展示封面图；正文区域按自然段排版，底部放原文链接、AI 总结、考点和练习入口。",
      "",
      "### 正文排版占位",
      "",
      "> 此处对应已解析出的正文自然段。样例文档不复制完整原文；接入授权内容后，可将每个自然段渲染为独立段落，并保持较宽行距提升阅读感。",
      ""
    );
  });

  if (input.errors.length > 0) {
    lines.push("## 抓取警告", "", "| 目标 | 错误 |", "| --- | --- |");

    for (const error of input.errors) {
      lines.push(`| ${escapeTable(error.target)} | ${escapeTable(error.message)} |`);
    }

    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function formatDate(date: Date | null): string {
  if (!date) {
    return "未解析到";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function escapeTable(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function escapeAlt(value: string): string {
  return value.replace(/]/g, "\\]");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
