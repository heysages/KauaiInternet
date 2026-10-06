"use client";

import { useCostScenario } from "@/components/GapFillContext";
import {
  budgetAssumptions,
  budgetGroups,
  groupTotal,
  kauaiGetRate,
  lineTotal,
  materialsContingencyRate,
  overheadRate,
  pilotCapital,
  pilotOperating,
  quoteSelection,
} from "@/data/pilotBudget";
import { formatUsd } from "@/data/resilienceMission";

export default function PilotBudgetBreakdown() {
  const quote = useCostScenario();
  const pockets = quoteSelection({ view: "after", gap: true, island: false });
  const coast = quoteSelection({ view: "after", gap: false, island: true });
  const both = quoteSelection({ view: "after", gap: true, island: true });

  return (
    <div>
      <p className="text-sm text-ocean-mid max-w-3xl mb-8 leading-relaxed">
        {budgetAssumptions.noDonatedGear}{" "}
        {quote.gap || quote.island ? (
          <>
            This is {quote.name.replace(/^After: /, "").replace(/\.$/, "")}. The four towns alone are{" "}
            {formatUsd(pilotCapital)} to build and {formatUsd(pilotOperating)} a year.
            {quote.gap
              ? ` The pockets add ${formatUsd(pockets.capital - pilotCapital)} to build and ${formatUsd(pockets.operating - pilotOperating)} a year.`
              : ""}
            {quote.island
              ? ` The other nine towns add ${formatUsd(coast.capital - pilotCapital)} to build and ${formatUsd(coast.operating - pilotOperating)} a year.`
              : ""}{" "}
            {quote.gap
              ? "A walk test can add or drop a pocket before it is ordered."
              : "Turn on Gap fill to add the eight North Shore pockets."}{" "}
            A survey can still add a ridge relay where two later towns cannot see each other. That
            relay is not in this price. The spectrum fee does not change, because the monthly plan
            already includes the first 200 radios and this build stays under that.
          </>
        ) : (
          <>
            {budgetAssumptions.design} Turn on Gap fill to add the eight pockets,{" "}
            {formatUsd(pockets.capital)} to build and {formatUsd(pockets.operating)} a year. Turn on
            Whole island to add the other coastal towns, {formatUsd(coast.capital)} to build and{" "}
            {formatUsd(coast.operating)} a year.
          </>
        )}
      </p>

      <div className="grid lg:grid-cols-2 gap-4 mb-10">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-ocean-deep mb-1">Capital cost to build</p>
          <p className="text-3xl font-semibold text-ocean-deep">{formatUsd(quote.capital)}</p>
          <p className="text-xs text-ocean-mid mt-2">
            New equipment, solar and batteries, generators, freight, labor,{" "}
            {Math.round(overheadRate * 100)}% overhead, Kauaʻi GET, and an{" "}
            {Math.round(materialsContingencyRate * 100)}% materials contingency.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-ocean-deep mb-1">Annual operating cost</p>
          <p className="text-3xl font-semibold text-ocean-deep">{formatUsd(quote.operating)}</p>
          <p className="text-xs text-ocean-mid mt-2">
            Includes an on-call roster, one outage week, quarterly maintenance, admin, insurance,
            Starlink service, generator exercise fuel, a spares reserve, and site access if the
            roofs are not donated.
          </p>
        </div>
      </div>

      <h3 className="font-semibold text-ocean-deep mb-1">Where the build money goes</h3>
      <p className="text-sm text-ocean-mid mb-4">{budgetAssumptions.technology}</p>
      <ul className="space-y-3 mb-10">
        {quote.capitalBreakdown.map((row) => (
          <li key={row.id}>
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <span className="text-sm font-medium text-ocean-deep">{row.label}</span>
              <span className="text-sm tabular-nums text-ocean-deep">{formatUsd(row.amount)}</span>
            </div>
            <div className="h-2 rounded-full bg-sand-warm overflow-hidden">
              <div
                className="h-full rounded-full bg-ocean-mid"
                style={{ width: `${(row.amount / quote.capital) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-8 mb-10">
        {budgetGroups.map((group) => (
          <div key={group.id}>
            <h3 className="font-semibold text-ocean-deep mb-3">
              {group.label}
              <span className="ml-2 text-sm font-normal text-ocean-mid">
                {formatUsd(groupTotal(quote.capitalLines, group.id))}
              </span>
            </h3>
            <ul className="divide-y divide-sand-warm border-y border-sand-warm">
              {quote.capitalLines
                .filter((line) => line.group === group.id)
                .map((line) => (
                  <li key={line.id} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div className="max-w-2xl">
                      <p className="text-sm font-medium text-ocean-deep">
                        {line.label}
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-ridge-mid">
                          {line.basis === "listed" ? "Listed price" : "Allowance"}
                        </span>
                      </p>
                      <p className="text-xs text-ocean-mid mt-1 leading-relaxed">{line.detail}</p>
                      {line.sourceHref && (
                        <a
                          href={line.sourceHref}
                          className="text-xs text-ocean-deep underline underline-offset-2"
                        >
                          {line.sourceLabel}
                        </a>
                      )}
                    </div>
                    <p className="text-sm tabular-nums text-ocean-deep shrink-0">
                      {line.quantity} × {formatUsd(line.unitDollars)}
                      <span className="block text-xs text-ocean-mid sm:text-right">
                        {formatUsd(lineTotal(line))}
                      </span>
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-ocean-deep mb-3">
        Each year
        <span className="ml-2 text-sm font-normal text-ocean-mid">{formatUsd(quote.operating)}</span>
      </h3>
      <ul className="divide-y divide-sand-warm border-y border-sand-warm mb-6">
        {quote.operatingLines.map((line) => (
          <li key={line.id} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-ocean-deep">
                {line.label}
                <span className="ml-2 text-[10px] uppercase tracking-wider text-ridge-mid">
                  {line.basis === "listed" ? "Listed price" : "Allowance"}
                </span>
              </p>
              <p className="text-xs text-ocean-mid mt-1 leading-relaxed">{line.detail}</p>
              {line.sourceHref && (
                <a
                  href={line.sourceHref}
                  className="text-xs text-ocean-deep underline underline-offset-2"
                >
                  {line.sourceLabel}
                </a>
              )}
            </div>
            <p className="text-sm tabular-nums text-ocean-deep shrink-0">{formatUsd(lineTotal(line))}</p>
          </li>
        ))}
        <li className="py-3 flex justify-between gap-4">
          <p className="text-sm font-medium text-ocean-deep">Kauaʻi GET</p>
          <p className="text-sm tabular-nums text-ocean-deep">{formatUsd(quote.operatingGet)}</p>
        </li>
      </ul>

      <p className="text-xs text-ocean-mid max-w-3xl leading-relaxed">
        Prices checked {budgetAssumptions.asOf}. Listed lines are the published price rounded to
        the dollar. Allowances are not vendor quotes. Overhead is {Math.round(overheadRate * 100)}%
        of equipment, power, freight, and labor. Kauaʻi general excise tax is 4.5% charged on the
        tax itself (about {(kauaiGetRate * 100).toFixed(2)}%). The materials contingency is{" "}
        {formatUsd(quote.capitalContingency)}. {budgetAssumptions.labor} The backbone is unlicensed
        5 GHz, so it does not depend on a 6 GHz frequency coordinator.
      </p>
    </div>
  );
}
