import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createConnectivityTest } from "@/lib/connectivityTestDb";
import { getClientIp } from "@/lib/clientIp";
import { lookupIsp } from "@/lib/ispLookup";
import { mergeAttribution } from "@/lib/mergeAttribution";

const DEDUPE_MS = 60_000;
const recentKeys = new Map<string, number>();

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const last = recentKeys.get(key);
  if (last && now - last < DEDUPE_MS) return true;
  recentKeys.set(key, now);
  if (recentKeys.size > 2000) {
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

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
  if (!sessionId || !visitorId) {
    return NextResponse.json({ error: "Missing session or visitor id" }, { status: 400 });
  }

  const dedupeKey = `${sessionId}:${visitorId}`;
  if (isDuplicate(dedupeKey)) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  const hdrs = await headers();
  const ip = getClientIp(hdrs);
  const userAgent = hdrs.get("user-agent") ?? undefined;
  const country =
    hdrs.get("x-vercel-ip-country") ?? hdrs.get("cf-ipcountry") ?? undefined;
  const isp = await lookupIsp(ip);

  const rawMeta =
    typeof body.metadata === "object" && body.metadata
      ? (body.metadata as Record<string, unknown>)
      : {};
  const attribution =
    typeof rawMeta.attribution === "object" && rawMeta.attribution
      ? (rawMeta.attribution as Record<string, unknown>)
      : undefined;
  const { attribution: _a, ...metaRest } = rawMeta;

  const stored = await createConnectivityTest({
    sessionId,
    visitorId,
    downloadMbps: typeof body.downloadMbps === "number" ? body.downloadMbps : undefined,
    uploadMbps: typeof body.uploadMbps === "number" ? body.uploadMbps : undefined,
    latencyMs: typeof body.latencyMs === "number" ? body.latencyMs : undefined,
    jitterMs: typeof body.jitterMs === "number" ? body.jitterMs : undefined,
    regionId: typeof body.regionId === "string" ? body.regionId : undefined,
    screenWidth: typeof body.screenWidth === "number" ? body.screenWidth : undefined,
    language: typeof body.language === "string" ? body.language : undefined,
    ip,
    isp,
    userAgent,
    country,
    metadata: mergeAttribution(metaRest, attribution),
  });

  if (!stored) {
    return NextResponse.json({ ok: false, stored: false });
  }

  return NextResponse.json({ ok: true, stored: true, id: stored.id });
}
