import { NextResponse } from "next/server";
import { booking } from "@/content/booking";
import { bookingConfigured, busyTimes } from "@/lib/booking/google";
import { bookingWindow, freeSlots } from "@/lib/booking/slots";

// Free slot start times only: event titles and details never leave the server.
export async function GET() {
  if (!bookingConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  try {
    const { timeMin, timeMax } = bookingWindow();
    const slots = freeSlots(await busyTimes(timeMin, timeMax));
    return NextResponse.json(
      { ok: true, slots, durationMinutes: booking.durationMinutes },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[booking] availability", err);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 502 });
  }
}
