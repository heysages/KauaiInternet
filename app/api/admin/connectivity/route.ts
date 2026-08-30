import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getConnectivityTestStats } from "@/lib/connectivityTestDb";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getConnectivityTestStats();
  return NextResponse.json(stats);
}
