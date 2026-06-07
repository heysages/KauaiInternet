import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getWebAnalyticsStats } from "@/lib/analyticsDb";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getWebAnalyticsStats();
  return NextResponse.json(stats);
}
