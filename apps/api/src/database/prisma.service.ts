import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { API_ENV, ApiEnv } from "../config/env";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(@Inject(API_ENV) env: ApiEnv) {
    super({
      adapter: new PrismaMariaDb(env.databaseUrl)
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
