import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { fetchRssNews } from "../services/rss-news-service";

// RSS 源的分类枚举，要和 config/rss-sources.ts 里的 category 保持一致。
const rssCategorySchema = z.enum([
  'politics',
  'society',
  'economy',
  'legal',
  'theory',
])

// Agent 调用这个 tool 时允许传入的参数。
const inputSchema = z.object({
  categories: z.array(rssCategorySchema).optional(),
  keywords: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(50).default(10),
})

// tool 返回的单条新闻结构。
// 这里描述的是“解析 RSS 后，最终交给 Agent 的每一条新闻应该长什么样”。
const rssNewsItemSchema = z.object({
  sourceId: z.string(),
  sourceName: z.string(),
  category: rssCategorySchema,
  title: z.string(),
  link: z.string(),
  pubDate: z.string().optional(),
  description: z.string().optional(),
})

const rssToolErrorSchema = z.object({
  sourceId: z.string(),
  message: z.string(),
})

// tool 最终返回给 Agent 的整体结构。
const outputSchema = z.object({
  items: z.array(rssNewsItemSchema),
  errors: z.array(rssToolErrorSchema),
})

export const rssNewsTool = createTool({
  id: 'fetch-rss-news',
  description: '抓取配置好的 RSS 源，供公考每日时政学习。',
  inputSchema,
  outputSchema,
  execute: async (input) => {
    return fetchRssNews(input)
  }
})

