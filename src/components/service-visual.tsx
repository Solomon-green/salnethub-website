import type { Service } from "@/content/services";
import { FlowDiagram } from "@/components/illustrations/flow-diagram";
import { ChatDemo } from "@/components/illustrations/chat-demo";
import { RagDiagram } from "@/components/illustrations/rag-diagram";
import { ChartIllustration } from "@/components/illustrations/chart-illustration";

/** Picks the right animated illustration for a service's workflow section. */
export function ServiceVisual({ workflow, dark = false }: { workflow: Service["workflow"]; dark?: boolean }) {
  switch (workflow.kind) {
    case "chat":
      return (
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <ChatDemo />
          <ol className="grid gap-0 border-t border-ink bg-white px-6">
            {workflow.nodes.map((n) => (
              <li key={n.label} className="flex items-baseline justify-between gap-6 border-b border-line py-5" data-reveal>
                <span className="text-[17px] font-bold">{n.label}</span>
                <span className="text-right text-[14px] text-slate">{n.meta}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "rag":
      return <RagDiagram />;
    case "chart":
      return <ChartIllustration />;
    case "agent":
      return <FlowDiagram nodes={workflow.nodes} approvalIndex={3} tone={dark ? "dark" : "light"} />;
    default:
      return <FlowDiagram nodes={workflow.nodes} tone={dark ? "dark" : "light"} />;
  }
}
