import { z } from "zod";

// 这些不是题目类型本身，而是“命题角度”。
// 比如同一篇文章既可以变成常识判断，也可以变成申论分析题。
export const questionTypeSchema = z.enum([
  "常识判断",
  "言语理解",
  "申论概括",
  "申论分析",
  "申论对策",
  "大作文"
]);

// 这是今日时政精读材料的唯一输出标准。
// Mastra 生成的 JSON 必须通过这个 schema，前端和后端也都围绕这份结构读取字段。
export const currentAffairsStudySchema = z.object({
  version: z.literal("v1"),
  articleMeta: z.object({
    title: z.string().min(1),
    sourceName: z.string().min(1),
    sourceLabel: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    publishedAt: z.string().min(1).optional(),
    originalUrl: z.string().url()
  }),
  brief: z.object({
    oneSentenceSummary: z.string().min(1),
    background: z.string().min(1),
    mainIssue: z.string().min(1),
    conclusion: z.string().min(1)
  }),
  // 这是这个产品形态的核心：少量原文短摘 + 深入分析。
  // excerpt 限制 80 字，是为了保留依据，但避免把大段原文搬到我们的页面里。
  keySentenceAnalyses: z
    .array(
      z.object({
        excerpt: z.string().min(1).max(80),
        // context 是原文上下文片段，前端会在其中把 excerpt 加粗展示。
        // 限制长度是为了让用户理解语境，但不把整段长文搬进分析卡片。
        context: z.string().min(1).max(500),
        paragraphIndex: z.number().int().positive().optional(),
        reason: z.string().min(1),
        explanation: z.string().min(1),
        deeperLogic: z.string().min(1),
        examValue: z.string().min(1),
        relatedKeywords: z.array(z.string().min(1)).min(1)
      })
    )
    .min(1)
    .max(6),
  // keyPoints 是给前端“画重点”模块用的，信息比关键句更概括。
  keyPoints: z.array(
    z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      sourceExcerpt: z.string().min(1).max(80).optional(),
      examScene: z.string().min(1)
    })
  ),
  // examTransform 把文章内容转成公考视角：可能怎么考、有哪些政策词、申论能怎么表达。
  examTransform: z.object({
    likelyAngles: z.array(
      z.object({
        angle: z.string().min(1),
        questionType: questionTypeSchema,
        why: z.string().min(1)
      })
    ),
    policyKeywords: z.array(z.string().min(1)),
    governanceLogic: z.array(z.string().min(1)),
    shenlunExpressions: z.array(z.string().min(1))
  }),
  questions: z.array(
    z.object({
      type: z.enum(["单选", "多选", "判断", "申论"]),
      stem: z.string().min(1),
      options: z.array(z.string().min(1)).optional(),
      answer: z.string().min(1),
      explanation: z.string().min(1),
      examAngle: z.string().min(1),
      sourceBasis: z.string().min(1).max(80).optional()
    })
  ),
  // 展示提示不是正文内容，而是帮助前端决定标签、难度和预计阅读时间。
  displayHints: z.object({
    difficulty: z.enum(["基础", "中等", "偏难"]),
    estimatedReadMinutes: z.number().int().positive(),
    tags: z.array(z.string().min(1)).min(1)
  })
});

export type CurrentAffairsStudyMaterial = z.infer<typeof currentAffairsStudySchema>;
