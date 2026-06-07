import { NextResponse } from "next/server";
import { adminCookieOptions, COOKIE_NAME } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", adminCookieOptions(0));
  return response;
}
