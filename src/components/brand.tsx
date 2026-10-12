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
        className={`inline-flex items-center justify-center border border-current font-bold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
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
