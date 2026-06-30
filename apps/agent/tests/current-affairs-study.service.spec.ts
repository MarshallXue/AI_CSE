import { describe, expect, it } from "vitest";
import { buildCurrentAffairsStudyPrompt } from "../src/mastra/services/current-affairs-study-service";

describe("buildCurrentAffairsStudyPrompt", () => {
  it("serializes article paragraphs for current affairs analysis", () => {
    // 这里只测 prompt 是否把文章正文段落传进去，不调用真实大模型。
    // 这样测试稳定、速度快，也不会消耗 API 费用。
    const prompt = buildCurrentAffairsStudyPrompt({
      title: "深度调研 | 产科教融合的新挑战与新路径",
      sourceName: "求是网",
      sourceLabel: "《求是》2026/12",
      author: "求是杂志社经济编辑部、教育部高等教育司联合课题组",
      publishedAt: "2026-06-16T11:30:00+08:00",
      originalUrl: "https://www.qstheory.cn/20260615/0afaac82ed724bb7852ed74cad47faa1/c.html",
      imageUrl: "https://www.qstheory.cn/image.jpg",
      paragraphs: [
        {
          index: 1,
          text: "党的二十大强调，教育、科技、人才是全面建设社会主义现代化国家的基础性、战略性支撑。"
        }
      ]
    });

    expect(prompt).toContain("请基于以下已提取文章生成今日时政精读 JSON");
    expect(prompt).toContain('"paragraphs"');
    expect(prompt).toContain("基础性、战略性支撑");
  });
});
