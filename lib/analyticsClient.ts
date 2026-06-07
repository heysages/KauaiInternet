const VISITOR_KEY = "ki_visitor_id";
const SESSION_KEY = "ki_session_id";

function randomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `ki_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = randomId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return randomId();
  }
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return randomId();
  }
}

export function getUtmParams(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

export function currentPageContext(): {
  path: string;
  pathname: string;
  hash: string;
  referrer: string;
  utm: Record<string, string>;
  screenWidth: number;
  language: string;
} {
  const { pathname, hash, search } = window.location;
  return {
    path: `${pathname}${search}${hash}`,
    pathname,
    hash: hash.replace(/^#/, ""),
    referrer: document.referrer,
    utm: getUtmParams(search),
    screenWidth: window.screen.width,
    language: navigator.language,
  };
}

/** Attach to form submissions so interest can be tied to traffic source */
export function getAttributionPayload(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const ctx = currentPageContext();
  const out: Record<string, string> = {};
  if (ctx.referrer) out.referrer = ctx.referrer;
  if (ctx.path) out.landingPath = ctx.path;
  for (const [k, v] of Object.entries(ctx.utm)) out[k] = v;
  return out;
}

export async function trackPageEvent(eventType: "pageview" | "section_view" = "pageview") {
  const ctx = currentPageContext();
  const body = {
    eventType,
    path: ctx.path,
    pathname: ctx.pathname,
    hash: ctx.hash || undefined,
    referrer: ctx.referrer || undefined,
    utmSource: ctx.utm.utm_source,
    utmMedium: ctx.utm.utm_medium,
    utmCampaign: ctx.utm.utm_campaign,
    utmTerm: ctx.utm.utm_term,
    utmContent: ctx.utm.utm_content,
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    screenWidth: ctx.screenWidth,
    language: ctx.language,
  };

  await fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
}
