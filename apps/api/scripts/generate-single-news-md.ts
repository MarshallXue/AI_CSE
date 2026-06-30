import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { ArticleExtractorService } from "../src/modules/news/article-extractor.service";

const ARTICLE_URL = "https://www.chinanews.com.cn/cj/2026/06-30/10649781.shtml";
const OUTPUT_PATH = resolve(process.cwd(), "../../docs/samples/rss-news-single-article.md");

async function main() {
  const html = await fetchText(ARTICLE_URL);
  const article = new ArticleExtractorService().extract(html, ARTICLE_URL);
  const paragraphs = (article.content ?? "").split(/\n{2,}/).map((text) => text.trim()).filter(Boolean);
  const markdown = renderMarkdown({
    title: article.title ?? "未解析到标题",
    imageUrl: article.imageUrl,
    publishedAt: article.publishedAt,
    paragraphCount: paragraphs.length,
    characterCount: paragraphs.join("").replace(/\s/g, "").length,
    excerpt: pickShortExcerpt(paragraphs)
  });

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, markdown, "utf8");
  console.log(`Generated: ${OUTPUT_PATH}`);
}

async function fetchText(url: string): Promise<string> {
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

function renderMarkdown(input: {
  title: string;
  imageUrl: string | null;
  publishedAt: Date | null;
  paragraphCount: number;
  characterCount: number;
  excerpt: string;
}): string {
  const lines = [
    `# ${input.title}`,
    "",
    "| 字段 | 解析结果 |",
    "| --- | --- |",
    "| 来源 | 中新网财经新闻 |",
    "| 分类 | economy |",
    `| 发布时间 | ${formatDate(input.publishedAt)} |`,
    `| 原文链接 | [打开原文](${ARTICLE_URL}) |`,
    `| 正文自然段 | ${input.paragraphCount} 段 |`,
    `| 正文长度 | 约 ${input.characterCount} 字 |`,
    `| 封面图 | ${input.imageUrl ? "是" : "否"} |`,
    ""
  ];

  if (input.imageUrl) {
    lines.push(`![${input.title}](${input.imageUrl})`, "");
  }

  lines.push(
    "## 短摘",
    "",
    `> ${input.excerpt}`,
    "",
    "## 解析后的正文排版效果",
    "",
    "这里对应解析出的自然段正文。当前样例只放短摘和结构化占位；产品详情页可按这个顺序渲染：标题、来源时间、封面图、正文自然段、原文链接、AI 总结与练习入口。",
    "",
    "## 结构化要点",
    "",
    "1. 事件：西安至十堰高铁开通运营，西安东站同步投用。",
    "2. 数据：线路全长、设计时速、站点数量和通达时间可作为常识素材。",
    "3. 主题：基础设施互联互通、区域协调发展、重大工程建设。",
    "4. 版式：有封面图时可放在元信息后，正文按自然段分块展示。",
    ""
  );

  return `${lines.join("\n")}\n`;
}

function pickShortExcerpt(paragraphs: string[]): string {
  const first = paragraphs[0] ?? "未解析到正文短摘。";
  return first.slice(0, 24);
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
