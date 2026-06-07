import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createWebEvent } from "@/lib/analyticsDb";
import type { WebEventType } from "@/types/analytics";

const DEDUPE_MS = 30_000;
const recentKeys = new Map<string, number>();

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const last = recentKeys.get(key);
  if (last && now - last < DEDUPE_MS) return true;
  recentKeys.set(key, now);
  if (recentKeys.size > 5000) {
    for (const [k, t] of recentKeys) {
      if (now - t > DEDUPE_MS) recentKeys.delete(k);
    }
  }
  return false;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "";
  const pathname = typeof body.pathname === "string" ? body.pathname : "/";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";

  if (!path || !sessionId || !visitorId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const eventType = (body.eventType as WebEventType) ?? "pageview";
  const dedupeKey = `${sessionId}:${path}:${eventType}`;
  if (isDuplicate(dedupeKey)) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent") ?? undefined;
  const headerReferrer = hdrs.get("referer") ?? undefined;
  const country =
    hdrs.get("x-vercel-ip-country") ?? hdrs.get("cf-ipcountry") ?? undefined;

  const event = await createWebEvent({
    eventType,
    path,
    pathname,
    hash: typeof body.hash === "string" ? body.hash : undefined,
    referrer:
      (typeof body.referrer === "string" && body.referrer) || headerReferrer,
    utmSource: typeof body.utmSource === "string" ? body.utmSource : undefined,
    utmMedium: typeof body.utmMedium === "string" ? body.utmMedium : undefined,
    utmCampaign: typeof body.utmCampaign === "string" ? body.utmCampaign : undefined,
    utmTerm: typeof body.utmTerm === "string" ? body.utmTerm : undefined,
    utmContent: typeof body.utmContent === "string" ? body.utmContent : undefined,
    sessionId,
    visitorId,
    screenWidth: typeof body.screenWidth === "number" ? body.screenWidth : undefined,
    language: typeof body.language === "string" ? body.language : undefined,
    userAgent,
    country,
    metadata:
      typeof body.metadata === "object" && body.metadata
        ? (body.metadata as Record<string, unknown>)
        : {},
  });

  if (!event) {
    return NextResponse.json({ ok: false, stored: false });
  }

  return NextResponse.json({ ok: true, stored: true });
}
