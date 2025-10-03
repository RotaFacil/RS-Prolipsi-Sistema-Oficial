import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

async function handleRequest(path: string, options: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: error.message || `Failed to fetch ${path}` },
      { status: res.status }
    );
  }
  // Handle 204 No Content for DELETE
  if (res.status === 204) {
    return NextResponse.json({}, { status: 200 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function GET(_req: Request, ctx: Ctx) {
  return handleRequest(`/users/${ctx.params.id}`, { cache: "no-store" });
}

export async function PUT(req: Request, ctx: Ctx) {
  const body = await req.json().catch(() => ({}));
  return handleRequest(`/users/${ctx.params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  return handleRequest(`/users/${ctx.params.id}`, { method: "DELETE" });
}

