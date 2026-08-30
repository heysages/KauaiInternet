"use client";

import { useState } from "react";
import { getAttributionPayload } from "@/lib/analyticsClient";

type FormState = {
  name: string;
  email: string;
  phone: string;
  locationLabel: string;
  siteType: string;
  elevation: string;
  hasPower: boolean;
  hasInternet: boolean;
  hasRoofOrTower: boolean;
  hasSolar: boolean;
  hasBackupPower: boolean;
  willingToHostAntennas: boolean;
  technicalHelp: boolean;
  sponsorInterest: boolean;
  pilotInterest: boolean;
  message: string;
  mayContact: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  locationLabel: "",
  siteType: "home",
  elevation: "",
  hasPower: false,
  hasInternet: false,
  hasRoofOrTower: false,
  hasSolar: false,
  hasBackupPower: false,
  willingToHostAntennas: false,
  technicalHelp: false,
  sponsorInterest: false,
  pilotInterest: false,
  message: "",
  mayContact: false,
};

const siteTypes = [
  { value: "home", label: "Home / residence" },
  { value: "business", label: "Business" },
  { value: "farm", label: "Farm / agricultural" },
  { value: "tower", label: "Tower / elevated site" },
  { value: "school", label: "School / institution (authorized)" },
  { value: "other", label: "Other" },
];

export default function HostNodeForm({ defaultPilotInterest = false }: { defaultPilotInterest?: boolean }) {
  const [form, setForm] = useState<FormState>({ ...initialState, pilotInterest: defaultPilotInterest });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.locationLabel.trim()) {
      setError("Name, email, and general location are required.");
      return;
    }
    if (!form.mayContact) {
      setError("Please confirm we may contact you.");
      return;
    }

    try {
      const res = await fetch("/api/submissions/node-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          attribution: getAttributionPayload(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
      setForm({ ...initialState, pilotInterest: defaultPilotInterest });
    } catch {
      setError("Network error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-ridge-light/30 bg-ridge-light/8 p-8 text-center">
        <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-2">
          Mahalo — application received
        </h3>
        <p className="text-sm text-ocean-mid">
          Your host site interest is saved securely. Our team will follow up if there is a fit for
          the pilot. Precise location details are kept private.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-ocean-mid underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  const check = (key: keyof FormState, label: string) => (
    <label className="flex items-start gap-2 text-sm text-ocean-mid cursor-pointer">
      <input
        type="checkbox"
        checked={Boolean(form[key])}
        onChange={(e) => update(key, e.target.checked as FormState[typeof key])}
        className="mt-1 rounded border-sand-warm"
      />
      {label}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ocean-deep mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean-deep mb-1">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ocean-deep mb-1">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean-deep mb-1">
            General location (area, not exact address) *
          </label>
          <input
            value={form.locationLabel}
            onChange={(e) => update("locationLabel", e.target.value)}
            placeholder="e.g. Princeville area"
            className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ocean-deep mb-1">Site type</label>
          <select
            value={form.siteType}
            onChange={(e) => update("siteType", e.target.value)}
            className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
          >
            {siteTypes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean-deep mb-1">Elevation (if known)</label>
          <input
            value={form.elevation}
            onChange={(e) => update("elevation", e.target.value)}
            placeholder="e.g. ~400 ft"
            className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl bg-sand-light/50">
        {check("hasPower", "Grid power available")}
        {check("hasInternet", "Internet connection available")}
        {check("hasRoofOrTower", "Roof or tower access")}
        {check("hasSolar", "Solar available or planned")}
        {check("hasBackupPower", "Generator or battery backup")}
        {check("willingToHostAntennas", "Willing to host antennas")}
        {check("technicalHelp", "Can provide technical help")}
        {check("sponsorInterest", "Interested in sponsoring a node")}
        {check("pilotInterest", "Interested in North Shore pilot")}
      </div>
      <div>
        <label className="block text-sm font-medium text-ocean-deep mb-1">Additional notes</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-sand-warm px-3 py-2 text-sm"
          placeholder="Tell us about your site, views, or constraints..."
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-ocean-mid">
        <input
          type="checkbox"
          checked={form.mayContact}
          onChange={(e) => update("mayContact", e.target.checked)}
          className="mt-1"
          required
        />
        I give permission for the KauaiInternet team to contact me about hosting a node. I
        understand precise location details will not be displayed publicly.
      </label>
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-amber-emergency text-ocean-deep font-semibold rounded-xl hover:bg-amber-glow transition-colors"
      >
        Submit Host Application
      </button>
    </form>
  );
}
