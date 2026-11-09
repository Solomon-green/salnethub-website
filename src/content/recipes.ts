// Automation recipes on the home page: proven workflows, shown as trigger → steps → result.
// Outcomes match the claims made elsewhere on the site ("What changes" table, services, FAQs).

export type Recipe = {
  title: string;
  outcome: string;
  tools: string[]; // integration slugs, shown as logos
  trigger: string;
  steps: string[];
  service: string; // service slug the "how it works" link goes to
  post?: string; // optional blog post that shows the build
};

export const recipes: Recipe[] = [
  {
    title: "Speed-to-lead",
    outcome: "Every lead gets a personal reply in under 2 minutes, day or night.",
    tools: ["facebook", "hubspot", "gmail"],
    trigger: "A form or ad lead comes in",
    steps: ["AI scores and enriches the lead", "Deal created in your CRM with an owner", "Personal reply sent from your inbox"],
    service: "lead-acquisition-qualification",
  },
  {
    title: "The Monday report",
    outcome: "Sales, marketing and cash numbers in your inbox at 8 am.",
    tools: ["hubspot", "googleanalytics", "quickbooks"],
    trigger: "Every Monday at 7 am",
    steps: ["Pull this week's numbers from each tool", "AI writes a short summary of what changed", "Report emailed and the dashboard refreshed"],
    service: "data-reporting-analytics",
  },
  {
    title: "Orders from email",
    outcome: "Order details added to your sheet as they arrive, not copied by hand.",
    tools: ["gmail", "googlesheets"],
    trigger: "An order email lands in the inbox",
    steps: ["AI reads the items, quantities and address", "A clean row is added to your order sheet", "Anything unclear is flagged for a person"],
    service: "n8n-workflow-automation",
  },
  {
    title: "Client onboarding",
    outcome: "One trigger, and a new client is set up in under 5 minutes.",
    tools: ["hubspot", "googledrive", "clickup", "googlecalendar"],
    trigger: "A deal is marked won",
    steps: ["Client folder and project created", "Welcome email with the next steps", "Kickoff call booked on both calendars"],
    service: "business-process-automation",
  },
  {
    title: "Invoice follow-up",
    outcome: "Overdue invoices get chased politely, without anyone remembering to.",
    tools: ["xero", "gmail", "whatsapp"],
    trigger: "An invoice passes its due date",
    steps: ["Friendly reminders at 3, 7 and 14 days", "Payment links included in every reminder", "You get a WhatsApp nudge if it is still open"],
    service: "business-process-automation",
  },
  {
    title: "Website knowledge assistant",
    outcome: "Visitors get answers from your own content, around the clock.",
    tools: ["googledrive", "n8n", "anthropic"],
    trigger: "A visitor asks a question in the chat",
    steps: ["Searches your documents for the answer", "Replies in a few sentences, with the source", "Suggests a call when they are ready to buy"],
    service: "rag-systems",
    post: "rag-chatbot-n8n-pinecone",
  },
];
