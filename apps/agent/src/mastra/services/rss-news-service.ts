import { rssSources } from "../config/rss-sources";
import { fetchRss, parseRssItems } from "../utils/rss-parser";

type RssCategory = 'politics' | 'society' | 'economy' | 'legal' | 'theory'

type FetchRssNewsInput = {
    categories?: RssCategory[],
    keywords?: string[],
    limit?: number
}

type RssNewsItem = {
    sourceId: string
    sourceName: string
    category: RssCategory
    title: string
    link: string
    pubDate?: string
    description?: string
}

type RssToolError = {
    sourceId: string
    message: string
}

type FetchRssNewsResult = {
    items: RssNewsItem[]
    errors: RssToolError[]
}


// 根据用户传入的分类筛选 RSS 源；如果没传分类，就使用全部启用的源。
function selectSources(input: { categories?: RssCategory[] }) {
    const categories = new Set(input.categories ?? [])

    return rssSources.filter((source) => {
        const matchCategory = categories.size === 0 || categories.has(source.category)
        return source.enabled && matchCategory
    })
}

function getTime(value?: string): number {
    if (!value) {
        return 0
    }

    const time = new Date(value).getTime()
    return Number.isNaN(time) ? 0 : time
}

//RSS 新闻业务服务
// 负责：选源，抓取RSS，关键词筛选，错误收集
export async function fetchRssNews(input: FetchRssNewsInput): Promise<FetchRssNewsResult> {
    const limit = input.limit ?? 10
    const selectedSources = selectSources(input)

    const items: RssNewsItem[] = []
    const errors: RssToolError[] = []

    for (const source of selectedSources) {
        try {
            const xml = await fetchRss(source.url)
            const rssItems = parseRssItems(xml)

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
            errors.push({
                sourceId: source.id,
                message: error instanceof Error ? error.message : '未知错误',
            })
        }
    }

    // 清理关键词：去掉前后空格，并过滤空字符串。
    const keywords = input.keywords?.map((keyword) => keyword.trim()).filter(Boolean) ?? []

    // 如果传了关键词，就只保留标题或摘要中包含关键词的新闻。
    const filteredItems = keywords.length > 0
        ? items.filter((item) => {
            const text = `${item.title} ${item.description ?? ''}`
            return keywords.some((keyword) => text.includes(keyword))
        })
        : items

    const sortedItems = filteredItems.sort((a, b) => {
        return getTime(b.pubDate) - getTime(a.pubDate)
    })

    return {
        items: sortedItems.slice(0, limit),
        errors,
    }
}
