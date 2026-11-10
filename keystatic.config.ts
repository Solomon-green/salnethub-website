import { collection, config, fields } from "@keystatic/core";
import { block, wrapper } from "@keystatic/core/content-components";
import { services } from "./src/content/services";
import { authors } from "./src/content/authors";

// Local mode edits files on your machine (npm run dev, then open /keystatic).
// Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github (plus the Keystatic GitHub App env vars)
// to edit and upload from the live site; each save commits to the repo and Vercel redeploys.
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({ kind: "github", repo: { owner: "Solomon-green", name: "salnethub-website" } } as const)
    : ({ kind: "local" } as const);

// Blocks for blog posts, inserted from the editor's "+" menu and rendered by src/components/blog/post-blocks.tsx.
const postBlocks = {
  Callout: wrapper({
    label: "Callout",
    description: "A boxed aside, usually a short definition such as \"What's a RAG system?\"",
    schema: { title: fields.text({ label: "Label", description: "Short, shown in small capitals. E.g. What's a RAG system?" }) },
  }),
  PullQuote: block({
    label: "Pull quote",
    description: "One sentence worth remembering, set large. Use once or twice per post.",
    schema: {
      quote: fields.text({ label: "Quote", multiline: true, validation: { length: { min: 1 } } }),
      cite: fields.text({ label: "Who said it (optional)" }),
    },
  }),
  Playbook: wrapper({
    label: "Playbook",
    description: "The closing checklist. Put a short bullet list inside.",
    schema: { title: fields.text({ label: "Title", defaultValue: "Playbook" }) },
  }),
  BeforeAfter: block({
    label: "Before / after chart",
    description: "Two bars and the % change, from real numbers only.",
    schema: {
      title: fields.text({ label: "Title", description: "What is measured, e.g. Average reply length", validation: { length: { min: 1 } } }),
      unit: fields.text({ label: "Unit (optional)", description: "e.g. words, s, hours/week, $" }),
      before: fields.number({ label: "Before value", validation: { isRequired: true } }),
      after: fields.number({ label: "After value", validation: { isRequired: true } }),
      beforeLabel: fields.text({ label: "Before label", defaultValue: "Before" }),
      afterLabel: fields.text({ label: "After label", defaultValue: "After" }),
      note: fields.text({ label: "Note under the % (optional)", multiline: true }),
    },
  }),
};

