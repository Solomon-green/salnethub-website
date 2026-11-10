"use client";

import { useRef } from "react";
import { Ban, CalendarPlus, FileText, Globe, ListChecks, Mail, MessageSquare, Receipt, Sheet, UserPlus } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

// Illustrations for the construction-contractor story (AI lead intake, RAG triage, routing).
// Markup renders the FINAL state; GSAP animates towards it once, on scroll. No client data shown.

function Mono({ text }: { text: string }) {
  return (
    <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-md bg-fg text-[11px] font-bold text-surface">
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

/* 1. LinkedIn replies: AI reads each one and sorts it into "reach out now" or "nurture". */
const replies = [
  { text: "We have a modular facility requirement next quarter. Can you quote?", lane: 0 },
  { text: "Not right now, maybe next year.", lane: 1 },
  { text: "Who handles your MEP and fit-out bids? Send capabilities.", lane: 0 },
];

function ReplySorter() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .from(".rs-in", { opacity: 0, x: -16, duration: 0.4, stagger: 0.2, ease: "power3.out" })
        .from(".rs-ai", { opacity: 0, scale: 0.9, duration: 0.35, ease: "back.out(2)" }, "+=0.1")
        .from(".rs-out", { opacity: 0, y: 10, duration: 0.4, stagger: 0.15, ease: "power3.out" }, "+=0.15");
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid items-center gap-4 rounded-card border border-line bg-surface p-6 md:grid-cols-[1.2fr_auto_1fr] md:p-8">
      <ul className="grid gap-2">
        {replies.map((r) => (
          <li key={r.text} className="rs-in flex items-start gap-2 rounded-[14px] bg-canvas p-3 text-[13px] leading-snug">
            <MessageSquare size={16} className="mt-0.5 shrink-0" />
            {r.text}
          </li>
        ))}
      </ul>
      <div className="rs-ai mx-auto grid size-16 place-items-center rounded-full border-2 border-fg bg-surface text-[13px] font-bold">AI</div>
      <div className="grid gap-3">
        <div className="rs-out rounded-[14px] bg-cta p-4 text-white">
          <p className="text-[12px] font-bold uppercase tracking-wide opacity-80">Reach out now</p>
          <p className="mt-1 text-[15px] font-bold">2 replies → JobTread</p>
        </div>
        <div className="rs-out rounded-[14px] border border-line p-4">
          <p className="text-[12px] font-bold uppercase tracking-wide text-slate">Nurture</p>
          <p className="mt-1 text-[15px] font-bold">1 reply → follow-up list</p>
        </div>
      </div>
      <p className="text-[12px] text-slate md:col-span-3">Example replies, written for this page.</p>
    </div>
  );
}

/* 2. The knowledge base and the score it applies. */
const bands = [
  { range: "80–100", label: "Advance to estimate", w: 20, on: true },
  { range: "60–79", label: "Founder review", w: 20 },
  { range: "40–59", label: "Nurture", w: 20 },
  { range: "0–39", label: "Disqualify", w: 40 },
];

