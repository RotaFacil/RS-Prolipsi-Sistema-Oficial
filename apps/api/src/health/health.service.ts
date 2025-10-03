import { Injectable } from "@nestjs/common";
import { HealthCheckService, HealthCheckResult, HttpHealthIndicator } from "@nestjs/terminus";
import { getServiceLogger } from "../common/logger";

@Injectable()
export class HealthService {
  private readonly logger = getServiceLogger("api");

  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator
  ) {}

  async check(): Promise<HealthCheckResult & { service: string; timestamp: string }> {
    const supabaseUrl = process.env.SUPABASE_URL ?? "";
    const target = supabaseUrl ? `${supabaseUrl}/rest/v1/` : "https://status.supabase.com";

    const result = await this.health.check([
      () => this.http.pingCheck("supabase", target)
    ]);

    const payload = {
      ...result,
      service: "api",
      timestamp: new Date().toISOString()
    };

    this.logger.log(`health-check status=${payload.status}`);
    return payload;
  }
}
