import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { listSubmissions, updateSubmissionStatus } from "@/lib/submissionsDb";
import type { SubmissionKind, SubmissionStatus } from "@/lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const kind = request.nextUrl.searchParams.get("kind") as SubmissionKind | null;
  const status = request.nextUrl.searchParams.get("status") as SubmissionStatus | null;

  const submissions = await listSubmissions({
    kind: kind ?? undefined,
    status: status ?? undefined,
  });

  return NextResponse.json({ submissions });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: string; status?: SubmissionStatus };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  const ok = await updateSubmissionStatus(body.id, body.status);
  return NextResponse.json({ ok });
}
