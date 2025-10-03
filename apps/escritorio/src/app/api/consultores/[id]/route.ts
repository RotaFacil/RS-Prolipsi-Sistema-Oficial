import { NextResponse } from "next/server";
import { Consultores } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const c = Consultores.get(ctx.params.id);
  if (!c) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(c);
}

export async function PUT(req: Request, ctx: Ctx) {
  const body = await req.json().catch(() => ({}));
  const updated = Consultores.update(ctx.params.id, body ?? {});
  if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const ok = Consultores.remove(ctx.params.id);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

