import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  WECHAT_APP_ID: z.string().optional(),
  WECHAT_APP_SECRET: z.string().optional()
});

export type ApiEnv = {
  databaseUrl: string;
  jwtSecret: string;
  wechatAppId?: string;
  wechatAppSecret?: string;
};

export const API_ENV = Symbol("API_ENV");

export function loadApiEnv(source: NodeJS.ProcessEnv = process.env): ApiEnv {
  const env = envSchema.parse(source);

  return {
    databaseUrl: env.DATABASE_URL,
    jwtSecret: env.JWT_SECRET,
    wechatAppId: env.WECHAT_APP_ID || undefined,
    wechatAppSecret: env.WECHAT_APP_SECRET || undefined
  };
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [
    {
      provide: API_ENV,
      useFactory: loadApiEnv
    }
  ],
  exports: [API_ENV]
})
export class ApiConfigModule {}
