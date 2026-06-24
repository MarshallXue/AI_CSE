import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { rssSources } from "../config/rss-sources";

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

// tool 返回的单条新闻结构；现在练习阶段先用 RSS 源信息伪造 item。
const rssNewsItemSchema = z.object({
  sourceId: z.string(),
  sourceName: z.string(),
  category: rssCategorySchema,
  title: z.string(),
  link: z.string(),
  pubDate: z.string().optional(),
  description: z.string().optional(),
})

// tool 最终返回给 Agent 的整体结构。
const outputSchema = z.object({
  items: z.array(rssNewsItemSchema),
  errors: z.array(z.object({
    sourceId: z.string(),
    message: z.string(),
  })),
})

// 根据用户传入的分类筛选 RSS 源；如果没传分类，就使用全部启用的源。
function selectSources(input: { categories?: z.infer<typeof rssCategorySchema>[] }) {
  const categories = new Set(input.categories ?? [])

  return rssSources.filter((source) => {
    const matchCategory = categories.size === 0 || categories.has(source.category)
    return source.enabled && matchCategory
  })
}

export const rssNewsTool = createTool({
  id: 'fetch-rss-news',
  description: '抓取配置好的 RSS 源，供公考每日时政学习。',
  inputSchema,
  outputSchema,
  execute: async (input) => {
    // default(10) 是 schema 层面的默认值；这里再兜底一次，让 TS 确定 limit 一定是 number。
    const limit = input.limit ?? 10
    const selectedSources = selectSources(input)

    return {
      // 现在还没有真正请求 RSS，所以先把选中的 RSS 源映射成假新闻 item。
      items: selectedSources.slice(0, limit).map((source) => ({
        sourceId: source.id,
        sourceName: source.name,
        category: source.category,
        title: `Selected source: ${source.name}`,
        link: source.url,
        description: source.examValue,
      })),
      errors: [],
    }
  }
})
