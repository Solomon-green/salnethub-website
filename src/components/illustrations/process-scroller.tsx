"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

type Step = { step: string; title: string; body: string; output: string };

export function ProcessScroller({ steps, heading, intro }: { steps: Step[]; heading: string; intro: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".ps-card");
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (prefersReducedMotion()) return;
      gsap.to(".ps-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".ps-cards", start: "top 55%", end: "bottom 55%", scrub: 0.4 },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="t-h1 max-w-md" data-reveal>
          {heading}
        </h2>
        <p className="t-lead mt-5 max-w-md" data-reveal>
          {intro}
        </p>
        <ol className="relative mt-10 hidden gap-0 lg:grid">
          <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
          <span aria-hidden className="ps-progress absolute bottom-3 left-[5px] top-3 w-px origin-top scale-y-0 bg-ink" />
          {steps.map((s, i) => (
            <li key={s.step} className="relative flex items-center gap-5 py-2.5">
              <span
                className={`relative z-[1] h-[11px] w-[11px] border transition-colors duration-300 ${
                  i === active ? "border-copper bg-copper" : i < active ? "border-ink bg-ink" : "border-line bg-white"
                }`}
              />
              <span className={`text-[17px] font-bold transition-colors duration-300 ${i === active ? "text-ink" : "text-slate"}`}>{s.step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="ps-cards grid gap-5">
        {steps.map((s, i) => (
          <article
            key={s.step}
            className={`ps-card border p-7 transition-colors duration-500 md:p-10 ${i === active ? "border-ink bg-white" : "border-line bg-white"}`}
          >
            <p className="t-label text-deep-sage">{s.step}</p>
            <h3 className="t-h2 mt-3">{s.title}</h3>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-slate">{s.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-5 text-[14px]">
              <span className="h-2.5 w-2.5 bg-copper" aria-hidden />
              <span className="text-slate">You receive:</span>
              <span className="font-bold">{s.output}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
