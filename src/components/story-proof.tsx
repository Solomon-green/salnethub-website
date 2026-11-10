import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCaseStudies } from "@/lib/case-studies";

// "Customer story" block for service and industry pages: the most relevant real story for this
// service, with its results and quote. Renders nothing when no story uses the service.
export async function StoryProof({ service, heading = "A real build, in production" }: { service: string; heading?: string }) {
  const all = await getCaseStudies();
  // Prefer the story where this service is listed first (its main service), not just mentioned.
  const match = all
    .filter((c) => c.entry.services.includes(service))
    .sort((a, b) => a.entry.services.indexOf(service) - b.entry.services.indexOf(service))[0];
  if (!match) return null;
  const { slug, entry: e } = match;

  return (
    <section className="border-t border-line py-24 lg:py-28">
      <div className="container-x">
        <p className="t-label text-slate">Customer story</p>
        <h2 className="t-h2 mt-3 max-w-3xl">{heading}</h2>
        <Link
          href={`/customer-stories/${slug}`}
          className="group mt-10 grid overflow-hidden rounded-card border border-line bg-surface md:grid-cols-[1.1fr_1fr]"
        >
          {e.cover && (
            <div className="relative aspect-[16/9] md:aspect-auto">
              <Image
                src={e.cover}
                alt={e.coverAlt || e.title}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          )}
          <div className="flex flex-col p-7 md:p-9">
            <p className="text-[14px] text-slate">{e.client}</p>
            <h3 className="mt-2 text-[24px] font-bold leading-tight tracking-tight">{e.title}</h3>
            {e.results.length > 0 && (
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {e.results.map((r) => (
                  <div key={r.label}>
                    <dd className="text-[22px] font-bold leading-none text-accent">{r.value}</dd>
                    <dt className="mt-1.5 text-[12px] leading-snug text-slate">{r.label}</dt>
                  </div>
                ))}
              </dl>
            )}
            {e.quote?.text && (
              <blockquote className="mt-6 border-l-2 border-line pl-4 text-[15px] italic leading-relaxed text-stone-deep">
                “{e.quote.text}”
                <span className="mt-2 block text-[13px] not-italic text-slate">{e.quote.name}</span>
              </blockquote>
            )}
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-bold">
              Read the full story <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
