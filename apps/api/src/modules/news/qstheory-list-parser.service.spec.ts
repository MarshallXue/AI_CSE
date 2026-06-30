import { describe, expect, it } from "vitest";
import { QstheoryListParserService } from "./qstheory-list-parser.service";

describe("QstheoryListParserService", () => {
  const sourceUrl = "https://www.qstheory.cn/qszq/llwx/index.htm";

  it("extracts article titles and normalizes absolute and relative links", () => {
    const html = `
      <a href="https://www.qstheory.cn/20260630/3b2af682cbff46a09a373f020ce78f12/c.html">坚持落实管党治党政治责任</a>
      <a href="../../20260629/f31776cfddc04011bac40aaa7af5b173/c.html">深刻领会习近平党建思想的理论品格</a>
      <a href="../20260628/abc123/c.html">相对路径文章</a>
    `;
    const service = new QstheoryListParserService();

    expect(service.parse(html, sourceUrl)).toEqual([
      {
        title: "坚持落实管党治党政治责任",
        link: "https://www.qstheory.cn/20260630/3b2af682cbff46a09a373f020ce78f12/c.html"
      },
      {
        title: "深刻领会习近平党建思想的理论品格",
        link: "https://www.qstheory.cn/20260629/f31776cfddc04011bac40aaa7af5b173/c.html"
      },
      {
        title: "相对路径文章",
        link: "https://www.qstheory.cn/20260628/abc123/c.html"
      }
    ]);
  });

  it("deduplicates articles and filters invalid links", () => {
    const html = `
      <a href="../../20260630/3b2af682cbff46a09a373f020ce78f12/c.html">文章 A</a>
      <a href="../../20260630/3b2af682cbff46a09a373f020ce78f12/c.html">文章 A 重复</a>
      <a href="javascript:;">更多</a>
      <a href="#">首页</a>
      <a href="https://www.qstheory.cn/qszq/llwx/index.htm">栏目页</a>
      <a href="https://example.com/20260630/3b2af682cbff46a09a373f020ce78f12/c.html">外部链接</a>
      <a href=""></a>
    `;
    const service = new QstheoryListParserService();

    expect(service.parse(html, sourceUrl)).toEqual([
      {
        title: "文章 A",
        link: "https://www.qstheory.cn/20260630/3b2af682cbff46a09a373f020ce78f12/c.html"
      }
    ]);
  });

  it("handles qstheory commentary links relative to a root page", () => {
    const html = `<a href="20260625/aa2e9e4c781c42d084698c790dea1196/c.html">学好用好《习近平党建文选》</a>`;
    const service = new QstheoryListParserService();

    expect(service.parse(html, "https://www.qstheory.cn/qswp.htm")).toEqual([
      {
        title: "学好用好《习近平党建文选》",
        link: "https://www.qstheory.cn/20260625/aa2e9e4c781c42d084698c790dea1196/c.html"
      }
    ]);
  });
});
