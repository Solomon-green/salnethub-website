import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { ToolMark } from "@/components/brand";
import { ServiceVisual } from "@/components/service-visual";
import { CtaBand, Faq, PageHero, PrimaryCta, ServiceCard } from "@/components/ui";
import { getService, groups, services } from "@/content/services";
import { getIntegration } from "@/content/integrations";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.hero.sub}`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} | SalnetHub`, description: s.short },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = services.filter((o) => o.slug !== s.slug && o.group === s.group).slice(0, 3);
  const fill = related.length < 3 ? services.filter((o) => o.group !== s.group).slice(0, 3 - related.length) : [];
  const finalTime = s.timeline[s.timeline.length - 1].duration;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.hero.sub,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    offers: { "@type": "Offer", priceCurrency: "USD", price: s.priceFrom.replace(/[^0-9]/g, ""), description: `From ${s.priceFrom}` },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <PageHero
        label={groups[s.group].name}
        title={s.hero.title}
        sub={s.hero.sub}
        aside={
          <div className="border border-ink bg-white" data-reveal>
            <div className="flex items-center gap-4 border-b border-line p-6">
              <span className="flex h-12 w-12 items-center justify-center bg-ink text-white">
                <ServiceIcon name={s.icon} size={24} />
              </span>
              <p className="text-[17px] font-bold leading-snug">{s.name}</p>
            </div>
            <dl className="grid grid-cols-2 border-b border-line">
              <div className="border-r border-line p-6">
                <dt className="text-[13px] text-slate">Starting price</dt>
                <dd className="mt-1 text-[28px] font-bold tracking-tight">{s.priceFrom}</dd>
              </div>
              <div className="p-6">
                <dt className="text-[13px] text-slate">Typical timeline</dt>
                <dd className="mt-1 text-[28px] font-bold tracking-tight">{finalTime.replace("Week ", "").replace("Weeks ", "")}</dd>
                <dd className="text-[12px] text-slate">{finalTime.startsWith("Day") ? "days" : "weeks to launch"}</dd>
              </div>
            </dl>
            <div className="p-6">
              <p className="text-[13px] text-slate">Works with</p>
              <div className="mt-4 flex flex-wrap items-center gap-5 text-ink/80">
                {s.tools.slice(0, 6).map((t) => (
                  <ToolMark key={t} slug={t} size={24} />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <PrimaryCta />
        <a href="#workflow" className="btn btn-secondary">
          See how it works
        </a>
      </PageHero>

      {/* Problem */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <h2 className="t-h1 lg:sticky lg:top-28 lg:self-start" data-reveal>
            {s.problem.title}
          </h2>
          <div className="border-t border-ink">
            {s.problem.points.map((p) => (
              <div key={p.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10" data-reveal>
                <h3 className="t-h3">{p.title}</h3>
                <p className="text-[16px] leading-relaxed text-slate">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="scroll-mt-20 border-y border-line bg-paper py-24 lg:py-32">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              {s.workflow.title}
            </h2>
            <p className="t-lead mt-5" data-reveal>
              {s.workflow.caption}
            </p>
          </div>
          <div className="mt-16">
            <ServiceVisual workflow={s.workflow} />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <h2 className="t-h1 max-w-3xl" data-reveal>
            What we build for you
          </h2>
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c) => (
              <div key={c.title} className="bg-white p-7 md:p-8" data-reveal>
                <span aria-hidden className="block h-2.5 w-2.5 bg-copper" />
                <h3 className="t-h3 mt-6">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-28">
        <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <h2 className="t-h2 max-w-3xl" data-reveal>
            {s.example.title}
          </h2>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2">
            <div className="bg-ink p-8 md:p-10" data-reveal>
              <p className="t-label text-on-ink-muted">Before</p>
              <p className="mt-5 text-[19px] leading-relaxed text-white/80">{s.example.before}</p>
            </div>
            <div className="bg-ink-2 p-8 md:p-10" data-reveal>
              <p className="t-label flex items-center gap-2 text-mist">
                <span aria-hidden className="h-2 w-2 bg-copper" /> After
              </p>
              <p className="mt-5 text-[19px] font-bold leading-relaxed">{s.example.after}</p>
            </div>
          </div>
          <p className="mt-5 text-[13px] text-on-ink-muted">An illustrative example of a typical project.</p>
        </div>
      </section>

      {/* Safeguards (AI services) */}
      {s.safeguards && (
        <section className="border-b border-line py-24 lg:py-32">
          <div className="container-x">
            <div className="max-w-3xl">
              <h2 className="t-h1" data-reveal>
                Safety and accuracy, built in
              </h2>
              <p className="t-lead mt-5" data-reveal>
                AI is only useful if you can trust it. These rules are part of every build, not optional extras.
              </p>
            </div>
            <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {s.safeguards.map((g) => (
                <div key={g.title} className="border-t border-ink pt-6" data-reveal>
                  <ShieldCheck size={24} strokeWidth={1.5} className="text-deep-sage" />
                  <h3 className="t-h3 mt-5">{g.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      <section className="border-b border-line py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
          <div>
            <h2 className="t-h2" data-reveal>
              Tools we connect
            </h2>
            <Link href="/integrations" className="link-arrow mt-4 inline-flex text-[15px]">
              All integrations <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {s.tools.map((t) => (
              <li key={t} className="flex items-center gap-3 bg-white px-5 py-5" data-reveal>
                <ToolMark slug={t} size={22} className="shrink-0 text-ink" />
                <span className="text-[14px] font-bold">{getIntegration(t)?.name ?? t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deliverables + timeline */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="t-h1" data-reveal>
              What you receive
            </h2>
            <ul className="mt-10 border-t border-ink">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-4 border-b border-line py-5 text-[16px]" data-reveal>
                  <Check size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-deep-sage" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-h1" data-reveal>
              Timeline
            </h2>
            <ol className="relative mt-10">
              <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
              {s.timeline.map((t) => (
                <li key={t.phase} className="relative grid gap-1 pb-9 pl-10 last:pb-0" data-reveal>
                  <span aria-hidden className="absolute left-0 top-1.5 h-[11px] w-[11px] border border-ink bg-white" />
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-[18px] font-bold">{t.phase}</span>
                    <span className="text-[13px] text-slate">{t.duration}</span>
                  </p>
                  <p className="text-[15px] leading-relaxed text-slate">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="border-y border-line bg-paper py-16">
        <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div data-reveal>
            <p className="text-[15px] text-slate">{s.name}</p>
            <p className="mt-2 text-[44px] font-bold leading-none tracking-tight">From {s.priceFrom}</p>
            <p className="mt-3 max-w-xl text-[15px] text-slate">{s.priceNote}</p>
          </div>
          <div className="flex flex-wrap gap-3" data-reveal>
            <PrimaryCta />
            <Link href="/engagements" className="btn btn-secondary">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24">
        <div className="container-x">
          <h2 className="t-h2" data-reveal>
            Related services
          </h2>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {[...related, ...fill].map((r) => (
              <ServiceCard key={r.slug} s={r} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqLd]) }} />
    </>
  );
}
