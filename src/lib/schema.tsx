import { site } from "@/content/site";

/** Renders one or more JSON-LD objects into the page for search engines. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** BreadcrumbList for a page: Home is added first, the last crumb is the current page. */
export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

/** WebSite entity: lets Google show the site name in results. */
export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

/** FAQPage for a list of question/answer pairs. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** BlogPosting with its author (Person) and publisher (Organization). */
export function caseStudyLd(p: {
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  publishedAt?: string | null;
  about: string[];
  keywords?: string;
}) {
  const url = `${site.url}/customer-stories/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: "Customer stories",
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: p.image ? `${site.url}${p.image}` : `${site.url}/opengraph-image`,
    datePublished: p.publishedAt ?? undefined,
    dateModified: p.publishedAt ?? undefined,
    author: { "@type": "Person", name: "Bwire Solomon", jobTitle: "Founder", url: `${site.url}/about` },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/email/salnethub-icon.png` } },
    about: p.about.map((name) => ({ "@type": "Service", name, provider: { "@type": "Organization", name: site.name } })),
    ...(p.keywords ? { keywords: p.keywords } : {}),
  };
}

export function blogPostingLd(p: {
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  author: { name: string; role: string; sameAs?: string[] };
  keywords?: string;
}) {
  const url = `${site.url}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: p.image ? `${site.url}${p.image}` : `${site.url}/opengraph-image`,
    datePublished: p.publishedAt ?? undefined,
    dateModified: p.updatedAt ?? p.publishedAt ?? undefined,
    author: {
      "@type": "Person",
      name: p.author.name,
      jobTitle: p.author.role,
      url: `${site.url}/about`,
      ...(p.author.sameAs?.length ? { sameAs: p.author.sameAs } : {}),
    },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/email/salnethub-icon.png` } },
    ...(p.keywords ? { keywords: p.keywords } : {}),
  };
}
