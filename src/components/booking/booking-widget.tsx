"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, CircleCheck, Clock, Globe, Video } from "lucide-react";

type Load = { state: "loading" } | { state: "ready"; slots: string[]; duration: number } | { state: "offline" };
type Errors = Partial<Record<"name" | "email", string>>;

// How long the "You're booked" confirmation stays before the calendar comes back.
const RESET_SECONDS = 5;

const WEEKDAYS =["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// The visitor's timezone on the client; UTC during server render (the widget renders a loading state there).
const noop = () => () => {};
function useVisitorZone() {
  return useSyncExternalStore(
    noop,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    () => "UTC",
  );
}

const dayKey = (iso: string, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
const fmtTime = (iso: string, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(new Date(iso)).toLowerCase();
const fmtLongDate = (key: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(new Date(`${key}T00:00:00Z`));
const monthLabel = (y: number, m: number) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", month: "long", year: "numeric" }).format(new Date(Date.UTC(y, m, 1)));
const keyOf = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

async function loadSlots(): Promise<Load> {
  try {
    const res = await fetch("/api/booking/availability", { cache: "no-store" });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error);
    return { state: "ready", slots: json.slots, duration: json.durationMinutes };
  } catch {
    return { state: "offline" };
  }
}

export function BookingWidget({ email }: { email: string }) {
  const tz = useVisitorZone();
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [month, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [picked, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "details" | "done">("pick");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [booked, setBooked] = useState<{ start: string; meetLink: string | null; email: string } | null>(null);

  const fetchSlots = useCallback(() => loadSlots().then(setLoad), []);

  useEffect(() => {
    let live = true;
    loadSlots().then((l) => live && setLoad(l));
    return () => {
      live = false;
    };
  }, []);

  const [left, setLeft] = useState(RESET_SECONDS);

  // Back to a fresh calendar (the slot just booked drops out of the refetched times).
  const reset = useCallback(() => {
    setStep("pick");
    setSlot(null);
    setBooked(null);
    setLoad({ state: "loading" });
    fetchSlots();
  }, [fetchSlots]);

  // The confirmation counts down, then returns to the calendar on its own.
  useEffect(() => {
    if (step !== "done") return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const remaining = RESET_SECONDS - Math.floor((Date.now() - started) / 1000);
      if (remaining <= 0) {
        window.clearInterval(timer);
        reset();
      } else {
        setLeft(remaining);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [step, reset]);

  // Slots grouped by the visitor's own calendar date.
  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    if (load.state !== "ready") return map;
    for (const s of load.slots) {
      const k = dayKey(s, tz);
      map.set(k, [...(map.get(k) ?? []), s]);
    }
    return map;
  }, [load, tz]);

  const days = useMemo(() => [...byDay.keys()].sort(), [byDay]);

  // Opens on the first day with free time, and falls back to it if the picked day fills up.
  const day = picked && byDay.has(picked) ? picked : (days[0] ?? null);

  if (load.state === "loading") {
    return (
      <div className="grid min-h-[420px] place-items-center" aria-busy>
        <p className="flex items-center gap-3 text-[15px] text-slate">
          <span className="size-2 animate-pulse bg-mint-ink" /> Checking free times
        </p>
      </div>
    );
  }

  if (load.state === "offline" || !days.length) {
    return (
      <div className="border border-line bg-paper p-8">
        <CalendarDays size={26} strokeWidth={1.5} className="text-mint-ink" />
        <p className="t-h3 mt-5">{load.state === "offline" ? "The calendar is offline right now" : "No free times in the next few weeks"}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-slate">
          Send a message below or email{" "}
          <a href={`mailto:${email}`} className="font-bold text-mint-ink">
            {email}
          </a>{" "}
          and we will find a time with you.
        </p>
      </div>
    );
  }

  if (step === "done" && booked) {
    return (
      <div className="border border-sage bg-mist p-8 md:p-10" role="status">
        <CircleCheck size={28} strokeWidth={1.5} className="text-mint-ink" />
        <p className="t-h2 mt-5">You&apos;re booked</p>
        <p className="mt-3 text-[17px] font-bold">
          {fmtLongDate(dayKey(booked.start, tz))}, {fmtTime(booked.start, tz)}
        </p>
        <p className="mt-3 text-[16px] leading-relaxed text-slate">
          The details and a calendar invite are on their way to <span className="font-bold text-ink">{booked.email}</span>.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          {booked.meetLink && (
            <a href={booked.meetLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Video size={18} /> Google Meet link
            </a>
          )}
          <button type="button" onClick={reset} className="text-[14px] font-bold text-mint-ink">
            Book another time
          </button>
        </div>
        <p className="mt-6 text-[13px] text-slate" aria-live="off">
          Returning to the calendar in {left}s
        </p>
      </div>
    );
  }

  if (step === "details" && slot) {
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
      const next: Errors = {};
      if (!data.name?.trim()) next.name = "Please tell us your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Please enter a valid email.";
      setErrors(next);
      if (Object.keys(next).length) return;

      setSending(true);
      try {
        const res = await fetch("/api/booking/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, start: slot, timeZone: tz }),
        });
        const json = await res.json().catch(() => ({}));
        if (res.status === 409) {
          toast.error("That time was just taken. Please pick another.");
          setSlot(null);
          setStep("pick");
          setLoad({ state: "loading" });
          fetchSlots();
          return;
        }
        if (!res.ok || !json.ok) throw new Error(json.error);
        setBooked({ start: slot!, meetLink: json.meetLink ?? null, email: data.email });
        setLeft(RESET_SECONDS);
        setStep("done");
        toast.success("Booked. Check your inbox for the details.");
      } catch {
        toast.error(`The booking did not go through. Please try again or email ${email}.`);
      } finally {
        setSending(false);
      }
    }

    return (
      <div>
        <button type="button" onClick={() => setStep("pick")} className="inline-flex items-center gap-2 text-[14px] font-bold text-mint-ink">
          <ArrowLeft size={16} /> Change time
        </button>
        <div className="mt-5 border border-line bg-paper p-5">
          <p className="text-[17px] font-bold">
            {fmtLongDate(dayKey(slot, tz))}, {fmtTime(slot, tz)}
          </p>
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-slate">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {load.duration} minutes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Video size={14} /> Google Meet
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe size={14} /> {tz.replace(/_/g, " ")}
            </span>
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" error={errors.name} required />
            <Field label="Work email" name="email" type="email" autoComplete="email" error={errors.email} required />
          </div>
          <Field label="Company" name="company" autoComplete="organization" />
          <div className="grid gap-2">
            <label htmlFor="book-notes" className="text-[14px] font-bold">
              What would you like to automate?
            </label>
            <textarea id="book-notes" name="notes" rows={4} className="field-input resize-y" />
          </div>
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <button type="submit" disabled={sending} className="btn btn-primary w-full disabled:opacity-60 sm:w-fit">
            {sending ? "Booking" : "Confirm booking"}
            <ArrowRight size={18} className="btn-arrow" />
          </button>
        </form>
      </div>
    );
  }

  // Month grid (Monday first) plus the selected day's times.
  const { y, m } = month ?? { y: Number(day!.slice(0, 4)), m: Number(day!.slice(5, 7)) - 1 };
  const first = new Date(Date.UTC(y, m, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const count = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  const firstMonth = days[0].slice(0, 7);
  const lastMonth = days[days.length - 1].slice(0, 7);
  const thisMonth = keyOf(y, m, 1).slice(0, 7);
  const shift = (n: number) => {
    const d = new Date(Date.UTC(y, m + n, 1));
    setMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };
  const times = (day && byDay.get(day)) || [];

  return (
    <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[17px] font-bold">{monthLabel(y, m)}</p>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Previous month"
              disabled={thisMonth <= firstMonth}
              onClick={() => shift(-1)}
              className="grid size-10 place-items-center border border-line transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next month"
              disabled={thisMonth >= lastMonth}
              onClick={() => shift(1)}
              className="grid size-10 place-items-center border border-line transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="t-label pb-2 text-slate">
              {w}
            </span>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <span key={`x${i}`} />;
            const k = keyOf(y, m, d);
            const open = byDay.has(k);
            const selected = k === day;
            return (
              <button
                key={k}
                type="button"
                disabled={!open}
                aria-pressed={selected}
                aria-label={`${fmtLongDate(k)}${open ? "" : ", no free times"}`}
                onClick={() => {
                  setDay(k);
                  setSlot(null);
                }}
                className={`relative grid aspect-square place-items-center text-[15px] transition-colors ${
                  selected
                    ? "bg-ink font-bold text-white"
                    : open
                      ? "bg-mist font-bold text-ink hover:bg-mist-2"
                      : "cursor-default text-[#a9adab]"
                }`}
              >
                {d}
                {open && !selected && <span aria-hidden className="absolute bottom-1.5 size-1 bg-mint-ink" />}
              </button>
            );
          })}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[13px] text-slate">
          <Globe size={14} /> Times shown in {tz.replace(/_/g, " ")}
        </p>
      </div>

      <div>
        <p className="text-[17px] font-bold">{day ? fmtLongDate(day) : "Pick a day"}</p>
        <p className="mt-1 text-[14px] text-slate">{load.duration}-minute video call</p>
        <div className="mt-5 grid max-h-[340px] grid-cols-2 gap-2 overflow-y-auto pr-1 md:grid-cols-1">
          {times.map((s) => {
            const selected = s === slot;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={selected}
                onClick={() => setSlot(s)}
                className={`min-h-12 border text-[15px] font-bold transition-colors ${
                  selected ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
                }`}
              >
                {fmtTime(s, tz)}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          disabled={!slot}
          onClick={() => setStep("details")}
          className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next <ArrowRight size={18} className="btn-arrow" />
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={`book-${name}`} className="text-[14px] font-bold">
        {label}
        {required && <span className="text-deep-copper"> *</span>}
      </label>
      <input
        id={`book-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="field-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `book-${name}-error` : undefined}
      />
      {error && (
        <p id={`book-${name}-error`} className="text-[13px] text-deep-copper">
          {error}
        </p>
      )}
    </div>
  );
}
