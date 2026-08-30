"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchSessionInfo,
  logConnectivityTest,
  runSpeedTest,
  type SpeedTestResult,
} from "@/lib/connectivityTestClient";
import type { ConnectivitySessionInfo } from "@/types/connectivityTest";

type ConnectivitySnapshotProps = {
  regionId?: string | null;
};

type Phase = "idle" | "latency" | "download" | "upload" | "done";

function formatMbps(value: number | null): string {
  if (value == null) return "—";
  if (value >= 100) return `${Math.round(value)} Mbps`;
  if (value >= 10) return `${value.toFixed(1)} Mbps`;
  return `${value.toFixed(2)} Mbps`;
}

function formatMs(value: number | null): string {
  if (value == null) return "—";
  return `${Math.round(value)} ms`;
}

export default function ConnectivitySnapshot({ regionId }: ConnectivitySnapshotProps) {
  const [session, setSession] = useState<ConnectivitySessionInfo | null>(null);
  const [sessionError, setSessionError] = useState(false);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [logged, setLogged] = useState(false);
  const [shareEnabled, setShareEnabled] = useState(true);

  useEffect(() => {
    fetchSessionInfo()
      .then((data) => {
        if (data) setSession(data as ConnectivitySessionInfo);
        else setSessionError(true);
      })
      .catch(() => setSessionError(true));
  }, []);

  const runTest = useCallback(async () => {
    setPhase("latency");
    setLogged(false);
    try {
      const testResult = await runSpeedTest((p) => setPhase(p));
      setResult(testResult);
      setPhase("done");
      if (shareEnabled) {
        const ok = await logConnectivityTest(testResult, regionId);
        setLogged(ok);
      }
    } catch {
      setPhase("idle");
    }
  }, [regionId, shareEnabled]);

  const testing = phase !== "idle" && phase !== "done";
  const provider =
    session?.ispName ??
    (sessionError ? "Unknown (could not detect)" : "Detecting…");

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-ridge-mid/15">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-1">
            Your connection
          </p>
          <h3 className="heading-display text-xl font-semibold text-ocean-deep">
            Connectivity snapshot
          </h3>
          <p className="text-sm text-ocean-mid mt-2 max-w-xl leading-relaxed">
            See your network details and run a quick speed check. Shared results help build a
            community knowledge base of island infrastructure — never sold, never used for
            coverage claims.
          </p>
        </div>
        <button
          type="button"
          onClick={runTest}
          disabled={testing}
          className="shrink-0 rounded-xl bg-ocean-deep text-white text-sm font-semibold px-5 py-2.5 hover:bg-ocean-mid transition-colors disabled:opacity-60"
        >
          {testing
            ? phase === "latency"
              ? "Measuring latency…"
              : phase === "download"
                ? "Testing download…"
                : "Testing upload…"
            : result
              ? "Run again"
              : "Measure connection"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Your IP (masked)" value={session?.ipMasked ?? "…"} />
        <MetricCard
          label="Provider"
          value={provider}
          sub={
            session?.ispOrg && session.ispOrg !== session.ispName
              ? session.ispOrg
              : session?.asn ?? undefined
          }
        />
        <MetricCard
          label="Location (approx.)"
          value={
            session?.city && session?.region
              ? `${session.city}, ${session.region}`
              : session?.country ?? "—"
          }
        />
        <MetricCard label="Latency" value={formatMs(result?.latencyMs ?? null)} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <SpeedCard
          label="Download"
          value={formatMbps(result?.downloadMbps ?? null)}
          active={phase === "download"}
          done={Boolean(result?.downloadMbps)}
        />
        <SpeedCard
          label="Upload"
          value={formatMbps(result?.uploadMbps ?? null)}
          active={phase === "upload"}
          done={Boolean(result?.uploadMbps)}
        />
        <SpeedCard
          label="Jitter"
          value={result?.jitterMs != null ? `${result.jitterMs} ms` : "—"}
          active={false}
          done={result?.jitterMs != null}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ocean-mid cursor-pointer">
        <input
          type="checkbox"
          checked={shareEnabled}
          onChange={(e) => setShareEnabled(e.target.checked)}
          className="mt-1 rounded border-ocean-mid/30"
        />
        <span>
          Share this measurement anonymously to help map Kauai connectivity patterns.
          We log masked IP, provider, speeds, and latency — not your name or address.
        </span>
      </label>

      {logged && (
        <p className="text-xs text-ridge-mid font-medium mt-3">
          Thank you — your measurement was logged for the island knowledge base.
        </p>
      )}
      {phase === "done" && !shareEnabled && (
        <p className="text-xs text-ocean-mid/70 mt-3">Results shown locally only (sharing off).</p>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-white/60 border border-ocean-mid/10 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ridge-mid mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-ocean-deep tabular-nums">{value}</p>
      {sub && <p className="text-xs text-ocean-mid/80 mt-0.5 truncate">{sub}</p>}
    </div>
  );
}

function SpeedCard({
  label,
  value,
  active,
  done,
}: {
  label: string;
  value: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-4 py-4 border ${
        active
          ? "bg-ridge-light/15 border-ridge-mid/30"
          : "bg-white/60 border-ocean-mid/10"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ridge-mid mb-1">
        {label}
      </p>
      <p
        className={`text-2xl font-semibold tabular-nums ${
          done ? "text-ocean-deep" : "text-ocean-mid/50"
        }`}
      >
        {active ? "…" : value}
      </p>
    </div>
  );
}
