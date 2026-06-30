import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { ArticleExtractorService } from "./article-extractor.service";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { QstheoryArticleExtractorService } from "./qstheory-article-extractor.service";
import { QstheoryListParserService } from "./qstheory-list-parser.service";
import { QstheoryRefreshService } from "./qstheory-refresh.service";
import { RssParserService } from "./rss-parser.service";

// 时政新闻、RSS 拉取、新闻结果整理相关能力放在这里。
@Module({
  imports: [DatabaseModule],
  controllers: [NewsController],
  providers: [
    NewsService,
    RssParserService,
    ArticleExtractorService,
    QstheoryListParserService,
    QstheoryArticleExtractorService,
    QstheoryRefreshService
  ]
})
export class NewsModule {}
