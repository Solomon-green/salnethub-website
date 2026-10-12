"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, CircleCheck, FileText, RotateCcw, UserRound } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string; source?: string; lead?: boolean };

const script: Record<string, { reply: string; source?: string; lead?: boolean }> = {
  "What can you automate?": {
    reply:
      "We connect the tools you already use: forms, CRM, Gmail, Google Sheets and accounting. Common jobs are lead routing, follow-up emails, reporting and client onboarding.",
    source: "Services overview",
  },
  "How much does a chatbot cost?": {
    reply: "A website chatbot starts at $2,500, including CRM and calendar connections. AI usage is billed at cost, usually $20 to $150 a month.",
    source: "Pricing, AI chatbot",
  },
  "How long does a project take?": {
    reply: "A single workflow is usually live in 1 to 2 weeks. Larger systems take 3 to 6 weeks, and you see progress every week.",
    source: "How we work",
  },
  "Can I talk to a person?": {
    reply: "Of course. I've passed this conversation to the team with your questions attached. They reply within 1 business day.",
    lead: true,
  },
};

const intro: Msg = { from: "bot", text: "Hi, I'm the SalnetHub assistant. I answer from SalnetHub's own pages. What would you like to know?" };

export function ChatDemo({ className = "" }: { className?: string }) {
  const [messages, setMessages] = useState<Msg[]>([intro]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ask = (q: string) => {
    if (typing) return;
    setAsked((a) => [...a, q]);
    setMessages((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    timer.current = window.setTimeout(() => {
      const r = script[q];
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: r.reply, source: r.source, lead: r.lead }]);
    }, 1100);
  };

  const reset = () => {
    window.clearTimeout(timer.current);
    setMessages([intro]);
    setAsked([]);
    setTyping(false);
  };

  const remaining = Object.keys(script).filter((q) => !asked.includes(q));

  return (
    <div className={`flex flex-col border border-ink bg-white ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center bg-ink text-white">
          <Bot size={18} strokeWidth={1.5} />
        </span>
        <div className="leading-tight">
          <p className="text-[14px] font-bold">SalnetHub assistant</p>
          <p className="text-[12px] text-slate">AI assistant. A person can take over anytime.</p>
        </div>
        <button type="button" onClick={reset} className="ml-auto flex h-9 w-9 items-center justify-center text-slate hover:text-ink" aria-label="Restart demo">
          <RotateCcw size={16} />
        </button>
      </div>

      <div ref={scroller} data-lenis-prevent className="flex h-[340px] flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`chat-in flex gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
            {m.from === "bot" && (
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border border-line">
                <Bot size={13} strokeWidth={1.5} />
              </span>
            )}
            <div className="max-w-[82%]">
              <p className={`px-3.5 py-2.5 text-[14px] leading-relaxed ${m.from === "user" ? "bg-ink text-white" : "bg-paper text-ink"}`}>{m.text}</p>
              {m.source && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-deep-sage">
                  <FileText size={12} /> Source: {m.source}
                </p>
              )}
              {m.lead && (
                <div className="mt-2 border border-sage bg-mist px-3 py-2.5 text-[12px] leading-snug text-ink">
                  <p className="flex items-center gap-1.5 font-bold text-deep-sage">
                    <CircleCheck size={14} /> Lead saved to HubSpot
                  </p>
                  <p className="mt-1 text-slate">Transcript attached. Owner notified by email.</p>
                </div>
              )}
            </div>
            {m.from === "user" && (
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-mist">
                <UserRound size={13} strokeWidth={1.5} />
              </span>
            )}
          </div>
        ))}
        {typing && (
          <div className="chat-in flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center border border-line">
              <Bot size={13} strokeWidth={1.5} />
            </span>
            <span className="flex gap-1 bg-paper px-3.5 py-3" aria-label="Assistant is typing">
              <i className="typing-dot" />
              <i className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <i className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        {remaining.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {remaining.map((q) => (
              <button
                key={q}
                type="button"
                disabled={typing}
                onClick={() => ask(q)}
                className="border border-line px-3 py-2 text-left text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-paper disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        ) : (
          <button type="button" onClick={reset} className="text-[13px] font-bold text-deep-sage">
            Start the demo again
          </button>
        )}
        <p className="mt-3 text-[11px] text-slate">Demo with scripted answers. A live chatbot answers any question from your content.</p>
      </div>
      <style>{`
        .chat-in{animation:chatIn .35s cubic-bezier(.22,1,.36,1) both}
        @keyframes chatIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .typing-dot{width:6px;height:6px;background:#5A5D60;display:block;animation:dot 1s infinite ease-in-out}
        @keyframes dot{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}
      `}</style>
    </div>
  );
}
