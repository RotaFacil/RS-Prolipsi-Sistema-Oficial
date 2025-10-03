import { Body, Controller, Param, Post } from "@nestjs/common";

@Controller("api/groups")
export class GroupsController {
  @Post()
  create(@Body() body: any) {
    return { id: "grp_" + Date.now(), status: "created", ...body };
  }
  @Post(":id/paylinks")
  paylinks(@Param("id") id: string, @Body() body: any) {
    return { group_id: id, created: true, members: body?.members ?? [] };
  }
  @Post(":id/settle")
  settle(@Param("id") id: string, @Body() body: any) {
    return { group_id: id, settled: true, rule: body?.rule ?? "100%" };
  }
}

