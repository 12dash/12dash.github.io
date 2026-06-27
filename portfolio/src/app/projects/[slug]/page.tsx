import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import CaseStudyVisual from "@/components/CaseStudyVisual";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary },
  };
}

export default function CaseStudy({ params }: Params) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const repo = p.links.find((l) => l.label === "Repository") ?? p.links[0];

  return (
    <div className="page">
      <div className="page-top">
        <Link className="back" href="/projects">
          ← all projects
        </Link>
      </div>

      <article>
        <header className="page-head">
          <p className="kicker">
            {p.category} · {p.year}
          </p>
          <h1>{p.title}</h1>
          <p className="lede">{p.tagline}</p>
        </header>

        <div className="cs-meta">
          <span className="mono">{p.role}</span>
          {p.stars != null && <span className="mono">★ {p.stars}</span>}
        </div>

        <div className="tech-row">
          {p.tech.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="cs-links">
          {p.links.map((l) => (
            <a className="cs-link" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <span className="arr">↗</span>
            </a>
          ))}
        </div>

        {p.sections.map((s, i) => (
          <section className="cs-section" key={i}>
            <Reveal>
              <h2 className="h">{s.heading}</h2>
              <Markdown>{s.body}</Markdown>
            </Reveal>
            {s.metrics && (
              <Reveal delay={0.05}>
                <div className="metric-grid">
                  {s.metrics.map((m, j) => (
                    <div className="metric" key={j}>
                      <div className="mv">{m.value}</div>
                      <div className="ml">{m.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            {s.visual && <CaseStudyVisual kind={s.visual} />}
            {s.image && (
              <figure className={`cs-figure${s.image.wide ? " breakout" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image.src} alt={s.image.alt} loading="lazy" />
                {s.image.caption && <figcaption className="cs-cap">{s.image.caption}</figcaption>}
              </figure>
            )}
            {s.note && (
              <Reveal delay={0.05}>
                <div className="note">{s.note}</div>
              </Reveal>
            )}
          </section>
        ))}

        <div className="cs-section">
          <Reveal>
            <div className="takeaways">
              <h3>What I took away</h3>
              <ul>
                {p.takeaways.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="article-foot">
          <Link className="back" href="/projects">
            ← all projects
          </Link>
          {repo && (
            <a className="back" href={repo.href} target="_blank" rel="noopener noreferrer">
              view the code ↗
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
