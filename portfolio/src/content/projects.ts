// ───────────────────────────────────────────────────────────────────────────
// Project case studies. Each project becomes /projects/<slug>.
// Section `body` accepts Markdown (rendered with react-markdown + remark-gfm).
// ───────────────────────────────────────────────────────────────────────────

export type ProjectLink = { label: string; href: string };
export type Metric = { value: string; label: string };
export type Figure = { src: string; alt: string; caption?: string; wide?: boolean };

export type Section = {
  heading: string;
  body: string;
  metrics?: Metric[];
  note?: string; // pulled-aside callout, optional
  image?: Figure; // embedded figure, optional
  visual?: "bias" | "causal" | "architecture" | "results" | "growth" | "scatter"; // animated inline visual, optional
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
      "A from-scratch implementation and experimentation sandbox for denoising diffusion models in PyTorch - forward noising, the reverse denoiser, and the sampling loop, derived by hand.",
    tech: ["PyTorch", "U-Net", "DDPM", "NumPy", "Matplotlib"],
    links: [{ label: "Repository", href: "https://github.com/12dash/DiffusionModel" }],
    featured: true,
    stars: 1,
    sections: [
      {
        heading: "Why I built it",
        body: "Diffusion models had taken over generative imaging, and I could *use* them - but I couldn't have derived one on a whiteboard. That gap bothered me. Reading the DDPM paper a third time wasn't closing it, so I did the thing that always works for me: I rebuilt it from scratch, with no reference implementation open in another tab, and refused to move on until each piece earned its place.",
      },
      {
        heading: "What I actually built",
        body: "The project is a small, readable PyTorch codebase with three parts I implemented deliberately separately so I could poke at each in isolation:\n\n- **The forward process** - the closed-form noising schedule that lets you jump to any timestep `t` in one step, rather than looping. Getting the reparameterisation right is the whole trick.\n- **The reverse denoiser** - a compact U-Net that predicts the noise added at step `t`, conditioned on `t` via sinusoidal time embeddings.\n- **The sampling loop** - the iterative denoising that turns pure Gaussian noise into a sample, one small step at a time.\n\nI logged intermediate samples at fixed timesteps so I could *watch* structure emerge from noise across training, which turned out to be the most useful debugging tool I had.",
      },
      {
        heading: "What surprised me",
        body: "Two things. First, how much of the difficulty is *bookkeeping* - the variance schedules, the `sqrt(alpha_bar)` terms, keeping shapes and broadcasts honest. The conceptual leap is small; the place you actually lose hours is a sign error in the posterior. Second, how forgiving the objective is: predicting the noise (rather than the image) makes the loss a plain MSE, and that simplicity is most of why diffusion trains so stably compared to the GANs I'd fought with earlier.",
        note: "The moment it clicked: once you predict noise instead of pixels, the loss is just MSE - and the whole intimidating apparatus collapses into something you can train without adversarial drama.",
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
    tech: ["PyTorch", "BiGAN / DEAR", "Structural Causal Models", "Self-Attention GAN", "CelebA", "ResNet18"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/12dash/Minority-Attribute-Image-Generation-with-Causal-Dependence-for-Supervised-Tasks",
      },
      { label: "Read the report (PDF)", href: "/projects/fair-image-generation/report.pdf" },
    ],
    featured: true,
    sections: [
      {
        heading: "The shortcut a classifier quietly learns",
        body: "Give a vision model a simple job, decide whether a face is smiling, and it will happily cheat. On CelebA, women smile far more often than men in the data, so the cheapest way to be right most of the time is to glance at gender and guess from there. The model never learns *smiling*. It learns a correlation, and it fails on exactly the people who break it: smiling men and unsmiling women.\n\nTo study this on purpose, I took the smiling-vs-not task and **injected a known bias** by downsampling the two minority groups, smiling men and non-smiling women, to a tenth of their original size. Now I had ground truth: I knew precisely which groups the model should struggle with, and by how much. The question I set out to test:\n\n> Can a structural causal model, sitting in the latent space of a generative model, let me *manufacture* the missing people, smiling men and unsmiling women, well enough to undo the bias downstream?",
        metrics: [
          { value: "202K", label: "CelebA faces, 40 labelled attributes" },
          { value: "10%", label: "minority groups downsampled to inject the bias" },
          { value: "5,000", label: "synthetic faces generated per minority group" },
          { value: "3x", label: "lower bias on smiling vs the naive baseline" },
        ],
        visual: "bias",
      },
      {
        heading: "Generate the counterfactual, do not go collect it",
        body: "The usual fixes are blunt. You can go gather more photos of smiling men, which is slow and expensive, or you can reweight the loss so rare groups count for more, which I tried as a baseline. I wanted something closer to the actual question a fair model should be able to answer: *this same person, but smiling*. That is a counterfactual, and counterfactuals are the natural language of causal models.\n\nThe catch is that you can only ask a counterfactual if the latent space is **disentangled and causal**: one knob for smiling, one for gender, and an honest account of how they push on everything else in the face.",
        note: "Instead of resampling scarce real data, you ask the generator a counterfactual and hold everything else constant. Augmentation stops being a trick and becomes an intervention.",
      },
      {
        heading: "The machine: an encoder, a causal bottleneck, a generator",
        body: "I built on **DEAR** (weakly-supervised disentangled generative causal representation learning) and assembled three parts in a row. A **ResNet18 encoder** maps a face to a 100-dimensional latent code. A **linear structural causal model** sits on the first few dimensions, the ones tied to real attributes, and reshapes them so they respect a causal graph. A **Self-Attention GAN generator** turns the code back into a face.\n\nThe whole thing trains as a bidirectional GAN, so I can also run real images *backwards* into the latent space, with an extra supervised term that pins latent factors to actual labelled attributes. The objective is just the adversarial loss plus that supervised term, `L = L_gen + lambda * L_sup`.",
        visual: "architecture",
      },
      {
        heading: "Why causal, and not merely disentangled",
        body: "The SCM encodes a causal graph over the attributes. In my setup, *smiling* points at cheekbone, mouth-open, chubbiness and narrow eyes, while *gender* points at narrow eyes. That structure is what separates two kinds of edit:\n\n- A **direct intervention** flips the smile bit and nothing else. You get a mouth that smiles on a face that forgot to open it. The sample looks wrong.\n- A **causal intervention** flips smile and *propagates* the change to its children through the graph, so a newly smiling face also opens its mouth and lifts its cheeks. The sample looks real.\n\nThe nice surprise: the graph weights it learned were sensible on their own. Smiling came out strongly linked to mouth-open, while gender-to-narrow-eyes settled near zero, which is roughly how faces actually work.",
        visual: "causal",
      },
      {
        heading: "Manufacturing the missing people",
        body: "To make a smiling man: sample noise, push it through the SCM, set the smile and gender bits to the values I want, invert the SCM so the rest of the face stays coherent, and decode. I generated **5,000 faces each** for the two minority groups, rebalanced the training set with them, and retrained the same ResNet18 classifier from scratch.\n\nThey are 64-pixel GAN faces, not portraits, but you can read the intervention clearly: the same identity rendered smiling and not, male and female, with the rest of the face moving along sensibly.",
        image: {
          src: "/projects/fair-image-generation/generated-faces.png",
          alt: "Grids of GAN-generated faces under causal interventions on smiling and gender, shown across four model variants.",
          caption: "Generated faces under causal interventions, across four model variants. The top row flips the smile attribute, the bottom row flips gender; each change propagates through the causal graph rather than editing pixels in isolation.",
          wide: true,
        },
      },
      {
        heading: "Did the shortcut break?",
        body: "I measured **delta-bias**: the gap in accuracy between groups that share a label but differ in gender. Lower is better; zero means the model treats the groups identically.\n\nThe results split cleanly. Reweighting the loss, the popular quick fix, actually made the smiling gap *worse*, over-correcting until it hurt. Training on the causally generated faces cut the smiling delta-bias from about 25 down to 8, pulled the not-smiling gap from 25 to under 5, and lifted accuracy on smiling men from 73% to 84%.",
        visual: "results",
        note: "The naive fix backfired and the causal one held. That contrast, more than any single number, is what the project is really about.",
      },
      {
        heading: "What I took away, and where it stops",
        body: "This was my deepest dive into the seam between causal inference and deep generative modelling, and it changed how I evaluate models: pretty samples mean nothing if the latent factors are not doing what you claim. Reading DEAR closely and then bending it to a fairness setting was a different muscle from my from-scratch rebuilds, here the contribution was the experimental design and the causal framing, not the architecture.\n\nThe honest limits matter too. CelebA bias is a clean, almost toy setting, and real protected attributes are messier and rarely binary. Disentanglement is famously hard to measure, so I read these numbers as directional evidence under a controlled bias, not a deployable de-biasing recipe. The full derivations, metrics and figures are in the report below.",
      },
    ],
    takeaways: [
      "Causal structure in the latent space turns data augmentation into intervention: you can generate the exact counterfactual you are missing.",
      "The popular quick fix, reweighting the loss, made the bias worse. The harder causal approach actually moved it.",
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
        body: "Built side by side, the trade-offs stop being abstract:\n\n- **GANs** gave the sharpest samples but were the least stable to train - mode collapse and balancing the discriminator were constant companions.\n- **VAEs** trained calmly and gave a clean latent space, at the cost of blurrier samples from the Gaussian likelihood.\n- **Normalizing flows** were the only family giving *exact* likelihoods, paid for with architectural constraints (every layer must be invertible with a tractable Jacobian).\n\nIt became the reference I return to whenever I need to reason about a generative approach from first principles.",
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
    tagline: "A clean ViT for image classification - and a front-row seat to how data-hungry attention really is.",
    summary:
      "A from-scratch Vision Transformer for image classification, built to understand patch embeddings, attention over image patches, and exactly how much data attention needs to beat a convolutional baseline.",
    tech: ["PyTorch", "Vision Transformer", "Self-attention", "Jupyter"],
    links: [{ label: "Repository", href: "https://github.com/12dash/VisualAttention-ViT" }],
    featured: false,
    stars: 1,
    sections: [
      {
        heading: "The idea",
        body: "After implementing the original Transformer for text, the obvious next question was: what changes when the tokens are image patches? The ViT recipe - split an image into patches, embed each as a token, add positional information, and run a standard Transformer encoder - is elegant, and building it cleared up exactly which pieces are vision-specific and which are inherited wholesale from NLP.",
      },
      {
        heading: "What stood out",
        body: "The most instructive part wasn't the architecture, it was the **data appetite**. A ViT has far weaker built-in inductive biases than a CNN - no locality, no translation-equivariance baked in - so it has to *learn* them from data. On small datasets a solid convolutional baseline wins comfortably; attention only overtakes once you give it enough examples (or strong augmentation / pre-training). Watching that crossover happen, rather than reading the claim in a paper, is what made the lesson stick.",
      },
    ],
    takeaways: [
      "ViTs trade CNN inductive biases for flexibility - and pay for it in data.",
      "Patch embedding + positional encoding is the only genuinely vision-specific part; the rest is the text Transformer.",
    ],
  },
  {
    slug: "transformer-from-scratch",
    title: "Transformer from Scratch",
    year: "2022",
    category: "NLP · Architectures",
    role: "Solo · learning build",
    tagline: "Attention, positional encodings, the whole machine - re-derived by hand so it stuck.",
    summary:
      "An implementation of the Transformer architecture from first principles, with experimentation on sequence tasks, built to internalise attention rather than recite it.",
    tech: ["PyTorch", "Self-attention", "Positional encoding", "Jupyter"],
    links: [{ label: "Repository", href: "https://github.com/12dash/TransformerAttention" }],
    featured: false,
    sections: [
      {
        heading: "Why rebuild a solved thing",
        body: "\"Attention Is All You Need\" is the most-read paper in modern ML, and I'd read it plenty. But there's a difference between recognising scaled dot-product attention and being able to write it - with the masking, the multi-head reshapes, and the positional encodings - without looking. So I rebuilt the whole machine and ran it on small sequence tasks.",
      },
      {
        heading: "What re-deriving it taught me",
        body: "The shapes are the curriculum. Multi-head attention is conceptually simple, but getting the reshape/transpose dance right - `(batch, heads, seq, d_k)` and back - is where understanding actually lives. Implementing causal masking by hand made *why* decoder-only models can't peek at the future obvious in a way the diagram never did. This build is the foundation everything else I do with LLMs sits on top of, including the RAG systems I now work on professionally.",
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
    role: "Team of 3 · NTU coursework",
    tagline: "Mining two decades of DBLP to ask whether collaboration patterns explain a department's rising reputation.",
    summary:
      "A network-science study of academic collaboration built from real DBLP bibliographic data: graph construction, centrality, and community detection used to study how a department's research reputation grew over time.",
    tech: ["Python", "NetworkX", "DBLP", "Selenium", "Dash", "Graph analysis"],
    links: [
      { label: "Repository", href: "https://github.com/12dash/NetworkScience" },
      { label: "Read the report (PDF)", href: "/projects/coauthorship-network/report.pdf" },
    ],
    featured: true,
    stars: 22,
    sections: [
      {
        heading: "The question",
        body: "For a network-science course at NTU, two teammates and I turned our own school's faculty into a graph. We pulled every professor's publication history from the DBLP bibliography, drew an edge between any two who had co-authored a paper, and then watched that web evolve year by year from 2000 to 2020. The question underneath it all:\n\n> Can network science explain how a department actually collaborates, and even say something about how its research reputation grew?",
        metrics: [
          { value: "92.9%", label: "of faculty sit in a single connected component" },
          { value: "13 → 56", label: "avg collaborators per faculty, 2001-05 vs 2016-20" },
          { value: "4,762", label: "external co-authors mined as candidate hires" },
          { value: "r = 0.18", label: "correlation between being a hub and publishing in top venues" },
        ],
      },
      {
        heading: "The real work was building an honest graph",
        body: "The algorithms were the easy part. The hard part sat upstream, in turning messy bibliographic data into a graph you can trust. We scraped each professor's DBLP page, parsed papers and co-authors into typed records, built the graph in NetworkX, and wrapped it in an interactive Dash explorer so we could scrub through any single year.\n\nThe thorniest problem was name disambiguation: two researchers can share a name, and one researcher can appear under three different spellings. There is no clean fix, so we bounded the error instead. We ran the whole pipeline twice, once keying on full names (which over-counts distinct authors) and once on first initials (which under-counts), giving an explicit upper and lower bound on every number we reported.",
        note: "Most of the credibility of a graph analysis is decided before any centrality is computed. If the nodes and edges are wrong, every downstream metric is confidently wrong too.",
      },
      {
        heading: "Collaboration kept compounding",
        body: "Averaged over five-year windows, the typical faculty member's number of co-authors inside the school climbed steadily from about 13 to 56. By 2020 the network had collapsed into a single giant component: almost 93% of faculty sit in one connected web, and the count of isolated names falls nearly linearly every year. It is also a small-world network, average path length grows like the log of the node count, so any two professors are only a few collaborators apart.",
        visual: "growth",
        image: {
          src: "/projects/coauthorship-network/cumulative-network.png",
          alt: "The cumulative co-authorship network as of 2020, with node size proportional to number of collaborators.",
          caption: "The cumulative network by 2020. Node size scales with collaboration count: a few large hubs anchor one giant connected component, with only a handful of isolated faculty drifting at the edge.",
          wide: true,
        },
      },
      {
        heading: "Hubs and bridges are not the same people",
        body: "Centrality told two different stories about who holds the network together. Degree and eigenvector centrality surface the **hubs**, the prolific collaborators like Miao Chunyan and Lee Bu Sung. But betweenness centrality surfaces **bridges**, and they are different people: one professor with fewer collaborators (Luo Jun) scored higher betweenness than a larger hub (Dusit Niyato), because more of the shortest paths between everyone else ran through him. A hub is well-connected; a bridge is structurally load-bearing. Remove a bridge and the graph can split in two; remove a hub and it usually stays whole.",
      },
      {
        heading: "Seniority is written into the wiring",
        body: "Color the network by academic rank and the hierarchy is visible in the geometry: full professors sit in the dense core, and the ranks fan outward to lecturers on the rim. Average degree tracks seniority almost monotonically, from 9.75 for professors down to 1.5 for lecturers. Most edges run *between* ranks rather than within them: junior faculty attach to senior hubs. That is preferential attachment, with time spent at the school as the pull. Faculty in management positions behave the same way, a right-shifted degree distribution and higher closeness centrality, classic hub behaviour.",
        image: {
          src: "/projects/coauthorship-network/rank-network.png",
          alt: "The faculty network colored by academic rank, with professors clustered in the dense centre.",
          caption: "The same network colored by rank: professors (purple) cluster in the dense core, associate (pink), assistant (blue), senior lecturers (green) and lecturers (yellow) spread concentrically outward.",
          wide: true,
        },
      },
      {
        heading: "Does collaboration predict prestige?",
        body: "The tempting hypothesis is that the hubs are the stars. We tested it directly. We defined excellence nodes as faculty with more than ten papers in top venues over a decade, and compared that set to the most central nodes. There is some overlap, but the hubs are mostly *not* the excellence nodes, and a scatter of top-venue publications against degree gives a correlation of just 0.18. Being central in the collaboration graph and being a top publisher turn out to be nearly independent axes. Structure is not the same thing as prestige.",
        visual: "scatter",
      },
      {
        heading: "Turning the graph into a hiring shortlist",
        body: "The course set an applied twist: if the school wanted to grow, who should it hire? We mined every external researcher who had co-authored with a faculty member since 2017, which left 4,762 candidates. Then we ranked them two ways, by number of excellence papers and by how strongly they already connect into the school, and surfaced the top 150 of each. Two lenses rather than one, so a strong candidate who looks good on only one metric is not quietly dropped.",
      },
      {
        heading: "What I took away, and where it stops",
        body: "This is still my most-starred repository, and I think that is because it is a worked example of network science on real, messy data rather than a toy graph. The honest caveats are mostly about the data. DBLP does not record when a professor joined the school, so we can only date a node from its first co-authorship, which biases the growth and small-world claims and means we cannot honestly call the network scale-free. Name disambiguation puts a band of uncertainty around every count. The value here was less any single algorithm than building a defensible graph and reading it carefully.",
      },
    ],
    takeaways: [
      "The hard, valuable part of graph analysis is constructing an honest graph from messy real data, not running the algorithms.",
      "Hubs and bridges are different roles: degree finds the well-connected, betweenness finds the load-bearing.",
      "Being central in the collaboration network barely predicts publishing in top venues (r = 0.18). Structure is not prestige.",
      "When you cannot eliminate data error, bound it: running the pipeline two ways gave honest upper and lower limits.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const restProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
