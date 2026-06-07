"use client";

import { useState } from "react";
import type { ConcernTopic } from "@/data/concernTopics";

type ConcernTopicCardProps = {
  topic: ConcernTopic;
  defaultOpen?: boolean;
};

export default function ConcernTopicCard({ topic, defaultOpen = false }: ConcernTopicCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="glass-card rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/40 transition-colors"
        aria-expanded={open}
      >
        <h3 className="heading-display text-lg font-semibold text-ocean-deep">
          {topic.title}
        </h3>
        <span
          className={`shrink-0 w-8 h-8 rounded-full bg-ocean-deep/5 flex items-center justify-center text-ocean-mid transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-ocean-mid/10 pt-5">
          <TopicBlock title="What we've heard" items={topic.whatWeveHeard} />
          <TopicBlock title="What we know" items={topic.whatWeKnow} />
          <TopicBlock title="What we're still exploring" items={topic.stillExploring} />

          {topic.communityComments.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-3">
                Community comments
              </h4>
              <div className="space-y-3">
                {topic.communityComments.map((c) => (
                  <blockquote
                    key={c.text}
                    className="text-sm text-ocean-mid leading-relaxed border-l-2 border-sand-warm pl-4"
                  >
                    &ldquo;{c.text}&rdquo;
                    <footer className="text-xs text-ocean-mid/70 mt-2">
                      — {c.name}, {c.location}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function TopicBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-2">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-ocean-mid leading-relaxed">
            <span className="text-ridge-light shrink-0 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
