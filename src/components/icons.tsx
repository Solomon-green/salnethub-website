import {
  BarChart3,
  BookOpen,
  Bot,
  Filter,
  Globe,
  MessageSquare,
  Users,
  Workflow,
  Zap,
  type LucideProps,
} from "lucide-react";

const map = {
  users: Users,
  filter: Filter,
  "bar-chart-3": BarChart3,
  workflow: Workflow,
  zap: Zap,
  "message-square": MessageSquare,
  bot: Bot,
  "book-open": BookOpen,
  globe: Globe,
} as const;

export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = map[name as keyof typeof map] ?? Workflow;
  return <Icon strokeWidth={1.5} strokeLinecap="square" {...props} />;
}
