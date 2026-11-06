// Builds the SalnetHub chat assistant's knowledge base from the site's own content files,
// so it always matches what the website says. Run after changing services, prices or copy:
//
//   node scripts/build-knowledge-base.mjs
//
// Writes knowledge-base/salnethub-knowledge-base.json (one self-contained document per topic,
// ready for a vector store) and knowledge-base/salnethub-knowledge-base.pdf (the same content
// for people, or for a Drive-to-Pinecone loader). Sample case studies and sample testimonials
// are left out on purpose: the assistant must never quote clients that do not exist.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { site } from "../src/content/site.ts";
import { booking } from "../src/content/booking.ts";
import { leadExample, pricing, pricingFaqs, pricingHero, pricingLadder, pricingModels, pricingPromises, pricingSteps, timeExample } from "../src/content/engagements.ts";
import { principles, processSteps } from "../src/content/process.ts";
import { integrationCategories, integrations } from "../src/content/integrations.ts";
import { groups, services } from "../src/content/services.ts";
import { outcomes } from "../src/content/outcomes.ts";
import { calculator, leadCalculator } from "../src/content/calculator.ts";

const OUT = "knowledge-base";
const UPDATED = new Date().toISOString().slice(0, 10);
const url = (path) => `${site.url}${path}`;
const list = (items) => items.map((i) => `- ${i}`).join("\n");
const toolName = (slug) => integrations.find((i) => i.slug === slug)?.name ?? slug;

// Copy that lives in page files rather than src/content. Keep in step with those pages.
const pageCopy = {
  about: {
    intro:
      "SalnetHub is an automation and AI company for small-to-medium teams and businesses. We build the connections between your tools so work moves on its own.",
    story: [
      "Most teams do not need more software. They need the software they have to work together.",
      "A typical small-to-medium business runs on 10 to 30 tools: a CRM, Google Workspace, accounting, a project board, forms, chat. Each one works well on its own. The trouble is the space between them, where people copy data, chase updates and rebuild the same report every week.",
      "That is where SalnetHub works. We map how your work actually happens, then connect your tools so information moves on its own. Where judgment is needed, we add AI that works from your data and keeps a person in control.",
      "Automation is our core. We also build websites and AI assistants, because they work best when they are part of the same connected system.",
      "Our line: Smarter systems. Better decisions. Greater impact.",
    ],
    believe: [
      "Your team should spend its time on work that needs a person.",
      "Automation should use the tools you already pay for.",
      "Every system we build should be documented and owned by you.",
      "AI should answer from your data, with a person in control.",
    ],
    who: [
      ["Service businesses", "Agencies, consultancies, accounting and legal practices where client admin eats billable hours."],
      ["E-commerce and retail", "Online stores and wholesalers handling orders, stock and customer messages across several tools."],
      ["Property and logistics", "Teams coordinating bookings, maintenance, quotes and documents with many moving parts."],
      ["Growing sales teams", "Teams of 3 to 50 reps who need leads routed, followed up and reported without extra admin."],
    ],
  },
  home: {
    hero:
      "We design and build automations and AI agents across your whole operation: sales, marketing, admin, finance, reporting and customer support. Your tools finally work as one system, and your team gets back to the work that moves the business forward.",
    before: [
      ["Replying to a new lead", "The next working day", "Under 2 minutes, day or night"],
      ["The weekly sales report", "Half of every Monday", "In your inbox at 8 am"],
      ["Order details from email", "Copied by hand, 40 a day", "Added to the sheet as they arrive"],
      ["Onboarding a new client", "2 hours across 5 tools", "One trigger, under 5 minutes"],
    ],
    promises: [
      ["Pay for results", "Per booked appointment, or a capped share of the time we save you."],
      ["If it fails, you owe nothing", "Every engagement starts with a pilot. No result, no bill for the build."],
      ["Live in weeks", "Your first workflow is usually live in 1 to 2 weeks."],
      ["Documented and handed over", "A written guide and recorded walkthrough for every build."],
    ],
    faqs: [
      ["What kind of businesses do you work with?", "Small-to-medium teams and businesses, usually 5 to 200 people, in services, e-commerce, property, logistics and professional firms. If your team copies data between tools, we can probably help."],
      ["Do we need to change the tools we use?", "No. We build on what you already run, such as Google Workspace, HubSpot or your accounting software, and add a connector like Make, Zapier or n8n only where needed."],
      ["How quickly will we see results?", "A single workflow is usually live within 1 to 2 weeks. Larger systems go live in stages, so you get value before the whole project is finished."],
      ["What happens if an automation breaks?", "You get an alert, and we fix it. Monitoring is included in your monthly fee, so we usually spot problems before you do. When it is our mistake, we say so and fix it at no cost."],
    ],
  },
  howWeWork: {
    commitments: [
      ["Pay for results", "We prove it in a 14-day pilot first, then charge per booking or a capped share of the time we save. No hourly surprises."],
      ["Weekly updates in plain words", "Every week you hear what was built, what is next and anything we need from you."],
      ["Built in a safe copy first", "We build and test away from live data, so your daily work is never interrupted."],
      ["You own everything", "Automations live in your accounts. If we part ways, everything keeps running."],
      ["Documentation included", "Every build ships with a written guide and a recorded walkthrough."],
      ["30 days of aftercare", "We monitor and fix every new build for 30 days after launch at no extra cost."],
    ],
    week: [
      ["Monday", "Short written update: progress, blockers, decisions needed."],
      ["Mid-week", "Demo link or recording of what is working so far."],
      ["Friday", "Plan for next week and any access or data we need."],
    ],
    faqs: [
      ["How much of our team's time will this take?", "About 2 hours in the first week for discovery, then 30 minutes a week for feedback. Testing needs one or two people for a few hours."],
      ["What access do you need?", "Only what the workflow touches, granted through your own admin settings. We use separate logins where possible and remove access when you ask."],
      ["Do you sign NDAs?", "Yes. We are happy to sign your NDA or provide ours before discovery."],
      ["What if our requirements change mid-project?", "Small changes are absorbed. Larger ones are written up with their cost and timeline, and you decide before we do the work."],
    ],
  },
  problems: [
    ["Leads wait hours or days for a reply", "lead-acquisition-qualification"],
    ["Our CRM is never up to date", "marketing-crm-automation"],
    ["Reports take a day to put together", "data-reporting-analytics"],
    ["Onboarding and approvals keep stalling", "business-process-automation"],
    ["The team spends hours copying data", "task-workflow-automation"],
    ["Visitors leave without asking anything", "ai-chatbots"],
    ["Someone reads and routes every request", "custom-ai-agents"],
    ["Nobody can find the right document", "rag-systems"],
    ["Our website does not bring in leads", "web-solutions"],
  ],
};

