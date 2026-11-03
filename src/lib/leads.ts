// Sends each lead, with the visitor's page journey, to the "SalnetHub Website Leads" Google Sheet
// through its Apps Script web app (apps-script/leads/Code.gs). Set LEADS_WEBHOOK_URL and
// LEADS_WEBHOOK_SECRET in Vercel; without them this does nothing.

export type Lead = {
  action: "contact" | "booking";
  name: string;
  email: string;
  company?: string;
  teamSize?: string;
  interest?: string;
  message?: string;
  callTime?: string;
};

type Journey = {
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  landing: string;
  pages: { path: string }[];
  visits: number;
  timeOnSite: number;
  firstSeen: string;
  device: string;
};

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const num = (v: unknown, max: number) => Math.min(Math.max(Math.round(Number(v) || 0), 0), max);

/** Keeps only the expected fields from the browser's journey, with sane sizes. */
export function cleanJourney(raw: unknown): Journey | null {
  if (!raw || typeof raw !== "object") return null;
  const j = raw as Record<string, unknown>;
  const pages = (Array.isArray(j.pages) ? j.pages : [])
    .slice(-50)
    .map((p) => ({ path: str((p as { path?: unknown })?.path, 200) }))
    .filter((p) => p.path.startsWith("/"));
  const firstSeen = str(j.firstSeen, 40);
  return {
    source: str(j.source, 100),
    medium: str(j.medium, 100),
    campaign: str(j.campaign, 150),
    referrer: str(j.referrer, 300),
    landing: str(j.landing, 200),
    pages,
    visits: num(j.visits, 1000),
    timeOnSite: num(j.timeOnSite, 30 * 24 * 3600),
    firstSeen: Number.isNaN(Date.parse(firstSeen)) ? "" : firstSeen,
    device: ["Desktop", "Mobile", "Tablet"].includes(String(j.device)) ? String(j.device) : "",
  };
}

export async function pushLead(lead: Lead, journey: Journey | null) {
  const url = process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.LEADS_WEBHOOK_SECRET;
  if (!url || !secret) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Local and preview leads land in the "Test Leads" tab, live ones in "Leads".
      body: JSON.stringify({ secret, test: process.env.VERCEL_ENV !== "production", lead, journey }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok !== true) console.error("[leads] sheet rejected the lead", res.status, json.error);
  } catch (err) {
    console.error("[leads] sheet unreachable", err);
  }
}
