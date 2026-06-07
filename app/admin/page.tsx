"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

type Stats = {
  total: number;
  last7Days: number;
  byKind: Record<string, number>;
  byStatus: Record<string, number>;
  email?: { inbound: number; outbound: number };
  traffic?: {
    configured: boolean;
    pageviewsToday: number;
    pageviews7d: number;
    visitors7d: number;
    topReferrer: string | null;
  };
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <AdminShell title="Dashboard">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard label="Page views today" value={stats?.traffic?.pageviewsToday ?? "—"} />
        <StatCard label="Visitors (7d)" value={stats?.traffic?.visitors7d ?? "—"} />
        <StatCard label="Page views (7d)" value={stats?.traffic?.pageviews7d ?? "—"} />
        <StatCard label="Total interest" value={stats?.total ?? "—"} />
        <StatCard label="Interest (7d)" value={stats?.last7Days ?? "—"} />
        <StatCard label="Inbound emails" value={stats?.email?.inbound ?? "—"} />
      </div>

      {stats?.traffic?.topReferrer && (
        <p className="text-xs text-mist/70 mb-6">
          Top referrer (30d):{" "}
          <span className="text-amber-glow">{stats.traffic.topReferrer}</span>
          {" · "}
          <Link href="/admin/analytics" className="text-mist hover:text-white underline">
            Full traffic report →
          </Link>
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">By type</h2>
          <ul className="space-y-2 text-sm text-mist">
            {stats &&
              Object.entries(stats.byKind).map(([kind, count]) => (
                <li key={kind} className="flex justify-between">
                  <span className="capitalize">{kind}</span>
                  <span className="text-amber-glow tabular-nums">{count}</span>
                </li>
              ))}
            {!stats && <li className="text-mist/60">Loading…</li>}
          </ul>
        </div>
        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">By status</h2>
          <ul className="space-y-2 text-sm text-mist">
            {stats &&
              Object.entries(stats.byStatus).map(([status, count]) => (
                <li key={status} className="flex justify-between">
                  <span className="capitalize">{status}</span>
                  <span className="text-amber-glow tabular-nums">{count}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/analytics"
          className="text-sm font-semibold bg-amber-emergency/20 hover:bg-amber-emergency/30 text-amber-glow px-4 py-2 rounded-xl"
        >
          Traffic & referrers →
        </Link>
        <Link
          href="/admin/submissions"
          className="text-sm font-semibold bg-amber-emergency/20 hover:bg-amber-emergency/30 text-amber-glow px-4 py-2 rounded-xl"
        >
          Review interest →
        </Link>
        <a
          href="/api/admin/export"
          className="text-sm font-medium border border-white/20 text-mist hover:text-white px-4 py-2 rounded-xl"
        >
          Export CSV
        </a>
      </div>
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
