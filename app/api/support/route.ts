import { NextRequest, NextResponse } from "next/server";

type SupportPayload = {
  name: string;
  email: string;
  supportType: string;
  helpMessage: string;
  location?: string;
  organization?: string;
  mayContact: boolean;
};

export async function POST(request: NextRequest) {
  let body: SupportPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.supportType || !body.helpMessage?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!body.email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!body.mayContact) {
    return NextResponse.json({ error: "Contact consent required" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.SUPPORT_NOTIFY_EMAIL ?? "hello@kauaiinternet.com";

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Kauai Internet <onboarding@resend.dev>",
          to: [notifyEmail],
          reply_to: body.email.trim(),
          subject: `Community support: ${body.name.trim()}`,
          text: [
            `Name: ${body.name.trim()}`,
            body.organization ? `Organization: ${body.organization}` : null,
            `Email: ${body.email.trim()}`,
            `Type: ${body.supportType}`,
            body.location ? `Location: ${body.location}` : null,
            "",
            body.helpMessage.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!res.ok) {
        console.error("Resend error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to send support email:", err);
    }
  }

  return NextResponse.json({ ok: true, emailed: Boolean(resendKey) });
}
