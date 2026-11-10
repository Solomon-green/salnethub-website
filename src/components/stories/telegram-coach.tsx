"use client";

import { useRef } from "react";
import { AlertTriangle, Check, Database, HeartHandshake, LifeBuoy, ListChecks, MessageCircle, Repeat, Send, ShieldCheck, Calculator } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

// Illustrations for the Telegram coaching bot story (n8n router, four brains, one sender).
// Markup renders the FINAL state; GSAP animates towards it once, on scroll.
// Chat lines and the JSON are taken from the bot's own templates and classifier examples.

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

/* 1. One message in: saved once, classified by the LLM, checked in code. */
function Classifier() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .from(".cl-msg", { opacity: 0, y: 10, duration: 0.4, ease: "power3.out" })
        .from(".cl-step", { opacity: 0, x: -10, duration: 0.35, stagger: 0.18, ease: "power3.out" })
        .from(".cl-json", { opacity: 0, y: 12, duration: 0.45, ease: "power3.out" }, "-=0.1")
        .from(".cl-line", { opacity: 0, duration: 0.2, stagger: 0.08 }, "<0.1");
    },
    { scope: root },
  );
  const json = [
    ['"route"', '"daily_numbers"', true],
    ['"confidence"', "0.97", false],
    ['"language"', '"mixed"', false],
    ['"sales_ugx"', "120000", true],
    ['"expenses_ugx"', "45000", true],
  ] as const;
  return (
    <div ref={root} className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
      <div className="grid content-start gap-3">
        <div className="cl-msg flex items-start gap-3 rounded-card border border-line bg-surface p-4">
          <Send size={22} className="mt-0.5 shrink-0 text-[#229ED9]" />
          <p className="text-[15px] font-bold leading-snug">“Leero natunze 120k, expenses 45,000”</p>
        </div>
        {[
          { icon: Database, t: "Saved once", s: "A duplicate update stops here" },
          { icon: MessageCircle, t: "Classified by the LLM", s: "With the last 15 messages" },
          { icon: ShieldCheck, t: "Checked in code", s: "One repair retry, then a safe fallback" },
        ].map((x) => (
          <div key={x.t} className="cl-step flex items-center gap-3 rounded-[14px] bg-canvas p-3">
            <x.icon size={18} className="shrink-0" />
            <div>
              <p className="text-[14px] font-bold">{x.t}</p>
              <p className="text-[12px] text-slate">{x.s}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cl-json rounded-card bg-fg p-6 font-mono text-[13px] leading-relaxed text-surface">
        <p className="text-stone">{"{"}</p>
        {json.map(([k, v, hot]) => (
          <p key={k} className="cl-line pl-4">
            <span className="text-stone">{k}: </span>
            <span className={hot ? "font-bold text-[#8fb0ff]" : ""}>{v}</span>
          </p>
        ))}
        <p className="text-stone">{"}"}</p>
        <p className="mt-4 font-sans text-[12px] text-stone">“50k”, “shs 45,000”, “1.2m” and “emitwalo ataano” all become whole UGX numbers.</p>
      </div>
    </div>
  );
}

/* 2. Four brains, and the rule that wellbeing always wins. */
const brains = [
  { icon: Calculator, name: "Numbers", note: "Records sales and expenses, works out profit, sends a 7 pm reminder. No AI guessing." },
  { icon: ListChecks, name: "Coach", note: "60-word answers in the youth's own language mix. Never suggests a loan." },
  { icon: HeartHandshake, name: "Care", note: "Puts wellbeing first: a support line, a human flagged, coaching paused.", hot: true },
  { icon: LifeBuoy, name: "Help", note: "Menu with four Telegram buttons, in English, Luganda or a mix." },
];

function Brains() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .from(".br-card", { opacity: 0, y: 14, duration: 0.4, stagger: 0.12, ease: "power3.out" })
        .from(".br-chat", { opacity: 0, x: 12, duration: 0.35, stagger: 0.3, ease: "power3.out" }, "+=0.1");
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid gap-4 md:grid-cols-[1.15fr_1fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {brains.map((b) => (
          <div key={b.name} className={`br-card rounded-card border p-4 ${b.hot ? "border-cta bg-cta text-white" : "border-line bg-surface"}`}>
            <b.icon size={20} />
            <p className="mt-3 text-[15px] font-bold">{b.name} brain</p>
            <p className={`mt-1 text-[12px] leading-snug ${b.hot ? "text-white/85" : "text-slate"}`}>{b.note}</p>
          </div>
        ))}
        <p className="flex items-center gap-2 text-[12px] font-bold text-cta sm:col-span-2">
          <AlertTriangle size={14} /> Distress beats every other route, even mid-conversation.
        </p>
      </div>
      <div className="grid content-start gap-2 rounded-card border border-line bg-canvas p-4">
        <p className="t-label text-slate">On Telegram</p>
        <p className="br-chat ml-auto max-w-[85%] rounded-[14px] rounded-tr-[4px] bg-surface px-3 py-2 text-[13px]">Leero natunze 120k, expenses 45,000</p>
        <p className="br-chat max-w-[85%] rounded-[14px] rounded-tl-[4px] bg-fg px-3 py-2 text-[13px] text-surface">
          Today: sales UGX 120,000, expenses UGX 45,000, profit UGX 75,000.
        </p>
        <p className="br-chat ml-auto max-w-[85%] rounded-[14px] rounded-tr-[4px] bg-surface px-3 py-2 text-[13px]">Njagala loan okugaziya bizinensi</p>
        <p className="br-chat max-w-[85%] rounded-[14px] rounded-tl-[4px] bg-fg px-3 py-2 text-[13px] text-surface">
          Siyinza kukuyamba ku kwewola, naye nsobola okukuyamba okukuza amagoba go…
        </p>
        <p className="mt-1 text-[11px] text-slate">The second reply turns down the loan and offers to help grow profit instead.</p>
      </div>
    </div>
  );
}

/* 3. Reliability: one sender, never twice, never silent. */
const guarantees = [
  { icon: Send, t: "One way out", s: "Only the Send Reply workflow talks to Telegram." },
  { icon: Repeat, t: "Never replies twice", s: "Database constraints on every update and every reply." },
  { icon: MessageCircle, t: "60 words, always", s: "Longer replies are cut at the last full sentence and logged." },
  { icon: Check, t: "Rate limits handled", s: "On Telegram's 429 it waits and retries, 3 attempts." },
  { icon: AlertTriangle, t: "Never silent", s: "LLM retries 3×, then a friendly fallback, an error log and an admin alert." },
  { icon: Database, t: "Kampala time", s: "Daily records land on the Kampala date, not the server's." },
];

function Reliability() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".rl-row", { opacity: 0, y: 10, duration: 0.35, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid gap-3 sm:grid-cols-2">
      {guarantees.map((g) => (
        <div key={g.t} className="rl-row flex items-start gap-3 rounded-card border border-line bg-surface p-4">
          <g.icon size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-[14px] font-bold">{g.t}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-slate">{g.s}</p>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
        {[
          { slug: "n8n", name: "n8n" },
          { slug: "supabase", name: "Supabase Postgres" },
          { slug: "openai", name: "OpenAI" },
        ].map((t) => (
          <span key={t.name} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12px] font-bold">
            <ToolMark slug={t.slug} size={14} /> {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TelegramCoach() {
  return (
    <section className="border-t border-line py-6">
      <div className="container-x">
        <Step
          n={1}
          title="Every message classified, then checked"
          sub="One n8n router saves each Telegram update once, asks an LLM to classify it with the last 15 messages, and validates the JSON in code before anything acts on it."
        >
          <Classifier />
        </Step>
        <Step
          n={2}
          title="Four brains, one rule: wellbeing first"
          sub="Each route runs its own sub-workflow. Numbers and Help are deterministic, Coach uses AI with a hard no-loans guard, and Care takes over the moment a youth shows distress."
        >
          <Brains />
        </Step>
        <Step
          n={3}
          title="Built not to break"
          sub="Telegram retries webhooks, LLMs time out and rate limits hit. The bot is designed so none of that ever reaches the youth as a double reply or silence."
        >
          <Reliability />
        </Step>
      </div>
    </section>
  );
}
