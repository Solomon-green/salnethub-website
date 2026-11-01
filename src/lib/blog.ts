import React from "react";
import Markdoc, { type Config, type Node } from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { showSamples } from "@/lib/case-studies";

const reader = createReader(process.cwd(), keystaticConfig);

// Posts whose slug starts "sample-" preview the template in `npm run dev` only, like sample stories.
const isSample = (slug: string) => slug.startsWith("sample-");
const visible = (slug: string, draft: boolean) => !draft && (showSamples || !isSample(slug));

export const categoryLabels: Record<string, string> = {
  automation: "Automation",
  ai: "AI agents and chatbots",
  crm: "CRM and sales",
  reporting: "Reporting and data",
  guides: "Guides",
};

export async function getPosts() {
  const all = await reader.collections.posts.all({ resolveLinkedFiles: true });
  return all
    .filter((p) => visible(p.slug, p.entry.draft))
    .sort((a, b) => (b.entry.publishedAt ?? "").localeCompare(a.entry.publishedAt ?? ""))
    .map((p) => ({ slug: p.slug, ...p.entry, readingMinutes: readingMinutes(toAst(p.entry.body.node)) }));
}

export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug, { resolveLinkedFiles: true });
  if (!entry || !visible(slug, entry.draft)) return null;
  return entry;
}

// Keystatic bundles its own Markdoc copy; the AST shape is identical.
const toAst = (node: unknown) => node as Node;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function headingText(node: Node) {
  let text = "";
  for (const child of node.walk()) if (child.type === "text") text += child.attributes.content;
  return text.trim();
}

function readingMinutes(ast: Node) {
  let words = 0;
  for (const n of ast.walk()) if (n.type === "text") words += String(n.attributes.content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

const markdocConfig: Config = {
  nodes: {
    // h2/h3 get stable ids so the table of contents and shared links can jump to them.
    heading: {
      children: ["inline"],
      attributes: { level: { type: Number, required: true, render: false } },
      transform(node, config) {
        return new Markdoc.Tag(`h${node.attributes.level}`, { id: slugify(headingText(node)) }, node.transformChildren(config));
      },
    },
    // External links open in a new tab; internal links stay in place.
    link: {
      children: ["strong", "em", "s", "code", "text", "tag"],
      attributes: { href: { type: String, required: true }, title: { type: String } },
      transform(node, config) {
        const href = String(node.attributes.href);
        const external = /^https?:\/\//.test(href) && !href.includes("salnethub.com");
        const attrs = { href, title: node.attributes.title, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) };
        return new Markdoc.Tag("a", attrs, node.transformChildren(config));
      },
    },
  },
};

/** Renders a post body and returns its table of contents (## and ### headings) and reading time. */
export function renderPost(body: { node: unknown }) {
  const ast = toAst(body.node);
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const n of ast.walk()) {
    if (n.type === "heading" && (n.attributes.level === 2 || n.attributes.level === 3)) {
      const text = headingText(n);
      toc.push({ id: slugify(text), text, level: n.attributes.level });
    }
  }
  const content = Markdoc.renderers.react(Markdoc.transform(ast, markdocConfig), React);
  return { content, toc, readingMinutes: readingMinutes(ast) };
}

export function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
