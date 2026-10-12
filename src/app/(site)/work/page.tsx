import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { CtaBand, PageHero, PrimaryCta } from "@/components/ui";
import { getCaseStudies } from "@/lib/case-studies";
import { services } from "@/content/services";

export const metadata = {
  title: "Work",
  description: "Case studies of automations, AI agents and websites SalnetHub has built for small-to-medium businesses.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const items = await getCaseStudies();
  const name = (slug: string) => services.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <>
      <PageHero
        title="Work"
        sub="What we built, why, and what changed for the team. Every case study names the tools and the result."
      >
        <PrimaryCta />
      </PageHero>

      <section className="py-24 lg:py-28">
        <div className="container-x">
          {items.length === 0 ? (
            <div className="grid gap-10 border border-line bg-white p-8 md:grid-cols-[auto_1fr] md:items-center md:p-14" data-reveal>
              <span className="icon-tile !h-16 !w-16">
                <FolderOpen size={28} strokeWidth={1.5} />
              </span>
              <div>
                <h2 className="t-h2">Case studies are being written up</h2>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate">
                  We are documenting recent client projects with their permission. In the meantime, we are happy to walk you through relevant examples on a call.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryCta />
                  <Link href="/services" className="btn btn-secondary">
                    Explore services
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-px border border-line bg-line md:grid-cols-2">
              {items.map(({ slug, entry }) => (
                <Link key={slug} href={`/work/${slug}`} className="group flex flex-col bg-white" data-reveal>
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
                    {entry.cover ? (
                      <Image src={entry.cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    ) : (
                      <div aria-hidden className="iso-grid absolute inset-0" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <p className="text-[13px] text-slate">
                      {entry.client}
                      {entry.industry ? `, ${entry.industry}` : ""}
                    </p>
                    <h2 className="t-h2 mt-3 group-hover:text-deep-sage">{entry.title}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate">{entry.summary}</p>
                    {entry.results.length > 0 && (
                      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                        {entry.results.slice(0, 3).map((r) => (
                          <div key={r.label}>
                            <dt className="sr-only">{r.label}</dt>
                            <dd className="text-[26px] font-bold leading-none tracking-tight">{r.value}</dd>
                            <dd className="mt-1 text-[13px] text-slate">{r.label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                      {entry.services.slice(0, 2).map((s) => (
                        <span key={s} className="bg-mist px-2.5 py-1 text-[12px] font-bold text-deep-sage">
                          {name(s)}
                        </span>
                      ))}
                      <ArrowRight size={18} className="ml-auto transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
