// 请求单个 RSS 源，拿到原始 XML 字符串
export async function fetchRss(url: string): Promise<string> {
    const response = await fetch(url, {
        headers: {
            // 有些网站会拒绝默认 Node 请求头，这里模拟普通浏览器访问
            'User-Agent': 'Mozilla/5.0',
            Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
        },
    })

    if (!response.ok) {
        throw new Error(`RSS 请求失败：${response.status}`)
    }

    return response.text()
}

//解析RSS XML中的item列表
//每个<item>通常代表一篇新闻文章
export function parseRssItems(xml: string) {
    const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? []

    return itemBlocks
        .map((itemXml) => ({
            title: readTag(itemXml, 'title'),
            link: readTag(itemXml, 'link'),
            pubDate: readTag(itemXml, 'pubDate') || undefined,
            description: readTag(itemXml, 'description') || undefined,
        }))
        .filter((item) => item.title && item.link)
}


// 从xml片段读取指定标签内容，比如title，link，description
function readTag(xml: string, tagName: string): string {
    const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))

    return (match?.[1] ?? '')
        // 处理 RSS 常见的 CDATA 包裹
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
        // 去掉可能混在摘要里的 HTML 标签
        .replace(/<[^>]*>/g, '')
        // 处理常见 XML 转义字符
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
}