import { Body, Controller, Post } from "@nestjs/common";

@Controller("api/sigme")
export class SigmeController {
  @Post("rules/publish")
  publish(@Body() body: any) { return { ok: true, version: body?.version ?? "v1" }; }
  @Post("rules/simulate")
  simulate(@Body() body: any) { return { ok: true, result: { units: 0, params: body } }; }
  @Post("events")
  event(@Body() body: any) { return { ok: true, stored: true, event: body }; }
  @Post("toggle")
  toggle(@Body() body: any) { return { ok: true, effective: !!body?.on }; }
}

