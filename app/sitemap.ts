import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/update`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${base}/network`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/#network-map`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/#host-node`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
