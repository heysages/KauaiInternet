"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import SubmissionDetailPanel from "@/components/admin/SubmissionDetailPanel";

type Submission = {
  id: string;
  kind: string;
  status: string;
  name: string | null;
  email: string | null;
  organization: string | null;
  location_label: string | null;
  support_type: string | null;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

const kinds = ["all", "support", "feedback", "observation", "concern"] as const;

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [kind, setKind] = useState<string>("all");
  const [selected, setSelected] = useState<Submission | null>(null);

  const load = useCallback(async () => {
    const q = kind === "all" ? "" : `?kind=${kind}`;
    const res = await fetch(`/api/admin/submissions${q}`);
    const data = await res.json();
    setSubmissions(data.submissions ?? []);
  }, [kind]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AdminShell title="Community interest">
      <div className="flex flex-wrap gap-2 mb-6">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize ${
              kind === k
                ? "bg-amber-emergency/20 text-amber-glow"
                : "bg-white/8 text-mist hover:text-white"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 platform-panel rounded-2xl overflow-hidden">
          <ul className="divide-y divide-white/10 max-h-[70vh] overflow-y-auto">
            {submissions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSelected(s)}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${
                    selected?.id === s.id ? "bg-white/8" : ""
                  }`}
                >
                  <div className="flex justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-white truncate">
                      {s.name ?? s.email ?? "Anonymous"}
                    </span>
                    <span className="text-[10px] text-mist/60 shrink-0">
                      {new Date(s.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-mist/70 line-clamp-2">{s.message}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] text-amber-glow/80 capitalize">{s.kind}</span>
                    <span className="text-[10px] text-mist/50 capitalize">{s.status}</span>
                  </div>
                </button>
              </li>
            ))}
            {submissions.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-mist/60">
                No submissions yet.
              </li>
            )}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <SubmissionDetailPanel
            submission={selected}
            onUpdated={() => {
              load();
              if (selected) {
                fetch(`/api/admin/submissions`)
                  .then((r) => r.json())
                  .then((d) => {
                    const updated = (d.submissions ?? []).find(
                      (x: Submission) => x.id === selected.id
                    );
                    if (updated) setSelected(updated);
                  });
              }
            }}
          />
        </div>
      </div>
    </AdminShell>
  );
}
