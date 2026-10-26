"use client";

import { useId, useState } from "react";
import { PrimaryCta } from "@/components/ui";
import { builds } from "@/content/engagements";

const WEEKS = 48; // working weeks in a year
const SHARE = 0.5; // conservative: assume one project removes half the manual time
const workflowPrice = Number(builds[0].price.replace(/[^0-9]/g, ""));

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
        <span className="text-[15px] font-bold tabular-nums text-ink">
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

/** "What is copy-paste costing you?" Plain arithmetic with the assumptions printed underneath. */
export function CostCalculator() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(25);

  const hoursYear = people * hours * WEEKS;
  const costYear = hoursYear * rate;
  const saved = costYear * SHARE;
  const paybackWeeks = saved > 0 ? Math.max(1, Math.ceil(workflowPrice / (saved / WEEKS))) : 0;

  return (
    <div className="grid overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_30px_80px_-40px_rgb(23_25_28/0.35)] lg:grid-cols-[1fr_1fr]">
      <div className="space-y-9 p-7 md:p-10">
        <Slider label="People doing manual admin" value={people} min={1} max={25} unit={people === 1 ? "person" : "people"} onChange={setPeople} />
        <Slider label="Hours each, per week" value={hours} min={1} max={20} unit="hrs" onChange={setHours} />
        <Slider label="Cost per hour" value={rate} min={10} max={120} step={5} unit="USD" onChange={setRate} />
        <p className="text-[13px] leading-relaxed text-slate">
          Based on {WEEKS} working weeks a year. Savings assume automation removes half of that time, which is conservative for most single
          workflows. Your real number comes out of the free call.
        </p>
      </div>
      <div className="band-ink on-dark relative flex flex-col justify-between overflow-hidden p-7 md:p-10" aria-live="polite">
        <div className="relative">
          <p className="text-[14px] text-on-ink-muted">Manual work costs you about</p>
          <p className="mt-2 text-[clamp(2.6rem,5vw,3.8rem)] font-bold leading-none tracking-tight tabular-nums text-[#C8754A]">
            {money(costYear)}
            <span className="ml-2 text-[16px] font-normal tracking-normal text-on-ink-muted">a year</span>
          </p>
          <p className="mt-3 text-[15px] text-on-ink-muted">
            That is <span className="font-bold text-white tabular-nums">{hoursYear.toLocaleString("en-US")} hours</span> of copying, chasing and
            re-typing.
          </p>
        </div>
        <div className="relative mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[12px] text-on-ink-muted">Likely saving</p>
            <p className="mt-1 text-[24px] font-bold tabular-nums text-white">{money(saved)}</p>
            <p className="text-[12px] text-on-ink-muted">per year</p>
          </div>
          <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[12px] text-on-ink-muted">A {builds[0].price} workflow pays back in</p>
            <p className="mt-1 text-[24px] font-bold tabular-nums text-white">
              {paybackWeeks} {paybackWeeks === 1 ? "week" : "weeks"}
            </p>
          </div>
        </div>
        <div className="relative mt-8">
          <PrimaryCta tone="copper" />
        </div>
      </div>
    </div>
  );
}
