"use client";

import { useRef } from "react";
import { ArrowRight, CalendarCheck, Check, Download, FileSpreadsheet, MessageSquare, MousePointerClick } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

// Illustrations for the retention-agency story (lead follow-up, setter attribution, reporting).
// Markup renders the FINAL state, so reduced motion and no-JS show the finished picture;
// GSAP only animates towards it once, on scroll. Every number shown comes from the project.

function Mono({ text }: { text: string }) {
  return (
    <span aria-hidden className="grid size-7 place-items-center rounded-md bg-fg text-[11px] font-bold text-surface">
      {text}
    </span>
  );
}

function Step({ n, title, sub, children }: { n: number; title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-8 border-t border-line py-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14 lg:py-20">
      <div>
        <span className="grid size-9 place-items-center rounded-full border-2 border-fg text-[13px] font-bold">{n}</span>
        <h3 className="t-h3 mt-5">{title}</h3>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-slate">{sub}</p>
      </div>
      {children}
    </div>
  );
}

/* 1. Where the leads come from: sourced, qualified, warmed, then handed to GoHighLevel on reply. */
const pipeline = [
  { name: "Store Leads", note: "Lead source", mark: <Mono text="SL" /> },
  { name: "Make", note: "Pulls new leads", mark: <ToolMark slug="make" size={26} /> },
  { name: "Clay", note: "Waterfall qualification", mark: <Mono text="C" /> },
  { name: "Instantly", note: "Warm-up and outreach", mark: <Mono text="I" /> },
  { name: "Zapier", note: "Lead replies", mark: <ToolMark slug="zapier" size={26} /> },
  { name: "GoHighLevel", note: "New contact in pipeline", mark: <Mono text="GHL" />, key: true },
];

