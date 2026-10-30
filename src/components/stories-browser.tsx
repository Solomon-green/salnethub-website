"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type StoryCard = {
  slug: string;
  client: string;
  title: string;
  logo: string | null;
  cover: string | null;
  categories: string[];
};

/** Filter chips plus the card grid on /customer-stories. */
export function StoriesBrowser({ items, categories }: { items: StoryCard[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? items : items.filter((i) => i.categories.includes(active));

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter stories">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-[14px] font-bold transition-colors ${
                active === c ? "border-stone-deep bg-stone-deep text-white" : "border-line bg-surface text-fg hover:border-stone-deep"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/customer-stories/${s.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-[0_24px_50px_-36px_rgb(0_0_0/0.35)]"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-line bg-canvas">
                {s.logo ? (
                  <Image src={s.logo} alt={s.client} width={200} height={72} className="h-14 w-auto max-w-[70%] object-contain" />
                ) : s.cover ? (
                  <Image src={s.cover} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <span className="px-6 text-center text-[24px] font-bold tracking-tight text-stone-deep">{s.client}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[15px] font-bold">{s.client}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.title}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-sky">
                  Read their story <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
                {s.categories.length > 0 && (
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {s.categories.map((c) => (
                      <span key={c} className="rounded-full bg-mist px-2.5 py-1 text-[12px] font-bold text-stone-deep">
                        {c}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
