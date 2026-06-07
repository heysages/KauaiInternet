import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissionsDb";
import { sendOutboundEmail } from "@/lib/emailService";

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
  if (!body.mayContact) {
    return NextResponse.json({ error: "Contact consent required" }, { status: 400 });
  }

  const submission = await createSubmission({
    kind: "support",
    name: body.name.trim(),
    email: body.email.trim(),
    organization: body.organization?.trim(),
    supportType: body.supportType,
    locationLabel: body.location?.trim(),
    message: body.helpMessage.trim(),
    metadata: { mayContact: true },
  });

  if (process.env.RESEND_API_KEY && process.env.SUPPORT_NOTIFY_EMAIL) {
    await sendOutboundEmail({
      to: process.env.SUPPORT_NOTIFY_EMAIL,
      subject: `New interest: ${body.name.trim()}`,
      text: [
        `Name: ${body.name}`,
        body.organization ? `Org: ${body.organization}` : null,
        `Email: ${body.email}`,
        `Type: ${body.supportType}`,
        body.location ? `Location: ${body.location}` : null,
        "",
        body.helpMessage,
      ]
        .filter(Boolean)
        .join("\n"),
      threadKey: body.email.trim().toLowerCase(),
    }).catch(() => undefined);
  }

  return NextResponse.json({
    ok: true,
    id: submission?.id,
    stored: Boolean(submission),
  });
}