export default config({
  storage,
  ui: { brand: { name: "SalnetHub" } },
  collections: {
    caseStudies: collection({
      label: "Customer stories",
      slugField: "title",
      path: "content/case-studies/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "publishedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title", description: "Lead with the result, e.g. 'Lead replies in 2 minutes, not 2 days'" } }),
        summary: fields.text({ label: "Summary", description: "One or two sentences shown on the Customer stories page.", multiline: true, validation: { length: { min: 20, max: 280 } } }),
        client: fields.text({ label: "Client", description: "Company name, or a description such as '12-person accounting firm' if anonymous." }),
        industry: fields.text({ label: "Industry" }),
        logo: fields.image({
          label: "Client logo (optional)",
          description: "SVG or transparent PNG. Shown on the story card; leave empty to show the client's name instead.",
          directory: "public/clients",
          publicPath: "/clients/",
        }),
        services: fields.multiselect({
          label: "Services used",
          options: services.map((s) => ({ label: s.name, value: s.slug })),
        }),
        tools: fields.array(fields.text({ label: "Tool" }), {
          label: "Tools used",
          itemLabel: (props) => props.value || "Tool",
        }),
        results: fields.array(
          fields.object({
            value: fields.text({ label: "Value", description: "e.g. '6 h' or '2 min'" }),
            label: fields.text({ label: "What it measures", description: "e.g. 'saved each week'" }),
          }),
          { label: "Key results", itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` },
        ),
        challenge: fields.text({ label: "The challenge", multiline: true }),
        solution: fields.text({ label: "What we built", multiline: true }),
        cover: fields.image({
          label: "Cover image",
          description: "Screenshot or diagram. 1600 x 1000 px works best.",
          directory: "public/case-studies",
          publicPath: "/case-studies/",
        }),
        gallery: fields.array(
          fields.object({
            image: fields.image({ label: "Image", directory: "public/case-studies", publicPath: "/case-studies/" }),
            caption: fields.text({ label: "Caption" }),
          }),
          { label: "Gallery", itemLabel: (props) => props.fields.caption.value || "Image" },
        ),
        visual: fields.select({
          label: "Illustrations",
          description: "Animated diagrams shown under the story (built in code, see src/components/stories).",
          options: [
            { label: "None", value: "none" },
            { label: "Agency: lead follow-up, setter attribution, reporting", value: "agency-sales-ops" },
            { label: "Contractor: AI lead intake, RAG triage, routing", value: "contractor-intake" },
            { label: "Telegram coaching bot: n8n router, four brains", value: "telegram-coach" },
          ],
          defaultValue: "none",
        }),
        videoUrl: fields.url({ label: "Video link (optional)", description: "YouTube, Loom or Vimeo link to a walkthrough." }),
        quote: fields.object(
          {
            text: fields.text({ label: "Client quote", multiline: true }),
            name: fields.text({ label: "Name" }),
            role: fields.text({ label: "Role and company" }),
          },
          { label: "Testimonial (optional)" },
        ),
        publishedAt: fields.date({ label: "Published", defaultValue: { kind: "today" } }),
        featured: fields.checkbox({ label: "Featured (home page and the big tiles on Customer stories)", defaultValue: false }),
        draft: fields.checkbox({ label: "Draft (hidden from the site)", defaultValue: true }),
        body: fields.markdoc({ label: "Full story", description: "Optional longer write-up." }),
      },
    }),
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "publishedAt"],
      schema: {
        title: fields.slug({
          name: { label: "Title (H1)", description: "Contains the primary keyword, ideally near the start. Keep it under ~60 characters." },
          slug: { label: "URL slug", description: "Short, lowercase, the primary keyword, e.g. 'crm-automation-for-small-business'." },
        }),
        seoTitle: fields.text({
          label: "SEO title (optional)",
          description: "Shown in Google results if different from the H1. 50–60 characters; ' | SalnetHub' is added automatically.",
        }),
        description: fields.text({
          label: "Meta description",
          description: "140–160 characters. Shown under the title in Google and on the blog index.",
          multiline: true,
          validation: { length: { min: 50, max: 170 } },
        }),
        primaryKeyword: fields.text({ label: "Primary keyword", description: "From keywords.csv. Internal: not shown on the page." }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Automation", value: "automation" },
            { label: "AI agents and chatbots", value: "ai" },
            { label: "CRM and sales", value: "crm" },
            { label: "Reporting and data", value: "reporting" },
            { label: "Guides", value: "guides" },
          ],
          defaultValue: "automation",
        }),
        author: fields.select({
          label: "Author",
          options: authors.map((a) => ({ label: a.name, value: a.slug })),
          defaultValue: authors[0].slug,
        }),
        cover: fields.image({
          label: "Cover image",
          description: "1600 x 900 px. Real screenshots beat stock photos.",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        coverAlt: fields.text({ label: "Cover image alt text", description: "Describe the image; include the keyword only if it fits naturally." }),
        relatedServices: fields.multiselect({
          label: "Related services",
          description: "Linked at the end of the post. Pick 1–3.",
          options: services.map((s) => ({ label: s.name, value: s.slug })),
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: "Question", description: "Take these from Google's 'People also ask'." }),
            a: fields.text({ label: "Answer", multiline: true, description: "2–4 sentences, direct answer first." }),
          }),
          { label: "FAQ (optional)", itemLabel: (props) => props.fields.q.value || "Question" },
        ),
        publishedAt: fields.date({ label: "Published", defaultValue: { kind: "today" } }),
        updatedAt: fields.date({ label: "Last updated (optional)", description: "Set when you make a meaningful update." }),
        draft: fields.checkbox({ label: "Draft (hidden from the live site)", defaultValue: true }),
        body: fields.markdoc({
          label: "Post",
          description: "Start with a direct answer. Use ## for sections (they build the table of contents) and ### for sub-sections. Callout, Pull quote, Playbook and Before / after chart are in the + menu.",
          components: postBlocks,
        }),
      },
    }),
  },
});
