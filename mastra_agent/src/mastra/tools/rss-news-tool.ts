import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { rssSources, type RssSource } from '../config/rss-sources'

const rssCategorySchema = z.enum(['politics', 'tech', 'legal', 'society', 'economy'])

const rssNewsItemSchema = z.object({
  sourceId: z.string(),
  sourceName: z.string(),
  category: rssCategorySchema,
  authority: z.enum(['official', 'state-media']),
  examValue: z.string(),
  title: z.string(),
  link: z.string(),
  pubDate: z.string().optional(),
  description: z.string().optional(),
})

const inputSchema = z.object({
  sourceIds: z.array(z.string()).optional().describe('RSS source ids. Leave empty to use all configured sources.'),
  categories: z.array(rssCategorySchema).optional().describe('Filter sources by exam-oriented category.'),
  keywords: z.array(z.string()).optional().describe('Filter returned items by keywords in title or description.'),
  limit: z.number().int().min(1).max(50).default(12).describe('Maximum number of news items to return.'),
})

const outputSchema = z.object({
  items: z.array(rssNewsItemSchema),
  errors: z.array(z.object({
    sourceId: z.string(),
    message: z.string(),
  })),
})

type RssNewsItem = z.infer<typeof rssNewsItemSchema>
type RssNewsToolInput = z.input<typeof inputSchema>

export const rssNewsTool = createTool({
  id: 'fetch-rss-news',
  description: 'Fetch official/state-media RSS news items for civil-service exam daily news, current affairs, policy and common-sense study.',
  inputSchema,
  outputSchema,
  mcp: {
    annotations: {
      title: 'Fetch RSS News',
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: true,
    },
  },
  execute: async (input) => {
    const selectedSources = selectSources(input)
    const errors: Array<{ sourceId: string; message: string }> = []
    const items: RssNewsItem[] = []

    for (const source of selectedSources) {
      try {
        const xml = await fetchRss(source)
        items.push(...parseRssItems(xml, source))
      } catch (error) {
        errors.push({
          sourceId: source.id,
          message: error instanceof Error ? error.message : '未知错误',
        })
      }
    }

    const keywords = input.keywords?.map((keyword) => keyword.trim()).filter(Boolean) ?? []
    const filteredItems = keywords.length > 0
      ? items.filter((item) => keywords.some((keyword) => {
        const text = `${item.title} ${item.description ?? ''}`
        return text.includes(keyword)
      }))
      : items

    return {
      items: filteredItems
        .sort((a, b) => getTime(b.pubDate) - getTime(a.pubDate))
        .slice(0, input.limit ?? 12),
      errors,
    }
  },
})

function selectSources(input: RssNewsToolInput): RssSource[] {
  const sourceIds = new Set(input.sourceIds ?? [])
  const categories = new Set(input.categories ?? [])

  return rssSources.filter((source) => {
    const matchSource = sourceIds.size === 0 || sourceIds.has(source.id)
    const matchCategory = categories.size === 0 || categories.has(source.category)
    return matchSource && matchCategory
  })
}

async function fetchRss(source: RssSource): Promise<string> {
  const response = await fetch(source.url, {
    headers: {
      'User-Agent': 'AI_CSE/0.1 (+https://github.com/MarshallXue/AI_CSE)',
      Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
    },
  })

  if (!response.ok) {
    throw new Error(`请求失败：${response.status}`)
  }

  return response.text()
}

function parseRssItems(xml: string, source: RssSource): RssNewsItem[] {
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? []

  return itemBlocks
    .map((itemXml) => ({
      sourceId: source.id,
      sourceName: source.name,
      category: source.category,
      authority: source.authority,
      examValue: source.examValue,
      title: readTag(itemXml, 'title'),
      link: readTag(itemXml, 'link'),
      pubDate: readTag(itemXml, 'pubDate') || undefined,
      description: cleanDescription(readTag(itemXml, 'description')) || undefined,
    }))
    .filter((item) => item.title && item.link)
}

function readTag(xml: string, tagName: string): string {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))
  return decodeXml(match?.[1] ?? '').trim()
}

function cleanDescription(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function getTime(value?: string): number {
  if (!value) {
    return 0
  }

  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}
