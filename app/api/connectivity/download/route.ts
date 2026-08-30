import { NextResponse } from "next/server";

const MAX_BYTES = 2 * 1024 * 1024;
const DEFAULT_BYTES = 512 * 1024;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("bytes") ?? DEFAULT_BYTES);
  const bytes = Math.min(MAX_BYTES, Math.max(64 * 1024, Number.isFinite(requested) ? requested : DEFAULT_BYTES));

  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Length": String(bytes),
    },
  });
}
