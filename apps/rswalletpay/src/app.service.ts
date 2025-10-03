import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: "ok",
      service: "rswalletpay",
      timestamp: new Date().toISOString()
    } as const;
  }
}
