"use client";

import { useState } from "react";
import type { SupportType } from "@/types/network";
import { supportTypeOptions } from "@/data/supportTypeLabels";
import { saveSupportSubmission } from "@/lib/supportSubmissionStorage";

type FormState = {
  name: string;
  organization: string;
  email: string;
  supportType: SupportType | "";
  helpMessage: string;
  location: string;
  mayContact: boolean;
};

const initialState: FormState = {
  name: "",
  organization: "",
  email: "",
  supportType: "",
  helpMessage: "",
  location: "",
  mayContact: false,
};

export default function SupportForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.supportType) {
      setError("Please select who you are.");
      return;
    }
    if (!form.helpMessage.trim()) {
      setError("Please tell us how you can help.");
      return;
    }
    if (!form.mayContact) {
      setError("Please confirm we may contact you to follow up.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      organization: form.organization.trim() || undefined,
      email: form.email.trim(),
      supportType: form.supportType,
      helpMessage: form.helpMessage.trim(),
      location: form.location.trim(),
      mayContact: form.mayContact,
    };

    saveSupportSubmission(payload);

    try {
      await fetch("/api/submissions/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* local save already succeeded */
    }

    setSubmitted(true);
    setForm(initialState);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-ridge-light/30 bg-ridge-light/8 p-8 sm:p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-ridge-light/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-ridge-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="heading-display text-2xl font-semibold text-ocean-deep mb-2">
          Mahalo — we received your offer
        </h3>
        <p className="text-ocean-mid text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Your support has been saved locally. When we connect a backend, your
          submission will sync to the project team for follow-up.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-medium text-ocean-mid hover:text-ocean-deep underline underline-offset-4 transition-colors"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="support-name" className="block text-sm font-medium text-ocean-deep mb-1.5">
            Name <span className="text-amber-emergency">*</span>
          </label>
          <input
            id="support-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-ocean-deep/12 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/30 text-sm transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="support-org" className="block text-sm font-medium text-ocean-deep mb-1.5">
            Organization
          </label>
          <input
            id="support-org"
            type="text"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            placeholder="Company, agency, or group (optional)"
            className="w-full px-4 py-3 rounded-xl border border-ocean-deep/12 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/30 text-sm transition-shadow"
          />
        </div>
      </div>

      <div>
        <label htmlFor="support-email" className="block text-sm font-medium text-ocean-deep mb-1.5">
          Email <span className="text-amber-emergency">*</span>
        </label>
        <input
          id="support-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-ocean-deep/12 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/30 text-sm transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="support-type" className="block text-sm font-medium text-ocean-deep mb-1.5">
          I am a… <span className="text-amber-emergency">*</span>
        </label>
        <select
          id="support-type"
          value={form.supportType}
          onChange={(e) => update("supportType", e.target.value as SupportType | "")}
          className="w-full px-4 py-3 rounded-xl border border-ocean-deep/12 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/30 text-sm transition-shadow appearance-none"
        >
          <option value="">Select one…</option>
          {supportTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="support-help" className="block text-sm font-medium text-ocean-deep mb-1.5">
          How can you help? <span className="text-amber-emergency">*</span>
        </label>
        <textarea
          id="support-help"
          rows={4}
          value={form.helpMessage}
          onChange={(e) => update("helpMessage", e.target.value)}
          placeholder="Site access, technical skills, funding, coordination, equipment, advocacy…"
          className="w-full px-4 py-3 rounded-xl border border-ocean-deep/12 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/30 text-sm resize-none transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="support-location" className="block text-sm font-medium text-ocean-deep mb-1.5">
          Approximate location
        </label>
        <input
          id="support-location"
          type="text"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="e.g. Kapaʻa, North Shore, Līhuʻe area"
          className="w-full px-4 py-3 rounded-xl border border-ocean-deep/12 bg-white/70 focus:outline-none focus:ring-2 focus:ring-ocean-light/30 text-sm transition-shadow"
        />
        <p className="text-xs text-ocean-mid mt-1.5">
          General area only — not a precise address.
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={form.mayContact}
          onChange={(e) => update("mayContact", e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-ocean-deep/20 text-ocean-mid focus:ring-ocean-light/40"
        />
        <span className="text-sm text-ocean-mid leading-relaxed group-hover:text-ocean-deep transition-colors">
          I give permission for the Kauai Resilience Network team to contact me
          about this project. <span className="text-amber-emergency">*</span>
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-ocean-mid hover:bg-ocean-deep text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-ocean-deep/15"
      >
        Submit Support Offer
      </button>

      <p className="text-center text-xs text-ocean-mid">
        Stored locally in your browser for now. No data leaves your device until
        a backend is connected.
      </p>
    </form>
  );
}
