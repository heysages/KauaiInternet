"use client";

import { useState } from "react";

type Role = "neighbor" | "operator";
type NeighborScreen = "now" | "messages" | "reach";
type OperatorScreen = "corridor" | "load" | "power";

type ChatMessage = {
  id: string;
  from: "hub" | "you" | "neighbor";
  text: string;
  meta: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: "m1",
    from: "hub",
    text: "Hanalei hub: water filling until 6. Kūhiō Highway is open to Princeville. The bridge has a weight limit.",
    meta: "From the hub · delivered",
  },
  {
    id: "m2",
    from: "neighbor",
    text: "We're at the pavilion. An elder needs a ride to Princeville if the road stays open.",
    meta: "Malia · 2 hops · delivered",
  },
];

const reach = [
  { name: "Hanalei hub", detail: "Your radio hears it directly", quality: "Good" },
  { name: "Princeville", detail: "One hop along the backbone", quality: "Good" },
  { name: "Hāʻena", detail: "Two hops, valley in the way", quality: "Weak" },
  { name: "Kīlauea", detail: "Not from this radio right now", quality: "None" },
];

const corridor = [
  { name: "Hāʻena", link: "Fair", battery: "78%", queue: "2" },
  { name: "Hanalei", link: "Good", battery: "64%", queue: "12" },
  { name: "Princeville", link: "Good", battery: "81%", queue: "4" },
  { name: "Ridge relay", link: "Fair", battery: "70%", queue: "0" },
  { name: "Kīlauea", link: "Weak in rain", battery: "76%", queue: "6" },
];

const screenCopy: Record<string, { title: string; body: string }> = {
  now: {
    title: "The status note",
    body: "This is the cached note at the nearest hub: roads, water, and aid. It stays on the hub even when the phone has no cellular service. The phone is reading it through a paired WisMesh radio, or over the hub’s Wi-Fi if you are standing there.",
  },
  messages: {
    title: "Short messages",
    body: "LoRa carries a short text, not photos or a group video call. The compose box stops at 200 characters. A message sits on your radio until the next hop takes it, then moves hub to hub. It is not an iMessage replacement.",
  },
  reach: {
    title: "Who you can reach",
    body: "The mesh is local. From Hanalei this radio can hear the hub and reach Princeville. Hāʻena is weak. Kīlauea is not available from here. The app says that plainly instead of pretending the whole island is one chat room.",
  },
  corridor: {
    title: "Link quality",
    body: "The two people on call use this view. Each site shows whether the hop is usable, how full the battery is, and how many messages are waiting. Weak in rain is a reason to keep the 5 GHz link, not to promise a perfect signal.",
  },
  load: {
    title: "What to shed",
    body: "The radios and the status note stay. Starlink and the community charging outlet are the loads you turn down when the battery needs the reserve. Shedding them is a button in the app because someone on the North Shore has to be able to do it without a laptop.",
  },
  power: {
    title: "The power plant at the hub",
    body: "Four packs online, one spare on the shelf, solar coming in, generator off until it is needed. The on-call person marks a weak pack for a swap. The other three stay up while they unbolt it.",
  },
};

