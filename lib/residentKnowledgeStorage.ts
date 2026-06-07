import type { ResidentObservation } from "@/types/network";
import { mockResidentObservations } from "@/data/mockResidentObservations";

const STORAGE_KEY = "krn-resident-observations";

export function loadVisitorObservations(): ResidentObservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ResidentObservation[];
  } catch {
    return [];
  }
}

export function saveVisitorObservation(observation: ResidentObservation): void {
  const existing = loadVisitorObservations();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([observation, ...existing]));
}

export function loadAllResidentObservations(): ResidentObservation[] {
  const visitor = typeof window !== "undefined" ? loadVisitorObservations() : [];
  return [...visitor, ...mockResidentObservations];
}

export function createResidentObservation(
  input: Omit<ResidentObservation, "id" | "createdAt" | "source" | "dataConfidence">
): ResidentObservation {
  return {
    ...input,
    id: `obs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    source: "visitor",
    dataConfidence: "community",
  };
}
