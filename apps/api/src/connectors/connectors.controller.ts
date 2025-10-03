import { Body, Controller, Param, Post } from "@nestjs/common";

@Controller("api/connectors")
export class ConnectorsController {
  @Post(":partner/auth")
  auth(@Param("partner") partner: string, @Body() body: any) {
    return { ok: true, partner, saved: true };
  }
  @Post(":partner/import/products")
  importProducts(@Param("partner") partner: string) {
    return { ok: true, partner, job: "import_products" };
  }
  @Post(":partner/import/orders")
  importOrders(@Param("partner") partner: string) {
    return { ok: true, partner, job: "import_orders" };
  }
}

