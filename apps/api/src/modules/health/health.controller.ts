import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HealthService } from "./health.service";

export type HealthResponse = {
  status: "ok";
  service: "api";
};

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOkResponse({
    description: "后端健康检查",
    schema: {
      example: {
        status: "ok",
        service: "api"
      }
    }
  })
  getHealth(): HealthResponse {
    return this.healthService.getHealth();
  }
}
