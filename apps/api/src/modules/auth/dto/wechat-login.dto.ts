import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class WechatLoginDto {
  @ApiProperty({
    description: "微信小程序 wx.login 返回的临时 code",
    example: "0f3a1b2c"
  })
  code!: string;
}

export const wechatLoginSchema = z.object({
  code: z.string().trim().min(1)
});
