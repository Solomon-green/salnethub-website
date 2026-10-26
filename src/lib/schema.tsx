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
