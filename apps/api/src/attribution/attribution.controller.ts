import { Body, Controller, Post } from "@nestjs/common";

@Controller("api")
export class AttributionController {
  @Post("links/short")
  short(@Body() b: any) { return { ok: true, code: Math.random().toString(36).slice(2,8), ...b }; }
  @Post("links/qr")
  qr(@Body() b: any) { return { ok: true, svg: "<svg/>", ...b }; }
  @Post("links/wa")
  wa(@Body() b: any) { return { ok: true, url: `https://wa.me/${b?.phone ?? ""}` }; }
  @Post("attribution/click")
  click(@Body() b: any) { return { ok: true, stored: true, click_id: "clk_" + Date.now() }; }
  @Post("attribution/apply")
  apply(@Body() b: any) { return { ok: true, applied: true, order_id: b?.order_id ?? null }; }
}

