import Link from "next/link";
import { PrimaryCta } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="hero-light relative overflow-hidden pt-28 lg:pt-36">
      <div className="container-x relative flex min-h-[60dvh] flex-col justify-center pb-24">
        <p className="text-[15px] font-bold text-stone-deep">404</p>
        <h1 className="t-hero mt-4 max-w-3xl">This page is not connected to anything</h1>
        <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-slate">The link may be old, or the page may have moved. These are good places to continue.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <PrimaryCta tone="lime" />
          <Link href="/" className="btn btn-secondary">
            Go to the home page
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
