import { ServiceUnavailableException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  it("does not create a fake user when WeChat config is missing", async () => {
    const prisma = {
      user: {
        upsert: vi.fn()
      }
    };
    const jwt = {
      signAsync: vi.fn()
    };
    const service = new AuthService(
      {
        databaseUrl: "mysql://user:password@localhost:3306/ai_cse",
        jwtSecret: "test-secret"
      },
      prisma as never,
      jwt as never
    );

    await expect(service.loginWithWechatCode({ code: "wx-code" })).rejects.toBeInstanceOf(
      ServiceUnavailableException
    );
    expect(prisma.user.upsert).not.toHaveBeenCalled();
    expect(jwt.signAsync).not.toHaveBeenCalled();
  });
});
