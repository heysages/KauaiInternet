import type { SupportMarker } from "@/types/network";
import { mockSupportMarkers } from "@/data/mapSupportMarkers";

const STORAGE_KEY = "krn-support-markers";

// TODO: Replace localStorage persistence with Supabase table `support_markers`
// Schema sketch: id, name_or_org, email, support_type, message, lat, lng,
// location_label, may_contact, created_at, moderated, source

export function loadVisitorMarkers(): SupportMarker[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SupportMarker[];
  } catch {
    return [];
  }
}

export function saveVisitorMarker(marker: SupportMarker): void {
  const existing = loadVisitorMarkers();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([marker, ...existing]));
}

export function loadAllSupportMarkers(): SupportMarker[] {
  const visitor = typeof window !== "undefined" ? loadVisitorMarkers() : [];
  return [...visitor, ...mockSupportMarkers];
}

export function createSupportMarker(
  input: Omit<SupportMarker, "id" | "createdAt" | "source">
): SupportMarker {
  return {
    ...input,
    id: `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    source: "visitor",
  };
}
