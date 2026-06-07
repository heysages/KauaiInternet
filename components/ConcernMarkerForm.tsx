"use client";

import { useState } from "react";
import type { ConcernCategory } from "@/types/network";
import { concernCategories } from "@/data/concernCategories";
import { sampleAddresses } from "@/data/sampleAddresses";
import { getAttributionPayload } from "@/lib/analyticsClient";
import {
  createConcernMarker,
  saveVisitorConcernMarker,
} from "@/lib/concernMarkerStorage";

type ConcernMarkerFormProps = {
  onSubmit: () => void;
  initialLat?: number;
  initialLng?: number;
  initialLocationLabel?: string;
  compact?: boolean;
};

export default function ConcernMarkerForm({
  onSubmit,
  initialLat,
  initialLng,
  initialLocationLabel,
  compact = false,
}: ConcernMarkerFormProps) {
  const [nameOrOrg, setNameOrOrg] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<ConcernCategory>("questions-ideas");
  const [message, setMessage] = useState("");
  const [locationId, setLocationId] = useState(sampleAddresses[0]?.id ?? "");
  const [mayContact, setMayContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const selected = sampleAddresses.find((a) => a.id === locationId);
    const lat = initialLat ?? selected?.lat ?? 21.974;
    const lng = initialLng ?? selected?.lng ?? -159.371;
    const locationLabel =
      initialLocationLabel ?? selected?.neighborhood ?? "Kauai · approximate";

    const marker = createConcernMarker({
      nameOrOrg: nameOrOrg.trim() || "Community member",
      email: email.trim() || undefined,
      category,
      message: message.trim(),
      lat,
      lng,
      locationLabel,
      mayContact,
    });

    saveVisitorConcernMarker(marker);
    fetch("/api/submissions/concern", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        message: message.trim(),
        lat,
        lng,
        locationLabel,
        nameOrOrg: nameOrOrg.trim() || undefined,
        attribution: getAttributionPayload(),
      }),
    }).catch(() => undefined);
    setSubmitted(true);
    setTimeout(onSubmit, 1200);
  };

  if (submitted) {
    return (
      <div className={`glass-card rounded-2xl text-center ${compact ? "p-5" : "p-8"}`}>
        <p className="text-ridge-dark font-semibold text-lg mb-1">Mahalo for sharing</p>
        <p className="text-sm text-ocean-mid leading-relaxed">
          Your perspective has been added to the community map on this device. Every
          voice helps us listen more thoughtfully.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`glass-card rounded-2xl space-y-4 ${compact ? "p-5" : "p-6 sm:p-8"}`}
    >
      {!compact && (
        <div>
          <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-1">
            Share a question or perspective
          </h3>
          <p className="text-sm text-ocean-mid leading-relaxed">
            Questions, concerns, and ideas are welcome. This is a listening space — not a
            debate.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-medium text-ocean-deep mb-1 block">Name (optional)</span>
          <input
            type="text"
            value={nameOrOrg}
            onChange={(e) => setNameOrOrg(e.target.value)}
            className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm text-ocean-deep"
            placeholder="Your name or organization"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-ocean-deep mb-1 block">Email (optional)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm text-ocean-deep"
            placeholder="If you would like a reply"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-medium text-ocean-deep mb-1 block">Topic</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ConcernCategory)}
          className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm text-ocean-deep"
        >
          {concernCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      {!initialLat && (
        <label className="block">
          <span className="text-xs font-medium text-ocean-deep mb-1 block">Area</span>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm text-ocean-deep"
          >
            {sampleAddresses.map((a) => (
              <option key={a.id} value={a.id}>
                {a.neighborhood}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="text-xs font-medium text-ocean-deep mb-1 block">Your message *</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={compact ? 3 : 4}
          className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm text-ocean-deep resize-y"
          placeholder="Share a question, concern, or idea related to Kauai's future resilience…"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-ocean-mid cursor-pointer">
        <input
          type="checkbox"
          checked={mayContact}
          onChange={(e) => setMayContact(e.target.checked)}
          className="mt-1 rounded border-ocean-mid/20"
        />
        I am open to being contacted for follow-up conversation
      </label>

      <button
        type="submit"
        className="w-full sm:w-auto bg-ridge-mid hover:bg-ridge-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Add to community map
      </button>
    </form>
  );
}
