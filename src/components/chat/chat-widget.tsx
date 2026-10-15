"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, X } from "lucide-react";
import { chat } from "@/content/chat";
import { demoReply, type ChatAction } from "./demo-reply";

type Message = { id: number; role: "assistant" | "user"; text: string; at?: string; actions?: ChatAction[] };

const TEASER_KEY = "sh-chat-teaser-seen";
const MOBILE = "(max-width: 639px)";
// Mouse/trackpad devices: auto-focusing the input there doesn't raise an on-screen keyboard.
const FINE_POINTER = "(pointer: fine)";
const AVATAR = "/brand/salnethub-icon-reversed.svg";

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;
const now = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/**
 * Site chat assistant: a small round launcher bottom-right on every page. Clicking it
 * grows a compact rounded panel up out of the launcher (a full-height sheet on phones),
 * and the launcher turns into the close button. The rest of the site is square-cornered;
 * the chat is deliberately soft so it reads as a conversation.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "assistant", text: chat.greeting }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);

  const panelId = useId();
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const wasOpen = useRef(false);
  const teaserDone = useRef(false);

  // Teaser bubble: shows on every page load after a short delay. Opening the chat hides it
  // until the next load; only its own close button hides it for the rest of the visit.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      if (!teaserDone.current) setTeaser(true);
    }, chat.teaserDelay * 1000);
    return () => window.clearTimeout(t);
  }, []);

  const hideTeaser = useCallback(() => {
    teaserDone.current = true;
    setTeaser(false);
  }, []);

  const dismissTeaser = () => {
    hideTeaser();
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  };

  const toggle = (next: boolean) => {
    if (next) {
      hideTeaser();
      // The greeting is stamped with the time the visitor first opens the chat.
      setMessages((m) => (m[0].at ? m : [{ ...m[0], at: now() }, ...m.slice(1)]));
    }
    setOpen(next);
  };

  // Open: focus the input, lock page scroll on phones. Close: hand focus back to the launcher.
  useEffect(() => {
    if (open) {
      const t = window.matchMedia(FINE_POINTER).matches
        ? window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 260)
        : undefined;
      const mobile = window.matchMedia(MOBILE).matches;
      if (mobile) {
        document.documentElement.style.overflow = "hidden";
        lenis()?.stop();
      }
      wasOpen.current = true;
      return () => {
        window.clearTimeout(t);
        if (mobile) {
          document.documentElement.style.overflow = "";
          lenis()?.start();
        }
      };
    }
    if (wasOpen.current) launcherRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: busy ? "instant" : "smooth" });
  }, [messages, typing, busy]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== t);
      fn();
    }, ms);
    timers.current.push(t);
  };

  const send = (raw: string) => {
    const text = raw.trim().slice(0, chat.maxMessageLength);
    if (!text || busy) return;
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text, at: now() }]);
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "";
    setBusy(true);
    setTyping(true);

    // Phase 1: a local placeholder answer, revealed word by word like a streamed reply.
    const reply = demoReply(text);
    const id = nextId.current++;
    const words = reply.text.split(" ");
    later(() => {
      setTyping(false);
      setMessages((m) => [...m, { id, role: "assistant", text: "", at: now() }]);
      words.forEach((_, i) => {
        later(() => {
          const done = i === words.length - 1;
          setMessages((m) =>
            m.map((msg) =>
              msg.id === id
                ? { ...msg, text: words.slice(0, i + 1).join(" "), actions: done ? reply.actions : undefined }
                : msg,
            ),
          );
          if (done) setBusy(false);
        }, i * 28);
      });
    }, 700);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(draft);
    }
  };

  const autosize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  const closeOnPhone = () => {
    if (window.matchMedia(MOBILE).matches) setOpen(false);
  };

  const showQuickReplies = messages.length === 1 && !busy;

  return (
    <div className="chat-root">
      {/* Teaser bubble */}
      <div
        className={`fixed bottom-[84px] right-5 z-50 origin-bottom-right transition-[opacity,translate,scale,visibility] duration-500 ease-[var(--ease-out-quint)] ${
          teaser && !open ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-2 scale-90 opacity-0"
        }`}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle(true)}
            className="rounded-[14px] bg-white px-4 py-2.5 text-left text-[14px] leading-snug text-ink shadow-[0_14px_40px_-14px_rgb(23_25_28/0.45),0_0_0_1px_rgb(23_25_28/0.06)] transition-[translate] duration-200 hover:-translate-y-0.5"
          >
            {chat.teaser}
          </button>
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-slate text-white shadow transition-colors hover:bg-ink"
          >
            <X size={12} strokeWidth={2.75} />
          </button>
        </div>
      </div>

      {/* Panel: grows up out of the launcher */}
      <section
        id={panelId}
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        className={`on-dark fixed z-50 flex flex-col overflow-hidden bg-ink text-white shadow-[0_30px_90px_-24px_rgb(10_20_16/0.7),0_0_0_1px_rgb(255_255_255/0.08)] transition-[opacity,translate,scale,visibility] ease-[var(--ease-out-quint)] max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-[max(12px,env(safe-area-inset-top))] max-sm:rounded-t-[22px] sm:bottom-[86px] sm:right-5 sm:h-[min(560px,calc(100dvh-110px))] sm:w-[380px] sm:origin-bottom-right sm:rounded-[20px] ${
          open
            ? "visible translate-y-0 scale-100 opacity-100 duration-[450ms]"
            : "invisible translate-y-8 opacity-0 duration-200 sm:translate-y-5 sm:scale-[0.85]"
        }`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center gap-3 bg-ink-2 px-4 py-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AVATAR} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full ring-1 ring-white/15" />
          <h2 id={titleId} className="min-w-0 flex-1 truncate text-[16px] font-bold tracking-[-0.01em]">
            {chat.welcome} <span aria-hidden>👋</span>
          </h2>
          {/* On phones the launcher is hidden behind the sheet, so the sheet carries its own close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white sm:hidden"
          >
            <X size={17} strokeWidth={2} />
          </button>
        </header>

        {/* Messages */}
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-busy={busy}
          data-lenis-prevent
          className="chat-scroll flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.map((m) =>
            m.role === "assistant" ? (
              <div key={m.id} className="chat-in flex items-start gap-2.5 pr-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AVATAR} alt="" width={30} height={30} className="size-[30px] shrink-0 rounded-full ring-1 ring-white/10" />
                <div className="min-w-0">
                  <p className="mb-1 text-[12px] text-white/50">
                    <span className="font-bold text-white/85">{chat.name}</span>
                    {m.at && <> • {m.at}</>}
                  </p>
                  <p className="whitespace-pre-wrap rounded-[16px] rounded-tl-[4px] bg-white/[0.07] px-3.5 py-2.5 text-[14px] leading-[1.5] text-white/90">
                    {m.text || " "}
                  </p>
                  {m.actions && (
                    <div className="chat-in mt-2 flex flex-wrap gap-1.5">
                      {m.actions.map((a) => (
                        <Link
                          key={a.href}
                          href={a.href}
                          onClick={closeOnPhone}
                          className="rounded-full border border-mint/40 px-3 py-1.5 text-[12.5px] font-bold text-mint transition-colors hover:border-mint hover:bg-mint hover:text-ink"
                        >
                          {a.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div key={m.id} className="chat-in flex justify-end pl-10">
                <p className="whitespace-pre-wrap rounded-[16px] rounded-tr-[4px] bg-mint px-3.5 py-2.5 text-[14px] leading-[1.5] text-ink">
                  {m.text}
                </p>
              </div>
            ),
          )}

          {typing && (
            <div className="chat-in flex items-start gap-2.5" aria-label="Assistant is typing">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={AVATAR} alt="" width={30} height={30} className="size-[30px] rounded-full ring-1 ring-white/10" />
              <div className="flex gap-1 rounded-[16px] rounded-tl-[4px] bg-white/[0.07] px-3.5 py-3.5">
                <span className="chat-dot size-1.5 rounded-full bg-white/70" />
                <span className="chat-dot size-1.5 rounded-full bg-white/70 [animation-delay:150ms]" />
                <span className="chat-dot size-1.5 rounded-full bg-white/70 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {showQuickReplies && (
            <div className="chat-in flex flex-wrap justify-end gap-1.5 pl-10">
              {chat.quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] font-bold text-white/85 transition-colors hover:border-mint hover:text-mint"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="shrink-0 px-3.5 pb-[max(10px,env(safe-area-inset-bottom))] pt-1"
        >
          <div className="flex items-end gap-2 rounded-[22px] border border-white/10 bg-white/[0.05] py-1 pl-4 pr-1 transition-colors focus-within:border-mint/50 focus-within:bg-white/[0.07]">
            <label htmlFor={`${panelId}-input`} className="sr-only">
              Message
            </label>
            <textarea
              id={`${panelId}-input`}
              ref={inputRef}
              rows={1}
              value={draft}
              maxLength={chat.maxMessageLength}
              placeholder={chat.placeholder}
              onChange={(e) => {
                setDraft(e.target.value);
                autosize(e.target);
              }}
              onKeyDown={onInputKey}
              className="max-h-[96px] min-h-[38px] flex-1 resize-none bg-transparent py-[8px] text-[16px] leading-[1.4] text-white placeholder:text-white/40 focus:outline-none focus-visible:outline-none sm:text-[14px] sm:py-[9px]"
            />
            <button
              type="submit"
              disabled={!draft.trim() || busy}
              aria-label="Send message"
              className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-mint text-ink transition-[background-color,opacity,scale] duration-200 hover:bg-[#5ff0bd] active:scale-95 disabled:opacity-35 disabled:hover:bg-mint"
            >
              <ArrowUp size={18} strokeWidth={2.4} />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10.5px] text-white/35">{chat.disclaimer}</p>
        </form>
      </section>

      {/* Launcher: becomes the close button while the panel is open */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat" : "Chat with us"}
        className={`fixed bottom-5 right-5 z-50 flex size-[52px] items-center justify-center rounded-full bg-ink text-mint shadow-[0_14px_36px_-12px_rgb(10_20_16/0.6),0_0_0_1px_rgb(255_255_255/0.1)] transition-[scale,background-color,opacity] duration-300 ease-[var(--ease-out-quint)] hover:scale-105 hover:bg-ink-2 active:scale-95 ${
          open ? "max-sm:pointer-events-none max-sm:scale-75 max-sm:opacity-0" : ""
        }`}
      >
        {teaser && !open && <span aria-hidden className="chat-ping absolute inset-0 rounded-full" />}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`absolute size-6 transition-[opacity,scale,rotate] duration-300 ease-[var(--ease-out-quint)] ${
            open ? "rotate-45 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          fill="currentColor"
        >
          <path d="M12 3C6.75 3 2.5 6.69 2.5 11.25c0 2.35 1.13 4.47 2.95 5.97L4.6 20.6a.6.6 0 0 0 .84.68l3.9-1.86c.85.2 1.74.31 2.66.31 5.25 0 9.5-3.69 9.5-8.25S17.25 3 12 3Z" />
        </svg>
        <X
          aria-hidden
          size={24}
          strokeWidth={2.25}
          className={`absolute transition-[opacity,scale,rotate] duration-300 ease-[var(--ease-out-quint)] ${
            open ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-50 opacity-0"
          }`}
        />
      </button>
    </div>
  );
}
