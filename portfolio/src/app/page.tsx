import {
  about,
  education,
  jobs,
  projects,
  site,
  skills,
  stats,
} from "@/lib/data";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import FooterYear from "@/components/FooterYear";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Spotlight />

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
                I&apos;m an applied AI engineer at C3 AI. My path ran through
                Singapore and New York before the Bay Area: a BE in Computer
                Science from{" "}
                <a href="https://www.ntu.edu.sg" target="_blank" rel="noopener">
                  NTU
                </a>
                , a stretch of internships from Shopee to Seagate, then an MS at{" "}
                <a
                  href="https://www.cs.columbia.edu"
                  target="_blank"
                  rel="noopener"
                >
                  Columbia
                </a>{" "}
                with a focus in machine learning. The constant across all of it
                has been a stubborn kind of curiosity &mdash; the sort where
                I&apos;ll re-implement an idea from scratch just to find out how
                it actually works.
              </p>
              <p className="prose">
                These days that curiosity has a job. At C3 I take AI from a
                vague business problem all the way to something running in
                production, mostly{" "}
                <span className="em">RAG-based LLM systems</span> and{" "}
                <span className="em">probabilistic time-series forecasting</span>
                . I care about three things in particular: models you can
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

            <Reveal delay={0.04}>
              <div className="stats">
                {stats.map((s, i) => (
                  <div className="stat" key={i}>
                    <div className="num">
                      <Counter
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                      />
                    </div>
                    <div className="desc">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {jobs.map((j, i) => (
              <Reveal key={i} delay={i === 0 ? 0 : 0.03}>
                <div className={`job${i === 0 ? " first" : ""}`}>
                  <div className="job-when">{j.when}</div>
                  <div>
                    <div className="job-title">
                      {j.title}{" "}
                      <span className="job-org">
                        ·{" "}
                        {j.orgUrl ? (
                          <a href={j.orgUrl} target="_blank" rel="noopener">
                            {j.org}
                          </a>
                        ) : (
                          j.org
                        )}
                      </span>
                    </div>
                    <p>{j.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <Reveal>
              <p className="kicker">
                <span className="num">03</span>Projects
              </p>
              <h2 className="h">
                Most of these began as &ldquo;I don&apos;t really get this, let
                me build it.&rdquo;
              </h2>
            </Reveal>

            {projects.map((p, i) => (
              <Reveal key={i} delay={0.02}>
                <a
                  className={`pj${i === 0 ? " first" : ""}`}
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                >
                  <div className="pj-top">
                    <span className="pj-title">{p.title}</span>
                    {p.tag && <span className="star-tag">{p.tag}</span>}
                    <span className="pj-arrow">↗</span>
                    <span className="pj-meta">{p.meta}</span>
                  </div>
                  <p>{p.body}</p>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.04}>
              <a className="all" href={site.github} target="_blank" rel="noopener">
                more on GitHub ↗
              </a>
            </Reveal>
          </section>

          {/* STACK / SKILLS */}
          <section id="stack">
            <Reveal>
              <p className="kicker">
                <span className="num">04</span>Stack
              </p>
              <h2 className="h">The tools I reach for.</h2>
            </Reveal>

            <div className="stack">
              {skills.map((g, i) => (
                <Reveal key={i} delay={(i % 2) * 0.06}>
                  <div className="stack-card">
                    <h3>{g.label}</h3>
                    <div className="chips">
                      {g.items.map((item) => (
                        <span className="chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.05}>
              <div style={{ marginTop: 44 }}>
                <p className="kicker" style={{ marginBottom: 8 }}>
                  Education
                </p>
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

          {/* CONTACT / CLOSING */}
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
            <p className="quip">
              Made with Claude. Because if an AI engineer won&apos;t trust an AI
              to build his homepage, who will?
            </p>
            <p className="copy">
              © <FooterYear /> {site.handle} · still 100% human, allegedly
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
