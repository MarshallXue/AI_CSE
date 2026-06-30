import { MCPClient } from "@mastra/mcp";

export const tavilyMcp = new MCPClient({
    id: 'tavily-mcp',
    servers: {
        tavily: {
            url: new URL('https://mcp.tavily.com/mcp'),
            fetch: async (url, init) => {
                const headers = new Headers(init?.headers)
                headers.set('Authorization', `Bearer ${process.env.TAVILY_API_KEY}`)

                return fetch(url, {
                    ...init,
                    headers
                })
            }
        }
    }
})