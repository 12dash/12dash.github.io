import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies on generative models, transformers, causal ML, and network science - built to understand, not just to use.",
};

export default function ProjectsPage() {
  return (
    <div className="page">
      <div className="page-top">
        <Link className="back" href="/">
          ← home
        </Link>
      </div>

      <header className="page-head">
        <p className="kicker">Projects</p>
        <h1>Things I built to understand them.</h1>
        <p className="lede">
          Most of these started as a gap in my own understanding. Each one is a
          short case study: why I built it, what I actually did, and what it
          taught me - with a link to the code.
        </p>
      </header>

      <div style={{ marginTop: 18 }}>
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            className={`pj${i === 0 ? " first" : ""}`}
            href={`/projects/${p.slug}`}
          >
            <div className="pj-top">
              <span className="pj-title">{p.title}</span>
              {(p.stars ?? 0) >= 20 && <span className="star-tag">most-starred</span>}
              <span className="pj-arrow">→</span>
              <span className="pj-meta">
                {p.category} · {p.year}
              </span>
            </div>
            <p>{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