export default function KauaiAppMock() {
  const [role, setRole] = useState<Role>("neighbor");
  const [neighborScreen, setNeighborScreen] = useState<NeighborScreen>("now");
  const [operatorScreen, setOperatorScreen] = useState<OperatorScreen>("corridor");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [starlinkOn, setStarlinkOn] = useState(true);
  const [outletOpen, setOutletOpen] = useState(true);
  const [swapNoted, setSwapNoted] = useState(false);

  const screen = role === "neighbor" ? neighborScreen : operatorScreen;
  const copy = screenCopy[screen];

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      {
        id: `local-${current.length}`,
        from: "you",
        text,
        meta: "Queued on your radio · waiting for Hanalei hub",
      },
    ]);
    setDraft("");
  }

  return (
    <div className="grid lg:grid-cols-[390px_1fr] gap-8 items-start">
      <div className="mx-auto w-full max-w-[390px]">
        <div className="rounded-[2rem] border border-white/15 bg-ocean-deep text-white shadow-none overflow-hidden">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between text-[11px] text-mist">
            <span>Hanalei · no cellular</span>
            <span>Radio paired</span>
          </div>
          <div className="px-4 pb-3 flex gap-2">
            <RoleButton active={role === "neighbor"} onClick={() => setRole("neighbor")}>
              Neighbor
            </RoleButton>
            <RoleButton active={role === "operator"} onClick={() => setRole("operator")}>
              On call
            </RoleButton>
          </div>
          <div className="px-4 min-h-[460px]">
            {role === "neighbor" && neighborScreen === "now" && <NowScreen />}
            {role === "neighbor" && neighborScreen === "messages" && (
              <MessagesScreen
                messages={messages}
                draft={draft}
                onDraft={setDraft}
                onSend={sendMessage}
              />
            )}
            {role === "neighbor" && neighborScreen === "reach" && <ReachScreen />}
            {role === "operator" && operatorScreen === "corridor" && <CorridorScreen />}
            {role === "operator" && operatorScreen === "load" && (
              <LoadScreen
                starlinkOn={starlinkOn}
                outletOpen={outletOpen}
                onStarlink={() => setStarlinkOn((value) => !value)}
                onOutlet={() => setOutletOpen((value) => !value)}
              />
            )}
            {role === "operator" && operatorScreen === "power" && (
              <PowerScreen swapNoted={swapNoted} onSwap={() => setSwapNoted(true)} />
            )}
          </div>
          <nav className="grid grid-cols-3 border-t border-white/10">
            {role === "neighbor" ? (
              <>
                <TabButton active={neighborScreen === "now"} onClick={() => setNeighborScreen("now")}>
                  Now
                </TabButton>
                <TabButton
                  active={neighborScreen === "messages"}
                  onClick={() => setNeighborScreen("messages")}
                >
                  Messages
                </TabButton>
                <TabButton
                  active={neighborScreen === "reach"}
                  onClick={() => setNeighborScreen("reach")}
                >
                  Reach
                </TabButton>
              </>
            ) : (
              <>
                <TabButton
                  active={operatorScreen === "corridor"}
                  onClick={() => setOperatorScreen("corridor")}
                >
                  Links
                </TabButton>
                <TabButton active={operatorScreen === "load"} onClick={() => setOperatorScreen("load")}>
                  Load
                </TabButton>
                <TabButton
                  active={operatorScreen === "power"}
                  onClick={() => setOperatorScreen("power")}
                >
                  Power
                </TabButton>
              </>
            )}
          </nav>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
          {role === "neighbor" ? "What a neighbor sees" : "What the on-call person sees"}
        </p>
        <h2 className="heading-display text-3xl font-semibold text-ocean-deep mb-3">{copy.title}</h2>
        <p className="text-ocean-mid leading-relaxed max-w-xl">{copy.body}</p>
      </div>
    </div>
  );
}

function NowScreen() {
  return (
    <div className="space-y-3 pb-4">
      <p className="text-xs uppercase tracking-widest text-sand-warm">Hanalei hub</p>
      <h2 className="text-2xl font-semibold leading-tight">Roads, water, and aid</h2>
      <p className="text-sm text-mist leading-relaxed">
        Kūhiō Highway is open to Princeville. The Hanalei bridge has a weight limit. Water
        filling at this hub until 6. Aid is at the school gym.
      </p>
      <div className="rounded-2xl bg-white/10 p-3 text-sm">
        <p className="text-sand-warm text-xs mb-1">Path</p>
        <p>WisMesh radio over Bluetooth. Two hops to Princeville. Fair.</p>
      </div>
      <div className="rounded-2xl bg-white/10 p-3 text-sm">
        <p className="text-sand-warm text-xs mb-1">Charging outlet</p>
        <p>Phones only. The outlet turns off if the battery reserve is needed.</p>
      </div>
    </div>
  );
}

function MessagesScreen({
  messages,
  draft,
  onDraft,
  onSend,
}: {
  messages: ChatMessage[];
  draft: string;
  onDraft: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="flex flex-col min-h-[460px] pb-3">
      <p className="text-xs uppercase tracking-widest text-sand-warm mb-3">Hanalei mesh</p>
      <ul className="space-y-2 flex-1">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`rounded-2xl p-3 text-sm ${
              message.from === "you" ? "bg-brand-teal/30 ml-6" : "bg-white/10 mr-6"
            }`}
          >
            <p className="leading-relaxed">{message.text}</p>
            <p className="text-[11px] text-mist mt-2">{message.meta}</p>
          </li>
        ))}
      </ul>
      <label className="mt-3 block">
        <span className="sr-only">Message</span>
        <textarea
          value={draft}
          maxLength={200}
          onChange={(event) => onDraft(event.target.value)}
          placeholder="Short text. No photos."
          rows={2}
          className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder:text-mist/70 resize-none"
        />
      </label>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-mist">{draft.length}/200</span>
        <button
          type="button"
          onClick={onSend}
          className="rounded-full bg-white text-ocean-deep px-3 py-1.5 text-sm font-semibold"
        >
          Queue
        </button>
      </div>
    </div>
  );
}

