export function mergeAttribution(
  metadata: Record<string, unknown> = {},
  attribution?: Record<string, unknown>
): Record<string, unknown> {
  if (!attribution || typeof attribution !== "object") return metadata;
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(attribution)) {
    if (typeof v === "string" && v.trim()) clean[k] = v.trim().slice(0, 500);
  }
  if (!Object.keys(clean).length) return metadata;
  return { ...metadata, attribution: clean };
}
