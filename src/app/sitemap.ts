import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";
import { getPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = ["", "/services", "/how-we-work", "/integrations", "/engagements", "/about", "/contact", "/privacy", "/terms"];
  const cases = await getCaseStudies();
  const posts = await getPosts();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, lastModified: now, priority: 0.8 })),
    ...(cases.length > 0 ? [{ url: `${site.url}/customer-stories`, lastModified: now, priority: 0.7 }] : []),
    ...cases.map((c) => ({ url: `${site.url}/customer-stories/${c.slug}`, lastModified: now, priority: 0.6 })),
    ...(posts.length > 0 ? [{ url: `${site.url}/blog`, lastModified: now, priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updatedAt ?? p.publishedAt ?? now), priority: 0.6 })),
  ];
}
