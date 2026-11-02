import { ArrowDown } from "lucide-react";
import { calculator, yearlyCost } from "@/content/calculator";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const HOURS_PER_DAY = 8;

/** Hero visual: the calculator's default example as one number, plus one person's week with the copy-paste hours marked. */
export function HeroCost({ className = "" }: { className?: string }) {
  const { people, hours, rate } = calculator.defaults;
  const cost = yearlyCost(people, hours, rate);
  // Spread the lost hours across the week, front-loaded (Monday reports, inbox catch-up).
  const lost = DAYS.map((_, d) => Math.floor(hours / DAYS.length) + (d < hours % DAYS.length ? 1 : 0));

  return (
    <div className={`on-dark rounded-[28px] bg-deep p-7 text-white sm:p-10 ${className}`}>
      <p className="text-[15px] leading-relaxed text-on-ink-muted">
        A team of {people} spending {hours} hours a week each on copy-paste, at ${rate} an hour, loses
      </p>
      <p className="mt-3 text-[clamp(3.25rem,7vw,5.25rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
        ${cost.toLocaleString("en-US")}
      </p>
      <p className="mt-2 text-[15px] text-on-ink-muted">every year, before anyone notices.</p>

      <figure className="mt-9 border-t border-line pt-7">
        <figcaption className="text-[13px] font-bold">
          One person&apos;s week: <span className="text-accent">{hours} of 40 hours</span> moving data by hand
        </figcaption>
        <div className="mt-4 grid grid-cols-5 gap-2" aria-hidden>
          {DAYS.map((day, d) => (
            <div key={day}>
              <div className="grid gap-1">
                {Array.from({ length: HOURS_PER_DAY }, (_, h) => (
                  <span key={h} className={`h-2.5 rounded-[3px] ${h < lost[d] ? "bg-white" : "bg-white/[0.09]"}`} />
                ))}
              </div>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-on-ink-muted">{day}</span>
            </div>
          ))}
        </div>
      </figure>

      <a href="#cost" className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white">
        Work out your own number <ArrowDown size={16} strokeWidth={2} />
      </a>
    </div>
  );
}
