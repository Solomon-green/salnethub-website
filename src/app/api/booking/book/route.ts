import { NextResponse } from "next/server";
import { booking } from "@/content/booking";
import { bookingConfigured, busyTimes, createEvent, sendEmail } from "@/lib/booking/google";
import { guestEmail, ownerEmail } from "@/lib/booking/emails";
import { bookingWindow, freeSlots, isValidTimeZone } from "@/lib/booking/slots";

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (data.company_website) return NextResponse.json({ ok: true }); // honeypot: silently accept bots

  const start = String(data.start ?? "");
  const name = clean(data.name, 100);
  const email = clean(data.email, 200);
  const company = clean(data.company, 120);
  const notes = String(data.notes ?? "").trim().slice(0, 2000);
  const tz = String(data.timeZone ?? "");
  const guestTimeZone = isValidTimeZone(tz) ? tz : booking.timeZone;

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || Number.isNaN(Date.parse(start))) {
    return NextResponse.json({ ok: false, error: "Please fill in your name and a valid email." }, { status: 422 });
  }
  if (!bookingConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

  try {
    // Re-check against the live calendar so two visitors can't take the same slot.
    const { timeMin, timeMax } = bookingWindow();
    const startIso = new Date(start).toISOString();
    if (!freeSlots(await busyTimes(timeMin, timeMax)).includes(startIso)) {
      return NextResponse.json({ ok: false, error: "slot-taken" }, { status: 409 });
    }

    const end = new Date(Date.parse(startIso) + booking.durationMinutes * 60_000).toISOString();
    const event = await createEvent({
      summary: `${booking.title}: ${name}${company ? ` (${company})` : ""}`,
      description: [`Booked from the SalnetHub website.`, ``, `Name: ${name}`, `Email: ${email}`, `Company: ${company || "Not given"}`, ``, notes || "No notes."].join("\n"),
      start: startIso,
      end,
      guest: { email, name },
      requestId: crypto.randomUUID(),
    });

    const details = { start: startIso, name, email, company, notes, guestTimeZone, meetLink: event.meetLink, eventLink: event.htmlLink };
    // The event exists at this point, so an email failure is logged rather than reported as a failed booking.
    const owner = process.env.BOOKING_NOTIFY_EMAIL || process.env.BOOKING_OWNER_EMAIL!;
    const results = await Promise.allSettled([
      sendEmail({ to: email, ...guestEmail(details) }),
      sendEmail({ to: owner, replyTo: email, ...ownerEmail(details) }),
    ]);
    results.forEach((r) => r.status === "rejected" && console.error("[booking] email", r.reason));

    return NextResponse.json({ ok: true, start: startIso, end, meetLink: event.meetLink ?? null });
  } catch (err) {
    console.error("[booking] book", err);
    return NextResponse.json({ ok: false, error: "booking-failed" }, { status: 502 });
  }
}
