import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { sendOutboundEmail } from "@/lib/emailService";
import { getSubmission, updateSubmissionStatus } from "@/lib/submissionsDb";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { submissionId?: string; to?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  let to = body.to?.trim();
  const submissionId = body.submissionId;

  if (submissionId) {
    const submission = await getSubmission(submissionId);
    if (!submission?.email) {
      return NextResponse.json({ error: "Submission has no email" }, { status: 400 });
    }
    to = submission.email;
  }

  if (!to) {
    return NextResponse.json({ error: "Recipient required" }, { status: 400 });
  }

  const subject =
    body.subject?.trim() ||
    "Thank you for your interest in Kauai Internet";

  const result = await sendOutboundEmail({
    to,
    subject,
    text: body.message.trim(),
    submissionId,
    threadKey: submissionId ?? to.toLowerCase(),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Send failed" }, { status: 502 });
  }

  if (submissionId) {
    await updateSubmissionStatus(submissionId, "replied");
  }

  return NextResponse.json({ ok: true, providerId: result.providerId });
}
