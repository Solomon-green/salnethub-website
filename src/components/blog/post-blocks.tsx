import type { ReactNode } from "react";

// Building blocks for blog posts. Authors insert them from the Keystatic editor ("+" menu);
// they are stored as Markdoc tags and rendered here (see markdocConfig in src/lib/blog.ts).

/** A boxed aside, usually a short definition: "What's a RAG system?" */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="post-callout">
      {title && <p className="t-label text-slate">{title}</p>}
      <div className="post-callout-body">{children}</div>
    </aside>
  );
}

/** One sentence worth remembering, set large. */
export function PullQuote({ quote, cite }: { quote: string; cite?: string }) {
  return (
    <figure className="post-pullquote">
      <blockquote>{quote}</blockquote>
      {cite && <figcaption>{cite}</figcaption>}
    </figure>
  );
}

/** The closing checklist: what a reader should do on Monday. */
export function Playbook({ title = "Playbook", children }: { title?: string; children: ReactNode }) {
  return (
    <section className="post-playbook">
      <p className="post-playbook-title">{title}</p>
      <div className="post-playbook-body">{children}</div>
    </section>
  );
}

type BeforeAfterProps = {
  title: string;
  unit?: string;
  before: number;
  after: number;
  beforeLabel?: string;
  afterLabel?: string;
  note?: string;
};

const fmt = (n: number) => (Number.isInteger(n) ? n.toLocaleString("en-US") : n.toLocaleString("en-US", { maximumFractionDigits: 1 }));

/** Two bars and the change between them, drawn from real numbers. */
export function BeforeAfter({ title, unit = "", before, after, beforeLabel = "Before", afterLabel = "After", note }: BeforeAfterProps) {
  const max = Math.max(before, after, 1);
  const change = before ? Math.round(((after - before) / before) * 100) : 0;
  const value = (n: number) => `${fmt(n)}${unit ? ` ${unit}` : ""}`;
  return (
    <figure className="post-chart" aria-label={`${title}: ${beforeLabel} ${value(before)}, ${afterLabel} ${value(after)}`}>
      <figcaption className="post-chart-title">{title}</figcaption>
      <div className="post-chart-grid">
        <div className="post-chart-bars" aria-hidden>
          {[
            { label: beforeLabel, n: before, cls: "is-before" },
            { label: afterLabel, n: after, cls: "is-after" },
          ].map((b) => (
            <div key={b.label} className="post-chart-col">
              <span className="post-chart-value">{value(b.n)}</span>
              <span className={`post-chart-bar ${b.cls}`} style={{ height: `${Math.max(4, (b.n / max) * 100)}%` }} />
              <span className="post-chart-label">{b.label}</span>
            </div>
          ))}
        </div>
        <div className="post-chart-delta">
          <span className="post-chart-pct">
            {change > 0 ? "+" : change < 0 ? "−" : ""}
            {Math.abs(change)}%
          </span>
          {note && <p className="post-chart-note">{note}</p>}
        </div>
      </div>
    </figure>
  );
}
