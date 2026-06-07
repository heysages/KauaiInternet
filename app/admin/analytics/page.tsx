"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import type { WebAnalyticsStats } from "@/types/analytics";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<WebAnalyticsStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const maxDaily = Math.max(...(stats?.dailyPageviews.map((d) => d.count) ?? [1]), 1);

  return (
    <AdminShell title="Traffic & referrers">
      {!stats?.configured && (
        <p className="text-sm text-amber-glow/90 mb-6 platform-panel rounded-xl px-4 py-3">
          Analytics storage is not configured. Add Supabase env vars and run the web analytics
          migration, then redeploy.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Page views today" value={stats?.pageviews.today ?? "—"} />
        <StatCard label="Page views (7d)" value={stats?.pageviews.last7Days ?? "—"} />
        <StatCard label="Unique visitors (7d)" value={stats?.visitors.last7Days ?? "—"} />
        <StatCard label="Sessions (7d)" value={stats?.sessions.last7Days ?? "—"} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Panel title="Page views — last 14 days">
          {stats ? (
            <div className="flex items-end gap-1.5 h-32">
              {stats.dailyPageviews.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <div
                    className="w-full bg-amber-emergency/70 rounded-t"
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

        <Panel title="Devices (30d)">
          <MetricList
            items={
              stats
                ? Object.entries(stats.byDevice).map(([k, v]) => ({
                    label: k,
                    value: v,
                  }))
                : []
            }
          />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Panel title="Top pages (30d)">
          <MetricList
            items={
              stats?.topPaths.map((p) => ({ label: p.path, value: p.count })) ?? []
            }
          />
        </Panel>
        <Panel title="Top referrers (30d)">
          <MetricList
            items={
              stats?.topReferrers.map((r) => ({ label: r.host, value: r.count })) ?? []
            }
            emptyLabel="No external referrers yet"
          />
        </Panel>
        <Panel title="UTM sources (30d)">
          <MetricList
            items={
              stats?.topUtmSources.map((u) => ({
                label: `${u.source} / ${u.medium}`,
                value: u.count,
              })) ?? []
            }
            emptyLabel="No UTM-tagged traffic yet"
          />
        </Panel>
      </div>

      <Panel title="Recent events">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-mist/60 border-b border-white/10">
                <th className="py-2 pr-3 font-medium">Time</th>
                <th className="py-2 pr-3 font-medium">Path</th>
                <th className="py-2 pr-3 font-medium">Referrer</th>
                <th className="py-2 pr-3 font-medium">Device</th>
                <th className="py-2 font-medium">Country</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentEvents.map((e) => (
                <tr key={e.id} className="border-b border-white/5 text-mist">
                  <td className="py-2 pr-3 whitespace-nowrap tabular-nums">
                    {new Date(e.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3 max-w-[200px] truncate">{e.path}</td>
                  <td className="py-2 pr-3">{e.referrer_host ?? "—"}</td>
                  <td className="py-2 pr-3 capitalize">{e.device_type ?? "—"}</td>
                  <td className="py-2">{e.country ?? "—"}</td>
                </tr>
              ))}
              {!stats && (
                <tr>
                  <td colSpan={5} className="py-4 text-mist/60">
                    Loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="text-[11px] text-mist/50 mt-6">
        All-time page views: {stats?.pageviews.allTime ?? "—"} · 30-day window shown for
        breakdowns. Direct visits have no referrer. Section views track in-page anchors (#explore,
        #map, etc.).
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
