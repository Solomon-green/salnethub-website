"use client";

import { useRef } from "react";
import { Check, Hand } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

type Node = { label: string; meta: string };

/**
 * The brand "flow line": square nodes for systems, a hairline for the connection,
 * a copper module for the data. Plays when scrolled into view and loops.
 */
export function FlowDiagram({
  nodes,
  approvalIndex,
  tone = "light",
}: {
  nodes: Node[];
  approvalIndex?: number;
  tone?: "light" | "dark";
}) {
  const root = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  useGSAP(
    () => {
      const el = root.current!;
      const items = gsap.utils.toArray<HTMLElement>(".fd-node", el);
      const checks = gsap.utils.toArray<HTMLElement>(".fd-check", el);
      const mod = el.querySelector<HTMLElement>(".fd-module")!;
      const fill = el.querySelector<HTMLElement>(".fd-fill")!;
      if (prefersReducedMotion()) {
        items.forEach((n) => n.classList.add("is-on"));
        gsap.set(checks, { opacity: 1, scale: 1 });
        gsap.set(mod, { opacity: 0 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (c) => {
        const horizontal = Boolean(c.conditions?.desktop);
        const track = el.querySelector<HTMLElement>(".fd-track")!;
        const tb = track.getBoundingClientRect();
        const centres = items.map((n) => {
          const b = n.querySelector<HTMLElement>(".fd-box")!.getBoundingClientRect();
          return horizontal ? b.left + b.width / 2 - tb.left : b.top + b.height / 2 - tb.top;
        });
        const axis = horizontal ? "x" : "y";
        const size = horizontal ? "scaleX" : "scaleY";
        const span = centres[centres.length - 1] - centres[0];

        gsap.set(mod, { [axis]: centres[0], opacity: 0 });
        gsap.set(fill, { [size]: 0 });
        items.forEach((n) => n.classList.remove("is-on"));
        gsap.set(checks, { opacity: 0, scale: 0.6 });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.6,
          paused: true,
          onRepeat: () => items.forEach((n) => n.classList.remove("is-on")),
        });
        tl.set(mod, { opacity: 1 });
        tl.call(() => items[0].classList.add("is-on"));
        tl.to(checks[0], { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" });
        for (let i = 1; i < centres.length; i++) {
          tl.to(mod, { [axis]: centres[i], duration: 0.85, ease: "power2.inOut" }, "+=0.25");
          tl.to(fill, { [size]: (centres[i] - centres[0]) / span, duration: 0.85, ease: "power2.inOut" }, "<");
          tl.call(() => items[i].classList.add("is-on"));
          tl.to(checks[i], { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" });
          if (i === approvalIndex) tl.to({}, { duration: 1.1 });
        }
        tl.to(mod, { opacity: 0, duration: 0.3 }, "+=0.6");
        tl.to(checks, { opacity: 0, scale: 0.6, duration: 0.3 }, "+=1.2");
        tl.to(fill, { [size]: 0, duration: 0.5, ease: "power2.in" }, "<");
        tl.set(mod, { [axis]: centres[0] });

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 10%",
            onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
          },
        });
        return () => {
          st.kill();
          tl.kill();
        };
      });
    },
    { scope: root },
  );

  const line = dark ? "bg-white/20" : "bg-line";
  const boxBase = dark ? "border-white/30 bg-ink-2 text-white" : "border-ink/80 bg-white text-ink";

  return (
    <div ref={root} className="relative">
      <style>{`
        .fd-node.is-on .fd-box{background:${dark ? "#123a2d" : "#E6F7F0"};border-color:${dark ? "#2EE6A6" : "#0A7350"};box-shadow:${dark ? "0 0 24px -6px rgba(46,230,166,.55)" : "none"}}
        .fd-node.is-approval.is-on .fd-box{background:${dark ? "#3a2a21" : "#F6E7DE"};border-color:#C8754A}
        .fd-box{transition:background-color .35s ease,border-color .35s ease,box-shadow .35s ease}
      `}</style>
      <div className="fd-track relative">
        <div aria-hidden className={`absolute left-[27px] top-[28px] bottom-[28px] w-px md:hidden ${line}`} />
        <div aria-hidden className={`fd-fill absolute left-[27px] top-[28px] bottom-[28px] w-px origin-top md:hidden ${dark ? "bg-mint" : "bg-mint-ink"}`} />
        <div
          aria-hidden
          className={`absolute top-[27px] hidden h-px md:block ${line}`}
          style={{ left: `calc(100% / ${nodes.length} / 2)`, right: `calc(100% / ${nodes.length} / 2)` }}
        />
        <div
          aria-hidden
          className={`fd-fill absolute top-[27px] hidden h-px origin-left md:block ${dark ? "bg-mint" : "bg-mint-ink"}`}
          style={{ left: `calc(100% / ${nodes.length} / 2)`, right: `calc(100% / ${nodes.length} / 2)` }}
        />
        <div
          aria-hidden
          className="fd-module pointer-events-none absolute left-[28px] top-0 z-10 -ml-[7px] -mt-[7px] h-[14px] w-[14px] bg-copper md:left-0 md:top-[28px]"
          style={{ opacity: 0 }}
        />
        <ol className="fd-list grid gap-8 md:gap-4">
        {nodes.map((n, i) => (
          <li
            key={n.label}
            className={`fd-node relative flex items-start gap-5 md:flex-col md:items-center md:text-center ${i === approvalIndex ? "is-approval" : ""}`}
          >
            <div className={`fd-box relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center border ${boxBase}`}>
              <span className="fd-check flex items-center justify-center" style={{ opacity: 0 }}>
                {i === approvalIndex ? (
                  <Hand size={20} strokeWidth={1.5} className={dark ? "text-copper" : "text-deep-copper"} />
                ) : (
                  <Check size={20} strokeWidth={1.75} className={dark ? "text-mint" : "text-mint-ink"} />
                )}
              </span>
            </div>
            <div className="pt-1.5 md:pt-0">
              <p className={`text-[15px] font-bold leading-snug ${dark ? "text-white" : "text-ink"}`}>{n.label}</p>
              <p className={`mt-0.5 text-[13px] leading-snug ${i === approvalIndex ? (dark ? "text-copper" : "text-deep-copper") : dark ? "text-on-ink-muted" : "text-slate"}`}>
                {n.meta}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
      <style>{`@media (min-width:768px){.fd-list{grid-template-columns:repeat(${nodes.length},minmax(0,1fr))}}`}</style>
    </div>
  );
}
