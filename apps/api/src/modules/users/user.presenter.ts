import type { User } from "@prisma/client";

export type PublicUserProfile = {
  id: string;
  nickname: string | null;
  avatarUrl: string | null;
  memberLevel: string;
};

export function toPublicUserProfile(user: Pick<User, "id" | "nickname" | "avatarUrl" | "memberLevel">): PublicUserProfile {
  return {
    id: user.id,
    nickname: user.nickname,
    avatarUrl: user.avatarUrl,
    memberLevel: user.memberLevel
  };
}
