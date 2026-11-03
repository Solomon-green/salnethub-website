// The visitor's page journey, kept in their own browser and only sent to us with a form or booking.
// Recorded only after the visitor accepts cookies (see ConsentManager). Expires after 30 days.

const KEY = "sh-journey";
const VERSION = 1;
const MAX_PAGES = 50;
const VISIT_GAP_MS = 30 * 60_000; // a new visit starts after 30 minutes away
const LIFETIME_MS = 30 * 24 * 60 * 60_000;

export type Journey = {
  v: number;
  firstSeen: string;
  lastSeen: string;
  visits: number;
  activeSeconds: number;
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  landing: string;
  pages: { path: string; title: string; at: string }[];
};

function read(): Journey | null {
  try {
    const j = JSON.parse(localStorage.getItem(KEY) ?? "null") as Journey | null;
    if (!j || j.v !== VERSION || Date.now() - Date.parse(j.firstSeen) > LIFETIME_MS) return null;
    return j;
  } catch {
    return null;
  }
}

function write(j: Journey) {
  try {
    localStorage.setItem(KEY, JSON.stringify(j));
  } catch {
    // Storage full or blocked: the journey is simply not kept.
  }
}

export function clearJourney() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

// Where the visitor came from: campaign tags first, then the referring site.
function firstTouch() {
  const q = new URLSearchParams(location.search);
  const ref = document.referrer ? new URL(document.referrer) : null;
  const external = ref && ref.hostname.replace(/^www\./, "") !== location.hostname.replace(/^www\./, "") ? ref : null;
  const host = external?.hostname.replace(/^www\./, "") ?? "";

  let source = q.get("utm_source") ?? "";
  let medium = q.get("utm_medium") ?? "";
  if (!source && q.get("gclid")) [source, medium] = ["google", "cpc"];
  if (!source && host) {
    const known: [RegExp, string, string][] = [
      [/(^|\.)google\./, "google", "organic"],
      [/(^|\.)bing\.com$/, "bing", "organic"],
      [/duckduckgo\.com$/, "duckduckgo", "organic"],
      [/(^|\.)linkedin\.com$|^lnkd\.in$/, "linkedin", "social"],
      [/(^|\.)upwork\.com$/, "upwork", "referral"],
      [/(^|\.)facebook\.com$|^fb\.me$|(^|\.)instagram\.com$/, "meta", "social"],
      [/^t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/, "x", "social"],
      [/chatgpt\.com$|perplexity\.ai$|claude\.ai$|gemini\.google\.com$/, host, "ai"],
    ];
    const hit = known.find(([re]) => re.test(host));
    [source, medium] = hit ? [hit[1], hit[2]] : [host, "referral"];
  }
  return {
    source: source || "(direct)",
    medium: medium || "(none)",
    campaign: q.get("utm_campaign") ?? "",
    referrer: external ? external.origin + external.pathname : "",
  };
}

/** Records a page view. Call only when the visitor has accepted cookies. */
export function recordPage(path: string, title: string) {
  if (/^\/(keystatic|api)(\/|$)/.test(path)) return;
  const now = new Date();
  const iso = now.toISOString();
  const j = read();

  if (!j) {
    write({ v: VERSION, firstSeen: iso, lastSeen: iso, visits: 1, activeSeconds: 0, landing: path, pages: [{ path, title, at: iso }], ...firstTouch() });
    return;
  }

  const gap = now.getTime() - Date.parse(j.lastSeen);
  if (gap > VISIT_GAP_MS) j.visits += 1;
  else j.activeSeconds += Math.round(gap / 1000);
  j.lastSeen = iso;
  if (j.pages.at(-1)?.path !== path) j.pages = [...j.pages, { path, title, at: iso }].slice(-MAX_PAGES);
  write(j);
}

/** The journey to attach to a form or booking, or null when nothing was recorded. */
export function getJourney() {
  const j = read();
  if (!j) return null;
  const sinceLast = Date.now() - Date.parse(j.lastSeen);
  const ua = navigator.userAgent;
  const device = /iPad|Tablet/i.test(ua) ? "Tablet" : /Mobi|Android|iPhone/i.test(ua) ? "Mobile" : "Desktop";
  return {
    source: j.source,
    medium: j.medium,
    campaign: j.campaign,
    referrer: j.referrer,
    landing: j.landing,
    pages: j.pages,
    visits: j.visits,
    timeOnSite: j.activeSeconds + (sinceLast < VISIT_GAP_MS ? Math.round(sinceLast / 1000) : 0),
    firstSeen: j.firstSeen,
    device,
  };
}
