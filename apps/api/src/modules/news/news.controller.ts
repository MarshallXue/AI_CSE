import { Controller, Get, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { NewsArticleResponse } from "./news.presenter";
import { NewsService } from "./news.service";
import { QstheoryRefreshService } from "./qstheory-refresh.service";

@ApiTags("news")
@Controller("news")
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly qstheoryRefreshService: QstheoryRefreshService
  ) {}

  @Post("refresh")
  @ApiOkResponse({
    description: "刷新 RSS 新闻并抓取原文页面"
  })
  refreshNews() {
    return this.newsService.refreshNews();
  }

  @Post("refresh/qstheory")
  @ApiOkResponse({
    description: "刷新求是网栏目文章并抓取原文页面"
  })
  refreshQstheoryNews() {
    return this.qstheoryRefreshService.refresh();
  }

  @Get("today")
  @ApiOkResponse({
    description: "今日新闻列表"
  })
  listToday(): Promise<NewsArticleResponse[]> {
    return this.newsService.listToday();
  }
}
