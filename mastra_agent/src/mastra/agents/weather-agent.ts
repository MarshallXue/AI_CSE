import { Agent } from '@mastra/core/agent'
import { weatherTool } from '../tools/weather-tool'
import { Workspace, LocalFilesystem } from '@mastra/core/workspace'
import { tr } from 'zod/locales'
import process from 'node:process'
import { tavilyMcp } from '../mcp/tavily'

const workspacePath = process.env.WORKSPACE_PATH

if (!workspacePath) {
  throw new Error('没有设置工作区路径')
}

const workspace = new Workspace({
  filesystem: new LocalFilesystem({
    basePath: workspacePath,
  }),
  skills: ['skills'],
  bm25: true,
}
)

export const weatherAgent = new Agent({
  id: 'weather-agent',
  name: '天气Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: 'deepseek/deepseek-v4-flash',
  tools: { 
    weatherTool,
    ...(await tavilyMcp.listTools())
  },
  workspace:workspace
})