const docs = [];
const add = (id, title, category, path, content, tags = []) =>
  docs.push({ id, title, category, url: url(path), tags, content: content.trim() });

// ---- Company ----
add("company-overview", "About SalnetHub", "Company", "/about", `
${site.name}: ${site.tagline}
${pageCopy.about.intro}
${site.description}
${pageCopy.home.hero}

${pageCopy.about.story.join("\n\n")}

Founder: Bwire Solomon, Founder of SalnetHub. Solomon has built automations, CRM workflows and AI agents for 53 client projects since 2023, mostly for small teams running on Google Workspace, HubSpot, Zoho, Make, Zapier and n8n.
Track record: ${site.proof}.
Based in: Kampala, Uganda. SalnetHub works with clients worldwide, remotely.
Website: ${site.url}
Email: ${site.email}
`, ["about", "company", "founder", "location"]);

add("company-beliefs", "What SalnetHub believes and how we behave", "Company", "/about", `
What SalnetHub believes:
${list(pageCopy.about.believe)}

How we behave. Four principles shape how SalnetHub writes, builds and supports:
${principles.map((p) => `- ${p.name}: ${p.body}`).join("\n")}
`, ["values", "principles"]);

add("company-who-we-work-with", "Who SalnetHub works with", "Company", "/about", `
SalnetHub works with small-to-medium teams and businesses, usually between 5 and 200 people, that have outgrown doing everything by hand. If your team copies data between tools, we can probably help.

${pageCopy.about.who.map(([t, b]) => `- ${t}: ${b}`).join("\n")}
`, ["customers", "industries", "fit"]);

