/** Production site configuration */
export const siteConfig = {
  name: "Kauai Internet",
  tagline: "Rooted here. Connected always.",
  projectName: "Kauai Resilient Communications Network",
  description:
    "Building an independent, resilient communications network for Kauaʻi — Internet, wireless, radio, and community infrastructure so the island can communicate when conventional networks fail.",
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
