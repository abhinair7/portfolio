// Single source of truth for the portfolio. Drives both the rendered page
// and the role-adaptive AI engine, so the two can never drift apart.

export const profile = {
  name: "Abhishek Vinod Nair",
  shortName: "Abhishek Nair",
  discipline: "Forward Deployed Engineer",
  role: "Digital Transformation Specialist",
  company: "Iwaki America",
  location: "Boston, Massachusetts",
  since: "Jun 2026",
  experience: "4+ years",
  focusShort: "AI Systems · Data Eng · Supply Chain",
  tagline:
    "AI systems engineer with 4+ years shipping production software. At Iwaki America: a 16-stage planning engine over 4M+ ERP records, a Claude agent that narrates but never calculates, and on-premise LLMs where no data leaves the network.",
  focus: ["AI Systems", "Data Engineering", "Supply Chain"],
  status: "Open to new roles",
  email: "a.nair002@umb.edu",
  phone: "+1 (857) 339-9122",
  linkedin: "https://www.linkedin.com/in/abhishek-nair-b64469196/",
  github: "https://github.com/abhinair7",
} as const;

export const heroStats = [
  { value: 4, suffix: "+ yrs", label: "Shipping Production Systems" },
  { value: 4, suffix: "M+", label: "ERP Transactions Planned" },
  { value: 1777, suffix: "", label: "Automated Tests Written" },
] as const;

export const marquee = [
  "Python", "Agentic AI", "Claude", "Model Context Protocol", "Large Language Models",
  "RAG", "AI Agents", "Ollama", "Microsoft SQL Server", "Data Engineering", "ETL", "FastAPI", "pandas",
  "Parquet", "Prompt Design", "Forecasting", "Power BI",
  "T-SQL", "pytest", "MRP",
] as const;

// The career as four cinematic acts — the narrative spine of the page.
export interface JourneyAct {
  id: string;
  chapter: string;
  years: string;
  title: string;
  role: string;
  line: string;
  icons: string[]; // simple-icons slugs (e.g. "siAngular")
  media: { type: "video" | "image"; src: string; poster?: string };
}

export const journey: JourneyAct[] = [
  {
    id: "frontend",
    chapter: "Chapter I",
    years: "2022",
    title: "Frontend",
    role: "Frontend Developer · Reliance Jio",
    line: "I started at the surface — building responsive Angular interfaces and learning how software actually meets the people who use it.",
    icons: ["siAngular", "siTypescript", "siJavascript", "siHtml5", "siCss3"],
    media: { type: "video", src: "/act-frontend.mp4", poster: "/act-frontend-poster.jpg" },
  },
  {
    id: "fullstack",
    chapter: "Chapter II",
    years: "2022 — 2024",
    title: "Full-stack",
    role: "Digital Specialist Engineer · Infosys",
    line: "Then I went end-to-end — enterprise applications in Java, tuned SQL, and CI/CD pipelines, shipping to real users at scale.",
    icons: ["siJenkins", "siOracle", "siMysql", "siJavascript", "siGit"],
    media: { type: "video", src: "/act-fullstack.mp4", poster: "/act-fullstack-poster.jpg" },
  },
  {
    id: "analytics",
    chapter: "Chapter III",
    years: "2024 — 2026",
    title: "Business Analytics",
    role: "MS Business Analytics · UMass Boston",
    line: "I crossed an ocean to change the question — from how to build the software to what the data should decide.",
    icons: ["siPython", "siPandas", "siNumpy", "siTableau", "siPostgresql"],
    media: { type: "video", src: "/act-analytics.mp4", poster: "/act-analytics-poster.jpg" },
  },
  {
    id: "ai",
    chapter: "Chapter IV",
    years: "2026 — Now",
    title: "AI Engineering",
    role: "Digital Transformation Specialist · Iwaki America",
    line: "Now I bring AI to that question — a 16-stage planning engine, a Claude agent that narrates but never calculates, and on-premise LLMs that turn ERP data into decisions teams trust.",
    icons: ["siPython", "siPytorch", "siOpenai", "siFastapi", "siOllama"],
    media: { type: "image", src: "/photo.jpg" },
  },
];

export interface Skill {
  code: string;
  title: string;
  description: string;
}

