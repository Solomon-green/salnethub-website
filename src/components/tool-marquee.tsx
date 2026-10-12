import { ToolMark } from "@/components/brand";
import { integrations } from "@/content/integrations";

// The tools buyers recognise first. Static on purpose: logos only, nothing auto-scrolls.
const featured = ["googlesheets", "gmail", "hubspot", "zoho", "make", "zapier", "n8n", "notion", "shopify", "quickbooks", "typeform", "anthropic"];

export function ToolMarquee({ dark = false }: { dark?: boolean }) {
  const list = featured.map((slug) => integrations.find((i) => i.slug === slug)!).filter(Boolean);
  return (
    <ul className="grid grid-cols-4 items-center gap-x-6 gap-y-7 sm:grid-cols-6 lg:grid-cols-12" aria-label="Tools we work with">
      {list.map((t) => (
        <li
          key={t.slug}
          className={`flex justify-center transition-colors duration-300 ${dark ? "text-white/70 hover:text-mint" : "text-ink/55 hover:text-mint-ink"}`}
          title={t.name}
        >
          <ToolMark slug={t.slug} size={28} />
        </li>
      ))}
    </ul>
  );
}
