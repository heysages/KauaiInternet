export type WebEventType = "pageview" | "section_view";

export type WebEventInput = {
  eventType?: WebEventType;
  path: string;
  pathname: string;
  hash?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  sessionId: string;
  visitorId: string;
  screenWidth?: number;
  language?: string;
  metadata?: Record<string, unknown>;
};

export type WebAnalyticsStats = {
  configured: boolean;
  pageviews: { today: number; last7Days: number; last30Days: number; allTime: number };
  visitors: { today: number; last7Days: number; last30Days: number };
  sessions: { today: number; last7Days: number; last30Days: number };
  topPaths: { path: string; count: number }[];
  topReferrers: { host: string; count: number }[];
  topUtmSources: { source: string; medium: string; count: number }[];
  byDevice: Record<string, number>;
  dailyPageviews: { date: string; count: number }[];
  recentEvents: {
    id: string;
    event_type: WebEventType;
    path: string;
    referrer_host: string | null;
    device_type: string | null;
    country: string | null;
    created_at: string;
  }[];
};
