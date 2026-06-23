import { MCPServer } from "@mastra/mcp";
import { weatherTool } from "../tools/weather-tool";

export const myMcpServer = new MCPServer({
    id:'my-mcp-server',
    name:'my MCP Server',
    version:'1.0.0',
    description:'My custom MCP server built with mastra',
    instructions:'Use the available tools to answer user requests.',
    tools:{
        weatherTool,
    }
})