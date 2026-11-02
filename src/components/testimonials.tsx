import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getCaseStudies, showSamples } from "@/lib/case-studies";

const testimonials = allTestimonials.filter((t) => showSamples || !t.sample);

/** True when the quote cards will render, so other sections can link to them. */
export const hasTestimonials = testimonials.length > 0;
import { testimonials as allTestimonials, upwork } from "@/content/proof";

/** Upwork stats line ("5.0 on Upwork · 100% Job Success · Top Rated"). Renders nothing until filled in. */
export function UpworkProof({ className = "" }: { className?: string }) {
  const parts = [
    upwork.rating != null ? `${upwork.rating.toFixed(1)} on Upwork` : null,
    upwork.jobSuccess != null ? `${upwork.jobSuccess}% Job Success` : null,
    upwork.badge,
  ].filter(Boolean);
  if (!parts.length) return null;
  const body = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {upwork.rating != null && (
        <span className="flex gap-0.5 text-fg" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
      )}
      {parts.join(" · ")}
    </span>
  );
  return upwork.profileUrl ? (
    <a href={upwork.profileUrl} target="_blank" rel="noopener" className="hover:underline">
      {body}
    </a>
  ) : (
    body
  );
}

/** Outlined quote mark, drawn rather than typed so it stays crisp at any size. */
function QuoteMark() {
  return (
    <svg aria-hidden viewBox="0 0 64 48" className="h-12 w-16 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 44V27C4 13 11 5 25 3l1.5 5C18 10 14.5 15 14 22h12v22H4Z" />
      <path d="M36 44V27c0-14 7-22 21-24l1.5 5C50 10 46.5 15 46 22h12v22H36Z" />
    </svg>
  );
}

/**
 * Client quotes as "story cards": white card with one sweeping rounded corner, outlined quote mark,
 * client logo top-right, italic quote, attribution under a rule. Skipped while content/proof.ts is empty.
 */
export async function Testimonials({ moreLink = true }: { moreLink?: boolean }) {
  if (!testimonials.length) return null;
  const hasStories = moreLink && (await getCaseStudies()).length > 0;
  return (
    <section id="customer-stories" className="relative scroll-mt-16 border-t border-line py-24 lg:scroll-mt-[72px] lg:py-32">
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="t-h1 max-w-2xl" data-reveal>
              What clients say after launch
            </h2>
          </div>
          <UpworkProof className="text-[15px] font-bold" />
        </div>
        <div className="mt-14 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.quote}
              className="flex flex-col rounded-br-[72px] border border-line bg-surface p-7 text-fg shadow-[0_30px_60px_-44px_rgb(0_0_0/0.4)] md:p-8"
              data-reveal
            >
              <div className="flex items-start justify-between gap-6">
                <QuoteMark />
                {t.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.logo} alt={t.company ?? ""} className="h-12 w-auto max-w-[150px] object-contain" />
                )}
              </div>
              {t.result && <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{t.result}</p>}
              <blockquote className="mt-4 text-[17px] italic leading-relaxed text-stone-deep">{t.quote}</blockquote>
              <figcaption className="mt-8 border-t border-line pt-5 text-[15px] leading-snug">
                <span className="block font-bold">{t.name}</span>
                <span className="block text-slate">
                  {t.role}
                  {t.source && <span className="text-[13px]"> · via {t.source}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        {hasStories && (
          <div className="mt-14 flex justify-center" data-reveal>
            <Link href="/customer-stories" className="btn btn-secondary">
              More customer stories
              <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
