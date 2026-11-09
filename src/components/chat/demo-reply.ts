// Built-in answers the widget falls back to when /api/chat is unavailable (not configured
// locally, n8n down or too slow), so a visitor always gets a useful next step.
export type ChatAction = { label: string; href: string };
export type DemoReply = { text: string; actions?: ChatAction[] };

const book: ChatAction = { label: "Book a call", href: "/contact#book" };

export function demoReply(input: string): DemoReply {
  const q = input.toLowerCase();
  if (/(price|cost|how much|budget|quote|pricing)/.test(q)) {
    return {
      text: "You pay for results, not promises. We start with a 14-day pilot, then charge per booked appointment or a small share of the time we save you, always less than the problem costs you now. No big fee up front.",
      actions: [{ label: "See pricing", href: "/engagements" }, book],
    };
  }
  if (/(book|call|meet|talk|demo|schedule)/.test(q)) {
    return {
      text: "Happy to set that up. Pick a free 30-minute slot and you'll get a Google Meet link straight away.",
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
