# Kauai Internet

**Kauai Resilient Communications Network** — an independent, resilient communications layer for Kauaʻi.

Production site: [kauaiinternet.com](https://kauaiinternet.com)

## What this is

KauaiInternet combines Internet access, local island networking, and resilient radio mesh (LoRa, Reticulum evaluation, voice radio) so Kauaʻi can communicate when conventional networks fail.

This repository is the community planning platform, public site, admin backend, and network planning tools.

## Stack

- **Next.js 15** (App Router) + **React 19** + **Tailwind CSS v4**
- **MapLibre GL** for island planning maps
- **Supabase** for submissions, analytics, connectivity tests
- **Resend** for email notifications
- **Vercel** for deployment

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Public homepage |
| `/network` | Network status dashboard (demo telemetry) |
| `/admin` | Password-protected admin |
| `/admin/network` | NOC planning view |
| `/admin/strategy` | Operating plan |

## Documentation

- [DEPLOY.md](./DEPLOY.md) — Vercel + DNS deployment
- [EMAIL_SETUP.md](./EMAIL_SETUP.md) — Resend email configuration
- [docs/RESILIENT_NETWORK.md](./docs/RESILIENT_NETWORK.md) — Architecture and data model

## Environment variables

See `DEPLOY.md` and `EMAIL_SETUP.md`. Optional: `NEXT_PUBLIC_NETWORK_TELEMETRY=mock` for demo status cards.

## Status labeling

All infrastructure uses explicit statuses: **live**, **testing**, **planned**, **proposed**, **simulated**, **experimental**. Never confuse planning data with operational telemetry.
