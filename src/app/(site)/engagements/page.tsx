import { Check } from "lucide-react";
import { CtaBand, Faq, PageHero, PrimaryCta } from "@/components/ui";
import { builds, carePlans, entryPoints, pricingFaqs } from "@/content/engagements";

export const metadata = {
  title: "Pricing",
  description: "Published starting prices for automation, AI chatbots, AI agents, RAG assistants and websites, plus monthly care plans. Every project gets a fixed written quote.",
  alternates: { canonical: "/engagements" },
};

export default function EngagementsPage() {
  return (
    <>
      <PageHero
        title="Clear prices, published up front"
        sub="Start free, build with a fixed quote, then keep everything running with a monthly care plan. Prices are in US dollars."
      >
        <PrimaryCta />
      </PageHero>

      {/* Entry points */}
      <section className="bg-white py-24 lg:py-28">
        <div className="container-x">
          <h2 className="t-h1 max-w-3xl" data-reveal>
            Where to start
          </h2>
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
            {entryPoints.map((e) => (
              <div key={e.name} className="flex flex-col bg-white p-8 md:p-10" data-reveal>
                <p className="text-[17px] font-bold">{e.name}</p>
                <p className="mt-5 text-[52px] font-bold leading-none tracking-tight">{e.price}</p>
                <p className="mt-2 text-[14px] text-slate">{e.unit}</p>
                <p className="mt-6 text-[16px] leading-relaxed text-slate">{e.body}</p>
                <ul className="mt-6 grid gap-2.5 border-t border-line pt-6">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px]">
                      <Check size={18} className="mt-0.5 shrink-0 text-deep-sage" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Builds */}
      <section className="iso-grid-sage bg-mist py-24 lg:py-28">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              Fixed-price builds
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Starting prices for a typical scope. Your written quote is fixed before work begins, and includes 30 days of aftercare.
            </p>
          </div>
          <div className="mt-12 border-t border-ink">
            {builds.map((b) => (
              <div key={b.name} className="grid gap-3 border-b border-line bg-white px-6 py-7 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-10" data-reveal>
                <div>
                  <p className="text-[19px] font-bold">{b.name}</p>
                  <p className="mt-1 text-[13px] text-slate">{b.time}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-slate">{b.body}</p>
                <p className="text-[26px] font-bold tracking-tight md:text-right">
                  <span className="mr-1 text-[14px] font-normal text-slate">from</span>
                  {b.price}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-slate">Third-party subscriptions and AI usage are paid directly to providers, at cost. We estimate them up front.</p>
        </div>
      </section>

      {/* Care plans */}
      <section className="py-24 lg:py-28">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 className="t-h1" data-reveal>
              Care plans
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Tools change their APIs and your processes evolve. A care plan keeps your automations working and adds new ones each month.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {carePlans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col border p-8 ${p.featured ? "border-ink bg-ink text-white" : "border-line bg-white"}`}
                data-reveal
              >
                {p.featured && <span className="t-label absolute right-8 top-8 bg-copper px-2 py-1 text-ink">Most chosen</span>}
                <p className="text-[19px] font-bold">{p.name}</p>
                <p className="mt-6 text-[48px] font-bold leading-none tracking-tight">
                  {p.price}
                  <span className={`ml-1 text-[15px] font-normal ${p.featured ? "text-on-ink-muted" : "text-slate"}`}>/ month</span>
                </p>
                <p className={`mt-4 text-[15px] leading-relaxed ${p.featured ? "text-on-ink-muted" : "text-slate"}`}>{p.body}</p>
                <ul className={`mt-8 grid gap-3 border-t pt-6 ${p.featured ? "border-white/15" : "border-line"}`}>
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px]">
                      <Check size={18} className={`mt-0.5 shrink-0 ${p.featured ? "text-mist" : "text-deep-sage"}`} /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-slate">Care plans are billed monthly and can be cancelled with 30 days&apos; notice.</p>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <Faq items={pricingFaqs} title="Pricing questions" />
        </div>
      </section>

      <CtaBand title="Get a fixed quote for your first workflow" />
    </>
  );
}
