import type {
  CandidateSite,
  CommunityConcernMarker,
  IslandAsset,
  MapRegion,
  RegionConnectivityProfile,
  ResidentObservation,
  SupportMarker,
} from "@/types/network";
import { concernCategoryById } from "@/data/concernCategories";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import { sitePlanningById } from "@/data/sitePlanningDetails";
import { equipmentItems } from "@/data/inventory";
import { supportComments } from "@/data/supportComments";
import { supportTypeById } from "@/data/supportTypes";
import { existingInfrastructure } from "@/data/existingInfrastructure";
import { connectivityServiceLabels } from "@/data/connectivityProviders";
import { islandAssetCategoryLabels } from "@/data/islandAssets";
import { residentObservationById } from "@/data/residentObservationTypes";
import { dataConfidenceColors } from "@/data/dataConfidenceLegend";
import { getSiteCoverage, getSiteResilienceImpact } from "@/lib/siteImpact";

export type MapSelection =
  | { kind: "site"; data: CandidateSite; isFutureOpportunity?: boolean }
  | { kind: "region"; data: MapRegion }
  | { kind: "connectivity-region"; data: MapRegion; profile: RegionConnectivityProfile }
  | { kind: "island-asset"; data: IslandAsset }
  | { kind: "resident-observation"; data: ResidentObservation }
  | { kind: "marker"; data: SupportMarker }
  | { kind: "concern"; data: CommunityConcernMarker }
  | { kind: "infrastructure"; data: (typeof existingInfrastructure)[number] }
  | null;

type MapInfoDrawerProps = {
  selection: MapSelection;
  onClose: () => void;
  variant?: "community" | "planner";
};

const statusLabels: Record<string, string> = {
  proposed: "Proposed",
  "under-review": "Under Review",
  approved: "Approved",
  active: "Active",
  staging: "Staging",
};

