"use client";

import { useRef } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

const steps = [
  { tool: "facebook", kind: "Trigger", title: "New lead", app: "Meta lead ads" },
  { tool: null, kind: "AI step", title: "Score and enrich", app: "AI agent" },
  { tool: "hubspot", kind: "Action", title: "Create deal", app: "HubSpot" },
  { tool: "gmail", kind: "Action", title: "Send a personal reply", app: "Gmail" },
  { tool: "googlesheets", kind: "Action", title: "Log to weekly report", app: "Google Sheets" },
];

// Execution output, one group per step, revealed as each step finishes.
const output = [
  [
    ["Lead", "Dana Ortiz, Northwind Dental"],
    ["Source", "Spring campaign, Meta ads"],
  ],
  [["Score", "86 / 100, high intent"]],
  [["Deal", "Created, owner Sarah"]],
  [["Reply", "Sent 1 min 48 s after sign-up"]],
  [["Report", "Row added, dashboard updated"]],
];

/** An n8n-style canvas that runs one lead through a workflow, with the execution log filling in. */
export function WorkflowCanvas() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>(".wf-node");
      const groups = gsap.utils.toArray<HTMLElement>(".wf-group");
      const setState = (el: HTMLElement, s: string) => () => el.setAttribute("data-state", s);

      if (prefersReducedMotion()) {
        nodes.forEach((n) => n.setAttribute("data-state", "done"));
        gsap.set([".wf-fill-x", ".wf-fill-y"], { scale: 1 });
        gsap.set([groups, ".wf-done"], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([groups, ".wf-done"], { opacity: 0, y: 8 });
      gsap.set(".wf-fill-x", { scaleX: 0 });
      gsap.set(".wf-fill-y", { scaleY: 0 });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.6,
        paused: true,
        defaults: { ease: "power2.inOut" },
        onRepeat: () => nodes.forEach((n) => n.setAttribute("data-state", "idle")),
      });
      tl.set([groups, ".wf-done"], { opacity: 0, y: 8 });
      tl.set(".wf-fill-x", { scaleX: 0 });
      tl.set(".wf-fill-y", { scaleY: 0 });
      nodes.forEach((n, i) => {
        tl.call(setState(n, "running"));
        tl.to({}, { duration: i === 1 ? 1.1 : 0.75 });
        tl.call(setState(n, "done"));
        tl.to(groups[i], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
        if (i < nodes.length - 1) {
          const p = (i + 1) / (nodes.length - 1);
          tl.to(".wf-fill-x", { scaleX: p, duration: 0.45 }, "<");
          tl.to(".wf-fill-y", { scaleY: p, duration: 0.45 }, "<");
        }
      });
      tl.to(".wf-done", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.2");
      tl.to({}, { duration: 2.2 });

      ScrollTrigger.create({ trigger: root.current, start: "top 75%", once: true, onEnter: () => tl.play() });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-4 lg:grid-cols-[1fr_340px]">
      {/* Canvas */}
      <div className="panel-dark wf-dots relative overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <p className="text-[12px] text-on-ink-muted">Workflow</p>
            <p className="text-[15px] font-bold">New lead to booked call</p>
          </div>
          <div className="flex items-center gap-3 text-[12px] font-bold">
            <span className="rounded-full flex items-center gap-2 border border-white/15 px-3 py-1.5 text-on-ink-muted">
              <span aria-hidden className="relative inline-flex h-4 w-7 items-center rounded-full bg-copper/90 px-0.5">
                <span className="ml-auto h-3 w-3 rounded-full bg-ink" />
              </span>
              Active
            </span>
            <span className="rounded-full border border-copper/40 bg-copper/10 px-3 py-1.5 text-copper">Demo run</span>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-12">
          {/* Connectors: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-[10%] right-[10%] top-[34px] hidden h-px bg-white/15 lg:block">
            <div className="wf-fill-x h-full origin-left bg-sage" />
          </div>
          <div aria-hidden className="absolute bottom-8 left-[33px] top-8 w-px bg-white/15 lg:hidden">
            <div className="wf-fill-y h-full w-full origin-top bg-sage" />
          </div>

          <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-4">
            {steps.map((s) => (
              <li key={s.title} className="wf-node group flex items-center gap-4 lg:flex-col lg:items-center lg:text-center" data-state="idle">
                <span className="wf-icon relative flex h-[68px] w-[68px] rounded-2xl shrink-0 items-center justify-center border bg-[#1F2124] text-white transition-[border-color,box-shadow] duration-300">
                  {s.tool ? <ToolMark slug={s.tool} size={28} /> : <Sparkles size={28} strokeWidth={1.5} className="text-copper" />}
                  <span className="rounded-full wf-badge absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-sage text-ink">
                    <Check size={13} strokeWidth={3} />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-on-ink-muted">{s.kind}</span>
                  <span className="mt-1 block text-[15px] font-bold leading-snug">{s.title}</span>
                  <span className="mt-0.5 block text-[13px] text-on-ink-muted">{s.app}</span>
                  <span className="wf-status mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold">
                    <span className="st-idle text-white/60">Waiting</span>
                    <span className="st-run items-center gap-1.5 text-copper">
                      <Loader2 size={12} className="animate-spin" /> Running
                    </span>
                    <span className="st-done text-sage">Success</span>
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Execution log */}
      <div className="panel-dark flex flex-col p-5 sm:p-6" aria-label="Execution log for the demo run">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-on-ink-muted">Execution log</p>
        <div className="mt-4 flex-1 space-y-3">
          {output.map((g, i) => (
            <div key={i} className="wf-group space-y-3">
              {g.map(([k, v]) => (
                <dl key={k} className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] pb-3 text-[14px]">
                  <dt className="text-on-ink-muted">{k}</dt>
                  <dd className="text-right font-bold">{v}</dd>
                </dl>
              ))}
            </div>
          ))}
        </div>
        <div className="rounded-card wf-done mt-5 flex items-center gap-3 border border-sage/40 bg-sage/10 p-4">
          <span className="rounded-xl flex h-8 w-8 shrink-0 items-center justify-center bg-sage text-ink">
            <Check size={18} strokeWidth={2.5} />
          </span>
          <span>
            <span className="block text-[14px] font-bold text-sage">Completed in 1 min 52 s</span>
            <span className="block text-[12px] text-on-ink-muted">Manual steps: 0</span>
          </span>
        </div>
      </div>

      <style>{`
        .wf-dots{background-image:radial-gradient(rgb(255 255 255 / .09) 1px,transparent 1px),linear-gradient(180deg,rgb(255 255 255 / .05),rgb(255 255 255 / .015));background-size:22px 22px,auto}
        .wf-node .wf-icon{border-color:rgb(255 255 255 / .14)}
        .wf-node .wf-badge{opacity:0;transform:scale(.4);transition:opacity .25s,transform .35s cubic-bezier(.22,1,.36,1)}
        .wf-node .st-run,.wf-node .st-done{display:none}
        .wf-node[data-state=running] .wf-icon{border-color:#C8754A;box-shadow:0 0 0 4px rgb(200 117 74 / .12),0 0 34px -4px rgb(200 117 74 / .6)}
        .wf-node[data-state=running] .st-idle,.wf-node[data-state=done] .st-idle{display:none}
        .wf-node[data-state=running] .st-run{display:inline-flex}
        .wf-node[data-state=done] .st-done{display:inline}
        .wf-node[data-state=done] .wf-icon{border-color:rgb(108 140 122 / .75)}
        .wf-node[data-state=done] .wf-badge{opacity:1;transform:scale(1)}
      `}</style>
    </div>
  );
}
