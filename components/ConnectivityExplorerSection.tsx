"use client";

import { useState } from "react";
import Link from "next/link";
import MapDataLegend from "@/components/MapDataLegend";
import ResidentKnowledgeForm from "@/components/ResidentKnowledgeForm";
import { islandAssetCategoryLabels } from "@/data/islandAssets";
import { islandAssets } from "@/data/islandAssets";
import { connectivityServiceLabels } from "@/data/connectivityProviders";
import { regionConnectivityProfiles } from "@/data/regionConnectivity";
import { mapRegions } from "@/data/mapRegions";

type ConnectivityExplorerSectionProps = {
  onObservationAdded?: () => void;
};

export default function ConnectivityExplorerSection({
  onObservationAdded,
}: ConnectivityExplorerSectionProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>("central");
  const [formKey, setFormKey] = useState(0);

  const profile = regionConnectivityProfiles.find((p) => p.regionId === selectedRegionId);
  const region = mapRegions.find((r) => r.id === selectedRegionId);

  return (
    <section id="connectivity" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Connectivity Explorer
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Explore connectivity on Kauai
        </h2>
        <p className="text-ocean-mid text-lg max-w-3xl leading-relaxed mb-10">
          Click a region to see known service types, community observations, gaps where we
          need more data, and resilience considerations. We never present speculation as fact.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            <MapDataLegend variant="light" />
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-ocean-deep mb-3">Island regions</h3>
              <ul className="space-y-2">
                {mapRegions.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedRegionId(r.id)}
                      className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-colors border ${
                        selectedRegionId === r.id
                          ? "bg-ridge-light/15 border-ridge-mid/30 text-ocean-deep"
                          : "border-transparent bg-white/50 hover:bg-white text-ocean-mid"
                      }`}
                    >
                      <span className="font-medium">{r.name}</span>
                      <p className="text-xs text-ocean-mid/70 mt-0.5 line-clamp-2">
                        {r.description}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                href="#map"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-ridge-mid hover:text-ridge-dark"
              >
                Open full map
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {profile && region ? (
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-1">
                    Region profile
                  </p>
                  <h3 className="heading-display text-2xl font-semibold text-ocean-deep">
                    {region.name}
                  </h3>
                  <p className="text-sm text-ocean-mid mt-2 leading-relaxed">{region.description}</p>
                </div>

                <ExplorerBlock title="Known service types (general)">
                  <div className="flex flex-wrap gap-2">
                    {profile.knownServiceTypes.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-ocean-mid/10 text-ocean-deep border border-ocean-mid/15"
                      >
                        {connectivityServiceLabels[t]}
                      </span>
                    ))}
                  </div>
                </ExplorerBlock>

                <ExplorerBlock title="Provider notes">
                  <BulletList items={profile.providerNotes} />
                </ExplorerBlock>

                <ExplorerBlock title="Community observations">
                  <BulletList items={profile.communityObservations} />
                </ExplorerBlock>

                <ExplorerBlock title="Data needed — help us fill gaps">
                  <ul className="space-y-2">
                    {profile.dataNeeded.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-ocean-mid bg-amber-emergency/8 border border-amber-emergency/20 rounded-lg px-3 py-2"
                      >
                        <span className="text-amber-emergency shrink-0 font-semibold text-xs">
                          Data Needed
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </ExplorerBlock>

                <ExplorerBlock title="Resilience considerations">
                  <BulletList items={profile.resilienceConsiderations} />
                </ExplorerBlock>

                <ExplorerBlock title="Questions & opportunities">
                  <BulletList items={profile.opportunityQuestions} />
                </ExplorerBlock>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8 text-center text-ocean-mid">
                Select a region to explore connectivity knowledge.
              </div>
            )}

            <div className="glass-card rounded-2xl p-6">
              <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-3">
                Verified island assets (sample)
              </h3>
              <p className="text-xs text-ocean-mid mb-4">
                Public facilities we can name without inventing infrastructure locations.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {islandAssets.slice(0, 8).map((asset) => (
                  <li key={asset.id} className="text-ocean-mid flex gap-2">
                    <span className="text-ocean-mid font-medium shrink-0">
                      {islandAssetCategoryLabels[asset.category]}:
                    </span>
                    {asset.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-3">
                Contribute local knowledge
              </h3>
              <ResidentKnowledgeForm
                key={formKey}
                onSubmit={() => {
                  setFormKey((k) => k + 1);
                  onObservationAdded?.();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExplorerBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-ocean-mid leading-relaxed">
          <span className="text-ridge-light shrink-0">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
