import { Injectable } from "@nestjs/common";

@Injectable()
export class WalletService {
  ledger(entry: any) {
    return { ok: true, idempotency_key: entry?.idempotency_key ?? null };
  }
  payout(body: any) { return { ok: true, payout_id: "p_" + Date.now(), ...body }; }
  transfer(body: any) { return { ok: true, transfer_id: "t_" + Date.now(), ...body }; }
  extract(q: any) { return { ok: true, filters: q, items: [] }; }
  splitSim(b: any) { return { ok: true, preview: { inputs: b, lines: [] } }; }
  splitPublish(b: any) { return { ok: true, table_id: "st_" + Date.now(), version: b?.version ?? null }; }
}

