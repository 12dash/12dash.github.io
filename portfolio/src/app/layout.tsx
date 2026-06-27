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
    "Soham Dandapath, a customer-facing senior data scientist at C3 AI who turns ambiguous business problems into forecasting models that run in production.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Soham Dandapath",
    title: "Soham Dandapath, Senior Data Scientist",
    description: "Customer-facing data scientist who turns ambiguous business problems into forecasting models that run in production.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Dandapath, Senior Data Scientist",
    description: "Customer-facing data scientist who turns ambiguous business problems into forecasting models that run in production.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ec",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Senior Data Scientist",
  worksFor: { "@type": "Organization", name: "C3 AI" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Columbia University" },
    { "@type": "CollegeOrUniversity", name: "Nanyang Technological University" },
  ],
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
};

// No-flash theme bootstrap: runs before paint.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

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
