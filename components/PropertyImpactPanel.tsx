import { candidateSites } from "@/data/candidateSites";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import type { PropertyImpactSnapshot, SampleAddress } from "@/types/network";

type PropertyImpactPanelProps = {
  address: SampleAddress | null;
  snapshot: PropertyImpactSnapshot | null;
  onClose?: () => void;
};

export default function PropertyImpactPanel({
  address,
  snapshot,
}: PropertyImpactPanelProps) {
  if (!address || !snapshot) {
    return (
      <div className="platform-panel h-full flex flex-col p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-white/8 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-amber-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h3 className="heading-display text-lg font-semibold text-white mb-2">
            Search your address
          </h3>
          <p className="text-sm text-mist/80 leading-relaxed max-w-xs">
            Enter a Kauai address to see a resilience snapshot, nearby infrastructure, and how
            your property might help the island network.
          </p>
        </div>
      </div>
    );
  }

  const nearbySites = snapshot.nearbySiteIds
    .map((id) => candidateSites.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="platform-panel h-full flex flex-col overflow-hidden">
      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-1">
          Resilience Snapshot
        </p>
        <h2 className="heading-display text-lg font-semibold text-white leading-snug">
          {address.neighborhood}
        </h2>
        <p className="text-xs text-mist/70 mt-1 leading-relaxed">{address.address}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
        <div className="rounded-xl bg-white/8 border border-white/10 px-4 py-3 text-center">
          <p className="text-[10px] text-mist/60 uppercase tracking-wider">Property resilience score</p>
          <p className="text-4xl font-semibold text-amber-glow tabular-nums mt-1">
            {snapshot.resilienceScore}
          </p>
          <p className="text-[10px] text-mist/55 mt-1">Simulated · planning estimate</p>
        </div>

        <PanelSection title="Nearby candidate infrastructure">
          <ul className="space-y-2">
            {nearbySites.map((site) => {
              const typeMeta = candidateSiteTypeById[site!.type];
              return (
                <li
                  key={site!.id}
                  className="text-sm bg-white/5 rounded-lg px-3 py-2 border border-white/8"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: typeMeta?.mapColor }}
                  />
                  <span className="text-white font-medium">{site!.name}</span>
                  <p className="text-[10px] text-mist/65 mt-1 ml-4">{typeMeta?.label}</p>
                </li>
              );
            })}
          </ul>
        </PanelSection>

        <PanelSection title="Nearby emergency resources">
          <BulletList items={snapshot.emergencyResources} />
        </PanelSection>

        <PanelSection title="Potential future coverage improvements">
          <BulletList items={snapshot.coverageImprovements} />
        </PanelSection>

        <PanelSection title="Community benefit estimate">
          <p className="text-sm text-mist leading-relaxed">{snapshot.communityBenefitEstimate}</p>
        </PanelSection>

        {snapshot.propertyHelpCategories.length > 0 && (
          <PanelSection title="Your property could help as">
            <div className="flex flex-wrap gap-1.5">
              {snapshot.propertyHelpCategories.map((label) => (
                <span
                  key={label}
                  className="text-[10px] font-medium px-2 py-1 rounded-full bg-ridge-light/20 text-ridge-light border border-ridge-light/30"
                >
                  {label}
                </span>
              ))}
            </div>
          </PanelSection>
        )}
      </div>
    </div>
  );
}

function PanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-mist leading-relaxed">
          <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-ridge-light" />
          {item}
        </li>
      ))}
    </ul>
  );
}
