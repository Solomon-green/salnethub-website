// Results-based pricing. All pricing copy and numbers live here; change them once and every page updates.

export const pricing = {
  pilotDays: 14,
  pilotFee: "$250", // automation pilots only; refunded if the pilot misses its agreed target
  savingsCap: 0.25, // monthly fee is never more than this share of the cost we remove
  noticeDays: 30,
};

const capPct = `${Math.round(pricing.savingsCap * 100)}%`;
const keepPct = `${100 - Math.round(pricing.savingsCap * 100)}%`;

export const pricingHero = {
  title: "You pay for results, not promises",
  sub: `Most agencies ask for thousands up front and hope it works. We do it the other way round: we work out what the problem costs you today, prove we can fix it in a ${pricing.pilotDays}-day pilot, and price our work below what you are already losing.`,
};

export const pricingSteps = [
  {
    name: "We find the leak and put a number on it",
    body: "On a free 30-minute call we ask a few simple questions: where your customers come from, how many slip away, and what each one is worth. Together we work out what the problem costs you every month. You confirm every number.",
  },
  {
    name: `We prove it in a ${pricing.pilotDays}-day pilot`,
    body: "We fix one problem first, small and fast. You see the results in your own calendar, inbox or reports before you commit to anything bigger.",
  },
  {
    name: "You pay based on what it brings you",
    body: "Once it works, our price follows the result: per booked appointment, or a small share of the time we save you. Always less than the problem was costing you.",
  },
];

export const pricingModels = [
  {
    id: "result",
    label: "Pay per result",
    for: "Lead replies, chatbots, WhatsApp and SMS agents, call answering and old-lead reactivation",
    headline: "Pay per booked appointment",
    body: "You pay for each booked appointment or qualified lead we deliver. No setup fee and nothing up front. If it does not book, you do not pay.",
    howWePrice:
      "We take what one lead costs you and how many of your leads actually book. That shows what a booked appointment really costs you today. We charge less than that.",
    points: ["No setup fee", `Free ${pricing.pilotDays}-day pilot`, "Every booking logged where you can see it"],
  },
  {
    id: "savings",
    label: "Pay from what you save",
    for: "Workflow automation, CRM, reporting and back-office processes",
    headline: `Never more than ${capPct} of the savings`,
    body: `We measure how many hours a task takes your team each month and what those hours cost. Your monthly fee is never more than ${capPct} of the cost we remove, so you keep at least ${keepPct}.`,
    howWePrice: `The pilot is ${pricing.pilotFee}, refunded in full if it misses the target we agree at the start. After that you pay one monthly fee, with monitoring and fixes included.`,
    points: [`${pricing.pilotFee} pilot, refundable`, `Fee capped at ${capPct} of savings`, "Monitoring and fixes included"],
  },
];

/** Worked examples shown on the pricing page. Illustrations only: real prices are set from your own numbers on the call. */
export const leadExample = { costPerLead: 40, bookRate: 0.25, ourPrice: 90 };
export const timeExample = { people: 3, hoursPerWeek: 6, rate: 25 };

export const pricingPromises = [
  { name: "No big payment before results", body: "Every engagement starts with a short pilot on one problem." },
  { name: "Your numbers, not ours", body: "Prices come from figures you confirm on the call." },
  { name: "You see every result", body: "Each booking, lead or saved hour is logged in a sheet or dashboard you can open any time." },
  { name: "If it fails, you owe nothing", body: "If the pilot does not deliver, you walk away and owe nothing for the build." },
  { name: "Leave any time", body: `Monthly billing with ${pricing.noticeDays} days' notice. No long contracts.` },
];

export const pricingLadder = [
  { name: "One problem", body: "We start with your biggest leak, such as missed calls, slow lead replies or one manual process." },
  { name: "Results speak", body: "You see appointments landing and hours coming back. That is usually when clients ask what else it can do." },
  { name: "Grow when it pays", body: "We add the next system: CRM, reporting, AI assistants. Each one is priced the same way." },
];

export const pricingFaqs = [
  {
    q: "Why don't you publish a fixed price list?",
    a: "Because a fixed price ignores what the work is worth to you. A booked appointment is worth more to a dental clinic than to a café. We price from your numbers, so the deal always makes sense for you.",
  },
  {
    q: "What counts as a result?",
    a: "We agree it in writing before we start, for example a confirmed appointment in your calendar or a lead that meets your criteria. Spam, duplicates and bookings that fall through because of us are not charged.",
  },
  {
    q: "Do I pay anything up front?",
    a: `Not for pay-per-result services: the pilot is free. Automation pilots are ${pricing.pilotFee}, refunded in full if the pilot misses its agreed target. Third-party tools such as your CRM, Zapier or AI usage are paid directly to those providers, and we estimate them for you first.`,
  },
  {
    q: "What if the pilot doesn't work?",
    a: "Then you walk away and owe nothing for the build. We would rather lose a pilot than keep a client who is not getting value.",
  },
  {
    q: "How do you bill?",
    a: "Monthly. Pay-per-result services are billed from the results log you can see; automation fees are one fixed monthly amount. No surprises.",
  },
  {
    q: "Can we still get a fixed quote?",
    a: "Yes. For large one-off builds, such as a knowledge assistant or a company-wide system, we can give you a fixed written quote after the pilot if you prefer.",
  },
];

/** Short lines used on the home page, services and chat knowledge base. */
export const pricingTeaser = {
  title: "Pricing that follows results",
  body: `No big invoice up front. We start with a ${pricing.pilotDays}-day pilot, show you the results, then charge per booked appointment or a small share of the time we save. Always less than the problem costs you now.`,
};
