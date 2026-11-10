import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { HeroCost } from "@/components/illustrations/hero-cost";
import { RunReplay } from "@/components/illustrations/run-replay";
import { FeatureTiles } from "@/components/feature-tiles";
import { Recipes } from "@/components/recipes";
import { ToolMarquee } from "@/components/tool-marquee";
import { ServicesBento } from "@/components/services-bento";
import { CostCalculator } from "@/components/cost-calculator";
import { hasTestimonials, Testimonials, UpworkProof } from "@/components/testimonials";
import { CtaBand, Faq, PrimaryCta, SectionHead } from "@/components/ui";
import { JsonLd, faqLd } from "@/lib/schema";
import { processSteps } from "@/content/process";
import { pricing, pricingModels, pricingTeaser } from "@/content/engagements";
import { integrations } from "@/content/integrations";
import { getCaseStudies } from "@/lib/case-studies";
import { site } from "@/content/site";
import { upwork } from "@/content/proof";

export const metadata = { alternates: { canonical: "/" } };

const changes = [
  { area: "Replying to a new lead", before: "The next working day", after: "Under 2 minutes, day or night" },
  { area: "The weekly sales report", before: "Half of every Monday", after: "In your inbox at 8 am" },
  { area: "Order details from email", before: "Copied by hand, 40 a day", after: "Added to the sheet as they arrive" },
  { area: "Onboarding a new client", before: "2 hours across 5 tools", after: "One trigger, under 5 minutes" },
];

// Every promise here is one we already make on the pricing page and in the FAQs.
const promises = [
  { name: "Pay for results", body: "Per booked appointment, or a capped share of the time we save you." },
  { name: "If it fails, you owe nothing", body: "Every engagement starts with a pilot. No result, no bill for the build." },
  { name: "Live in weeks", body: "Your first workflow is usually live in 1 to 2 weeks." },
  { name: "Documented and handed over", body: "A written guide and recorded walkthrough for every build." },
];

const homeFaqs = [
  { q: "What kind of businesses do you work with?", a: "Small-to-medium teams and businesses, usually 5 to 200 people, in services, e-commerce, property, logistics and professional firms. If your team copies data between tools, we can probably help." },
  { q: "Do we need to change the tools we use?", a: "No. We build on what you already run, such as Google Workspace, HubSpot or your accounting software, and add a connector like Make, Zapier or n8n only where needed." },
  { q: "How quickly will we see results?", a: "A single workflow is usually live within 1 to 2 weeks. Larger systems go live in stages, so you get value before the whole project is finished." },
  { q: "What happens if an automation breaks?", a: "You get an alert, and we fix it. Monitoring is included in your monthly fee, so we usually spot problems before you do. When it is our mistake, we say so and fix it at no cost." },
];

const hasUpwork = upwork.rating != null || upwork.jobSuccess != null || upwork.badge != null;
const proofLine = [site.proof, `${integrations.length}+ tools connected`, "First workflow live in 1 to 2 weeks", "Pay for results, not promises"];

