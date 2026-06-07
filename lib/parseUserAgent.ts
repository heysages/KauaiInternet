export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export function parseDeviceType(userAgent: string | null | undefined): DeviceType {
  if (!userAgent) return "unknown";
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/.test(ua)) return "mobile";
  if (/android/.test(ua)) return "tablet";
  if (/mozilla|chrome|safari|firefox|edg/.test(ua)) return "desktop";
  return "unknown";
}

export function parseReferrerHost(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    return host || null;
  } catch {
    return null;
  }
}
