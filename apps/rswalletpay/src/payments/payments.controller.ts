import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("api")
export class PaymentsController {
  constructor(private readonly svc: PaymentsService) {}

  @Post("payments/links")
  createLink(@Body() body: any) {
    return this.svc.createLink(body);
  }

  @Post("charges/pix")
  chargePix(@Body() body: any) {
    return this.svc.createCharge("pix", body);
  }

  @Post("charges/boleto")
  chargeBoleto(@Body() body: any) {
    return this.svc.createCharge("boleto", body);
  }

  @Post("charges/card")
  chargeCard(@Body() body: any) {
    return this.svc.createCharge("card", body);
  }

  @Post("subscriptions")
  createSub(@Body() body: any) {
    return this.svc.createSubscription(body);
  }
}

