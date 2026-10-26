// Home page service map, grouped by the outcome a buyer is shopping for rather than by technique.
// Each group points at existing service slugs, so service pages and URLs stay unchanged.

export type Outcome = {
  id: "sales" | "reporting" | "ops" | "ai" | "web";
  label: string;
  title: string;
  body: string;
  services: string[];
  span?: string;
};

export const outcomes: Outcome[] = [
  {
    id: "sales",
    label: "Sales & leads",
    title: "Every lead answered in minutes, every deal in the CRM",
    body: "Capture leads from ads, forms and chat, score them, route them to the right person and reply before a competitor does.",
    services: ["lead-acquisition-qualification", "marketing-crm-automation"],
    span: "lg:col-span-2",
  },
  {
    id: "reporting",
    label: "Reporting",
    title: "Reports that build themselves",
    body: "Live dashboards and a Monday report that is ready before Monday.",
    services: ["data-reporting-analytics"],
  },
  {
    id: "ops",
    label: "Operations & admin",
    title: "Admin that runs on its own",
    body: "Approvals, invoicing, onboarding and the small daily tasks that cross teams and tools.",
    services: ["business-process-automation", "task-workflow-automation"],
  },
  {
    id: "ai",
    label: "AI agents & chatbots",
    title: "AI that works from your data, with a person in control",
    body: "Chatbots, agents and knowledge assistants that answer from your own content and hand over to your team when it matters.",
    services: ["ai-chatbots", "custom-ai-agents", "rag-systems"],
    span: "lg:col-span-2",
  },
  {
    id: "web",
    label: "Websites",
    title: "Websites that feed your pipeline",
    body: "Fast, clear websites and landing pages wired straight into your CRM and automations, so every enquiry starts a workflow.",
    services: ["web-solutions"],
    span: "lg:col-span-3",
  },
];

/** Outcome labels a set of service slugs belongs to, in the order above. Used as story filters and tags. */
export const outcomesFor = (serviceSlugs: string[]) =>
  outcomes.filter((o) => o.services.some((s) => serviceSlugs.includes(s))).map((o) => o.label);
