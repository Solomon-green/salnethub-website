"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

const bars = [38, 52, 46, 61, 58, 72, 69, 84];
const line = [62, 58, 64, 55, 49, 46, 40, 34];
const sources = ["CRM", "Accounting", "Store and ads"];

export function ChartIllustration() {
  const root = useRef<HTMLDivElement>(null);
  const linePath = line.map((v, i) => `${i === 0 ? "M" : "L"}${20 + i * 40} ${v}`).join(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
      tl.from(".ci-src", { opacity: 0, x: -12, duration: 0.5, stagger: 0.12, ease: "power2.out" })
        .from(".ci-pipe", { scaleX: 0, transformOrigin: "left center", duration: 0.5, stagger: 0.1, ease: "power2.inOut" }, "-=0.2")
        .from(".ci-bar", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.7, stagger: 0.06, ease: "power3.out" }, "-=0.1")
        .from(".ci-line", { drawSVG: "0%", duration: 1.1, ease: "power2.inOut" }, "<0.2")
        .from(".ci-kpi", { opacity: 0, y: 8, duration: 0.5, stagger: 0.1 }, "<");
      const counter = { v: 0 };
      tl.to(counter, {
        v: 48210,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          const el = root.current?.querySelector(".ci-count");
          if (el) el.textContent = `$${Math.round(counter.v).toLocaleString("en-US")}`;
        },
      }, "<");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid items-center gap-6 md:grid-cols-[0.8fr_1.7fr] md:gap-0">
      <div className="grid gap-3">
        {sources.map((s) => (
          <div key={s} className="flex items-center">
            <div className="ci-src flex-1 border border-ink bg-white px-4 py-3 text-[14px] font-bold">{s}</div>
            <div className="ci-pipe hidden h-px w-10 bg-ink md:block" />
          </div>
        ))}
        <p className="text-[12px] text-slate">Synced every 15 minutes</p>
      </div>

      <div className="border border-ink bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-[14px] font-bold">Weekly revenue dashboard</p>
          <p className="text-[12px] text-mint-ink">Live</p>
        </div>
        <div className="grid grid-cols-3 border-b border-line">
          <div className="ci-kpi border-r border-line px-5 py-4">
            <p className="text-[12px] text-slate">Revenue this week</p>
            <p className="ci-count mt-1 text-[22px] font-bold tracking-tight">$48,210</p>
          </div>
          <div className="ci-kpi border-r border-line px-5 py-4">
            <p className="text-[12px] text-slate">New deals</p>
            <p className="mt-1 text-[22px] font-bold tracking-tight">37</p>
          </div>
          <div className="ci-kpi px-5 py-4">
            <p className="text-[12px] text-slate">Lead reply time</p>
            <p className="mt-1 text-[22px] font-bold tracking-tight text-deep-copper">2 min</p>
          </div>
        </div>
        <svg viewBox="0 0 340 120" className="w-full px-3 py-4" role="img" aria-label="Example chart: revenue rising week on week while reply time falls.">
          {[30, 60, 90].map((y) => (
            <line key={y} x1="0" x2="340" y1={y} y2={y} stroke="#D4D8D6" strokeWidth="1" />
          ))}
          {bars.map((h, i) => (
            <rect key={i} className="ci-bar" x={8 + i * 40} y={110 - h} width="24" height={h} fill={i === bars.length - 1 ? "#6C8C7A" : "#17191C"} />
          ))}
          <path className="ci-line" d={linePath} fill="none" stroke="#C8754A" strokeWidth="2" />
        </svg>
        <p className="border-t border-line px-5 py-2.5 text-[11px] text-slate">Example dashboard with sample data.</p>
      </div>
    </div>
  );
}
