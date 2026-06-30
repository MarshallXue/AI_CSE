import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { CurrentAffairsStudyMaterial } from "../src/mastra/schemas/current-affairs-study.schema";

const sampleUrl = "https://www.qstheory.cn/20260615/0afaac82ed724bb7852ed74cad47faa1/c.html";
const repoRoot = resolve(process.cwd(), "../..");
const outputDir = resolve(repoRoot, "docs/samples");

async function main() {
  const watchdog = setTimeout(() => {
    console.error("今日时政样例生成 120 秒超时：可能卡在 agent 初始化或模型请求阶段。");
    process.exit(1);
  }, 120_000);

  console.log("加载 apps/agent/.env");
  loadEnvFile(resolve(process.cwd(), ".env"));
  console.log("导入今日时政精读 service");
  const { generateCurrentAffairsStudyMaterial } = await import(
    "../src/mastra/services/current-affairs-study-service"
  );
  console.log("抓取并解析样例文章");
  const article = await fetchQstheoryArticle(sampleUrl);
  console.log(`文章解析完成：${article.paragraphs.length} 个段落，开始调用 Mastra`);
  const material = await generateCurrentAffairsStudyMaterial(article);

  clearTimeout(watchdog);
  await mkdir(outputDir, { recursive: true });
  await writeFile(
    resolve(outputDir, "current-affairs-study-output.json"),
    `${JSON.stringify(material, null, 2)}\n`,
    "utf-8"
  );
  await writeFile(
    resolve(outputDir, "current-affairs-study-output.md"),
    renderMarkdown(material),
    "utf-8"
  );

  console.log(`已生成：${resolve(outputDir, "current-affairs-study-output.json")}`);
  console.log(`已生成：${resolve(outputDir, "current-affairs-study-output.md")}`);
}

// tsx 直接跑脚本时不会像 Mastra Studio 一样自动加载 .env。
// 这里先把 apps/agent/.env 塞进 process.env，再动态 import agent，保证模型 key 生效。
function loadEnvFile(path: string): void {
  const content = readFileSync(path, "utf-8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] ??= value;
  }
}

async function fetchQstheoryArticle(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8"
    }
  });

  if (!response.ok) {
    throw new Error(`文章请求失败：${response.status}`);
  }

  const html = await response.text();
  const title = readFirstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/) ?? "未识别标题";
  const sourceLabel = readFirstMatch(html, /<[^>]*class=["'][^"']*appellation[^"']*["'][^>]*>\s*来源：([\s\S]*?)<\/[^>]+>/);
  const author = readFirstMatch(html, /<[^>]*class=["'][^"']*appellation[^"']*["'][^>]*>\s*作者：([\s\S]*?)<\/[^>]+>/);
  const publishedAt = readFirstMatch(html, /<[^>]*class=["'][^"']*pubtime[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/);
  const contentHtml = readDetailContentHtml(html);
  const imageUrl = readFirstMatch(contentHtml ?? "", /<img[^>]+src=["']([^"']+)["']/);
  const paragraphs = extractParagraphs(contentHtml ?? "").map((text, index) => ({
    index: index + 1,
    text
  }));

  return {
    title,
    sourceName: "求是网",
    sourceLabel,
    author,
    publishedAt,
    originalUrl: url,
    imageUrl: imageUrl ? new URL(imageUrl, url).toString() : null,
    paragraphs
  };
}

// 这个脚本只是本地试跑样例，不替代 API 里的正式解析器。
// 正式入库时仍然使用后端 extractor；这里仅为了快速把真实文章送进 Mastra。
function extractParagraphs(html: string): string[] {
  const matches = html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g);
  return Array.from(matches)
    .map((match) => cleanText(match[1]))
    .filter((text) => text && !["深度调研", "调研手记："].includes(text));
}

function readDetailContentHtml(html: string): string {
  const start = html.search(/<div[^>]+id=["']detailContent["'][^>]*>/);

  if (start === -1) {
    return "";
  }

  const endMarkers = [
    '<script src="//www.qstheory.cn/detail2024/js/pager.js"',
    "<script src='//www.qstheory.cn/detail2024/js/pager.js'",
    "parsePagingFun({"
  ];
  const end = endMarkers
    .map((marker) => html.indexOf(marker, start))
    .filter((index) => index > start)
    .sort((a, b) => a - b)[0];

  return html.slice(start, end ?? html.length);
}

function readFirstMatch(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match ? cleanText(match[1]) : null;
}

function cleanText(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&emsp;|&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[\s\u00a0\u3000]+/g, " ")
    .trim();
}

function renderMarkdown(material: CurrentAffairsStudyMaterial): string {
  return `# ${material.articleMeta.title}

> ${material.brief.oneSentenceSummary}

## 文章信息

| 字段 | 内容 |
| --- | --- |
| 来源 | ${material.articleMeta.sourceName} |
| 原文来源 | ${material.articleMeta.sourceLabel ?? ""} |
| 作者 | ${material.articleMeta.author ?? ""} |
| 发布时间 | ${material.articleMeta.publishedAt ?? ""} |
| 原文链接 | ${material.articleMeta.originalUrl} |

## 原文关键句精读

${material.keySentenceAnalyses
  .map(
    (item, index) => `### ${index + 1}. ${item.excerpt}

- 位置：第 ${item.paragraphIndex ?? "-"} 段

> 原文上下文：${boldExcerpt(item.context, item.excerpt)}

- 为什么重要：${item.reason}
- 句意解释：${item.explanation}
- 深层逻辑：${item.deeperLogic}
- 考公价值：${item.examValue}
- 相关关键词：${item.relatedKeywords.join("、")}
`
  )
  .join("\n")}

## 画重点

${material.keyPoints.map((item) => `- **${item.title}**：${item.content}（${item.examScene}）`).join("\n")}

## 命题转化方向

${material.examTransform.likelyAngles
  .map((item) => `- **${item.angle}**：${item.questionType}。${item.why}`)
  .join("\n")}

## 申论可用表达

${material.examTransform.shenlunExpressions.map((item) => `- ${item}`).join("\n")}

## 配套题目

${material.questions
  .map(
    (item, index) => `### ${index + 1}. ${item.type}

${item.stem}

${item.options?.map(formatOption).join("\n") ?? ""}

**答案：** ${item.answer}

**解析：** ${item.explanation}

**命题角度：** ${item.examAngle}
`
  )
  .join("\n")}
`;
}

function boldExcerpt(context: string, excerpt: string): string {
  if (context.includes(excerpt)) {
    return context.replace(excerpt, `**${excerpt}**`);
  }

  return `${context}\n\n关键句：**${excerpt}**`;
}

function formatOption(option: string, optionIndex: number): string {
  const label = String.fromCharCode(65 + optionIndex);
  return `${label}. ${option.replace(/^[A-D][.．、]\s*/, "")}`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
