// Placeholder answers so the widget can be reviewed before the AI route is connected.
// Phase 2 replaces this with a streamed reply from /api/chat.
export type ChatAction = { label: string; href: string };
export type DemoReply = { text: string; actions?: ChatAction[] };

const book: ChatAction = { label: "Book a call", href: "/contact#book" };

export function demoReply(input: string): DemoReply {
  const q = input.toLowerCase();
  if (/(price|cost|how much|budget|quote|pricing)/.test(q)) {
    return {
      text: "Every project gets a fixed written quote before any work starts, so there are no hourly surprises. Starting prices for automation, chatbots, agents and websites are on the pricing page.",
      actions: [{ label: "See pricing", href: "/engagements" }, book],
    };
  }
  if (/(book|call|meet|talk|demo|schedule)/.test(q)) {
    return {
      text: "Happy to set that up. Pick a free 20-minute slot and you'll get a Google Meet link straight away.",
      actions: [book],
    };
  }
  if (/(automat|what can|services?|do you do|help with)/.test(q)) {
    return {
      text: "We automate the manual work between your tools: lead follow-up, CRM updates, reporting and admin. We also build AI chatbots, custom AI agents, RAG knowledge systems and websites.",
      actions: [{ label: "Browse services", href: "/services" }, book],
    };
  }
  return {
    text: "Good question. I'm still being connected to my full knowledge of SalnetHub, so for now the quickest answer is a short call or a message to the team.",
    actions: [book, { label: "Contact us", href: "/contact" }],
  };
}
