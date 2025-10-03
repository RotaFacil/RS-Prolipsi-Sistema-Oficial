import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentsService {
  createLink(body: any) {
    return { id: "plink_" + Date.now(), status: "created", ...body };
  }
  createCharge(kind: "pix" | "boleto" | "card", body: any) {
    return { id: `ch_${kind}_` + Date.now(), status: "created", kind, ...body };
  }
  createSubscription(body: any) {
    return { id: "sub_" + Date.now(), status: "active", ...body };
  }
}

