"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed");
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="platform-panel w-full max-w-sm rounded-2xl p-8 space-y-5"
      >
        <div>
          <p className="text-[10px] uppercase tracking-widest text-amber-glow font-semibold mb-1">
            Kauai Internet
          </p>
          <h1 className="heading-display text-xl font-semibold text-white">Admin sign in</h1>
          <p className="text-xs text-mist/70 mt-2">
            View community interest, reply to neighbors, and export reports.
          </p>
        </div>
        <label className="block">
          <span className="text-xs font-medium text-mist mb-1 block">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl bg-white/8 border border-white/15 text-white px-3 py-2.5 text-sm"
            autoComplete="current-password"
          />
        </label>
        {error && <p className="text-xs text-red-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-emergency hover:bg-amber-glow text-ocean-deep font-semibold py-2.5 rounded-xl text-sm disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
