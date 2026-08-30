import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { maskIp } from "@/lib/clientIp";
import { parseDeviceType } from "@/lib/parseUserAgent";
import type {
  ConnectivityTestInput,
  ConnectivityTestStats,
  StoredConnectivityTest,
} from "@/types/connectivityTest";
import type { IspInfo } from "@/lib/ispLookup";

export type CreateConnectivityTestOptions = ConnectivityTestInput & {
  ip?: string;
  isp?: IspInfo;
  userAgent?: string;
  country?: string;
};

const EMPTY_STATS: ConnectivityTestStats = {
  configured: false,
  tests: { today: 0, last7Days: 0, last30Days: 0, allTime: 0 },
  medianDownloadMbps: null,
  medianUploadMbps: null,
  medianLatencyMs: null,
  topIsps: [],
  byRegion: [],
  dailyTests: [],
  recentTests: [],
};

function startOfDay(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysAgo(n: number): Date {
  const d = startOfDay();
  d.setDate(d.getDate() - n);
  return d;
}

function median(nums: number[]): number | null {
  if (!nums.length) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

function topCounts(items: (string | null)[], limit = 10) {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!item) continue;
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export async function createConnectivityTest(
  input: CreateConnectivityTestOptions
): Promise<StoredConnectivityTest | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const ip = input.ip;
  const isp = input.isp;

  const { data, error } = await db
    .from("kauai_connectivity_tests")
    .insert({
      session_id: input.sessionId.slice(0, 64),
      visitor_id: input.visitorId.slice(0, 64),
      ip_address: ip?.slice(0, 45) ?? null,
      ip_masked: ip ? maskIp(ip) : null,
      isp_name: isp?.ispName?.slice(0, 200) ?? null,
      isp_org: isp?.ispOrg?.slice(0, 300) ?? null,
      asn: isp?.asn?.slice(0, 100) ?? null,
      country: (isp?.country ?? input.country)?.slice(0, 64) ?? null,
      region: isp?.region?.slice(0, 100) ?? null,
      city: isp?.city?.slice(0, 100) ?? null,
      download_mbps: input.downloadMbps ?? null,
      upload_mbps: input.uploadMbps ?? null,
      latency_ms: input.latencyMs ?? null,
      jitter_ms: input.jitterMs ?? null,
      region_id: input.regionId?.slice(0, 64) ?? null,
      user_agent: input.userAgent?.slice(0, 500) ?? null,
      device_type: parseDeviceType(input.userAgent),
      screen_width: input.screenWidth ?? null,
      language: input.language?.slice(0, 32) ?? null,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    console.error("createConnectivityTest error:", error);
    return null;
  }
  return data as StoredConnectivityTest;
}

export async function getConnectivityTestStats(): Promise<ConnectivityTestStats> {
  const db = getSupabaseAdmin();
  if (!db) return { ...EMPTY_STATS };

  const since30 = daysAgo(30).toISOString();
  const { data, error } = await db
    .from("kauai_connectivity_tests")
    .select("*")
    .gte("created_at", since30)
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("getConnectivityTestStats error:", error);
    return { ...EMPTY_STATS, configured: true };
  }

  const rows = (data ?? []) as StoredConnectivityTest[];
  const todayStart = startOfDay().getTime();
  const weekStart = daysAgo(7).getTime();

  const todayRows = rows.filter((r) => new Date(r.created_at).getTime() >= todayStart);
  const weekRows = rows.filter((r) => new Date(r.created_at).getTime() >= weekStart);

  const dailyMap = new Map<string, number>();
  for (let i = 13; i >= 0; i--) {
    dailyMap.set(daysAgo(i).toISOString().slice(0, 10), 0);
  }
  for (const row of rows) {
    const key = row.created_at.slice(0, 10);
    if (dailyMap.has(key)) dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
  }

  const { count: allTime } = await db
    .from("kauai_connectivity_tests")
    .select("id", { count: "exact", head: true });

  const downloads = rows.map((r) => r.download_mbps).filter((n): n is number => n != null);
  const uploads = rows.map((r) => r.upload_mbps).filter((n): n is number => n != null);
  const latencies = rows.map((r) => r.latency_ms).filter((n): n is number => n != null);

  const regionCounts = topCounts(rows.map((r) => r.region_id)).map(({ name, count }) => ({
    regionId: name,
    count,
  }));

  return {
    configured: true,
    tests: {
      today: todayRows.length,
      last7Days: weekRows.length,
      last30Days: rows.length,
      allTime: allTime ?? rows.length,
    },
    medianDownloadMbps: median(downloads),
    medianUploadMbps: median(uploads),
    medianLatencyMs: median(latencies),
    topIsps: topCounts(rows.map((r) => r.isp_name)).map(({ name, count }) => ({
      name,
      count,
    })),
    byRegion: regionCounts,
    dailyTests: [...dailyMap.entries()].map(([date, count]) => ({ date, count })),
    recentTests: rows.slice(0, 30),
  };
}

export async function getConnectivitySummary() {
  const stats = await getConnectivityTestStats();
  return {
    configured: stats.configured,
    testsToday: stats.tests.today,
    tests7d: stats.tests.last7Days,
    medianDownloadMbps: stats.medianDownloadMbps,
    medianLatencyMs: stats.medianLatencyMs,
    topIsp: stats.topIsps[0]?.name ?? null,
  };
}
