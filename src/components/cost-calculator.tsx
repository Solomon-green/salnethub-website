"use client";

import { useId, useState } from "react";
import { PrimaryCta } from "@/components/ui";
import { pricing } from "@/content/engagements";
import { calculator, leadCalculator, yearlyCost } from "@/content/calculator";

const WEEKS = calculator.weeks;
const SHARE = calculator.share;
const CAP = pricing.savingsCap;

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function Slider({ label, value, min, max, step = 1, unit, onChange }: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void }) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-bold">
          {label}
        </label>
        <span className="text-[15px] font-bold tabular-nums text-fg">
          {value} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-4"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[12px] text-on-ink-muted">{label}</p>
      <p className="mt-1 text-[24px] font-bold tabular-nums text-white">{value}</p>
      {sub && <p className="text-[12px] text-on-ink-muted">{sub}</p>}
    </div>
  );
}

type Mode = "time" | "leads";

/** Two plain-arithmetic calculators: what manual work costs, and what a booked appointment really costs. Assumptions printed underneath. */
export function CostCalculator() {
  const [mode, setMode] = useState<Mode>("time");

  const [people, setPeople] = useState(calculator.defaults.people);
  const [hours, setHours] = useState(calculator.defaults.hours);
  const [rate, setRate] = useState(calculator.defaults.rate);

  const [costPerLead, setCostPerLead] = useState(leadCalculator.defaults.costPerLead);
  const [bookPct, setBookPct] = useState(leadCalculator.defaults.bookPct);
  const [leads, setLeads] = useState(leadCalculator.defaults.leadsPerMonth);

  // Time mode
  const hoursYear = people * hours * WEEKS;
  const costYear = yearlyCost(people, hours, rate);
  const savedMonth = (costYear * SHARE) / 12;
  const maxFeeMonth = savedMonth * CAP;

  // Leads mode
  const apptCost = bookPct > 0 ? costPerLead / (bookPct / 100) : 0;
  const booked = Math.round(leads * (bookPct / 100));
  const lostLeads = leads - booked;

  const tabs: { id: Mode; label: string }[] = [
    { id: "time", label: "Manual work" },
    { id: "leads", label: "Leads and bookings" },
  ];

  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)]">
      <div role="tablist" aria-label="Calculator" className="flex gap-2 border-b border-line p-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={mode === t.id}
            onClick={() => setMode(t.id)}
            className={`rounded-full px-4 py-2 text-[14px] font-bold transition-colors ${mode === t.id ? "bg-fg text-surface" : "text-slate hover:text-fg"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr]">
        {mode === "time" ? (
          <div className="space-y-9 p-7 md:p-10">
            <Slider label="People doing manual admin" value={people} min={1} max={25} unit={people === 1 ? "person" : "people"} onChange={setPeople} />
            <Slider label="Hours each, per week" value={hours} min={1} max={20} unit="hrs" onChange={setHours} />
            <Slider label="Cost per hour" value={rate} min={10} max={120} step={5} unit="USD" onChange={setRate} />
            <p className="text-[13px] leading-relaxed text-slate">
              Based on {WEEKS} working weeks a year. Savings assume automation removes half of that time, which is conservative for most single
              workflows. Our monthly fee is never more than {Math.round(CAP * 100)}% of what we save you. Your real number comes out of the free call.
            </p>
          </div>
        ) : (
          <div className="space-y-9 p-7 md:p-10">
            <Slider label="What one lead costs you" value={costPerLead} min={5} max={300} step={5} unit="USD" onChange={setCostPerLead} />
            <Slider label="Leads that book an appointment" value={bookPct} min={5} max={80} unit="%" onChange={setBookPct} />
            <Slider label="New leads each month" value={leads} min={10} max={500} step={10} unit="leads" onChange={setLeads} />
            <p className="text-[13px] leading-relaxed text-slate">
              What one lead costs ÷ the share that book = what one booked appointment really costs you. With us you pay less than that, and only when
              an appointment is booked. Your real numbers come out of the free call.
            </p>
          </div>
        )}

        <div className="band-glow on-dark relative flex flex-col justify-between overflow-hidden p-7 md:p-10" aria-live="polite">
          {mode === "time" ? (
            <>
              <div className="relative">
                <p className="text-[14px] text-on-ink-muted">Manual work costs you about</p>
                <p className="mt-2 text-[clamp(2.6rem,5vw,3.8rem)] font-bold leading-none tracking-tight tabular-nums text-accent">
                  {money(costYear)}
                  <span className="ml-2 text-[16px] font-normal tracking-normal text-on-ink-muted">a year</span>
                </p>
                <p className="mt-3 text-[15px] text-on-ink-muted">
                  That is <span className="font-bold text-white tabular-nums">{hoursYear.toLocaleString("en-US")} hours</span> of copying, chasing and
                  re-typing.
                </p>
              </div>
              <div className="relative mt-10 grid grid-cols-2 gap-4">
                <Stat label="Our fee, at most" value={money(maxFeeMonth)} sub="per month" />
                <Stat label="You keep, at least" value={money(savedMonth - maxFeeMonth)} sub="per month" />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <p className="text-[14px] text-on-ink-muted">Each booked appointment really costs you</p>
                <p className="mt-2 text-[clamp(2.6rem,5vw,3.8rem)] font-bold leading-none tracking-tight tabular-nums text-accent">{money(apptCost)}</p>
                <p className="mt-3 text-[15px] text-on-ink-muted">
                  <span className="font-bold text-white tabular-nums">{lostLeads.toLocaleString("en-US")} of {leads}</span> paid-for leads never become an
                  appointment.
                </p>
              </div>
              <div className="relative mt-10 grid grid-cols-2 gap-4">
                <Stat label="With us, per booking" value={`under ${money(apptCost)}`} sub="only when it books" />
                <Stat label="Up front" value="$0" sub={`free ${pricing.pilotDays}-day pilot`} />
              </div>
            </>
          )}
          <div className="relative mt-8">
            <PrimaryCta tone="cta" />
          </div>
        </div>
      </div>
    </div>
  );
}
