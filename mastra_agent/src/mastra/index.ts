import { Mastra } from '@mastra/core'
import { MastraCompositeStore } from '@mastra/core/storage'
import { LibSQLStore } from '@mastra/libsql'
import { DuckDBStore } from '@mastra/duckdb'
import {
  Observability,
  MastraStorageExporter,
  SensitiveDataFilter,
} from '@mastra/observability'
import { weatherAgent } from './agents/weather-agent'
import { ashoreAgent } from './agents/ashore-agent'
import { myMcpServer } from './mcp/my-mcp-server'




export const mastra = new Mastra({
  //普通数据写入mastra.db
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new LibSQLStore({
      id: 'mastra-storage',
      url: 'file:./mastra.db',
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


  agents: { weatherAgent, ashoreAgent },
  mcpServers: {
    myMcpServer,
  }
})
