// ───────────────────────────────────────────────────────────────────────────
// Writing / notes. Each post becomes /writing/<slug>.
// `body` is Markdown (rendered with react-markdown + remark-gfm).
// To add a post: copy an entry, change the fields, write the body.
// ───────────────────────────────────────────────────────────────────────────

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
  readingTime: string;
  body: string;
  draft?: boolean;
};

export const posts: Post[] = [
  {
    slug: "rebuild-it-to-understand-it",
    title: "Rebuild it to understand it",
    date: "2025-03-12",
    summary:
      "Why I keep reimplementing things I could just import — and the specific kind of understanding it buys that reading never does.",
    tags: ["learning", "ml", "craft"],
    readingTime: "4 min",
    body: `There's a particular illusion that comes from reading a good paper: the feeling that you understand it. It's a real feeling and it's usually wrong.

I've learned to distrust it the hard way. I can read the Transformer paper and nod along at scaled dot-product attention. But the first time I tried to *write* multi-head attention from scratch, I spent an afternoon lost in reshape and transpose calls — \`(batch, heads, seq, d_k)\` and back — and discovered that my "understanding" had been about three layers shallower than I thought.

## The two kinds of knowing

Reading gives you **recognition**: you can follow someone else's derivation, spot the idea when you see it again, talk about it convincingly at a whiteboard. Building gives you **generation**: you can produce the thing yourself, from a blank file, and — more importantly — you know exactly where it breaks.

The gap between them is where most of the real learning lives. It's the sign error in the diffusion posterior. It's the off-by-one in the causal mask. It's realising the VAE trains calmly while the GAN collapses, and *feeling* why instead of reciting it.

## What it actually costs

Rebuilding is slow, and that's the point. You can't skim a sign error. The slowness forces a level of attention that reading actively lets you avoid.

A few rules I've settled on:

- **No reference implementation open in another tab.** Read the paper, close it, then build. If I get stuck, I get stuck honestly — and the stuck point is the thing I didn't understand.
- **Separate the pieces I think I understand from the ones I don't,** so I can poke at each in isolation.
- **Visualise the intermediate state.** Watching structure emerge from noise across diffusion timesteps taught me more than any loss curve.

## When *not* to do this

In production, I import the library. The point of rebuilding isn't to distrust abstractions — it's to have earned them, so that when something breaks at 2am I have a mental model of what's underneath. Reimplement to learn; import to ship. The two aren't in tension once you've done the first one.`,
  },
  {
    slug: "notebook-to-production",
    title: "The quiet work of getting a model out of the notebook",
    date: "2025-05-02",
    summary:
      "The model is maybe 20% of the job. A field guide to the other 80% — interpretability, reproducibility, and the tooling that makes the next engineer's life easier.",
    tags: ["mlops", "production", "ml"],
    readingTime: "5 min",
    body: `The demo always works. That's the trap.

A model that hits its metric in a notebook has cleared the most visible bar and the least important one. Everything that determines whether it survives contact with a real enterprise — the part I spend most of my time on at C3 — happens after the notebook closes.

## Three things I optimise for

**Models you can interpret.** A forecast a stakeholder can't interrogate is a forecast they won't trust, and an untrusted model doesn't get deployed no matter how good its numbers are. Wiring probabilistic forecasts to Integrated Gradients so the outputs were both uncertainty-aware *and* explainable did more for adoption than a point of accuracy ever would.

**Deployments you can reproduce.** "It worked on my machine" is where ML projects go to die. Reproducibility — pinned environments, deterministic pipelines, versioned data and models — is unglamorous and it's most of what separates a research artifact from a product.

**Tooling that makes the next person faster.** I once built an internal Python deployment toolchain that took deploys from hours to minutes. The accuracy of our models didn't change that week. The velocity of the whole team did, and that compounded.

## The shape of the work

If I had to draw the real distribution of effort on a production ML project:

| Phase | Where the time actually goes |
| --- | --- |
| Framing | Turning a vague business problem into a measurable one |
| Data | The longest, least-celebrated phase |
| Modelling | The part everyone pictures — and the smallest slice |
| Deployment | Reproducibility, latency, monitoring, rollback |
| Trust | Interpretability, stakeholder buy-in, the last mile |

The modelling slice is real and it matters. It's just not where projects succeed or fail.

## Why I still build from scratch

None of this contradicts the [reimplement-to-understand](/writing/rebuild-it-to-understand-it) habit. The opposite: knowing what's under the abstractions is exactly what lets me debug a production system instead of guessing at it. The from-scratch builds are how I earn the right to import the library and still know what it's doing.`,
  },
];

export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug && !p.draft);
}
