import Link from "next/link";
import { PrimaryCta } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="hero-wash relative overflow-hidden pt-28 lg:pt-36">
      <div aria-hidden className="iso-grid-sage iso-fade pointer-events-none absolute inset-0" />
      <div className="container-x relative flex min-h-[60dvh] flex-col justify-center pb-24">
        <p className="text-[15px] font-bold text-deep-copper">404</p>
        <h1 className="t-display mt-4 max-w-3xl">This page is not connected to anything</h1>
        <p className="t-lead mt-6 max-w-xl">The link may be old, or the page may have moved. These are good places to continue.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-secondary">
            Go to the home page
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Explore services
          </Link>
          <PrimaryCta />
        </div>
      </div>
    </section>
  );
}
