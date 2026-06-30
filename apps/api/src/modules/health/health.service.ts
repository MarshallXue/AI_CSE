import { Injectable } from "@nestjs/common";
import type { HealthResponse } from "./health.controller";

@Injectable()
export class HealthService {
  getHealth(): HealthResponse {
    return {
      status: "ok",
      service: "api"
    };
  }
}