export const skills: Skill[] = [
  {
    code: "01",
    title: "AI & LLM Systems",
    description:
      "On-premise LLMs (Ollama, quantized 14B), RAG pipelines, Model Context Protocol, agentic assistants on Claude with MCP tool calling, an LLM-narrates-never-calculates guardrail, prompt design, deterministic evidence chains over model guesswork, Claude & OpenAI APIs.",
  },
  {
    code: "02",
    title: "Data & ETL Engineering",
    description:
      "Python, pandas, NumPy, Microsoft SQL Server, T-SQL, Parquet/PyArrow, 16-endpoint ERP integration, MCP connector auditing, cursor pagination, parallelized bulk extraction, durable systems of record.",
  },
  {
    code: "03",
    title: "Planning & Supply Chain",
    description:
      "MRP, multi-level BOM explosion, statistical safety stock, service-level targeting, time-phased buy/expedite/release, ABC treatment, demand forecasting, price calibration & margin modeling.",
  },
  {
    code: "04",
    title: "Production Engineering",
    description:
      "pytest (1,777 automated tests), adversarial review, FastAPI, Windows Server & Caddy, scheduled unattended runs, run locks & watchdogs, React, Three.js, Power BI.",
  },
];

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  logo: string;
  start: string;
  end: string;
  location: string;
  type: string;
  bullets: string[];
  impacts: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "iwaki",
    role: "Digital Transformation Specialist",
    company: "Iwaki America",
    logo: "/logo-iwaki-mark.png",
    start: "Jun 2026",
    end: "Present",
    location: "Boston, MA",
    type: "Full-time",
    bullets: [
      "Designed and deployed a 16-stage Python MRP and inventory planning engine processing 4M+ ERP transaction records and 15 years of demand history across ~5,600 SKUs, replacing a legacy Visual Basic process. Unnecessary planned purchase commitment fell by double digits while measured service level rose.",
      "Built an agentic planning assistant on Claude with MCP tool calling over the live ERP: a deterministic pipeline where the LLM narrates and never calculates, so every figure traces to ERP output and none is invented. Now in validation with three planners ahead of IT security review.",
      "Diagnosed 13 execution defects and 7 methodology gaps in the legacy planning logic and quantified the master-data debt behind them (about 60% of open purchase orders past due, 61% of plan items with no reorder point). The evidence won directors' backing for the modernization roadmap and secured ERP source access, a test instance and read-only SQL.",
      "Audited all nine endpoints of the ERP's MCP connector, ranked the gaps, fixed an undocumented ~96-row response cutoff with cursor pagination, and turned an unwired call-log endpoint into a spares-demand signal.",
      "Deployed a fully on-premise LLM assistant (Ollama, quantized 14B) that answers purchasing questions from a deterministic evidence chain with no data leaving the network. Latency fell from 243s to 30–150ms (over 1,600x faster) with zero per-query API cost.",
      "Built the evidence-based price calibration engine behind the 2026 price-increase cycle on a reconstructed 16-year pricing history; two product managers validated the output. Also built a 16-endpoint ERP integration layer compressing the primary feed ~15x into Parquet + SQL Server.",
      "Built and shipped an MCP data layer over the company's self-hosted Trac ticket system, with inference kept strictly on-premise, plus a self-hosted web portal; the team received it well.",
    ],
    impacts: ["4M+ ERP Records", "~5,600 SKUs", "Double-Digit % Commitment Cut", "243s → 30–150ms", "1,777 Tests", "13 Defects + 7 Gaps Found"],
  },
  {
    id: "umass",
    role: "Graduate Assistant — MSIS",
    company: "UMass Boston",
    logo: "/logo-umass.png",
    start: "Jan 2026",
    end: "May 2026",
    location: "Boston, MA",
    type: "Part-time",
    bullets: [
      "Developed cyber-attack simulation artifacts aligned with the MITRE ATT&CK framework for 50+ graduate students.",
      "Designed and delivered 8+ hands-on labs on persistence mechanisms, exfiltration detection, and timeline reconstruction.",
      "Created mitigation-focused exercises emphasizing artifact extraction and anomaly response.",
    ],
    impacts: ["50+ Students", "+35% Proficiency", "-40% Recovery Time"],
  },
  {
    id: "cypress",
    role: "Business Analyst Intern",
    company: "Cypress Atlantic",
    logo: "/logo-cypress.png",
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Boston, MA",
    type: "Internship",
    bullets: [
      "Led end-to-end development of an AI-powered restaurant automation platform using Firebase for 20+ users.",
      "Built Power BI dashboards with time series analysis and seasonal patterns for sales/inventory forecasting.",
      "Implemented real-time Firestore/Cloud Functions synchronization, eliminating 90% of manual data coordination.",
    ],
    impacts: ["-25% Food Waste", "$15K+ Savings", "+40% Adoption"],
  },
  {
    id: "infosys",
    role: "Digital Specialist Engineer",
    company: "Infosys",
    logo: "/logo-infosys.png",
    start: "Jul 2022",
    end: "May 2024",
    location: "Chennai, India",
    type: "Full-time",
    bullets: [
      "Designed and delivered 3 major end-to-end enterprise applications using IBM RAD and Java/JSP/JavaScript.",
      "Optimized SQL queries and stored procedures with DBeaver, improving database performance by 40%.",
      "Led Jenkins CI/CD pipeline deployments, cutting deployment times by 50% with a 99% success rate.",
    ],
    impacts: ["3 Enterprise Apps", "+40% DB Perf", "99% Deploy Rate"],
  },
  {
    id: "jio",
    role: "Graduate Engineer Trainee",
    company: "Reliance Jio",
    logo: "/logo-jio.png",
    start: "Feb 2022",
    end: "Jul 2022",
    location: "Mumbai, India",
    type: "Full-time",
    bullets: [
      "Gathered business requirements for an Internal Auditing Website ensuring 100% compliance alignment.",
      "Developed responsive Angular web interfaces using HTML, CSS, and TypeScript, boosting engagement by 25%.",
      "Facilitated daily Scrum meetings for 10+ cross-functional team members, reducing deployment times by 4x.",
    ],
    impacts: ["+25% Engagement", "4x Faster Deploy", "100% Compliance"],
  },
];

