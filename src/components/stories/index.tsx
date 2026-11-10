import { AgencySalesOps } from "./agency-sales-ops";
import { ContractorIntake } from "./contractor-intake";
import { TelegramCoach } from "./telegram-coach";

// Custom illustrations for customer stories, picked by the story's "Illustrations" field in Keystatic.
export const storyVisuals = {
  "agency-sales-ops": { label: "Agency: lead follow-up, setter attribution, reporting", Component: AgencySalesOps },
  "contractor-intake": { label: "Contractor: AI lead intake, RAG triage, routing", Component: ContractorIntake },
  "telegram-coach": { label: "Telegram coaching bot: n8n router, four brains", Component: TelegramCoach },
} as const;

export type StoryVisualId = keyof typeof storyVisuals;

export function StoryVisual({ id }: { id: string | null | undefined }) {
  const v = id && id in storyVisuals ? storyVisuals[id as StoryVisualId] : null;
  return v ? <v.Component /> : null;
}
