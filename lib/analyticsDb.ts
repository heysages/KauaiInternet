import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { parseDeviceType, parseReferrerHost } from "@/lib/parseUserAgent";
import type { WebAnalyticsStats, WebEventInput } from "@/types/analytics";

export type StoredWebEvent = {
  id: string;
  event_type: string;
  path: string;
  pathname: string;
  hash: string | null;
  referrer: string | null;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  session_id: string;
  visitor_id: string;
  user_agent: string | null;
  device_type: string | null;
  screen_width: number | null;
  language: string | null;
  country: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type CreateWebEventOptions = WebEventInput & {
  userAgent?: string;
  country?: string;
};

const EMPTY_STATS: WebAnalyticsStats = {
  configured: false,
  pageviews: { today: 0, last7Days: 0, last30Days: 0, allTime: 0 },
  visitors: { today: 0, last7Days: 0, last30Days: 0 },
  sessions: { today: 0, last7Days: 0, last30Days: 0 },
  topPaths: [],
  topReferrers: [],
  topUtmSources: [],
  byDevice: {},
  dailyPageviews: [],
  recentEvents: [],
};

function startOfDay(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysAgo(n: number): Date {
  const d = startOfDay();
  d.setDate(d.getDate() - n);
  return d;
}

export async function createWebEvent(
  input: CreateWebEventOptions
): Promise<StoredWebEvent | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const referrerHost = parseReferrerHost(input.referrer);
  const deviceType = parseDeviceType(input.userAgent);

  const { data, error } = await db
    .from("kauai_web_events")
    .insert({
      event_type: input.eventType ?? "pageview",
      path: input.path.slice(0, 500),
      pathname: input.pathname.slice(0, 300),
      hash: input.hash?.slice(0, 200) ?? null,
      referrer: input.referrer?.slice(0, 1000) ?? null,
      referrer_host: referrerHost,
      utm_source: input.utmSource?.slice(0, 200) ?? null,
      utm_medium: input.utmMedium?.slice(0, 200) ?? null,
      utm_campaign: input.utmCampaign?.slice(0, 200) ?? null,
      utm_term: input.utmTerm?.slice(0, 200) ?? null,
      utm_content: input.utmContent?.slice(0, 200) ?? null,
      session_id: input.sessionId.slice(0, 64),
      visitor_id: input.visitorId.slice(0, 64),
      user_agent: input.userAgent?.slice(0, 500) ?? null,
      device_type: deviceType,
      screen_width: input.screenWidth ?? null,
      language: input.language?.slice(0, 32) ?? null,
      country: input.country?.slice(0, 8) ?? null,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    console.error("createWebEvent error:", error);
    return null;
  }
  return data as StoredWebEvent;
}

function countUnique(ids: string[]): number {
  return new Set(ids).size;
}

function topCounts(
  items: string[],
  limit = 10
): { key: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!item) continue;
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
}

export async function getWebAnalyticsStats(): Promise<WebAnalyticsStats> {
  const db = getSupabaseAdmin();
  if (!db) return { ...EMPTY_STATS, configured: false };

  const since30 = daysAgo(30).toISOString();
  const { data, error } = await db
    .from("kauai_web_events")
    .select(
      "id, event_type, path, referrer_host, utm_source, utm_medium, device_type, country, session_id, visitor_id, created_at"
    )
    .gte("created_at", since30)
    .order("created_at", { ascending: false })
    .limit(10000);

  if (error) {
    console.error("getWebAnalyticsStats error:", error);
    return { ...EMPTY_STATS, configured: true };
  }

  const rows = (data ?? []) as StoredWebEvent[];
  const todayStart = startOfDay().getTime();
  const weekStart = daysAgo(7).getTime();

  const todayRows = rows.filter((r) => new Date(r.created_at).getTime() >= todayStart);
  const weekRows = rows.filter((r) => new Date(r.created_at).getTime() >= weekStart);

  const dailyMap = new Map<string, number>();
  for (let i = 13; i >= 0; i--) {
    const d = daysAgo(i);
    dailyMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of rows) {
    const key = row.created_at.slice(0, 10);
    if (dailyMap.has(key)) dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
  }

  const { count: allTime } = await db
    .from("kauai_web_events")
    .select("id", { count: "exact", head: true });

  const topPaths = topCounts(rows.map((r) => r.path)).map(({ key, count }) => ({
    path: key,
    count,
  }));

  const topReferrers = topCounts(
    rows
      .map((r) => r.referrer_host)
      .filter((h): h is string => Boolean(h && !h.includes("kauaiinternet")))
  ).map(({ key, count }) => ({ host: key, count }));

  const utmKey = (r: StoredWebEvent) =>
    r.utm_source ? `${r.utm_source}|${r.utm_medium ?? "(none)"}` : "";
  const utmCounts = topCounts(rows.map(utmKey).filter(Boolean));
  const topUtmSources = utmCounts.map(({ key, count }) => {
    const [source, medium] = key.split("|");
    return { source, medium, count };
  });

  const byDevice: Record<string, number> = {};
  for (const row of rows) {
    const d = row.device_type ?? "unknown";
    byDevice[d] = (byDevice[d] ?? 0) + 1;
  }

  return {
    configured: true,
    pageviews: {
      today: todayRows.length,
      last7Days: weekRows.length,
      last30Days: rows.length,
      allTime: allTime ?? rows.length,
    },
    visitors: {
      today: countUnique(todayRows.map((r) => r.visitor_id)),
      last7Days: countUnique(weekRows.map((r) => r.visitor_id)),
      last30Days: countUnique(rows.map((r) => r.visitor_id)),
    },
    sessions: {
      today: countUnique(todayRows.map((r) => r.session_id)),
      last7Days: countUnique(weekRows.map((r) => r.session_id)),
      last30Days: countUnique(rows.map((r) => r.session_id)),
    },
    topPaths,
    topReferrers,
    topUtmSources,
    byDevice,
    dailyPageviews: [...dailyMap.entries()].map(([date, count]) => ({ date, count })),
    recentEvents: rows.slice(0, 25).map((r) => ({
      id: r.id,
      event_type: r.event_type as WebAnalyticsStats["recentEvents"][0]["event_type"],
      path: r.path,
      referrer_host: r.referrer_host,
      device_type: r.device_type,
      country: r.country,
      created_at: r.created_at,
    })),
  };
}

export async function getWebAnalyticsSummary() {
  const stats = await getWebAnalyticsStats();
  return {
    configured: stats.configured,
    pageviewsToday: stats.pageviews.today,
    pageviews7d: stats.pageviews.last7Days,
    visitors7d: stats.visitors.last7Days,
    topReferrer: stats.topReferrers[0]?.host ?? null,
  };
}
