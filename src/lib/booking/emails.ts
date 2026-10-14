import { booking } from "@/content/booking";
import { site } from "@/content/site";

export type Booked = {
  start: string;
  name: string;
  email: string;
  company: string;
  notes: string;
  guestTimeZone: string;
  meetLink?: string;
  eventLink: string;
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function formatWhen(iso: string, timeZone: string) {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
  const time = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short" }).format(d);
  return { date, time };
}

// Table-based, inline-styled HTML so it renders the same in Gmail, Outlook and Apple Mail.
function layout(heading: string, intro: string, rows: [string, string][], cta?: { label: string; href: string }, footer?: string) {
  const rowHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:12px 0;border-top:1px solid #d4d8d6;color:#5a5d60;font-size:14px;width:120px;vertical-align:top">${k}</td><td style="padding:12px 0;border-top:1px solid #d4d8d6;color:#17191c;font-size:15px;font-weight:700">${v}</td></tr>`,
    )
    .join("");
  const button = cta
    ? `<a href="${cta.href}" style="display:inline-block;margin-top:28px;background:#17191c;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:15px 24px">${cta.label}</a>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f2f2f3;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f3;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="background:#1e3a30;padding:22px 32px;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.01em">SalnetHub<span style="color:#2ee6a6">.</span></td></tr>
<tr><td style="background:#ffffff;padding:36px 32px">
<h1 style="margin:0;color:#17191c;font-size:26px;line-height:1.15;letter-spacing:-0.02em">${heading}</h1>
<p style="margin:14px 0 26px;color:#5a5d60;font-size:16px;line-height:1.55">${intro}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowHtml}</table>
${button}
${footer ? `<p style="margin:28px 0 0;color:#5a5d60;font-size:14px;line-height:1.55">${footer}</p>` : ""}
</td></tr>
<tr><td style="padding:20px 32px;color:#5a5d60;font-size:12px">SalnetHub · Business automation and AI agents · <a href="${site.url}" style="color:#0a7350">${site.url.replace(/^https?:\/\//, "")}</a></td></tr>
</table></td></tr></table></body></html>`;
}

export function guestEmail(b: Booked) {
  const { date, time } = formatWhen(b.start, b.guestTimeZone);
  const first = b.name.split(/\s+/)[0];
  const rows: [string, string][] = [
    ["Date", esc(date)],
    ["Time", esc(time)],
    ["Length", `${booking.durationMinutes} minutes`],
    ["Where", b.meetLink ? `<a href="${b.meetLink}" style="color:#0a7350">Google Meet</a>` : "Video call (link in the calendar invite)"],
  ];
  const html = layout(
    "Your call is booked",
    `Thanks ${esc(first)}. We will look at how the work happens today and tell you plainly what we would automate first.`,
    rows,
    b.meetLink ? { label: "Join the call", href: b.meetLink } : undefined,
    "A calendar invite is on its way separately. Need a different time? Just reply to this email.",
  );
  const text = [
    `Thanks ${first}, your call with SalnetHub is booked.`,
    "",
    `Date: ${date}`,
    `Time: ${time}`,
    `Length: ${booking.durationMinutes} minutes`,
    `Join: ${b.meetLink ?? "link in the calendar invite"}`,
    "",
    "Need a different time? Just reply to this email.",
  ].join("\n");
  return { subject: `Booked: SalnetHub call on ${date}`, html, text };
}

export function ownerEmail(b: Booked) {
  const { date, time } = formatWhen(b.start, booking.timeZone);
  const guest = formatWhen(b.start, b.guestTimeZone);
  const rows: [string, string][] = [
    ["When", `${esc(date)}<br>${esc(time)}`],
    ["Name", esc(b.name)],
    ["Email", `<a href="mailto:${esc(b.email)}" style="color:#0a7350">${esc(b.email)}</a>`],
    ["Company", esc(b.company || "Not given")],
    ["Their time", `${esc(guest.time)} (${esc(b.guestTimeZone)})`],
    ["Notes", esc(b.notes || "None").replace(/\n/g, "<br>")],
  ];
  const html = layout("New call booked", `${esc(b.name)} booked a ${booking.durationMinutes}-minute call from the website.`, rows, {
    label: "Open in calendar",
    href: b.eventLink,
  });
  const text = [
    `New call booked from the website.`,
    "",
    `When: ${date}, ${time}`,
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `Company: ${b.company || "Not given"}`,
    `Notes: ${b.notes || "None"}`,
    `Meet: ${b.meetLink ?? "n/a"}`,
    `Event: ${b.eventLink}`,
  ].join("\n");
  return { subject: `New booking: ${b.name}, ${date} ${time}`, html, text };
}
