import { Module } from "@nestjs/common";
import { ApiConfigModule } from "./config/env";
import { DatabaseModule } from "./database/database.module";
import { AgentModule } from "./modules/agent/agent.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FilesModule } from "./modules/files/files.module";
import { HealthModule } from "./modules/health/health.module";
import { NewsModule } from "./modules/news/news.module";
import { OcrModule } from "./modules/ocr/ocr.module";
import { QuestionsModule } from "./modules/questions/questions.module";
import { ReviewModule } from "./modules/review/review.module";
import { UsersModule } from "./modules/users/users.module";
import { VocabularyModule } from "./modules/vocabulary/vocabulary.module";

@Module({
  imports: [
    ApiConfigModule,
    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
    NewsModule,
    VocabularyModule,
    QuestionsModule,
    OcrModule,
    ReviewModule,
    AgentModule,
    FilesModule
  ]
})
export class AppModule {}
