const marks = [
  {
    when: "Sept 14",
    title: "Peak outage",
    text: "About 33,000 customers out. Roughly 6,900 still out that morning.",
  },
  {
    when: "Sept 21",
    title: "Fourteen days later",
    text: "KIUC reported restoration at 98 percent.",
  },
  {
    when: "Sept 22",
    title: "North Shore still dark",
    text: "About 500 members in Wainiha and Hāʻena were still without power.",
  },
];

export default function OutageTimeline() {
  return (
    <ol className="grid lg:grid-cols-3 gap-3 mb-8">
      {marks.map((mark, index) => (
        <li key={mark.when} className="relative rounded-2xl bg-sand-light p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean-deep text-xs font-semibold text-white">
              {index + 1}
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid">{mark.when}</p>
          </div>
          <p className="font-semibold text-ocean-deep mb-1">{mark.title}</p>
          <p className="text-sm text-ocean-mid leading-relaxed">{mark.text}</p>
        </li>
      ))}
    </ol>
  );
}
