import { NextResponse } from "next/server";

const MAX_BYTES = 2 * 1024 * 1024;

export async function POST(request: Request) {
  const buffer = await request.arrayBuffer();
  const bytes = buffer.byteLength;
  if (bytes > MAX_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  return NextResponse.json({ ok: true, bytes });
}
