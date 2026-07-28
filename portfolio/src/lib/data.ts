// ───────────────────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the portfolio.
// ───────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Soham Dandapath",
  handle: "soham dandapath",
  role: "AI Engineer II at T:0 (Airwallex)",
  who: "AI engineer working where AI meets fintech. I take fuzzy problems and carry them all the way to systems that ship and hold up under real traffic.",
  now: "getting my bearings as an AI engineer at T:0, Airwallex's in-house startup, and still re-reading the diffusion papers.",
  email: "soham.dandapath@gmail.com",
  url: "https://sohamdandapath.com",
  github: "https://github.com/12dash",
  linkedin: "https://www.linkedin.com/in/sohamdandapath",
  resume: "https://github.com/12dash/12dash.github.io/releases/download/assets-v1/Soham_Dandapath_Resume.pdf",
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
    `I'm an AI engineer at {T:0}, a startup inside {Airwallex}. My path ran through Singapore and New York before the Bay Area: a BE in Computer Science from {NTU}, a stretch of internships from Shopee to Seagate, then an MS at {Columbia} with a focus in machine learning. The constant across all of it has been a stubborn kind of curiosity, the sort where I'll re-implement an idea from scratch just to find out how it actually works.`,
  ],
};

export type Role = {
  when: string;
  title: string;
  body?: string | string[];
  bullets?: string[];
};

export type Job = {
  kind?: "job";
  when: string;
  title: string;
  org: string;
  orgUrl?: string;
  body: string | string[];
};

export type CompanyGroup = {
  kind: "group";
  when: string;
  org: string;
  orgUrl?: string;
  roles: Role[];
};

export type TimelineEntry = Job | CompanyGroup;

export const jobs: TimelineEntry[] = [
  {
    when: "Jul 2026 – now",
    title: "AI Engineer II",
    org: "T:0 · Airwallex",
    orgUrl: "https://t0.ai",
    body: "AI engineer at T:0, a startup building within Airwallex. Building production systems at the intersection of AI and fintech, carrying problems from framing through to systems that ship and hold up under real traffic.",
  },
  {
    kind: "group",
    when: "Jan 2024 – Jun 2026",
    org: "C3 AI",
    orgUrl: "https://c3.ai",
    roles: [
      {
        when: "May 2026 – Jun 2026",
        title: "Senior Data Scientist",
        bullets: [
          "Customer-facing lead on our largest forecasting engagements, owning projects from problem definition to production",
          "Led demand forecasting for the server business unit at a leading semiconductor company",
          "Led yield forecasting at the world's largest berry producer, generating ~$5M in annual value",
          "Managed release for our forecasting packages and mentored data scientists across teams and projects",
        ],
      },
      {
        when: "Jan 2024 – Apr 2026",
        title: "Data Scientist",
        bullets: [
          "Led demand forecasting for the largest CPG company in Guatemala, generating $2.3M in annual impact",
          "Built a RAG-based LLM system for low-latency, policy-compliant document retrieval across C3 AI's internal documentation",
          "Built and owned DRIPP, an internal Python deployment toolchain that reduced deployments from hours to minutes",
          "Owned MetaML, the internal orchestration tool for time-series deployments",
          "Led release management for forecasting packages, enforcing coding and packaging standards across teams",
        ],
      },
    ],
  },
  {
    when: "2023",
    title: "Data Science Intern",
    org: "C3 AI",
    orgUrl: "https://c3.ai",
    body: "Shipped an out-of-the-box hierarchical forecasting and reconciliation system, using post-hoc MinT/ERM and intrinsic DeepVAR-Hierarchical approaches for cross-level coherence, and integrated probabilistic forecasts with Integrated Gradients explainability so the outputs were both uncertainty-aware and interpretable.",
  },
  {
    when: "2022",
    title: "Data Scientist",
    org: "Charles & Keith",
    orgUrl: "https://www.charleskeith.com",
    body: "Built a tree-based sales forecasting model for seasonal planning, a 95%+ accuracy image-similarity engine for product matching, and an order-management web app that improved accuracy while cutting manufacturing costs and stockouts.",
  },
  {
    when: "2020 - 21",
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
  { when: "2023 - 24", deg: "MS, Computer Science (Machine Learning)", school: "Columbia University", url: "https://www.cs.columbia.edu" },
  { when: "2017 - 21", deg: "BE, Computer Science", school: "Nanyang Technological University", url: "https://www.ntu.edu.sg" },
];

export const closing =
  "This page grows as I do, so it's never really finished. If something here resonates, my inbox is open.";
