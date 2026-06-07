"use client";

import { useState } from "react";

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

export default function SubmissionDetailPanel({
  submission,
  onUpdated,
}: {
  submission: Submission | null;
  onUpdated: () => void;
}) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!submission) {
    return (
      <div className="platform-panel rounded-2xl p-6 text-center text-mist/70 text-sm">
        Select a submission to view details and reply.
      </div>
    );
  }

  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    setError(null);
    const res = await fetch("/api/admin/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: submission.id,
        message: reply.trim(),
        subject: "Thank you for your interest in Kauai Internet",
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSending(false);
    if (!res.ok) {
      setError(data.error ?? "Failed to send");
      return;
    }
    setReply("");
    onUpdated();
  };

  const setStatus = async (status: string) => {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: submission.id, status }),
    });
    onUpdated();
  };

  return (
    <div className="platform-panel rounded-2xl p-5 space-y-4">
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/10 text-amber-glow">
            {submission.kind}
          </span>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/10 text-mist">
            {submission.status}
          </span>
        </div>
        <h3 className="heading-display text-lg font-semibold text-white">
          {submission.name ?? "Anonymous"}
        </h3>
        {submission.email && (
          <p className="text-sm text-mist mt-1">{submission.email}</p>
        )}
        {submission.location_label && (
          <p className="text-xs text-mist/70 mt-0.5">{submission.location_label}</p>
        )}
        <p className="text-xs text-mist/50 mt-2">
          {new Date(submission.created_at).toLocaleString()}
        </p>
      </div>

      <div className="text-sm text-mist leading-relaxed whitespace-pre-wrap border-l-2 border-amber-emergency/40 pl-3">
        {submission.message}
      </div>

      <div className="flex flex-wrap gap-2">
        {(["new", "reviewed", "replied", "archived"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
              submission.status === s
                ? "border-amber-emergency/50 bg-amber-emergency/15 text-amber-glow"
                : "border-white/15 text-mist hover:bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {submission.email && (
        <div className="space-y-2 pt-2 border-t border-white/10">
          <p className="text-xs font-semibold text-amber-glow uppercase tracking-wider">
            Reply by email
          </p>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            className="w-full rounded-xl bg-white/8 border border-white/15 text-sm text-white px-3 py-2 resize-y"
            placeholder="Write a personal reply…"
          />
          {error && <p className="text-xs text-red-300">{error}</p>}
          <button
            type="button"
            onClick={sendReply}
            disabled={sending || !reply.trim()}
            className="text-sm font-semibold bg-amber-emergency hover:bg-amber-glow text-ocean-deep px-4 py-2 rounded-xl disabled:opacity-40"
          >
            {sending ? "Sending…" : "Send reply"}
          </button>
        </div>
      )}
    </div>
  );
}
