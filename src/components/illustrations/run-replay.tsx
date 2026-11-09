"use client";

import { useRef } from "react";
import { Check, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

// One lead, replayed step by step. The left window shows what each step produces in the app it
// touches; the run log on the right ticks through the same steps with timestamps.
const steps = [
  { tool: "facebook", title: "New lead arrives", app: "Meta lead ads", url: "facebook.com/ads/leads", at: "0.0 s" },
  { tool: null, title: "AI scores the lead", app: "AI agent", url: "salnethub-agent / score", at: "4.2 s" },
  { tool: "hubspot", title: "Deal created", app: "HubSpot", url: "app.hubspot.com/deals", at: "6.9 s" },
  { tool: "gmail", title: "Personal reply sent", app: "Gmail", url: "mail.google.com", at: "1 min 48 s" },
  { tool: "whatsapp", title: "Team alerted", app: "WhatsApp", url: "web.whatsapp.com", at: "1 min 52 s" },
];

const SCORE = 86;

export function RunReplay() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const rows = gsap.utils.toArray<HTMLElement>(".rr-row");
      const score = el.querySelector<HTMLElement>(".rr-score-num")!;
      const meter = el.querySelector<HTMLElement>(".rr-meter-fill")!;
      const show = (i: number) => () => el.setAttribute("data-step", String(i));
      const state = (row: HTMLElement, s: string) => () => row.setAttribute("data-state", s);

      if (prefersReducedMotion()) {
        el.setAttribute("data-step", String(steps.length - 1));
        rows.forEach((r) => r.setAttribute("data-state", "done"));
        el.setAttribute("data-complete", "true");
        score.textContent = String(SCORE);
        gsap.set(meter, { scaleX: SCORE / 100 });
        return;
      }

      const counter = { v: 0 };
      const t = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 2.4,
        onRepeat: () => reset(),
      });
      const reset = () => {
        rows.forEach((r) => r.setAttribute("data-state", "idle"));
        el.removeAttribute("data-complete");
        counter.v = 0;
        score.textContent = "0";
        gsap.set(meter, { scaleX: 0 });
      };
      reset();

      steps.forEach((_, i) => {
        t.call(show(i));
        t.call(state(rows[i], "running"));
        if (i === 1) {
          t.to(counter, { v: SCORE, duration: 1.2, ease: "power2.out", onUpdate: () => (score.textContent = String(Math.round(counter.v))) }, "+=0.3");
          t.to(meter, { scaleX: SCORE / 100, duration: 1.2, ease: "power2.out" }, "<");
          t.to({}, { duration: 0.6 });
        } else {
          t.to({}, { duration: i === 0 ? 1.6 : 1.9 });
        }
        t.call(state(rows[i], "done"));
        t.to({}, { duration: 0.25 });
      });
      t.call(() => el.setAttribute("data-complete", "true"));
      t.to({}, { duration: 2.4 });
      tl.current = t;

      // Play while on screen, pause when scrolled away.
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? t.play() : t.pause()),
      });
    },
    { scope: root },
  );

  const replay = () => {
    const t = tl.current;
    if (!t) return;
    t.restart();
    t.eventCallback("onRepeat")?.();
  };

  return (
    <div ref={root} className="rr grid gap-4 lg:grid-cols-[1fr_340px]" data-step="0" data-complete="true">
      {/* App window */}
      <div className="rr-window flex flex-col overflow-hidden rounded-[18px] bg-surface text-fg shadow-[0_40px_90px_-40px_rgb(0_0_0/0.8)]">
        <div className="flex items-center gap-3 border-b border-line bg-raised/70 px-4 py-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-mist-2" />
            <span className="size-2.5 rounded-full bg-mist-2" />
            <span className="size-2.5 rounded-full bg-mist-2" />
          </span>
          <span className="relative h-7 min-w-0 flex-1 overflow-hidden rounded-full bg-surface text-[12.5px] text-stone-deep">
            {steps.map((s, i) => (
              <span key={s.url} className="rr-scene absolute inset-0 flex items-center px-3.5" data-scene={i}>
                <span className="truncate">{s.url}</span>
              </span>
            ))}
          </span>
        </div>

        <div className="rr-stage relative min-h-[340px] flex-1 bg-canvas sm:min-h-[380px]" aria-hidden>
          {/* 0: the lead form arrives */}
          <Scene i={0}>
            <div className="w-full max-w-[400px] rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <p className="text-[13px] font-bold text-stone-deep">Spring campaign · Lead form</p>
              <p className="mt-1 text-[19px] font-bold">Book a free consultation</p>
              <div className="mt-5 grid gap-3 text-[14px]">
                <Field label="Name" value="Dana Ortiz" />
                <Field label="Company" value="Northwind Dental" />
                <Field label="Message" value="We miss calls on weekends. Can you help?" />
              </div>
              <p className="rr-pop mt-5 inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-[13px] font-bold text-white">
                <Check size={14} strokeWidth={3} /> Submitted
              </p>
            </div>
          </Scene>

          {/* 1: AI scores it */}
          <Scene i={1}>
            <div className="w-full max-w-[400px] rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <p className="flex items-center gap-2 text-[13px] font-bold text-stone-deep">
                <Sparkles size={15} /> Lead score
              </p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="rr-score-num text-[56px] font-bold leading-none tracking-[-0.04em]">0</span>
                <span className="text-[18px] font-bold text-stone-deep">/ 100</span>
              </p>
              <span className="mt-4 block h-2.5 overflow-hidden rounded-full bg-raised">
                <span className="rr-meter-fill block h-full origin-left rounded-full bg-fg" />
              </span>
              <div className="mt-5 flex flex-wrap gap-2 text-[12.5px] font-bold">
                {["High intent", "Clear problem", "Decision maker"].map((t) => (
                  <span key={t} className="rr-pop rounded-full border border-line px-3 py-1.5 text-slate">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Scene>

          {/* 2: CRM deal drops into the pipeline */}
          <Scene i={2}>
            <div className="grid w-full max-w-[520px] grid-cols-3 gap-3">
              {["New", "Qualified", "Call booked"].map((col, c) => (
                <div key={col} className="rounded-xl bg-raised/80 p-2.5">
                  <p className="px-1 pb-2 text-[12px] font-bold text-stone-deep">{col}</p>
                  <div className="grid gap-2">
                    {c === 0 && (
                      <div className="rr-drop rounded-lg border-2 border-fg bg-surface p-2.5 shadow-md">
                        <p className="text-[12.5px] font-bold leading-tight">Northwind Dental</p>
                        <p className="mt-1 text-[11.5px] text-stone-deep">Dana Ortiz · Score 86</p>
                        <p className="mt-2 text-[11px] font-bold text-slate">Owner: Sarah</p>
                      </div>
                    )}
                    {[0, 1].map((k) => (
                      <div key={k} className="rounded-lg bg-surface p-2.5 opacity-70">
                        <span className="block h-2 w-4/5 rounded bg-raised" />
                        <span className="mt-2 block h-2 w-1/2 rounded bg-raised" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Scene>

          {/* 3: personal reply goes out */}
          <Scene i={3}>
            <div className="w-full max-w-[440px] rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <p className="text-[12.5px] text-stone-deep">To: dana@northwind.dental</p>
              <p className="mt-1 text-[16px] font-bold">Re: Missed weekend calls</p>
              <p className="rr-type mt-4 text-[14px] leading-relaxed text-slate">
                Hi Dana, thanks for getting in touch. Missed weekend calls are exactly what we fix. Here are three times for a 20-minute call…
              </p>
              <p className="rr-pop mt-5 inline-flex items-center gap-2 text-[13px] font-bold">
                <Check size={15} strokeWidth={3} /> Sent 1 min 48 s after sign-up
              </p>
            </div>
          </Scene>

          {/* 4: the team hears about it */}
          <Scene i={4}>
            <div className="w-full max-w-[400px] space-y-3">
              <p className="text-center text-[12px] font-bold text-stone-deep">Sales team</p>
              <div className="rr-pop rounded-2xl rounded-tl-md bg-surface p-4 text-[14px] leading-relaxed shadow-sm">
                <p className="font-bold">New high-intent lead (86/100)</p>
                <p className="mt-1 text-slate">Dana Ortiz, Northwind Dental. Deal created for Sarah, reply already sent.</p>
              </div>
              <div className="rr-pop ml-auto w-fit rounded-2xl rounded-tr-md bg-fg px-4 py-2.5 text-[14px] text-white [animation-delay:600ms]">
                On it, calling her now 👍
              </div>
            </div>
          </Scene>
        </div>
      </div>

      {/* Run log */}
      <div className="panel-dark flex flex-col p-5 sm:p-6" aria-label="Run log for the demo run">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-on-ink-muted">Run log</p>
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-bold text-white/85 transition-colors hover:border-white/40 hover:text-white"
          >
            <RotateCcw size={13} strokeWidth={2.25} /> Replay
          </button>
        </div>
        <ol className="mt-5 flex-1 space-y-1">
          {steps.map((s) => (
            <li key={s.title} className="rr-row flex items-center gap-3 rounded-xl px-2 py-2.5" data-state="done">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-deep-2 text-white">
                {s.tool ? <ToolMark slug={s.tool} size={19} /> : <Sparkles size={19} strokeWidth={1.6} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-bold leading-snug">{s.title}</span>
                <span className="block text-[12px] text-on-ink-muted">{s.app}</span>
              </span>
              <span className="rr-status shrink-0 text-right text-[12px] font-bold">
                <span className="st-idle text-white/40">Waiting</span>
                <span className="st-run inline-flex items-center gap-1 text-white/80">
                  <Loader2 size={12} className="animate-spin" /> Running
                </span>
                <span className="st-done text-white/80">{s.at}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="rr-complete mt-4 flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-fg">
            <Check size={18} strokeWidth={2.5} />
          </span>
          <span>
            <span className="block text-[14px] font-bold">Completed in 1 min 52 s</span>
            <span className="block text-[12px] text-on-ink-muted">Manual steps: 0</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Scene({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <div className="rr-scene absolute inset-0 flex items-center justify-center p-5 sm:p-8" data-scene={i}>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] font-bold text-stone-deep">{label}</p>
      <p className="mt-1 rounded-lg border border-line bg-canvas px-3 py-2">{value}</p>
    </div>
  );
}
