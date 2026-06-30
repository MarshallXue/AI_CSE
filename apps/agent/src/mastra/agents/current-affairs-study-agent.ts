import { Agent } from "@mastra/core/agent";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Mastra 的 agent 文件运行在 ESM 环境里，没有 CommonJS 里的 __dirname。
// 这里用 import.meta.url 计算指令文件的绝对路径，避免启动目录变化时读错文件。
const instructionsPath = fileURLToPath(
  new URL("../instructions/current-affairs-study-agent.md", import.meta.url)
);

// 这个 agent 只负责“文章精读分析”，不抓网页、不写数据库。
// 抓取和入库留给 API 后端，这样边界更清楚。
export const currentAffairsStudyAgent = new Agent({
  id: "current-affairs-study-agent",
  name: "今日时政精读 Agent",
  description: "把已提取的时政文章转化为考公结构化精读材料。",
  instructions: readFileSync(instructionsPath, "utf-8"),
  model: "deepseek/deepseek-v4-flash"
});
