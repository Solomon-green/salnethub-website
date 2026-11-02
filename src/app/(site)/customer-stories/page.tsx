import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";
import { CtaBand, PageHero, PrimaryCta } from "@/components/ui";
import { StoriesBrowser, type StoryCard } from "@/components/stories-browser";
import { Testimonials } from "@/components/testimonials";
import { getCaseStudies } from "@/lib/case-studies";
import { outcomes, outcomesFor } from "@/content/outcomes";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const empty = (await getCaseStudies()).length === 0;
  return {
    title: "Automation Customer Stories & Case Studies",
    description: "How small businesses use SalnetHub automations, AI agents and websites: what we built, the tools involved and the measurable results for each team.",
    alternates: { canonical: "/customer-stories" },
    // Keep the empty placeholder out of search results until real stories are published.
    ...(empty && { robots: { index: false, follow: true } }),
  };
}

export default async function CustomerStoriesPage() {
  const items = await getCaseStudies();
  const featured = items.filter((i) => i.entry.featured).slice(0, 3);
  // Without hand-picked features, the newest few lead once there are enough to fill both areas.
  const spotlight = featured.length ? featured : items.length > 3 ? items.slice(0, 3) : [];

  const cards: StoryCard[] = items.map(({ slug, entry }) => ({
    slug,
    client: entry.client,
    title: entry.title,
    logo: entry.logo,
    cover: entry.cover,
    categories: outcomesFor([...entry.services]),
  }));
  const used = new Set(cards.flatMap((c) => c.categories));
  const categories = outcomes.map((o) => o.label).filter((l) => used.has(l));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Customer stories", path: "/customer-stories" }])} />
      <PageHero
        title="Customer stories"
        sub="How teams like yours stopped copying, chasing and re-typing. Every story names what we built, the tools involved and what changed."
      >
        <PrimaryCta tone="cta" />
      </PageHero>

      {items.length === 0 ? (
        <section className="py-24 lg:py-28">
          <div className="container-x">
            <div className="rounded-card grid gap-10 border border-line bg-surface p-8 md:grid-cols-[auto_1fr] md:items-center md:p-14" data-reveal>
              <span className="icon-tile !h-16 !w-16">
                <FolderOpen size={28} strokeWidth={1.5} />
              </span>
              <div>
                <h2 className="t-h2">Customer stories are being written up</h2>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate">
                  We are documenting recent client projects with their permission. In the meantime, we are happy to walk you through relevant
                  examples on a call.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryCta />
                  <Link href="/services" className="btn btn-secondary">
                    Explore services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {spotlight.length > 0 && (
            <section className="pt-20 lg:pt-24">
              <div className="container-x">
                {/* Mosaic: one story fills the row, two split it, three = a large tile with two stacked beside it */}
                <ul
                  className={`grid auto-rows-[260px] gap-4 ${
                    spotlight.length === 3 ? "md:grid-cols-2 lg:grid-cols-3" : spotlight.length === 2 ? "md:grid-cols-2" : ""
                  }`}
                >
                  {spotlight.map(({ slug, entry }, i) => (
                    <li key={slug} className={spotlight.length === 3 && i === 0 ? "md:col-span-2 lg:row-span-2" : ""} data-reveal>
                      <Link href={`/customer-stories/${slug}`} className="group band-glow on-dark relative flex h-full flex-col justify-end overflow-hidden rounded-card p-7 text-white">
                        {entry.cover && (
                          <Image
                            src={entry.cover}
                            alt=""
                            fill
                            sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        )}
                        {/* Dark fade at the foot keeps white text readable on any cover, without tinting it */}
                        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                        <span className="relative">
                          <span className={`block font-bold leading-tight tracking-tight ${i === 0 ? "text-[clamp(2rem,3.4vw,2.8rem)]" : "text-[26px]"}`}>
                            {entry.client}
                          </span>
                          <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-on-ink-muted">{entry.title}</span>
                          <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-bold text-accent">
                            Read their story <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className="py-20 lg:py-24">
            <div className="container-x">
              <h2 className="t-h2 text-center" data-reveal>
                All customer stories
              </h2>
              <div className="mt-8">
                <StoriesBrowser items={cards} categories={categories} />
              </div>
            </div>
          </section>
        </>
      )}

      <Testimonials moreLink={false} />

      <CtaBand />
    </>
  );
}
