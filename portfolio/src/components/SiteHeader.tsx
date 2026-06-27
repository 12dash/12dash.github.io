"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/#work", label: "work", hash: true },
  { href: "/projects", label: "projects", hash: false },
  { href: "/#contact", label: "contact", hash: true },
];

export default function SiteHeader() {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const openPalette = () => window.dispatchEvent(new CustomEvent("cmdk:open"));

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="sh-brand">
          soham dandapath
        </Link>

        <nav className="sh-nav" aria-label="Primary">
          {navLinks.map((l) =>
            l.hash ? (
              <a key={l.href} href={l.href} className="sh-link">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="sh-link">
                {l.label}
              </Link>
            )
          )}
          <a
            className="sh-link"
            href={site.resume}
            download
            rel="noopener noreferrer"
          >
            résumé
          </a>

          <button
            className="sh-cmd"
            onClick={openPalette}
            aria-label="Open menu / command palette"
            title="Menu (⌘K)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="kbd">{mac ? "⌘K" : "Ctrl K"}</span>
          </button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
