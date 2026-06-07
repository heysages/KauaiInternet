"use client";

import { useState } from "react";
import { communityFeedbackPriorities } from "@/data/communityFeedbackPriorities";
import { saveCommunityFeedback } from "@/lib/communityFeedbackStorage";
import type { CommunityFeedbackPriority } from "@/types/network";

type CommunityFeedbackFormProps = {
  locationLabel?: string;
  variant?: "light" | "platform";
};

export default function CommunityFeedbackForm({
  locationLabel,
  variant = "light",
}: CommunityFeedbackFormProps) {
  const [selected, setSelected] = useState<Set<CommunityFeedbackPriority>>(new Set());
  const [otherNote, setOtherNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isPlatform = variant === "platform";

  const toggle = (id: CommunityFeedbackPriority) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.size === 0) return;
    saveCommunityFeedback({
      priorities: [...selected],
      otherNote: selected.has("other") ? otherNote.trim() : undefined,
      locationLabel,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`rounded-2xl p-5 text-center ${
          isPlatform ? "bg-white/8 border border-white/10" : "glass-card"
        }`}
      >
        <p className={`font-semibold mb-1 ${isPlatform ? "text-white" : "text-ocean-deep"}`}>
          Mahalo for sharing!
        </p>
        <p className={`text-sm ${isPlatform ? "text-mist/80" : "text-ocean-mid"}`}>
          Your input helps shape what the community explores next.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-5 sm:p-6 space-y-4 ${
        isPlatform ? "bg-white/8 border border-white/10" : "glass-card"
      }`}
    >
      <div>
        <h3
          className={`heading-display text-lg font-semibold mb-1 ${
            isPlatform ? "text-white" : "text-ocean-deep"
          }`}
        >
          What would you most like to improve in your area?
        </h3>
        <p className={`text-xs ${isPlatform ? "text-mist/70" : "text-ocean-mid/80"}`}>
          Select all that apply — saved locally on your device for now.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {communityFeedbackPriorities.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle(p.id)}
            className={`text-xs font-medium px-3 py-2 rounded-full border transition-colors ${
              selected.has(p.id)
                ? isPlatform
                  ? "bg-amber-emergency/25 border-amber-emergency/50 text-amber-glow"
                  : "bg-ridge-light/20 border-ridge-mid/40 text-ocean-deep"
                : isPlatform
                  ? "bg-white/5 border-white/15 text-mist hover:bg-white/10"
                  : "bg-white/60 border-ocean-mid/15 text-ocean-mid hover:bg-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {selected.has("other") && (
        <textarea
          value={otherNote}
          onChange={(e) => setOtherNote(e.target.value)}
          rows={2}
          placeholder="Tell us more…"
          className={`w-full rounded-xl px-3 py-2.5 text-sm resize-y ${
            isPlatform
              ? "bg-white/10 border border-white/15 text-white placeholder:text-mist/50"
              : "border border-ocean-mid/15 bg-white text-ocean-deep"
          }`}
        />
      )}

      <button
        type="submit"
        disabled={selected.size === 0}
        className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-40 ${
          isPlatform
            ? "bg-amber-emergency hover:bg-amber-glow text-ocean-deep"
            : "bg-ridge-mid hover:bg-ridge-dark text-white"
        }`}
      >
        Share my priorities
      </button>
    </form>
  );
}
