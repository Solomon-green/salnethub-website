import Link from "next/link";
import { site } from "@/content/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/** Shared layout for the privacy policy and terms: hero, at-a-glance cards, sticky contents and numbered sections. */
export function LegalPage({
  label,
  title,
  sub,
  updated,
  glance,
  sections,
}: {
  label: string;
  title: string;
  sub: string;
  updated: string;
  glance: { title: string; text: string }[];
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="hero-light relative overflow-hidden pt-28 lg:pt-36">
        <div className="container-x relative pb-14 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-[14px]">
            <ol className="flex flex-wrap items-center gap-2 text-slate">
              <li>
                <Link href="/" className="font-medium text-accent hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>{label}</li>
            </ol>
          </nav>
          <h1 className="t-page mt-7 max-w-4xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-[clamp(1.075rem,1.4vw,1.25rem)] leading-relaxed text-slate">{sub}</p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-[13px] text-slate">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            Last updated <time className="font-bold text-fg">{updated}</time>
          </p>
        </div>
      </section>

      <section className="border-t border-line py-14 lg:py-16">
        <div className="container-x">
          <p className="t-label text-slate">At a glance</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g) => (
              <li key={g.title} className="rounded-card border border-line bg-surface p-6">
                <p className="text-[16px] font-bold text-fg">{g.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{g.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="On this page" className="rounded-card border border-line bg-surface p-6">
              <p className="t-label text-slate">On this page</p>
              <ol className="mt-4 grid gap-2.5 text-[14px] leading-snug">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span aria-hidden className="w-5 shrink-0 tabular-nums text-stone-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a href={`#${s.id}`} className="text-slate transition-colors hover:text-accent">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="prose-sh prose-post min-w-0">
            {sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id} className={i ? "mt-14 border-t border-line pt-12" : ""}>
                <h2 id={s.id}>
                  <span className="mr-3 text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}

            <div className="mt-16 rounded-card border border-line bg-surface p-6 sm:p-8">
              <p className="!mb-2 text-[17px] font-bold text-fg">Questions about this page?</p>
              <p className="!mb-0 text-[15px] text-slate">
                Email <a href={`mailto:${site.email}`}>{site.email}</a> and a real person will reply, usually within two working days.
              </p>
            </div>
            <p className="mt-8 text-[13px] text-stone-deep">
              Adapted from attorney-drafted templates published by General Legal, PC under the CC0 1.0 license. Provided for transparency; this page is not legal advice to you.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
