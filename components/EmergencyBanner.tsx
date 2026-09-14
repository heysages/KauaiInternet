import Link from "next/link";

export type EmergencyBannerProps = {
  enabled?: boolean;
};

const isEmergencyActive = process.env.NEXT_PUBLIC_EMERGENCY_BANNER === "true";

export default function EmergencyBanner({ enabled = isEmergencyActive }: EmergencyBannerProps) {
  if (!enabled) return null;

  return (
    <div className="bg-amber-emergency text-ocean-deep py-3 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-start sm:items-center gap-3">
          <span className="text-xl" aria-hidden>⚠️</span>
          <div>
            <p className="font-semibold text-sm">
              Hurricane Recovery — Power outages across Kauaʻi
            </p>
            <p className="text-xs text-ocean-deep/80">
              This is exactly why we&apos;re building a resilient network. Deployment team on standby.
            </p>
          </div>
        </div>
        <Link
          href="#north-shore-pilot"
          className="inline-flex items-center gap-2 bg-ocean-deep text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-ocean-mid transition-colors whitespace-nowrap"
        >
          Learn how you can help →
        </Link>
      </div>
    </div>
  );
}
