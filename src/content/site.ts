export const site = {
  name: "SalnetHub",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salnethub.com",
  email: "info@salnethub.com",
  // GA4 Measurement ID (public by design; it appears in every page's source).
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-NPEM0EF4ZV",
  tagline: "Systems that run your business while you grow it.",
  description:
    "Business automation and AI agents for small businesses. We automate lead follow-up, CRM updates, reporting and admin across the tools you already use.",
  proof: "53 client projects since 2023",
};

export const primaryCta = { label: "Book a call", href: "/contact#book" };

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Integrations", href: "/integrations" },
  { label: "Customer stories", href: "/customer-stories" },
  { label: "Pricing", href: "/engagements" },
] as const;
