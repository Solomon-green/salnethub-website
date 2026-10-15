import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { primaryCta } from "@/content/site";
import type { Service } from "@/content/services";

type CtaTone = "ink" | "light" | "mint";

export function PrimaryCta({ className = "", light = false, tone }: { className?: string; light?: boolean; tone?: CtaTone }) {
  const t: CtaTone = tone ?? (light ? "light" : "ink");
  const cls = t === "mint" ? "btn-mint" : t === "light" ? "btn-light" : "btn-primary";
  return (
    <Link href={primaryCta.href} className={`btn ${cls} ${className}`}>
      {primaryCta.label}
      <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" />
    </Link>
  );
}

/** Dark hero used by every inner page: Ink into Forest, mint light, the 30° grid. */
export function PageHero({
  crumbs,
  title,
  sub,
  children,
  aside,
}: {
  crumbs?: { label: string; href?: string }[];
  title: string;
  sub: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="hero-dark on-dark relative overflow-hidden pt-28 lg:pt-36">
      <div aria-hidden className="iso-grid-dark iso-fade pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-mint/50 to-transparent" />
      <div className={`container-x relative grid gap-12 pb-16 lg:pb-24 ${aside ? "lg:grid-cols-[1.08fr_0.92fr] lg:items-center" : ""}`}>
        <div className="max-w-3xl">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-7 text-[14px]">
              <ol className="flex flex-wrap items-center gap-2 text-on-ink-muted">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    {c.href ? (
                      <Link href={c.href} className="font-medium text-mint hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 className="t-page">{title}</h1>
          <p className="mt-6 max-w-[40rem] text-[clamp(1.075rem,1.4vw,1.25rem)] leading-relaxed text-on-ink-muted">{sub}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
  );
}

/** Secondary hero action on dark surfaces. */
export function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn btn-ghost-light">
      {children}
    </Link>
  );
}

export function CtaBand({
  title = "Find the first workflow worth automating",
  body = "A 20-minute call is enough. We look at how the work happens today and tell you plainly what we would automate first, and what it would cost.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="hero-dark on-dark relative overflow-hidden">
      <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/50 to-transparent" />
      <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div data-reveal>
          <h2 className="t-h1 max-w-2xl">{title}</h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-on-ink-muted">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end" data-reveal>
          <PrimaryCta tone="mint" />
          <Link href="/engagements" className="btn btn-ghost-light">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, title = "Questions we hear often" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <h2 className="t-h1" data-reveal>
        {title}
      </h2>
      <div className="border-t border-ink">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-line" data-reveal>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[18px] font-bold leading-snug transition-colors hover:text-mint-ink">
              {f.q}
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-line transition-colors duration-300 group-open:border-mint-ink group-open:bg-mint-ink group-open:text-white">
                <Plus size={16} strokeWidth={1.75} className="transition-transform duration-300 group-open:rotate-45" />
              </span>
            </summary>
            <p className="-mt-1 max-w-[60ch] pb-7 text-[16px] leading-relaxed text-slate">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/** Service card: icon and name share one line, so cards do not read as the generic tile-above-heading template. */
export function ServiceCard({ s, compact = false }: { s: Pick<Service, "slug" | "name" | "short" | "icon" | "priceFrom">; compact?: boolean }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      data-reveal
      className="group relative flex h-full flex-col bg-white p-7 text-ink transition-colors duration-300 hover:bg-[#f6faf8] md:p-8"
    >
      <div className="flex items-start gap-4">
        <ServiceIcon name={s.icon} size={24} className="mt-0.5 shrink-0 text-mint-ink" />
        <h3 className="t-h3 flex-1">{s.name}</h3>
        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="shrink-0 text-slate transition-[translate,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint-ink"
        />
      </div>
      <p className="mt-4 flex-1 pl-10 text-[15px] leading-relaxed text-slate">{s.short}</p>
      {!compact && (
        <p className="mt-7 pl-10 text-[14px] text-slate">
          From <span className="font-bold text-ink">{s.priceFrom}</span>
        </p>
      )}
      <span aria-hidden className="absolute left-0 top-0 h-[3px] w-0 bg-mint-ink transition-[width] duration-500 ease-out group-hover:w-full" />
    </Link>
  );
}

export function SectionHead({ title, body, className = "", dark = false }: { title: string; body?: string; className?: string; dark?: boolean }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className={`t-h1 ${dark ? "text-white" : ""}`} data-reveal>
        {title}
      </h2>
      {body && (
        <p className={`t-lead mt-5 ${dark ? "!text-on-sage-muted" : ""}`} data-reveal>
          {body}
        </p>
      )}
    </div>
  );
}
