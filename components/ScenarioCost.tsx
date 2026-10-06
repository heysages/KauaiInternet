"use client";

import { useCostScenario } from "@/components/GapFillContext";
import { pilotCapital, pilotOperating, quoteSelection } from "@/data/pilotBudget";
import { formatUsd } from "@/data/resilienceMission";

const pockets = quoteSelection({ view: "after", gap: true, island: false });
const coast = quoteSelection({ view: "after", gap: false, island: true });
const both = quoteSelection({ view: "after", gap: true, island: true });

export function ScenarioCostCards() {
  const quote = useCostScenario();
  const heading = quote.plainName.replace(/\.$/, "");
  const buildDetail =
    quote.island && quote.gap
        ? "The four town sites, eight smaller solar spots, and nine more towns around the coast. Bought new. A walk of the roads can add or drop a spot, and a survey can still add a ridge relay."
        : quote.island
          ? "The four town sites, plus Anahola, Kapaʻa, Wailua, Līhuʻe, Kōloa, Kalaheo, Hanapēpē, Waimea, and Kekaha. Bought new. A survey can still add a ridge relay where two towns cannot see each other."
          : quote.gap
            ? "The four town sites, plus eight smaller solar spots in the gaps. Bought new. A walk of the roads can add or drop a spot."
            : "New equipment, solar and batteries, shipping, and the people to install the four town sites. Bought new. Nothing already on a shelf is subtracted.";
  const yearDetail =
    quote.island
        ? "The North Shore on-call roster, plus a second person so Līhuʻe and the west side are not waiting on that drive. The monthly spectrum fee does not go up."
        : quote.gap
          ? "The same people on call, plus access and a short visit at each pocket if the spot is not donated. The monthly spectrum fee does not go up."
          : "People on call, one week of storm work, and the fees that keep the phone signal legal to turn on. The smaller solar spots and the other coastal towns are not in either number until those switches are on.";

  return (
    <>
      <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
        <article className="rounded-2xl border border-sand-warm p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
            To build
          </p>
          <p className="heading-display text-4xl font-semibold text-ocean-deep mb-3">
            {formatUsd(quote.capital)}
          </p>
          <p className="text-sm text-ocean-mid leading-relaxed">{buildDetail}</p>
        </article>
        <article className="rounded-2xl border border-sand-warm p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
            Each year
          </p>
          <p className="heading-display text-4xl font-semibold text-ocean-deep mb-3">
            {formatUsd(quote.operating)}
          </p>
          <p className="text-sm text-ocean-mid leading-relaxed">{yearDetail}</p>
        </article>
      </div>
      <p className="text-sm text-ocean-mid mt-6 max-w-3xl leading-relaxed">
        {quote.gap && quote.island ? (
          <>
            The four towns alone are {formatUsd(pilotCapital)} to build and {formatUsd(pilotOperating)} a
            year.
          </>
        ) : quote.island ? (
          <>
            The four towns alone are {formatUsd(pilotCapital)} to build and {formatUsd(pilotOperating)} a
            year. Turn on Fill the gaps and this becomes {formatUsd(both.capital)} to build and{" "}
            {formatUsd(both.operating)} a year.
          </>
        ) : quote.gap ? (
          <>
            The four towns alone are {formatUsd(pilotCapital)} to build and {formatUsd(pilotOperating)} a
            year. Turn on Whole island and this becomes {formatUsd(both.capital)} to build and{" "}
            {formatUsd(both.operating)} a year.
          </>
        ) : (
          <>
            Turn on Fill the gaps and this becomes {formatUsd(pockets.capital)} to build and{" "}
            {formatUsd(pockets.operating)} a year. Turn on Whole island and this becomes{" "}
            {formatUsd(coast.capital)} to build and {formatUsd(coast.operating)} a year.
          </>
        )}{" "}
        Switch to Technical for the part-by-part budget. It follows the same switches.
      </p>
    </>
  );
}

export function ScenarioBudgetSummary() {
  const quote = useCostScenario();

  return (
    <>
      <h3 className="font-semibold text-ocean-deep mb-2">Buy-new project budget</h3>
      <p className="text-sm text-ocean-mid mb-2">
        {quote.name} This follows Gap fill and Whole island.
      </p>
      <p className="text-sm text-ocean-deep mb-1">Capital {formatUsd(quote.capital)}</p>
      <p className="text-sm text-ocean-deep mb-3">
        Operating {formatUsd(quote.operating)} per year
      </p>
    </>
  );
}
