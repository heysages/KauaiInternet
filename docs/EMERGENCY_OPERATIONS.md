# Emergency Operations & Deployment Guide

## Purpose

This document provides operational protocols for deploying and maintaining the Kauaʻi Resilient Communications Network during emergencies when grid power is unavailable. It is designed for the rapid deployment team and network operators.

---

## Power Outage Network Modes

### Mode 1: Grid Available (Normal)
- All nodes powered by utility grid with battery backup
- Full Internet, local network, and mesh services operational
- Typical runtime: indefinite

### Mode 2: Grid Down — Battery Sustaining
- Nodes running on battery backup (UPS, tower batteries)
- Priority: shed non-essential loads, extend runtime
- Typical runtime: 4–24 hours depending on node class and battery sizing

### Mode 3: Grid Down — Solar Sustaining
- Solar-equipped nodes self-sustaining during daylight
- Battery provides overnight bridge
- Typical runtime: indefinite with adequate sun; 12–36 hours overcast

### Mode 4: Grid Down — Emergency Mesh Only
- Only battery/solar nodes remain online
- Network degrades to LoRa/Reticulum mesh paths
- Priority messaging only (P0–P2)
- Typical runtime: varies by site; expect 24–72 hours minimum for priority nodes

---

## Power Requirements by Node Class

| Class | Role | Min Battery | Solar Target | Grid Runtime | Off-Grid Target |
|-------|------|-------------|--------------|--------------|-----------------|
| K1 | Personal/Home node | 4–8 hours | Optional | Indefinite | 8–24 hours |
| K2 | Solar relay | 24 hours | Required | N/A (off-grid by design) | 48+ hours |
| K3 | Backbone node | 12–24 hours | Strongly recommended | Indefinite | 24–48 hours |
| K4 | Edge gateway | 4–8 hours | Recommended | Indefinite | 12–24 hours |
| K5 | Community hub | 24–48 hours | Required | Indefinite | 72+ hours |

### Power Consumption Estimates

| Component | Typical Draw | Notes |
|-----------|--------------|-------|
| LoRa radio (Meshtastic) | 0.5–2W | Low duty cycle extends runtime |
| Raspberry Pi 4 | 3–5W | Edge compute, Reticulum transport |
| MikroTik hAP | 5–8W | Local routing/switching |
| NanoBeam 5AC | 8–12W | Point-to-point backhaul |
| Starlink | 50–100W | Satellite uplink (high draw) |

---

## Emergency Deployment Team Protocol

### Team Readiness Checklist

**Before Deployment:**
- [ ] Weather window confirmed safe for travel
- [ ] All rapid deployment kits inventoried and charged
- [ ] Vehicle(s) fueled and equipment loaded
- [ ] Communication plan established (radio frequencies, check-in schedule)
- [ ] Site access permissions confirmed or emergency authorization obtained
- [ ] Safety gear: hard hats, high-vis vests, work gloves, first aid kit
- [ ] Personal supplies: water, food, flashlights, rain gear

**Required Documentation:**
- [ ] Site coordinates and access directions
- [ ] Property owner contact information
- [ ] Equipment manifest for each kit
- [ ] Network configuration reference (frequencies, IPs, credentials)
- [ ] This emergency operations guide

---

## Rapid Deployment Kits

### Kit A: Solar LoRa Relay (K2 Node)
**Purpose:** Establish mesh coverage in grid-down areas  
**Deployment time:** 30–60 minutes  
**Runtime:** 48+ hours (solar sustaining)

| Item | Qty | Notes |
|------|-----|-------|
| LoRa radio (RAK/Heltec/Meshtastic) | 1 | Pre-configured with network settings |
| Raspberry Pi 4 + case | 1 | Reticulum transport, optional |
| 100W solar panel | 1 | Foldable or rigid mount |
| 12V 50Ah LiFePO4 battery | 1 | ~600Wh capacity |
| Solar charge controller (MPPT) | 1 | 20A minimum |
| Antenna (5dBi omni or Yagi) | 1 | Based on terrain |
| Weatherproof enclosure | 1 | NEMA 4X rated |
| Mounting hardware | 1 set | Pole clamps, guy wires, stakes |
| Cabling (coax, power) | 1 set | Pre-terminated |
| Basic tools | 1 set | Wrenches, zip ties, tape |

