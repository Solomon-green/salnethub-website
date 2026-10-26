import { ToolMark } from "@/components/brand";
import { integrations } from "@/content/integrations";

/** Logo wall as a slow right-to-left CSS marquee. Every integration with a logo, paused on hover. */
export function ToolMarquee({ dark = false, labeled = false }: { dark?: boolean; labeled?: boolean }) {
  const list = integrations.filter((i) => i.icon);
  return (
    <div
      className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      aria-label="Tools we work with"
    >
      <ul className={`marquee-track flex w-max items-center py-2 ${labeled ? "gap-10" : "gap-14"}`}>
        {[...list, ...list].map((t, i) => (
          <li
            key={`${t.slug}-${i}`}
            className={`flex items-center gap-3 transition-colors duration-300 ${dark ? "text-white/75 hover:text-copper" : "text-ink/75 hover:text-ink"}`}
            title={t.name}
            aria-hidden={i >= list.length}
          >
            <ToolMark slug={t.slug} size={labeled ? 22 : 28} />
            {labeled && <span className="whitespace-nowrap text-[15px] font-bold">{t.name}</span>}
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
