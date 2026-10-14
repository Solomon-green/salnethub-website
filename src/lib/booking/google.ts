import type { Busy } from "./slots";

// Talks to Google Calendar and Gmail with the owner's OAuth refresh token (see README → Booking).
// Plain fetch keeps the googleapis SDK out of the bundle.

const CALENDAR = "https://www.googleapis.com/calendar/v3";
const calendarId = () => encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || "primary");

export function bookingConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN && process.env.BOOKING_OWNER_EMAIL,
  );
}

let cached: { token: string; expires: number } | null = null;

async function accessToken() {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Google token refresh failed: ${json.error ?? res.status}`);
  cached = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 };
  return cached.token;
}

async function google(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Google API ${res.status}: ${json.error?.message ?? "unknown error"}`);
  return json;
}

export async function busyTimes(timeMin: string, timeMax: string): Promise<Busy[]> {
  const id = process.env.GOOGLE_CALENDAR_ID || "primary";
  const json = await google(`${CALENDAR}/freeBusy`, { timeMin, timeMax, items: [{ id }] });
  const cal = json.calendars?.[id];
  if (!cal || cal.errors?.length) throw new Error(`Free/busy lookup failed: ${JSON.stringify(cal?.errors ?? "no calendar")}`);
  return cal.busy;
}

export async function createEvent(e: {
  summary: string;
  description: string;
  start: string;
  end: string;
  guest: { email: string; name: string };
  requestId: string;
}): Promise<{ id: string; htmlLink: string; meetLink?: string }> {
  const json = await google(`${CALENDAR}/calendars/${calendarId()}/events?conferenceDataVersion=1&sendUpdates=all`, {
    summary: e.summary,
    description: e.description,
    start: { dateTime: e.start },
    end: { dateTime: e.end },
    attendees: [{ email: e.guest.email, displayName: e.guest.name }],
    conferenceData: { createRequest: { requestId: e.requestId, conferenceSolutionKey: { type: "hangoutsMeet" } } },
    reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 10 }, { method: "email", minutes: 60 }] },
  });
  return { id: json.id, htmlLink: json.htmlLink, meetLink: json.hangoutLink };
}

const b64url = (s: string) => Buffer.from(s, "utf8").toString("base64url");
// MIME bodies: base64 wrapped at 76 characters per RFC 2045.
const b64body = (s: string) => Buffer.from(s, "utf8").toString("base64").replace(/.{76}/g, "$&\r\n");
const encodeHeader = (s: string) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${Buffer.from(s, "utf8").toString("base64")}?=`);

export async function sendEmail(m: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const from = process.env.BOOKING_OWNER_EMAIL!;
  const boundary = `b_${crypto.randomUUID()}`;
  const mime = [
    `From: ${encodeHeader("SalnetHub")} <${from}>`,
    `To: ${m.to}`,
    ...(m.replyTo ? [`Reply-To: ${m.replyTo}`] : []),
    `Subject: ${encodeHeader(m.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    b64body(m.text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    b64body(m.html),
    `--${boundary}--`,
  ].join("\r\n");
  await google("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", { raw: b64url(mime) });
}