add("company-contact", "Contact SalnetHub and book a call", "Contact", "/contact", `
The best way to start with SalnetHub is a free ${booking.durationMinutes}-minute discovery call on Google Meet. Book it at ${url("/contact#book")}.

What happens:
1. Pick a time that suits you. Times show in your own time zone.
2. We look at your workflow: your tools and process, and the first workflow worth automating.
3. A pilot plan. If it is a fit, you get a clear target, a 14-day pilot and a price based on your own numbers, in writing. No obligation.

Booking details: calls are offered Monday to Friday, ${booking.dayStart} to ${booking.dayEnd} East Africa Time (EAT, UTC+3), with at least ${booking.minNoticeHours} hours' notice and up to ${booking.daysAhead} days ahead. You get a Google Meet link and a calendar invite by email straight away.

Prefer to write first? Use the contact form at ${url("/contact")} or email ${site.email}. SalnetHub replies within 1 business day.
`, ["contact", "booking", "email", "call", "meeting"]);

// ---- Services ----
add("services-overview", "SalnetHub services at a glance", "Services", "/services", `
SalnetHub offers ${services.length} services in three groups. Automation is what we do most. AI and web projects build on the same foundation: your tools, connected, with clear owners and documentation.

${Object.entries(groups).map(([g, info]) => `${info.name}: ${info.blurb}\n${services.filter((s) => s.group === g).map((s) => `- ${s.name} (${s.priceModel}): ${s.short} ${url(`/services/${s.slug}`)}`).join("\n")}`).join("\n\n")}

Most projects combine two or three of these services. The free call ranks every opportunity by what it costs you today.
`, ["services", "overview"]);

add("services-by-problem", "Which SalnetHub service fits your problem", "Services", "/services", `
Start with the problem. Pick the sentence that sounds most like your week. That is usually the best first project.

${pageCopy.problems.map(([p, slug]) => { const s = services.find((x) => x.slug === slug); return `- "${p}" → ${s.name} (${s.priceModel}). ${url(`/services/${slug}`)}`; }).join("\n")}

By outcome:
${outcomes.map((o) => `- ${o.label}: ${o.title}. ${o.body} Services: ${o.services.map((slug) => services.find((s) => s.slug === slug)?.name).join(", ")}.`).join("\n")}

Not sure which one you need? Book a free 20-minute call and we will work out which problem costs you most.
`, ["services", "recommendation", "problems"]);

for (const s of services) {
  const path = `/services/${s.slug}`;
  add(`service-${s.slug}`, `${s.name}: overview and price`, "Service", path, `
SalnetHub service: ${s.name} (${groups[s.group].name}).
${s.short}
${s.hero.title}. ${s.hero.sub}

${s.problem.title}:
${s.problem.points.map((p) => `- ${p.title}: ${p.body}`).join("\n")}

${s.example.title}
Before: ${s.example.before}
After: ${s.example.after}

How you pay for ${s.name}: ${s.priceModel}. ${s.priceNote}
`, [s.slug, s.group, "service", "price"]);

  add(`service-${s.slug}-details`, `${s.name}: what is included and how it is delivered`, "Service", path, `
What SalnetHub's ${s.name} service includes:
${s.capabilities.map((c) => `- ${c.title}: ${c.body}`).join("\n")}

${s.workflow.title}: ${s.workflow.caption}
Steps: ${s.workflow.nodes.map((n) => `${n.label} (${n.meta})`).join(" → ")}

Deliverables:
${list(s.deliverables)}

Timeline:
${s.timeline.map((t) => `- ${t.phase} (${t.duration}): ${t.body}`).join("\n")}
${s.safeguards?.length ? `\nSafeguards:\n${s.safeguards.map((g) => `- ${g.title}: ${g.body}`).join("\n")}\n` : ""}
Tools we typically use for ${s.name}: ${s.tools.map(toolName).join(", ")}.
`, [s.slug, s.group, "service", "deliverables", "timeline"]);

  s.faqs.forEach((f, i) =>
    add(`service-${s.slug}-faq-${i + 1}`, `${s.name} FAQ: ${f.q}`, "FAQ", path, `
Question about SalnetHub's ${s.name} service: ${f.q}
Answer: ${f.a}
`, [s.slug, "faq"]),
  );
}

// ---- Pricing ----
const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

