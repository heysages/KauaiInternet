# Kauai Resilient Communications Network — Architecture

## Mission

Build an independent, resilient communications layer for Kauaʻi. Internet access is one service; the network also supports local messaging, emergency communications, radio mesh, and Island Mode when upstream connectivity fails.

**Critical design principle:** Every network component must be able to operate without grid power. Solar and battery systems are not optional add-ons—they are core infrastructure.

## Three network layers

1. **Internet** — fiber, fixed wireless, satellite, cellular backhaul
2. **Kauaʻi Local Network** — island traffic without mainland round-trips
3. **Resilient Radio Mesh** — LoRa, Reticulum (evaluation), voice radio

## Power Independence Architecture

### Design Philosophy

Traditional networks fail when the power grid fails. This network inverts that assumption:

- **Primary design target:** 72+ hours of operation without grid power
- **Secondary target:** Indefinite operation via solar during sustained outages
- **Every backbone node (K3+)** must have solar + battery as standard equipment
- **Community hubs (K5)** require generator backup in addition to solar

### Power Tiers

| Tier | Grid Dependency | Target Runtime | Node Classes |
|------|-----------------|----------------|--------------|
| Tier 0 | None (solar-only) | Indefinite | K2 relays |
| Tier 1 | Optional | 72+ hours | K3 backbone, K5 hubs |
| Tier 2 | Primary, battery backup | 24–48 hours | K4 gateways |
| Tier 3 | Primary, UPS only | 4–8 hours | K1 endpoints |

### Hurricane Operations Mode

When a major storm is forecast:

1. **T-48 hours:** Pre-charge all batteries, fuel generators, stage deployment kits
2. **T-24 hours:** Activate priority nodes, confirm mesh paths, shed non-essential loads
3. **T-0 to T+72:** Emergency mesh mode—LoRa and Reticulum prioritized
4. **Recovery:** Assess damage, deploy rapid response kits, restore backhaul

See [EMERGENCY_OPERATIONS.md](./EMERGENCY_OPERATIONS.md) for detailed protocols.

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

## Emergency Deployment

The network includes rapid deployment capabilities for hurricane and disaster response:

### Deployment Kits

- **Kit A (Solar LoRa Relay):** Self-contained K2 node for mesh coverage extension
- **Kit B (Community Hub):** K5-class shelter support with Wi-Fi and charging
- **Kit C (Backbone Link):** Point-to-point backhaul restoration

### Team Deployment

A standby deployment team can rapidly establish communications in affected areas:

1. Pre-staged equipment kits at designated locations
2. Documented deployment procedures for each kit type
3. Site assessment and safety protocols
4. Network configuration pre-loaded on equipment

See [EMERGENCY_OPERATIONS.md](./EMERGENCY_OPERATIONS.md) for complete deployment procedures.

## What is NOT claimed

- No operational LoRa/Reticulum coverage
- No live node telemetry (unless explicitly configured)
- No facility partnerships unless confirmed in data
- Not a replacement for 911
