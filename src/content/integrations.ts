export type Integration = {
  slug: string;
  name: string;
  category: string;
  // simple-icons export name; when missing, a monogram is drawn instead
  icon?: string;
  use: string;
};

export const integrationCategories = [
  "Google Workspace",
  "CRM & sales",
  "Automation platforms",
  "AI & data",
  "Operations & finance",
  "Web & commerce",
] as const;

export const integrations: Integration[] = [
  { slug: "googlesheets", name: "Google Sheets", category: "Google Workspace", icon: "siGooglesheets", use: "Lightweight CRMs, trackers, data pipelines and dashboards." },
  { slug: "gmail", name: "Gmail", category: "Google Workspace", icon: "siGmail", use: "Inbox parsing, follow-up sequences and AI email triage." },
  { slug: "googledrive", name: "Google Drive", category: "Google Workspace", icon: "siGoogledrive", use: "Automatic filing, document generation and RAG libraries." },
  { slug: "googlecalendar", name: "Google Calendar", category: "Google Workspace", icon: "siGooglecalendar", use: "Booking flows, reminders and scheduling automations." },
  { slug: "googleforms", name: "Google Forms", category: "Google Workspace", icon: "siGoogleforms", use: "Intake forms that create records and tasks on submit." },
  { slug: "googleappsscript", name: "Apps Script", category: "Google Workspace", icon: "siGoogleappsscript", use: "Custom tools, menus and logic inside Google Workspace." },

  { slug: "hubspot", name: "HubSpot", category: "CRM & sales", icon: "siHubspot", use: "Contact sync, deal automation, sequences and reporting." },
  { slug: "zoho", name: "Zoho", category: "CRM & sales", icon: "siZoho", use: "CRM workflows, lead routing and Zoho app integrations." },
  { slug: "typeform", name: "Typeform", category: "CRM & sales", icon: "siTypeform", use: "Lead capture with scoring and instant routing." },
  { slug: "calendly", name: "Calendly", category: "CRM & sales", icon: "siCalendly", use: "Booked meetings that update the CRM and notify the owner." },
  { slug: "mailchimp", name: "Mailchimp", category: "CRM & sales", icon: "siMailchimp", use: "Audience sync, tagging and campaign triggers." },
  { slug: "facebook", name: "Meta lead ads", category: "CRM & sales", icon: "siMeta", use: "Lead ads delivered to your CRM and reps in seconds." },
  { slug: "whatsapp", name: "WhatsApp", category: "CRM & sales", icon: "siWhatsapp", use: "Rep alerts, customer updates and chatbot handoff." },

  { slug: "make", name: "Make", category: "Automation platforms", icon: "siMake", use: "Complex multi-step scenarios at a low running cost." },
  { slug: "zapier", name: "Zapier", category: "Automation platforms", icon: "siZapier", use: "Fast, reliable connections across 7,000+ apps." },
  { slug: "n8n", name: "n8n", category: "Automation platforms", icon: "siN8n", use: "High-volume and self-hosted workflows and AI agents." },

  { slug: "openai", name: "OpenAI", category: "AI & data", use: "Language models for chatbots, agents and document processing." },
  { slug: "anthropic", name: "Anthropic", category: "AI & data", icon: "siAnthropic", use: "Claude models for careful reasoning and long documents." },
  { slug: "langchain", name: "LangChain", category: "AI & data", icon: "siLangchain", use: "Retrieval pipelines and agent tooling." },
  { slug: "supabase", name: "Supabase", category: "AI & data", icon: "siSupabase", use: "Databases and vector search for RAG and agent memory." },
  { slug: "looker", name: "Looker Studio", category: "AI & data", icon: "siLooker", use: "Live dashboards over your business data." },
  { slug: "googleanalytics", name: "Google Analytics", category: "AI & data", icon: "siGoogleanalytics", use: "Traffic and conversion data for reporting." },

  { slug: "quickbooks", name: "QuickBooks", category: "Operations & finance", icon: "siQuickbooks", use: "Invoices, payments and finance reporting." },
  { slug: "xero", name: "Xero", category: "Operations & finance", icon: "siXero", use: "Invoice automation and cash reporting." },
  { slug: "notion", name: "Notion", category: "Operations & finance", icon: "siNotion", use: "Wikis, project databases and knowledge sources." },
  { slug: "clickup", name: "ClickUp", category: "Operations & finance", icon: "siClickup", use: "Tasks and projects created from your other tools." },
  { slug: "asana", name: "Asana", category: "Operations & finance", icon: "siAsana", use: "Project setup and status updates." },
  { slug: "trello", name: "Trello", category: "Operations & finance", icon: "siTrello", use: "Boards and cards driven by forms and email." },
  { slug: "airtable", name: "Airtable", category: "Operations & finance", icon: "siAirtable", use: "Operational databases with automated records." },
  { slug: "intercom", name: "Intercom", category: "Operations & finance", icon: "siIntercom", use: "Support inbox automation and AI answers." },

  { slug: "shopify", name: "Shopify", category: "Web & commerce", icon: "siShopify", use: "Order, inventory and customer automations." },
  { slug: "stripe", name: "Stripe", category: "Web & commerce", icon: "siStripe", use: "Payment events that trigger fulfilment and reporting." },
  { slug: "wordpress", name: "WordPress", category: "Web & commerce", icon: "siWordpress", use: "Sites with connected forms and chatbots." },
  { slug: "webflow", name: "Webflow", category: "Web & commerce", icon: "siWebflow", use: "Marketing sites with CRM-connected forms." },
  { slug: "nextdotjs", name: "Next.js", category: "Web & commerce", icon: "siNextdotjs", use: "Fast custom websites and web apps." },
  { slug: "vercel", name: "Vercel", category: "Web & commerce", icon: "siVercel", use: "Hosting for fast, modern websites." },
];

export const getIntegration = (slug: string) => integrations.find((i) => i.slug === slug);
