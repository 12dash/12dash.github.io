// ───────────────────────────────────────────────────────────────────────────
// Project case studies. Each project becomes /projects/<slug>.
// Section `body` accepts Markdown (rendered with react-markdown + remark-gfm).
// ───────────────────────────────────────────────────────────────────────────

export type ProjectLink = { label: string; href: string };
export type Metric = { value: string; label: string };

export type Section = {
  heading: string;
  body: string;
  metrics?: Metric[];
  note?: string; // pulled-aside callout, optional
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  role: string;
  tagline: string; // one line, shown under the title
  summary: string; // 1–2 sentences for cards + list
  tech: string[];
  links: ProjectLink[];
  featured: boolean;
  stars?: number;
  // case-study body
  sections: Section[];
  takeaways: string[];
};

export const projects: Project[] = [
  {
    slug: "diffusion-model",
    title: "Diffusion Model",
    year: "2023",
    category: "Generative models",
    role: "Solo · learning build",
    tagline: "Building DDPM from the noise up, until the math stopped feeling like magic.",
    summary:
      "A from-scratch implementation and experimentation sandbox for denoising diffusion models in PyTorch — forward noising, the reverse denoiser, and the sampling loop, derived by hand.",
    tech: ["PyTorch", "U-Net", "DDPM", "NumPy", "Matplotlib"],
    links: [{ label: "Repository", href: "https://github.com/12dash/DiffusionModel" }],
    featured: true,
    stars: 1,
    sections: [
      {
        heading: "Why I built it",
        body: "Diffusion models had taken over generative imaging, and I could *use* them — but I couldn't have derived one on a whiteboard. That gap bothered me. Reading the DDPM paper a third time wasn't closing it, so I did the thing that always works for me: I rebuilt it from scratch, with no reference implementation open in another tab, and refused to move on until each piece earned its place.",
      },
      {
        heading: "What I actually built",
        body: "The project is a small, readable PyTorch codebase with three parts I implemented deliberately separately so I could poke at each in isolation:\n\n- **The forward process** — the closed-form noising schedule that lets you jump to any timestep `t` in one step, rather than looping. Getting the reparameterisation right is the whole trick.\n- **The reverse denoiser** — a compact U-Net that predicts the noise added at step `t`, conditioned on `t` via sinusoidal time embeddings.\n- **The sampling loop** — the iterative denoising that turns pure Gaussian noise into a sample, one small step at a time.\n\nI logged intermediate samples at fixed timesteps so I could *watch* structure emerge from noise across training, which turned out to be the most useful debugging tool I had.",
      },
      {
        heading: "What surprised me",
        body: "Two things. First, how much of the difficulty is *bookkeeping* — the variance schedules, the `sqrt(alpha_bar)` terms, keeping shapes and broadcasts honest. The conceptual leap is small; the place you actually lose hours is a sign error in the posterior. Second, how forgiving the objective is: predicting the noise (rather than the image) makes the loss a plain MSE, and that simplicity is most of why diffusion trains so stably compared to the GANs I'd fought with earlier.",
        note: "The moment it clicked: once you predict noise instead of pixels, the loss is just MSE — and the whole intimidating apparatus collapses into something you can train without adversarial drama.",
      },
      {
        heading: "What I'd do next",
        body: "Three concrete extensions I scoped but haven't shipped: a **DDIM** sampler for far fewer denoising steps at inference, **classifier-free guidance** for conditional generation, and a move to latent-space diffusion to make higher resolutions tractable on a single GPU. They're the natural next rungs, and each maps to a paper I now feel equipped to implement directly.",
      },
    ],
    takeaways: [
      "Re-deriving the reverse process by hand made the noise-prediction objective intuitive in a way no amount of reading did.",
      "Most of the engineering pain is in the variance-schedule bookkeeping, not the concepts.",
      "Visualising intermediate denoising steps was the single best debugging tool.",
    ],
  },
  {
    slug: "fair-image-generation",
    title: "Fair Image Generation of Minority Groups",
    year: "2023",
    category: "Causal ML · Generative models",
    role: "Course research project · Columbia",
    tagline: "Using a causal SCM inside a bidirectional GAN to synthesise under-represented groups and de-bias a classifier.",
    summary:
      "A research project asking whether a structural causal model in the latent space of a bidirectional GAN can disentangle protected attributes well enough to generate minority-group images that fix a biased training set.",
    tech: ["PyTorch", "BiGAN / DEAR", "Structural Causal Models", "CelebA", "Disentanglement"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/12dash/Minority-Attribute-Image-Generation-with-Causal-Dependence-for-Supervised-Tasks",
      },
      { label: "Report (Overleaf)", href: "https://www.overleaf.com/read/htydrnkcsqkz" },
    ],
    featured: true,
    sections: [
      {
        heading: "The question",
        body: "Image classifiers inherit the biases of their training data. On CelebA, a well-known correlation is that **women are far more likely to be smiling than men** — so a naive classifier learns to lean on gender as a shortcut for *smiling*. The research question I set out to test:\n\n> Can a structural causal model (SCM), used to disentangle a protected attribute in the latent space of a bidirectional generative model, generate new images of the under-represented group well enough to correct that bias downstream?",
      },
      {
        heading: "The approach",
        body: "I built on **DEAR** (weakly-supervised disentangled generative causal representation learning), which embeds an SCM over the latent variables of a bidirectional GAN so that latent factors map to semantically meaningful, causally-structured attributes. The pipeline:\n\n1. **Inject a known bias** into the CelebA training distribution (the smiling/gender correlation) so I had ground truth to measure against.\n2. **Learn a disentangled, causal latent representation** so I could intervene on one attribute while holding others fixed.\n3. **Generate counterfactual minority-group samples** — e.g. *smiling men* — by intervening in latent space rather than hunting for rare real examples.\n4. **Re-train the supervised classifier** on the augmented set and measure whether the gender shortcut weakened.",
        note: "The appeal of the causal framing is intervention: instead of resampling scarce real data, you can ask the generator a counterfactual — \"this person, but smiling\" — and hold everything else constant.",
      },
      {
        heading: "What I learned",
        body: "This was my deepest dive into the seam between **causal inference and deep generative modelling**, and it taught me how hard *honest* disentanglement is. Reading DEAR closely — then bending its assumptions to a fairness setting — was a different kind of work from my from-scratch reimplementations: here the contribution was the experimental design and the causal framing, not the architecture. It's also the project that most shaped how I think about evaluation: a generative model that produces pretty samples can still be useless if the latent factors aren't actually doing what you claim.",
      },
      {
        heading: "Honest limitations",
        body: "CelebA bias is a clean, almost toy setting; real-world protected attributes are messier and rarely binary. Disentanglement quality is also notoriously sensitive and hard to measure, so claims here should be read as *directional evidence* under a controlled bias, not a deployable de-biasing recipe. The full method, metrics, and figures are in the linked report.",
      },
    ],
    takeaways: [
      "Causal structure in the latent space turns data augmentation into intervention — you generate the counterfactual you need.",
      "The hard part of fairness work is honest measurement, not generation.",
      "Reading and extending a research method is a distinct skill from reimplementing a known one.",
    ],
  },
  {
    slug: "generative-models",
    title: "Generative Models, Side by Side",
    year: "2022",
    category: "Generative models",
    role: "Solo · learning build",
    tagline: "GANs, VAEs, and normalizing flows in one repo, so the trade-offs are felt, not read.",
    summary:
      "A single reference implementation of GANs, VAEs, and normalizing flows built side by side to compare how each family trades off sample quality, likelihoods, and training stability.",
    tech: ["PyTorch", "GAN", "VAE", "Normalizing Flows", "Jupyter"],
    links: [{ label: "Repository", href: "https://github.com/12dash/GenerativeModel" }],
    featured: false,
    stars: 3,
    sections: [
      {
        heading: "Why one repo, three models",
        body: "Most tutorials teach generative models in isolation, so you never develop a feel for *why you'd pick one over another*. I wanted them in the same place, trained on the same data, so the differences were tangible: the adversarial min-max game of a **GAN**, the variational lower bound of a **VAE**, and the exact, invertible likelihood of a **normalizing flow**.",
      },
      {
        heading: "What it shows",
        body: "Built side by side, the trade-offs stop being abstract:\n\n- **GANs** gave the sharpest samples but were the least stable to train — mode collapse and balancing the discriminator were constant companions.\n- **VAEs** trained calmly and gave a clean latent space, at the cost of blurrier samples from the Gaussian likelihood.\n- **Normalizing flows** were the only family giving *exact* likelihoods, paid for with architectural constraints (every layer must be invertible with a tractable Jacobian).\n\nIt became the reference I return to whenever I need to reason about a generative approach from first principles.",
      },
      {
        heading: "What I'd improve",
        body: "This is one of the repos I'd most like to bring up to portfolio standard: a proper README with sample grids for each model, a shared training harness instead of separate notebooks, and a short write-up of the likelihood-vs-quality trade-off with figures. The understanding is there; the presentation hasn't caught up to it yet.",
      },
    ],
    takeaways: [
      "Training all three on the same data makes the quality/likelihood/stability trade-offs intuitive.",
      "GAN sharpness vs. VAE stability vs. flow exactness is a decision I can now reason about from first principles.",
    ],
  },
  {
    slug: "vision-transformer",
    title: "Vision Transformer, from Scratch",
    year: "2022",
    category: "Computer vision",
    role: "Solo · learning build",
    tagline: "A clean ViT for image classification — and a front-row seat to how data-hungry attention really is.",
    summary:
      "A from-scratch Vision Transformer for image classification, built to understand patch embeddings, attention over image patches, and exactly how much data attention needs to beat a convolutional baseline.",
    tech: ["PyTorch", "Vision Transformer", "Self-attention", "Jupyter"],
    links: [{ label: "Repository", href: "https://github.com/12dash/VisualAttention-ViT" }],
    featured: false,
    stars: 1,
    sections: [
      {
        heading: "The idea",
        body: "After implementing the original Transformer for text, the obvious next question was: what changes when the tokens are image patches? The ViT recipe — split an image into patches, embed each as a token, add positional information, and run a standard Transformer encoder — is elegant, and building it cleared up exactly which pieces are vision-specific and which are inherited wholesale from NLP.",
      },
      {
        heading: "What stood out",
        body: "The most instructive part wasn't the architecture, it was the **data appetite**. A ViT has far weaker built-in inductive biases than a CNN — no locality, no translation-equivariance baked in — so it has to *learn* them from data. On small datasets a solid convolutional baseline wins comfortably; attention only overtakes once you give it enough examples (or strong augmentation / pre-training). Watching that crossover happen, rather than reading the claim in a paper, is what made the lesson stick.",
      },
    ],
    takeaways: [
      "ViTs trade CNN inductive biases for flexibility — and pay for it in data.",
      "Patch embedding + positional encoding is the only genuinely vision-specific part; the rest is the text Transformer.",
    ],
  },
  {
    slug: "transformer-from-scratch",
    title: "Transformer from Scratch",
    year: "2022",
    category: "NLP · Architectures",
    role: "Solo · learning build",
    tagline: "Attention, positional encodings, the whole machine — re-derived by hand so it stuck.",
    summary:
      "An implementation of the Transformer architecture from first principles, with experimentation on sequence tasks, built to internalise attention rather than recite it.",
    tech: ["PyTorch", "Self-attention", "Positional encoding", "Jupyter"],
    links: [{ label: "Repository", href: "https://github.com/12dash/TransformerAttention" }],
    featured: false,
    sections: [
      {
        heading: "Why rebuild a solved thing",
        body: "\"Attention Is All You Need\" is the most-read paper in modern ML, and I'd read it plenty. But there's a difference between recognising scaled dot-product attention and being able to write it — with the masking, the multi-head reshapes, and the positional encodings — without looking. So I rebuilt the whole machine and ran it on small sequence tasks.",
      },
      {
        heading: "What re-deriving it taught me",
        body: "The shapes are the curriculum. Multi-head attention is conceptually simple, but getting the reshape/transpose dance right — `(batch, heads, seq, d_k)` and back — is where understanding actually lives. Implementing causal masking by hand made *why* decoder-only models can't peek at the future obvious in a way the diagram never did. This build is the foundation everything else I do with LLMs sits on top of, including the RAG systems I now work on professionally.",
      },
    ],
    takeaways: [
      "You don't understand attention until you've debugged the multi-head reshapes yourself.",
      "Hand-implementing causal masking made autoregressive decoding intuitive.",
    ],
  },
  {
    slug: "coauthorship-network",
    title: "Co-Authorship Network",
    year: "2021",
    category: "Network science · Data",
    role: "Course project · NTU",
    tagline: "Mining DBLP to ask whether collaboration patterns explain a department's rising reputation.",
    summary:
      "A network-science study of academic collaboration built from real DBLP bibliographic data: graph construction, centrality, and community detection used to study how a department's research reputation grew over time.",
    tech: ["Python", "NetworkX", "Graph analysis", "DBLP", "Community detection"],
    links: [{ label: "Repository", href: "https://github.com/12dash/NetworkScience" }],
    featured: true,
    stars: 22,
    sections: [
      {
        heading: "The question",
        body: "For a network-science course at NTU, I built a co-authorship graph from DBLP — nodes are authors, an edge means they've ever collaborated — to ask:\n\n> Can network science help explain research collaboration among a department's faculty over time, and even account for its reputation growth?",
      },
      {
        heading: "What it involved",
        body: "The interesting work was upstream of the algorithms: turning messy, real bibliographic data into a clean graph — name disambiguation, time-slicing the collaborations, deciding what counts as an edge. With the graph built, I used centrality measures to find the connectors holding the network together and community detection to surface research clusters, then tracked how both evolved across years.",
      },
      {
        heading: "Why it's my most-starred repo",
        body: "It's quietly my most-starred project (22★) — partly because it's genuinely useful as a worked example of applied network analysis on real, messy data rather than a toy graph. It's also a reminder that the work people find valuable isn't always the flashiest model; it's often the clearly-explained, reproducible analysis of a real dataset.",
      },
    ],
    takeaways: [
      "The hard, valuable part of graph analysis is constructing an honest graph from messy real data.",
      "Centrality + community detection over time turned a static graph into a story about a department.",
      "My most-starred repo is an analysis, not a model — clarity and reproducibility get noticed.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const restProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
