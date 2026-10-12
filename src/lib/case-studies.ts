import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getCaseStudies() {
  const all = await reader.collections.caseStudies.all();
  return all
    .filter((e) => !e.entry.draft)
    .sort((a, b) => (b.entry.publishedAt ?? "").localeCompare(a.entry.publishedAt ?? ""));
}

export async function getCaseStudy(slug: string) {
  const entry = await reader.collections.caseStudies.read(slug, { resolveLinkedFiles: true });
  if (!entry || entry.draft) return null;
  return entry;
}
