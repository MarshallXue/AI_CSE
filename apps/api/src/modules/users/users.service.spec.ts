import { describe, expect, it, vi } from "vitest";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  it("returns the public profile for the current user", async () => {
    const prisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: "user_1",
          nickname: "乔木",
          avatarUrl: "https://example.com/avatar.png",
          memberLevel: "free",
          createdAt: new Date("2026-06-30T00:00:00.000Z"),
          updatedAt: new Date("2026-06-30T00:00:00.000Z")
        })
      }
    };
    const service = new UsersService(prisma as never);

    await expect(service.findMe("user_1")).resolves.toEqual({
      id: "user_1",
      nickname: "乔木",
      avatarUrl: "https://example.com/avatar.png",
      memberLevel: "free"
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: "user_1"
      }
    });
  });
});
