# Kauai Resilient Communications Network — Architecture

## Mission

Build an independent, resilient communications layer for Kauaʻi. Internet access is one service; the network also supports local messaging, emergency communications, radio mesh, and Island Mode when upstream connectivity fails.

## Three network layers

1. **Internet** — fiber, fixed wireless, satellite, cellular backhaul
2. **Kauaʻi Local Network** — island traffic without mainland round-trips
3. **Resilient Radio Mesh** — LoRa, Reticulum (evaluation), voice radio

## Data model

### Static planning data (`data/`)

- `networkNodes.ts` — K1–K5 node catalog (proposed)
- `networkLinks.ts` — typed links by medium
- `planningAreas.ts` — geographic planning zones
- `northShorePilot.ts` — pilot corridor and budget
- `networkRoadmap.ts` — Phase 0–8 roadmap

### Supabase

- `kauai_interest_submissions` — includes `node-application` kind for Host a Node
- `kauai_community_reports` — community reporting (schema ready, moderation required)
- `kauai_rf_measurements` — future Map the Island uploads

### Types (`types/network.ts`)

Core enums: `OperationalStatus`, `NodeClass`, `LinkMedium`, `NetworkMode`, `VisibilityLevel`

## Privacy

- Public maps use `approximate` visibility with coordinate fuzzing (`lib/networkVisibility.ts`)
- Host a Node applications store precise details in admin-only metadata

## Telemetry

- `lib/networkStatus.ts` returns honest empty state by default
- Set `NEXT_PUBLIC_NETWORK_TELEMETRY=mock` for labeled demonstration data
- Live telemetry integration is future work

## RF planning

- `lib/rfPlanning.ts` — stubs only; no fake propagation calculations
- Digital Twin Phase 2 covers future LOS/coverage modeling

## Admin

- `/admin/network` — NOC demo, failure simulator
- `/admin/strategy` — operating plan from static data files

## What is NOT claimed

- No operational LoRa/Reticulum coverage
- No live node telemetry (unless explicitly configured)
- No facility partnerships unless confirmed in data
- Not a replacement for 911
