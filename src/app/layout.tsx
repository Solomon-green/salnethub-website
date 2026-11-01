import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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

// Poppins: the wordmark's typeface, used for headings (--font-display).
const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Business Automation Agency for Small Businesses | SalnetHub",
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

// GA4 loads only when a Measurement ID is set (Vercel env: NEXT_PUBLIC_GA_ID).
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Adds .js-motion before first paint so reveal targets start hidden only when
// JavaScript runs and the visitor has not asked for reduced motion.
const motionFlag = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heros.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
