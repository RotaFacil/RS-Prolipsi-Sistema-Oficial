import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString()
    } as const;
  }
}
