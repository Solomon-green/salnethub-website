import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = ["", "/services", "/how-we-work", "/integrations", "/engagements", "/about", "/contact", "/privacy", "/terms"];
  const cases = await getCaseStudies();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
    ...(cases.length > 0 ? [{ url: `${site.url}/work`, lastModified: now, priority: 0.7 }] : []),
    ...cases.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
