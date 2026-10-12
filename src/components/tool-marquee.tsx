import { ToolMark } from "@/components/brand";
import { integrations } from "@/content/integrations";

/** Logo wall as a slow right-to-left CSS marquee. Every integration with a logo, paused on hover. */
export function ToolMarquee({ dark = false }: { dark?: boolean }) {
  const list = integrations.filter((i) => i.icon);
  return (
    <div
      className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      aria-label="Tools we work with"
    >
      <ul className="marquee-track flex w-max items-center gap-14 py-2">
        {[...list, ...list].map((t, i) => (
          <li
            key={`${t.slug}-${i}`}
            className={`transition-colors duration-300 ${dark ? "text-white/70 hover:text-mint" : "text-ink/55 hover:text-mint-ink"}`}
            title={t.name}
            aria-hidden={i >= list.length}
          >
            <ToolMark slug={t.slug} size={28} />
          </li>
        ))}
      </ul>
      <style>{`
        .marquee-track{animation:marquee 60s linear infinite}
        .marquee:hover .marquee-track{animation-play-state:paused}
        @keyframes marquee{to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){.marquee-track{animation:none;flex-wrap:wrap;width:auto}}
      `}</style>
    </div>
  );
}
