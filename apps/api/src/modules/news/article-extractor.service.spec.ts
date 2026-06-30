import { describe, expect, it } from "vitest";
import { ArticleExtractorService } from "./article-extractor.service";

describe("ArticleExtractorService", () => {
  it("extracts original article text and cover image from an HTML page", () => {
    const html = `<!doctype html>
      <html>
        <head>
          <meta property="og:image" content="/images/cover.jpg" />
          <meta property="article:published_time" content="2026-06-30T08:00:00+08:00" />
        </head>
        <body>
          <main class="content">
            <h1>基层治理创新实践观察</h1>
            <p>第一段介绍基层治理的背景和现实意义。</p>
            <p>第二段说明数字化工具如何提升公共服务效率。</p>
          </main>
        </body>
      </html>`;
    const service = new ArticleExtractorService();

    expect(service.extract(html, "https://www.example.com/news/1.html")).toEqual({
      title: "基层治理创新实践观察",
      imageUrl: "https://www.example.com/images/cover.jpg",
      publishedAt: new Date("2026-06-30T00:00:00.000Z"),
      content: "第一段介绍基层治理的背景和现实意义。\n\n第二段说明数字化工具如何提升公共服务效率。"
    });
  });

  it("extracts a cover image from Chinanews-style article body", () => {
    const html = `<!doctype html>
      <html>
        <body>
          <div class="left_zw">
            <p>第一段介绍新闻背景。</p>
            <div><img src="//i2.chinanews.com.cn/simg/ypt/cover.jpeg" alt="" /></div>
            <p>第二段继续说明新闻内容。</p>
          </div>
        </body>
      </html>`;
    const service = new ArticleExtractorService();

    expect(service.extract(html, "https://www.chinanews.com.cn/cj/2026/06-30/1.shtml")).toMatchObject({
      imageUrl: "https://i2.chinanews.com.cn/simg/ypt/cover.jpeg",
      content: "第一段介绍新闻背景。\n\n第二段继续说明新闻内容。"
    });
  });

  it("prefers the specific article body over a longer page wrapper", () => {
    const html = `<!doctype html>
      <html>
        <body>
          <div class="content">
            <div class="left_zw">
              <p>第一段介绍西十高铁开通运营和区域交通意义，信息足够构成新闻正文。</p>
              <p>第二段说明线路长度、设计时速、站点设置和公共服务改善。</p>
            </div>
            <p>相关新闻推荐一，属于页面外层内容，不应进入正文。</p>
            <p>相关新闻推荐二，属于页面外层内容，不应进入正文。</p>
            <p>相关新闻推荐三，属于页面外层内容，不应进入正文。</p>
          </div>
        </body>
      </html>`;
    const service = new ArticleExtractorService();

    expect(service.extract(html, "https://www.chinanews.com.cn/cj/2026/06-30/1.shtml").content).toBe(
      "第一段介绍西十高铁开通运营和区域交通意义，信息足够构成新闻正文。\n\n第二段说明线路长度、设计时速、站点设置和公共服务改善。"
    );
  });

  it("extracts Chinanews publish time from the page comment", () => {
    const html = `<!doctype html>
      <html>
        <head>
          <!--[4,8,10649781] published at 2026-06-30 11:04:36 from #10 by editor-->
        </head>
        <body>
          <div class="left_zw">
            <p>第一段介绍西十高铁开通运营和区域交通意义。</p>
          </div>
        </body>
      </html>`;
    const service = new ArticleExtractorService();

    expect(service.extract(html, "https://www.chinanews.com.cn/cj/2026/06-30/1.shtml").publishedAt).toEqual(
      new Date("2026-06-30T03:04:36.000Z")
    );
  });
});
