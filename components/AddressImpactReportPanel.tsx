import Link from "next/link";
import CommunityScoreCards from "@/components/CommunityScoreCards";
import type { AddressImpactReport, SampleAddress } from "@/types/network";

type AddressImpactReportPanelProps = {
  location: SampleAddress | null;
  report: AddressImpactReport | null;
  futureProgress: number;
  variant?: "light" | "platform";
};

export default function AddressImpactReportPanel({
  location,
  report,
  futureProgress,
  variant = "light",
}: AddressImpactReportPanelProps) {
  const isPlatform = variant === "platform";

  if (!location || !report) {
    return (
      <div
        className={`h-full flex flex-col items-center justify-center text-center p-8 ${
          isPlatform ? "" : "glass-card rounded-2xl min-h-[400px]"
        }`}
      >
        <span className="text-4xl mb-4" aria-hidden>
          🏡
        </span>
        <h3
          className={`heading-display text-xl font-semibold mb-2 ${
            isPlatform ? "text-white" : "text-ocean-deep"
          }`}
        >
          Your Community Report
        </h3>
        <p className={`text-sm leading-relaxed max-w-xs ${isPlatform ? "text-mist/80" : "text-ocean-mid"}`}>
          Search for your home, business, school, or neighborhood to see how resilience,
          connectivity, and community projects may relate to you.
        </p>
      </div>
    );
  }

  const showFuture = futureProgress > 15;

  return (
    <div
      className={`h-full overflow-y-auto space-y-6 ${
        isPlatform ? "px-1" : "glass-card rounded-2xl p-6 sm:p-8"
      }`}
    >
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
            isPlatform ? "text-amber-glow" : "text-ridge-mid"
          }`}
        >
          Community Snapshot
        </p>
        <h3
          className={`heading-display text-xl font-semibold mb-2 ${
            isPlatform ? "text-white" : "text-ocean-deep"
          }`}
        >
          {report.headline}
        </h3>
        <p className={`text-sm leading-relaxed ${isPlatform ? "text-mist" : "text-ocean-mid"}`}>
          {report.summary}
        </p>
        <p className={`text-xs mt-2 ${isPlatform ? "text-mist/60" : "text-ocean-mid/70"}`}>
          {location.address}
        </p>
      </div>

      <CommunityScoreCards scores={report.scores} variant={variant} />

      <ReportBlock title="Current connectivity options" variant={variant}>
        <ul className="space-y-1.5">
          {report.connectivityOptions.map((opt) => (
            <li
              key={opt}
              className={`text-sm flex gap-2 ${isPlatform ? "text-mist" : "text-ocean-mid"}`}
            >
              <span className="text-ridge-light shrink-0">•</span>
              {opt}
            </li>
          ))}
        </ul>
        <p className={`text-[10px] mt-2 ${isPlatform ? "text-mist/55" : "text-ocean-mid/65"}`}>
          General service types only — verify availability at your address.
        </p>
      </ReportBlock>

      <ReportBlock title="Nearby community assets" variant={variant}>
        {report.nearbyAssets.length > 0 ? (
          <ul className="space-y-2">
            {report.nearbyAssets.map((a) => (
              <li
                key={a.id}
                className={`text-sm ${isPlatform ? "text-mist" : "text-ocean-mid"}`}
              >
                <span className={`font-medium ${isPlatform ? "text-white" : "text-ocean-deep"}`}>
                  {a.name}
                </span>
                <span className="opacity-70"> · {a.category} (~{a.km.toFixed(1)} km)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-sm ${isPlatform ? "text-mist/70" : "text-ocean-mid"}`}>
            Data Needed — help us map verified community assets near you.
          </p>
        )}
      </ReportBlock>

      <ReportBlock title="Emergency resources nearby" variant={variant}>
        <ul className="space-y-1.5">
          {report.emergencyResources.map((r) => (
            <li
              key={r}
              className={`text-sm flex gap-2 ${isPlatform ? "text-mist" : "text-ocean-mid"}`}
            >
              <span className="text-amber-emergency shrink-0">•</span>
              {r}
            </li>
          ))}
        </ul>
      </ReportBlock>

      <ReportBlock title="Ways to participate" variant={variant}>
        <ul className="space-y-3">
          {report.participationOpportunities.map((w) => (
            <li key={w.id}>
              <Link
                href={w.href}
                className={`text-sm font-medium hover:underline ${
                  isPlatform ? "text-amber-glow" : "text-ridge-mid"
                }`}
              >
                {w.label}
              </Link>
              <p className={`text-xs mt-0.5 ${isPlatform ? "text-mist/70" : "text-ocean-mid/80"}`}>
                {w.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-3">
          <Link
            href="#conversation"
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              isPlatform
                ? "border-white/20 text-mist hover:bg-white/10"
                : "border-ocean-mid/20 text-ocean-mid hover:bg-white"
            }`}
          >
            Join community discussions
          </Link>
          <Link
            href="#map"
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              isPlatform
                ? "border-white/20 text-mist hover:bg-white/10"
                : "border-ocean-mid/20 text-ocean-mid hover:bg-white"
            }`}
          >
            Share local knowledge
          </Link>
        </div>
      </ReportBlock>

      {showFuture && (
        <>
          <ReportBlock title="Potential future projects" variant={variant}>
            <ul className="space-y-2">
              {report.futureProjects.map((p) => (
                <li
                  key={p.id}
                  className={`text-sm ${isPlatform ? "text-mist" : "text-ocean-mid"}`}
                >
                  <span
                    className={`font-medium ${isPlatform ? "text-white" : "text-ocean-deep"}`}
                  >
                    {p.name}
                  </span>
                  <span className="opacity-70">
                    {" "}
                    — {p.area} (~{p.km.toFixed(1)} km)
                  </span>
                </li>
              ))}
            </ul>
            <p className={`text-[10px] mt-2 ${isPlatform ? "text-mist/55" : "text-ocean-mid/65"}`}>
              Ideas under discussion — not existing infrastructure.
            </p>
          </ReportBlock>

          <ReportBlock title="Possible future benefits" variant={variant}>
            <ul className="space-y-1.5">
              {report.futureBenefits.map((b) => (
                <li
                  key={b}
                  className={`text-sm flex gap-2 ${isPlatform ? "text-mist" : "text-ocean-mid"}`}
                >
                  <span className="text-amber-emergency shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </ReportBlock>
        </>
      )}
    </div>
  );
}

function ReportBlock({
  title,
  children,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  variant: "light" | "platform";
}) {
  const isPlatform = variant === "platform";
  return (
    <div>
      <h4
        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
          isPlatform ? "text-amber-glow/90" : "text-ocean-mid"
        }`}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}
