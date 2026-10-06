import { ReadingText } from "@/components/ReadingMode";

const regions = [
  {
    id: "island-east",
    eyebrow: "East side",
    title: "Anahola, Kapaʻa, and Wailua",
    body: "This is the longest stretch of homes on the island, along Kūhiō Highway. After the North Shore corridor is working, the same hub goes in each of these towns: a status note, a place to charge a phone, and a radio link to the next town. Kapaʻa is the population center. Puhi and Hanamāʻulu sit on the road into Līhuʻe and are part of that approach, not a separate network.",
  },
  {
    id: "island-lihue",
    eyebrow: "Where services are",
    title: "Līhuʻe",
    body: "County offices, the airport, and the hospital are here. A hub in Līhuʻe is where a cached note about roads, water, and aid can sit next to the place people are trying to reach. It does not operate the hospital, the airport, or county dispatch. It holds a local copy of the status when those networks are down.",
  },
  {
    id: "island-south",
    eyebrow: "South shore",
    title: "Kōloa, Poʻipū, and Kalaheo",
    body: "Kōloa and Poʻipū are one south-shore community for this plan: residents and the people who are there when a storm closes the highway. The hub is for the town, not a network for resorts. Kalaheo is the ridge town on the way west. Lawaʻi is on that road and uses the same link.",
  },
  {
    id: "island-west",
    eyebrow: "West end",
    title: "Hanapēpē, Waimea, and Kekaha",
    body: "These towns are a long way from Līhuʻe when the highway is cut. Hanapēpē and ʻEleʻele share a hub. Waimea and Kekaha each get one, so a message can exist on the west end without crossing the island. Kekaha is the last town on the coastal chain.",
  },
];

export default function IslandLivingSections() {
  return (
    <div className="mt-10 space-y-10">
      <div>
        <h3 className="font-semibold text-ocean-deep mb-2">The same pattern, in every town</h3>
        <p className="text-sm text-ocean-mid max-w-3xl leading-relaxed">
          <ReadingText
            technical="Each place below gets what a North Shore town hub gets: a resilience hub, a link to the next town, a short-range mesh, a phone radio for that town, and 72 hours of solar and battery with a spare pack and a propane generator. Whole island adds these nine towns to the cost on this page. A survey can still add a ridge relay where two towns cannot see each other. That relay is not in the price."
            plain="Each town below gets what the North Shore gets: a community site, a link to the next town, phone service for that town, and power of its own for three days. While Whole island is on, the price on this page includes these towns."
          />
        </p>
      </div>
      {regions.map((region) => (
        <section key={region.id} id={region.id} className="scroll-mt-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
            {region.eyebrow}
          </p>
          <h3 className="font-semibold text-ocean-deep text-xl mb-2">{region.title}</h3>
          <p className="text-sm text-ocean-mid max-w-3xl leading-relaxed">{region.body}</p>
        </section>
      ))}
      <section id="island-not-towns" className="scroll-mt-24 rounded-2xl border border-sand-warm bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
          Left off the map
        </p>
        <h3 className="font-semibold text-ocean-deep text-xl mb-2">
          The mountains are not a town
        </h3>
        <p className="text-sm text-ocean-mid max-w-3xl leading-relaxed">
          Nāpali, the Alakaʻi, and the canyon interior are unshaded on purpose. People do not
          live there in towns. A ridge relay may be added later only if one town cannot see
          the next. That site is chosen by a survey. It is not drawn here, and it is not a
          place the public goes to read a status note.
        </p>
      </section>
    </div>
  );
}
