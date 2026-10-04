import ArchitectureDiagram from "@/components/explainers/ArchitectureDiagram";
import OutageTimeline from "@/components/explainers/OutageTimeline";
import PowerPathDiagram from "@/components/explainers/PowerPathDiagram";
import RolloutDiagram from "@/components/explainers/RolloutDiagram";
import WhatStaysDiagram from "@/components/explainers/WhatStaysDiagram";
import PilotBudgetBreakdown from "@/components/PilotBudgetBreakdown";
import ProposedCoverageMap from "@/components/ProposedCoverageMap";
import {
  designPrinciple,
  failureColumns,
  failureRows,
  kauaiInternet72,
  lowellLessons,
  pilotCorridor,
  rolloutStages,
  type FailureState,
} from "@/data/resilienceMission";

const cellClass: Record<FailureState, string> = {
  up: "bg-emerald-50 text-emerald-900",
  limited: "bg-amber-50 text-amber-950",
  down: "bg-sand-light text-ocean-mid",
};

export default function ResilienceMissionSection() {
  return (
    <>
      <section id="problem" className="section-padding bg-sand-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            1 · The problem
          </p>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
                When the grid and the internet fail together, Kauaʻi goes quiet
              </h2>
              <p className="text-lg text-ocean-mid leading-relaxed mb-4">
                {designPrinciple}
              </p>
              <p className="text-ocean-mid leading-relaxed">
                Phones, fiber, and many radios plug into the same utility power. Hurricane Lowell
                showed what that means: days without electricity, and communities that still needed
                to know which roads were open, where water and food were, and how to reach a neighbor.
                KauaiInternet is the local layer that keeps that message moving.
              </p>
            </div>
            <figure>
              <img
                src="/images/kauai-satellite.jpg"
                alt="Satellite view of Kauaʻi, with the mountainous interior and the coastal towns around the edge"
                className="w-full rounded-2xl object-cover max-h-[420px]"
              />
              <figcaption className="text-xs text-ocean-mid mt-2">
                The first plan is the North Shore corridor, not a signal over the whole island.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="lowell" className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            2 · What Hurricane Lowell taught us
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            Prolonged outages, and nowhere reliable to hear the news
          </h2>
          <p className="text-ocean-mid max-w-3xl mb-8 leading-relaxed">
            Lowell hit Kauaʻi in early September 2026. These points are from public county,
            utility, and news reports. KauaiInternet does not operate 911, county radio, or
            the broadcast stations named here.
          </p>
          <OutageTimeline />
          <div className="grid lg:grid-cols-3 gap-4">
            {lowellLessons.map((lesson) => (
              <article key={lesson.id} className="glass-card rounded-2xl p-5 flex flex-col">
                <h3 className="font-semibold text-ocean-deep mb-3">{lesson.title}</h3>
                <p className="text-sm text-ocean-mid leading-relaxed mb-4">{lesson.summary}</p>
                <ul className="mt-auto space-y-1">
                  {lesson.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ocean-mid underline underline-offset-2 hover:text-ocean-deep"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-are-building" className="section-padding bg-sand-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            3 · What we are building
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            A North Shore corridor that stays up without the grid
          </h2>
          <p className="text-ocean-mid max-w-3xl mb-8 leading-relaxed">
            The first build is an operating resilience corridor for {pilotCorridor.join(", ")}.
            It is a place where a short message and a status note still work, not a radio
            range test.
          </p>

          <div id="coverage" className="mb-12 scroll-mt-24">
            <h3 className="font-semibold text-ocean-deep mb-1">Where the plan would serve</h3>
            <p className="text-sm text-ocean-mid mb-4 max-w-3xl">
              Four communities on the North Shore. Each shaded area is the town a hub is
              meant to serve. The gold line is the link between hubs.
            </p>
            <ProposedCoverageMap />
          </div>

          <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="heading-display text-5xl font-semibold text-ocean-deep leading-none">
              {kauaiInternet72.hours}
            </p>
            <div>
              <p className="font-semibold text-ocean-deep">{kauaiInternet72.name}</p>
              <p className="text-sm text-ocean-mid mt-1 max-w-xl">{kauaiInternet72.rule}</p>
              <p className="text-xs text-ocean-mid mt-2 max-w-xl">
                Lowell lasted longer than 72 hours in Hāʻena, Wainiha, and Kōkeʻe. This standard
                is the minimum for every critical node, so the first three days are covered
                while utility crews are still getting in.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-ocean-deep mb-1">Power at each hub</h3>
          <p className="text-sm text-ocean-mid mb-4">
            Solar and batteries carry the 72 hours. The generator and the spare pack are there
            when that is not enough.
          </p>
          <div className="mb-12">
            <PowerPathDiagram />
          </div>

          <h3 className="font-semibold text-ocean-deep mb-1">Three parts, in this order</h3>
          <p className="text-sm text-ocean-mid mb-4">
            Resilience hubs, then the link between them, then a short-range mesh.
          </p>
          <div className="mb-12">
            <ArchitectureDiagram />
          </div>

          <h3 className="font-semibold text-ocean-deep mb-1">How the build grows</h3>
          <p className="text-sm text-ocean-mid mb-4">
            North Shore first. East side next. The rest of the island after that.
          </p>
          <div className="mb-8">
            <RolloutDiagram />
          </div>
          <ol className="grid lg:grid-cols-3 gap-3">
            {rolloutStages.map((stage, index) => (
              <li key={stage.id} className="rounded-2xl border border-sand-warm bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
                  Stage {index + 1}
                </p>
                <p className="font-semibold text-ocean-deep mb-2">{stage.title}</p>
                <p className="text-sm text-ocean-mid leading-relaxed">{stage.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="when-everything-is-down" className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            4 · When everything goes down
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            What still works in each kind of failure
          </h2>
          <p className="text-ocean-mid max-w-3xl mb-6 leading-relaxed">
            This is the planned behavior of the design. It is not a claim that nodes are on
            the air today. “All of these” means the grid, fiber, cellular, and satellite are
            unavailable at the same time.
          </p>
          <WhatStaysDiagram />
          <div className="overflow-x-auto rounded-2xl border border-sand-warm">
            <table className="w-full min-w-[760px] text-sm text-left">
              <thead className="bg-sand-light text-ocean-deep">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  {failureColumns.map((column) => (
                    <th key={column.id} className="px-4 py-3 font-semibold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {failureRows.map((row) => (
                  <tr key={row.service} className="border-t border-sand-warm">
                    <th className="px-4 py-3 font-medium text-ocean-deep align-top bg-white">
                      {row.service}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={failureColumns[index].id}
                        className={`px-4 py-3 align-top ${cellClass[cell.state]}`}
                      >
                        {cell.label}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ocean-mid mt-3">
            Mesh, hub status, and hub-to-hub links stay up only where the node meets{" "}
            {kauaiInternet72.name}. Off-island internet is a bonus path, not the service.
          </p>
        </div>
      </section>

      <section id="cost" className="section-padding bg-sand-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            5 · What it costs to start
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            What it costs if we buy everything new
          </h2>
          <PilotBudgetBreakdown />
        </div>
      </section>
    </>
  );
}
