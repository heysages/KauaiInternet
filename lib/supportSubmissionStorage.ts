import type { SupportSubmission } from "@/types/network";

const STORAGE_KEY = "krn-support-submissions";

// TODO: Replace localStorage with Supabase table `support_submissions`

export function loadSupportSubmissions(): SupportSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SupportSubmission[];
  } catch {
    return [];
  }
}

export function saveSupportSubmission(
  input: Omit<SupportSubmission, "id" | "createdAt">
): SupportSubmission {
  const submission: SupportSubmission = {
    ...input,
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const existing = loadSupportSubmissions();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing]));
  return submission;
}
