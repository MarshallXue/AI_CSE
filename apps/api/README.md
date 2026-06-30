# AI CSE API

NestJS 后端应用，负责给小程序、未来桌面软件和其他客户端提供统一 REST API。

业务数据库使用 MySQL，后端通过 Prisma 访问数据库。

## 本地开发

```bash
npm install
cp .env.example .env
npm run dev
```

- 健康检查：`GET http://localhost:3000/api/health`
- Swagger 文档：`http://localhost:3000/docs`

`WECHAT_APP_ID` 和 `WECHAT_APP_SECRET` 为空时，微信登录接口会返回明确的服务配置错误，不会生成假用户。

## 目录约定

业务代码按模块放在 `src/modules`：

- `auth`：登录、微信 openid、token
- `users`：用户资料、会员状态
- `news`：时政新闻、RSS 结果
- `vocabulary`：词库、每日词汇
- `questions`：错题库
- `ocr`：图片和 PDF OCR
- `review`：艾宾浩斯复盘计划
- `agent`：Mastra AI 分析边界
- `files`：图片和 PDF 上传
