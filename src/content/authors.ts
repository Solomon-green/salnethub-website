// Blog authors. Shown as the byline, in the author box under each post and as schema.org Person.
// Real names and real experience are what Google's E-E-A-T guidelines reward, so keep these true.

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string; // square photo in public/authors/, e.g. "/authors/bwire-solomon.jpg"
  sameAs?: string[]; // public profiles: LinkedIn, Upwork, X
};

export const authors: Author[] = [
  {
    slug: "bwire-solomon",
    name: "Bwire Solomon",
    role: "Founder, SalnetHub",
    bio: "Solomon has built automations, CRM workflows and AI agents for 53 client projects since 2023, mostly for small teams running on Google Workspace, HubSpot, Zoho, Make, Zapier and n8n.",
    sameAs: [],
  },
];

export const defaultAuthor = authors[0];

export function getAuthor(slug?: string | null) {
  return authors.find((a) => a.slug === slug) ?? defaultAuthor;
}
