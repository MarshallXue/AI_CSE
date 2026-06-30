# 新闻源抓取与今日时政精读交接文档

日期：2026-06-30

## 目标

本轮工作围绕“考公备考项目的今日时政内容生产链路”展开，目标是先打通新闻源抓取、文章解析、结构化精读样例和 Mastra agent 输出规范，为后续自动生成“今日时政”做准备。

最终产品方向是：

```text
后台定时抓取新闻源
-> 解析文章标题、来源、作者、时间、正文、图片、原文链接
-> 选择适合考公的文章
-> 调用 Mastra/AI 生成结构化精读材料
-> 入库为今日时政
-> 前端直接展示成品
```

前端不提供“用户点击生成”按钮。

## 已完成内容

### 1. 后端新闻源抓取与解析

新增 `apps/api` 后端应用，使用 NestJS、Prisma、Vitest。

主要能力：

- RSS 新闻源抓取。
- 新闻详情页正文解析。
- 求是网栏目页抓取。
- 求是网文章详情解析。
- 文章元信息入库结构设计。
- 本地生成 Markdown 样例脚本。

关键文件：

- `apps/api/src/modules/news/news.service.ts`
- `apps/api/src/modules/news/news.controller.ts`
- `apps/api/src/modules/news/article-extractor.service.ts`
- `apps/api/src/modules/news/qstheory-refresh.service.ts`
- `apps/api/src/modules/news/qstheory-list-parser.service.ts`
- `apps/api/src/modules/news/qstheory-article-extractor.service.ts`
- `apps/api/src/modules/news/qstheory-sources.ts`
- `apps/api/src/modules/news/rss-sources.ts`
- `apps/api/prisma/schema.prisma`
- `apps/api/scripts/generate-rss-news-md.ts`
- `apps/api/scripts/generate-single-news-md.ts`

新增接口：

```text
POST /api/news/refresh
POST /api/news/refresh/qstheory
GET  /api/news/today
```

说明：当前 `GET /api/news/today` 还是按文章发布时间筛选今日文章，后续需要升级为读取已经生成好的“今日时政精读材料”。

### 2. 求是网栏目接入

已接入 5 个求是网栏目：

- 理论文选
- 深度调研
- 求是专访
- 学习问答
- 求是网评

解析内容包括：

- 标题
- 栏目来源
- 原文来源
- 作者
- 发布时间
- 正文
- 图片
- 原文链接

本地验证过真实求是网文章解析，样例文章为：

```text
深度调研 | 产科教融合的新挑战与新路径
https://www.qstheory.cn/20260615/0afaac82ed724bb7852ed74cad47faa1/c.html
```

### 3. Mastra agent 结构迁移

原 `mastra_agent` 迁移到：

```text
apps/agent
```

并在 `.gitignore` 中忽略了 `apps/agent` 的运行态数据库、缓存、日志等文件。

关键文件：

- `apps/agent/src/mastra/index.ts`
- `apps/agent/src/mastra/agents/ashore-agent.ts`
- `apps/agent/src/mastra/tools/rss-news-tool.ts`
- `apps/agent/src/mastra/services/rss-news-service.ts`

### 4. 今日时政精读 agent 输出结构

新增今日时政精读专用 agent：

- `apps/agent/src/mastra/agents/current-affairs-study-agent.ts`
- `apps/agent/src/mastra/instructions/current-affairs-study-agent.md`
- `apps/agent/src/mastra/schemas/current-affairs-study.schema.ts`
- `apps/agent/src/mastra/services/current-affairs-study-service.ts`

核心输出结构：

- 文章元信息
- 一句话摘要、背景、主问题、结论
- 原文关键句精读
- 画重点
- 命题转化方向
- 申论可用表达
- 配套题目
- 展示标签、难度、预计阅读时间

关键设计：

```text
keySentenceAnalyses[].excerpt = 原文关键句
keySentenceAnalyses[].context = 原文上下文片段
```

前端展示时应该在 `context` 中把 `excerpt` 加粗，而不是只显示孤立一句话。

示例：

```markdown
> 原文上下文：当前，新一轮科技革命和产业变革深入发展……**教育链、人才链、产业链、创新链该如何打通？**怎样构建适应大国发展与科技自立自强要求的人才自主培养体系？
```

这样用户能读到原文语境，也不会变成完整转载。

