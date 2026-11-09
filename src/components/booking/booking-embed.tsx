"use client";

import { useEffect, useRef, useState } from "react";
import { trackLead } from "@/lib/analytics";
import { getJourney } from "@/lib/journey";

// The booking calendar is our own scheduling app (Personal Scheduler, on Netlify), shown in an iframe.
// It talks to this page with postMessage:
//   ready   -> we answer with the visitor's journey (for the Leads sheet)
//   height  -> we resize the iframe so it never shows its own scrollbar
//   booked  -> we record the lead in analytics
const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL || "https://book.salnethub.com").replace(/\/$/, "");
const BOOKING_ORIGIN = new URL(BOOKING_URL).origin;
const EVENT = "30min";

export function BookingEmbed() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(680);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== BOOKING_ORIGIN || e.source !== frame.current?.contentWindow) return;
      const type = e.data?.type;
      if (type === "salnethub-booking:ready") {
        frame.current?.contentWindow?.postMessage({ type: "salnethub-booking:journey", journey: getJourney() }, BOOKING_ORIGIN);
      } else if (type === "salnethub-booking:height") {
        const h = Number(e.data.height);
        if (Number.isFinite(h) && h > 200 && h < 5000) setHeight(Math.ceil(h));
      } else if (type === "salnethub-booking:booked") {
        trackLead("booked_call");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div>
      <iframe
        ref={frame}
        src={`${BOOKING_URL}/${EVENT}?embed=1`}
        title="Book a call with SalnetHub"
        style={{ height }}
        className="block w-full border-0 bg-transparent"
        loading="lazy"
      />
      <p className="mt-4 text-[13px] text-slate">
        Calendar not showing?{" "}
        <a href={`${BOOKING_URL}/${EVENT}`} target="_blank" rel="noopener" className="font-bold underline underline-offset-4">
          Open it in a new tab
        </a>
      </p>
    </div>
  );
}
