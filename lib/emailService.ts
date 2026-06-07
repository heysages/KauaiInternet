import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const DEFAULT_FROM = "Kauai Internet <hello@kauaiinternet.com>";

export async function sendOutboundEmail(options: {
  to: string;
  subject: string;
  text: string;
  submissionId?: string;
  threadKey?: string;
  replyTo?: string;
}): Promise<{ ok: boolean; providerId?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;

  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [options.to],
      reply_to: options.replyTo ?? process.env.SUPPORT_NOTIFY_EMAIL ?? "hello@kauaiinternet.com",
      subject: options.subject,
      text: options.text,
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: JSON.stringify(body) };
  }

  const providerId = body.id as string | undefined;
  const db = getSupabaseAdmin();
  if (db) {
    await db.from("kauai_email_messages").insert({
      direction: "outbound",
      submission_id: options.submissionId ?? null,
      from_email: from,
      to_email: options.to,
      subject: options.subject,
      body_text: options.text,
      provider_id: providerId ?? null,
      thread_key: options.threadKey ?? options.submissionId ?? null,
    });
  }

  return { ok: true, providerId };
}

export async function storeInboundEmail(options: {
  from: string;
  to: string;
  subject?: string;
  text: string;
  html?: string;
  providerId?: string;
}) {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const threadKey = options.from.toLowerCase();

  const { data, error } = await db
    .from("kauai_email_messages")
    .insert({
      direction: "inbound",
      from_email: options.from,
      to_email: options.to,
      subject: options.subject ?? null,
      body_text: options.text,
      body_html: options.html ?? null,
      provider_id: options.providerId ?? null,
      thread_key: threadKey,
    })
    .select()
    .single();

  if (error) {
    console.error("storeInboundEmail error:", error);
    return null;
  }

  await db.from("kauai_interest_submissions").insert({
    kind: "support",
    name: options.from.split("@")[0],
    email: options.from,
    message: options.text,
    location_label: "Inbound email",
    metadata: { source: "inbound-email", subject: options.subject ?? "" },
  });

  return data;
}

export async function listEmailMessages(limit = 100) {
  const db = getSupabaseAdmin();
  if (!db) return [];
  const { data } = await db
    .from("kauai_email_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
