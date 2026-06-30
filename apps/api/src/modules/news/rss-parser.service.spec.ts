import { describe, expect, it } from "vitest";
import { RssParserService } from "./rss-parser.service";

describe("RssParserService", () => {
  it("parses RSS items with title, link, publication date and summary", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <rss>
        <channel>
          <item>
            <title><![CDATA[基层治理创新实践观察]]></title>
            <link>https://www.example.com/news/1.html</link>
            <pubDate>Tue, 30 Jun 2026 08:00:00 GMT</pubDate>
            <description><![CDATA[围绕社区服务、数字治理等内容展开。]]></description>
          </item>
        </channel>
      </rss>`;
    const service = new RssParserService();

    expect(service.parse(xml)).toEqual([
      {
        title: "基层治理创新实践观察",
        link: "https://www.example.com/news/1.html",
        pubDate: "Tue, 30 Jun 2026 08:00:00 GMT",
        description: "围绕社区服务、数字治理等内容展开。"
      }
    ]);
  });
});