add("pricing-overview", "SalnetHub pricing: you pay for results, not promises", "Pricing", "/engagements", `
${pricingHero.title}. ${pricingHero.sub}

SalnetHub does not use a fixed price list. Every price is worked out from the client's own numbers, and is always below what the problem costs them today. All prices are in US dollars.

How pricing works:
${pricingSteps.map((s, i) => `${i + 1}. ${s.name}. ${s.body}`).join("\n")}

Third-party subscriptions and AI usage are paid directly to the providers, at cost. SalnetHub estimates them up front. For large one-off builds a fixed written quote is available after the pilot, if the client prefers.
`, ["pricing", "cost", "price", "how much", "quote", "pilot"]);

add("pricing-models", "SalnetHub's two ways to charge: pay per result, or pay from what you save", "Pricing", "/engagements", `
SalnetHub charges in one of two ways, depending on the result the work brings:

${pricingModels.map((m) => `${m.label} (${m.headline}). Used for: ${m.for}. ${m.body} How the price is set: ${m.howWePrice} Includes: ${m.points.join("; ")}.`).join("\n\n")}

Pilots: every engagement starts with a ${pricing.pilotDays}-day pilot. Pay-per-result pilots are free. Automation pilots cost ${pricing.pilotFee}, refunded in full if the pilot misses the target agreed at the start. If the pilot does not deliver, the client owes nothing for the build.
`, ["pricing", "pay per result", "pay per booking", "performance", "savings", "pilot", "refund"]);

add("pricing-examples", "Pricing examples: what a booked appointment and manual work really cost", "Pricing", "/engagements", `
These are illustrations of how SalnetHub calculates a price. Real prices are set from the client's own numbers on the free call.

Booked appointments: a business pays ${usd(leadExample.costPerLead)} per lead and 1 in ${Math.round(1 / leadExample.bookRate)} leads books. ${usd(leadExample.costPerLead)} ÷ ${leadExample.bookRate} = ${usd(leadExample.costPerLead / leadExample.bookRate)}: that is what one booked appointment really costs them. SalnetHub would charge about ${usd(leadExample.ourPrice)} per booked appointment, and only when it books.

Manual work: ${timeExample.people} people × ${timeExample.hoursPerWeek} hours a week × 4 weeks × ${usd(timeExample.rate)} an hour = ${usd(timeExample.people * timeExample.hoursPerWeek * 4 * timeExample.rate)} a month. SalnetHub's monthly fee would be at most ${Math.round(pricing.savingsCap * 100)}% of that saving, ${usd(timeExample.people * timeExample.hoursPerWeek * 4 * timeExample.rate * pricing.savingsCap)}, so the client keeps the rest.
`, ["pricing", "example", "cost per appointment", "roi"]);

add("pricing-promises", "SalnetHub's pricing promises and how clients grow", "Pricing", "/engagements", `
SalnetHub's pricing promises:
${pricingPromises.map((p) => `- ${p.name}: ${p.body}`).join("\n")}

Start small, grow with results:
${pricingLadder.map((s, i) => `${i + 1}. ${s.name}: ${s.body}`).join("\n")}
`, ["pricing", "guarantee", "refund", "contract", "cancel"]);

pricingFaqs.forEach((f, i) =>
  add(`pricing-faq-${i + 1}`, `Pricing FAQ: ${f.q}`, "FAQ", "/engagements", `
Question about SalnetHub pricing: ${f.q}
Answer: ${f.a}
`, ["pricing", "faq"]),
);

add("pricing-cost-calculator", "The SalnetHub cost calculator: manual work and lead bookings", "Pricing", "/", `
The SalnetHub home page has a calculator with two tabs.
Manual work: what copy-paste work costs per year: people × hours per week each × ${calculator.weeks} working weeks × hourly rate. It assumes, conservatively, that automation removes half of that time, and shows SalnetHub's fee at most ${Math.round(pricing.savingsCap * 100)}% of the saving.
Leads and bookings: what one lead costs ÷ the share of leads that book = what one booked appointment really costs. With SalnetHub the client pays less than that per booking, only when it books, with $0 up front. Default example: ${usd(leadCalculator.defaults.costPerLead)} per lead and ${leadCalculator.defaults.bookPct}% booking = ${usd(leadCalculator.defaults.costPerLead / (leadCalculator.defaults.bookPct / 100))} per booked appointment.
Example with the default numbers: ${calculator.defaults.people} people × ${calculator.defaults.hours} hours a week × ${calculator.weeks} weeks × $${calculator.defaults.rate} an hour = $${(calculator.defaults.people * calculator.defaults.hours * calculator.weeks * calculator.defaults.rate).toLocaleString("en-US")} a year, of which about half could be saved.

Typical outcomes from single-workflow projects:
${pageCopy.home.before.map(([a, b, c]) => `- ${a}: before, ${b.toLowerCase()}; after, ${c.toLowerCase()}.`).join("\n")}
`, ["roi", "savings", "calculator", "outcomes"]);

