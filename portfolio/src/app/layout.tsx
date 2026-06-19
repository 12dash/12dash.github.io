import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Soham Dandapath",
    template: "%s · Soham Dandapath",
  },
  description:
    "Soham Dandapath, an applied AI engineer at C3 AI. RAG-based LLM systems and time-series forecasting, from research to production.",
  alternates: { canonical: "/" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23121313'/%3E%3Ctext x='16' y='22' font-family='monospace' font-size='16' font-weight='700' fill='%23eaeae7' text-anchor='middle'%3Esd%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    type: "website",
    siteName: "Soham Dandapath",
    title: "Soham Dandapath, Applied AI Engineer",
    description: "RAG-based LLM systems and time-series forecasting, from research to production.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Dandapath, Applied AI Engineer",
    description: "RAG-based LLM systems and time-series forecasting, from research to production.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#121313",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Applied AI Engineer",
  worksFor: { "@type": "Organization", name: "C3 AI" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Columbia University" },
    { "@type": "CollegeOrUniversity", name: "Nanyang Technological University" },
  ],
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
};

// No-flash theme bootstrap: runs before paint.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollProgress />
        <SiteHeader />
        <Spotlight />
        <CommandPalette />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
