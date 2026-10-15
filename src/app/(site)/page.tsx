import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSystem } from "@/components/illustrations/hero-system";
import { FlowDiagram } from "@/components/illustrations/flow-diagram";
import { ProcessScroller } from "@/components/illustrations/process-scroller";
import { ToolMarquee } from "@/components/tool-marquee";
import { ServiceIcon } from "@/components/icons";
import { CtaBand, Faq, PrimaryCta, SectionHead, ServiceCard } from "@/components/ui";
import { servicesByGroup } from "@/content/services";
import { processSteps, principles } from "@/content/process";
import { entryPoints, builds } from "@/content/engagements";
import { getCaseStudies } from "@/lib/case-studies";
import { site } from "@/content/site";

export const metadata = { alternates: { canonical: "/" } };

const changes = [
  { area: "Replying to a new lead", before: "The next working day", after: "Under 2 minutes, day or night" },
  { area: "The weekly sales report", before: "Half of every Monday", after: "In your inbox at 8 am" },
  { area: "Order details from email", before: "Copied by hand, 40 a day", after: "Added to the sheet as they arrive" },
  { area: "Onboarding a new client", before: "2 hours across 5 tools", after: "One trigger, under 5 minutes" },
];

const homeFaqs = [
  { q: "What kind of businesses do you work with?", a: "Small-to-medium teams and businesses, usually 5 to 200 people, in services, e-commerce, property, logistics and professional firms. If your team copies data between tools, we can probably help." },
  { q: "Do we need to change the tools we use?", a: "No. We build on what you already run, such as Google Workspace, HubSpot or your accounting software, and add a connector like Make, Zapier or n8n only where needed." },
  { q: "How quickly will we see results?", a: "A single workflow is usually live within 1 to 2 weeks. Larger systems go live in stages, so you get value before the whole project is finished." },
  { q: "What happens if an automation breaks?", a: "You get an alert, and we fix it. Our care plans include monitoring, so we usually spot problems before you do. When it is our mistake, we say so and fix it at no cost." },
];