// ---- Process ----
add("process-steps", "How SalnetHub projects work: five steps", "Process", "/how-we-work", `
SalnetHub follows a clear process with results-based pricing, weekly updates and nothing installed on your side. Five steps, from first call to a system that keeps running. Each step ends with something concrete you can see, check and keep.

${processSteps.map((p, i) => `${i + 1}. ${p.step}: ${p.title}. ${p.body} Output: ${p.output}.`).join("\n")}
`, ["process", "how we work", "steps"]);

add("process-commitments", "What you can count on with SalnetHub", "Process", "/how-we-work", `
What you can count on when you work with SalnetHub:
${pageCopy.howWeWork.commitments.map(([t, b]) => `- ${t}: ${b}`).join("\n")}

Our promises:
${pageCopy.home.promises.map(([t, b]) => `- ${t}: ${b}`).join("\n")}

A typical project week. No long meetings. Short written updates you can read in two minutes, and a demo whenever there is something to see.
${pageCopy.howWeWork.week.map(([d, b]) => `- ${d}: ${b}`).join("\n")}
`, ["process", "guarantee", "ownership", "aftercare", "updates"]);

[...pageCopy.howWeWork.faqs, ...pageCopy.home.faqs].forEach(([q, a], i) =>
  add(`general-faq-${i + 1}`, `FAQ: ${q}`, "FAQ", i < pageCopy.howWeWork.faqs.length ? "/how-we-work" : "/", `
Question about working with SalnetHub: ${q}
Answer: ${a}
`, ["faq"]),
);

// ---- Integrations ----
add("integrations-overview", "Tools SalnetHub connects", "Integrations", "/integrations", `
SalnetHub connects ${integrations.length}+ tools your team already uses. We build on what you already run and add a connector like Make, Zapier or n8n only where needed. If a tool has an API, we can usually connect it.

${integrationCategories.map((c) => `${c}: ${integrations.filter((i) => i.category === c).map((i) => i.name).join(", ")}.`).join("\n")}
`, ["integrations", "tools", "stack"]);

for (const c of integrationCategories) {
  const slug = c.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");
  add(`integrations-${slug}`, `SalnetHub integrations: ${c}`, "Integrations", "/integrations", `
What SalnetHub does with ${c} tools:
${integrations.filter((i) => i.category === c).map((i) => `- ${i.name}: ${i.use}`).join("\n")}
`, ["integrations", slug]);
}

// ---- Policies (short summaries; the full text is on the site) ----
add("policy-privacy", "SalnetHub privacy in brief", "Policies", "/privacy", `
SalnetHub's privacy policy in brief (full policy: ${url("/privacy")}):
- We collect what you send us through the contact form, the booking calendar or email, such as your name, email, company and message, and use it to reply and prepare for your call.
- Analytics cookies and the record of pages you visit on the site are only used if you accept them in the cookie banner. You can change your choice any time with "Cookie settings" in the site footer. We honour Global Privacy Control.
- We do not sell personal data and do not run ads.
- Our providers include Vercel (hosting), Google (Workspace, Calendar, Sheets and Analytics) and our email provider.
- For client projects, your data stays in your own accounts and we use AI providers on business terms that exclude your data from model training.
- To access, correct or delete your data, email ${site.email}.
`, ["privacy", "data", "cookies", "gdpr"]);

add("policy-terms", "SalnetHub terms of use in brief", "Policies", "/terms", `
SalnetHub's terms of use in brief (full terms: ${url("/terms")}):
- Client work is governed by its own written proposal, statement of work or services agreement, or by the contract terms of the marketplace where you hired us, such as Upwork. If those conflict with the site terms, the project agreement wins.
- Prices follow results. The price, the result that counts and the pilot target are set in your written agreement before work starts.
- The site terms are governed by the laws of Uganda. Consumers keep any rights their home law gives them.
- Questions about the terms: ${site.email}.
`, ["terms", "legal", "contract", "upwork"]);

