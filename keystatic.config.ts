import { collection, config, fields } from "@keystatic/core";
import { services } from "./src/content/services";
import { authors } from "./src/content/authors";

// Local mode edits files on your machine (npm run dev, then open /keystatic).
// Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github (plus the Keystatic GitHub App env vars)
// to edit and upload from the live site; each save commits to the repo and Vercel redeploys.
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({ kind: "github", repo: { owner: "Solomon-green", name: "salnethub-website" } } as const)
    : ({ kind: "local" } as const);

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
          description: "Start with a direct answer. Use ## for sections (they build the table of contents) and ### for sub-sections.",
        }),
      },
    }),
  },
});
