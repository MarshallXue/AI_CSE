import { Module } from "@nestjs/common";

// 后端调用 Mastra agent 的边界放在这里，避免业务模块直接依赖 agent 实现。
@Module({})
export class AgentModule {}
