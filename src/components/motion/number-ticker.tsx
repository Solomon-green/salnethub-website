"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

/** Counts up to `value` the first time it scrolls into view. Server-renders the final number. */
export function NumberTicker({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !el.current) return;
      const n = { v: 0 };
      el.current.textContent = `${prefix}0${suffix}`;
      gsap.to(n, {
        v: value,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el.current, start: "top 90%", once: true },
        onUpdate: () => {
          if (el.current) el.current.textContent = `${prefix}${Math.round(n.v)}${suffix}`;
        },
      });
    },
    { scope: el },
  );

  return (
    <span ref={el} className={`tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
