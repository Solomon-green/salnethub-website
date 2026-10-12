export const site = {
  name: "SalnetHub",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://salnethub.xyz",
  email: "hello@salnethub.xyz",
  tagline: "Connect your systems. Get your time back.",
  description:
    "SalnetHub builds business automations, AI chatbots, AI agents and RAG systems for small-to-medium teams and businesses, using the tools you already run.",
  // Paste a Google Calendar appointment schedule link here (or set NEXT_PUBLIC_BOOKING_URL).
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
};

export const primaryCta = { label: "Book a call", href: "/contact" };

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Integrations", href: "/integrations" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/engagements" },
] as const;
