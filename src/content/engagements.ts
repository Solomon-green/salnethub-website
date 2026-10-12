// All published prices live here. Change a number once and every page updates.

export const entryPoints = [
  {
    name: "Discovery call",
    price: "Free",
    unit: "20 minutes",
    body: "We map the problem, tell you honestly whether automation will help, and suggest where to start.",
    points: ["Your current tools and process", "The first workflow worth automating", "A rough budget and timeline"],
  },
  {
    name: "Automation audit",
    price: "$490",
    unit: "credited to your build",
    body: "A structured review of your tools and processes, ending in a written, ranked automation roadmap.",
    points: ["Process and tool review", "Hours-saved estimate per opportunity", "A prioritised 90-day roadmap"],
  },
];

export const builds = [
  { name: "Single workflow", price: "$1,500", time: "1 to 2 weeks", body: "One process automated end to end, such as lead capture to CRM or email to spreadsheet." },
  { name: "Automation system", price: "$4,500", time: "3 to 6 weeks", body: "Several connected workflows across teams, with approvals, logging and reporting." },
  { name: "AI chatbot", price: "$2,500", time: "3 to 4 weeks", body: "A website chatbot trained on your content, connected to your CRM and calendar." },
  { name: "Custom AI agent", price: "$5,000", time: "4 to 6 weeks", body: "An agent that works across your tools with approval steps and a full activity log." },
  { name: "RAG knowledge assistant", price: "$6,000", time: "4 to 6 weeks", body: "Answers from your documents with sources, access rules and measured accuracy." },
  { name: "Website", price: "$2,500", time: "4 to 6 weeks", body: "A fast 5-page website with forms and booking connected to your CRM." },
];

export const carePlans = [
  {
    name: "Essential",
    price: "$490",
    body: "For teams with a few automations that must keep running.",
    points: ["Monitoring and error alerts", "Fixes when tools or APIs change", "Monthly health report", "Email support, reply within 1 business day"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,500",
    body: "For teams adding new automations every month.",
    points: ["Everything in Essential", "Up to 10 hours of new builds and changes", "Monthly planning call", "Priority support, reply within 4 business hours"],
    featured: true,
  },
  {
    name: "Partner",
    price: "$3,500",
    body: "For businesses that want a dedicated automation team.",
    points: ["Everything in Growth", "Up to 30 hours of builds each month", "Dedicated automation lead", "Quarterly roadmap and reporting review"],
    featured: false,
  },
];

export const pricingFaqs = [
  { q: "Why do you publish prices?", a: "So you can tell in a minute whether we fit your budget. Every project still gets a fixed written quote before work starts." },
  { q: "What is not included in the build price?", a: "Third-party subscriptions such as Zapier, Make, your CRM, and AI usage. We estimate these up front and you pay the providers directly." },
  { q: "How do payments work?", a: "Builds are usually 50% to start and 50% at launch. Care plans are billed monthly and can be cancelled with 30 days' notice." },
  { q: "Do you offer refunds?", a: "If we cannot deliver what the written scope describes, we fix it at no cost or refund the unfinished part of the work." },
  { q: "Can we start small?", a: "Yes. Most clients start with one workflow, see the result, then add more. The audit fee is credited to your first build." },
];
