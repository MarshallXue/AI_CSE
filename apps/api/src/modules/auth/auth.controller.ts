import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService, WechatLoginResponse } from "./auth.service";
import { WechatLoginDto } from "./dto/wechat-login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("wechat-login")
  @ApiOkResponse({
    description: "微信小程序登录",
    schema: {
      example: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "clx0000000000000000000000",
          nickname: null,
          avatarUrl: null,
          memberLevel: "free"
        }
      }
    }
  })
  loginWithWechatCode(@Body() dto: WechatLoginDto): Promise<WechatLoginResponse> {
    return this.authService.loginWithWechatCode(dto);
  }
}
