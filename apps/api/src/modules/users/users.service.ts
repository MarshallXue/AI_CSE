import { Injectable, NotFoundException, Optional, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma.service";
import { PublicUserProfile, toPublicUserProfile } from "./user.presenter";

type AccessTokenPayload = {
  sub: string;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly jwtService?: JwtService
  ) {}

  async findMe(userId: string): Promise<PublicUserProfile> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    return toPublicUserProfile(user);
  }

  async findMeByAccessToken(accessToken: string): Promise<PublicUserProfile> {
    if (!this.jwtService) {
      throw new UnauthorizedException("访问令牌服务未启用");
    }

    const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken);
    return this.findMe(payload.sub);
  }
}
