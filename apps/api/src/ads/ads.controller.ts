import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("api/ads")
export class AdsController {
  @Post("slots")
  createSlot(@Body() b: any) { return { ok: true, slot_id: "slot_" + Date.now(), ...b }; }
  @Get("slots")
  listSlots() { return { ok: true, items: [] }; }
  @Post("campaigns")
  createCampaign(@Body() b: any) { return { ok: true, campaign_id: "cmp_" + Date.now(), ...b }; }
  @Post("impression")
  impression(@Body() b: any) { return { ok: true, id: "imp_" + Date.now(), ...b }; }
  @Post("click")
  click(@Body() b: any) { return { ok: true, id: "clk_" + Date.now(), ...b }; }
}

