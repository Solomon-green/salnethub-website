export type ServiceGroup = "automation" | "ai" | "web";
export type IllustrationKind = "flow" | "chart" | "chat" | "rag" | "agent" | "web";

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  icon: string; // lucide icon name, resolved in components/icons.tsx
  short: string;
  // Search-facing title and description (kept under ~60 and ~155 characters).
  seo: { title: string; description: string };
  hero: { title: string; sub: string };
  problem: { title: string; points: { title: string; body: string }[] };
  capabilities: { title: string; body: string }[];
  workflow: {
    title: string;
    caption: string;
    kind: IllustrationKind;
    nodes: { label: string; meta: string }[];
  };
  example: { title: string; before: string; after: string };
  tools: string[]; // integration slugs from content/integrations.ts
  deliverables: string[];
  timeline: { phase: string; duration: string; body: string }[];
  safeguards?: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  priceFrom: string;
  priceNote: string;
};

export const groups: Record<ServiceGroup, { name: string; blurb: string }> = {
  automation: {
    name: "Automation",
    blurb: "Connect the tools you already pay for so work moves between them on its own.",
  },
  ai: {
    name: "AI solutions",
    blurb: "Chatbots, agents and knowledge assistants that work from your data, with a human in control.",
  },
  web: {
    name: "Web",
    blurb: "Websites that capture leads straight into your CRM and automations.",
  },
};

