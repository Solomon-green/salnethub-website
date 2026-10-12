export const site = {
  name: "SalnetHub",
  // Swap to the custom domain once it points at Vercel (or set NEXT_PUBLIC_SITE_URL there).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://salnethub-website-ciui.vercel.app",
  email: "hello@salnethub.xyz",
  tagline: "Your business runs on manual work between tools. We automate it.",
  description:
    "Business automation and AI agents for small businesses. We automate lead follow-up, CRM updates, reporting and admin across the tools you already use.",
  // Paste a Google Calendar appointment schedule link here (or set NEXT_PUBLIC_BOOKING_URL).
  proof: "53 client projects since 2023",
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
