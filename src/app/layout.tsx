import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";
import { ConsentManager } from "@/components/consent";
import { site } from "@/content/site";
import "./globals.css";

// TeX Gyre Heros: free Helvetica-metric clone (GUST Font License). Preloaded by next/font.
const heros = localFont({
  src: [
    { path: "./fonts/heros-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/heros-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-heros",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

// Instrument Sans: the headline voice (--font-display), set tight and heavy; italic marks accent words.
const displaySans = Instrument_Sans({
  weight: ["600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AI Automation Agency for Small Businesses | SalnetHub",
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
  // Search Console HTML-tag verification (only needed if DNS verification is not used).
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

// GA4 loads on the live production site only, so local and preview visits stay out of the data,
// and only after the visitor accepts analytics cookies (see ConsentManager).
const gaId = process.env.VERCEL_ENV === "production" ? site.gaId : undefined;

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Adds .js-motion before first paint so reveal targets start hidden only when
// JavaScript runs and the visitor has not asked for reduced motion.
const motionFlag = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heros.variable} ${displaySans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        {children}
        <ConsentManager gaId={gaId} />
      </body>
    </html>
  );
}