export const services: Service[] = [
  {
    slug: "marketing-crm-automation",
    seo: { title: "CRM Automation Services for HubSpot, Zoho & Sheets", description: "We automate CRM updates, follow-up sequences and deal stages in HubSpot, Zoho or Google Sheets, so every lead is tracked and followed up. From $1,500." },
    name: "Marketing & CRM automation",
    group: "automation",
    icon: "users",
    short: "Keep your CRM accurate and your follow-ups on time without anyone updating records by hand.",
    hero: {
      title: "A CRM that updates itself",
      sub: "We connect your forms, inbox, ads and CRM so every contact, deal and follow-up is recorded the moment it happens.",
    },
    problem: {
      title: "Where CRM work usually breaks",
      points: [
        {
          title: "Records go stale",
          body: "Sales reps update the CRM at the end of the week, if at all. Reports are only as good as the last manual entry.",
        },
        {
          title: "Follow-ups slip",
          body: "A lead fills in a form on Friday evening and hears back on Tuesday. By then they have spoken to two competitors.",
        },
        {
          title: "Marketing and sales disagree",
          body: "Campaign data sits in one tool and deal data in another, so nobody can say which channel brings paying customers.",
        },
      ],
    },
    capabilities: [
      { title: "Contact sync", body: "Form fills, calls, emails and purchases create or update the right CRM record with no duplicates." },
      { title: "Follow-up sequences", body: "Personal emails and tasks go out on a schedule you set, and stop as soon as the lead replies." },
      { title: "Deal stage automation", body: "Deals move stage when something real happens: a quote is opened, a contract is signed, an invoice is paid." },
      { title: "Lifecycle tagging", body: "Contacts are tagged by source, interest and stage so campaigns reach the right people." },
      { title: "Campaign attribution", body: "UTM and ad data are stored on the contact, so revenue can be traced back to the channel that earned it." },
      { title: "Clean-up jobs", body: "Scheduled checks merge duplicates, fix formatting and flag records with missing owners." },
    ],
    workflow: {
      title: "From first touch to closed deal",
      caption: "Each step runs on its own. Your team only steps in for the conversations that need a person.",
      kind: "flow",
      nodes: [
        { label: "Web form", meta: "New enquiry" },
        { label: "CRM record", meta: "Created, deduplicated" },
        { label: "Follow-up email", meta: "Sent in 2 minutes" },
        { label: "Sales task", meta: "Assigned to owner" },
        { label: "Deal updated", meta: "Stage moves on reply" },
      ],
    },
    example: {
      title: "Example: inbound enquiries for a 12-person services firm",
      before: "Enquiries landed in a shared inbox. Someone copied them into HubSpot twice a day and replies took 6 to 24 hours.",
      after: "Every enquiry creates a HubSpot contact and deal, gets a personal reply within 2 minutes and a task for the right rep.",
    },
    tools: ["hubspot", "zoho", "gmail", "googlesheets", "typeform", "mailchimp", "make", "zapier"],
    deliverables: [
      "A map of your current contact and deal flow, with the gaps marked",
      "Working automations in your CRM and connected tools",
      "Field and pipeline clean-up so the data stays usable",
      "A written handover guide and a recorded walkthrough",
      "30 days of monitoring and fixes after launch",
    ],
    timeline: [
      { phase: "Map", duration: "Week 1", body: "We review your CRM, forms and inbox and agree which flows to automate first." },
      { phase: "Build", duration: "Weeks 2 to 3", body: "We build in a test copy of your setup so nothing touches live data until it works." },
      { phase: "Test", duration: "Week 3", body: "We run real examples end to end with your team and fix what they find." },
      { phase: "Launch", duration: "Week 4", body: "We switch it on, watch the first days closely and hand over the documentation." },
    ],
    faqs: [
      { q: "Which CRMs do you work with?", a: "Mostly HubSpot, Zoho and Google Sheets based CRMs. If your CRM has an API, we can usually connect it. We confirm this on the first call." },
      { q: "Will this replace my sales team's work?", a: "No. It removes the copying, chasing and data entry so your team spends their time on conversations." },
      { q: "What happens to our existing data?", a: "We clean it before we automate on top of it. Nothing is deleted without your approval, and we keep a backup." },
      { q: "Do we need to buy new software?", a: "Usually not. We build on the tools you already pay for, plus a connector like Make or Zapier if one is needed." },
    ],
    priceFrom: "$1,500",
    priceNote: "for one end-to-end workflow. Multi-workflow CRM projects start at $4,500.",
  },
  {
    slug: "lead-acquisition-qualification",
    seo: { title: "Lead Capture, Scoring & Routing Automation", description: "Capture leads from forms, ads and chat, score them against your criteria and route them to the right rep with a reply in under 2 minutes." },
    name: "Lead acquisition & qualification",
    group: "automation",
    icon: "filter",
    short: "Capture every lead, score it, and route the good ones to the right person in minutes.",
    hero: {
      title: "Every lead captured, scored and routed",
      sub: "Leads from forms, ads and chat are enriched, scored against your criteria and sent to the right rep before they go cold.",
    },
    problem: {
      title: "Why good leads get lost",
      points: [
        { title: "Too many sources", body: "Website forms, Facebook lead ads, LinkedIn, referrals and chat all land in different places." },
        { title: "No clear priority", body: "Reps treat a student enquiry and a 200-seat buyer the same way, so the best leads wait in line." },
        { title: "Slow first response", body: "Most buyers choose the company that replies first. A reply the next day is often too late." },
      ],
    },
    capabilities: [
      { title: "Lead capture", body: "Forms, ad platforms, chat and email feed into one pipeline with the source recorded." },
      { title: "Enrichment", body: "Company size, industry and location are added from public data so reps know who they are talking to." },
      { title: "Scoring", body: "Each lead is scored against rules you agree with us, such as budget, team size or service requested." },
      { title: "Routing", body: "Leads go to the right rep by territory, product or round robin, with a backup if nobody picks them up." },
      { title: "Instant replies", body: "A personal first reply and a booking link go out within 2 minutes, day or night." },
      { title: "Disqualification", body: "Poor-fit leads get a polite automated reply and stay out of your reps' queue." },
    ],
    workflow: {
      title: "From click to qualified conversation",
      caption: "A strong lead reaches a rep's phone in minutes. A weak one never takes up their time.",
      kind: "flow",
      nodes: [
        { label: "Lead captured", meta: "Form, ad or chat" },
        { label: "Enriched", meta: "Company data added" },
        { label: "Scored", meta: "Against your rules" },
        { label: "Routed", meta: "Right rep, instantly" },
        { label: "Call booked", meta: "Calendar link sent" },
      ],
    },
    example: {
      title: "Example: lead ads for a home-services company",
      before: "Facebook leads were downloaded as a spreadsheet each morning and split between 4 reps by hand.",
      after: "Each lead is scored and texted to the rep covering that area within 90 seconds, with a booking link sent to the customer.",
    },
    tools: ["typeform", "googleforms", "facebook", "hubspot", "googlesheets", "calendly", "whatsapp", "make"],
    deliverables: [
      "A lead scoring model written down and agreed with your sales lead",
      "Connected capture from every lead source you use",
      "Routing rules, reply templates and booking links",
      "A live view of lead volume, speed to reply and conversion",
      "Handover guide and 30 days of monitoring",
    ],
    timeline: [
      { phase: "Map", duration: "Week 1", body: "We list every lead source and agree what makes a lead worth a call." },
      { phase: "Build", duration: "Weeks 2 to 3", body: "We connect the sources, scoring, routing and replies in a test setup." },
      { phase: "Test", duration: "Week 3", body: "We push sample leads through every path, including the edge cases." },
      { phase: "Launch", duration: "Week 4", body: "We go live and tune the scoring after the first 2 weeks of real leads." },
    ],
    faqs: [
      { q: "Can you work with our ad accounts?", a: "Yes. We connect Facebook and Instagram lead ads, Google Ads lead forms and most form tools through their official integrations." },
      { q: "Who decides the scoring rules?", a: "You do. We propose a starting model from your past deals and adjust it with your sales lead." },
      { q: "Can leads go to WhatsApp or SMS?", a: "Yes. Reps can be alerted by email, Slack-style chat, WhatsApp or SMS, depending on what your team actually checks." },
      { q: "What if a rep does not respond?", a: "We set a time limit. If the lead is not picked up, it moves to the next rep or a manager." },
    ],
    priceFrom: "$1,500",
    priceNote: "for capture and routing from one source. Full multi-source pipelines start at $4,500.",
  },
  {
    slug: "data-reporting-analytics",
    seo: { title: "Automated Reporting & Live Dashboards", description: "Automated reports and live dashboards that pull from your CRM, finance and ops tools, so the numbers are ready before the meeting. From $1,500." },
    name: "Data reporting & analytics",
    group: "automation",
    icon: "bar-chart-3",
    short: "Dashboards that update themselves, so the Monday report is ready before Monday.",
    hero: {
      title: "Reports that build themselves",
      sub: "We pull data from your CRM, finance and operations tools into live dashboards and scheduled reports your team can trust.",
    },
    problem: {
      title: "What manual reporting costs you",
      points: [
        { title: "Hours of copy and paste", body: "Someone exports 5 spreadsheets every week and stitches them together before the meeting." },
        { title: "Numbers nobody trusts", body: "Different teams report different totals because each one pulls data a different way." },
        { title: "Decisions on old data", body: "By the time the monthly report is ready, the month it describes is long gone." },
      ],
    },
    capabilities: [
      { title: "Data pipelines", body: "Scheduled syncs pull from your CRM, accounting, ads, store and spreadsheets into one place." },
      { title: "Live dashboards", body: "Looker Studio or Google Sheets dashboards that refresh on their own, built around the questions you ask." },
      { title: "Scheduled reports", body: "A PDF or email summary goes to the right people every Monday at 8 am, or whenever you choose." },
      { title: "KPI definitions", body: "We write down how each number is calculated so every team reports the same total." },
      { title: "Alerts", body: "Get a message when a number crosses a line: cash below a threshold, leads down 30%, stock running low." },
      { title: "Data clean-up", body: "Duplicates, mismatched names and broken formats are fixed before they reach a chart." },
    ],
    workflow: {
      title: "From scattered exports to one source of truth",
      caption: "Data is collected, cleaned and charted on a schedule. Nobody has to open an export again.",
      kind: "chart",
      nodes: [
        { label: "CRM", meta: "Deals, contacts" },
        { label: "Accounting", meta: "Invoices, cash" },
        { label: "Store and ads", meta: "Orders, spend" },
        { label: "Clean and join", meta: "Every 15 minutes" },
        { label: "Dashboard", meta: "Live for the team" },
      ],
    },
    example: {
      title: "Example: weekly sales report for an online retailer",
      before: "The operations lead spent most of Monday morning exporting Shopify, ad and Sheets data into a slide deck.",
      after: "A Looker Studio dashboard refreshes every hour, and a summary email reaches the leadership team at 8 am each Monday.",
    },
    tools: ["googlesheets", "looker", "googleanalytics", "hubspot", "quickbooks", "xero", "shopify", "googleappsscript"],
    deliverables: [
      "A short list of the KPIs that matter, with written definitions",
      "Automated data pipelines from each source",
      "Dashboards and scheduled reports for each audience",
      "Threshold alerts for the numbers you want watched",
      "Handover guide and 30 days of monitoring",
    ],
    timeline: [
      { phase: "Define", duration: "Week 1", body: "We agree on the questions the dashboard must answer and how each number is calculated." },
      { phase: "Connect", duration: "Weeks 2 to 3", body: "We build the data pipelines and check every total against your current reports." },
      { phase: "Design", duration: "Week 3", body: "We lay out the dashboards so the most important number is the first thing you see." },
      { phase: "Launch", duration: "Week 4", body: "We schedule the reports, set the alerts and walk your team through it." },
    ],
    faqs: [
      { q: "Do we need a data warehouse?", a: "Most small-to-medium businesses do not. Google Sheets and Looker Studio handle a lot. We suggest a warehouse only when your data volume needs one." },
      { q: "How fresh is the data?", a: "It depends on the source. Most dashboards refresh between every 15 minutes and every hour." },
      { q: "Can you match our existing report?", a: "Yes. We start by rebuilding the report you already use, so you can check our numbers against it." },
      { q: "Is our data shared with anyone?", a: "No. Your data stays in your own accounts. We work with the access you grant us and remove it when the project ends if you prefer." },
    ],
    priceFrom: "$1,500",
    priceNote: "for one dashboard from up to 3 sources. Larger reporting systems start at $4,500.",
  },
  {
    slug: "business-process-automation",
    seo: { title: "Business Process Automation for Onboarding & Approvals", description: "We automate client onboarding, approvals, invoicing and documents across your tools, with an owner and an audit trail for every step." },
    name: "Business process automation",
    group: "automation",
    icon: "workflow",
    short: "Automate approvals, invoicing, onboarding and other processes that cross teams and tools.",
    hero: {
      title: "Processes that run end to end",
      sub: "We automate the multi-step processes that cross teams, like client onboarding, approvals and invoicing, with clear owners at every step.",
    },
    problem: {
      title: "Where cross-team processes stall",
      points: [
        { title: "Work waits in inboxes", body: "An approval sits in a manager's email for 3 days because nobody knew it was waiting." },
        { title: "The same data typed 4 times", body: "A new client's details are entered into the CRM, the invoicing tool, the project board and a spreadsheet." },
        { title: "Steps depend on one person", body: "When the person who knows the process is on leave, the process stops." },
      ],
    },
    capabilities: [
      { title: "Client onboarding", body: "A signed contract creates the client folder, project board, invoice schedule and welcome email." },
      { title: "Approvals", body: "Requests go to the right approver with one-click approve or reject, plus reminders and escalation." },
      { title: "Invoicing and payments", body: "Invoices are created from completed work and payment reminders go out on schedule." },
      { title: "Document generation", body: "Quotes, contracts and reports are filled from your data in Google Docs and saved to the right folder." },
      { title: "Employee onboarding", body: "Accounts, equipment requests, training tasks and first-week emails are triggered from one form." },
      { title: "Audit trail", body: "Every step is logged with who did what and when, in a sheet your team can search." },
    ],
    workflow: {
      title: "From signed contract to kickoff call",
      caption: "One trigger starts every step. People only act where a decision is needed.",
      kind: "flow",
      nodes: [
        { label: "Contract signed", meta: "Trigger" },
        { label: "Client folder", meta: "Drive, templates" },
        { label: "Invoice schedule", meta: "In accounting" },
        { label: "Manager approval", meta: "One click" },
        { label: "Kickoff booked", meta: "Welcome email" },
      ],
    },
    example: {
      title: "Example: client onboarding for an accounting practice",
      before: "Each new client took about 2 hours of admin across 5 tools, and steps were often missed.",
      after: "A signed engagement letter triggers every setup step in under 5 minutes, with a checklist the partner can review.",
    },
    tools: ["googledrive", "gmail", "googlesheets", "googleappsscript", "quickbooks", "clickup", "asana", "n8n"],
    deliverables: [
      "A process map showing every step, owner and tool",
      "Automations with approval steps where people need to decide",
      "Document templates connected to your data",
      "An audit log of every run",
      "Handover guide and 30 days of monitoring",
    ],
    timeline: [
      { phase: "Map", duration: "Week 1", body: "We walk through the process with the people who do it today and find where time is lost." },
      { phase: "Build", duration: "Weeks 2 to 4", body: "We automate the steps in order, with approval points wherever a person must decide." },
      { phase: "Test", duration: "Week 4", body: "We run real cases through the process and adjust it with your team." },
      { phase: "Launch", duration: "Weeks 5 to 6", body: "We switch over in stages so nothing breaks during the change." },
    ],
    faqs: [
      { q: "Which processes are worth automating first?", a: "The ones that happen often, follow the same steps each time and involve copying data between tools. We help you rank them on the first call." },
      { q: "What if our process has exceptions?", a: "We build the normal path first and route exceptions to a person with all the context attached." },
      { q: "Do we lose control over decisions?", a: "No. Anything that needs judgment stays with a person. The automation prepares the information and waits for their decision." },
      { q: "Can you work with tools we built in-house?", a: "Often yes, if they have an API, a database we can read, or even a spreadsheet export." },
    ],
    priceFrom: "$4,500",
    priceNote: "for a multi-step process across 3 or more tools.",
  },
  {
    slug: "task-workflow-automation",
    seo: { title: "Workflow Automation with Make, Zapier & n8n", description: "Automate data entry, reminders, file moves and status updates with Make, Zapier, n8n or Apps Script, and win back hours every week. From $1,500." },
    name: "Task & workflow automation",
    group: "automation",
    icon: "zap",
    short: "Remove the small repetitive tasks that eat your team's day, from data entry to reminders.",
    hero: {
      title: "Win back hours every week",
      sub: "Data entry, reminders, file moves and status updates quietly eat your team's day. We automate them so your people can do the work they were hired for.",
    },
    problem: {
      title: "Small tasks, big cost",
      points: [
        { title: "Death by copy and paste", body: "Moving order details from email into a spreadsheet takes 3 minutes. Forty times a day, that is 2 hours." },
        { title: "Reminders that rely on memory", body: "Renewals, follow-ups and deadlines are tracked in someone's head or a sticky note." },
        { title: "Constant status questions", body: "People ask where things are because there is no automatic update when something changes." },
      ],
    },
    capabilities: [
      { title: "Email to spreadsheet", body: "Orders, receipts and requests in your inbox are read and added to Google Sheets as clean rows." },
      { title: "Scheduled reminders", body: "Renewals, deadlines and follow-ups trigger reminders to the right person at the right time." },
      { title: "File handling", body: "Attachments are renamed, filed into the right Drive folder and shared with the right people." },
      { title: "Status updates", body: "Customers and teammates get an automatic message when an order, ticket or task changes stage." },
      { title: "Form processing", body: "Form submissions become tasks, records and notifications without anyone retyping them." },
      { title: "Apps Script tools", body: "Custom buttons and menus inside Google Sheets and Docs for the jobs no off-the-shelf tool covers." },
    ],
    workflow: {
      title: "From inbox to done",
      caption: "Repetitive steps happen in seconds. Your team sees the result, not the busywork.",
      kind: "flow",
      nodes: [
        { label: "Order email", meta: "Arrives in Gmail" },
        { label: "Details read", meta: "Parsed automatically" },
        { label: "Sheet updated", meta: "New row added" },
        { label: "Team notified", meta: "Task created" },
        { label: "Customer updated", meta: "Status email sent" },
      ],
    },
    example: {
      title: "Example: order handling for a wholesale supplier",
      before: "A coordinator copied about 40 orders a day from email into a spreadsheet and replied to each customer by hand.",
      after: "Orders are added to Google Sheets as they arrive and customers get a confirmation automatically. That is about 6 hours a week back.",
    },
    tools: ["gmail", "googlesheets", "googledrive", "googleappsscript", "googlecalendar", "trello", "zapier", "make"],
    deliverables: [
      "A list of tasks ranked by hours saved per week",
      "Working automations for the top tasks",
      "Error alerts so you know if anything stops",
      "Handover guide and a recorded walkthrough",
      "30 days of monitoring and fixes",
    ],
    timeline: [
      { phase: "List", duration: "Days 1 to 2", body: "We list the repetitive tasks and estimate the time each one costs." },
      { phase: "Build", duration: "Week 1", body: "We automate the tasks with the biggest time savings first." },
      { phase: "Test", duration: "Week 2", body: "We run the automations on real data alongside your team." },
      { phase: "Launch", duration: "Week 2", body: "We switch them on and set up alerts in case anything fails." },
    ],
    faqs: [
      { q: "How small a task is worth automating?", a: "If it happens daily and follows the same steps, it is usually worth it. A 5-minute task done 10 times a day is 4 hours a week." },
      { q: "Make, Zapier or n8n?", a: "We pick the tool that fits your volume and budget. Zapier is simplest, Make handles complex logic at lower cost, and n8n suits high volumes." },
      { q: "What if an automation fails?", a: "You get an alert with the details, and we fix it. Our care plans include monitoring so we usually see failures before you do." },
      { q: "Can we change the automations later?", a: "Yes. We document how each one works so your team can make small changes, and we handle the bigger ones." },
    ],
    priceFrom: "$1,500",
    priceNote: "for one automated task flow. Bundles of 3 to 5 tasks start at $3,500.",
  },
  {
    slug: "ai-chatbots",
    seo: { title: "AI Chatbot for Your Website, Trained on Your Content", description: "An AI website chatbot that answers from your own content, qualifies leads and books calls, then hands over to a person when needed." },
    name: "AI chatbots for websites",
    group: "ai",
    icon: "message-square",
    short: "A website chatbot that answers questions, guides visitors and books calls, trained on your content.",
    hero: {
      title: "A website chatbot that knows your business",
      sub: "It answers visitor questions from your own content, points people to the right page, qualifies leads and books calls. A person takes over when needed.",
    },
    problem: {
      title: "Why visitors leave without a word",
      points: [
        { title: "Questions go unanswered", body: "Visitors have one question about price, timing or fit. If they cannot find the answer in 30 seconds, they leave." },
        { title: "Forms feel like work", body: "A contact form with 8 fields gets skipped. A conversation gets answered." },
        { title: "After-hours traffic is wasted", body: "Half your visits happen outside office hours, when nobody is there to reply." },
      ],
    },
    capabilities: [
      { title: "Trained on your content", body: "The chatbot answers from your website, FAQs, price lists and documents, not from guesswork." },
      { title: "Visitor guidance", body: "It recommends the right service or page based on what the visitor asks." },
      { title: "Lead qualification", body: "It asks the questions your sales team would ask and saves the answers to your CRM." },
      { title: "Call booking", body: "Qualified visitors can book a meeting in your calendar without leaving the chat." },
      { title: "Human handoff", body: "When a question needs a person, the chat goes to your team by email, WhatsApp or live chat, with the full history." },
      { title: "Conversation review", body: "You can read every conversation and see the most common questions, so you know what to add to your site." },
    ],
    workflow: {
      title: "From question to booked call",
      caption: "Try the demo. Every answer comes from the business's own content, and each lead lands in the CRM.",
      kind: "chat",
      nodes: [
        { label: "Visitor asks", meta: "On any page" },
        { label: "Answer found", meta: "From your content" },
        { label: "Lead qualified", meta: "Key questions asked" },
        { label: "Saved to CRM", meta: "With full transcript" },
        { label: "Call booked", meta: "In your calendar" },
      ],
    },
    example: {
      title: "Example: a chatbot for a training provider",
      before: "Most enquiries asked the same 10 questions about dates, prices and certificates, answered by email the next day.",
      after: "The chatbot answers them instantly from the course catalogue and books a call when a company asks about group training.",
    },
    tools: ["openai", "anthropic", "hubspot", "calendly", "whatsapp", "wordpress", "webflow", "make"],
    deliverables: [
      "A chatbot trained on your approved content",
      "Conversation flows for qualification and booking",
      "CRM and calendar connections",
      "Human handoff to your team's channel",
      "A dashboard of conversations and common questions",
    ],
    timeline: [
      { phase: "Gather", duration: "Week 1", body: "We collect your content, agree on what the chatbot may and may not answer, and write its tone guide." },
      { phase: "Build", duration: "Weeks 2 to 3", body: "We set up the knowledge base, conversation flows, CRM and calendar connections." },
      { phase: "Test", duration: "Week 3", body: "We test with 100+ real questions, including tricky ones, and fix every weak answer." },
      { phase: "Launch", duration: "Week 4", body: "We add it to your site and review conversations weekly for the first month." },
    ],
    safeguards: [
      { title: "Answers from approved content only", body: "The chatbot is limited to your material. If it does not know, it says so and offers a person." },
      { title: "No invented prices or promises", body: "Sensitive topics like pricing, refunds and contracts follow fixed rules you approve." },
      { title: "Data privacy", body: "Conversations are stored in your own accounts. We do not use your data to train public models." },
      { title: "Clear AI disclosure", body: "Visitors are told they are talking to an AI assistant and can ask for a person at any time." },
    ],
    faqs: [
      { q: "Which AI models do you use?", a: "We use leading models from providers such as OpenAI and Anthropic, chosen for accuracy and cost. You can switch providers later." },
      { q: "What does it cost to run each month?", a: "Running costs depend on traffic. Most small-to-medium sites spend between $20 and $150 a month on AI usage. We estimate it before we build." },
      { q: "Will it give wrong answers?", a: "We limit it to your content and test it heavily. When it is not sure, it hands over to a person instead of guessing." },
      { q: "Does it work on any website?", a: "Yes. It installs with a small code snippet on WordPress, Webflow, Shopify, Wix or a custom site." },
    ],
    priceFrom: "$2,500",
    priceNote: "for a chatbot trained on your content with CRM and booking connections. AI usage is billed at cost.",
  },
  {
    slug: "custom-ai-agents",
    seo: { title: "Custom AI Agents for Business Automation", description: "Custom AI agents that triage email, update your CRM and draft replies across your tools, with approval steps where it matters. From $5,000." },
    name: "Custom AI agents",
    group: "ai",
    icon: "bot",
    short: "AI agents that do real work in your tools, from email triage to CRM updates, with approval steps.",
    hero: {
      title: "AI agents that do the work, with you in control",
      sub: "An agent reads, decides and acts across your tools: it sorts email, updates records and drafts replies, then waits for approval where it matters.",
    },
    problem: {
      title: "Work that rules alone cannot handle",
      points: [
        { title: "Every message is different", body: "Simple automations need fixed rules. Real emails, requests and documents rarely follow them." },
        { title: "Judgment calls pile up", body: "Someone has to read each request, decide what it is and route it, dozens of times a day." },
        { title: "Busy people do low-value reading", body: "Senior staff spend hours reading and summarising before they can make a decision." },
      ],
    },
    capabilities: [
      { title: "Email and inbox triage", body: "The agent reads incoming email, labels it, drafts a reply and routes anything urgent to a person." },
      { title: "CRM and record updates", body: "It pulls details from emails, calls and documents and updates the right records." },
      { title: "Document processing", body: "Invoices, contracts and forms are read, checked and turned into structured data." },
      { title: "Research and preparation", body: "Before a sales call, it gathers the company background and history and writes a short brief." },
      { title: "Multi-step tasks", body: "It works through a task across several tools, such as checking stock, drafting a quote and logging it." },
      { title: "Approval checkpoints", body: "Any action that sends, pays or deletes waits for a person to approve it." },
    ],
    workflow: {
      title: "How an agent handles a request",
      caption: "The agent prepares everything. A person approves before anything leaves the building.",
      kind: "agent",
      nodes: [
        { label: "Request arrives", meta: "Email or form" },
        { label: "Agent reads", meta: "Understands intent" },
        { label: "Gathers data", meta: "CRM, Sheets, Drive" },
        { label: "Needs approval", meta: "Person reviews" },
        { label: "Action done", meta: "Logged and sent" },
      ],
    },
    example: {
      title: "Example: quote requests for a logistics firm",
      before: "A coordinator read each quote request, checked rates in a spreadsheet and typed a reply. Each one took about 20 minutes.",
      after: "An agent reads the request, checks the rate sheet and drafts the quote. The coordinator reviews and sends it in under 2 minutes.",
    },
    tools: ["openai", "anthropic", "gmail", "googlesheets", "hubspot", "n8n", "make", "supabase"],
    deliverables: [
      "A written scope of what the agent may and may not do",
      "The working agent connected to your tools",
      "Approval steps for every sensitive action",
      "A log of every decision and action the agent takes",
      "Handover guide and 30 days of monitoring",
    ],
    timeline: [
      { phase: "Scope", duration: "Week 1", body: "We pick one job, define the agent's permissions and agree where approvals are required." },
      { phase: "Build", duration: "Weeks 2 to 4", body: "We build the agent, connect its tools and test it on your past examples." },
      { phase: "Shadow", duration: "Week 5", body: "The agent runs alongside your team, suggesting actions without taking them." },
      { phase: "Launch", duration: "Week 6", body: "We turn on approved actions step by step and review its work weekly." },
    ],
    safeguards: [
      { title: "Least access", body: "The agent only gets the permissions its job needs. It cannot reach anything else." },
      { title: "Human approval", body: "Sending, paying, deleting and other sensitive actions always wait for a person." },
      { title: "Full activity log", body: "Every decision is recorded with its reasoning, so you can check exactly what happened." },
      { title: "Shadow mode first", body: "The agent proves itself on suggestions before it is allowed to act." },
    ],
    faqs: [
      { q: "How is an agent different from an automation?", a: "An automation follows fixed rules. An agent can read unstructured information, decide what it means and choose the next step, within limits you set." },
      { q: "Can the agent make mistakes?", a: "Yes, which is why we use approval steps, shadow mode and logs. Sensitive actions never happen without a person." },
      { q: "Where does the agent run?", a: "In your own accounts or a private server, using tools like n8n or a small custom app. You own it." },
      { q: "What does it cost to run?", a: "AI usage for most agents costs between $30 and $300 a month, depending on volume. We estimate it during scoping." },
    ],
    priceFrom: "$5,000",
    priceNote: "for one agent with approval steps and logging. AI usage is billed at cost.",
  },
  {
    slug: "rag-systems",
    seo: { title: "RAG Knowledge Assistant: AI That Answers From Your Docs", description: "A private AI assistant that answers from your SOPs, contracts and help docs and cites the exact source for every answer. From $6,000." },
    name: "RAG knowledge assistants",
    group: "ai",
    icon: "book-open",
    short: "An AI assistant that answers from your own documents and shows the source for every answer.",
    hero: {
      title: "Answers from your documents, with sources",
      sub: "A knowledge assistant that searches your SOPs, contracts and help articles first, then answers with a link to the exact source.",
    },
    problem: {
      title: "When knowledge is hard to find",
      points: [
        { title: "Answers live in 500 files", body: "The answer exists somewhere in Drive, Notion or an old PDF. Finding it takes 20 minutes." },
        { title: "The same questions every day", body: "New staff ask senior staff the same questions, pulling them away from their own work." },
        { title: "General AI makes things up", body: "Public chatbots do not know your policies and will confidently guess when they are unsure." },
      ],
    },
    capabilities: [
      { title: "Document library", body: "We connect your Google Drive, Notion, PDFs, help centre and website as the assistant's source material." },
      { title: "Cited answers", body: "Every answer links to the document and section it came from, so anyone can check it." },
      { title: "Internal help desk", body: "Staff ask questions about policies, processes and products and get answers in seconds." },
      { title: "Customer support", body: "Customers get accurate answers from your help articles, with handoff to your team when needed." },
      { title: "Access control", body: "People only get answers from the documents they are allowed to see." },
      { title: "Automatic updates", body: "When a document changes, the assistant's knowledge updates on the next sync." },
    ],
    workflow: {
      title: "How retrieval-augmented generation works",
      caption: "It looks up your documents first, then answers. That is what stops it from guessing.",
      kind: "rag",
      nodes: [
        { label: "Question", meta: "Asked in plain words" },
        { label: "Search library", meta: "Your documents only" },
        { label: "Best passages", meta: "Ranked by relevance" },
        { label: "Answer written", meta: "From those passages" },
        { label: "Sources shown", meta: "Linked for checking" },
      ],
    },
    example: {
      title: "Example: an internal assistant for a property manager",
      before: "Staff searched 300+ Drive documents or asked the operations manager about lease terms and maintenance procedures.",
      after: "Staff ask the assistant in plain words and get the answer with a link to the exact clause or procedure.",
    },
    tools: ["openai", "anthropic", "googledrive", "notion", "supabase", "langchain", "intercom", "n8n"],
    deliverables: [
      "A connected and cleaned document library",
      "The assistant, in Slack-style chat, on your site or as an internal web app",
      "Source citations on every answer",
      "Access rules matched to your team structure",
      "An accuracy test set and report",
    ],
    timeline: [
      { phase: "Collect", duration: "Week 1", body: "We gather the documents, remove outdated ones and agree who can see what." },
      { phase: "Index", duration: "Weeks 2 to 3", body: "We split, label and index the documents so the right passages are found." },
      { phase: "Evaluate", duration: "Week 4", body: "We test against a set of real questions with known answers and measure accuracy." },
      { phase: "Launch", duration: "Weeks 5 to 6", body: "We roll it out to a pilot group first, then to everyone." },
    ],
    safeguards: [
      { title: "Grounded answers", body: "The assistant only answers from retrieved passages. If nothing relevant is found, it says so." },
      { title: "Sources on every answer", body: "Each answer links to its source, so people can check rather than trust blindly." },
      { title: "Permission-aware", body: "Search respects your access rules. Confidential files stay confidential." },
      { title: "Measured accuracy", body: "We test against real questions before launch and share the results with you." },
    ],
    faqs: [
      { q: "What does RAG mean?", a: "Retrieval-augmented generation. The AI first retrieves relevant passages from your documents, then writes an answer based only on them." },
      { q: "Which documents can it use?", a: "Google Docs, Sheets, PDFs, Word files, Notion pages, help centre articles and web pages. Scanned documents can be converted to text first." },
      { q: "Is our data used to train AI models?", a: "No. We use business API terms that exclude your data from model training, and your index is stored in your own account." },
      { q: "How accurate is it?", a: "We measure it on your own test questions before launch. Because every answer shows its source, errors are easy to spot and fix." },
    ],
    priceFrom: "$6,000",
    priceNote: "for an assistant over one document library with citations and access rules. AI usage is billed at cost.",
  },
  {
    slug: "web-solutions",
    seo: { title: "Business Websites Connected to Your CRM", description: "Fast websites and landing pages where every form, booking and chat goes straight into your CRM and automations. From $2,500." },
    name: "Web solutions",
    group: "web",
    icon: "globe",
    short: "Fast, clear websites and landing pages wired straight into your CRM and automations.",
    hero: {
      title: "Websites that feed your pipeline",
      sub: "We design and build fast websites and landing pages where every form, booking and chat goes straight into your CRM and automations.",
    },
    problem: {
      title: "Why many business websites underperform",
      points: [
        { title: "Pretty but disconnected", body: "Form submissions go to an inbox nobody checks, so leads are lost after the click." },
        { title: "Slow and hard to update", body: "Pages take 6 seconds to load, and every text change needs a developer." },
        { title: "No clear next step", body: "Visitors cannot tell what you offer or what to do next, so they leave." },
      ],
    },
    capabilities: [
      { title: "Clear page structure", body: "Pages lead with what the visitor gets, show how it works, then make the next step obvious." },
      { title: "Connected forms", body: "Every form, booking and chat creates a CRM record and starts your follow-up automation." },
      { title: "Fast by default", body: "Modern builds that load in under 2 seconds and score well on Google's speed tests." },
      { title: "Easy editing", body: "A simple editor so your team can change text, add case studies and publish pages." },
      { title: "SEO foundations", body: "Clean structure, metadata, sitemaps and schema so search engines understand your pages." },
      { title: "Analytics and tracking", body: "Conversion tracking set up properly, so you know which pages and channels bring leads." },
    ],
    workflow: {
      title: "From visit to CRM record",
      caption: "The website is the start of your pipeline, not a separate island.",
      kind: "web",
      nodes: [
        { label: "Visitor lands", meta: "Fast page load" },
        { label: "Clear offer", meta: "Next step obvious" },
        { label: "Form or chat", meta: "Low friction" },
        { label: "CRM record", meta: "Created instantly" },
        { label: "Follow-up", meta: "Automation starts" },
      ],
    },
    example: {
      title: "Example: a services website rebuild",
      before: "A slow template site sent form submissions to a personal inbox and could only be edited by the original developer.",
      after: "A fast site with an easy editor, where every enquiry creates a CRM deal and gets an instant personal reply.",
    },
    tools: ["nextdotjs", "webflow", "wordpress", "shopify", "vercel", "hubspot", "googleanalytics", "calendly"],
    deliverables: [
      "Sitemap, page copy structure and wireframes",
      "A responsive design in your brand",
      "The built website with an easy content editor",
      "Forms and booking connected to your CRM",
      "Speed, SEO and analytics setup",
    ],
    timeline: [
      { phase: "Plan", duration: "Week 1", body: "We agree the sitemap, the message for each page and how leads should flow." },
      { phase: "Design", duration: "Weeks 2 to 3", body: "We design the key pages and refine them with you." },
      { phase: "Build", duration: "Weeks 3 to 5", body: "We build the site, connect the forms and set up the editor." },
      { phase: "Launch", duration: "Week 6", body: "We test on real devices, launch and track the first month of results." },
    ],
    faqs: [
      { q: "Which platform do you build on?", a: "Usually Next.js for custom sites, or Webflow and WordPress when your team wants to edit everything themselves. We recommend one on the first call." },
      { q: "Can you redesign our existing site?", a: "Yes. We keep what works, especially pages that already rank in search, and rebuild the rest." },
      { q: "Do you write the copy?", a: "We structure every page and write the copy with you, based on how your customers describe their problems." },
      { q: "Who hosts the website?", a: "Your site is hosted in your own account, so you always own it. We can manage it under a care plan." },
    ],
    priceFrom: "$2,500",
    priceNote: "for a focused 5-page website connected to your CRM.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByGroup = (g: ServiceGroup) => services.filter((s) => s.group === g);
