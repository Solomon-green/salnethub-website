import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/brand/salnethub-icon-color.svg`,
  description: site.description,
  areaServed: "Worldwide",
  knowsAbout: services.map((s) => s.name),
};

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const hasWork = (await getCaseStudies()).length > 0;
  const menu = services.map(({ slug, name, short, icon, group }) => ({ slug, name, short, icon, group }));
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-ink px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header menu={menu} hasWork={hasWork} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer hasWork={hasWork} />
      <MotionProvider />
      <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: 0, fontFamily: "var(--font-sans)" } }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </>
  );
}
