import { supportComments } from "@/data/supportComments";
import SupportForm from "@/components/SupportForm";

export default function SupportCTA() {
  return (
    <section id="support" className="section-padding bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
              Get Involved
            </p>
            <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
              Support the vision
            </h2>
            <p className="text-ocean-mid text-lg leading-relaxed mb-8">
              Whether you can host a site, volunteer your time, represent an organization,
              or simply want to stay informed — your voice belongs in this movement.
            </p>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ocean-mid">
                Voices from the community
              </p>
              {supportComments.map((c) => (
                <blockquote key={c.id} className="glass-card rounded-xl p-5 border-l-2 border-ridge-light">
                  <p className="text-ocean-mid text-sm leading-relaxed mb-3">
                    &ldquo;{c.text}&rdquo;
                  </p>
                  <footer className="text-xs text-ocean-mid">
                    <span className="font-semibold text-ocean-deep">{c.name}</span>
                    {" · "}
                    {c.location}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-ocean-deep/5">
              <div className="mb-8">
                <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-2">
                  Offer your support
                </h3>
                <p className="text-ocean-mid text-sm leading-relaxed">
                  Tell us who you are and how you can help. Submissions are stored
                  locally for now and will sync when a backend is connected.
                </p>
              </div>
              <SupportForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
