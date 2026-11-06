import { Check } from "lucide-react";
import { CtaBand, Faq, PageHero, PrimaryCta } from "@/components/ui";
import { AppointmentReceipt, PaymentRail, SavingsStacks } from "@/components/illustrations/pricing-graphics";
import {
  leadExample,
  pricing,
  pricingFaqs,
  pricingHero,
  pricingLadder,
  pricingModels,
  pricingPromises,
  pricingSteps,
  timeExample,
} from "@/content/engagements";
import { JsonLd, breadcrumbLd, faqLd } from "@/lib/schema";

export const metadata = {
  title: "Results-Based Pricing for Automation & AI",
  description:
    "No big fee up front. SalnetHub starts with a 14-day pilot, then charges per booked appointment or a capped share of the time we save you. If the pilot fails, you owe nothing.",
  alternates: { canonical: "/engagements" },
};

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function EngagementsPage() {
  const apptCost = leadExample.costPerLead / leadExample.bookRate;
  const bookOneIn = Math.round(1 / leadExample.bookRate);
  const monthlyCost = timeExample.people * timeExample.hoursPerWeek * 4 * timeExample.rate;
  const maxFee = monthlyCost * pricing.savingsCap;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Pricing", path: "/engagements" }])} />
      <JsonLd data={faqLd(pricingFaqs)} />
      <PageHero title={pricingHero.title} sub={pricingHero.sub}>
        <PrimaryCta tone="cta" />
        <p className="mt-4 text-[14px] text-slate">We do the maths with you on the call.</p>
      </PageHero>

      {/* How it works */}
      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x">
          <h2 className="t-h1 max-w-3xl" data-reveal>
            How our pricing works
          </h2>
          <div className="mt-12">
            <PaymentRail />
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {pricingSteps.map((s, i) => (
              <li key={s.name} className="flex flex-col rounded-card border border-line bg-surface p-8" data-reveal>
                <span className="text-[13px] font-bold text-slate">Step {i + 1}</span>
                <p className="mt-2 text-[19px] font-bold leading-snug">{s.name}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two ways we charge */}
      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              Two ways we charge
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Which one applies depends on the result the work brings you: more booked customers, or hours back.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {pricingModels.map((m, i) => (
              <div
                key={m.id}
                className={`flex flex-col rounded-card border p-8 md:p-10 ${i === 0 ? "on-dark border-deep bg-deep text-white" : "border-line bg-surface"}`}
                data-reveal
              >
                <p className={`text-[13px] font-bold uppercase tracking-wide ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>{m.label}</p>
                <p className="mt-4 text-[30px] font-bold leading-tight tracking-tight">{m.headline}</p>
                <p className={`mt-2 text-[14px] ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>For: {m.for}</p>
                <p className={`mt-6 text-[16px] leading-relaxed ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>{m.body}</p>
                <p className={`mt-4 text-[15px] leading-relaxed ${i === 0 ? "text-on-ink-muted" : "text-slate"}`}>
                  <span className={`font-bold ${i === 0 ? "text-white" : "text-fg"}`}>How we set the price: </span>
                  {m.howWePrice}
                </p>
                <ul className={`mt-auto grid gap-2.5 border-t pt-6 ${i === 0 ? "mt-8 border-white/15" : "mt-8 border-line"}`}>
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px]">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The maths */}
      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              A booked appointment probably costs you <span className="t-accent">more than you think</span>
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Most businesses have never done this maths. When they do, the decision is easy. These are example numbers; on the call we use yours.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-card border border-line bg-surface p-8 md:p-10" data-reveal>
              <p className="text-[17px] font-bold">More booked customers</p>
              <div className="mt-6 border-b border-line pb-8">
                <AppointmentReceipt />
              </div>
              <dl className="mt-4 grid gap-0 text-[15px]">
                <div className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-slate">You pay per lead</dt>
                  <dd className="font-bold tabular-nums">{money(leadExample.costPerLead)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-slate">Leads that actually book</dt>
                  <dd className="font-bold tabular-nums">
                    1 in {bookOneIn} ({Math.round(leadExample.bookRate * 100)}%)
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="font-bold">What one booked appointment really costs you</dt>
                  <dd className="font-bold tabular-nums">{money(apptCost)}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="font-bold">What you would pay us per booked appointment</dt>
                  <dd className="whitespace-nowrap text-[22px] font-bold tabular-nums text-accent">about {money(leadExample.ourPrice)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[13px] text-slate">
                {money(leadExample.costPerLead)} ÷ {leadExample.bookRate} = {money(apptCost)}. And you only pay when it books.
              </p>
            </div>
            <div className="rounded-card border border-line bg-surface p-8 md:p-10" data-reveal>
              <p className="text-[17px] font-bold">Hours back</p>
              <div className="mt-6 border-b border-line pb-8">
                <SavingsStacks />
              </div>
              <dl className="mt-4 grid gap-0 text-[15px]">
                <div className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-slate">People on copy-and-paste work</dt>
                  <dd className="font-bold tabular-nums">{timeExample.people}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-slate">Hours each, per week, at {money(timeExample.rate)} an hour</dt>
                  <dd className="font-bold tabular-nums">{timeExample.hoursPerWeek}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="font-bold">What that work costs you each month</dt>
                  <dd className="font-bold tabular-nums">{money(monthlyCost)}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="font-bold">The most you would pay us each month</dt>
                  <dd className="text-[22px] font-bold tabular-nums text-accent">{money(maxFee)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[13px] text-slate">You keep at least {money(monthlyCost - maxFee)} every month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promise + ladder */}
      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              Our promise
            </h2>
            <ul className="mt-10 grid gap-6">
              {pricingPromises.map((p) => (
                <li key={p.name} className="flex gap-3" data-reveal>
                  <Check aria-hidden size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-accent" />
                  <span>
                    <span className="block text-[16px] font-bold">{p.name}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-slate">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-h1" data-reveal>
              Start small, <span className="t-accent">grow with results</span>
            </h2>
            <ol className="mt-10 grid gap-4">
              {pricingLadder.map((s, i) => (
                <li key={s.name} className="rounded-card border border-line bg-surface p-6" style={{ marginLeft: `${i * 1.5}rem` }} data-reveal>
                  <p className="text-[16px] font-bold">
                    {i + 1}. {s.name}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[15px] font-bold" data-reveal>
              The first result opens the door. Results open the rest of the business.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <Faq items={pricingFaqs} title="Pricing questions" />
          <p className="mt-8 text-[13px] text-slate">
            Prices are in US dollars. Third-party subscriptions and AI usage are paid directly to providers, at cost, and we estimate them up front.
          </p>
        </div>
      </section>

      <CtaBand title="Find out what your leak" accent="is costing you" />
    </>
  );
}
