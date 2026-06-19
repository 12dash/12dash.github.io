"use client";

import { motion, useReducedMotion } from "framer-motion";

// Runs on every navigation (App Router remounts template.tsx), giving a quiet
// cross-page fade. Opacity-only on purpose: a transform here would create a
// containing block and interfere with the sticky sidebar / fixed elements.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
