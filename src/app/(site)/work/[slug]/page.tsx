import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { CtaBand } from "@/components/ui";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { services } from "@/content/services";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getCaseStudies();
  // A placeholder keeps the route valid for static export when no case studies exist yet.
  return items.length ? items.map((i) => ({ slug: i.slug })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = await getCaseStudy(slug);
  if (!e) return { robots: { index: false } };
  return { title: e.title, description: e.summary, alternates: { canonical: `/work/${slug}` } };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const e = await getCaseStudy(slug);
  if (!e) notFound();

  const body = e.body ? // Keystatic bundles its own Markdoc copy; the AST shape is identical.
    Markdoc.renderers.react(Markdoc.transform(e.body.node as unknown as Parameters<typeof Markdoc.transform>[0]), React) : null;
  const serviceNames = e.services.map((s) => services.find((x) => x.slug === s)).filter(Boolean);

  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-28 lg:pt-36">
        <div aria-hidden className="iso-grid-sage iso-fade pointer-events-none absolute inset-0" />
        <div className="container-x relative pb-16">
          <Link href="/work" className="link-arrow text-[14px]">
            <ArrowLeft size={16} /> All work
          </Link>
          <p className="mt-8 text-[15px] text-slate">
            {e.client}
            {e.industry ? `, ${e.industry}` : ""}
          </p>
          <h1 className="t-h1 mt-3 max-w-4xl">{e.title}</h1>
          <p className="t-lead mt-6 max-w-3xl">{e.summary}</p>
          {e.results.length > 0 && (
            <dl className="mt-12 grid max-w-4xl gap-px border border-line bg-line sm:grid-cols-3">
              {e.results.map((r) => (
                <div key={r.label} className="bg-white p-6">
                  <dd className="text-[36px] font-bold leading-none tracking-tight">{r.value}</dd>
                  <dt className="mt-2 text-[14px] text-slate">{r.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {e.cover && (
        <div className="container-x pt-14">
          <div className="relative aspect-[16/9] overflow-hidden border border-line">
            <Image src={e.cover} alt={`${e.title} cover`} fill priority sizes="(min-width: 1320px) 1240px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <section className="py-20 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <aside className="grid content-start gap-8 lg:sticky lg:top-28 lg:self-start">
            {serviceNames.length > 0 && (
              <div>
                <p className="t-label text-slate">Services</p>
                <ul className="mt-3 grid gap-2">
                  {serviceNames.map((s) => (
                    <li key={s!.slug}>
                      <Link href={`/services/${s!.slug}`} className="text-[15px] font-bold text-deep-sage hover:underline">
                        {s!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {e.tools.length > 0 && (
              <div>
                <p className="t-label text-slate">Tools</p>
                <p className="mt-3 text-[15px] leading-relaxed">{e.tools.join(", ")}</p>
              </div>
            )}
            {e.videoUrl && (
              <a href={e.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-fit">
                <PlayCircle size={18} /> Watch the walkthrough
              </a>
            )}
          </aside>

          <div className="prose-sh">
            {e.challenge && (
              <>
                <h2>The challenge</h2>
                <p>{e.challenge}</p>
              </>
            )}
            {e.solution && (
              <>
                <h2>What we built</h2>
                <p>{e.solution}</p>
              </>
            )}
            {body}
            {e.quote?.text && (
              <figure className="not-prose my-12 border-l-2 border-sage pl-6">
                <blockquote className="text-[21px] font-bold leading-snug text-ink">&ldquo;{e.quote.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-[14px] text-slate">
                  {e.quote.name}
                  {e.quote.role ? `, ${e.quote.role}` : ""}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {e.gallery.length > 0 && (
        <section className="border-t border-line bg-paper py-20">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {e.gallery.map((g, i) =>
              g.image ? (
                <figure key={i}>
                  <div className="relative aspect-[16/10] overflow-hidden border border-line bg-white">
                    <Image src={g.image} alt={g.caption || ""} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  {g.caption && <figcaption className="mt-3 text-[14px] text-slate">{g.caption}</figcaption>}
                </figure>
              ) : null,
            )}
          </div>
        </section>
      )}

      <CtaBand title="Want a result like this?" />
    </>
  );
}