### 5. 样例文档

已生成样例文档：

- `docs/samples/rss-news-with-images.md`
- `docs/samples/rss-news-single-article.md`
- `docs/samples/qstheory-article-parse-sample.md`
- `docs/samples/today-news-article-parse-sample.md`
- `docs/samples/current-affairs-study-output.json`
- `docs/samples/current-affairs-study-output.md`

其中 `current-affairs-study-output.md` 是当前最接近前端展示形态的样例。

### 6. 前端原文入口测试

在 `apps/frontend/src/app/components/NewsDetailScreen.tsx` 中增加了原文入口和站内 iframe 展示测试。

注意：这只是原文查看能力验证。正式产品中，默认展示应该是“AI 结构化精读”，原文入口作为核对来源的辅助功能。

## 本地运行与验证

### API

```bash
cd apps/api
npm test
npm run build
```

本轮已验证通过：

- 新闻解析相关测试通过。
- API 构建通过。

### Agent

```bash
cd apps/agent
..\api\node_modules\.bin\vitest.cmd run tests/current-affairs-study.schema.spec.ts tests/current-affairs-study.service.spec.ts
npx tsc -p tsconfig.json --noEmit
```

本轮已验证通过：

- schema 测试通过。
- service prompt 测试通过。
- TypeScript 检查通过。

### 生成今日时政精读样例

当前可用脚本：

```bash
cd apps/agent
..\api\node_modules\.bin\tsx.cmd scripts/run-current-affairs-study-direct-sample.ts
```

输出：

```text
docs/samples/current-affairs-study-output.json
docs/samples/current-affairs-study-output.md
```

说明：当前这个脚本是直连 DeepSeek API，用于先验证内容质量。它仍然复用了同一份指令词和 schema。

## 已知问题

### 1. Mastra agent.generate 当前会卡住

尝试通过：

```ts
currentAffairsStudyAgent.generate(...)
```

真实调用 Mastra 时，当前环境中会卡住，未能正常返回。

已确认：

- `apps/agent/.env` 中配置了 `DEEPSEEK_API_KEY`。
- 直连 `https://api.deepseek.com/models` 成功。
- 直连 DeepSeek `chat/completions` 能成功生成样例。

因此问题更可能在当前 Mastra 调用层或运行方式上，不是 DeepSeek key 或网络问题。

临时方案：

- 用 `scripts/run-current-affairs-study-direct-sample.ts` 直连 DeepSeek 验证内容。

后续需要：

- 排查 Mastra model router / provider 调用方式。
- 或将 API 第一版设计为通过内部 service 直连模型，再逐步切回 Mastra workflow。

### 2. 题目质量还要继续压提示词

当前生成题目能通过 schema，但仍有部分题目偏“原文阅读理解”。

后续提示词要继续强调：

- 不考“文章原文说了什么”。
- 要模拟命题老师从文章中抽取公共考点。
- 多考政策理解、治理逻辑、申论概括、申论分析、申论对策。

### 3. 还没有入库“精读材料”

当前只完成了文章抓取与 AI 结构化样例。

后续需要新增表，例如：

```text
NewsStudyMaterial
  id
  articleId
  materialJson
  version
  generatedAt
```

或者设计 `DailyNewsItem`/`TodayCurrentAffairs` 表，用于管理每日发布内容。

### 4. 定时任务尚未实现

产品方向已经确定：

```text
每天早上 6 点自动抓取和生成今日时政
```

但本轮没有实现 cron。下一步可以在 `apps/api` 中接入 Nest schedule，或者先做管理员手动触发接口。

## 推荐下一步

1. 修复或绕过 Mastra `generate()` 卡住问题。
2. 新增 `NewsStudyMaterial` 表，保存 AI 结构化精读结果。
3. 新增后端服务：从 `NewsArticle` 取文章，调用 AI，校验 schema，入库。
4. 新增管理员手动接口，例如：

```text
POST /api/news/admin/build-today
```

5. 再接每日 06:00 自动任务。
6. 前端把“今日时政”页面改为读取已生成的 `NewsStudyMaterial`。

## 当前分支与提交

当前分支：

```text
company
```

已推送到：

```text
origin/company
```

上一轮主要提交：

```text
8ebb695 feat(news): 优化代码结构并接入新闻源抓取
```
