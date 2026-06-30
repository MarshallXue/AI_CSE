import { describe, expect, it } from "vitest";
import { QstheoryArticleExtractorService } from "./qstheory-article-extractor.service";

describe("QstheoryArticleExtractorService", () => {
  it("extracts title, metadata, content and cover image", () => {
    const html = `<!doctype html>
      <html>
        <body>
          <h1>深度调研 | 产科教融合的新挑战与新路径</h1>
          <span class="appellation">来源：《求是》2026/12</span>
          <span class="appellation">作者：求是杂志社经济编辑部</span>
          <span class="pubtime">2026-06-16 11:30:00</span>
          <div id="detailContent">
            <p><strong>深度调研</strong></p>
            <p>深度调研 | 产科教融合的新挑战与新路径</p>
            <p>当前，新一轮科技革命和产业变革深入发展。</p>
            <p>党的二十大强调，教育、科技、人才是基础性、战略性支撑。</p>
            <img src="../images/cover.jpg" />
          </div>
        </body>
      </html>`;
    const service = new QstheoryArticleExtractorService();

    expect(service.extract(html, "https://www.qstheory.cn/20260615/abc/c.html")).toEqual({
      title: "深度调研 | 产科教融合的新挑战与新路径",
      sourceLabel: "《求是》2026/12",
      author: "求是杂志社经济编辑部",
      publishedAt: new Date("2026-06-16T03:30:00.000Z"),
      content: "当前，新一轮科技革命和产业变革深入发展。\n\n党的二十大强调，教育、科技、人才是基础性、战略性支撑。",
      imageUrl: "https://www.qstheory.cn/20260615/images/cover.jpg"
    });
  });

  it("handles pages without author or body image", () => {
    const html = `<!doctype html>
      <html>
        <body>
          <h1>为什么要突出科技创新的引领作用</h1>
          <span class="appellation">来源：求是网</span>
          <span class="pubtime">bad date</span>
          <div id="detailContent">
            <p>学习问答</p>
            <p>科技创新能够催生新产业、新模式、新动能。</p>
          </div>
        </body>
      </html>`;
    const service = new QstheoryArticleExtractorService();

    expect(service.extract(html, "https://www.qstheory.cn/20251231/abc/c.html")).toEqual({
      title: "为什么要突出科技创新的引领作用",
      sourceLabel: "求是网",
      author: null,
      publishedAt: null,
      content: "科技创新能够催生新产业、新模式、新动能。",
      imageUrl: null
    });
  });

  it("returns null content when the article body has no usable paragraphs", () => {
    const html = `<!doctype html>
      <html>
        <body>
          <h1>空正文</h1>
          <div id="detailContent">
            <p>求是专访</p>
            <p>　</p>
          </div>
        </body>
      </html>`;
    const service = new QstheoryArticleExtractorService();

    expect(service.extract(html, "https://www.qstheory.cn/20260615/abc/c.html").content).toBeNull();
  });
});
