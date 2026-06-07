import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SubmissionKind = "support" | "feedback" | "observation" | "concern";
export type SubmissionStatus = "new" | "reviewed" | "replied" | "archived";

export type InterestSubmission = {
  id: string;
  kind: SubmissionKind;
  status: SubmissionStatus;
  name: string | null;
  email: string | null;
  organization: string | null;
  location_label: string | null;
  support_type: string | null;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type EmailMessage = {
  id: string;
  direction: "inbound" | "outbound";
  submission_id: string | null;
  from_email: string;
  to_email: string;
  subject: string | null;
  body_text: string;
  body_html: string | null;
  provider_id: string | null;
  thread_key: string | null;
  created_at: string;
};

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export function isBackendConfigured(): boolean {
  return Boolean(getSupabaseAdmin());
}
