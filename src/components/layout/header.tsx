"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand";
import { ServiceIcon } from "@/components/icons";
import { nav, primaryCta } from "@/content/site";
import type { ServiceGroup } from "@/content/services";

export type MenuItem = { slug: string; name: string; short: string; icon: string; group: ServiceGroup };

const groupNames: Record<ServiceGroup, string> = { automation: "Automation", ai: "AI solutions", web: "Web" };

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

const groupOrder: ServiceGroup[] = ["automation", "ai", "web"];
// Pages whose hero is light; every other page opens on the dark hero.
const lightHeroRoutes = ["/privacy", "/terms"];

export function Header({ menu, hasWork = false }: { menu: MenuItem[]; hasWork?: boolean }) {
  const links = hasWork ? nav : nav.filter((item) => item.href !== "/work");
  const servicesByGroup = (g: ServiceGroup) => menu.filter((m) => m.group === g);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close menus when the route changes (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) {
      lenis()?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis()?.start();
      document.documentElement.style.overflow = "";
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const solid = scrolled || megaOpen || mobileOpen;
  const overDark = !solid && !lightHeroRoutes.includes(pathname);
  const linkTone = (active: boolean) =>
    overDark ? (active ? "text-mint" : "text-white/90 hover:text-white") : active ? "text-mint-ink" : "text-ink hover:text-mint-ink";

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-full" />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
          solid ? "border-b border-line bg-white/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center gap-8 lg:h-[72px]">
          <Logo variant={overDark ? "white" : "color"} />

          <nav aria-label="Main" className="ml-10 hidden flex-1 items-center gap-1.5 xl:ml-16 xl:flex">
            {links.map((item) =>
              item.label === "Services" ? (
                <div key={item.href} onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`flex h-10 items-center gap-1 px-3 text-[15px] font-medium transition-colors ${linkTone(isActive("/services"))}`}
                  >
                    Services
                    <ChevronDown size={16} strokeWidth={1.75} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-10 items-center px-3 text-[15px] font-medium transition-colors ${linkTone(isActive(item.href))}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link href={primaryCta.href} className={`btn ${overDark ? "btn-mint" : "btn-primary"} hidden !min-h-11 sm:inline-flex`}>
              {primaryCta.label}
            </Link>
            <button
              type="button"
              className={`flex h-11 w-11 items-center justify-center xl:hidden ${overDark ? "text-white" : "text-ink"}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        <div
          id="mega-menu"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className={`absolute inset-x-0 top-full hidden border-b border-line bg-white transition-[opacity,transform,visibility] duration-250 xl:block ${
            megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="container-x grid grid-cols-[1fr_1fr_0.8fr] gap-10 py-10">
            {groupOrder.slice(0, 2).map((g) => (
              <div key={g}>
                <p className="t-label mb-4 text-slate">{groupNames[g]}</p>
                <ul className="grid gap-1">
                  {servicesByGroup(g).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex gap-4 p-3 transition-colors hover:bg-paper">
                        <ServiceIcon name={s.icon} size={22} className="mt-0.5 shrink-0 text-mint-ink" />
                        <span>
                          <span className="block text-[15px] font-bold leading-snug group-hover:text-mint-ink">{s.name}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-slate">{s.short}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-6 border-l border-line pl-10">
              <div>
                <p className="t-label mb-4 text-slate">{groupNames.web}</p>
                {servicesByGroup("web").map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="group flex gap-4 p-3 transition-colors hover:bg-paper">
                    <ServiceIcon name={s.icon} size={22} className="mt-0.5 shrink-0 text-mint-ink" />
                    <span>
                      <span className="block text-[15px] font-bold group-hover:text-mint-ink">{s.name}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-slate">{s.short}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-auto bg-ink p-6 text-white">
                <p className="text-[15px] font-bold">Not sure where to start?</p>
                <p className="mt-1 text-[13px] leading-relaxed text-on-ink-muted">
                  A 20-minute call is enough to find the first workflow worth automating.
                </p>
                <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-[14px] font-bold text-mint hover:text-white">
                  Compare all services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-30 overflow-y-auto bg-white pt-16 transition-[opacity,visibility] duration-300 xl:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
          {links.map((item) =>
            item.label === "Services" ? (
              <details key={item.href} className="group border-b border-line">
                <summary className="flex h-14 cursor-pointer list-none items-center justify-between text-lg font-bold">
                  Services
                  <ChevronDown size={20} className="transition-transform group-open:rotate-180" />
                </summary>
                <ul className="grid gap-1 pb-4">
                  {groupOrder.flatMap((g) => servicesByGroup(g)).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-3 py-2.5 text-[15px] text-ink">
                        <ServiceIcon name={s.icon} size={18} /> {s.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" className="link-arrow py-2.5 text-[15px]">
                      All services <ArrowRight size={16} />
                    </Link>
                  </li>
                </ul>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-14 items-center border-b border-line text-lg font-bold ${isActive(item.href) ? "text-mint-ink" : ""}`}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link href={primaryCta.href} className="btn btn-primary mt-8 w-full">
            {primaryCta.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