export interface Project {
  id: string;
  slug: string;
  name: string;
  glyph: string;
  tags: string[];
  // 1-line story rule: problem -> audience -> trade-off
  problem: string;
  audience: string;
  tradeoff: string;
  summary: string;
  metrics: string[];
  proprietary: boolean;
  poster?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "agent",
    slug: "agentic-planning-assistant",
    name: "Agentic Planning Assistant",
    glyph: "AGT",
    tags: ["Claude", "MCP", "Python", "ERP"],
    problem: "Planners could not interrogate the plan in plain English without risking an LLM inventing numbers.",
    audience: "Purchasing planners at an industrial pump manufacturer.",
    tradeoff:
      "Kept the model out of the math entirely: a 16-node deterministic pipeline computes, the LLM only narrates. Less free-form than a chatbot, but every figure traces to ERP output.",
    summary:
      "A Claude agent with MCP tool calling over the live ERP. The deterministic pipeline does every calculation and the LLM narrates the result, so no figure is invented. In validation with three planners ahead of IT security review.",
    metrics: ["16-Node Pipeline", "LLM Narrates, Never Calculates", "3-Planner Validation"],
    proprietary: true,
  },
  {
    id: "tickets",
    slug: "ticket-mcp-layer",
    name: "Ticketing MCP Data Layer",
    glyph: "MCP",
    tags: ["MCP", "Python", "Trac", "On-Prem"],
    problem: "Support history sat in a self-hosted ticket system nobody could query in plain language.",
    audience: "Internal software and support teams.",
    tradeoff:
      "Kept inference strictly on-premise instead of calling a hosted model, trading some model capability for zero data leaving the network.",
    summary:
      "An MCP data layer over the company's self-hosted Trac ticket system, with all inference on-premise, shipped to the team alongside a self-hosted web portal and well received.",
    metrics: ["Shipped", "Well Received", "On-Prem Only"],
    proprietary: true,
  },
  {
    id: "mrp",
    slug: "mrp-engine",
    name: "Inventory Planning & MRP Engine",
    glyph: "MRP",
    tags: ["Python", "SQL Server", "Parquet"],
    problem: "Buyers planned ~5,600 SKUs off an unauditable legacy Visual Basic routine.",
    audience: "Purchasing & planning teams at an industrial pump manufacturer.",
    tradeoff:
      "Chose a fully traced 16-stage pipeline over a black-box rewrite so every buy is defensible — at the cost of more engineering up front.",
    summary:
      "A 16-stage pipeline reads 4M+ ERP transactions and 15 years of demand history, runs multi-level BOM explosion and statistical safety stock, and attaches a 6-step math trace to every recommendation so a buyer can defend the number.",
    metrics: ["13 Defects + 7 Gaps Found", "Double-Digit % Cut", "BOM 30min → 14s"],
    proprietary: true,
  },
  {
    id: "assistant",
    slug: "purchasing-assistant",
    name: "On-Premise Purchasing Assistant",
    glyph: "LLM",
    tags: ["Ollama", "RAG", "MCP", "FastAPI"],
    problem: "Buyers needed to ask 'why is this part being bought?' without data leaving the building.",
    audience: "Purchasing staff who distrust black-box AI answers.",
    tradeoff:
      "Grounded every answer in a deterministic evidence chain rather than free generation — trading fluency for traceability and zero data egress.",
    summary:
      "Answers 'why is this part being bought?' from a deterministic evidence chain rather than model guesswork, so every answer traces back to the pipeline that produced it. Runs fully on-network. Circuit breakers and per-intent deadlines took it from unusable to instant. A Claude agent with MCP tool calling sits on top: the LLM narrates and never calculates, so no figure is invented.",
    metrics: ["243s → 30–150ms", "Over 1,600x Faster", "Quantized 14B", "Zero Data Egress"],
    proprietary: true,
  },
  {
    id: "pricing",
    slug: "price-calibration",
    name: "Price Calibration Engine",
    glyph: "PRC",
    tags: ["Python", "Statistical Modeling"],
    problem: "Annual pricing was a flat across-the-board percentage applied to every customer.",
    audience: "Sales & finance leadership setting yearly price policy.",
    tradeoff:
      "Reconstructed 16 years of real pricing history to justify per-segment moves — slower to build than a flat bump, but each increase is defensible against its own record.",
    summary:
      "Reconstructing a 16-year calendar of ~32 real pricing actions, customer-class discount structures and standard-cost movement turned a flat increase into a per-segment, evidence-driven model.",
    metrics: ["16-Year History", "~32 Pricing Actions", "Per-Segment"],
    proprietary: true,
  },
  {
    id: "gem",
    slug: "gem",
    name: "G.E.M. — Geopolitical Equilibrium Model",
    glyph: "GEM",
    tags: ["Astro", "GSAP", "FRED API", "Cerebras"],
    problem: "Strategy reads are usually static decks, stale the moment they ship.",
    audience: "Anyone reasoning about live macro/geopolitical equilibrium.",
    tradeoff:
      "Streamed six live datasets into a scroll-native engine rather than a polished report — real-time truth over presentation gloss.",
    summary:
      "A live decision engine that converts GDELT news into measurable impact, benchmarks today against six historical golden ages, and streams six FRED datasets to generate strategy in real time. Solo-built in three days.",
    metrics: ["2,000 Yrs Benchmarked", "6 Live Datasets", "3 Days Solo"],
    proprietary: false,
    poster: "/gem-hero.jpg",
    liveUrl: "https://gem-website-five.vercel.app/",
    repoUrl: "https://github.com/abhinair7/GEM",
  },
  {
    id: "forecast",
    slug: "forecasting-dashboard",
    name: "Inventory & Sales Forecasting Dashboard",
    glyph: "FCT",
    tags: ["Power BI", "Firebase", "Cloud Functions"],
    problem: "Operators saw shortfalls only after they happened.",
    audience: "Restaurant operations staff managing sales and inventory.",
    tradeoff:
      "Wired real-time Firebase updates to Power BI so forecasts stayed current — accepting more moving parts for live visibility.",
    summary:
      "Time-series and seasonal-pattern forecasting for sales and inventory, wired to Firebase for real-time updates with automated ETL behind it — built so operators could see shortfalls before they happened rather than after.",
    metrics: ["+35% Visibility", "Automated ETL"],
    proprietary: false,
  },
  {
    id: "imdb",
    slug: "imdb-sentiment",
    name: "IMDB Sentiment Classifier",
    glyph: "NLP",
    tags: ["PyTorch", "LSTM", "TorchText"],
    problem: "A from-scratch NLP baseline needed to be reproducible, not just accurate.",
    audience: "A learning exercise in disciplined ML engineering.",
    tradeoff:
      "Prioritized a reproducible inference pipeline and TensorBoard monitoring over chasing a higher headline accuracy number.",
    summary:
      "Tokenized 50K reviews and trained a two-layer LSTM classifier to 86% accuracy, with TensorBoard monitoring and a reproducible inference pipeline so results could be re-run rather than trusted on assertion.",
    metrics: ["86% Accuracy", "50K Reviews"],
    proprietary: false,
  },
];

