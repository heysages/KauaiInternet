import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissionsDb";
import { notifySupportTeam } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    organization?: string;
    supportType?: string;
    helpMessage?: string;
    location?: string;
    mayContact?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.helpMessage?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const submission = await createSubmission({
    kind: "support",
    name: body.name.trim(),
    email: body.email.trim(),
    organization: body.organization?.trim(),
    supportType: body.supportType,
    locationLabel: body.location?.trim(),
    message: body.helpMessage.trim(),
    metadata: { mayContact: Boolean(body.mayContact) },
  });

  await notifySupportTeam({
    subject: `New interest: ${body.name.trim()}`,
    text: body.helpMessage.trim(),
    threadKey: body.email.trim().toLowerCase(),
    replyTo: body.email.trim(),
  });

  return NextResponse.json({ ok: true, id: submission?.id, stored: Boolean(submission) });
}