function KnowledgeScore() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .from(".ks-node", { opacity: 0, y: 12, duration: 0.4, stagger: 0.18, ease: "power3.out" })
        .from(".ks-band", { scaleX: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }, "+=0.1")
        .from(".ks-pin", { left: "0%", duration: 1, ease: "power2.out" }, "<");
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid gap-4 md:grid-cols-2">
      <div className="rounded-card border border-line bg-surface p-6">
        <p className="t-label text-slate">Knowledge base</p>
        <ol className="mt-4 grid gap-2">
          {[
            { mark: <ToolMark slug="googledrive" size={22} />, name: "Google Drive", note: "Company rules, services, scoring" },
            { mark: <Mono text="AI" />, name: "OpenAI embeddings", note: "Each file turned into vectors" },
            { mark: <Mono text="P" />, name: "Pinecone", note: "Searched by the agent on every message" },
          ].map((n) => (
            <li key={n.name} className="ks-node flex items-center gap-3 rounded-[14px] bg-canvas p-3">
              {n.mark}
              <div>
                <p className="text-[14px] font-bold">{n.name}</p>
                <p className="text-[12px] text-slate">{n.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[13px] text-slate">Add or change a file in Drive and the agent knows it on the next sync.</p>
      </div>
      <div className="rounded-card border border-line bg-surface p-6">
        <p className="t-label text-slate">100-point qualification score</p>
        <div className="relative mt-8">
          <div className="flex h-10 flex-row-reverse overflow-hidden rounded-full">
            {bands.map((b) => (
              <div key={b.range} className={`ks-band origin-right ${b.on ? "bg-cta" : "bg-raised"} border-l-2 border-surface`} style={{ width: `${b.w}%` }} />
            ))}
          </div>
          <div className="ks-pin absolute -top-6 -translate-x-1/2 text-center" style={{ left: "86%" }}>
            <span className="rounded-full bg-fg px-2 py-0.5 text-[11px] font-bold text-surface">86</span>
          </div>
        </div>
        <ul className="mt-6 grid gap-2">
          {[...bands].map((b) => (
            <li key={b.range} className="flex items-center justify-between gap-3 text-[14px]">
              <span className="font-bold tabular-nums">{b.range}</span>
              <span className={b.on ? "font-bold text-cta" : "text-slate"}>{b.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-slate">Points for budget, decision maker, timeline, fit, margin and capacity.</p>
      </div>
    </div>
  );
}

/* 3. Every message lands in the right place. */
const routes = [
  { icon: UserPlus, kind: "New lead", to: "JobTread pipeline", hot: true },
  { icon: ListChecks, kind: "Job enquiry", to: "Sales task created" },
  { icon: CalendarPlus, kind: "Meeting request", to: "Calendly event, CEO notified" },
  { icon: Receipt, kind: "Returning client", to: "Invoice generated" },
  { icon: Sheet, kind: "Service question", to: "Google Sheet for follow-up" },
  { icon: Ban, kind: "Promotional", to: "Discarded" },
];

function Router() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .from(".rt-src", { opacity: 0, x: -14, duration: 0.4, stagger: 0.15, ease: "power3.out" })
        .from(".rt-agent", { opacity: 0, scale: 0.92, duration: 0.35, ease: "back.out(2)" })
        .from(".rt-row", { opacity: 0, x: 14, duration: 0.35, stagger: 0.1, ease: "power3.out" });
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid gap-4 md:grid-cols-[0.8fr_1.6fr]">
      <div className="grid content-start gap-3">
        <div className="rt-src flex items-center gap-3 rounded-card border border-line bg-surface p-4">
          <Globe size={22} />
          <p className="text-[14px] font-bold">Web intake form</p>
        </div>
        <div className="rt-src flex items-center gap-3 rounded-card border border-line bg-surface p-4">
          <Mail size={22} />
          <p className="text-[14px] font-bold">Email</p>
        </div>
        <div className="rt-agent rounded-card border-2 border-fg bg-surface p-4">
          <div className="flex items-center gap-3">
            <ToolMark slug="n8n" size={22} />
            <p className="text-[14px] font-bold">AI agent in n8n</p>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-slate">Checks the knowledge base, decides the type, returns clean JSON.</p>
        </div>
      </div>
      <ul className="grid gap-2 rounded-card border border-line bg-surface p-4">
        {routes.map((r) => (
          <li key={r.kind} className={`rt-row flex items-center gap-3 rounded-[12px] px-3 py-2.5 ${r.hot ? "bg-cta text-white" : "bg-canvas"}`}>
            <r.icon size={17} className="shrink-0" />
            <span className="w-[9.5rem] shrink-0 text-[14px] font-bold">{r.kind}</span>
            <span className={`text-[13px] ${r.hot ? "text-white/85" : "text-slate"}`}>→ {r.to}</span>
          </li>
        ))}
        <li className="flex items-center gap-2 px-1 pt-1 text-[12px] text-slate">
          <FileText size={13} /> Leads and enquiries reach JobTread through Zapier.
        </li>
      </ul>
    </div>
  );
}

export function ContractorIntake() {
  return (
    <section className="border-t border-line py-6">
      <div className="container-x">
        <Step
          n={1}
          title="LinkedIn replies, qualified by AI"
          sub="Project one: when a prospect replies to a LinkedIn campaign, a Zapier workflow has AI read the reply. Real buyers go straight into JobTread for outreach; the rest go to a nurture list."
        >
          <ReplySorter />
        </Step>
        <Step
          n={2}
          title="A knowledge base the AI checks first"
          sub="Project two: a RAG system in n8n. The company's rules live in Google Drive, are embedded with OpenAI and stored in Pinecone, so every decision follows the contractor's own scoring, not a guess."
        >
          <KnowledgeScore />
        </Step>
        <Step
          n={3}
          title="Every enquiry routed in seconds"
          sub="Each form or email is read by an AI agent, matched against the knowledge base and sent where it belongs, with no one sorting the inbox by hand."
        >
          <Router />
        </Step>
      </div>
    </section>
  );
}
