"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./chat-widget").then((m) => m.ChatWidget), { ssr: false });

/** Loads the chat assistant once the browser is idle, so its code never competes with the first paint. */
export function LazyChatWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return ready ? <ChatWidget /> : null;
}
