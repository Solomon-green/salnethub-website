"use client";

import { useRef } from "react";
import { FileText, Search } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

const docs = [
  { name: "Leave policy.pdf", hit: false },
  { name: "Lease template.docx", hit: true },
  { name: "Onboarding SOP", hit: false },
  { name: "Maintenance guide", hit: true },
  { name: "Price list 2026", hit: false },
  { name: "Support FAQ", hit: false },
];

export function RagDiagram() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hits = gsap.utils.toArray<HTMLElement>(".rag-doc.hit");
      if (prefersReducedMotion()) {
        hits.forEach((h) => h.classList.add("is-hit"));
        gsap.set(".rag-answer > *", { opacity: 1 });
        return;
      }
      gsap.set(".rag-answer > *", { opacity: 0, y: 6 });
      gsap.set(".rag-q-text", { opacity: 0 });
      gsap.set(".rag-scan", { yPercent: -100, opacity: 0 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, paused: true });
      tl.to(".rag-q-text", { opacity: 1, duration: 0.5 })
        .to(".rag-link-1 .rag-dot", { left: "100%", duration: 0.7, ease: "power2.inOut" }, "+=0.3")
        .set(".rag-scan", { opacity: 1 })
        .to(".rag-scan", { yPercent: 600, duration: 1.2, ease: "none" })
        .set(".rag-scan", { opacity: 0 })
        .call(() => hits.forEach((h) => h.classList.add("is-hit")))
        .to({}, { duration: 0.4 })
        .to(".rag-link-2 .rag-dot", { left: "100%", duration: 0.7, ease: "power2.inOut" })
        .to(".rag-answer > *", { opacity: 1, y: 0, duration: 0.45, stagger: 0.18, ease: "power2.out" })
        .to({}, { duration: 2.2 })
        .to([".rag-answer > *", ".rag-q-text"], { opacity: 0, duration: 0.4 })
        .call(() => hits.forEach((h) => h.classList.remove("is-hit")))
        .set(".rag-dot", { left: "0%" })
        .set(".rag-answer > *", { y: 6 })
        .set(".rag-scan", { yPercent: -100 });

      const st = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 10%", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) },
      });
      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1.25fr_auto_1.15fr] lg:gap-0">
      <style>{`
        .rag-doc{transition:background-color .35s ease,border-color .35s ease}
        .rag-doc.is-hit{background:#E3EBE6;border-color:#4F6B5C}
        .rag-doc.is-hit .rag-bar{background:#6C8C7A}
      `}</style>

      <div className="border border-ink bg-white p-5">
        <p className="t-label flex items-center gap-2 text-slate">
          <Search size={13} /> Question
        </p>
        <p className="rag-q-text mt-3 text-[15px] font-bold leading-snug">What notice does a tenant need to give before ending a lease?</p>
      </div>

      <Link className="rag-link-1" />

      <div className="relative overflow-hidden border border-line bg-paper p-4">
        <p className="t-label mb-3 text-slate">Your document library</p>
        <div className="grid grid-cols-2 gap-2">
          {docs.map((d) => (
            <div key={d.name} className={`rag-doc border border-line bg-white p-2.5 ${d.hit ? "hit" : ""}`}>
              <p className="flex items-center gap-1.5 truncate text-[12px] font-bold">
                <FileText size={12} className="shrink-0" /> {d.name}
              </p>
              <div className="mt-2 grid gap-1">
                <span className="rag-bar block h-[3px] w-full bg-line" />
                <span className="rag-bar block h-[3px] w-4/5 bg-line" />
              </div>
            </div>
          ))}
        </div>
        <div aria-hidden className="rag-scan pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-transparent via-sage/25 to-transparent" />
      </div>

      <Link className="rag-link-2" />

      <div className="rag-answer border border-ink bg-white p-5">
        <p className="t-label text-slate">Answer</p>
        <p className="mt-3 text-[15px] leading-relaxed">
          Tenants must give <strong>60 days&apos; written notice</strong> before the lease end date. Notice is sent to the property manager by email or post.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
          <span className="border border-sage bg-mist px-2 py-1 font-bold text-mint-ink">[1] Lease template, clause 14.2</span>
          <span className="border border-sage bg-mist px-2 py-1 font-bold text-mint-ink">[2] Maintenance guide, p. 3</span>
        </div>
      </div>
    </div>
  );
}

function Link({ className }: { className: string }) {
  return (
    <div aria-hidden className={`${className} relative mx-auto h-8 w-px bg-ink lg:h-px lg:w-14`}>
      <span className="rag-dot absolute left-0 top-0 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-copper lg:block" />
    </div>
  );
}
