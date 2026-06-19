// ───────────────────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the portfolio.
// ───────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Soham Dandapath",
  handle: "soham dandapath",
  role: "Applied AI Engineer at C3 AI",
  who: "RAG-based LLM systems and time-series forecasting, taken from research to production.",
  now: "building RAG systems at C3 and re-reading the diffusion papers.",
  email: "soham.dandapath@gmail.com",
  url: "https://sohamdandapath.com",
  github: "https://github.com/12dash",
  linkedin: "https://www.linkedin.com/in/sohamdandapath",
  // Drop a PDF at public/Soham_Dandapath_Resume.pdf (or point this elsewhere).
  resume: "/Soham_Dandapath_Resume.pdf",
};

export const nav = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export const intro = {
  lead: "I build AI systems that make it out of the notebook and into production,",
  soft: "and I build things from scratch to understand how they really work.",
};

export const about = {
  heading: "Mostly, I want to know how things actually work.",
  paragraphs: [
    `I'm an applied AI engineer at C3 AI. My path ran through Singapore and New York before the Bay Area: a BE in Computer Science from {NTU}, a stretch of internships from Shopee to Seagate, then an MS at {Columbia} with a focus in machine learning. The constant across all of it has been a stubborn kind of curiosity — the sort where I'll re-implement an idea from scratch just to find out how it actually works.`,
    `These days that curiosity has a job. At C3 I take AI from a vague business problem all the way to something running in production, mostly {RAG-based LLM systems} and {probabilistic time-series forecasting}. I care about three things in particular: models you can interpret, deployments you can reproduce, and tooling that makes the next engineer's job easier.`,
  ],
};

export const stats = [
  { value: 0.8, suffix: "B", prefix: "~$", label: "annual business impact on an active forecasting program" },
  { value: 7.3, suffix: "M", prefix: "$", label: "combined annual value delivered across two customers" },
  { value: 60, suffix: "×", prefix: "", label: "faster deploys after building an internal Python toolchain" },
  { value: 5, suffix: "+", prefix: "", label: "from-scratch implementations of core ML architectures" },
];

export type Job = {
  when: string;
  title: string;
  org: string;
  orgUrl?: string;
  body: string;
};

export const jobs: Job[] = [
  {
    when: "2024 — now",
    title: "Applied AI Engineer",
    org: "C3 AI",
    orgUrl: "https://c3.ai",
    body: "I lead applied ML and LLM projects end to end for global enterprises. Right now I'm running a forecasting program for a major semiconductor customer — from technical discovery through production — with an estimated ~$0.8B in annual business impact. Along the way I've shipped a RAG-based document-retrieval system for low-latency, policy-compliant search; demand and yield forecasting apps worth $2.3M and ~$5M in annual value; and an internal Python deployment toolchain that cut deploys from hours to minutes. I also own release management for our forecasting packages and mentor data scientists across teams.",
  },
  {
    when: "2023",
    title: "Data Science Intern",
    org: "C3 AI",
    orgUrl: "https://c3.ai",
    body: "Shipped an out-of-the-box hierarchical forecasting and reconciliation system — post-hoc MinT/ERM and intrinsic DeepVAR-Hierarchical approaches for cross-level coherence — and integrated probabilistic forecasts with Integrated Gradients explainability, so the outputs were both uncertainty-aware and interpretable.",
  },
  {
    when: "2022",
    title: "Data Scientist",
    org: "Charles & Keith",
    orgUrl: "https://www.charleskeith.com",
    body: "Built a tree-based sales forecasting model for seasonal planning, a 95%+ accuracy image-similarity engine for product matching, and an order-management web app that improved accuracy while cutting manufacturing costs and stockouts.",
  },
  {
    when: "2020 — 21",
    title: "Earlier internships",
    org: "Shopee, Seagate, Outstrip, CogniAble",
    body: "A run of hands-on ML and data work: optimizing Airflow/HDFS pipelines and a compression tool that cut storage by 90%+ at Shopee; neural-net and tree models to forecast hard-drive test time at Seagate; a React and Rails KPI dashboard at Outstrip; and a two-stream I3D action-recognition model on AWS SageMaker for early autism screening at CogniAble.",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Modeling",
    items: ["PyTorch", "Transformers", "Diffusion", "Time-series / DeepVAR", "RAG & LLMs", "scikit-learn"],
  },
  {
    label: "Production & MLOps",
    items: ["Python", "Docker", "Airflow", "CI/CD", "Release management", "Model monitoring"],
  },
  {
    label: "Data & Infra",
    items: ["SQL", "Spark / HDFS", "AWS SageMaker", "Vector search", "Pandas", "NumPy"],
  },
  {
    label: "Craft",
    items: ["Interpretability", "Reproducibility", "Probabilistic forecasting", "Evaluation", "Technical writing", "Mentoring"],
  },
];

export const education = [
  { when: "2023 — 24", deg: "MS, Computer Science (Machine Learning)", school: "Columbia University", url: "https://www.cs.columbia.edu" },
  { when: "2017 — 21", deg: "BE, Computer Science", school: "Nanyang Technological University", url: "https://www.ntu.edu.sg" },
];

export const closing =
  "This page grows as I do, so it's never really finished. If something here resonates, my inbox is open.";