### Kit B: Community Hub (K5 Node)
**Purpose:** Provide Wi-Fi, charging, and information services at shelters  
**Deployment time:** 1–2 hours  
**Runtime:** 72+ hours (generator or large solar array)

| Item | Qty | Notes |
|------|-----|-------|
| Wi-Fi access point (outdoor rated) | 1–2 | Wave AP or similar |
| MikroTik router | 1 | Local DHCP, DNS, captive portal |
| Raspberry Pi 4 | 1 | Local services (info page, messaging) |
| 200–400W solar array | 1 | Portable panels or ground mount |
| 12V 100Ah LiFePO4 battery | 1–2 | 1200–2400Wh capacity |
| Inverter (pure sine, 500W+) | 1 | For charging stations |
| USB charging station | 1 | 6–10 port |
| LoRa radio | 1 | Mesh connectivity |
| Starlink terminal | 1 | If backhaul required |
| Generator (2000W) | 1 | Backup power, fuel for 24+ hours |
| Signage | 1 set | "Emergency Wi-Fi" / "Charging Station" |

### Kit C: Backbone Link (K3 Node)
**Purpose:** Re-establish point-to-point backhaul between sites  
**Deployment time:** 2–4 hours  
**Runtime:** 24–48 hours

| Item | Qty | Notes |
|------|-----|-------|
| NanoBeam 5AC pair | 2 | Pre-aligned if possible |
| MikroTik router | 1 | Routing between segments |
| 100W solar panel | 1 | |
| 12V 50Ah LiFePO4 battery | 1 | |
| Tripod or pole mount | 2 | For temporary alignment |
| Laptop with UISP/WinBox | 1 | Configuration and alignment |
| Spectrum analyzer | 1 | Optional, for interference check |

---

## Site Deployment Procedure

### Phase 1: Site Assessment (15 min)
1. Confirm site is safe (no downed power lines, structural damage)
2. Identify optimal antenna placement (elevation, line-of-sight)
3. Locate power source or position solar panels
4. Verify ground or mounting surface stability

### Phase 2: Power System Setup (20–30 min)
1. Position solar panel(s) facing south, optimal tilt for season
2. Connect charge controller to battery
3. Connect solar panel(s) to charge controller
4. Verify charging indicator / voltage
5. Connect load output to equipment power distribution

### Phase 3: Equipment Deployment (20–40 min)
1. Mount antenna at identified location
2. Connect antenna to radio with appropriate coax
3. Power on equipment in sequence: router → radio → access point
4. Verify radio connectivity (LED indicators, mesh peers)
5. Test network connectivity (ping gateway, check mesh routes)

### Phase 4: Verification & Documentation (10–15 min)
1. Confirm node appears in network status (if telemetry available)
2. Test end-user connectivity (phone/laptop Wi-Fi)
3. Document site location, equipment serial numbers, config notes
4. Take photos of installation for records
5. Notify operations center of successful deployment

---

## Network Prioritization During Outages

### Message Priority Classes

| Priority | Type | Examples | Latency Target |
|----------|------|----------|----------------|
| P0 | Life safety | SOS, medical emergency, evacuation | < 1 minute |
| P1 | Emergency coordination | First responder comms, shelter status | < 5 minutes |
| P2 | Critical infrastructure | Road status, utility updates | < 15 minutes |
| P3 | Community welfare | Check-ins, supply requests | < 1 hour |
| P4 | General information | News, weather updates | Best effort |
| P5 | Non-essential | Social, entertainment | Deferred |

### Load Shedding Sequence

When battery reserves drop below thresholds:

