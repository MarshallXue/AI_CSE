import { Agent } from "@mastra/core/agent";
import { Workspace, LocalFilesystem } from "@mastra/core/workspace";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { rssNewsTool } from "../tools/rss-news-tool";

const workspacePath = process.env.WORKSPACE_PATH

if (!workspacePath) {
    throw new Error('没有设置工作区路径。')
}

const instructions = readFileSync(
    join(workspacePath, 'src', 'mastra', 'instructions', 'ashore-agent_instructions.md'),
    'utf-8',
)

const workspace = new Workspace({
    filesystem: new LocalFilesystem({
        basePath: workspacePath,
    }),
    skills: ['skills'],
    bm25: true,
})


export const ashoreAgent = new Agent({
    id: 'ashore-agent',
    name: '上岸Agent',
    description: '面向公考错题复盘的分析 Agent，负责题型判断、解题讲解、错因归类和复盘建议。',
    instructions,
    model: 'deepseek/deepseek-v4-flash',
    tools: {
        rssNewsTool,
    },
    workspace,
})
