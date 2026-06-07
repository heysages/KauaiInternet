/** Production site configuration */
export const siteConfig = {
  name: "Kauai Internet",
  projectName: "Kauai Resilience Network",
  description:
    "A community knowledge map for Kauai — explore connectivity, emergency readiness, and ways to participate where you live, work, or learn.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kauaiinternet.com",
  contactEmail: "hello@kauaiinternet.com",
};
