import Link from "next/link";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { GlowTile } from "@/components/glow-tile";
import { outcomes, type Outcome } from "@/content/outcomes";
import { services } from "@/content/services";

/* Mini product visuals, one per outcome. Pure markup, so they cost nothing to ship. */

function LeadVisual() {
  return (
    <div className="panel-dark w-full max-w-[340px] p-4 text-[13px]">
      <div className="flex items-center gap-3">
        <span className="rounded-xl flex h-9 w-9 items-center justify-center bg-white/[0.07] text-white">
          <ToolMark slug="facebook" size={18} />
        </span>
        <div className="flex-1">
          <p className="font-bold text-white">Dana Ortiz</p>
          <p className="text-on-ink-muted">New lead, Meta ads</p>
        </div>
        <span className="rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5 text-[11px] font-bold text-accent">Hot</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[12px] text-on-ink-muted">
          <span>Lead score</span>
          <span className="font-bold text-white">86</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="bento-bar h-full w-[86%] origin-left rounded-full bg-brand" />
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-[12px]">
        {[
          ["hubspot", "Deal created, owner Sarah"],
          ["gmail", "Reply sent in 1 min 48 s"],
        ].map(([t, s]) => (
          <li key={s} className="flex items-center gap-2.5 text-on-ink-muted">
            <span className="text-white">
              <ToolMark slug={t} size={14} />
            </span>
            {s}
            <Check size={13} className="ml-auto text-fg" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartVisual() {
  const bars = [38, 52, 44, 61, 57, 72, 88];
  return (
    <div className="panel-dark w-full max-w-[300px] p-4">
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-bold text-white">Weekly sales report</span>
        <span className="text-accent">Sent Mon 08:00</span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`bento-col flex-1 origin-bottom rounded-t-md ${i === bars.length - 1 ? "bg-brand" : "bg-white/15"}`}
            style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function OpsVisual() {
  const items = ["Contract signed", "Invoice created in Xero", "Client folder set up", "Kickoff call booked"];
  return (
    <ul className="panel-dark w-full max-w-[300px] space-y-2.5 p-4 text-[13px]">
      {items.map((s, i) => (
        <li key={s} className="flex items-center gap-3 text-white">
          <span className="rounded-full bento-check flex h-5 w-5 shrink-0 items-center justify-center bg-canvas text-fg" style={{ transitionDelay: `${i * 80}ms` }}>
            <Check size={13} strokeWidth={3} />
          </span>
          {s}
        </li>
      ))}
    </ul>
  );
}

function ChatVisual() {
  return (
    <div className="w-full max-w-[360px] space-y-2.5 text-[13px]">
      <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2.5 text-white">Do you open on Saturdays?</p>
      <div className="panel-dark max-w-[88%] !rounded-2xl !rounded-bl-md px-3.5 py-2.5 text-white">
        Yes, 9 am to 1 pm. Want me to book you a slot this Saturday?
        <span className="mt-2 flex items-center gap-1.5 text-[11px] text-accent">
          <FileText size={12} /> Source: opening-hours.pdf
        </span>
      </div>
      <p className="flex items-center gap-2 text-[11px] text-on-ink-muted">
        <span className="rounded-full h-1.5 w-1.5 bg-brand" /> Hands over to your team when it is unsure
      </p>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="flex w-[440px] max-w-full items-center gap-3 sm:gap-4">
      <div className="panel-dark w-[min(220px,48%)] shrink-0 p-3">
        <div className="flex gap-1.5">
          <span className="rounded-full h-2 w-2 bg-white/20" />
          <span className="rounded-full h-2 w-2 bg-white/20" />
          <span className="rounded-full h-2 w-2 bg-white/20" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-2/3 rounded-full bg-white/20" />
          <div className="h-7 rounded-lg border border-white/15" />
          <div className="h-7 rounded-lg border border-white/15" />
          <div className="h-7 w-1/2 rounded-full bg-brand" />
        </div>
      </div>
      <span aria-hidden className="hidden h-px w-10 shrink-0 bg-brand  sm:block" />
      <div className="panel-dark shrink-0 whitespace-nowrap p-3 text-[12px]">
        <span className="flex items-center gap-2 font-bold text-white">
          <ToolMark slug="hubspot" size={14} /> Contact created
        </span>
        <span className="mt-1 block text-on-ink-muted">Follow-up started</span>
      </div>
    </div>
  );
}

const visuals: Record<Outcome["id"], () => React.ReactElement> = {
  sales: LeadVisual,
  reporting: ChartVisual,
  ops: OpsVisual,
  ai: ChatVisual,
  web: WebVisual,
};

export function ServicesBento() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {outcomes.map((o) => {
        const Visual = visuals[o.id];
        const list = o.services.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);
        const wide = o.span === "lg:col-span-2" || o.span === "lg:col-span-3";
        return (
          <GlowTile key={o.id} className={`group ${o.span ?? ""}`}>
            <div data-reveal className={`relative grid h-full gap-8 p-7 md:p-9 ${wide ? "md:grid-cols-[1fr_auto] md:items-center" : ""}`}>
              <div className="flex flex-col">
                <h3 className="t-h2 max-w-[22ch]">{o.title}</h3>
                <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-slate">{o.body}</p>
                <ul className="mt-7 border-t border-line">
                  {list.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between gap-4 border-b border-line py-3.5 text-[15px] font-bold text-fg transition-colors hover:text-accent"
                      >
                        {s.name}
                        <span className="flex shrink-0 items-center gap-3 text-[13px] font-normal text-slate">
                          {s.priceModel}
                          <ArrowUpRight size={16} className="text-slate transition-colors group-hover:text-accent" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`screen on-dark flex items-center justify-center ${wide ? "md:min-w-[360px]" : ""}`}>
                <Visual />
              </div>
            </div>
          </GlowTile>
        );
      })}
      <style>{`
        .bento-bar,.bento-col{transform:scale(1);transition:transform .9s cubic-bezier(.22,1,.36,1)}
        .bento-col{transform-origin:bottom}
        .bento:not(:hover) .bento-col{transform:scaleY(.82)}
        .bento:not(:hover) .bento-bar{transform:scaleX(.9)}
        .bento-check{transition:transform .4s cubic-bezier(.22,1,.36,1)}
        .bento:hover .bento-check{transform:scale(1.12)}
      `}</style>
    </div>
  );
}
