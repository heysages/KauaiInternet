import type { CommunityFeedbackPriority } from "@/types/network";

const STORAGE_KEY = "krn-community-feedback";

export type CommunityFeedbackEntry = {
  id: string;
  priorities: CommunityFeedbackPriority[];
  otherNote?: string;
  locationLabel?: string;
  createdAt: string;
};

export function loadCommunityFeedback(): CommunityFeedbackEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CommunityFeedbackEntry[];
  } catch {
    return [];
  }
}

export function saveCommunityFeedback(entry: Omit<CommunityFeedbackEntry, "id" | "createdAt">): void {
  const existing = loadCommunityFeedback();
  const full: CommunityFeedbackEntry = {
    ...entry,
    id: `feedback-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([full, ...existing]));
}
