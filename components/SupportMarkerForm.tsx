"use client";

import { useState } from "react";
import type { SupportType } from "@/types/network";
import { supportTypes } from "@/data/supportTypes";
import { createSupportMarker, saveVisitorMarker } from "@/lib/supportMarkerStorage";

type SupportMarkerFormProps = {
  lat: number;
  lng: number;
  locationLabel: string;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function SupportMarkerForm({
  lat,
  lng,
  locationLabel,
  onSubmit,
  onCancel,
}: SupportMarkerFormProps) {
  const [nameOrOrg, setNameOrOrg] = useState("");
  const [email, setEmail] = useState("");
  const [supportType, setSupportType] = useState<SupportType>("resident");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(locationLabel);
  const [mayContact, setMayContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameOrOrg.trim() || !message.trim()) return;

    const marker = createSupportMarker({
      nameOrOrg: nameOrOrg.trim(),
      email: email.trim() || undefined,
      supportType,
      message: message.trim(),
      lat,
      lng,
      locationLabel: location.trim() || locationLabel,
      mayContact,
    });

    // TODO: POST to Supabase `support_markers` table and await moderation workflow
    saveVisitorMarker(marker);
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
    }, 1400);
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center shadow-xl">
        <p className="text-ridge-dark font-semibold text-lg mb-1">Mahalo!</p>
        <p className="text-sm text-ocean-mid">
          Your support marker has been added to the map on this device.
        </p>
        <p className="text-xs text-ocean-mid/70 mt-2">
          {/* TODO: Sync to Supabase when backend is connected */}
          Saved locally for now — will sync to the community database later.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 shadow-xl max-h-[80vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="heading-display text-lg font-semibold text-ocean-deep">
            Add a support marker
          </h3>
          <p className="text-xs text-ocean-mid mt-1">
            Approx. {lat.toFixed(2)}°, {lng.toFixed(2)}° — generalized location
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="shrink-0 w-8 h-8 rounded-lg hover:bg-ocean-deep/8 text-ocean-mid flex items-center justify-center"
          aria-label="Close form"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Name or organization" required>
          <input
            value={nameOrOrg}
            onChange={(e) => setNameOrOrg(e.target.value)}
            required
            placeholder="Your name or org"
            className={inputClass}
          />
        </Field>

        <Field label="Email (optional)">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>

        <Field label="Support type" required>
          <select
            value={supportType}
            onChange={(e) => setSupportType(e.target.value as SupportType)}
            className={inputClass}
          >
            {supportTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Approximate location">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. North shore area"
            className={inputClass}
          />
        </Field>

        <Field label="Message" required>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            placeholder="Why does island network resilience matter to you?"
            className={`${inputClass} resize-none`}
          />
        </Field>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={mayContact}
            onChange={(e) => setMayContact(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-ocean-deep/20 text-ocean-mid"
          />
          <span className="text-xs text-ocean-mid leading-relaxed">
            You may contact me about this project
          </span>
        </label>

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 bg-amber-emergency hover:bg-amber-glow text-ocean-deep font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Place Support Marker
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-3 rounded-xl border border-ocean-deep/15 text-ocean-mid text-sm hover:bg-ocean-deep/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ocean-deep mb-1">
        {label}
        {required && <span className="text-amber-emergency"> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-ocean-deep/15 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/40 text-sm";
