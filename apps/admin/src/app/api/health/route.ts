import { NextResponse } from "next/server";
import { healthResponse } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICE_NAME = "admin";

export function GET() {
  const payload = healthResponse(SERVICE_NAME);
  return NextResponse.json(payload, { status: 200 });
}
