import { NextResponse } from "next/server";
import { cleanJourney, pushLead } from "@/lib/leads";

// Enquiries go to the leads sheet, whose Apps Script also emails the new-lead alert
// (apps-script/leads/Code.gs). Without LEADS_WEBHOOK_URL the route answers 503 and the
// form falls back to opening the visitor's email app.
export async function POST(req: Request) {
  let data: Record<string, string> & { journey?: unknown };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (data.company_website) return NextResponse.json({ ok: true }); // honeypot: silently accept bots

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please fill in your name, a valid email and a short message." }, { status: 422 });
  }

  const result = await pushLead(
    {
      action: "contact",
      name: name.slice(0, 100),
      email: email.slice(0, 200),
      company: String(data.company ?? "").slice(0, 150),
      teamSize: String(data.teamSize ?? "").slice(0, 40),
      interest: String(data.interest ?? "").slice(0, 150),
      message: message.slice(0, 4000),
    },
    cleanJourney(data.journey),
  );
  if (result === "not-configured") return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  if (result === "failed") return NextResponse.json({ ok: false, error: "delivery-failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
