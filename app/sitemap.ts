import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PROJECTS_API = "https://new-personal-api.vercel.app";
const PROJECTS_ENDPOINTS = ["PortfoliosData", "portfoliosdata", "projects", "works", "portfolio"];

async function fetchProjectIds(): Promise<(string | number)[]> {
  for (const path of PROJECTS_ENDPOINTS) {
    try {
      const res = await fetch(`${PROJECTS_API}/${path}`, { next: { revalidate: 3600 } });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        return data.map((item: any, i: number) => item.id ?? i);
      }
    } catch {
      /* try next endpoint */
    }
  }
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = await fetchProjectIds();
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/works`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...ids.map((id) => ({
      url: `${SITE_URL}/works/${id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
