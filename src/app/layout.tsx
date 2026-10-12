import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// TeX Gyre Heros: free Helvetica-metric clone (GUST Font License). Preloaded by next/font.
const heros = localFont({
  src: [
    { path: "./fonts/heros-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/heros-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/heros-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-heros",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Business Automation & AI Agents for Small Businesses | SalnetHub",
    template: "%s | SalnetHub",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "SalnetHub | Automate the work between your tools",
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#17191C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Adds .js-motion before first paint so reveal targets start hidden only when
// JavaScript runs and the visitor has not asked for reduced motion.
const motionFlag = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={heros.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
