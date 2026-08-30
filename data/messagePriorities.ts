import type { MessagePriority } from "@/types/network";

export const messagePriorities: {
  priority: MessagePriority;
  label: string;
  description: string;
  networkBehavior: string;
}[] = [
  {
    priority: "P0",
    label: "Emergency / distress",
    description: "Life-threatening situations",
    networkBehavior: "Highest delivery priority — not a replacement for 911",
  },
  {
    priority: "P1",
    label: "Emergency coordination",
    description: "First responder and mutual aid coordination",
    networkBehavior: "High priority delivery when network permits",
  },
  {
    priority: "P2",
    label: "Health / safety check-in",
    description: "I'm safe / family check-in messages",
    networkBehavior: "Elevated priority during Island Mode",
  },
  {
    priority: "P3",
    label: "Infrastructure / status",
    description: "Road blocked, power out, network status",
    networkBehavior: "Standard resilient delivery",
  },
  {
    priority: "P4",
    label: "Normal personal message",
    description: "Everyday communication",
    networkBehavior: "Best-effort delivery",
  },
  {
    priority: "P5",
    label: "Community / non-critical",
    description: "Announcements, general community info",
    networkBehavior: "Lowest priority — may defer during congestion",
  },
];

export const messagingDisclaimer =
  "KauaiInternet messaging is not a replacement for 911 or official emergency dispatch unless and until formal integrations exist. In an emergency, call 911 when possible.";

export const kauaiMessagingConcept = {
  title: "Kauaʻi Messaging (Future)",
  status: "proposed" as const,
  functions: [
    "Direct messaging",
    "Family groups",
    "Neighborhood groups",
    "Community channels",
    "Emergency messages",
    "Check-in / I'm safe",
    "Help requests",
    "Infrastructure reports",
  ],
  routingExample: {
    message: "I'm safe at home.",
    paths: [
      "Phone → Bluetooth/Wi-Fi → Local Node → LoRa → Relay → Backbone → Wi-Fi → Recipient",
      "Phone → Wi-Fi → KauaiInternet → Local fiber → Recipient",
      "Phone → Internet → Reticulum → Satellite gateway → Remote recipient",
    ],
    principle: "The user should not have to understand the transport. The network selects the best available path.",
  },
};
