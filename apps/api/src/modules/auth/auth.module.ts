import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { API_ENV, ApiEnv } from "../../config/env";
import { DatabaseModule } from "../../database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// 登录、微信 openid、token 相关能力放在这里。
@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [API_ENV],
      useFactory: (env: ApiEnv) => ({
        secret: env.jwtSecret
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
