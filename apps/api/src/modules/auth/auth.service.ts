import { Inject, Injectable, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { z } from "zod";
import { API_ENV, ApiEnv } from "../../config/env";
import { PrismaService } from "../../database/prisma.service";
import { PublicUserProfile, toPublicUserProfile } from "../users/user.presenter";
import { WechatLoginDto, wechatLoginSchema } from "./dto/wechat-login.dto";

const wechatSessionSchema = z.object({
  openid: z.string().min(1),
  session_key: z.string().min(1)
});

const wechatErrorSchema = z.object({
  errcode: z.number(),
  errmsg: z.string().optional()
});

export type WechatLoginResponse = {
  accessToken: string;
  user: PublicUserProfile;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject(API_ENV) private readonly env: ApiEnv,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async loginWithWechatCode(input: WechatLoginDto): Promise<WechatLoginResponse> {
    const dto = wechatLoginSchema.parse(input);
    const session = await this.exchangeWechatCode(dto.code);
    const user = await this.prisma.user.upsert({
      where: {
        wechatOpenId: session.openid
      },
      update: {},
      create: {
        wechatOpenId: session.openid
      }
    });
    const accessToken = await this.jwtService.signAsync({
      sub: user.id
    });

    return {
      accessToken,
      user: toPublicUserProfile(user)
    };
  }

  private async exchangeWechatCode(code: string): Promise<z.infer<typeof wechatSessionSchema>> {
    if (!this.env.wechatAppId || !this.env.wechatAppSecret) {
      throw new ServiceUnavailableException("微信小程序配置未完成");
    }

    const url = new URL("https://api.weixin.qq.com/sns/jscode2session");
    url.searchParams.set("appid", this.env.wechatAppId);
    url.searchParams.set("secret", this.env.wechatAppSecret);
    url.searchParams.set("js_code", code);
    url.searchParams.set("grant_type", "authorization_code");

    const response = await fetch(url);
    const body: unknown = await response.json();

    const wechatError = wechatErrorSchema.safeParse(body);
    if (wechatError.success) {
      throw new UnauthorizedException(wechatError.data.errmsg ?? "微信登录失败");
    }

    const session = wechatSessionSchema.safeParse(body);
    if (!session.success) {
      throw new UnauthorizedException("微信登录失败：缺少 openid");
    }

    return session.data;
  }
}
