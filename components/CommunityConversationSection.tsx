"use client";

import { useState } from "react";
import Link from "next/link";
import ConcernTopicCard from "@/components/ConcernTopicCard";
import ConcernMarkerForm from "@/components/ConcernMarkerForm";
import { concernTopics } from "@/data/concernTopics";

type CommunityConversationSectionProps = {
  onConcernAdded?: () => void;
};

export default function CommunityConversationSection({
  onConcernAdded,
}: CommunityConversationSectionProps) {
  const [formKey, setFormKey] = useState(0);

  const handleSubmitted = () => {
    setFormKey((k) => k + 1);
    onConcernAdded?.();
  };

  return (
    <section id="conversation" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Community Conversation
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          A place for every perspective
        </h2>
        <p className="text-lg text-ocean-mid font-medium mb-6">
          A place to share questions, ideas, concerns, and opportunities related to
          Kauai&apos;s future resilience.
        </p>

        <div className="prose-spacing text-ocean-mid leading-relaxed space-y-4 mb-12 max-w-3xl">
          <p>
            Kauai residents hold many different perspectives regarding technology, health,
            privacy, environmental stewardship, emergency preparedness, and development.
          </p>
          <p>
            This project is intended to support a transparent community conversation.
            Questions and concerns are welcome. Ideas and participation are welcome.
          </p>
          <p>
            Our goal is to learn together and explore solutions that strengthen the island
            while respecting the values of the community.
          </p>
        </div>

        <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-sand-light/80 border border-ocean-mid/10">
          <p className="text-sm text-ocean-deep leading-relaxed">
            <strong className="font-semibold">This is not a debate section.</strong> It is a
            listening and transparency space. We are exploring — not announcing finished
            plans. No conclusions are predetermined.
          </p>
        </div>

        <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-4">
          Topics we are listening to
        </h3>
        <div className="space-y-3 mb-14">
          {concernTopics.map((topic, i) => (
            <ConcernTopicCard key={topic.id} topic={topic} defaultOpen={i === 0} />
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-3">
              Share on the map
            </h3>
            <p className="text-sm text-ocean-mid leading-relaxed mb-4">
              Add a question or concern tied to a neighborhood. Your marker appears on the
              Community Questions &amp; Concerns map layer — alongside other voices from
              across the island.
            </p>
            <Link
              href="#map"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ridge-mid hover:text-ridge-dark transition-colors"
            >
              View on community map
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="lg:col-span-3">
            <ConcernMarkerForm key={formKey} onSubmit={handleSubmitted} />
          </div>
        </div>
      </div>
    </section>
  );
}
