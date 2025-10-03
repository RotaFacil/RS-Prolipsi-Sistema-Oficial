import { NextResponse } from "next/server";
import { Consultores } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ data: Consultores.list() });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { nome, email, telefone, especialidade, ativo } = body ?? {};
  if (!nome || !email) return NextResponse.json({ error: "nome e email são obrigatórios" }, { status: 400 });
  const created = Consultores.create({ nome, email, telefone, especialidade, ativo: Boolean(ativo) });
  return NextResponse.json(created, { status: 201 });
}

