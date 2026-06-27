"use client";

import { motion, useReducedMotion } from "framer-motion";

// ───────────────────────────────────────────────────────────────────────────
// Animated, themeable inline visuals for the Fair Image Generation case study.
// Each renders crisp SVG (no screenshots) and animates once on scroll-in.
// All motion is gated on prefers-reduced-motion.
// ───────────────────────────────────────────────────────────────────────────

const mono = { fontFamily: "var(--mono)" } as const;
const serif = { fontFamily: "var(--serif)" } as const;

type Props = { kind: "bias" | "architecture" | "causal" | "results" | "growth" | "scatter" };

export default function CaseStudyVisual({ kind }: Props) {
  if (kind === "bias") return <BiasChart />;
  if (kind === "architecture") return <Architecture />;
  if (kind === "causal") return <CausalDiagram />;
  if (kind === "results") return <ResultsChart />;
  if (kind === "growth") return <GrowthChart />;
  if (kind === "scatter") return <ScatterChart />;
  return null;
}

// ── shared helpers ──────────────────────────────────────────────────────────
function useMo() {
  return useReducedMotion();
}

// ── 1. The injected bias ────────────────────────────────────────────────────
function BiasChart() {
  const reduce = useMo();
  // Training set after injecting the bias. Two majority groups stay full,
  // the two minority groups are downsampled to 10%.
  const bars = [
    { label: "Women,\nnot smiling", h: 18, minority: true },
    { label: "Women,\nsmiling", h: 100, minority: false },
    { label: "Men,\nnot smiling", h: 100, minority: false },
    { label: "Men,\nsmiling", h: 18, minority: true },
  ];
  const W = 760, H = 320, base = 250, top = 60, maxH = base - top;
  const slot = 150, x0 = 110, bw = 78;

  return (
    <figure className="cs-figure breakout">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-svg" role="img"
        aria-label="Bar chart of the training set after injecting the bias: smiling men and non-smiling women downsampled to about a tenth.">
        <text x={x0} y={34} style={{ ...mono, fontSize: 13, letterSpacing: 0.4 }} fill="var(--faint)">
          TRAINING SET AFTER INJECTING THE BIAS
        </text>
        {/* baseline */}
        <line x1={x0 - 14} y1={base} x2={W - 30} y2={base} stroke="var(--rule-2)" strokeWidth={1} />
        {bars.map((b, i) => {
          const x = x0 + i * slot;
          const h = (b.h / 100) * maxH;
          const fill = b.minority ? "var(--accent)" : "var(--rule-2)";
          return (
            <g key={i}>
              <motion.rect
                x={x} width={bw} rx={5}
                initial={reduce ? { y: base - h, height: h } : { y: base, height: 0 }}
                whileInView={{ y: base - h, height: h }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
                fill={fill}
              />
              {b.label.split("\n").map((ln, j) => (
                <text key={j} x={x + bw / 2} y={base + 22 + j * 15} textAnchor="middle"
                  style={{ ...mono, fontSize: 12 }} fill="var(--dim)">{ln}</text>
              ))}
              {b.minority && (
                <text x={x + bw / 2} y={base - h - 10} textAnchor="middle"
                  style={{ ...mono, fontSize: 12 }} fill="var(--accent)">~10%</text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="cs-cap">
        The bias by construction: the two minority groups are cut to roughly a tenth, so a lazy classifier can read gender and guess the label.
      </figcaption>
    </figure>
  );
}

// ── 2. Architecture flow ────────────────────────────────────────────────────
function Architecture() {
  const reduce = useMo();
  const W = 760, H = 250;
  const boxes = [
    { x: 20, label: "Face", sub: "x", kind: "io" },
    { x: 168, label: "ResNet18", sub: "encoder E", kind: "net" },
    { x: 322, label: "ε  100-d", sub: "latent code", kind: "lat" },
    { x: 462, label: "Linear SCM", sub: "causal bottleneck", kind: "scm" },
    { x: 612, label: "SA-GAN", sub: "generator G", kind: "net" },
  ];
  const bw = 120, bh = 64, by = 70;
  const color = (k: string) =>
    k === "scm" ? "var(--accent)" : k === "lat" ? "var(--rule-2)" : "var(--rule-2)";
  return (
    <figure className="cs-figure breakout">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-svg" role="img"
        aria-label="Pipeline: a face is encoded by ResNet18 into a latent code, reshaped by a linear structural causal model, and decoded by a Self-Attention GAN back into a face.">
        <defs>
          <marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6 z" fill="var(--accent)" />
          </marker>
        </defs>
        {boxes.map((b, i) => (
          <motion.g key={i}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.45, delay: i * 0.12 }}>
            <rect x={b.x} y={by} width={bw} height={bh} rx={12}
              fill={b.kind === "scm" ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--surface)"}
              stroke={color(b.kind)} strokeWidth={b.kind === "scm" ? 1.6 : 1} />
            <text x={b.x + bw / 2} y={by + 27} textAnchor="middle" style={{ ...serif, fontSize: 17 }}
              fill="var(--text)">{b.label}</text>
            <text x={b.x + bw / 2} y={by + 46} textAnchor="middle" style={{ ...mono, fontSize: 11 }}
              fill="var(--dim)">{b.sub}</text>
          </motion.g>
        ))}
        {boxes.slice(0, -1).map((b, i) => {
          const x1 = b.x + bw, x2 = boxes[i + 1].x;
          return (
            <motion.line key={i} x1={x1 + 2} y1={by + bh / 2} x2={x2 - 4} y2={by + bh / 2}
              stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#ah)"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }} />
          );
        })}
        <text x={W / 2} y={185} textAnchor="middle" style={{ ...mono, fontSize: 12 }} fill="var(--faint)">
          trained end to end as a bidirectional GAN:  L = L_gen + λ · L_sup
        </text>
        <text x={462 + bw / 2} y={by - 12} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill="var(--accent)">
          attributes get a causal graph here
        </text>
      </svg>
      <figcaption className="cs-cap">
        Encode a face into a latent code, reshape the attribute dimensions through a causal model, then decode. Because the GAN is bidirectional, real images can also be pushed backwards into the same latent space.
      </figcaption>
    </figure>
  );
}

// ── 3. Causal diagram ───────────────────────────────────────────────────────
function CausalDiagram() {
  const reduce = useMo();
  const W = 760, H = 300;
  const nodes: Record<string, { x: number; y: number; hub?: boolean }> = {
    Smile: { x: 150, y: 90, hub: true },
    Gender: { x: 150, y: 215, hub: true },
    "Cheekbone": { x: 470, y: 45 },
    "Mouth open": { x: 520, y: 120 },
    "Chubby": { x: 520, y: 190 },
    "Narrow eyes": { x: 470, y: 258 },
  };
  // edges: [from, to, strength]  strong=accent solid, weak=faint dashed
  const edges: [string, string, "strong" | "mid" | "weak"][] = [
    ["Smile", "Mouth open", "strong"],
    ["Smile", "Cheekbone", "mid"],
    ["Smile", "Chubby", "mid"],
    ["Smile", "Narrow eyes", "mid"],
    ["Gender", "Narrow eyes", "weak"],
  ];
  const rw = 116, rh = 38;
  const cx = (n: string) => nodes[n].x;
  const cy = (n: string) => nodes[n].y;
  return (
    <figure className="cs-figure breakout">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-svg" role="img"
        aria-label="Causal graph: smiling points to mouth-open (strong), cheekbone, chubbiness and narrow eyes; gender points weakly to narrow eyes.">
        <defs>
          <marker id="ah2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6 z" fill="var(--accent)" />
          </marker>
          <marker id="ah2w" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6 z" fill="var(--faint)" />
          </marker>
        </defs>
        {edges.map(([f, t, s], i) => {
          const x1 = cx(f) + rw / 2, y1 = cy(f);
          const x2 = cx(t) - rw / 2, y2 = cy(t);
          const weak = s === "weak";
          return (
            <motion.path key={i}
              d={`M ${x1} ${y1} C ${x1 + 70} ${y1}, ${x2 - 70} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={weak ? "var(--faint)" : "var(--accent)"}
              strokeWidth={s === "strong" ? 2.4 : s === "mid" ? 1.4 : 1}
              strokeDasharray={weak ? "4 4" : undefined}
              markerEnd={weak ? "url(#ah2w)" : "url(#ah2)"}
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: weak ? 0.7 : 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.12 }} />
          );
        })}
        {Object.entries(nodes).map(([name, n], i) => (
          <motion.g key={name}
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "fill-box" }}>
            <rect x={n.x - rw / 2} y={n.y - rh / 2} width={rw} height={rh} rx={rh / 2}
              fill={n.hub ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "var(--surface)"}
              stroke={n.hub ? "var(--accent)" : "var(--rule-2)"} strokeWidth={n.hub ? 1.6 : 1} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" style={{ ...mono, fontSize: 12.5 }}
              fill={n.hub ? "var(--text)" : "var(--body)"}>{name}</text>
          </motion.g>
        ))}
        <text x={300} y={150} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill="var(--accent)">strong</text>
        <text x={300} y={243} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill="var(--faint)">≈ 0</text>
      </svg>
      <figcaption className="cs-cap">
        The graph the model learned. Smiling drives mouth-open most strongly; the gender-to-narrow-eyes edge collapsed toward zero, which is roughly how real faces behave. A causal intervention on smiling propagates along these edges, so a generated smile also opens the mouth.
      </figcaption>
    </figure>
  );
}

// ── 4. Results: delta-bias, lower is better ─────────────────────────────────
function ResultsChart() {
  const reduce = useMo();
  const W = 760, H = 330, base = 250, top = 96, maxH = base - top;
  const maxVal = 40;
  const bars = [
    { label: "Baseline", v: 25.1, kind: "bad" },
    { label: "Reweight loss", v: 32.9, kind: "worse" },
    { label: "Causal generation", v: 8.4, kind: "good" },
  ];
  const slot = 210, x0 = 130, bw = 120;
  const fill = (k: string) => (k === "good" ? "var(--accent)" : "var(--rule-2)");
  return (
    <figure className="cs-figure breakout">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-svg" role="img"
        aria-label="Delta-bias on the smiling task by method. Baseline 25.1, reweighting 32.9 (worse), causal generation 8.4 (best). Lower is better.">
        <text x={x0 - 4} y={36} style={{ ...mono, fontSize: 13, letterSpacing: 0.4 }} fill="var(--faint)">
          δ-BIAS ON SMILING
        </text>
        <text x={x0 - 4} y={54} style={{ ...mono, fontSize: 12 }} fill="var(--dim)">
          gap in accuracy between genders · lower is better
        </text>
        <line x1={x0 - 16} y1={base} x2={W - 30} y2={base} stroke="var(--rule-2)" strokeWidth={1} />
        {bars.map((b, i) => {
          const x = x0 + i * slot;
          const h = (b.v / maxVal) * maxH;
          return (
            <g key={i}>
              <motion.rect x={x} width={bw} rx={6}
                initial={reduce ? { y: base - h, height: h } : { y: base, height: 0 }}
                whileInView={{ y: base - h, height: h }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.75, delay: i * 0.14, ease: [0.2, 0.7, 0.2, 1] }}
                fill={fill(b.kind)} />
              <motion.text x={x + bw / 2} textAnchor="middle" style={{ ...serif, fontSize: 22 }}
                fill={b.kind === "good" ? "var(--accent)" : "var(--text)"}
                initial={reduce ? { opacity: 1, y: base - h - 12 } : { opacity: 0, y: base - h + 6 }}
                whileInView={{ opacity: 1, y: base - h - 12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.14 }}>{b.v}</motion.text>
              <text x={x + bw / 2} y={base + 24} textAnchor="middle" style={{ ...mono, fontSize: 12.5 }}
                fill="var(--dim)">{b.label}</text>
            </g>
          );
        })}
        <text x={x0 + 2 * slot + bw / 2} y={base + 42} textAnchor="middle" style={{ ...mono, fontSize: 11 }}
          fill="var(--accent)">accuracy on smiling men: 73% → 84%</text>
      </svg>
      <figcaption className="cs-cap">
        Reweighting the loss over-corrected and made the smiling gap worse. Training on causally generated faces cut it from about 25 to 8, and the not-smiling gap fell from 25 to under 5.
      </figcaption>
    </figure>
  );
}

// ── 5. Collaboration growth over time ───────────────────────────────────────
function GrowthChart() {
  const reduce = useMo();
  const W = 760, H = 320, base = 250, top = 92, maxH = base - top;
  const maxVal = 62;
  const bars = [
    { label: "2001-05", v: 13 },
    { label: "2006-10", v: 30 },
    { label: "2011-15", v: 43 },
    { label: "2016-20", v: 56 },
  ];
  const x0 = 96, slot = 164, bw = 104;
  return (
    <figure className="cs-figure breakout">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-svg" role="img"
        aria-label="Average collaborations per faculty member by five-year window: 13, 30, 43, 56. Collaboration roughly quadrupled over two decades.">
        <text x={x0 - 6} y={36} style={{ ...mono, fontSize: 13, letterSpacing: 0.4 }} fill="var(--faint)">
          AVERAGE COLLABORATIONS PER FACULTY
        </text>
        <text x={x0 - 6} y={54} style={{ ...mono, fontSize: 12 }} fill="var(--dim)">
          mean degree, five-year windows
        </text>
        <line x1={x0 - 16} y1={base} x2={W - 30} y2={base} stroke="var(--rule-2)" strokeWidth={1} />
        {bars.map((b, i) => {
          const x = x0 + i * slot;
          const h = (b.v / maxVal) * maxH;
          const pct = 40 + i * 20; // progressively more accent
          return (
            <g key={i}>
              <motion.rect x={x} width={bw} rx={6}
                initial={reduce ? { y: base - h, height: h } : { y: base, height: 0 }}
                whileInView={{ y: base - h, height: h }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                fill={`color-mix(in srgb, var(--accent) ${pct}%, var(--rule-2))`} />
              <motion.text x={x + bw / 2} textAnchor="middle" style={{ ...serif, fontSize: 22 }}
                fill="var(--text)"
                initial={reduce ? { opacity: 1, y: base - h - 12 } : { opacity: 0, y: base - h + 4 }}
                whileInView={{ opacity: 1, y: base - h - 12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.12 }}>{b.v}</motion.text>
              <text x={x + bw / 2} y={base + 24} textAnchor="middle" style={{ ...mono, fontSize: 12 }}
                fill="var(--dim)">{b.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="cs-cap">
        The typical faculty member went from about 13 internal co-authors to 56 across two decades. Collaboration did not just grow, it compounded.
      </figcaption>
    </figure>
  );
}

// ── 6. Hub vs prestige scatter (r = 0.18) ───────────────────────────────────
function ScatterChart() {
  const reduce = useMo();
  const W = 760, H = 330, padL = 92, padR = 40, padT = 64, base = 256;
  const maxD = 22, maxP = 12;
  const X = (d: number) => padL + (d / maxD) * (W - padL - padR);
  const Y = (p: number) => base - (p / maxP) * (base - padT);
  const pts: [number, number][] = [
    [21, 3], [20, 2], [15, 5], [14, 9], [13, 4], [13, 7], [12, 10],
    [10, 5], [9, 1], [8, 3], [7, 11], [6, 2], [5, 6], [4, 3], [3, 8], [2, 1],
  ];
  return (
    <figure className="cs-figure breakout">
      <svg viewBox={`0 0 ${W} ${H}`} className="cs-svg" role="img"
        aria-label="Scatter of top-venue publications against collaboration degree. The cloud is essentially uncorrelated, with r equal to 0.18.">
        <text x={padL - 8} y={32} style={{ ...mono, fontSize: 13, letterSpacing: 0.4 }} fill="var(--faint)">
          HUB ≠ STAR
        </text>
        <text x={padL - 8} y={50} style={{ ...mono, fontSize: 12 }} fill="var(--dim)">
          top-venue papers vs collaboration degree
        </text>
        {/* axes */}
        <line x1={padL} y1={padT - 6} x2={padL} y2={base} stroke="var(--rule-2)" strokeWidth={1} />
        <line x1={padL} y1={base} x2={W - padR} y2={base} stroke="var(--rule-2)" strokeWidth={1} />
        {/* near-flat trend line: essentially no correlation */}
        <motion.line x1={X(2)} y1={Y(4.2)} x2={X(21)} y2={Y(5.6)}
          stroke="var(--accent)" strokeWidth={1.4} strokeDasharray="5 5"
          initial={reduce ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }} />
        {pts.map(([d, p], i) => (
          <motion.circle key={i} cx={X(d)} cy={Y(p)} r={6} fill="var(--accent)"
            initial={reduce ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            style={{ transformOrigin: `${X(d)}px ${Y(p)}px`, transformBox: "fill-box" }} />
        ))}
        <text x={W - padR} y={base + 22} textAnchor="end" style={{ ...mono, fontSize: 12 }} fill="var(--dim)">
          collaboration degree →
        </text>
        <text x={W - padR} y={Y(6.6)} textAnchor="end" style={{ ...mono, fontSize: 13 }} fill="var(--accent)">
          r = 0.18
        </text>
      </svg>
      <figcaption className="cs-cap">
        Being a hub in the collaboration network barely predicts publishing in top venues. The two are almost independent.
      </figcaption>
    </figure>
  );
}