function ReachScreen() {
  return (
    <div className="pb-4">
      <p className="text-xs uppercase tracking-widest text-sand-warm mb-3">From your radio</p>
      <ul className="space-y-2">
        {reach.map((place) => (
          <li key={place.name} className="rounded-2xl bg-white/10 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{place.name}</p>
              <p className="text-xs text-sand-warm">{place.quality}</p>
            </div>
            <p className="text-xs text-mist mt-1">{place.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CorridorScreen() {
  return (
    <div className="pb-4">
      <p className="text-xs uppercase tracking-widest text-sand-warm mb-3">North Shore corridor</p>
      <ul className="space-y-2">
        {corridor.map((site) => (
          <li key={site.name} className="rounded-2xl bg-white/10 p-3 text-sm">
            <div className="flex justify-between gap-3">
              <p className="font-medium">{site.name}</p>
              <p className="text-sand-warm text-xs">{site.link}</p>
            </div>
            <p className="text-xs text-mist mt-1">
              Battery {site.battery} · {site.queue} messages waiting
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoadScreen({
  starlinkOn,
  outletOpen,
  onStarlink,
  onOutlet,
}: {
  starlinkOn: boolean;
  outletOpen: boolean;
  onStarlink: () => void;
  onOutlet: () => void;
}) {
  return (
    <div className="space-y-3 pb-4">
      <p className="text-xs uppercase tracking-widest text-sand-warm">Hanalei load</p>
      <p className="text-sm text-mist">12 messages waiting. Oldest is 4 minutes. Radios stay on.</p>
      <LoadRow
        title="Starlink Mini"
        detail={starlinkOn ? "On · about 32 watts" : "Shed · battery keeps the reserve"}
        action={starlinkOn ? "Shed Starlink" : "Turn Starlink on"}
        onClick={onStarlink}
      />
      <LoadRow
        title="Community outlet"
        detail={outletOpen ? "Phones only · about 180 watts" : "Off · charging paused"}
        action={outletOpen ? "Turn outlet off" : "Turn outlet on"}
        onClick={onOutlet}
      />
    </div>
  );
}

function LoadRow({
  title,
  detail,
  action,
  onClick,
}: {
  title: string;
  detail: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-mist mt-1 mb-3">{detail}</p>
      <button
        type="button"
        onClick={onClick}
        className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold"
      >
        {action}
      </button>
    </div>
  );
}

function PowerScreen({ swapNoted, onSwap }: { swapNoted: boolean; onSwap: () => void }) {
  return (
    <div className="space-y-3 pb-4">
      <p className="text-xs uppercase tracking-widest text-sand-warm">Hanalei power</p>
      <div className="rounded-2xl bg-white/10 p-3 text-sm">
        <p>Four packs online. About 71% usable.</p>
        <p className="text-xs text-mist mt-1">Spare pack is charged and on the shelf.</p>
      </div>
      <div className="rounded-2xl bg-white/10 p-3 text-sm">
        <p>Solar is making about 420 watts.</p>
        <p className="text-xs text-mist mt-1">Generator is off. Last exercise was yesterday.</p>
      </div>
      <button
        type="button"
        onClick={onSwap}
        className="rounded-full bg-white text-ocean-deep px-3 py-2 text-sm font-semibold"
      >
        {swapNoted ? "Pack 2 marked for swap" : "Mark pack 2 for swap"}
      </button>
      {swapNoted && (
        <p className="text-xs text-mist">
          The other three packs stay online. Unbolt pack 2 and bolt the spare into that fuse.
        </p>
      )}
    </div>
  );
}

function RoleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium ${
        active ? "bg-white text-ocean-deep" : "bg-white/10 text-mist"
      }`}
    >
      {children}
    </button>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3 text-xs font-semibold ${active ? "text-white" : "text-mist"}`}
    >
      {children}
    </button>
  );
}
