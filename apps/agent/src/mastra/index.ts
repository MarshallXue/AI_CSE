import { Mastra } from '@mastra/core'
import { MastraCompositeStore } from '@mastra/core/storage'
import { LibSQLStore } from '@mastra/libsql'
import { DuckDBStore } from '@mastra/duckdb'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  Observability,
  MastraStorageExporter,
  SensitiveDataFilter,
} from '@mastra/observability'
import { weatherAgent } from './agents/weather-agent'
import { ashoreAgent } from './agents/ashore-agent'
import { currentAffairsStudyAgent } from './agents/current-affairs-study-agent'
import { myMcpServer } from './mcp/my-mcp-server'


const repoRoot = resolve(process.cwd(), '../..')
const agentDataDir = resolve(repoRoot, '.data/agent')
mkdirSync(agentDataDir, { recursive: true })

// 运行态数据统一写到仓库根目录的 .data/agent。
const mastraDbPath = resolve(agentDataDir, 'mastra.db').replaceAll('\\', '/')

export const mastra = new Mastra({
  //普通数据写入仓库根.data/agent/mastra.db
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new LibSQLStore({
      id: 'mastra-storage',
      url: `file:${mastraDbPath}`,
    }),
    domains: {
      observability: await new DuckDBStore().getStore("observability"),
    },
  }),
  //开启观测，把trace写进本地storage，写入前做好敏感信息过滤
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra-agent',
        exporters: [
          new MastraStorageExporter(),
        ],
        spanOutputProcessors: [
          new SensitiveDataFilter(),
        ],
      },
    },
  }),


  // 注册到这里后，Mastra Studio 和后续 API 调用才能找到这个 agent。
  // currentAffairsStudyAgent 是后台生成“今日时政精读”的专用 agent。
  agents: { weatherAgent, ashoreAgent, currentAffairsStudyAgent },
  mcpServers: {
    myMcpServer,
  }
})
