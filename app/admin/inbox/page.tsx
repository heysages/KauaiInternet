"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

type EmailMsg = {
  id: string;
  direction: string;
  from_email: string;
  to_email: string;
  subject: string | null;
  body_text: string;
  created_at: string;
};

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<EmailMsg[]>([]);

  useEffect(() => {
    fetch("/api/admin/inbox")
      .then((r) => r.json())
      .then((d) => setMessages(d.messages ?? []))
      .catch(() => setMessages([]));
  }, []);

  return (
    <AdminShell title="Email inbox">
      <p className="text-sm text-mist/80 mb-6 max-w-2xl">
        Inbound messages to hello@kauaiinternet.com appear here when email routing is
        configured (see EMAIL_SETUP.md). Outbound replies you send from Interest are logged too.
      </p>
      <div className="platform-panel rounded-2xl divide-y divide-white/10">
        {messages.map((m) => (
          <article key={m.id} className="px-5 py-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                  m.direction === "inbound"
                    ? "bg-ridge-light/20 text-ridge-light"
                    : "bg-amber-emergency/15 text-amber-glow"
                }`}
              >
                {m.direction}
              </span>
              <span className="text-xs text-mist/60">
                {new Date(m.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-white">
              {m.direction === "inbound" ? m.from_email : `To: ${m.to_email}`}
            </p>
            {m.subject && <p className="text-xs text-mist mt-1">{m.subject}</p>}
            <p className="text-sm text-mist mt-2 whitespace-pre-wrap line-clamp-6">
              {m.body_text}
            </p>
          </article>
        ))}
        {messages.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-mist/60">
            No email messages yet. Configure inbound routing to capture mail at the backend.
          </p>
        )}
      </div>
    </AdminShell>
  );
}