function LeadPipeline() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 80%", once: true } })
        .from(".lp-node", { opacity: 0, y: 14, duration: 0.45, stagger: 0.18, ease: "power3.out" })
        .from(".lp-link", { scaleX: 0, scaleY: 0, duration: 0.3, stagger: 0.18, ease: "none" }, 0.2);
    },
    { scope: root },
  );
  return (
    <div ref={root} className="rounded-card border border-line bg-surface p-6 md:p-8" aria-label="Lead pipeline from Store Leads to GoHighLevel">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pipeline.map((p, i) => (
          <li key={p.name} className="relative">
            <div
              className={`lp-node flex h-full items-center gap-3 rounded-[16px] border p-4 ${
                p.key ? "border-fg bg-surface" : "border-line bg-canvas"
              }`}
            >
              {p.mark}
              <div>
                <p className="text-[15px] font-bold">{p.name}</p>
                <p className="text-[13px] text-slate">{p.note}</p>
              </div>
              <span className="ml-auto text-[12px] font-bold tabular-nums text-stone-deep">{i + 1}</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 flex items-center gap-2 text-[13px] text-slate">
        <MessageSquare size={15} /> Setters answer replies from one shared inbox. Every reply becomes a GoHighLevel contact with its source attached.
      </p>
    </div>
  );
}

/* 2. A lead picks a slot: the deal moves stage, the CEO is told, the meeting is in the calendar. */
const stages = ["New lead", "Intro booked", "Demo booked"];

function MeetingBooked() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const card = q(".mb-card")[0] as HTMLElement | undefined;
      const from = q(".mb-col-0")[0] as HTMLElement | undefined;
      const to = q(".mb-col-2")[0] as HTMLElement | undefined;
      const dx = card && from && to ? from.getBoundingClientRect().left - to.getBoundingClientRect().left : 0;
      const dy = card && from && to ? from.getBoundingClientRect().top - to.getBoundingClientRect().top : 0;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } })
        .from(".mb-slot", { opacity: 0, y: 10, duration: 0.4, ease: "power3.out" })
        .fromTo(".mb-pick", { backgroundColor: "transparent", color: "inherit" }, { backgroundColor: "#2459e0", color: "#fff", duration: 0.25 }, "+=0.2")
        .from(card ?? [], { x: dx, y: dy, duration: 0.8, ease: "power3.inOut" }, "+=0.2")
        .from(".mb-tag", { opacity: 0, scale: 0.9, duration: 0.3, stagger: 0.1 }, "-=0.1")
        .from(".mb-out", { opacity: 0, x: 16, duration: 0.45, stagger: 0.25, ease: "power3.out" }, "+=0.1");
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid gap-4 md:grid-cols-[0.8fr_2fr_1fr]">
      <div className="mb-slot rounded-card border border-line bg-surface p-5">
        <p className="t-label text-slate">Lead picks a slot</p>
        <ul className="mt-4 grid gap-2 text-[14px] font-bold tabular-nums">
          <li className="rounded-full border border-line px-3 py-1.5">Tue 10:00</li>
          <li className="mb-pick rounded-full border border-cta bg-cta px-3 py-1.5 text-white">Tue 14:30</li>
          <li className="rounded-full border border-line px-3 py-1.5">Wed 09:00</li>
        </ul>
      </div>
      <div className="rounded-card border border-line bg-surface p-5">
        <p className="t-label text-slate">GoHighLevel pipeline</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {stages.map((s, i) => (
            <div key={s} className={`mb-col-${i} min-h-[150px] rounded-[14px] bg-canvas p-2`}>
              <p className="px-1 text-[12px] font-bold text-slate">{s}</p>
              {i === 2 && (
                <div className="mb-card mt-2 rounded-[12px] border border-fg bg-surface p-3 shadow-[0_14px_30px_-20px_rgb(0_0_0/0.5)]">
                  <p className="text-[13px] font-bold">Demo call</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="mb-tag flex items-center gap-1 rounded-full bg-raised px-2 py-0.5 text-[11px] font-bold">
                      <Check size={11} strokeWidth={3} /> Source
                    </span>
                    <span className="mb-tag flex items-center gap-1 rounded-full bg-raised px-2 py-0.5 text-[11px] font-bold">
                      <Check size={11} strokeWidth={3} /> Setter
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid content-start gap-3">
        <div className="mb-out flex items-start gap-3 rounded-card border border-line bg-surface p-4">
          <Mono text="#" />
          <p className="text-[13px] leading-snug">
            <span className="font-bold">Slack</span>
            <br />
            New demo booked for Tue 14:30
          </p>
        </div>
        <div className="mb-out flex items-start gap-3 rounded-card border border-line bg-surface p-4">
          <ToolMark slug="googlecalendar" size={26} />
          <p className="text-[13px] leading-snug">
            <span className="font-bold">Calendar</span>
            <br />
            Meeting created
          </p>
        </div>
        <div className="mb-out flex items-start gap-3 rounded-card border border-line bg-surface p-4">
          <CalendarCheck size={24} className="shrink-0" />
          <p className="text-[13px] leading-snug">
            <span className="font-bold">Tracker</span>
            <br />
            Speed to lead logged
          </p>
        </div>
      </div>
    </div>
  );
}

/* 3. Results and reporting: meetings a month (real ranges), reports on a schedule or one click. */
const reports = ["Business health", "Lead sources", "Setter attribution", "Campaign revenue", "SMS revenue"];

function Reporting() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .from(".rp-bar", { scaleX: 0, duration: 0.9, stagger: 0.3, ease: "power3.out" })
        .from(".rp-val", { opacity: 0, duration: 0.3, stagger: 0.3 }, "<0.5")
        .from(".rp-btn", { scale: 0.94, duration: 0.15, yoyo: true, repeat: 1 }, "+=0.2")
        .from(".rp-row", { opacity: 0, x: -10, duration: 0.3, stagger: 0.08, ease: "power3.out" })
        .from(".rp-export", { opacity: 0, y: 6, duration: 0.3, stagger: 0.1 });
    },
    { scope: root },
  );
  // 0 to 50 meetings a month axis; bars span the real before/after ranges.
  const pct = (n: number) => `${(n / 50) * 100}%`;
  return (
    <div ref={root} className="grid gap-4 md:grid-cols-2">
      <div className="rounded-card border border-line bg-surface p-6">
        <p className="t-label text-slate">Meetings booked a month</p>
        {[
          { label: "Before", from: 15, to: 30, on: false },
          { label: "After", from: 30, to: 45, on: true },
        ].map((r) => (
          <div key={r.label} className="mt-6">
            <p className="text-[13px] text-slate">{r.label}</p>
            <div className="relative mt-2 h-10 rounded-full bg-canvas">
              <div
                className={`rp-bar absolute inset-y-0 origin-left rounded-full ${r.on ? "bg-cta" : "bg-stone"}`}
                style={{ left: pct(r.from), width: pct(r.to - r.from) }}
              />
            </div>
            <p className={`rp-val mt-1.5 text-[22px] font-bold tabular-nums ${r.on ? "text-cta" : ""}`}>
              {r.from}–{r.to}
            </p>
          </div>
        ))}
        <div className="mt-4 flex justify-between text-[11px] tabular-nums text-stone-deep">
          <span>0</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>
      <div className="rounded-card border border-line bg-surface p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="t-label text-slate">Reports</p>
          <span className="rp-btn inline-flex items-center gap-1.5 rounded-full bg-fg px-3 py-1.5 text-[12px] font-bold text-surface">
            <MousePointerClick size={14} /> Generate
          </span>
        </div>
        <p className="mt-3 text-[13px] text-slate">
          Was: 1–2 days by hand. Now: every Monday morning, or one click.
        </p>
        <ul className="mt-4 grid gap-2">
          {reports.map((r) => (
            <li key={r} className="rp-row flex items-center gap-3 rounded-[12px] bg-canvas px-3 py-2.5 text-[14px] font-bold">
              <Check size={15} strokeWidth={3} className="text-cta" />
              {r}
              <ArrowRight size={14} className="ml-auto text-stone-deep" />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rp-export inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12px] font-bold">
            <ToolMark slug="googlesheets" size={14} /> Google Sheets
          </span>
          <span className="rp-export inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12px] font-bold">
            <Download size={13} /> CSV
          </span>
          <span className="rp-export inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12px] font-bold">
            <FileSpreadsheet size={13} /> Apps Script
          </span>
        </div>
      </div>
    </div>
  );
}

export function AgencySalesOps() {
  return (
    <section className="border-t border-line py-6">
      <div className="container-x">
        <Step
          n={1}
          title="Qualified leads before anyone picks up the phone"
          sub="Make pulls new leads from Store Leads into Clay for waterfall qualification, then Instantly warms them up. When a lead replies, Zapier adds them to GoHighLevel with their source."
        >
          <LeadPipeline />
        </Step>
        <Step
          n={2}
          title="A booked slot does the rest"
          sub="GoHighLevel workflows run the lead follow-up and track speed to lead. When a lead books, the deal moves to Intro or Demo booked, the CEO gets a Slack alert and the meeting lands in the calendar."
        >
          <MeetingBooked />
        </Step>
        <Step
          n={3}
          title="Reports that build themselves"
          sub="Apps Script dashboards for business health, lead-source performance, setter attribution and campaign and SMS revenue. Campaign lists are built automatically too."
        >
          <Reporting />
        </Step>
      </div>
    </section>
  );
}
