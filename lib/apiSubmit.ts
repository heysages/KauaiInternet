import type { CreateSubmissionInput } from "@/lib/submissionsDb";

export async function postSubmission(
  kind: CreateSubmissionInput["kind"],
  payload: Omit<CreateSubmissionInput, "kind">
): Promise<{ ok: boolean; id?: string; stored: boolean }> {
  try {
    const res = await fetch(`/api/submissions/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, id: data.id, stored: Boolean(data.stored) };
  } catch {
    return { ok: false, stored: false };
  }
}
