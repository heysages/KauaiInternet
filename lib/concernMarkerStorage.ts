import type { CommunityConcernMarker } from "@/types/network";
import { mockConcernMarkers } from "@/data/mockConcernMarkers";

const STORAGE_KEY = "krn-concern-markers";

export function loadVisitorConcernMarkers(): CommunityConcernMarker[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CommunityConcernMarker[];
  } catch {
    return [];
  }
}

export function saveVisitorConcernMarker(marker: CommunityConcernMarker): void {
  const existing = loadVisitorConcernMarkers();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([marker, ...existing]));
}

export function loadAllConcernMarkers(): CommunityConcernMarker[] {
  const visitor = typeof window !== "undefined" ? loadVisitorConcernMarkers() : [];
  return [...visitor, ...mockConcernMarkers];
}

export function createConcernMarker(
  input: Omit<CommunityConcernMarker, "id" | "createdAt" | "source">
): CommunityConcernMarker {
  return {
    ...input,
    id: `concern-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    source: "visitor",
  };
}
