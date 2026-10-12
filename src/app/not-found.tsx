import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { services } from "@/content/services";
import SiteNotFound from "./(site)/not-found";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function GlobalNotFound() {
  const menu = services.map(({ slug, name, short, icon, group }) => ({ slug, name, short, icon, group }));
  return (
    <>
      <Header menu={menu} />
      <main id="main">
        <SiteNotFound />
      </main>
      <Footer />
    </>
  );
}
