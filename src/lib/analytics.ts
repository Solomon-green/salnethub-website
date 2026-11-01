import { sendGAEvent } from "@next/third-parties/google";

/** GA4 "generate_lead" event (mark it as a key event in GA4). No-op when GA is not configured. */
export function trackLead(method: "contact_form" | "booked_call") {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", "generate_lead", { method });
}