export default function MapInfoDrawer({
  selection,
  onClose,
  variant = "community",
}: MapInfoDrawerProps) {
  if (!selection) {
    return (
      <div className="platform-panel h-full flex flex-col p-6">
        <DrawerHeader title="Project details" onClose={onClose} showClose={false} />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-white/8 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-amber-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <h3 className="heading-display text-lg font-semibold text-white mb-2">
            Tap the map to explore
          </h3>
          <p className="text-sm text-mist/80 leading-relaxed max-w-xs">
            Click a region for connectivity knowledge, verified island assets, or
            community observations — labeled by confidence level.
          </p>
        </div>
      </div>
    );
  }

  if (selection.kind === "connectivity-region") {
    const { data: region, profile } = selection;
    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={region.name}
          subtitle="Existing connectivity · region profile"
          onClose={onClose}
          badge="Verified + community knowledge"
          badgeColor={dataConfidenceColors.verified}
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
          <Section title="About this region">
            <p className="text-sm text-mist leading-relaxed">{region.description}</p>
          </Section>
          <Section title="Known service types (general)">
            <div className="flex flex-wrap gap-1.5">
              {profile.knownServiceTypes.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/10 text-mist border border-white/15"
                >
                  {connectivityServiceLabels[t]}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Provider notes">
            <BulletList items={profile.providerNotes} />
          </Section>
          <Section title="Community observations">
            <BulletList items={profile.communityObservations} />
          </Section>
          <Section title="Data needed">
            <ul className="space-y-2">
              {profile.dataNeeded.map((item) => (
                <li
                  key={item}
                  className="text-xs text-mist leading-relaxed bg-amber-emergency/10 border border-amber-emergency/25 rounded-lg px-3 py-2"
                >
                  <span className="text-amber-glow font-semibold">Data Needed · </span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Resilience considerations">
            <BulletList items={profile.resilienceConsiderations} />
          </Section>
          <Section title="Questions & opportunities">
            <BulletList items={profile.opportunityQuestions} />
          </Section>
          <p className="text-[10px] text-mist/55 leading-relaxed">
            No address-level coverage claims. Verify service with providers directly.
          </p>
        </div>
      </div>
    );
  }

  if (selection.kind === "island-asset") {
    const asset = selection.data;
    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={asset.name}
          subtitle={asset.areaLabel}
          onClose={onClose}
          badge={islandAssetCategoryLabels[asset.category]}
          badgeColor={dataConfidenceColors.verified}
          status="Verified public facility"
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <Section title="Why it matters">
            <p className="text-sm text-mist leading-relaxed">{asset.description}</p>
          </Section>
          <MetaRow items={[{ label: "Source", value: asset.sourceNote }]} />
          <p className="text-[10px] text-mist/55 leading-relaxed">
            Approximate area location only — not infrastructure routing or tower placement.
          </p>
        </div>
      </div>
    );
  }

  if (selection.kind === "resident-observation") {
    const obs = selection.data;
    const typeMeta = residentObservationById[obs.observationType];
    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={typeMeta?.label ?? obs.observationType}
          subtitle={obs.locationLabel}
          onClose={onClose}
          badge="Community observation"
          badgeColor={dataConfidenceColors.community}
          status={obs.source === "mock" ? "Neighbor report" : "Your submission"}
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <Section title="What was shared">
            <blockquote className="text-sm text-mist leading-relaxed border-l-2 border-sand-warm/60 pl-3">
              &ldquo;{obs.message}&rdquo;
            </blockquote>
          </Section>
          {obs.nameOrOrg && (
            <MetaRow items={[{ label: "Shared by", value: obs.nameOrOrg }]} />
          )}
          <p className="text-[10px] text-mist/55 leading-relaxed">
            Community-contributed information — not verified fact. Helpful local context
            from neighbors.
          </p>
        </div>
      </div>
    );
  }

  if (selection.kind === "site") {
    const site = selection.data;
    const isFuture = selection.isFutureOpportunity;
    const typeMeta = candidateSiteTypeById[site.type];
    const planning = sitePlanningById[site.id];
    const equipment = (planning?.equipmentIds ?? [])
      .map((id) => equipmentItems.find((e) => e.id === id))
      .filter(Boolean);
    const comments = (planning?.commentIds ?? [])
      .map((id) => supportComments.find((c) => c.id === id))
      .filter(Boolean);

    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={site.name}
          subtitle={site.areaLabel}
          onClose={onClose}
          badge={isFuture ? "Future opportunity" : typeMeta?.label}
          badgeColor={isFuture ? dataConfidenceColors["future-opportunity"] : typeMeta?.mapColor}
          status={isFuture ? "Idea under discussion" : statusLabels[site.status]}
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
          <Section title="Why it matters">
            <p className="text-sm text-mist leading-relaxed">{site.whyItMatters}</p>
          </Section>

          {variant === "community" ? (
            <>
              <MetaRow
                items={[
                  {
                    label: "Who benefits",
                    value: site.populationServed
                      ? `Neighbors and families in the surrounding area`
                      : "Nearby communities",
                  },
                  {
                    label: "What it could mean",
                    value: getSiteCoverage(site).replace(/backhaul|uplink|aggregation/gi, "connection"),
                  },
                ]}
              />
              {planning && (
                <Section title="How this could help">
                  <BulletList items={planning.potentialBenefits} />
                </Section>
              )}
              {comments.length > 0 && (
                <Section title="From the community">
                  <div className="space-y-3">
                    {comments.map((c) => (
                      <blockquote key={c!.id} className="text-sm text-mist leading-relaxed border-l-2 border-amber-emergency/50 pl-3">
                        &ldquo;{c!.text}&rdquo;
                        <footer className="text-xs text-mist/60 mt-2">
                          — {c!.name}, {c!.location}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </Section>
              )}
              <a
                href="#support"
                className="block text-center text-sm font-semibold bg-amber-emergency/20 hover:bg-amber-emergency/30 text-amber-glow rounded-xl px-4 py-3 transition-colors"
              >
                I want to help with this
              </a>
            </>
          ) : (
            <>
              <MetaRow
                items={[
                  { label: "Potential coverage", value: getSiteCoverage(site) },
                  {
                    label: "Resilience impact",
                    value: `${getSiteResilienceImpact(site)}% (simulated)`,
                  },
                  {
                    label: "Est. users served",
                    value: site.populationServed
                      ? site.populationServed.toLocaleString()
                      : "—",
                  },
                ]}
              />
              {planning && (
                <>
                  <Section title="Potential benefits">
                    <BulletList items={planning.potentialBenefits} />
                  </Section>
                  <Section title="Challenges">
                    <BulletList items={planning.challenges} variant="challenge" />
                  </Section>
                </>
              )}
              {equipment.length > 0 && (
                <Section title="Equipment that could support it">
                  <ul className="space-y-2">
                    {equipment.map((item) => (
                      <li
                        key={item!.id}
                        className="flex items-center justify-between gap-2 text-sm bg-white/5 rounded-lg px-3 py-2"
                      >
                        <span className="text-white">{item!.name}</span>
                        <span className="text-mist/70 text-xs tabular-nums shrink-0">×{item!.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
              {comments.length > 0 && (
                <Section title="Community comments">
                  <div className="space-y-3">
                    {comments.map((c) => (
                      <blockquote key={c!.id} className="text-sm text-mist leading-relaxed border-l-2 border-amber-emergency/50 pl-3">
                        &ldquo;{c!.text}&rdquo;
                        <footer className="text-xs text-mist/60 mt-2">
                          — {c!.name}, {c!.location}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </Section>
              )}
              <MetaRow items={[{ label: "Elevation", value: site.elevation ?? "—" }]} />
            </>
          )}
        </div>
      </div>
    );
  }

  if (selection.kind === "infrastructure") {
    const infra = selection.data;
    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={infra.name}
          subtitle="Existing infrastructure · approximate"
          onClose={onClose}
          badge={infra.type.replace("-", " ")}
          badgeColor="#64748b"
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <Section title="Why it matters">
            <p className="text-sm text-mist leading-relaxed">{infra.description}</p>
          </Section>
          {infra.operator && (
            <MetaRow items={[{ label: "Operator", value: infra.operator }]} />
          )}
        </div>
      </div>
    );
  }

  if (selection.kind === "region") {
    const region = selection.data;
    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={region.name}
          subtitle="Planning region"
          onClose={onClose}
          badge="Coverage zone"
          badgeColor={region.fillColor}
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <Section title="Why it matters">
            <p className="text-sm text-mist leading-relaxed">{region.whyItMatters}</p>
          </Section>
          <p className="text-sm text-mist/70 leading-relaxed">{region.description}</p>
        </div>
      </div>
    );
  }

  if (selection.kind === "concern") {
    const concern = selection.data;
    const category = concernCategoryById[concern.category];
    return (
      <div className="platform-panel h-full flex flex-col overflow-hidden">
        <DrawerHeader
          title={concern.nameOrOrg}
          subtitle={concern.locationLabel}
          onClose={onClose}
          badge={category?.label ?? concern.category}
          badgeColor="#d4a574"
          status={concern.source === "mock" ? "Community voice" : "Your submission"}
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <Section title="Shared perspective">
            <blockquote className="text-sm text-mist leading-relaxed border-l-2 border-sand-warm/60 pl-3">
              &ldquo;{concern.message}&rdquo;
            </blockquote>
          </Section>
          <p className="text-[10px] text-mist/55 leading-relaxed">
            This is part of an open community conversation. We are listening and
            exploring — not presenting final conclusions.
          </p>
        </div>
      </div>
    );
  }

  const marker = selection.data;
  return (
    <div className="platform-panel h-full flex flex-col overflow-hidden">
      <DrawerHeader
        title={marker.nameOrOrg}
        subtitle={marker.locationLabel}
        onClose={onClose}
        badge={supportTypeById[marker.supportType]?.label ?? marker.supportType}
        badgeColor="#c084fc"
        status={marker.source === "mock" ? "Community" : "Your submission"}
      />
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <Section title="Community comment">
          <blockquote className="text-sm text-mist leading-relaxed border-l-2 border-purple-400/50 pl-3">
            &ldquo;{marker.message}&rdquo;
          </blockquote>
        </Section>
      </div>
    </div>
  );
}

function DrawerHeader({
  title,
  subtitle,
  onClose,
  badge,
  badgeColor,
  status,
  showClose = true,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  badge?: string;
  badgeColor?: string;
  status?: string;
  showClose?: boolean;
}) {
  return (
    <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/10">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {badge && (
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: badgeColor ?? "#1a6b7c" }}
              >
                {badge}
              </span>
              {status && (
                <span className="text-[10px] uppercase tracking-wider text-mist/60">{status}</span>
              )}
            </div>
          )}
          <h2 className="heading-display text-lg font-semibold text-white leading-snug">{title}</h2>
          {subtitle && <p className="text-xs text-mist/70 mt-1">{subtitle}</p>}
        </div>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-lg hover:bg-white/10 text-mist flex items-center justify-center transition-colors"
            aria-label="Close drawer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({
  items,
  variant = "default",
}: {
  items: string[];
  variant?: "default" | "challenge";
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-mist leading-relaxed">
          <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${variant === "challenge" ? "bg-amber-emergency/70" : "bg-ridge-light"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MetaRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.label} className="bg-white/5 rounded-lg px-3 py-2">
          <p className="text-[10px] text-mist/60">{item.label}</p>
          <p className="text-xs font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
