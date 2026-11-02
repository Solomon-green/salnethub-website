import { ToolTile } from "@/components/brand";
import { CtaBand, PageHero, PrimaryCta } from "@/components/ui";
import { integrationCategories, integrations } from "@/content/integrations";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export const metadata = {
  title: "Integrations: Make, Zapier, n8n, HubSpot & More",
  description: "The tools we connect and automate: Google Workspace, HubSpot, Zoho, Make, Zapier, n8n, OpenAI, Anthropic, QuickBooks, Shopify and 25+ more business apps.",
  alternates: { canonical: "/integrations" },
};

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Integrations", path: "/integrations" }])} />
      <PageHero
        title="We build on the tools you already pay for"
        sub="No new platform to learn. We connect the software your team uses every day, and add a connector only where one is needed."
      >
        <PrimaryCta tone="cta" />
      </PageHero>

      <section className="border-t border-line py-24 lg:py-28">
        <div className="container-x grid gap-20">
          {integrationCategories.map((cat) => (
            <div key={cat} className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              <h2 className="t-h2 lg:sticky lg:top-28 lg:self-start" data-reveal>
                {cat}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {integrations
                  .filter((i) => i.category === cat)
                  .map((i) => (
                    <li key={i.slug} className="border border-line rounded-card flex gap-5 bg-surface p-6" data-reveal>
                      <ToolTile slug={i.slug} />
                      <div>
                        <p className="text-[16px] font-bold">{i.name}</p>
                        <p className="mt-1 text-[14px] leading-relaxed text-slate">{i.use}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="container-x relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="t-h2" data-reveal>
              Using something that is not listed?
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] text-slate" data-reveal>
              If it has an API, a webhook, an email notification or even a spreadsheet export, we can usually connect it. We confirm on the first call.
            </p>
          </div>
          <PrimaryCta tone="cta" />
        </div>
      </section>

      <CtaBand />
      <p className="sr-only">Brand logos are trademarks of their owners and are shown to indicate compatibility.</p>
    </>
  );
}
