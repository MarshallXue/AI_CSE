import { Controller, Get, Headers, UnauthorizedException } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PublicUserProfile } from "./user.presenter";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "当前登录用户公开资料",
    schema: {
      example: {
        id: "clx0000000000000000000000",
        nickname: "乔木",
        avatarUrl: "https://example.com/avatar.png",
        memberLevel: "free"
      }
    }
  })
  getMe(@Headers("authorization") authorization?: string): Promise<PublicUserProfile> {
    const accessToken = this.readBearerToken(authorization);
    return this.usersService.findMeByAccessToken(accessToken);
  }

  private readBearerToken(authorization?: string): string {
    const [scheme, token] = authorization?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedException("缺少访问令牌");
    }

    return token;
  }
}