// ---- Write JSON ----
mkdirSync(OUT, { recursive: true });
const kb = {
  name: "SalnetHub Knowledge Base",
  description: "Everything published on www.salnethub.com about SalnetHub: company, services, pricing, process, integrations, FAQs and policies. One self-contained document per topic, for retrieval by the SalnetHub chat assistant.",
  updated: UPDATED,
  source: site.url,
  currency: "USD",
  documentCount: docs.length,
  documents: docs,
};
writeFileSync(join(OUT, "salnethub-knowledge-base.json"), JSON.stringify(kb, null, 2));

// ---- Write PDF (HTML printed by headless Chrome) ----
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const body = (text) =>
  esc(text).split(/\n{2,}/).map((block) => {
    const lines = block.split("\n");
    if (lines.every((l) => /^(- |\d+\. )/.test(l))) {
      const tag = /^\d/.test(lines[0]) ? "ol" : "ul";
      return `<${tag}>${lines.map((l) => `<li>${l.replace(/^(- |\d+\. )/, "")}</li>`).join("")}</${tag}>`;
    }
    return lines.map((l) => (/^(- |\d+\. )/.test(l) ? `<p class="li">${l}</p>` : `<p>${l}</p>`)).join("");
  }).join("");
const categories = [...new Set(docs.map((d) => d.category))];
const html = `<!doctype html><html><head><meta charset="utf-8"><title>SalnetHub Knowledge Base</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 18mm 16mm; }
body { font: 10.5pt/1.5 Helvetica, Arial, sans-serif; color: #1d1f23; }
h1, h2, h3 { font-family: "Instrument Sans", Helvetica, sans-serif; color: #15171a; }
.cover { height: 250mm; display: flex; flex-direction: column; justify-content: center; border-left: 4px solid #2459E0; padding-left: 14mm; break-after: page; }
.cover h1 { font-size: 34pt; margin: 0 0 6mm; letter-spacing: -0.5pt; }
.cover p { color: #55595f; margin: 1mm 0; }
h2 { font-size: 17pt; margin: 0 0 4mm; padding-bottom: 2mm; border-bottom: 1px solid #c9ccd1; break-before: page; }
h3 { font-size: 12pt; margin: 6mm 0 1mm; break-after: avoid; }
.meta { font-size: 8.5pt; color: #7a7f86; margin: 0 0 2mm; }
.doc { break-inside: auto; }
p { margin: 0 0 2mm; } p.li { margin: 0 0 1mm 4mm; }
ul, ol { margin: 0 0 2mm; padding-left: 6mm; } li { margin-bottom: 1mm; }
.toc li { margin: 0; }
</style></head><body>
<section class="cover"><h1>SalnetHub<br>Knowledge Base</h1>
<p>${esc(site.tagline)}</p><p>Company, services, pricing, process, integrations, FAQs and policies.</p>
<p>Source: ${site.url} · Updated ${UPDATED} · ${docs.length} entries · Prices in USD</p>
<p>Contact: ${site.email}</p></section>
<h2 style="break-before:auto">Contents</h2><ol class="toc">${categories.map((c) => `<li>${c} (${docs.filter((d) => d.category === c).length})</li>`).join("")}</ol>
${categories.map((c) => `<h2>${c}</h2>${docs.filter((d) => d.category === c).map((d) => `<div class="doc"><h3>${esc(d.title)}</h3><p class="meta">${d.url}</p>${body(d.content)}</div>`).join("")}`).join("")}
</body></html>`;
const htmlPath = join(tmpdir(), "salnethub-knowledge-base.html");
writeFileSync(htmlPath, html);

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));
if (!chrome) {
  console.log(`JSON written. No Chrome found for the PDF; open ${htmlPath} and print it to PDF.`);
} else {
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${join(process.cwd(), OUT, "salnethub-knowledge-base.pdf")}`, `file:///${htmlPath.replace(/\\/g, "/")}`], { stdio: "ignore" });
  console.log(`Wrote ${docs.length} documents to ${OUT}/salnethub-knowledge-base.json and .pdf`);
}
