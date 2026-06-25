import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { rssSources } from "../config/rss-sources";
import { fetchRss, parseRssItems } from "../utils/rss-parser";
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

type RssNewsItem = z.infer<typeof rssNewsItemSchema>
type RssToolError = z.infer<typeof rssToolErrorSchema>

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

    // 先根据分类参数筛 RSS 源。
    // 例如用户只要 economy，这里就只留下财经源。
    const selectedSources = selectSources(input)

    // items 装成功解析出来的新闻；errors 装失败的 RSS 源。
    // 这样某个源挂了，不会影响其他源继续返回结果。
    const items: RssNewsItem[] = []
    const errors: RssToolError[] = []

    // 逐个 RSS 源请求 XML，并解析出新闻 item
    for (const source of selectedSources) {

      try {
        // 1. 请求 RSS 地址，拿到 XML 原文。
        const xml = await fetchRss(source.url)

        // 2. 从 XML 里解析出 title、link、pubDate、description。
        const rssItems = parseRssItems(xml)

        // 3. 给每条新闻补上来源信息，方便 Agent 后面判断来源和分类。
        for (const item of rssItems) {
          items.push({
            sourceId: source.id,
            sourceName: source.name,
            category: source.category,
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description,
          })
        }
      } catch (error) {
        // 当前源请求或解析失败时，只记录错误，不中断整个工具。
        errors.push({
          sourceId: source.id,
          message: error instanceof Error ? error.message : '未知错误',
        })
      }

    }

    // 清理关键词：去掉前后空格，并过滤空字符串。
    // 例如 [' 高质量发展 ', ''] 会变成 ['高质量发展']。
    const keywords = input.keywords?.map((keyword) => keyword.trim()).filter(Boolean) ?? []

    // 如果传了关键词，就只保留标题或摘要中包含关键词的新闻。
    // 如果没传关键词，就直接使用全部新闻。
    const filteredItems = keywords.length > 0
      ? items.filter((item) => {
        const text = `${item.title} ${item.description ?? ''}`
        return keywords.some((keyword) => text.includes(keyword))
      })
      : items

    return {
      // 最后再按 limit 截断，避免一次返回太多内容。
      items: filteredItems.slice(0, limit),
      errors,
    }
  }
})

