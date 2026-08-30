import { getAttributionPayload, getSessionId, getVisitorId } from "@/lib/analyticsClient";

const DOWNLOAD_BYTES = 512 * 1024;
const UPLOAD_BYTES = 256 * 1024;
const LATENCY_SAMPLES = 5;

export type SpeedTestResult = {
  downloadMbps: number | null;
  uploadMbps: number | null;
  latencyMs: number | null;
  jitterMs: number | null;
};

function mbps(bytes: number, ms: number): number {
  if (ms <= 0) return 0;
  return (bytes * 8) / (ms / 1000) / 1_000_000;
}

export async function measureLatency(): Promise<{ latencyMs: number; jitterMs: number }> {
  const samples: number[] = [];
  for (let i = 0; i < LATENCY_SAMPLES; i++) {
    const start = performance.now();
    await fetch(`/api/connectivity/ping?t=${Date.now()}&n=${i}`, {
      cache: "no-store",
      credentials: "same-origin",
    });
    samples.push(performance.now() - start);
  }
  samples.sort((a, b) => a - b);
  const latencyMs = samples[Math.floor(samples.length / 2)] ?? samples[0] ?? 0;
  const jitterMs =
    samples.length > 1
      ? samples.reduce((sum, s) => sum + Math.abs(s - latencyMs), 0) / samples.length
      : 0;
  return { latencyMs: Math.round(latencyMs * 10) / 10, jitterMs: Math.round(jitterMs * 10) / 10 };
}

export async function measureDownload(): Promise<number | null> {
  try {
    const start = performance.now();
    const res = await fetch(
      `/api/connectivity/download?bytes=${DOWNLOAD_BYTES}&t=${Date.now()}`,
      { cache: "no-store", credentials: "same-origin" }
    );
    if (!res.ok) return null;
    const blob = await res.blob();
    const ms = performance.now() - start;
    return Math.round(mbps(blob.size, ms) * 100) / 100;
  } catch {
    return null;
  }
}

export async function measureUpload(): Promise<number | null> {
  try {
    const payload = new Uint8Array(UPLOAD_BYTES);
    const start = performance.now();
    const res = await fetch("/api/connectivity/upload", {
      method: "POST",
      body: payload,
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!res.ok) return null;
    await res.json();
    const ms = performance.now() - start;
    return Math.round(mbps(UPLOAD_BYTES, ms) * 100) / 100;
  } catch {
    return null;
  }
}

export async function runSpeedTest(
  onProgress?: (phase: "latency" | "download" | "upload") => void
): Promise<SpeedTestResult> {
  onProgress?.("latency");
  const { latencyMs, jitterMs } = await measureLatency();
  onProgress?.("download");
  const downloadMbps = await measureDownload();
  onProgress?.("upload");
  const uploadMbps = await measureUpload();
  return { downloadMbps, uploadMbps, latencyMs, jitterMs };
}

export async function logConnectivityTest(
  result: SpeedTestResult,
  regionId?: string | null
): Promise<boolean> {
  const body = {
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    downloadMbps: result.downloadMbps ?? undefined,
    uploadMbps: result.uploadMbps ?? undefined,
    latencyMs: result.latencyMs ?? undefined,
    jitterMs: result.jitterMs ?? undefined,
    regionId: regionId ?? undefined,
    screenWidth: typeof window !== "undefined" ? window.screen.width : undefined,
    language: typeof navigator !== "undefined" ? navigator.language : undefined,
    metadata: {
      attribution: getAttributionPayload(),
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
    },
  };

  const res = await fetch("/api/connectivity/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
  const data = await res.json();
  return Boolean(data.ok && data.stored);
}

export async function fetchSessionInfo() {
  const res = await fetch("/api/connectivity/session", { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
