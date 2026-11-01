import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { LazyChatWidget } from "@/components/chat/chat-widget-lazy";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";
import { getPosts } from "@/lib/blog";
import { JsonLd, websiteLd } from "@/lib/schema";

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
  const hasBlog = (await getPosts()).length > 0;
  const menu = services.map(({ slug, name, short, icon, group }) => ({ slug, name, short, icon, group }));
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-raised px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header menu={menu} hasWork={hasWork} hasBlog={hasBlog} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer hasWork={hasWork} hasBlog={hasBlog} />
      <MotionProvider />
      <LazyChatWidget />
      {/* Offset clears the chat launcher in the same corner */}
      <Toaster
        position="bottom-right"
        offset={{ bottom: 100, right: 24 }}
        mobileOffset={{ bottom: 92, right: 16 }}
        toastOptions={{ style: { borderRadius: 0, fontFamily: "var(--font-sans)" } }}
      />
      <JsonLd data={[orgJsonLd, websiteLd]} />
    </>
  );
}
