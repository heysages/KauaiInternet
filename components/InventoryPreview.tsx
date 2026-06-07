import {
  getInventoryByCategory,
  getInventoryStats,
} from "@/data/inventory";
import type { CategoryMeta } from "@/data/categories";
import { gearCapabilities } from "@/data/gearCapabilities";

const categoryIcons: Record<CategoryMeta["icon"], React.ReactNode> = {
  routing: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  backhaul: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  radio: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M2.34 8.76c5.74-5.74 15.04-5.74 20.78 0" />
    </svg>
  ),
  antenna: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  power: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  compute: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008H12v-.008z" />
    </svg>
  ),
  satellite: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  battery: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-7.5z" />
    </svg>
  ),
};

export default function InventoryPreview() {
  const stats = getInventoryStats();
  const groups = getInventoryByCategory();

  return (
    <section id="inventory" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
              Starter Inventory
            </p>
            <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
              Gear on hand to accelerate a pilot
            </h2>
            <p className="text-ocean-mid text-lg leading-relaxed">
              This is a real starter inventory — not a claim of island-wide readiness.
              It can jump-start a pilot corridor with switching, backhaul, radios, power,
              and edge compute, but sites, power design, licensing, and operations still
              need to be built out.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="glass-card rounded-xl px-5 py-4 text-center min-w-[88px]">
              <p className="text-2xl font-bold text-ocean-deep">{stats.totalUnits}</p>
              <p className="text-xs text-ocean-mid mt-1">Total units</p>
            </div>
            <div className="glass-card rounded-xl px-5 py-4 text-center min-w-[88px]">
              <p className="text-2xl font-bold text-ridge-mid">{stats.uniqueSkus}</p>
              <p className="text-xs text-ocean-mid mt-1">Unique SKUs</p>
            </div>
            <div className="glass-card rounded-xl px-5 py-4 text-center min-w-[88px]">
              <p className="text-2xl font-bold text-amber-emergency">{stats.categoriesRepresented}</p>
              <p className="text-xs text-ocean-mid mt-1">Categories</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-4">
            What the gear enables
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {gearCapabilities.map((cap) => (
              <div
                key={cap.id}
                className="glass-card rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="heading-display text-base font-semibold text-ocean-deep mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-ocean-mid leading-relaxed mb-3">
                  {cap.description}
                </p>
                <p className="text-[10px] text-ridge-mid font-medium">
                  {cap.enabledBy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 p-5 rounded-2xl border border-ocean-deep/10 bg-white/50">
          <p className="text-sm text-ocean-mid leading-relaxed">
            <span className="font-semibold text-ocean-deep">Pilot framing:</span>{" "}
            Inventory is grouped below by network role. Each category explains how the
            gear could support a resilience pilot — not a finished island network.
            Additional sites, funding, fiber paths, and operational capacity are still
            required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group.category}
              className="glass-card rounded-2xl p-6 lg:p-7 hover:shadow-lg hover:shadow-ocean-deep/5 transition-shadow"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-ocean-deep/8 text-ocean-mid flex items-center justify-center shrink-0">
                  {categoryIcons[group.meta.icon]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="heading-display text-xl font-semibold text-ocean-deep">
                      {group.meta.label}
                    </h3>
                    <span className="text-xs font-semibold bg-ridge-light/15 text-ridge-dark px-2 py-0.5 rounded-full">
                      {group.totalUnits} units · {group.items.length} SKUs
                    </span>
                  </div>
                  <p className="text-sm text-ocean-mid leading-relaxed">
                    {group.meta.description}
                  </p>
                </div>
              </div>

              <div className="mb-5 p-4 rounded-xl bg-amber-emergency/8 border border-amber-emergency/20">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-emergency mb-1.5">
                  Possible pilot role
                </p>
                <p className="text-sm text-ocean-deep leading-relaxed">
                  {group.meta.pilotSummary}
                </p>
              </div>

              {group.useCases.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-2">
                    Use cases on Kauai
                  </p>
                  <ul className="space-y-2">
                    {group.useCases.map((uc) => (
                      <li key={uc.id} className="text-sm text-ocean-mid">
                        <span className="font-medium text-ocean-deep">{uc.title}</span>
                        <span className="text-ocean-mid"> — {uc.pilotRole}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ocean-mid mb-3">
                  Items in stock
                </p>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-ocean-deep/4 hover:bg-ocean-deep/6 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ocean-deep truncate">
                          {item.name}
                        </p>
                        {item.manufacturer && (
                          <p className="text-[11px] text-ocean-mid">{item.manufacturer}</p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-ocean-deep shrink-0 tabular-nums">
                        ×{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
