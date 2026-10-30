import Link from "next/link";
import { getIntegration } from "@/content/integrations";
import { toolIcons } from "./tool-icons";

export function Logo({ variant = "color", className = "" }: { variant?: "color" | "white"; className?: string }) {
  const src = variant === "white" ? "/brand/salnethub-logo-white.svg" : "/brand/salnethub-logo-full-color.svg";
  return (
    <Link href="/" aria-label="SalnetHub home" className={`inline-flex shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="SalnetHub" width={150} height={50} className="h-8 w-auto md:h-9" />
    </Link>
  );
}

/** A tool's app-style tile: its own brand colour behind its mark, the mark in white or Ink for contrast. */
export function ToolTile({ slug, size = 48, className = "" }: { slug: string; size?: number; className?: string }) {
  const tool = getIntegration(slug);
  const hex = tool?.icon ? toolIcons[tool.icon]?.hex : undefined;
  const bg = hex ? `#${hex}` : "var(--color-raised)";
  const mark = hex && luminance(hex) > 0.4 ? "text-black" : "text-white";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[14px] ${mark} ${className}`}
      style={{ width: size, height: size, background: bg }}
    >
      <ToolMark slug={slug} size={Math.round(size * 0.5)} />
    </span>
  );
}

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** A tool's brand mark in a single colour (brand kit: logos and icons in Ink or white). */
export function ToolMark({ slug, size = 22, className = "" }: { slug: string; size?: number; className?: string }) {
  const tool = getIntegration(slug);
  const icon = tool?.icon ? (toolIcons[tool.icon] ?? null) : null;
  const name = tool?.name ?? slug;
  if (!icon) {
    return (
      <span
        aria-label={name}
        role="img"
        className={`inline-flex items-center justify-center rounded-md border border-current font-bold ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(11, size * 0.46) }}
      >
        {name.slice(0, 2)}
      </span>
    );
  }
  return (
    <svg role="img" aria-label={name} viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
