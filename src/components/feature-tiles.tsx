import { MousePointer2 } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { integrations } from "@/content/integrations";

// "Built to run without you": four tiles, each with one small looping visual that makes its point.
// CSS-only animation (globals.css → .ft-*), paused for prefers-reduced-motion.

// 28 recent runs; 0 = ok, 1 = flagged and fixed. Drawn twice so the strip can scroll seamlessly.
const runs = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const heights = [62, 74, 58, 80, 66, 71, 60, 77, 48, 69, 75, 63, 82, 57, 70, 66, 78, 61, 73, 59, 76, 68, 64, 79, 62, 72, 67, 74];

const alerts = [
  { tool: "gmail", text: "Your weekly report is ready" },
  { tool: "whatsapp", text: "New lead: Dana Ortiz, score 86" },
  { tool: "slack", text: "Invoice #208 paid, receipt sent" },
];

const logos = ["hubspot", "googlesheets", "quickbooks", "shopify", "notion", "stripe"];

export function FeatureTiles() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Always on */}
      <Tile className="lg:col-span-7" title="Runs day and night" body="Workflows start on a schedule, a webhook or an event in your tools. We monitor every run and usually spot a problem before you do.">
        <div className="screen on-dark !p-5 text-white">
          <div className="flex items-center justify-between text-[12px] font-bold text-on-ink-muted">
            <span>Lead follow-up · last 28 runs</span>
            <span className="flex items-center gap-2 text-white/85">
              <span className="ft-live size-2 rounded-full bg-white" /> Live
            </span>
          </div>
          <div className="mt-4 h-[92px] overflow-hidden" aria-hidden>
            <div className="ft-runs flex h-full w-max items-end gap-[6px]">
              {[...runs, ...runs].map((r, i) => (
                <span
                  key={i}
                  className={`w-[10px] shrink-0 rounded-[3px] ${r ? "ft-flag" : "bg-white/70"}`}
                  style={{ height: `${heights[i % heights.length]}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[12px] text-on-ink-muted">
            <span>
              <span className="font-bold text-white">27 ok</span> · 1 flagged, fixed in 12 min
            </span>
            <span>Next run in 4 min</span>
          </div>
        </div>
      </Tile>

      {/* Human in the loop */}
      <Tile className="lg:col-span-5" title="People approve the risky steps" body="Refunds, big discounts and first emails to a new client wait for a yes. The system does everything around them.">
        <div className="relative rounded-[18px] border border-line bg-canvas p-5 pb-16" aria-hidden>
          <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
            <p className="text-[12px] font-bold text-stone-deep">Needs approval</p>
            <p className="mt-1 text-[15px] font-bold">Refund $240 for order #1042</p>
            <p className="mt-1 text-[12.5px] text-slate">Customer reported a damaged item, photo attached.</p>
            <div className="mt-3 flex gap-2">
              <span className="ft-approve rounded-full bg-fg px-3.5 py-1.5 text-[12.5px] font-bold text-white">Approve</span>
              <span className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-bold text-slate">Edit</span>
            </div>
          </div>
          <Cursor name="Sarah" className="ft-cursor-a right-[18%] bottom-[10%]" />
          <Cursor name="You" className="ft-cursor-b left-[8%] bottom-[6%]" />
        </div>
      </Tile>

      {/* Alerts */}
      <Tile className="lg:col-span-5" title="Alerts where you already work" body="Results and exceptions land in email, WhatsApp or Slack, so nobody has to check a dashboard to know what happened.">
        <div className="relative h-[178px] overflow-hidden rounded-[18px] border border-line bg-canvas" aria-hidden>
          {alerts.map((a, i) => (
            <div
              key={a.text}
              className="ft-toast absolute inset-x-4 top-1/2 flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5 shadow-md"
              style={{ animationDelay: `${i * 3}s` }}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-raised text-fg">
                {a.tool === "slack" ? <span className="text-[11px] font-bold">Slack</span> : <ToolMark slug={a.tool} size={18} />}
              </span>
              <span className="min-w-0">
                <span className="block text-[11.5px] font-bold text-stone-deep">SalnetHub automation · now</span>
                <span className="block truncate text-[14px] font-bold">{a.text}</span>
              </span>
            </div>
          ))}
        </div>
      </Tile>

      {/* Any tool */}
      <Tile
        className="lg:col-span-7"
        title="Connects any tool with an API"
        body={`${integrations.length}+ tools are ready to go. Anything else with an API, including your own software, we connect directly.`}
      >
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6" aria-hidden>
          {logos.map((l) => (
            <span key={l} className="flex aspect-square items-center justify-center rounded-xl border border-line bg-canvas text-fg">
              <ToolMark slug={l} size={22} />
            </span>
          ))}
          <span className="col-span-3 flex items-center rounded-xl border border-dashed border-fg/35 bg-surface px-4 py-3 font-mono text-[13px] sm:col-span-6">
            <span className="text-stone-deep">POST</span>&nbsp;/webhooks/<span className="font-bold">your-app</span>
            <span className="ft-caret ml-0.5 inline-block h-[1.1em] w-[2px] bg-fg" />
          </span>
        </div>
      </Tile>
    </div>
  );
}

function Tile({ title, body, className = "", children }: { title: string; body: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`bento flex flex-col gap-6 p-6 sm:p-8 ${className}`} data-reveal>
      {children}
      <div className="mt-auto">
        <h3 className="text-[19px] font-bold leading-snug">{title}</h3>
        <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-slate">{body}</p>
      </div>
    </div>
  );
}

function Cursor({ name, className }: { name: string; className: string }) {
  return (
    <span className={`absolute flex items-start ${className}`}>
      <MousePointer2 size={18} className="fill-fg text-fg" strokeWidth={1.5} />
      <span className="mt-4 rounded-full bg-fg px-2 py-0.5 text-[11px] font-bold text-white">{name}</span>
    </span>
  );
}
