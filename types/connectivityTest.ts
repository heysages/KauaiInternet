export type ConnectivityTestInput = {
  sessionId: string;
  visitorId: string;
  downloadMbps?: number;
  uploadMbps?: number;
  latencyMs?: number;
  jitterMs?: number;
  regionId?: string;
  screenWidth?: number;
  language?: string;
  metadata?: Record<string, unknown>;
};

export type StoredConnectivityTest = {
  id: string;
  session_id: string;
  visitor_id: string;
  ip_address: string | null;
  ip_masked: string | null;
  isp_name: string | null;
  isp_org: string | null;
  asn: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  download_mbps: number | null;
  upload_mbps: number | null;
  latency_ms: number | null;
  jitter_ms: number | null;
  region_id: string | null;
  user_agent: string | null;
  device_type: string | null;
  screen_width: number | null;
  language: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type ConnectivitySessionInfo = {
  ipMasked: string;
  ispName: string | null;
  ispOrg: string | null;
  asn: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
};

export type ConnectivityTestStats = {
  configured: boolean;
  tests: { today: number; last7Days: number; last30Days: number; allTime: number };
  medianDownloadMbps: number | null;
  medianUploadMbps: number | null;
  medianLatencyMs: number | null;
  topIsps: { name: string; count: number }[];
  byRegion: { regionId: string; count: number }[];
  dailyTests: { date: string; count: number }[];
  recentTests: StoredConnectivityTest[];
};
