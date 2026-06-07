"use client";

import { useState } from "react";
import type { ResidentObservationType } from "@/types/network";
import { sampleAddresses } from "@/data/sampleAddresses";
import { residentObservationTypes } from "@/data/residentObservationTypes";
import {
  createResidentObservation,
  saveVisitorObservation,
} from "@/lib/residentKnowledgeStorage";

type ResidentKnowledgeFormProps = {
  onSubmit: () => void;
  initialLat?: number;
  initialLng?: number;
  compact?: boolean;
};

export default function ResidentKnowledgeForm({
  onSubmit,
  initialLat,
  initialLng,
  compact = false,
}: ResidentKnowledgeFormProps) {
  const [observationType, setObservationType] =
    useState<ResidentObservationType>("weak-connectivity");
  const [message, setMessage] = useState("");
  const [nameOrOrg, setNameOrOrg] = useState("");
  const [locationId, setLocationId] = useState(sampleAddresses[0]?.id ?? "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const selected = sampleAddresses.find((a) => a.id === locationId);
    const lat = initialLat ?? selected?.lat ?? 21.974;
    const lng = initialLng ?? selected?.lng ?? -159.371;
    const locationLabel =
      initialLat
        ? `${lat.toFixed(2)}°, ${lng.toFixed(2)}° · community observation`
        : `${selected?.neighborhood ?? "Kauai"} · community observation`;

    saveVisitorObservation(
      createResidentObservation({
        observationType,
        message: message.trim(),
        lat,
        lng,
        locationLabel,
        nameOrOrg: nameOrOrg.trim() || undefined,
      })
    );

    setSubmitted(true);
    setTimeout(onSubmit, 1200);
  };

  if (submitted) {
    return (
      <div className={`glass-card rounded-2xl text-center ${compact ? "p-5" : "p-8"}`}>
        <p className="text-ridge-dark font-semibold text-lg mb-1">Mahalo!</p>
        <p className="text-sm text-ocean-mid leading-relaxed">
          Your observation has been added as <strong>community-contributed information</strong> —
          not verified fact. It helps neighbors understand real-world experience.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`glass-card rounded-2xl space-y-4 ${compact ? "p-5" : "p-6"}`}
    >
      {!compact && (
        <div>
          <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-1">
            Share what you know
          </h3>
          <p className="text-xs text-ocean-mid leading-relaxed">
            Labeled clearly as a community observation. Not verified infrastructure data.
          </p>
        </div>
      )}

      <label className="block">
        <span className="text-xs font-medium text-ocean-deep mb-1 block">Observation type</span>
        <select
          value={observationType}
          onChange={(e) => setObservationType(e.target.value as ResidentObservationType)}
          className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm"
        >
          {residentObservationTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
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
            className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm"
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
        <span className="text-xs font-medium text-ocean-deep mb-1 block">Your observation *</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={compact ? 3 : 4}
          className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm resize-y"
          placeholder="What connectivity experience do you see in this area?"
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-ocean-deep mb-1 block">Name (optional)</span>
        <input
          type="text"
          value={nameOrOrg}
          onChange={(e) => setNameOrOrg(e.target.value)}
          className="w-full rounded-xl border border-ocean-mid/15 bg-white px-3 py-2.5 text-sm"
          placeholder="Anonymous is fine"
        />
      </label>

      <button
        type="submit"
        className="w-full sm:w-auto bg-ridge-mid hover:bg-ridge-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
      >
        Add community observation
      </button>
    </form>
  );
}
