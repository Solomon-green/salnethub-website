import { Check } from "lucide-react";
import { ProcessScroller } from "@/components/illustrations/process-scroller";
import { CtaBand, Faq, PageHero, PrimaryCta } from "@/components/ui";
import { processSteps } from "@/content/process";

export const metadata = {
  title: "How Our Automation Projects Work",
  description: "Our five-step process: discover, build, test, hand over and support. Fixed scope, weekly updates and documentation your team can use.",
  alternates: { canonical: "/how-we-work" },
};

const commitments = [
  { title: "Fixed scope and price", body: "You get a written scope and a fixed price before any work starts. No hourly surprises." },
  { title: "Weekly updates in plain words", body: "Every week you hear what was built, what is next and anything we need from you." },
  { title: "Built in a safe copy first", body: "We build and test away from live data, so your daily work is never interrupted." },
  { title: "You own everything", body: "Automations live in your accounts. If we part ways, everything keeps running." },
  { title: "Documentation included", body: "Every build ships with a written guide and a recorded walkthrough." },
  { title: "30 days of aftercare", body: "We monitor and fix every new build for 30 days after launch at no extra cost." },
];

const week = [
  { day: "Monday", body: "Short written update: progress, blockers, decisions needed." },
  { day: "Mid-week", body: "Demo link or recording of what is working so far." },
  { day: "Friday", body: "Plan for next week and any access or data we need." },
];

const faqs = [
  { q: "How much of our team's time will this take?", a: "About 2 hours in the first week for discovery, then 30 minutes a week for feedback. Testing needs one or two people for a few hours." },
  { q: "What access do you need?", a: "Only what the workflow touches, granted through your own admin settings. We use separate logins where possible and remove access when you ask." },
  { q: "Do you sign NDAs?", a: "Yes. We are happy to sign your NDA or provide ours before discovery." },
  { q: "What if our requirements change mid-project?", a: "Small changes are absorbed. Larger ones are written up with their cost and timeline, and you decide before we do the work." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        title="How we work"
        sub="A clear process with fixed prices, weekly updates and nothing installed on your side. You always know what is happening and what comes next."
      >
        <PrimaryCta tone="mint" />
      </PageHero>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <ProcessScroller
            steps={processSteps}
            heading="Five steps, from first call to a system that keeps running"
            intro="Each step ends with something concrete you can see, check and keep."
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep-sage py-24 lg:py-32">
        <div aria-hidden className="iso-grid-dark pointer-events-none absolute inset-0 opacity-70" />
        <div className="container-x relative">
          <h2 className="t-h1 max-w-3xl text-white" data-reveal>
            What you can count on
          </h2>
          <div className="mt-14 grid gap-px border border-white/20 bg-white/20 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c) => (
              <div key={c.title} className="bg-white p-7 md:p-8" data-reveal>
                <span className="icon-tile">
                  <Check size={22} strokeWidth={1.75} />
                </span>
                <h3 className="t-h3 mt-6">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iso-grid-sage bg-mist py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              A typical project week
            </h2>
            <p className="t-lead mt-5" data-reveal>
              No long meetings. Short written updates you can read in two minutes, and a demo whenever there is something to see.
            </p>
          </div>
          <div className="grid gap-px border border-ink bg-line sm:grid-cols-3">
            {week.map((w) => (
              <div key={w.day} className="bg-white p-7" data-reveal>
                <p className="text-[20px] font-bold">{w.day}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
