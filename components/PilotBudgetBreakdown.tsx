import {
  budgetAssumptions,
  budgetGroups,
  budgetLines,
  capitalBreakdown,
  capitalContingency,
  groupTotal,
  kauaiGetRate,
  lineTotal,
  materialsContingencyRate,
  operatingGet,
  operatingLines,
  overheadRate,
  pilotCapital,
  pilotOperating,
} from "@/data/pilotBudget";
import { formatUsd } from "@/data/resilienceMission";

export default function PilotBudgetBreakdown() {
  return (
    <div>
      <p className="text-sm text-ocean-mid max-w-3xl mb-8 leading-relaxed">
        {budgetAssumptions.noDonatedGear} {budgetAssumptions.design}
      </p>

      <div className="grid lg:grid-cols-2 gap-4 mb-10">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-ocean-deep mb-1">Capital cost to build</p>
          <p className="text-3xl font-semibold text-ocean-deep">{formatUsd(pilotCapital)}</p>
          <p className="text-xs text-ocean-mid mt-2">
            New equipment, solar and batteries, generators, freight, labor,{" "}
            {Math.round(overheadRate * 100)}% overhead, Kauaʻi GET, and an{" "}
            {Math.round(materialsContingencyRate * 100)}% materials contingency.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm font-semibold text-ocean-deep mb-1">Annual operating cost</p>
          <p className="text-3xl font-semibold text-ocean-deep">{formatUsd(pilotOperating)}</p>
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
        {capitalBreakdown.map((row) => (
          <li key={row.id}>
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <span className="text-sm font-medium text-ocean-deep">{row.label}</span>
              <span className="text-sm tabular-nums text-ocean-deep">{formatUsd(row.amount)}</span>
            </div>
            <div className="h-2 rounded-full bg-sand-warm overflow-hidden">
              <div
                className="h-full rounded-full bg-ocean-mid"
                style={{ width: `${(row.amount / pilotCapital) * 100}%` }}
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
                {formatUsd(groupTotal(budgetLines, group.id))}
              </span>
            </h3>
            <ul className="divide-y divide-sand-warm border-y border-sand-warm">
              {budgetLines
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
        <span className="ml-2 text-sm font-normal text-ocean-mid">{formatUsd(pilotOperating)}</span>
      </h3>
      <ul className="divide-y divide-sand-warm border-y border-sand-warm mb-6">
        {operatingLines.map((line) => (
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
          <p className="text-sm tabular-nums text-ocean-deep">{formatUsd(operatingGet)}</p>
        </li>
      </ul>

      <p className="text-xs text-ocean-mid max-w-3xl leading-relaxed">
        Prices checked {budgetAssumptions.asOf}. Listed lines are the published price rounded to
        the dollar. Allowances are not vendor quotes. Overhead is {Math.round(overheadRate * 100)}%
        of equipment, power, freight, and labor. Kauaʻi general excise tax is 4.5% charged on the
        tax itself (about {(kauaiGetRate * 100).toFixed(2)}%). The materials contingency is{" "}
        {formatUsd(capitalContingency)}. {budgetAssumptions.labor} The backbone is unlicensed
        5 GHz, so it does not depend on a 6 GHz frequency coordinator.
      </p>
    </div>
  );
}
