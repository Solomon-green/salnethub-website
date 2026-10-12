import { collection, config, fields } from "@keystatic/core";
import { services } from "./src/content/services";

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
      label: "Case studies",
      slugField: "title",
      path: "content/case-studies/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "publishedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title", description: "Lead with the result, e.g. 'Lead replies in 2 minutes, not 2 days'" } }),
        summary: fields.text({ label: "Summary", description: "One or two sentences shown on the Work page.", multiline: true, validation: { length: { min: 20, max: 280 } } }),
        client: fields.text({ label: "Client", description: "Company name, or a description such as '12-person accounting firm' if anonymous." }),
        industry: fields.text({ label: "Industry" }),
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
        featured: fields.checkbox({ label: "Feature on the home page", defaultValue: false }),
        draft: fields.checkbox({ label: "Draft (hidden from the site)", defaultValue: true }),
        body: fields.markdoc({ label: "Full story", description: "Optional longer write-up." }),
      },
    }),
  },
});
