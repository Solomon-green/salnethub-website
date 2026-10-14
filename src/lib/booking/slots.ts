import { booking } from "@/content/booking";

export type Busy = { start: string; end: string };

const MIN = 60_000;

// Offset of a time zone from UTC at a given instant, in ms (positive east of UTC).
function zoneOffset(ts: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(ts));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(ts / 1000) * 1000;
}

// Wall-clock time in a zone to a UTC timestamp (handles DST by re-checking the offset).
function zonedToUtc(y: number, m: number, d: number, minutes: number, timeZone: string) {
  const guess = Date.UTC(y, m, d, 0, minutes);
  const first = guess - zoneOffset(guess, timeZone);
  const second = guess - zoneOffset(first, timeZone);
  return second;
}

function todayIn(timeZone: string, now: number) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date(now))
    .split("-")
    .map(Number);
  return { y, m: m - 1, d };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function bookingWindow(now = Date.now()) {
  return { timeMin: new Date(now).toISOString(), timeMax: new Date(now + (booking.daysAhead + 1) * 24 * 60 * MIN).toISOString() };
}

// Every free slot start (ISO, UTC) inside the booking window.
export function freeSlots(busy: Busy[], now = Date.now()): string[] {
  const { y, m, d } = todayIn(booking.timeZone, now);
  const earliest = now + booking.minNoticeHours * 60 * MIN;
  const duration = booking.durationMinutes * MIN;
  const buffer = booking.bufferMinutes * MIN;
  const ranges = busy.map((b) => [Date.parse(b.start) - buffer, Date.parse(b.end) + buffer] as const);
  const dayStart = toMinutes(booking.dayStart);
  const dayEnd = toMinutes(booking.dayEnd);
  const slots: string[] = [];

  for (let i = 0; i <= booking.daysAhead; i++) {
    const date = new Date(Date.UTC(y, m, d + i));
    if (!booking.workDays.includes(date.getUTCDay())) continue;
    for (let t = dayStart; t + booking.durationMinutes <= dayEnd; t += booking.slotStepMinutes) {
      const start = zonedToUtc(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), t, booking.timeZone);
      const end = start + duration;
      if (start < earliest) continue;
      if (ranges.some(([bs, be]) => bs < end && be > start)) continue;
      slots.push(new Date(start).toISOString());
    }
  }
  return slots;
}

export function isValidTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