| Battery Level | Action |
|---------------|--------|
| 100–50% | Full services operational |
| 50–30% | Disable non-essential services (caching, analytics) |
| 30–20% | Reduce Wi-Fi power, limit backhaul bandwidth |
| 20–10% | LoRa/mesh only, Wi-Fi disabled |
| < 10% | P0–P1 messages only, prepare for shutdown |
| < 5% | Graceful shutdown, preserve config |

---

## Communication Channels

### Primary: LoRa Mesh (Meshtastic)
- Channel: Pre-configured "KauaiNet" channel
- Encryption: AES256 with shared key
- Range: 2–15 km depending on terrain and antenna

### Secondary: Reticulum
- Transport: TCP/IP where available, LoRa fallback
- Use for: Larger messages, file transfer, store-and-forward

### Backup: Amateur Radio
- VHF Simplex: 146.520 MHz (calling frequency)
- UHF Simplex: 446.000 MHz
- Local repeaters: [Confirm current repeater status]
- License required for transmission

### Emergency: Satellite
- Starlink: Where deployed and powered
- Garmin inReach / Zoleo: Personal locator beacons for team

---

## Post-Deployment Operations

### Daily Check-In Protocol
- 0800: Morning status report (battery levels, connectivity)
- 1200: Midday check (solar charging performance)
- 1800: Evening report (overnight runtime estimate)
- As needed: Incident reports, equipment failures

### Maintenance During Extended Outages
- Monitor battery state of charge
- Clear debris from solar panels
- Check antenna connections and alignment
- Rotate backup batteries if available
- Refuel generators on schedule

### Recovery Phase
- Document all temporary deployments
- Begin transition to permanent installations where appropriate
- Conduct after-action review
- Update this guide with lessons learned

---

## Equipment Location Quick Reference

### Available Inventory (from warehouse)
| Equipment | Quantity | Primary Use |
|-----------|----------|-------------|
| Tower site batteries | 30 | Extended runtime at relay sites |
| NanoBeam 5AC | 85 | Point-to-point backhaul |
| Starlink setups | 2 | Satellite failover |
| CyberPower UPS | 2 | Sheltered node backup |
| IPC (Industrial PC) | 5 | Outdoor edge compute |
| Dell Micro PC | 6 | Local services |
| Wave AP | 14 | Community Wi-Fi |

### Pre-Staged Kits
| Kit | Location | Status |
|-----|----------|--------|
| Kit A (Solar Relay) × 3 | TBD — staging required | Proposed |
| Kit B (Community Hub) × 2 | TBD — staging required | Proposed |
| Kit C (Backbone Link) × 2 | TBD — staging required | Proposed |

---

## Emergency Contacts

| Role | Contact | Notes |
|------|---------|-------|
| Network Operations | TBD | Primary coordination |
| Deployment Team Lead | TBD | Field operations |
| Equipment/Warehouse | TBD | Inventory and logistics |
| Kauai Civil Defense | (808) 241-1800 | Official emergency management |
| Hawaiian Telcom NOC | TBD | Upstream ISP coordination |

---

## Appendix: Solar Sizing Quick Reference

### Calculating Battery Runtime
```
Runtime (hours) = Battery Capacity (Wh) / Total Load (W)
Example: 600Wh battery / 15W load = 40 hours
```

### Calculating Solar Panel Size
```
Panel Size (W) = Daily Load (Wh) / Peak Sun Hours / 0.8 (efficiency)
Example: 360Wh daily / 5 hours / 0.8 = 90W panel minimum
```

### Kauaʻi Solar Conditions
- Peak sun hours: 4–6 hours (varies by season, weather)
- Hurricane/storm conditions: Assume 1–2 hours or zero
- Recommendation: Size solar for 2× normal load to account for cloudy days

---

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2026-09-14 | Initial emergency operations guide created | Network Team |

---

*This document is part of the Kauaʻi Resilient Communications Network planning materials. For questions or updates, contact the network operations team.*
