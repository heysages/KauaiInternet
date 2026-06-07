import type { CandidateSite, MapRegion, SupportMarker } from "@/types/network";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import { supportTypeById } from "@/data/supportTypes";

export type MapSelection =
  | { kind: "site"; data: CandidateSite }
  | { kind: "region"; data: MapRegion }
  | { kind: "marker"; data: SupportMarker }
  | null;

type SiteDetailPanelProps = {
  selection: MapSelection;
  onAddSupport: (lat: number, lng: number, label: string) => void;
  onClose: () => void;
};

const statusLabels: Record<string, string> = {
  proposed: "Proposed",
  "under-review": "Under Review",
  approved: "Approved",
  active: "Active",
  staging: "Staging",
};

export default function SiteDetailPanel({
  selection,
  onAddSupport,
  onClose,
}: SiteDetailPanelProps) {
  if (!selection) {
    return (
      <div className="glass-card rounded-2xl p-6 shadow-lg shadow-ocean-deep/10 h-full flex flex-col justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-ocean-deep/8 text-ocean-mid flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-2">
          Explore the map
        </h3>
        <p className="text-sm text-ocean-mid leading-relaxed">
          Click a candidate site, planning region, or community support marker to
          learn why it may matter for Kauai&apos;s resilience pilot.
        </p>
        <p className="text-xs text-ocean-mid/80 mt-4">
          Or click anywhere on the map to add your support.
        </p>
      </div>
    );
  }

  if (selection.kind === "site") {
    const site = selection.data;
    const typeMeta = candidateSiteTypeById[site.type];
    return (
      <div className="glass-card rounded-2xl p-5 shadow-lg shadow-ocean-deep/10 border-l-4 border-l-amber-emergency h-full overflow-y-auto">
        <PanelHeader
          badge={typeMeta?.label ?? site.type}
          badgeColor={typeMeta?.mapColor}
          status={statusLabels[site.status]}
          title={site.name}
          onClose={onClose}
        />
        <p className="text-xs text-ocean-mid mb-3">{site.areaLabel}</p>
        <p className="text-sm text-ocean-mid leading-relaxed mb-4">{site.description}</p>
        <WhyItMatters text={site.whyItMatters} />
        <MetaGrid
          items={[
            { label: "Elevation", value: site.elevation ?? "—" },
            { label: "Coords (approx.)", value: `${site.lat.toFixed(2)}°, ${site.lng.toFixed(2)}°` },
          ]}
        />
        <AddSupportButton
          onClick={() => onAddSupport(site.lat, site.lng, site.areaLabel)}
        />
      </div>
    );
  }

  if (selection.kind === "region") {
    const region = selection.data;
    return (
      <div className="glass-card rounded-2xl p-5 shadow-lg shadow-ocean-deep/10 border-l-4 border-l-ridge-mid h-full overflow-y-auto">
        <PanelHeader
          badge="Planning Region"
          badgeColor={region.fillColor}
          title={region.name}
          onClose={onClose}
        />
        <p className="text-sm text-ocean-mid leading-relaxed mb-4">{region.description}</p>
        <WhyItMatters text={region.whyItMatters} />
        <p className="text-[11px] text-ocean-mid/80 mt-4 italic">
          Region boundaries are approximate planning areas, not exact zones.
        </p>
      </div>
    );
  }

  const marker = selection.data;
  return (
    <div className="glass-card rounded-2xl p-5 shadow-lg shadow-ocean-deep/10 border-l-4 border-l-purple-400 h-full overflow-y-auto">
      <PanelHeader
        badge={supportTypeById[marker.supportType]?.label ?? marker.supportType}
        badgeColor="#c084fc"
        status={marker.source === "mock" ? "Community" : "Your submission"}
        title={marker.nameOrOrg}
        onClose={onClose}
      />
      <p className="text-xs text-ocean-mid mb-3">{marker.locationLabel}</p>
      <blockquote className="text-sm text-ocean-mid leading-relaxed mb-4 border-l-2 border-purple-300 pl-3">
        &ldquo;{marker.message}&rdquo;
      </blockquote>
      <MetaGrid
        items={[
          { label: "May contact", value: marker.mayContact ? "Yes" : "No" },
          { label: "Added", value: new Date(marker.createdAt).toLocaleDateString() },
        ]}
      />
      <AddSupportButton
        onClick={() => onAddSupport(marker.lat, marker.lng, marker.locationLabel)}
        label="Add support nearby"
      />
    </div>
  );
}

function PanelHeader({
  badge,
  badgeColor,
  status,
  title,
  onClose,
}: {
  badge: string;
  badgeColor?: string;
  status?: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: badgeColor ?? "#1a6b7c" }}
          >
            {badge}
          </span>
          {status && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-ocean-mid">
              {status}
            </span>
          )}
        </div>
        <h3 className="heading-display text-lg font-semibold text-ocean-deep leading-snug">
          {title}
        </h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 w-8 h-8 rounded-lg hover:bg-ocean-deep/8 text-ocean-mid flex items-center justify-center transition-colors"
        aria-label="Close panel"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function WhyItMatters({ text }: { text: string }) {
  return (
    <div className="p-3.5 rounded-xl bg-amber-emergency/8 border border-amber-emergency/20 mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-emergency mb-1.5">
        Why this may matter
      </p>
      <p className="text-sm text-ocean-deep leading-relaxed">{text}</p>
    </div>
  );
}

function MetaGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {items.map((item) => (
        <div key={item.label} className="bg-ocean-deep/5 rounded-lg px-3 py-2">
          <p className="text-[10px] text-ocean-mid">{item.label}</p>
          <p className="text-xs font-semibold text-ocean-deep">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function AddSupportButton({
  onClick,
  label = "Add your support here",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-ocean-mid hover:bg-ocean-deep text-white text-sm font-semibold py-3 rounded-xl transition-colors"
    >
      {label}
    </button>
  );
}
