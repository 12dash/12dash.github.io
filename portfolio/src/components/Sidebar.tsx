"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site, nav } from "@/lib/data";

export default function Sidebar() {
  const [active, setActive] = useState<string>("about");
  const reduce = useReducedMotion();

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = reduce
    ? {}
    : {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
      };

  return (
    <header className="side">
      <motion.div
        className="brand"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.h1 variants={item}>{site.handle}</motion.h1>
        <motion.p className="role" variants={item}>
          {site.role}
        </motion.p>
        <motion.p className="who" variants={item}>
          {site.who}
        </motion.p>
        <motion.p className="highlight" variants={item}>
          {site.highlight}
        </motion.p>
        <motion.p className="now" variants={item}>
          <span className="k">Now</span>
          {site.now}
        </motion.p>

        <motion.nav className="nav" aria-label="Sections" variants={item}>
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "active" : undefined}
              aria-current={active === n.id ? "true" : undefined}
            >
              <span className="ln" />
              {n.label}
            </a>
          ))}
        </motion.nav>
      </motion.div>

      <motion.div
        className="side-foot"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="row">
          <a href={site.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href={site.resume} target="_blank" rel="noopener">
            Résumé
          </a>
        </div>
        <p className="hi">
          or <a href={`mailto:${site.email}`}>say hi</a>.
        </p>
      </motion.div>
    </header>
  );
}
