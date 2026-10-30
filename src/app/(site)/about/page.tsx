import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, PrimaryCta } from "@/components/ui";
import { principles } from "@/content/process";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export const metadata = {
  title: "About Our Business Automation & AI Agency",
  description: "SalnetHub is an automation and AI company for small-to-medium teams and businesses. We connect your systems so your team gets its time back.",
  alternates: { canonical: "/about" },
};

const who = [
  { title: "Service businesses", body: "Agencies, consultancies, accounting and legal practices where client admin eats billable hours." },
  { title: "E-commerce and retail", body: "Online stores and wholesalers handling orders, stock and customer messages across several tools." },
  { title: "Property and logistics", body: "Teams coordinating bookings, maintenance, quotes and documents with many moving parts." },
  { title: "Growing sales teams", body: "Teams of 3 to 50 reps who need leads routed, followed up and reported without extra admin." },
];

const believe = [
  "Your team should spend its time on work that needs a person.",
  "Automation should use the tools you already pay for.",
  "Every system we build should be documented and owned by you.",
  "AI should answer from your data, with a person in control.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero
        title="We connect systems so teams get their time back"
        sub="SalnetHub is an automation and AI company for small-to-medium teams and businesses. We build the connections between your tools so work moves on its own."
      >
        <PrimaryCta tone="lime" />
      </PageHero>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-24">
          <h2 className="t-h1" data-reveal>
            Most teams do not need more software. They need the software they have to work together.
          </h2>
          <div className="grid content-start gap-6 text-[17px] leading-relaxed text-slate" data-reveal>
            <p>
              A typical small-to-medium business runs on 10 to 30 tools: a CRM, Google Workspace, accounting, a project board, forms, chat. Each one works well on its own. The trouble is the space between them, where people copy data, chase updates and rebuild the same report every week.
            </p>
            <p>
              That is where we work. We map how your work actually happens, then connect your tools so information moves on its own. Where judgment is needed, we add AI that works from your data and keeps a person in control.
            </p>
            <p>
              Automation is our core. We also build websites and AI assistants, because they work best when they are part of the same connected system.
            </p>
            <p className="mt-4 border-l-[3px] border-brand pl-6 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.2] tracking-tight text-fg">
              Smarter systems.
              <br />
              Better decisions.
              <br />
              <span className="t-accent">Greater impact.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x relative">
          <h2 className="t-h1 max-w-2xl" data-reveal>
            What we believe
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {believe.map((b) => (
              <li key={b} className="rounded-card flex gap-4 border border-line bg-surface p-8 text-[20px] font-bold leading-snug md:p-10" data-reveal>
                <span aria-hidden className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x relative">
          <h2 className="t-h1 max-w-3xl" data-reveal>
            Who we work with
          </h2>
          <p className="t-lead mt-5 max-w-3xl" data-reveal>
            Small-to-medium teams and businesses, usually between 5 and 200 people, that have outgrown doing everything by hand.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {who.map((w) => (
              <div key={w.title} className="border border-line rounded-card bg-surface p-7" data-reveal>
                <h3 className="t-h3">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="t-h1" data-reveal>
              How we behave
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Four principles shape how we write, build and support.
            </p>
            <Link href="/how-we-work" className="link-arrow mt-8 inline-flex" data-reveal>
              How we work <ArrowRight size={16} />
            </Link>
          </div>
          <div className="border-t border-fg">
            {principles.map((p) => (
              <div key={p.name} className="grid gap-2 border-b border-line py-7 md:grid-cols-[0.5fr_1.5fr] md:gap-10" data-reveal>
                <p className="text-[22px] font-bold tracking-tight">{p.name}</p>
                <p className="text-[16px] leading-relaxed text-slate">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