export const gemGallery = [
  { src: "/gem-simulate.jpg", type: "image", alt: "Simulation Lab" },
  { src: "/gem-intel.jpg", type: "image", alt: "Intelligence" },
  { src: "/gem-charts.jpg", type: "image", alt: "Live Charts" },
  { src: "/gem-splash.mp4", type: "video", alt: "GEM Splash", poster: "/gem-splash-poster.jpg" },
] as const;

export interface EduEntry {
  school: string;
  degree: string;
  date: string;
  logo: string;
  coursework: string[];
}

export const education: EduEntry[] = [
  {
    school: "UMass Boston",
    degree: "MS Business Analytics",
    date: "Aug 2024 — May 2026 · Boston, USA",
    logo: "/logo-umass.png",
    coursework: ["Data Mining", "DBMS", "Decision Models", "Multivariate Regression", "Business Intelligence", "Data Visualization"],
  },
  {
    school: "Sri Krishna College of Technology",
    degree: "BE Computer Science",
    date: "Aug 2017 — Apr 2021 · Coimbatore, India",
    logo: "/logo-skct.jpg",
    coursework: ["Machine Learning", "Data Structures", "AI", "Computer Networks", "Cloud", "Agile"],
  },
];

export const certification = {
  title: "Beta Gamma Sigma",
  subtitle: "International Business Honor Society — UMass Boston Chapter",
  badges: ["Top 20% Business Scholars", "AACSB Accredited"],
  date: "Inducted April 2026",
  keyImg: "/bgs-key.png",
  memberImg: "/bgs-member.png",
};
