"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

type Stats = {
  total: number;
  last7Days: number;
  byKind: Record<string, number>;
  byStatus: Record<string, number>;
};

export default function AdminReportsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return (
    <AdminShell title="Reports">
      <p className="text-sm text-mist/80 mb-6">
        Export full data as CSV for spreadsheets, or use this summary for quick planning updates.
      </p>

      <div className="platform-panel rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-white mb-4">Summary</h2>
        {stats ? (
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-mist/60">All-time submissions</dt>
              <dd className="text-2xl font-semibold text-amber-glow">{stats.total}</dd>
            </div>
            <div>
              <dt className="text-mist/60">Past 7 days</dt>
              <dd className="text-2xl font-semibold text-amber-glow">{stats.last7Days}</dd>
            </div>
            {Object.entries(stats.byKind).map(([kind, count]) => (
              <div key={kind}>
                <dt className="text-mist/60 capitalize">{kind}</dt>
                <dd className="text-lg font-medium text-white">{count}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-mist/60 text-sm">Loading…</p>
        )}
      </div>

      <a
        href="/api/admin/export"
        className="inline-flex text-sm font-semibold bg-amber-emergency hover:bg-amber-glow text-ocean-deep px-5 py-2.5 rounded-xl"
      >
        Download CSV export
      </a>
    </AdminShell>
  );
}
