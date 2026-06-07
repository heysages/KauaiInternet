import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieOptions,
  COOKIE_NAME,
  createAdminSessionToken,
  SESSION_DAYS,
} from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Session error" }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    COOKIE_NAME,
    token,
    adminCookieOptions(SESSION_DAYS * 24 * 60 * 60)
  );
  return response;
}