export default async function Home() {
  const automation = servicesByGroup("automation");
  const ai = servicesByGroup("ai");
  const web = servicesByGroup("web")[0];
  const featured = (await getCaseStudies()).filter((c) => c.entry.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-dark on-dark relative overflow-hidden pt-28 lg:pt-36">
        <div aria-hidden className="iso-grid-dark iso-fade pointer-events-none absolute inset-0" />
        <div className="container-x relative pb-16 lg:pb-20">
          <h1 className="t-hero max-w-[20ch] [text-wrap:balance]">
            Your business runs on manual work between tools.{" "}
            <span className="text-mint">We automate it.</span>
          </h1>
          <div className="mt-10 grid items-center gap-10 lg:mt-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            <div className="max-w-xl lg:pb-10">
              <p className="text-[clamp(1.075rem,1.4vw,1.25rem)] leading-relaxed text-on-ink-muted">
                SalnetHub builds automations and AI agents that capture leads, update your CRM, send reports and answer routine requests, so your team grows without hiring for busywork.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryCta tone="mint" />
                <Link href="/services" className="btn btn-ghost-light">
                  Explore services
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-on-ink-muted" aria-label="Why teams choose SalnetHub">
                {[site.proof, "Fixed-price quotes", "First workflow live in 1 to 2 weeks"].map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-mint" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative -mx-4 lg:-mr-8 lg:mx-0">
              <HeroSystem className="mx-auto w-full max-w-[780px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-y border-white/10 bg-forest py-12 text-white">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
          <p className="max-w-[15rem] text-[15px] font-bold leading-snug">
            Built on the tools your team <span className="text-mint">already uses</span>
          </p>
          <ToolMarquee dark />
        </div>
      </section>

      {/* What changes */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionHead
            title="The same work, without the busywork"
            body="Automation does not change what your business does. It removes the copying, chasing and waiting between the steps."
          />
          <div className="mt-14 border-t border-ink">
            <div className="hidden grid-cols-[1.1fr_1fr_1fr] gap-8 border-b border-line py-4 text-[13px] font-bold text-slate md:grid">
              <span>Task</span>
              <span>Before</span>
              <span>After</span>
            </div>
            {changes.map((c) => (
              <div key={c.area} data-reveal className="grid gap-2 border-b border-line py-6 md:grid-cols-[1.1fr_1fr_1fr] md:items-center md:gap-8">
                <p className="text-[18px] font-bold">{c.area}</p>
                <p className="text-[16px] text-slate line-through decoration-line decoration-1">{c.before}</p>
                <p className="flex items-center gap-3 text-[16px] font-bold text-mint-ink">
                  <span aria-hidden className="h-2 w-2 shrink-0 bg-mint-ink" />
                  {c.after}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-slate">Examples based on typical single-workflow projects.</p>
        </div>
      </section>

      {/* Automation services: hairline grid */}
      <section className="relative overflow-hidden bg-deep-sage py-24 lg:py-32">
        <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-70" />
        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead dark title="Automation that does the work between your tools" body="Five services that take repetitive work off your team for good. Each one is fixed-price and documented." />
            <Link href="/services" className="link-arrow shrink-0 !text-white" data-reveal>
              Compare all services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-14 grid gap-px border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
            {automation.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
            <Link
              href={`/services/${web.slug}`}
              data-reveal
              className="group relative flex flex-col justify-between overflow-hidden bg-ink p-7 text-white md:p-8"
            >
              <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-80" />
              <ServiceIcon name={web.icon} size={28} className="relative" />
              <div className="relative mt-10">
                <h3 className="t-h3">{web.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-on-ink-muted">{web.short}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-bold">
                  Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* AI solutions */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              AI that works from your data, with a person in control
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Chatbots, agents and knowledge assistants that answer from your own content and hand over to your team when it matters.
            </p>
          </div>
          <div>
            <ul className="border-t border-line">
              {ai.map((s) => (
                <li key={s.slug} data-reveal>
                  <Link href={`/services/${s.slug}`} className="group flex items-start gap-5 border-b border-line py-6">
                    <span className="icon-tile !h-11 !w-11 shrink-0 group-hover:bg-deep-sage group-hover:text-white">
                      <ServiceIcon name={s.icon} size={22} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[18px] font-bold group-hover:text-mint-ink">{s.name}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-slate">{s.short}</span>
                    </span>
                    <ArrowRight size={18} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Workflow showcase */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              Watch one lead move through a connected system
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-on-ink-muted" data-reveal>
              The copper square is the data. Nobody copies it, chases it or types it twice.
            </p>
          </div>
          <div className="mt-16">
            <FlowDiagram
              tone="dark"
              nodes={[
                { label: "Lead captured", meta: "Form, ad or chat" },
                { label: "Scored", meta: "Against your rules" },
                { label: "CRM updated", meta: "Record and deal" },
                { label: "Reply sent", meta: "Within 2 minutes" },
                { label: "Report updated", meta: "Live dashboard" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="iso-grid-sage relative bg-mist py-24 lg:py-32">
        <div className="container-x">
          <ProcessScroller
            steps={processSteps}
            heading="A clear process, from first call to running system"
            intro="Fixed scope, weekly progress in plain language, and documentation your team can actually use."
          />
          <Link href="/how-we-work" className="link-arrow mt-12 inline-flex">
            How we work <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-24 lg:py-28">
        <div className="container-x">
          <h2 className="t-h1 max-w-2xl" data-reveal>
            Straight talk, real numbers, no drama
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div
                key={p.name}
                className={`border-t-[3px] p-7 ${i === 0 ? "border-mint bg-ink text-white" : "border-sage bg-mist"}`}
                data-reveal
              >
                <p className="text-[22px] font-bold tracking-tight">{p.name}</p>
                <p className={`mt-3 text-[15px] leading-relaxed ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              Clear prices, published up front
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Every project gets a fixed written quote before work starts. Here is where most clients begin.
            </p>
            <Link href="/engagements" className="btn btn-secondary mt-9" data-reveal>
              See pricing
            </Link>
          </div>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {[...entryPoints, builds[0], builds[2]].map((e) => (
              <div key={e.name} className="bg-white p-7" data-reveal>
                <p className="text-[15px] font-bold">{e.name}</p>
                <p className="mt-4 text-[34px] font-bold leading-none tracking-tight">
                  {"unit" in e ? e.price : `From ${e.price}`}
                </p>
                <p className="mt-2 text-[13px] text-slate">{"unit" in e ? e.unit : e.time}</p>
                <p className="mt-5 text-[14px] leading-relaxed text-slate">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHead title="Recent work" />
              <Link href="/work" className="link-arrow" data-reveal>
                All case studies <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
              {featured.map(({ slug, entry }) => (
                <Link key={slug} href={`/work/${slug}`} className="group bg-white p-7" data-reveal>
                  <p className="text-[13px] text-slate">{entry.industry}</p>
                  <h3 className="t-h3 mt-3 group-hover:text-mint-ink">{entry.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{entry.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
