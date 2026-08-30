export function getClientIp(headers: Headers): string | undefined {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

/** Mask for display — full IP stored server-side only */
export function maskIp(ip: string): string {
  if (ip.includes(":")) {
    const parts = ip.split(":");
    if (parts.length > 1) return `${parts.slice(0, -1).join(":")}:xxxx`;
    return "xxxx";
  }
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  return "hidden";
}

export function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true;
  if (ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80")) return true;
  return false;
}
