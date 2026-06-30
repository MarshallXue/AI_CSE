import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { API_ENV, ApiEnv } from "../../config/env";
import { DatabaseModule } from "../../database/database.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

// 用户资料、会员状态、个人偏好相关能力放在这里。
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
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
