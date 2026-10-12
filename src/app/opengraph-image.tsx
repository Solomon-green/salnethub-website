import { ImageResponse } from "next/og";

export const alt = "SalnetHub: Connect your systems. Get your time back.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const lines = Array.from({ length: 40 }, (_, i) => i * 34 - 400);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#17191C", position: "relative", padding: 80 }}>
        <svg width="1200" height="630" style={{ position: "absolute", inset: 0 }}>
          {lines.map((o) => (
            <line key={`a${o}`} x1={o} y1={630} x2={o + 1091} y2={0} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {lines.map((o) => (
            <line key={`b${o}`} x1={o} y1={0} x2={o + 1091} y2={630} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 22, height: 22, background: "#C8754A" }} />
            <div style={{ color: "#fff", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>SalnetHub</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#fff", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>Connect your systems.</div>
            <div style={{ color: "#fff", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>Get your time back.</div>
            <div style={{ color: "#A9C0B2", fontSize: 28, marginTop: 28 }}>Business automation · AI agents · RAG systems · Web</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
