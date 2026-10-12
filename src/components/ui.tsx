import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { primaryCta } from "@/content/site";
import type { Service } from "@/content/services";

export function PrimaryCta({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href={primaryCta.href} className={`btn ${light ? "btn-light" : "btn-primary"} ${className}`}>
      {primaryCta.label}
      <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" />
    </Link>
  );
}

export function PageHero({
  label,
  title,
  sub,
  children,
  aside,
}: {
  label?: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="hero-wash relative overflow-hidden pt-28 lg:pt-36">
      <div aria-hidden className="iso-grid-sage iso-fade pointer-events-none absolute inset-0" />
      <div className={`container-x relative grid gap-12 pb-16 lg:pb-24 ${aside ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}`}>
        <div className="max-w-3xl">
          {label && <p className="t-label mb-5 text-deep-sage">{label}</p>}
          <h1 className="t-display">{title}</h1>
          <p className="t-lead mt-6 max-w-[40rem]">{sub}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
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
    <section className="relative overflow-hidden bg-sage text-white">
      <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-x relative grid gap-10 py-20 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div data-reveal>
          <h2 className="t-h1 max-w-2xl">{title}</h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-on-sage-muted">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end" data-reveal>
          <PrimaryCta light />
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
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[18px] font-bold leading-snug">
              {f.q}
              <Plus size={20} strokeWidth={1.5} className="mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="-mt-1 max-w-[60ch] pb-7 text-[16px] leading-relaxed text-slate">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function ServiceCard({ s, compact = false }: { s: Pick<Service, "slug" | "name" | "short" | "icon" | "priceFrom">; compact?: boolean }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      data-reveal
      className="group relative flex h-full flex-col bg-white p-7 text-ink transition-colors duration-300 hover:bg-mist md:p-8"
    >
      <span className="icon-tile group-hover:bg-deep-sage group-hover:text-white">
        <ServiceIcon name={s.icon} size={26} />
      </span>
      <h3 className="t-h3 mt-7">{s.name}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{s.short}</p>
      <div className="mt-8 flex items-center justify-between text-[14px]">
        {!compact && <span className="text-slate">From {s.priceFrom}</span>}
        <span className="link-arrow ml-auto">
          Learn more <ArrowRight size={16} />
        </span>
      </div>
      <span aria-hidden className="absolute left-0 top-0 h-[3px] w-0 bg-copper transition-[width] duration-500 ease-out group-hover:w-full" />
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
