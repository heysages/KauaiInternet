import {
  getSupabaseAdmin,
  type InterestSubmission,
  type SubmissionKind,
  type SubmissionStatus,
} from "@/lib/supabaseAdmin";

export type CreateSubmissionInput = {
  kind: SubmissionKind;
  name?: string;
  email?: string;
  organization?: string;
  locationLabel?: string;
  supportType?: string;
  message: string;
  metadata?: Record<string, unknown>;
};

export async function createSubmission(
  input: CreateSubmissionInput
): Promise<InterestSubmission | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const { data, error } = await db
    .from("kauai_interest_submissions")
    .insert({
      kind: input.kind,
      name: input.name ?? null,
      email: input.email ?? null,
      organization: input.organization ?? null,
      location_label: input.locationLabel ?? null,
      support_type: input.supportType ?? null,
      message: input.message,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    console.error("createSubmission error:", error);
    return null;
  }
  return data as InterestSubmission;
}

export async function listSubmissions(options?: {
  kind?: SubmissionKind;
  status?: SubmissionStatus;
  limit?: number;
}): Promise<InterestSubmission[]> {
  const db = getSupabaseAdmin();
  if (!db) return [];

  let query = db
    .from("kauai_interest_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(options?.limit ?? 200);

  if (options?.kind) query = query.eq("kind", options.kind);
  if (options?.status) query = query.eq("status", options.status);

  const { data, error } = await query;
  if (error) {
    console.error("listSubmissions error:", error);
    return [];
  }
  return (data ?? []) as InterestSubmission[];
}

export async function getSubmission(id: string): Promise<InterestSubmission | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;
  const { data, error } = await db
    .from("kauai_interest_submissions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as InterestSubmission;
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<boolean> {
  const db = getSupabaseAdmin();
  if (!db) return false;
  const { error } = await db
    .from("kauai_interest_submissions")
    .update({ status })
    .eq("id", id);
  return !error;
}

export async function getSubmissionStats() {
  const db = getSupabaseAdmin();
  if (!db) {
    return {
      total: 0,
      byKind: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      last7Days: 0,
    };
  }

  const { data } = await db.from("kauai_interest_submissions").select("kind, status, created_at");
  const rows = data ?? [];
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const byKind: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let last7Days = 0;

  for (const row of rows) {
    byKind[row.kind] = (byKind[row.kind] ?? 0) + 1;
    byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
    if (new Date(row.created_at).getTime() >= weekAgo) last7Days += 1;
  }

  return { total: rows.length, byKind, byStatus, last7Days };
}
