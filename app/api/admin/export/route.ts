import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { listSubmissions } from "@/lib/submissionsDb";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await listSubmissions({ limit: 5000 });
  const header = [
    "id",
    "kind",
    "status",
    "name",
    "email",
    "organization",
    "location",
    "support_type",
    "message",
    "created_at",
  ];

  const rows = submissions.map((s) =>
    [
      s.id,
      s.kind,
      s.status,
      s.name ?? "",
      s.email ?? "",
      s.organization ?? "",
      s.location_label ?? "",
      s.support_type ?? "",
      JSON.stringify(s.message),
      s.created_at,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kauai-interest-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
