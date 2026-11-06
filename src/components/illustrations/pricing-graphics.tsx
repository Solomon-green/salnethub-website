"use client";

import { useRef } from "react";
import { Check, X } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { leadExample, pricing, timeExample } from "@/content/engagements";

// Finance-themed explainers for the pricing page. Markup renders the FINAL state, so reduced motion
// (and no-JS) shows the finished picture; GSAP only animates towards it once, on scroll.

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const hatch = "bg-[repeating-linear-gradient(135deg,var(--color-stone)_0_2px,transparent_2px_7px)]";

function countUp(tl: gsap.core.Timeline, el: Element | null | undefined, to: number, position: gsap.Position, prefix = "") {
  if (!el) return;
  const c = { v: 0 };
  tl.to(
    c,
    {
      v: to,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${prefix}${money(c.v)}`;
      },
    },
    position,
  );
}

/* 1. Payment schedule rail: what is due at each stage. */
export function PaymentRail() {
  const root = useRef<HTMLDivElement>(null);
  const stops = [
    { when: "Day 0", label: "Free call", due: "$0 due" },
    { when: `Days 1 to ${pricing.pilotDays}`, label: "Pilot", due: `$0 or ${pricing.pilotFee}, refundable` },
    { when: `Day ${pricing.pilotDays + 1} onwards`, label: "Results", due: "Pay only on results" },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });
      tl.fromTo(".pr-rail-x", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "none" }, 0)
        .fromTo(".pr-rail-y", { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "none" }, 0)
        .from(".pr-stop", { opacity: 0, scale: 0.92, duration: 0.4, stagger: 0.5, ease: "power3.out" }, 0)
        .from(".pr-due", { opacity: 0, y: 6, duration: 0.4, stagger: 0.5, ease: "power3.out" }, 0.15);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative" aria-label="Payment schedule: free call, pilot, then pay only on results">
      {/* rails: horizontal from md, vertical below */}
      <div aria-hidden className="pr-rail-x absolute left-[18px] right-[18px] top-[17px] hidden h-[2px] origin-left bg-fg md:block" />
      <div aria-hidden className="pr-rail-y absolute bottom-6 left-[17px] top-6 w-[2px] origin-top bg-fg md:hidden" />
      <ol className="relative grid gap-6 md:grid-cols-3 md:gap-4">
        {stops.map((s, i) => (
          <li key={s.label} className="flex gap-4 md:block">
            <span className="pr-stop relative z-10 grid size-9 shrink-0 place-items-center rounded-full border-2 border-fg bg-surface text-[13px] font-bold tabular-nums">
              {i === stops.length - 1 ? "$" : i + 1}
            </span>
            <div className="md:mt-4">
              <p className="text-[12px] font-bold uppercase tracking-wide text-slate">{s.when}</p>
              <p className="mt-0.5 text-[15px] font-bold">{s.label}</p>
              <p
                className={`pr-due mt-2 inline-block rounded-full px-3 py-1 text-[13px] font-bold tabular-nums ${
                  i === stops.length - 1 ? "bg-deep text-white" : "border border-line bg-surface"
                }`}
              >
                {s.due}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 2. Four paid-for leads, one booking, and the receipt that follows. */
export function AppointmentReceipt() {
  const root = useRef<HTMLDivElement>(null);
  const n = Math.round(1 / leadExample.bookRate);
  const apptCost = leadExample.costPerLead / leadExample.bookRate;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } });
      tl.fromTo(".pr-coin", { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power3.out" })
        .from(".pr-spent", { opacity: 0, duration: 0.3 }, "-=0.1")
        .to(".pr-coin-miss", { opacity: 0.32, duration: 0.35, ease: "power2.out" }, "+=0.25")
        .from(".pr-tag-miss", { opacity: 0, y: -4, duration: 0.3, stagger: 0.05 }, "<")
        .from(".pr-coin-hit-fill", { opacity: 0, scale: 0.9, duration: 0.3, ease: "power3.out" }, "<")
        .from(".pr-tag-hit", { opacity: 0, y: -4, duration: 0.3 }, "<0.1")
        .from(".pr-receipt", { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" }, "+=0.1");
      countUp(tl, q(".pr-r-cost")[0], apptCost, "<0.15");
      tl.from(".pr-r-ours", { opacity: 0, y: 6, duration: 0.35, ease: "power3.out" }, "+=0.05");
      countUp(tl, q(".pr-r-price")[0], leadExample.ourPrice, "<", "~");
      tl.fromTo(
        ".pr-stamp",
        { opacity: 0, scale: 1.25, rotate: -14 },
        { opacity: 1, scale: 1, rotate: -8, duration: 0.3, ease: "power4.out" },
        "+=0.1",
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid items-center gap-6 sm:grid-cols-[1fr_1fr]">
      <div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: n }, (_, i) => {
            const hit = i === 0;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <span
                  className={`pr-coin relative grid size-14 place-items-center rounded-full border-2 border-fg bg-surface ${hit ? "" : "pr-coin-miss opacity-[.32]"}`}
                >
                  {hit && <span aria-hidden className="pr-coin-hit-fill absolute inset-0 rounded-full bg-deep" />}
                  <span aria-hidden className={`absolute inset-[5px] rounded-full border border-dashed ${hit ? "border-white/40" : "border-stone"}`} />
                  <span className={`relative text-[13px] font-bold tabular-nums ${hit ? "text-white" : ""}`}>{money(leadExample.costPerLead)}</span>
                </span>
                {hit ? (
                  <span className="pr-tag-hit flex items-center gap-1 whitespace-nowrap text-[11px] font-bold">
                    <Check size={12} strokeWidth={3} /> Booked
                  </span>
                ) : (
                  <span className="pr-tag-miss flex items-center gap-1 whitespace-nowrap text-[11px] text-slate">
                    <X size={12} strokeWidth={2.5} /> Lost
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <p className="pr-spent mt-4 text-[13px] text-slate">
          {n} leads × {money(leadExample.costPerLead)} = <span className="font-bold text-fg tabular-nums">{money(apptCost)}</span> spent for 1 booking
        </p>
      </div>

      {/* Receipt */}
      <div className="pr-receipt relative">
        <div className="relative rounded-t-xl border border-b-0 border-line bg-canvas px-5 pb-5 pt-4 font-mono text-[12px]">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-slate">Cost per booking</p>
          <div className="mt-3 flex justify-between border-b border-dashed border-stone pb-2">
            <span className="text-slate">Today</span>
            <span className="pr-r-cost font-bold tabular-nums">{money(apptCost)}</span>
          </div>
          <div className="pr-r-ours mt-2 flex justify-between">
            <span className="text-slate">SalnetHub</span>
            <span className="pr-r-price text-[16px] font-bold tabular-nums">~{money(leadExample.ourPrice)}</span>
          </div>
          <p className="pr-r-ours mt-1 text-[11px] text-slate">charged only when it books</p>
          <span
            aria-hidden
            className="pr-stamp absolute -right-2 -top-3 rotate-[-8deg] rounded-md border-2 border-fg bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Paid on result
          </span>
        </div>
        {/* torn receipt edge */}
        <div
          aria-hidden
          className="h-2 w-full bg-canvas [mask:conic-gradient(from_135deg_at_top,#000_90deg,#0000_0)_top/12px_100%] [-webkit-mask:conic-gradient(from_135deg_at_top,#000_90deg,#0000_0)_top/12px_100%]"
        />
      </div>
    </div>
  );
}

/* 3. Monthly cost as coin stacks: three stay with the client, one (max) is our fee. */
export function SavingsStacks() {
  const root = useRef<HTMLDivElement>(null);
  const monthly = timeExample.people * timeExample.hoursPerWeek * 4 * timeExample.rate;
  const stacks = Math.round(1 / pricing.savingsCap); // 4 stacks of 25%
  const per = monthly / stacks;
  const coins = 6;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } });
      // stacks build bottom-up, left to right, like money counted onto a table
      q(".pr-stack").forEach((stack, s) => {
        tl.from(stack.querySelectorAll(".pr-c"), { opacity: 0, y: -14, duration: 0.28, stagger: 0.05, ease: "power3.out" }, s * 0.22);
      });
      countUp(tl, q(".pr-total")[0], monthly, 0);
      tl.from(".pr-bracket", { scaleX: 0, duration: 0.45, stagger: 0.12, ease: "power3.out" }, "+=0.1").from(
        ".pr-split",
        { opacity: 0, y: 6, duration: 0.35, stagger: 0.12, ease: "power3.out" },
        "<0.1",
      );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <p className="text-[13px] text-slate">
        Manual work each month: <span className="pr-total font-bold text-fg tabular-nums">{money(monthly)}</span>
      </p>
      <div className="mt-5 grid grid-cols-4 items-end gap-3" aria-hidden>
        {Array.from({ length: stacks }, (_, s) => {
          const ours = s === stacks - 1;
          return (
            <div key={s} className="pr-stack flex flex-col-reverse items-center">
              {Array.from({ length: coins }, (_, c) => (
                <span
                  key={c}
                  className={`pr-c -mt-[3px] block h-3 w-full max-w-16 rounded-[50%] border-[1.5px] ${ours ? `border-fg bg-surface ${hatch}` : "border-surface bg-deep shadow-[0_0_0_1px_var(--color-fg)]"}`}
                />
              ))}
              <span className="mb-1 text-[11px] font-bold tabular-nums text-slate">{money(per)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3 text-[12px]">
        <div className="col-span-3">
          <div className="pr-bracket h-1.5 origin-left rounded-full bg-deep" />
          <p className="pr-split mt-2">
            <span className="font-bold">You keep</span> <span className="tabular-nums text-slate">{money(monthly - per)}+</span>
          </p>
        </div>
        <div>
          <div className={`pr-bracket h-1.5 origin-left rounded-full border border-fg ${hatch}`} />
          <p className="pr-split mt-2">
            <span className="font-bold">Our fee</span> <span className="tabular-nums text-slate">max {money(per)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
