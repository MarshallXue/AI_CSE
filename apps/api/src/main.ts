import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true
  });
  app.setGlobalPrefix("api");

  // Swagger 先只暴露后端契约入口，后续给小程序和软件客户端共用。
  const swaggerConfig = new DocumentBuilder()
    .setTitle("AI CSE API")
    .setDescription("AI CSE 后端接口文档")
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}

void bootstrap();
