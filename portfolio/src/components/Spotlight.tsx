"use client";

import { useEffect } from "react";

// Cursor-follow spotlight for cards/rows (.pj, .stat, .stack-card).
export default function Spotlight() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        ".pj, .stat, .stack-card"
      );
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return null;
}
