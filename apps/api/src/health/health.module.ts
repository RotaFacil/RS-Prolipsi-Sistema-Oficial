import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

@Module({
  imports: [HttpModule.register({ timeout: 2000, maxRedirects: 1 }), TerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService]
})
export class HealthModule {}
