import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

// Sample stories (slugs starting "sample-") and sample testimonials preview the design in `npm run dev`.
// Every production build hides them, wherever it is hosted, unless SHOW_SAMPLES=1 is set on purpose.
export const showSamples = process.env.NODE_ENV === "development" || process.env.SHOW_SAMPLES === "1";
const isSample = (slug: string) => slug.startsWith("sample-");

export async function getCaseStudies() {
  const all = await reader.collections.caseStudies.all();
  return all
    .filter((e) => !e.entry.draft && (showSamples || !isSample(e.slug)))
    .sort((a, b) => (b.entry.publishedAt ?? "").localeCompare(a.entry.publishedAt ?? ""));
}

export async function getCaseStudy(slug: string) {
  const entry = await reader.collections.caseStudies.read(slug, { resolveLinkedFiles: true });
  if (!entry || entry.draft || (!showSamples && isSample(slug))) return null;
  return entry;
}
