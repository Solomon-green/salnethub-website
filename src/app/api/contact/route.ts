import { NextResponse } from "next/server";

// Free form delivery via Web3Forms (https://web3forms.com): set WEB3FORMS_ACCESS_KEY in Vercel.
// Without a key the route answers 503 and the form shows the email fallback instead.
export async function POST(req: Request) {
  let data: Record<string, string>;
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

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: `New enquiry from ${name}${data.company ? ` (${data.company})` : ""}`,
      from_name: "SalnetHub website",
      replyto: email,
      name,
      email,
      company: data.company ?? "",
      team_size: data.teamSize ?? "",
      interest: data.interest ?? "",
      message,
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    return NextResponse.json({ ok: false, error: "delivery-failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
