import Link from "next/link";
import { Logo } from "@/components/brand";
import { CookieSettingsButton } from "@/components/consent";
import { services } from "@/content/services";
import { site } from "@/content/site";

const company = [
  { label: "How we work", href: "/how-we-work" },
  { label: "Integrations", href: "/integrations" },
  { label: "Customer stories", href: "/customer-stories" },
  { label: "Pricing", href: "/engagements" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ hasWork = false, hasBlog = false }: { hasWork?: boolean; hasBlog?: boolean }) {
  const companyLinks = company.filter((l) => (l.href !== "/customer-stories" || hasWork) && (l.href !== "/blog" || hasBlog));
  const automation = services.filter((s) => s.group === "automation");
  const other = services.filter((s) => s.group !== "automation");
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050608] text-white">
      <div className="container-x relative">
        <div className="grid gap-12 border-b border-white/12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr] lg:py-20">
          <div className="max-w-sm">
            <Logo variant="white" />
            <p className="mt-6 text-[15px] leading-relaxed text-on-ink-muted">
              Business automation and AI agents for small businesses. We automate the manual work between the tools you already use.
            </p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block text-[15px] font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              {site.email}
            </a>
          </div>
          <FooterCol title="Automation" links={automation.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
          <FooterCol title="AI and web" links={other.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
          <FooterCol title="Company" links={companyLinks} />
        </div>
        <div className="flex flex-col gap-4 py-8 text-[13px] text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} SalnetHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="inline-block py-2 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="inline-block py-2 hover:text-white">
              Terms
            </Link>
            <CookieSettingsButton className="inline-block py-2 hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="t-label mb-5 text-on-ink-muted">{title}</p>
      <ul className="grid gap-0.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-2 text-[15px] text-white/90 transition-colors hover:text-sky">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
