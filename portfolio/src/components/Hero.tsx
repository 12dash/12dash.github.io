"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { intro } from "@/lib/data";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  const reduce = useReducedMotion();

  const leadWords = intro.lead.split(" ");
  const softWords = intro.soft.split(" ");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } },
  };
  const word: Variants | undefined = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: "0.5em" },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] },
        },
      };

  return (
    <div style={{ position: "relative" }}>
      <HeroCanvas />
      <motion.div
        className="intro"
        style={{ position: "relative", zIndex: 1 }}
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.span
          className="rule"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: 44 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
        />
        {leadWords.map((w, i) => (
          <motion.span
            key={`l-${i}`}
            variants={word}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {w}{" "}
          </motion.span>
        ))}
        {softWords.map((w, i) => (
          <motion.span
            key={`s-${i}`}
            className="soft"
            variants={word}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {w}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
