import Link from "next/link";
import { about, education, jobs, site, type CompanyGroup } from "@/lib/data";
import { featuredProjects, restProjects } from "@/content/projects";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import FooterYear from "@/components/FooterYear";

export default function Home() {
  return (
    <div className="shell">
      <Sidebar />

      <main>
        <Hero />

        {/* ABOUT */}
        <section id="about" className="first">
          <Reveal>
            <p className="kicker">
              <span className="num">01</span>About
            </p>
            <h2 className="h">{about.heading}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="prose">
              I&apos;m a senior data scientist at C3 AI. My path ran through
              Singapore and New York before the Bay Area: a BE in Computer
              Science from{" "}
              <a href="https://www.ntu.edu.sg" target="_blank" rel="noopener">
                NTU
              </a>
              , a stretch of internships from Shopee to Seagate, then an MS at{" "}
              <a href="https://www.cs.columbia.edu" target="_blank" rel="noopener">
                Columbia
              </a>{" "}
              with a focus in machine learning. The constant across all of it
              has been a stubborn kind of curiosity, the sort where I&apos;ll
              re-implement an idea from scratch just to find out how it actually
              works.
            </p>
            <p className="prose">
              These days that curiosity has a job. At C3 I sit with customers,
              translate a vague business problem into something a model can
              answer, and carry it all the way to production. That&apos;s mostly{" "}
              <span className="em">probabilistic time-series forecasting</span>,
              with some <span className="em">RAG-based LLM systems</span> along
              the way. I care about three things in particular: models you can
              interpret, deployments you can reproduce, and tooling that makes
              the next engineer&apos;s job easier.
            </p>
          </Reveal>
        </section>

        {/* WORK */}
        <section id="work">
          <Reveal>
            <p className="kicker">
              <span className="num">02</span>Work
            </p>
            <h2 className="h">What I&apos;ve worked on.</h2>
          </Reveal>

          <div className="timeline">
            {jobs.map((entry, i) => (
              <Reveal key={i} delay={i === 0 ? 0 : 0.04}>
                {(entry as CompanyGroup).kind === "group" ? (() => {
                  const g = entry as CompanyGroup;
                  return (
                    <div className={`job company-group${i === 0 ? " first current" : ""}`}>
                      <span className="job-dot" aria-hidden="true" />
                      <div className="job-when">{g.when}</div>
                      <div className="job-main">
                        <div className="company-header">
                          {g.orgUrl ? (
                            <a href={g.orgUrl} target="_blank" rel="noopener" className="company-name">{g.org}</a>
                          ) : (
                            <span className="company-name">{g.org}</span>
                          )}
                        </div>
                        <div className="company-roles">
                          {g.roles.map((role, ri) => (
                            <div key={ri} className="company-role">
                              <div className="role-header">
                                <span className="job-title">{role.title}</span>
                                <span className="role-when">{role.when}</span>
                              </div>
                              {role.bullets ? (
                                <ul className="role-bullets">
                                  {role.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                                </ul>
                              ) : Array.isArray(role.body)
                                ? role.body.map((p, pi) => <p key={pi} className={pi > 0 ? "mt-3" : ""}>{p}</p>)
                                : <p>{role.body}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })() : (() => {
                  const j = entry as { when: string; title: string; org: string; orgUrl?: string; body: string | string[] };
                  return (
                    <div className={`job${i === 0 ? " first current" : ""}`}>
                      <span className="job-dot" aria-hidden="true" />
                      <div className="job-when">{j.when}</div>
                      <div className="job-main">
                        <div className="job-title">
                          {j.title}{" "}
                          <span className="job-org">
                            ·{" "}
                            {j.orgUrl ? (
                              <a href={j.orgUrl} target="_blank" rel="noopener">{j.org}</a>
                            ) : (
                              j.org
                            )}
                          </span>
                        </div>
                        {Array.isArray(j.body)
                          ? j.body.map((p, pi) => <p key={pi} className={pi > 0 ? "mt-3" : ""}>{p}</p>)
                          : <p>{j.body}</p>}
                      </div>
                    </div>
                  );
                })()}
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <Reveal>
            <p className="kicker">
              <span className="num">03</span>Projects
            </p>
            <h2 className="h">
              Most of these began as &ldquo;I don&apos;t really get this, let me
              build it.&rdquo;
            </h2>
          </Reveal>

          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={0.02}>
              <Link className={`pj${i === 0 ? " first" : ""}`} href={`/projects/${p.slug}`}>
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
            </Reveal>
          ))}

          <Reveal delay={0.03}>
            <ul className="proj-compact">
              {restProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`}>
                    <span className="pc-title">{p.title}</span>
                    <span className="pc-meta">{p.category}</span>
                    <span className="pc-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.04}>
            <Link className="all" href="/projects">
              all projects, with case studies →
            </Link>
          </Reveal>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <Reveal>
            <p className="kicker">
              <span className="num">04</span>Education
            </p>
            <h2 className="h">Where the fundamentals came from.</h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div>
              {education.map((e, i) => (
                <div className={`edu-row${i === 0 ? " first" : ""}`} key={i}>
                  <div className="edu-when">{e.when}</div>
                  <div className="edu-what">
                    <span className="deg">{e.deg}</span>
                  </div>
                  <div className="edu-where">
                    <a href={e.url} target="_blank" rel="noopener">
                      {e.school}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="closing">
          <Reveal>
            <p className="kicker">
              <span className="num">05</span>Contact
            </p>
            <p>
              This page grows as I do, so it&apos;s never really finished. If
              something here resonates, my{" "}
              <a href={`mailto:${site.email}`}>inbox</a> is open.
            </p>
          </Reveal>
        </section>

        <footer>
          <div className="foot-links">
            <a href={site.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
          <p className="copy">
            © <FooterYear /> {site.handle}
          </p>
        </footer>
      </main>
    </div>
  );
}
