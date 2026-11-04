import { NextResponse } from "next/server";
import { chat } from "@/content/chat";

// Site chat: forwards each question to the n8n "SalnetHub KB – Website Chat" workflow, which
// answers from the Pinecone knowledge base and replies { reply, sessionId }. The secret stays
// on the server. Without N8N_CHAT_WEBHOOK_URL the route answers 503 and the widget falls back
// to its built-in answers.
const TIMEOUT_MS = 25_000;

export async function POST(req: Request) {
  const url = process.env.N8N_CHAT_WEBHOOK_URL;
  const secret = process.env.N8N_CHAT_SECRET;
  if (!url || !secret) return NextResponse.json({ error: "not-configured" }, { status: 503 });

  let data: { sessionId?: unknown; message?: unknown; page?: unknown };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const message = typeof data.message === "string" ? data.message.trim() : "";
  const sessionId = typeof data.sessionId === "string" ? data.sessionId.trim() : "";
  const page = typeof data.page === "string" && data.page.startsWith("/") ? data.page.slice(0, 200) : "/";
  if (!message || message.length > chat.maxMessageLength || !/^[\w-]{8,100}$/.test(sessionId)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-SalnetHub-Secret": secret },
      body: JSON.stringify({ sessionId, message, page }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const json = await res.json().catch(() => ({}));
    const reply = typeof json.reply === "string" ? json.reply.trim() : "";
    if (res.ok && reply) return NextResponse.json({ reply: reply.slice(0, 4000) });
    console.error("[chat] n8n returned no reply", res.status);
  } catch (err) {
    console.error("[chat] n8n unreachable", err);
  }
  return NextResponse.json({ error: "unavailable" }, { status: 502 });
}
