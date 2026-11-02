"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

// The visitor's cookie choice. Google Analytics loads only after an explicit "Accept".
const KEY = "sh-cookie-consent";
const VERSION = 1;
const OPEN_EVENT = "sh:cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return saved?.v === VERSION && (saved.analytics === "granted" || saved.analytics === "denied") ? saved.analytics : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: choice, at: new Date().toISOString() }));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
}

// Removes Google Analytics cookies (_ga, _ga_<ID>) on this host and the parent domain.
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
  }
}

/** Reopens the cookie banner, e.g. from the footer. */
export function CookieSettingsButton({ className, children = "Cookie settings" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  );
}

export function ConsentManager({ gaId }: { gaId?: string }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readChoice();
    // A Global Privacy Control signal counts as "decline" until the visitor says otherwise.
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    // A returning visitor's choice applies at once; a first-time banner waits for the page to settle.
    const timer = setTimeout(
      () => {
        setChoice(saved ?? (gpc ? "denied" : null));
        setOpen(!saved && !gpc);
      },
      saved ? 0 : 900,
    );

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  function decide(next: Choice) {
    const withdrawing = choice === "granted" && next === "denied";
    saveChoice(next);
    setChoice(next);
    setOpen(false);
    if (withdrawing) {
      clearAnalyticsCookies();
      location.reload(); // unloads the analytics script already on the page
    }
  }

  return (
    <>
      {gaId && choice === "granted" && <GoogleAnalytics gaId={gaId} />}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          className="consent-in fixed inset-x-3 bottom-3 z-[70] rounded-card border border-line bg-surface/95 p-5 shadow-[0_24px_80px_-28px_rgb(18_17_23/0.35)] backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[420px] sm:p-6"
        >
          <p id="cookie-title" className="flex items-center gap-2 text-[16px] font-bold text-fg">
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand" />
            Your privacy, your call
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate">
            We&apos;d like to use Google Analytics cookies to see which pages help visitors. They stay off unless you accept. No ads, no selling data.{" "}
            <Link href="/privacy#cookies" className="font-semibold text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
              Cookie details
            </Link>
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-secondary !min-h-[44px] !px-4" onClick={() => decide("denied")}>
              Decline
            </button>
            <button type="button" className="btn btn-cta !min-h-[44px] !px-4" onClick={() => decide("granted")}>
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
