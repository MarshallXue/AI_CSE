import { describe, expect, it } from "vitest";
import { currentAffairsStudySchema } from "../src/mastra/schemas/current-affairs-study.schema";

// 这是一份“最小合格样例”，用来证明 schema 接受我们期望的 AI 输出结构。
const validMaterial = {
  version: "v1",
  articleMeta: {
    title: "深度调研 | 产科教融合的新挑战与新路径",
    sourceName: "求是网",
    sourceLabel: "《求是》2026/12",
    author: "求是杂志社经济编辑部、教育部高等教育司联合课题组",
    publishedAt: "2026-06-16T11:30:00+08:00",
    originalUrl: "https://www.qstheory.cn/20260615/0afaac82ed724bb7852ed74cad47faa1/c.html"
  },
  brief: {
    oneSentenceSummary: "文章围绕产科教融合展开，适合转化为教育科技人才一体推进相关考点。",
    background: "新一轮科技革命和产业变革加速推进。",
    mainIssue: "产业、科技、教育之间仍存在协同深度不足的问题。",
    conclusion: "应通过机制、评价、要素和人才供给改革推动融合。"
  },
  keySentenceAnalyses: [
    {
      excerpt: "基础性、战略性支撑",
      context: "党的二十大强调，教育、科技、人才是全面建设社会主义现代化国家的基础性、战略性支撑。",
      paragraphIndex: 6,
      reason: "直接点明教育、科技、人才的政策定位。",
      explanation: "这句话说明三者共同支撑现代化建设。",
      deeperLogic: "教育培养人才，人才支撑科技，科技推动产业升级。",
      examValue: "可转化为常识判断或政策理解题。",
      relatedKeywords: ["教育科技人才一体推进", "现代化建设"]
    }
  ],
  keyPoints: [
    {
      title: "教育科技人才一体推进",
      content: "三者不是孤立政策，而是相互支撑的系统工程。",
      sourceExcerpt: "基础性、战略性支撑",
      examScene: "常识判断、申论综合分析"
    }
  ],
  examTransform: {
    likelyAngles: [
      {
        angle: "教育科技人才一体推进",
        questionType: "常识判断",
        why: "这是当前时政和政策理解的高频主题。"
      }
    ],
    policyKeywords: ["产科教融合", "新质生产力"],
    governanceLogic: ["从单点合作转向系统协同"],
    shenlunExpressions: ["推动教育链、人才链、产业链、创新链深度融合。"]
  },
  questions: [
    {
      type: "单选",
      stem: "关于教育、科技、人才一体推进，下列理解最准确的是：",
      options: ["三者应分别推进", "三者是现代化建设的重要支撑"],
      answer: "B",
      explanation: "题目考查政策逻辑，而不是文章细节。",
      examAngle: "教育科技人才一体推进",
      sourceBasis: "基础性、战略性支撑"
    }
  ],
  displayHints: {
    difficulty: "中等",
    estimatedReadMinutes: 6,
    tags: ["时政", "教育强国", "新质生产力"]
  }
};

describe("currentAffairsStudySchema", () => {
  it("accepts structured current affairs study material", () => {
    expect(currentAffairsStudySchema.parse(validMaterial).version).toBe("v1");
  });

  it("rejects generated material without key sentence analyses", () => {
    // 关键句精读是这个功能的主模块，所以空数组必须被拒绝。
    const result = currentAffairsStudySchema.safeParse({
      ...validMaterial,
      keySentenceAnalyses: []
    });

    expect(result.success).toBe(false);
  });
});
