import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { CtaBand, PageHero, PrimaryCta, ServiceCard } from "@/components/ui";
import { groups, getService, servicesByGroup, type ServiceGroup } from "@/content/services";

export const metadata = {
  title: "Services",
  description: "Nine services across automation, AI and web: CRM automation, lead routing, reporting, process automation, AI chatbots, AI agents, RAG assistants and websites.",
  alternates: { canonical: "/services" },
};

const fit = [
  { problem: "Leads wait hours or days for a reply", slug: "lead-acquisition-qualification" },
  { problem: "Our CRM is never up to date", slug: "marketing-crm-automation" },
  { problem: "Reports take a day to put together", slug: "data-reporting-analytics" },
  { problem: "Onboarding and approvals keep stalling", slug: "business-process-automation" },
  { problem: "The team spends hours copying data", slug: "task-workflow-automation" },
  { problem: "Visitors leave without asking anything", slug: "ai-chatbots" },
  { problem: "Someone reads and routes every request", slug: "custom-ai-agents" },
  { problem: "Nobody can find the right document", slug: "rag-systems" },
  { problem: "Our website does not bring in leads", slug: "web-solutions" },
];

const order: ServiceGroup[] = ["automation", "ai", "web"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services that take work off your team"
        sub="Automation is what we do most. AI and web projects build on the same foundation: your tools, connected, with clear owners and documentation."
      >
        <PrimaryCta />
        <a href="#fit" className="btn btn-secondary">
          Find your starting point
        </a>
      </PageHero>

      {order.map((g, gi) => {
        const list = servicesByGroup(g);
        return (
          <section key={g} className={`py-24 lg:py-28 ${gi % 2 === 1 ? "border-y border-line bg-paper" : ""}`}>
            <div className="container-x">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="t-h1" data-reveal>
                  {groups[g].name}
                </h2>
                <p className="t-lead max-w-xl" data-reveal>
                  {groups[g].blurb}
                </p>
              </div>
              <div
                className={`mt-12 grid gap-px border border-line bg-line ${
                  list.length === 1 ? "" : list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {list.length === 1 ? (
                  <Link href={`/services/${list[0].slug}`} className="group grid gap-6 bg-white p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10" data-reveal>
                    <ServiceIcon name={list[0].icon} size={32} />
                    <div>
                      <h3 className="t-h2 group-hover:text-deep-sage">{list[0].name}</h3>
                      <p className="mt-2 max-w-2xl text-[16px] text-slate">{list[0].short}</p>
                    </div>
                    <span className="link-arrow">
                      From {list[0].priceFrom} <ArrowRight size={16} />
                    </span>
                  </Link>
                ) : (
                  list.map((s) => <ServiceCard key={s.slug} s={s} />)
                )}
                {g === "automation" && (
                  <div className="flex flex-col justify-between bg-ink p-7 text-white md:p-8" data-reveal>
                    <p className="t-h3">Not sure which one you need?</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-on-ink-muted">
                      Most projects combine two or three of these. The automation audit ranks every opportunity by hours saved.
                    </p>
                    <Link href="/engagements" className="mt-8 inline-flex items-center gap-2 text-[14px] font-bold">
                      About the audit <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section id="fit" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="t-h1" data-reveal>
              Start with the problem
            </h2>
            <p className="t-lead mt-5" data-reveal>
              Pick the sentence that sounds most like your week. That is usually the best first project.
            </p>
          </div>
          <ul className="border-t border-ink">
            {fit.map((f) => {
              const s = getService(f.slug)!;
              return (
                <li key={f.slug} data-reveal>
                  <Link href={`/services/${s.slug}`} className="group grid gap-2 border-b border-line py-6 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-8">
                    <span className="text-[18px] font-bold">&ldquo;{f.problem}&rdquo;</span>
                    <span className="flex items-center gap-3 text-[15px] text-deep-sage">
                      <ServiceIcon name={s.icon} size={18} /> {s.name}
                    </span>
                    <ArrowRight size={18} className="hidden transition-transform group-hover:translate-x-1 md:block" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
