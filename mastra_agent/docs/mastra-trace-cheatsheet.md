# Mastra Trace 记忆卡

这份笔记用来对照 Mastra Studio 里的 `Traces` 页面。

## 一句话总览

`trace` 是一次完整请求，`span` 是这次请求里的一个动作片段。

```text
trace = 一次完整请求
span = 链路里的一个动作
```

比如用户问了一题：

```text
用户提问
  -> agent 开始运行
  -> 模型调用
  -> 工具调用
  -> 模型继续回答
  -> 最终输出
```

这整条链路是一个 `trace`，里面每一步都是一个 `span`。

## 常见字段

| 字段 | 含义 |
| --- | --- |
| `traceId` | 这次完整请求的 ID，用来定位整条链路 |
| `spanId` | 某一个动作片段的 ID |
| `parentSpanId` | 父级动作 ID，用来组成树状结构 |
| `name` | 这个 span 的名字，例如 `step: 0`、`tool: skill` |
| `spanType` | span 类型，例如 `agent_run`、`model_step`、`tool_call` |
| `startedAt` / `endedAt` | 这个动作开始和结束时间 |
| `attributes` | Mastra 记录的结构化信息，如 token、finishReason、chunkType |
| `input` | 这个动作收到的输入 |
| `output` | 这个动作产生的输出 |
| `error` | 如果这一步失败，会记录错误 |

## 核心 span 类型

### `agent_run`

代表 agent 的一次完整运行。

```text
agent_run = agent 从收到用户请求到完成回答的整体过程
```

你的 trace 里类似：

```text
agent run: 'weather-agent'
```

它是整棵树的根节点。

### `model_generation`

代表这次 agent 回复里的整体模型生成过程。

它通常包住多个 `step`。

```text
model_generation
  -> step 0
  -> step 1
```

如果模型中途调用工具，就可能出现多个 step。

### `model_step`

`step` 是一轮“模型 - 工具”循环。

一次 agent 回复不一定只调用一次模型。模型可能先生成一部分，发现需要工具，然后暂停，等工具结果回来后继续生成。

```text
step 0: 模型第一次生成，最后决定调用工具
tool: 执行工具
step 1: 模型拿到工具结果后继续生成
```

所以：

```text
step = 一轮模型执行步骤
```

你的 trace 里有：

```text
step: 0
step: 1
```

说明这次回答经历了两轮。

### `model_inference`

`inference` 是真正的一次模型推理请求。

可以理解成：

```text
inference = 实际调用了一次 deepseek-v4-flash
```

通常一个 `step` 里会有一个 `inference`。

```text
step 0
  -> inference 0

step 1
  -> inference 1
```

### `model_chunk`

`chunk` 是模型流式输出的小片段。

模型不是一次性把全文返回，而是一段一段返回，所以 trace 会记录很多 chunk。

常见 chunk：

| chunk | 含义 |
| --- | --- |
| `reasoning` | 模型的思考/规划片段 |
| `text` | 模型输出给用户的文本 |
| `tool-call` | 模型决定调用工具 |
| `tool-result` | 工具结果返回给模型 |

这就是 Studio 里为什么会看到 reasoning、工具调用、回答文本夹在一起。

### `tool_call`

代表真正执行了一个工具。

比如：

```text
tool: 'skill'
```

说明模型调用了 `skill` 工具。

如果参数是：

```json
{
  "name": "exam-wrong-question"
}
```

意思就是加载 `exam-wrong-question` 这个 skill。

### `processor_run`

`processor` 是 Mastra 在调用模型前做的上下文预处理。

常见例子：

```text
skills-processor
workspace-instructions-processor
```

它们不是模型，也不是工具，而是 Mastra 在把消息送给模型前追加或整理上下文。

例如：

```text
skills-processor
```

会把可用 skill 列表和 skill 使用说明加入上下文。

```text
workspace-instructions-processor
```

会把 workspace 文件系统说明加入上下文。

## 你这次 trace 的树

这次 trace 可以简化成：

```text
agent_run
└─ model_generation
   ├─ step 0
   │  ├─ processor: workspace instructions
   │  ├─ processor: skills
   │  ├─ inference 0
   │  │  ├─ chunk: reasoning
   │  │  ├─ chunk: text
   │  │  └─ chunk: tool-call skill
   │  └─ tool_call: skill
   │     └─ workspace_action: skill activate
   └─ step 1
      ├─ processor: workspace instructions
      ├─ processor: skills
      └─ inference 1
         ├─ chunk: reasoning
         └─ chunk: text
```

## 这次链路发生了什么

1. 用户输入一道数字推理题。
2. `weather-agent` 开始运行。
3. `skills-processor` 把可用 skill 信息放进上下文。
4. 第一次模型调用开始。
5. 模型先自己分析并输出一版答案。
6. 模型决定调用 `skill` 工具。
7. Mastra 加载 `exam-wrong-question` skill。
8. 第二次模型调用开始。
9. 模型根据 skill 的格式重新组织最终答案。

## 重要记忆

```text
trace = 一次完整请求
span = 链路里的一个动作
agent_run = agent 整体执行
model_generation = 整个模型生成过程
step = 一轮模型-工具循环
inference = 一次真实模型调用
chunk = 模型流式返回的小片段
tool_call = 真正执行工具
processor_run = 调模型前的上下文预处理
```

## 看 trace 时的顺序

建议按这个顺序看：

1. 先看 `agent_run`：整次请求花了多久，有没有 error。
2. 再看 `model_generation`：模型总共用了多少 token。
3. 再看 `step`：经历了几轮模型-工具循环。
4. 再看 `tool_call`：实际调用了哪些工具。
5. 最后看 `chunk`：模型每一段输出的时间线。

