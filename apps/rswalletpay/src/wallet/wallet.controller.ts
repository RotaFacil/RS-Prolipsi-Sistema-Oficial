import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller("api/wallet")
export class WalletController {
  constructor(private readonly svc: WalletService) {}

  @Post("ledger")
  ledger(@Body() body: any) {
    return this.svc.ledger(body);
  }

  @Post("payouts")
  payouts(@Body() body: any) {
    return this.svc.payout(body);
  }

  @Post("transfers")
  transfers(@Body() body: any) {
    return this.svc.transfer(body);
  }

  @Get("extract")
  extract(@Query() q: any) {
    return this.svc.extract(q);
  }

  @Post("split/simulate")
  splitSim(@Body() b: any) {
    return this.svc.splitSim(b);
  }

  @Post("split/publish")
  splitPublish(@Body() b: any) {
    return this.svc.splitPublish(b);
  }
}

