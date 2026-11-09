import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolMark } from "@/components/brand";
import { recipes } from "@/content/recipes";

/** Proven automation recipes: trigger → steps → outcome, each with its tools and a way to get it built. */
export function Recipes() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((r) => (
        <li key={r.title} className="bento recipe group flex flex-col p-6 sm:p-7" data-reveal>
          <div className="flex items-start justify-between gap-4">
            <p className="t-label text-slate">Recipe</p>
            <span className="flex -space-x-1.5" aria-label={`Tools: ${r.tools.join(", ")}`}>
              {r.tools.map((t) => (
                <span key={t} className="flex size-8 items-center justify-center rounded-full border border-line bg-surface text-fg">
                  <ToolMark slug={t} size={15} />
                </span>
              ))}
            </span>
          </div>
          <h3 className="mt-4 text-[21px] font-bold leading-tight tracking-tight">{r.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate">{r.outcome}</p>

          <ol className="recipe-flow relative mt-6 grid gap-3.5 pl-7 text-[14px]">
            <span aria-hidden className="recipe-line absolute bottom-2 left-[7px] top-2 w-px bg-line">
              <span className="recipe-line-fill block h-full w-full origin-top bg-fg" />
            </span>
            <Step kind="When" text={r.trigger} first />
            {r.steps.map((s) => (
              <Step key={s} kind="Then" text={s} />
            ))}
          </ol>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-[14px]">
            <Link href="/contact#book" className="link-arrow font-bold">
              Get this built <ArrowRight size={15} />
            </Link>
            <Link href={r.post ? `/blog/${r.post}` : `/services/${r.service}`} className="text-slate underline decoration-line underline-offset-4 hover:text-fg">
              {r.post ? "Read how we built ours" : "How it works"}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Step({ kind, text, first = false }: { kind: string; text: string; first?: boolean }) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute -left-7 top-[3px] flex size-[15px] items-center justify-center rounded-full border-2 ${
          first ? "border-fg bg-fg" : "border-fg/40 bg-surface"
        }`}
      />
      <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-stone-deep">{kind}</span>
      <span className="block font-bold leading-snug text-fg">{text}</span>
    </li>
  );
}
