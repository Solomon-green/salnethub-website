import { ImageResponse } from "next/og";

export const alt = "SalnetHub: Your business runs on manual work between tools. We automate it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// SH mark from public/brand/salnethub-mark.svg (viewBox 0 0 185 266)
const S_PATH =
  "M101,0 L0,56.56 L0,104.56 L77,147.68 L77,104 L39,82.72 L101,48 Z M0,169 L38,190.28 L77,168.44 L77,162 L116,183.84 L116,198 L0,262.96 Z";
const H_PATH = "M147,78 L185,99.28 L185,259 L147,237.72 L147,191 L86,156.84 L86,110 L147,144.16 Z";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1A1C1E", position: "relative", padding: 80 }}>
        <svg width="370" height="532" viewBox="0 0 185 266" style={{ position: "absolute", right: 70, top: 49, opacity: 0.9 }}>
          <path d={S_PATH} fill="#FFFFFF" fillOpacity="0.06" />
          <path d={H_PATH} fill="#C9CED3" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="30" height="43" viewBox="0 0 185 266">
              <path d={S_PATH} fill="#FFFFFF" />
              <path d={H_PATH} fill="#C9CED3" />
            </svg>
            <div style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>SalnetHub</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#FFFFFF", fontSize: 66, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.06 }}>Your business runs on</div>
            <div style={{ color: "#FFFFFF", fontSize: 66, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.06 }}>manual work between tools.</div>
            <div style={{ color: "#C9CED3", fontSize: 66, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.06 }}>We automate it.</div>
            <div style={{ color: "#A6ACB2", fontSize: 28, marginTop: 28 }}>Business automation · AI agents · CRM · Reporting</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
