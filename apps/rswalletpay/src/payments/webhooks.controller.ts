import { Body, Controller, Headers, Post } from "@nestjs/common";

@Controller("api/webhooks")
export class WebhooksController {
  @Post("psp")
  receive(@Headers() headers: Record<string, string>, @Body() payload: any) {
    return { ok: true, received: true, type: payload?.type ?? null, headersCount: Object.keys(headers || {}).length };
  }
}

