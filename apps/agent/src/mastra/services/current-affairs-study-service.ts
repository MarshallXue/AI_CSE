import { currentAffairsStudyAgent } from "../agents/current-affairs-study-agent";
import {
  currentAffairsStudySchema,
  type CurrentAffairsStudyMaterial
} from "../schemas/current-affairs-study.schema";

// API 后端后面会把已经抓好、清洗好的文章整理成这个输入结构。
// paragraphs 带 index，是为了让 agent 的关键短摘能回指原文段落，方便前端展示“依据来自哪里”。
export type CurrentAffairsStudyArticleInput = {
  title: string;
  sourceName: string;
  sourceLabel?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  originalUrl: string;
  imageUrl?: string | null;
  paragraphs: Array<{
    index: number;
    text: string;
  }>;
};

// 把结构化文章变成 agent 能理解的一段用户输入。
// 注意这里传的是“已提取文章”，不是让 agent 自己上网抓网页。
export function buildCurrentAffairsStudyPrompt(article: CurrentAffairsStudyArticleInput): string {
  return [
    "请基于以下已提取文章生成今日时政精读 JSON。",
    "要求：只输出符合 CurrentAffairsStudyMaterial v1 的结构化结果；关键短摘必须来自 paragraphs；不要搬运完整原文。",
    "",
    JSON.stringify(article, null, 2)
  ].join("\n");
}

export async function generateCurrentAffairsStudyMaterial(
  article: CurrentAffairsStudyArticleInput
): Promise<CurrentAffairsStudyMaterial> {
  // structuredOutput 会要求模型直接产出结构化对象。
  // jsonPromptInjection 是更稳的兜底方式：把 JSON 结构要求写进提示词，减少模型只输出普通文字的概率。
  const response = await currentAffairsStudyAgent.generate(buildCurrentAffairsStudyPrompt(article), {
    structuredOutput: {
      schema: currentAffairsStudySchema,
      jsonPromptInjection: true
    }
  });

  // 即使 Mastra 已经按 schema 生成过，这里也再校验一次。
  // 后面 API 入库前靠这一层挡住不合格的 AI 输出。
  return currentAffairsStudySchema.parse(response.object);
}
