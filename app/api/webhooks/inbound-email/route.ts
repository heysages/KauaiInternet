import { NextRequest, NextResponse } from "next/server";
import { storeInboundEmail } from "@/lib/emailService";

/**
 * Inbound email webhook — configure Resend (or similar) to POST here.
 * Resend inbound payload: https://resend.com/docs/dashboard/receiving/introduction
 */
export async function POST(request: NextRequest) {
  const secret = process.env.INBOUND_EMAIL_WEBHOOK_SECRET;
  if (secret) {
    const header = request.headers.get("x-webhook-secret");
    if (header !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Resend inbound format
  const from =
    (payload.from as string) ??
    (payload.data as { from?: string })?.from ??
    "unknown@unknown";
  const to =
    (payload.to as string) ??
    (payload.data as { to?: string })?.to ??
    "hello@kauaiinternet.com";
  const subject =
    (payload.subject as string) ??
    (payload.data as { subject?: string })?.subject;
  const text =
    (payload.text as string) ??
    (payload.data as { text?: string })?.text ??
    (payload.html as string) ??
    "";
  const html =
    (payload.html as string) ?? (payload.data as { html?: string })?.html;
  const providerId =
    (payload.id as string) ?? (payload.data as { id?: string })?.id;

  if (!text.trim()) {
    return NextResponse.json({ error: "Empty body" }, { status: 400 });
  }

  const stored = await storeInboundEmail({
    from,
    to: Array.isArray(to) ? to[0] : to,
    subject,
    text,
    html,
    providerId,
  });

  return NextResponse.json({ ok: true, stored: Boolean(stored) });
}