export default async function Home() {
  const stories = await getCaseStudies();

  return (
    <>
      <JsonLd data={faqLd(homeFaqs)} />
      {/* Hero */}
      <section className="hero-light relative overflow-hidden pt-28 lg:pt-32">
        <div className="container-x relative grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
          <div>
            <h1 className="t-hero max-w-[15ch] [text-wrap:balance]">
              Systems that run your business <span className="t-accent">while you grow it.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[clamp(1.075rem,1.4vw,1.25rem)] leading-relaxed text-slate">
              We are an AI automation agency for small businesses. We design and build automations and AI agents across your whole operation: sales, marketing, admin, finance, reporting and customer
              support. Your tools finally work as one system, and your team gets back to the work that moves the business forward.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryCta tone="cta" />
              {/* Quote cards first (on this page), with their "More customer stories" button leading to the full page */}
              {hasTestimonials || stories.length > 0 ? (
                <Link href={hasTestimonials ? "#customer-stories" : "/customer-stories"} className="btn btn-secondary">
                  Customer stories
                  <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" />
                </Link>
              ) : (
                <Link href="#services" className="btn btn-secondary">
                  See what we automate
                </Link>
              )}
            </div>
            <p className="mt-4 text-[13px] text-slate">Free 30-minute call on Google Meet. No obligation.</p>
            <ul className="mt-9 grid max-w-xl gap-x-6 gap-y-2.5 text-[14px] text-slate sm:grid-cols-2" aria-label="Why teams choose SalnetHub">
              {hasUpwork && (
                <li className="text-fg sm:col-span-2">
                  <UpworkProof className="font-bold" />
                </li>
              )}
              {proofLine.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <Check aria-hidden size={15} strokeWidth={2.5} className="shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {/* Desktop only: on small screens the calculator itself follows a scroll later */}
          <HeroCost className="mx-auto hidden w-full max-w-[540px] lg:block" />
        </div>
      </section>

      {/* Tools */}
      <section className="border-y border-line py-9">
        <div className="container-x grid items-center gap-6 lg:grid-cols-[auto_1fr] lg:gap-14">
          <p className="max-w-[14rem] text-[15px] font-bold leading-snug">Connects the tools your team already uses</p>
          <ToolMarquee labeled />
        </div>
      </section>

      {/* Cost calculator: the strongest moment, straight after the hero's example */}
      <section id="cost" className="scroll-mt-20 py-24 lg:py-32">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              What is the leak <span className="t-accent">costing you?</span>
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Manual work or lost leads: move the sliders to match your business. Most owners are surprised by the number, and our price is always below it.
            </p>
          </div>
          <div className="mt-12" data-reveal>
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* What changes */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <SectionHead
            title="The same work, without the busywork"
            body="Automation does not change what your business does. It removes the copying, chasing and waiting between the steps."
          />
          <div className="mt-12 overflow-hidden rounded-card border border-line bg-surface px-6 shadow-[0_24px_60px_-44px_rgb(0_0_0/0.35)] md:px-10">
            <div className="hidden grid-cols-[1.1fr_1fr_1fr] gap-8 border-b border-line py-5 text-[13px] font-bold text-slate md:grid">
              <span>Task</span>
              <span>Done by hand</span>
              <span>Automated</span>
            </div>
            {changes.map((c) => (
              <div key={c.area} data-reveal className="grid gap-2 border-b border-line py-6 last:border-b-0 md:grid-cols-[1.1fr_1fr_1fr] md:items-center md:gap-8">
                <p className="text-[18px] font-bold">{c.area}</p>
                <p className="text-[16px] text-slate line-through decoration-slate/50 decoration-[1.5px]">{c.before}</p>
                <p className="flex items-center gap-2.5 text-[16px] font-bold text-fg">
                  <Check aria-hidden size={18} strokeWidth={2.5} className="shrink-0 text-accent" />
                  {c.after}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-slate">Typical outcomes from single-workflow projects.</p>
        </div>
      </section>

      {/* Services, by outcome */}
      <section id="services" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              title="Pick the work you want off your plate"
              body="Built on the tools you already pay for, and priced on the results they bring. Start with one problem, then add more when it pays for itself."
            />
            <Link href="/services" className="link-arrow shrink-0" data-reveal>
              Compare all services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-14">
            <ServicesBento />
          </div>
        </div>
      </section>

      {/* Recipes: proven workflows, trigger → steps → outcome */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <SectionHead
            title="Start from a proven recipe"
            body="The workflows we build most often. Each one runs on the tools you already use, and we adapt it to how your team works."
          />
          <div className="mt-14">
            <Recipes />
          </div>
        </div>
      </section>

      {/* Workflow showcase: deep moment one */}
      <section className="band-glow on-dark relative overflow-hidden py-24 text-white lg:py-32">
        <div className="container-x relative">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              One lead, five tools, zero copy-paste
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-on-ink-muted" data-reveal>
              Watch one lead go from sign-up to a booked call in under two minutes, without anyone touching it. We build it in n8n, Make or
              Zapier, on your accounts.
            </p>
          </div>
          <div className="mt-14" data-reveal>
            <RunReplay />
          </div>
        </div>
      </section>

      {/* Built to run without you */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHead
            title="Built to run without you"
            body="Automations that keep working when you are busy, asleep or on leave, and that ask before doing anything risky."
          />
          <div className="mt-14">
            <FeatureTiles />
          </div>
        </div>
      </section>

      {/* Process: one line of five steps; the detail lives on How we work */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              title="From first call to a running system"
              body="Fixed scope, weekly progress in plain language, and documentation your team can actually use."
            />
            <Link href="/how-we-work" className="link-arrow shrink-0" data-reveal>
              How we work <ArrowRight size={16} />
            </Link>
          </div>
          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((p) => (
              <li key={p.step} className="border-t-2 border-fg pt-6" data-reveal>
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-slate">{p.step}</p>
                <p className="mt-3 text-[18px] font-bold leading-snug">{p.title}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate">{p.output}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />

      {/* Pricing, with the promises as one line underneath */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="t-h1" data-reveal>
                {pricingTeaser.title}
              </h2>
              <p className="t-lead mt-5" data-reveal>
                {pricingTeaser.body}
              </p>
              <Link href="/engagements" className="btn btn-secondary mt-9" data-reveal>
                See how pricing works
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {pricingModels.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex flex-col rounded-card border p-7 ${i === 0 ? "on-dark border-deep bg-deep text-white" : "border-line bg-surface"}`}
                  data-reveal
                >
                  <p className={`text-[13px] font-bold ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>{m.label}</p>
                  <p className="mt-4 text-[24px] font-bold leading-tight tracking-tight">{m.headline}</p>
                  <p className={`mt-4 text-[14px] leading-relaxed ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>{m.body}</p>
                  <p className={`mt-auto pt-5 text-[13px] ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>For: {m.for}</p>
                </div>
              ))}
              <p className="text-[13px] text-slate sm:col-span-2">
                Every engagement starts with a {pricing.pilotDays}-day pilot. Automation pilots are {pricing.pilotFee}, refunded if the pilot misses its target.
              </p>
            </div>
          </div>

          <ul className="mt-16 grid gap-x-8 gap-y-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.name} className="flex gap-3" data-reveal>
                <Check aria-hidden size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  <span className="block text-[15px] font-bold">{p.name}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-slate">{p.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
