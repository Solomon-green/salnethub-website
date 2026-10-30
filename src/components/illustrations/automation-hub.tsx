"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ToolMark } from "@/components/brand";
import { getIntegration } from "@/content/integrations";
import { prefersReducedMotion } from "@/components/motion/gsap";

const sources = ["facebook", "googleforms", "gmail"];
const targets = ["hubspot", "googlesheets", "whatsapp"];

// What the activity card cycles through: one lead's journey plus the background admin.
const events = [
  { tool: "facebook", text: "New lead from Meta ads", meta: "Scored 86, routed to sales" },
  { tool: "hubspot", text: "Deal created in HubSpot", meta: "Owner assigned automatically" },
  { tool: "gmail", text: "Reply sent to the lead", meta: "1 min 48 s after sign-up" },
  { tool: "whatsapp", text: "Reminder sent on WhatsApp", meta: "Call booked for Thursday" },
  { tool: "googleforms", text: "Intake form received", meta: "Client folder and tasks created" },
  { tool: "googlesheets", text: "Weekly report updated", meta: "Ready before Monday" },
];
const ages = ["just now", "8 s ago", "21 s ago"];

type Beam = { d: string; dir: "in" | "out"; i: number };

/** Animated-beam hub: the tools a client already uses, wired through one automation layer. */
export function AutomationHub({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [head, setHead] = useState(0);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const h = hub.current!.getBoundingClientRect();
      const hx = h.left - b.left;
      const hy = h.top - b.top + h.height / 2;
      const next: Beam[] = [];
      nodes.current.forEach((n, i) => {
        if (!n) return;
        const r = n.getBoundingClientRect();
        const y = r.top - b.top + r.height / 2;
        if (i < sources.length) {
          const x1 = r.right - b.left;
          const x2 = hx;
          const mid = (x1 + x2) / 2;
          next.push({ d: `M${x1} ${y} C${mid} ${y}, ${mid} ${hy}, ${x2} ${hy}`, dir: "in", i });
        } else {
          const x1 = hx + h.width;
          const x2 = r.left - b.left;
          const mid = (x1 + x2) / 2;
          next.push({ d: `M${x1} ${hy} C${mid} ${hy}, ${mid} ${y}, ${x2} ${y}`, dir: "out", i });
        }
      });
      setBeams(next);
      setSize({ w: b.width, h: b.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = window.setInterval(() => setHead((h) => (h + 1) % events.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  const feed = [0, 1, 2].map((k) => events[(head - k + events.length) % events.length]);

  const node = (slug: string, i: number) => (
    <div key={slug} className="flex flex-col items-center gap-2">
      <div
        ref={(el) => {
          nodes.current[i] = el;
        }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-fg shadow-[0_12px_30px_-18px_rgb(0_0_0/0.35)] sm:h-16 sm:w-16"
      >
        <ToolMark slug={slug} size={26} />
      </div>
      <span className="text-[11px] font-bold text-slate sm:text-[12px]">{getIntegration(slug)?.name}</span>
    </div>
  );

  return (
    <div className={className}>
      <div ref={box} className="relative grid grid-cols-[auto_1fr_auto] items-center">
        <svg aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" width={size.w} height={size.h}>
          <defs>
            <filter id="beam-glow" x="-10%" y="-50%" width="120%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {beams.map((b) => (
            <g key={b.i}>
              <path d={b.d} fill="none" stroke="rgb(0 0 0 / 0.12)" strokeWidth="1.5" />
              <path
                d={b.d}
                pathLength={1}
                fill="none"
                stroke="#3A3B3F"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#beam-glow)"
                className="beam-pulse"
                style={{ animationDelay: `${(b.dir === "in" ? b.i : b.i - sources.length + 0.5) * 0.7}s` }}
              />
            </g>
          ))}
        </svg>

        <div className="relative flex flex-col gap-7 sm:gap-9">{sources.map((s, i) => node(s, i))}</div>

        <div className="relative flex justify-center py-6">
          <div ref={hub} className="relative">
            <span aria-hidden className="hub-ring absolute inset-0 rounded-2xl" />
            <div className="rounded-2xl relative flex h-20 w-20 items-center justify-center border border-brand/50 bg-raised shadow-[0_20px_50px_-14px_rgb(0_0_0/0.55)] sm:h-24 sm:w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/salnethub-icon-reversed.svg" alt="" width={44} height={44} className="h-10 w-10 sm:h-11 sm:w-11" />
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-7 sm:gap-9">{targets.map((s, i) => node(s, i + sources.length))}</div>
      </div>

      <div className="mx-auto mt-8 max-w-[420px] rounded-panel border border-line bg-surface p-4 shadow-[0_24px_60px_-36px_rgb(0_0_0/0.4)] sm:p-5" aria-label="Example automation activity">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-slate">
          <span>Automation activity</span>
          <span className="flex items-center gap-2 text-stone-deep">
            <span aria-hidden className="rounded-full live-dot h-1.5 w-1.5 bg-brand" />
            Live demo
          </span>
        </div>
        <ul className="mt-3 space-y-1" aria-live="off">
          {feed.map((e, k) => (
            <li
              key={`${head}-${k}`}
              className={`flex items-center gap-3 py-2 ${k === 0 ? "feed-in" : ""} ${k > 0 ? "border-t border-line" : ""}`}
              
            >
              <span className="rounded-xl flex h-8 w-8 shrink-0 items-center justify-center bg-canvas text-fg">
                <ToolMark slug={e.tool} size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-bold text-fg">{e.text}</span>
                <span className="block truncate text-[12px] text-slate">{e.meta}</span>
              </span>
              <span className="shrink-0 text-[11px] text-slate">{ages[k]}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .beam-pulse{stroke-dasharray:0.16 1;stroke-dashoffset:1.16;animation:beam 2.4s cubic-bezier(.45,0,.25,1) infinite}
        @keyframes beam{to{stroke-dashoffset:0}}
        .hub-ring{border:1px solid rgb(71 91 255 / .6);animation:hub-ring 2.4s cubic-bezier(.22,1,.36,1) infinite}
        @keyframes hub-ring{from{transform:scale(1);opacity:.8}to{transform:scale(1.55);opacity:0}}
        .live-dot{animation:live 1.6s ease-in-out infinite}
        @keyframes live{50%{opacity:.25}}
        .feed-in{animation:feed-in 600ms cubic-bezier(.22,1,.36,1) both}
        @keyframes feed-in{from{opacity:0;transform:translateY(-8px)}}
        @media (prefers-reduced-motion: reduce){.beam-pulse{animation:none;stroke-dasharray:none;stroke-opacity:.5}.hub-ring,.live-dot,.feed-in{animation:none}}
      `}</style>
    </div>
  );
}
