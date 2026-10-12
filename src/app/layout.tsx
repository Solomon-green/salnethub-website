import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SalnetHub | Business automation, AI agents and RAG systems",
    template: "%s | SalnetHub",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "SalnetHub | Connect your systems. Get your time back.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
