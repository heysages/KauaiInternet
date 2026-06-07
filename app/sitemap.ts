import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#explore`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#map`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/#support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
