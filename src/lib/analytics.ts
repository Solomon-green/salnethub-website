import { sendGAEvent } from "@next/third-parties/google";

/** GA4 "generate_lead" event (mark it as a key event in GA4). No-op where GA is not loaded. */
export function trackLead(method: "contact_form" | "booked_call") {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  sendGAEvent("event", "generate_lead", { method });
}
