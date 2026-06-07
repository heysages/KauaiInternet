/** Production site configuration */
export const siteConfig = {
  name: "Kauai Internet",
  tagline: "Rooted here. Connected always.",
  projectName: "Kauai Resilience Network",
  description:
    "A community knowledge map for Kauai — explore connectivity, emergency readiness, and ways to participate where you live, work, or learn.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kauaiinternet.com",
  contactEmail: "hello@kauaiinternet.com",
  brand: {
    navy: "#0D2B45",
    blue: "#236FA3",
    teal: "#3FA7B5",
    sage: "#7DB9A6",
    cream: "#E6E2D6",
  },
};
