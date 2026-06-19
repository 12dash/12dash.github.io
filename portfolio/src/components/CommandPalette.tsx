"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { site } from "@/lib/data";

type Action = {
  id: string;
  label: string;
  group: string;
  icon: string;
  meta?: string;
  keywords?: string;
  run: () => void;
};

const GROUP_ORDER = ["Navigate", "Projects", "Writing", "Links", "Theme"];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const go = useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
    },
    [router]
  );
  const ext = useCallback((href: string) => {
    window.open(href, "_blank", "noopener");
    setOpen(false);
  }, []);

  const actions = useMemo<Action[]>(() => {
    return [
      { id: "home", label: "Home", group: "Navigate", icon: "⌂", run: () => go("/") },
      { id: "all-projects", label: "All projects", group: "Navigate", icon: "#", run: () => go("/projects") },
      ...projects.map<Action>((p) => ({
        id: `p-${p.slug}`,
        label: p.title,
        group: "Projects",
        icon: "→",
        meta: p.year,
        keywords: `${p.category} ${p.tech.join(" ")}`,
        run: () => go(`/projects/${p.slug}`),
      })),
      { id: "github", label: "GitHub", group: "Links", icon: "↗", meta: "12dash", run: () => ext(site.github) },
      { id: "linkedin", label: "LinkedIn", group: "Links", icon: "↗", run: () => ext(site.linkedin) },
      {
        id: "email",
        label: "Send email",
        group: "Links",
        icon: "@",
        meta: site.email,
        run: () => {
          window.location.href = `mailto:${site.email}`;
          setOpen(false);
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark",
        group: "Theme",
        icon: "◐",
        run: () => {
          const cur = document.documentElement.getAttribute("data-theme") || "dark";
          const next = cur === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          try {
            localStorage.setItem("theme", next);
          } catch {
            /* ignore */
          }
          window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
          setOpen(false);
        },
      },
    ];
  }, [go, ext]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.keywords ?? ""} ${a.group}`.toLowerCase().includes(q)
    );
  }, [query, actions]);

  const groups = useMemo(() => {
    const map: Record<string, Action[]> = {};
    filtered.forEach((a) => {
      (map[a.group] = map[a.group] ?? []).push(a);
    });
    return GROUP_ORDER.filter((g) => map[g]?.length).map((g) => ({ g, items: map[g] }));
  }, [filtered]);

  useEffect(() => {
    setSel(0);
  }, [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[sel]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  let runningIndex = -1;

  return (
    <div
      className="cmdk-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Jump to a page, project, or post…"
          aria-label="Command palette search"
        />
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">No matches.</div>}
          {groups.map(({ g, items }) => (
            <div key={g}>
              <div className="cmdk-group-label">{g}</div>
              {items.map((item) => {
                runningIndex += 1;
                const idx = runningIndex;
                return (
                  <div
                    key={item.id}
                    className="cmdk-item"
                    aria-selected={idx === sel}
                    onMouseEnter={() => setSel(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      item.run();
                    }}
                  >
                    <span className="ci-icon">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.meta && <span className="ci-meta">{item.meta}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
