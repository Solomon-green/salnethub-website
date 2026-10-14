"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Smooth scrolling (Lenis, synced to GSAP's ticker) plus one shared reveal system:
 * any element with [data-reveal] fades up as it enters the viewport, in batches,
 * so server components can opt in with an attribute instead of a client wrapper.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  useEffect(() => {
    // New pages open at the top, unless the link points at a section (e.g. /contact#book).
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView();
      lenis?.scrollTo(target, { immediate: true, offset: -96 });
    } else {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
    }
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(els, { opacity: 0, y: 24 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
            overwrite: true,
            clearProps: "transform",
          }),
      });
      // Anything already above the fold on load shows immediately.
      ScrollTrigger.refresh();
    });
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
