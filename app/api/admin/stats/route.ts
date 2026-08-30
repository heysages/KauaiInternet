import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getWebAnalyticsSummary } from "@/lib/analyticsDb";
import { getConnectivitySummary } from "@/lib/connectivityTestDb";
import { getSubmissionStats } from "@/lib/submissionsDb";
import { listEmailMessages } from "@/lib/emailService";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [stats, traffic, connectivity, emails] = await Promise.all([
    getSubmissionStats(),
    getWebAnalyticsSummary(),
    getConnectivitySummary(),
    listEmailMessages(500),
  ]);
  const inbound = emails.filter((e) => e.direction === "inbound").length;
  const outbound = emails.filter((e) => e.direction === "outbound").length;

  return NextResponse.json({
    ...stats,
    email: { inbound, outbound },
    traffic,
    connectivity,
  });
}
