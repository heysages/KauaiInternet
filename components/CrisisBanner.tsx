import HashLink from "@/components/HashLink";

export default function CrisisBanner() {
  return (
    <div className="relative z-40 mt-[4.75rem] bg-amber-emergency/15 border-b border-amber-emergency/30 px-5 sm:px-8 py-3">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-ocean-deep">
          <span className="font-semibold">Hurricane Lowell left communities without power for days.</span>{" "}
          Here is what that changed about the plan.
        </p>
        <HashLink
          href="/#lowell"
          className="shrink-0 text-sm font-semibold text-ocean-deep hover:text-ocean-mid underline underline-offset-2"
        >
          See the lessons →
        </HashLink>
      </div>
    </div>
  );
}
