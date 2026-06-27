"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Controls() {
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("cmdk:open"));
  };

  return (
    <div className="controls">
      <button
        className="ctrl"
        onClick={openPalette}
        aria-label="Open command palette"
        title="Command palette"
      >
        <span className="label-text">Menu</span>
        <span className="kbd">{mac ? "⌘K" : "Ctrl K"}</span>
      </button>
      <ThemeToggle />
    </div>
  );
}
