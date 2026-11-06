import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { CtaBand, Faq, PageHero, PrimaryCta } from "@/components/ui";
import { getService } from "@/content/services";
import { getSolution, solutions } from "@/content/solutions";
import { pricing } from "@/content/engagements";
import { site } from "@/content/site";
import { JsonLd, breadcrumbLd, faqLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getSolution(slug);
  if (!p) return {};
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/solutions/${p.slug}` },
    openGraph: { title: `${p.seo.title} | SalnetHub`, description: p.seo.description, url: `/solutions/${p.slug}` },
  };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const p = getSolution(slug);
  if (!p) notFound();
  const s = getService(p.service);
  if (!s) notFound();
  const others = solutions.filter((o) => o.slug !== p.slug);
  const isCall = p.conversation.channel === "call";

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.name,
    serviceType: s.name,
    description: p.seo.description,
    areaServed: "Worldwide",
    audience: { "@type": "BusinessAudience", name: p.industry },
    provider: { "@type": "Organization", name: site.name, url: site.url },
    offers: { "@type": "Offer", priceCurrency: "USD", description: p.pricing },
  };

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
          { name: p.name, path: `/solutions/${p.slug}` },
        ])}
      />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd(p.faqs)} />

      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: s.name, href: `/services/${s.slug}` },
        ]}
        title={p.hero.title}
        sub={p.hero.sub}
        aside={
          <div className="overflow-hidden rounded-card border border-line bg-surface text-fg shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)]" data-reveal>
            <div className="flex items-center gap-4 border-b border-line p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-deep text-white">
                <ServiceIcon name={s.icon} size={24} />
              </span>
              <div>
                <p className="text-[17px] font-bold leading-snug">{p.name}</p>
                <p className="text-[13px] text-slate">Built for {p.industry.toLowerCase()} teams</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 border-b border-line">
              <div className="border-r border-line p-6">
                <dt className="text-[13px] text-slate">How you pay</dt>
                <dd className="mt-1 text-[22px] font-bold leading-tight tracking-tight">{s.priceModel}</dd>
              </div>
              <div className="p-6">
                <dt className="text-[13px] text-slate">Pilot</dt>
                <dd className="mt-1 text-[22px] font-bold leading-tight tracking-tight">{pricing.pilotDays} days</dd>
                <dd className="text-[12px] text-slate">free, before you commit</dd>
              </div>
            </dl>
            <p className="px-6 py-4 text-[13px] leading-relaxed text-slate">{p.pricing}</p>
          </div>
        }
      >
        <PrimaryCta tone="cta" />
        <a href="#example" className="btn btn-secondary">
          See an example
        </a>
      </PageHero>

      {/* Industry problems */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <h2 className="t-h1 lg:sticky lg:top-28 lg:self-start" data-reveal>
            Why {p.industry.toLowerCase()} teams lose leads
          </h2>
          <div className="border-t border-fg">
            {p.pains.map((x) => (
              <div key={x.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10" data-reveal>
                <h3 className="t-h3">{x.title}</h3>
                <p className="text-[16px] leading-relaxed text-slate">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example conversation */}
      <section id="example" className="band-glow on-dark scroll-mt-20 py-24 text-white lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              {p.conversation.title}
            </h2>
            <p className="t-lead mt-5 !text-on-ink-muted" data-reveal>
              {p.conversation.caption}
            </p>
            <p className="mt-8 rounded-card border border-white/15 bg-white/[0.04] p-6 text-[15px] leading-relaxed" data-reveal>
              <span className="font-bold">Result: </span>
              <span className="text-on-ink-muted">{p.conversation.outcome}</span>
            </p>
            <p className="mt-4 text-[13px] text-on-ink-muted">An illustrative example. Names and details are invented.</p>
          </div>
          <div className="rounded-card border border-white/10 bg-white/[0.03] p-5 md:p-7" data-reveal>
            <p className="flex items-center gap-2 border-b border-white/10 pb-4 text-[13px] font-bold text-on-ink-muted">
              {isCall ? <PhoneCall size={16} /> : <MessageCircle size={16} />}
              {isCall ? "Phone call, Saturday 9:14 am" : "WhatsApp, Thursday 9:42 pm"}
            </p>
            <ol className="mt-5 grid gap-3">
              {p.conversation.lines.map((l, i) => {
                const ai = l.from === "ai";
                const who = ai ? (isCall ? "AI receptionist" : "AI assistant") : isCall ? "Caller" : "Buyer";
                return (
                  <li key={i} className={`flex ${ai ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                        ai ? "rounded-tl-sm bg-white/10 text-white" : "rounded-tr-sm bg-white text-black"
                      }`}
                    >
                      <span className={`mb-1 block text-[11px] font-bold uppercase tracking-wide ${ai ? "text-on-ink-muted" : "text-black/55"}`}>{who}</span>
                      {l.text}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* What it handles */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <h2 className="t-h1 max-w-3xl" data-reveal>
            What it handles for {p.industry.toLowerCase()} teams
          </h2>
          <div className="mt-14 grid gap-x-16 border-t border-fg md:grid-cols-2">
            {p.uses.map((c) => (
              <div key={c.title} className="grid gap-2 border-b border-line py-7" data-reveal>
                <h3 className="t-h3">{c.title}</h3>
                <p className="max-w-[52ch] text-[15px] leading-relaxed text-slate">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguards from the parent service */}
      {s.safeguards && (
        <section className="border-t border-line py-24 lg:py-32">
          <div className="container-x">
            <h2 className="t-h1 max-w-3xl" data-reveal>
              Safe to put in front of your customers
            </h2>
            <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {s.safeguards.map((g) => (
                <div key={g.title} className="border-t border-fg pt-6" data-reveal>
                  <ShieldCheck size={24} strokeWidth={1.5} className="text-accent" />
                  <h3 className="t-h3 mt-5">{g.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              You only pay when it books
            </h2>
            <p className="t-lead mt-5" data-reveal>
              {p.pricing} We work out the rate from your own numbers, so it is always below what a booking costs you today.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end" data-reveal>
            <PrimaryCta tone="cta" />
            <Link href="/engagements" className="btn btn-secondary">
              How pricing works
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <Faq items={p.faqs} />
        </div>
      </section>

      {/* Internal links */}
      <section className="border-t border-line py-24">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <Link href={`/services/${s.slug}`} className="group rounded-card border border-line bg-surface p-8 transition-colors hover:border-fg" data-reveal>
            <p className="text-[13px] text-slate">The full service</p>
            <p className="t-h3 mt-2 flex items-center gap-2">
              {s.name} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.short}</p>
          </Link>
          {others.map((o) => (
            <Link key={o.slug} href={`/solutions/${o.slug}`} className="group rounded-card border border-line bg-surface p-8 transition-colors hover:border-fg" data-reveal>
              <p className="text-[13px] text-slate">Also built for {o.industry.toLowerCase()}</p>
              <p className="t-h3 mt-2 flex items-center gap-2">
                {o.name} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{o.seo.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title="Start with a free" accent="14-day pilot" body="A 20-minute call is enough. We look at where your enquiries or calls slip away, and what each booking is worth to you." />
    </>
  );
}
