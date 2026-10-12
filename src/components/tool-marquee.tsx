import { ToolMark } from "@/components/brand";
import { integrations } from "@/content/integrations";

/** Logo wall as a slow CSS marquee. Logos only, per brand and layout rules. */
export function ToolMarquee() {
  const list = integrations.filter((i) => i.icon);
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-14 py-2">
        {[...list, ...list].map((t, i) => (
          <span key={`${t.slug}-${i}`} className="text-ink/70 transition-colors hover:text-ink" aria-hidden={i >= list.length}>
            <ToolMark slug={t.slug} size={28} />
          </span>
        ))}
      </div>
      <style>{`
        .marquee-track{animation:marquee 60s linear infinite}
        .marquee:hover .marquee-track{animation-play-state:paused}
        @keyframes marquee{to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){.marquee-track{animation:none;flex-wrap:wrap;width:auto}}
      `}</style>
    </div>
  );
}
