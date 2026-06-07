import type { CandidateSite } from "@/types/network";
import { sitePlanningById } from "@/data/sitePlanningDetails";

const COVERAGE_BY_TYPE: Record<CandidateSite["type"], string> = {
  "emergency-anchor": "2–5 mi emergency coordination radius",
  "community-anchor": "1–3 mi community assembly Wi-Fi",
  "high-site-ridge": "8–15 mi line-of-sight backhaul corridor",
  "data-center-edge": "Island-wide aggregation hub",
  "public-wifi-zone": "0.5–1.5 mi public access zone",
  "backup-uplink": "Island-wide redundant uplink path",
  "partner-hosted": "3–8 mi relay extension",
};

const RESILIENCE_BY_TYPE: Record<CandidateSite["type"], number> = {
  "emergency-anchor": 78,
  "community-anchor": 62,
  "high-site-ridge": 71,
  "data-center-edge": 85,
  "public-wifi-zone": 48,
  "backup-uplink": 82,
  "partner-hosted": 55,
};

export function getSiteCoverage(site: CandidateSite): string {
  return (
    sitePlanningById[site.id]?.potentialCoverage ??
    COVERAGE_BY_TYPE[site.type] ??
    "Coverage modeling in progress"
  );
}

export function getSiteResilienceImpact(site: CandidateSite): number {
  return (
    sitePlanningById[site.id]?.resilienceImpactPercent ??
    RESILIENCE_BY_TYPE[site.type] ??
    50
  );
}
