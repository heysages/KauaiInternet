"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import type { ConnectivityTestStats } from "@/types/connectivityTest";

export default function AdminConnectivityPage() {
  const [stats, setStats] = useState<ConnectivityTestStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/connectivity")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const maxDaily = Math.max(...(stats?.dailyTests.map((d) => d.count) ?? [1]), 1);

  return (
    <AdminShell title="Connectivity measurements">
      {!stats?.configured && (
        <p className="text-sm text-amber-glow/90 mb-6 platform-panel rounded-xl px-4 py-3">
          Connectivity test storage is not configured. Run the connectivity tests migration in
          Supabase and redeploy.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Tests today" value={stats?.tests.today ?? "—"} />
        <StatCard label="Tests (7d)" value={stats?.tests.last7Days ?? "—"} />
        <StatCard
          label="Median download (30d)"
          value={
            stats?.medianDownloadMbps != null
              ? `${stats.medianDownloadMbps.toFixed(1)} Mbps`
              : "—"
          }
        />
        <StatCard
          label="Median latency (30d)"
          value={
            stats?.medianLatencyMs != null
              ? `${Math.round(stats.medianLatencyMs)} ms`
              : "—"
          }
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel title="Tests — last 14 days">
          {stats ? (
            <div className="flex items-end gap-1.5 h-32">
              {stats.dailyTests.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <div
                    className="w-full bg-ridge-light/70 rounded-t"
                    style={{ height: `${Math.max(4, (d.count / maxDaily) * 100)}%` }}
                    title={`${d.date}: ${d.count}`}
                  />
                  <span className="text-[8px] text-mist/50 truncate w-full text-center">
                    {d.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-mist/60 text-sm">Loading…</p>
          )}
        </Panel>

        <Panel title="Top ISPs (30d)">
          <MetricList
            items={
              stats?.topIsps.map((i) => ({ label: i.name, value: i.count })) ?? []
            }
            emptyLabel="No ISP data yet"
          />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel title="By island region (30d)">
          <MetricList
            items={
              stats?.byRegion.map((r) => ({
                label: r.regionId,
                value: r.count,
              })) ?? []
            }
            emptyLabel="No region-tagged tests yet"
          />
        </Panel>
        <Panel title="Upload speeds (30d median)">
          <p className="text-3xl font-semibold text-amber-glow tabular-nums">
            {stats?.medianUploadMbps != null
              ? `${stats.medianUploadMbps.toFixed(1)} Mbps`
              : "—"}
          </p>
          <p className="text-xs text-mist/60 mt-2">
            Community-contributed measurements. Not official ISP coverage data.
          </p>
        </Panel>
      </div>

      <Panel title="Recent measurements">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-mist/60 border-b border-white/10">
                <th className="py-2 pr-3 font-medium">Time</th>
                <th className="py-2 pr-3 font-medium">ISP</th>
                <th className="py-2 pr-3 font-medium">Down</th>
                <th className="py-2 pr-3 font-medium">Up</th>
                <th className="py-2 pr-3 font-medium">Latency</th>
                <th className="py-2 pr-3 font-medium">Region</th>
                <th className="py-2 font-medium">IP</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentTests.map((t) => (
                <tr key={t.id} className="border-b border-white/5 text-mist">
                  <td className="py-2 pr-3 whitespace-nowrap tabular-nums">
                    {new Date(t.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3 max-w-[140px] truncate">
                    {t.isp_name ?? "—"}
                  </td>
                  <td className="py-2 pr-3 tabular-nums">
                    {t.download_mbps != null ? `${t.download_mbps}` : "—"}
                  </td>
                  <td className="py-2 pr-3 tabular-nums">
                    {t.upload_mbps != null ? `${t.upload_mbps}` : "—"}
                  </td>
                  <td className="py-2 pr-3 tabular-nums">
                    {t.latency_ms != null ? `${t.latency_ms}` : "—"}
                  </td>
                  <td className="py-2 pr-3">{t.region_id ?? "—"}</td>
                  <td className="py-2 tabular-nums">{t.ip_masked ?? "—"}</td>
                </tr>
              ))}
              {!stats && (
                <tr>
                  <td colSpan={7} className="py-4 text-mist/60">
                    Loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="text-[11px] text-mist/50 mt-6">
        All-time tests: {stats?.tests.allTime ?? "—"}. Full IP addresses stored server-side for
        infrastructure analysis; admin table shows masked IPs only.
      </p>
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="platform-panel rounded-2xl p-5">
      <p className="text-[10px] uppercase tracking-wider text-mist/60 mb-1">{label}</p>
      <p className="text-3xl font-semibold text-amber-glow tabular-nums">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="platform-panel rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-white mb-3">{title}</h2>
      {children}
    </div>
  );
}

function MetricList({
  items,
  emptyLabel = "No data yet",
}: {
  items: { label: string; value: number }[];
  emptyLabel?: string;
}) {
  if (!items.length) return <p className="text-sm text-mist/60">{emptyLabel}</p>;
  return (
    <ul className="space-y-2 text-sm text-mist">
      {items.map((item) => (
        <li key={item.label} className="flex justify-between gap-3">
          <span className="truncate">{item.label}</span>
          <span className="text-amber-glow tabular-nums shrink-0">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
