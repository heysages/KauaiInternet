import { whyStories } from "@/data/whyThisMatters";

export default function WhyThisMattersSection() {
  return (
    <section id="why" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Why This Matters
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Stronger neighborhoods, better preparedness, a brighter future
        </h2>
        <p className="text-ocean-mid text-lg max-w-2xl leading-relaxed mb-12">
          Kauai deserves shared infrastructure that neighbors can count on — for everyday life,
          for emergencies, and for the generations ahead.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyStories.map((story) => (
            <article
              key={story.id}
              className="glass-card rounded-2xl p-6 hover:shadow-lg hover:shadow-ocean-deep/5 transition-shadow"
            >
              <span className="text-3xl mb-4 block" aria-hidden>
                {story.icon}
              </span>
              <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-2">
                {story.title}
              </h3>
              <p className="text-ocean-mid text-sm leading-relaxed">{story.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
