// SAMPLE CONTENT. The Orbit case study is taken from the site design; everything else is
// placeholder text written so the pages look complete. Replace it all from /admin.

export const projects = [
  {
    title: "IRIS MIT-WPU Website",
    slug: "iris-mit-wpu-website",
    description:
      "Official website for a student technical club spanning robotics, AI/ML, full-stack engineering and design.",
    role: "Full-stack developer",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "EmailJS",
      "Vercel",
    ],
    year: 2025,
    featured: true,
    image: "",
    overview:
      "IRIS MIT-WPU is the official digital platform for the Innovation, Research, Intelligence & Support student technical club. It presents projects, research, events, team profiles and recruitment opportunities, and includes an admin dashboard for maintaining the site.",
    challenge:
      "Making a content-rich club website easy for the team to maintain while keeping the public experience fast, responsive and visually polished.",
    approach:
      "Built a React and TypeScript interface with Supabase for database and storage, React Router for navigation, Framer Motion for animation and Tailwind CSS for styling. A protected dashboard supports CRUD workflows for blogs, events, projects, members, mentors and applications.",
    url: "https://iris-mitwpu.vercel.app/",
    repo: "https://github.com/I-R-I-S-MIT-WPU/IRIS-Website-v2",
    order: 1,
  },
  {
    title: "LLM → SLM Partitioner & Runner",
    slug: "llm-slm-partitioner",
    description:
      "Runs large language models on consumer hardware by partitioning them into hardware-aware SLM shards.",
    role: "AI systems developer",
    tags: [
      "Python",
      "LLMs",
      "Transformers",
      "Hugging Face",
      "Accelerate",
      "Rich",
      "Quantization",
      "Model partitioning",
      "Hardware profiling",
      "System monitoring",
    ],
    year: 2026,
    featured: true,
    image: "",
    overview:
      "A local LLM runner that profiles CPU, RAM, GPU and disk resources, then chooses GPU-only, hybrid or CPU/disk-offload execution for supported open-weight models.",
    challenge:
      "Large models may not fit entirely in GPU or system memory, so the project needed to plan resource usage without exhausting hardware or producing poor responses.",
    approach:
      "The system profiles hardware, partitions transformer layers into contiguous shards and dynamically applies quantization and device placement. It includes model compatibility planning, a streamed terminal chat and token optimization for context limits and memory.",
    url: "",
    repo: "https://github.com/Soham-student/LLM-SLM",
    order: 2,
  },
  {
    title: "Saarthi",
    slug: "saarthi",
    description:
      "Multilingual voice-assistant cockpit demo for a simulated car dashboard.",
    role: "Full-stack developer",
    tags: [
      "JavaScript",
      "Node.js",
      "Express",
      "HTML",
      "CSS",
      "Sarvam AI",
      "Speech APIs",
      "REST APIs",
      "Vercel",
    ],
    year: 2026,
    featured: true,
    image: "",
    overview:
      "Saarthi combines a multilingual voice assistant with a responsive car cockpit, searchable vehicle sensor catalogue, route preview, simulated alerts and infotainment controls.",
    challenge:
      "Creating a natural multilingual conversation while clearly separating simulated vehicle data from real automotive safety or diagnostic capabilities.",
    approach:
      "The browser handles microphone capture and noise-aware speech detection, while a local API uses Sarvam speech, language and conversation models. A searchable 211-item sensor catalogue and dedicated alert simulator provide cockpit information without connecting to any real vehicle system.",
    url: "https://saarthi-eosin-five.vercel.app/",
    repo: "https://github.com/Soham-student/saarthi",
    order: 3,
  },
  {
    title: "NBA Course Attainment Workbook",
    slug: "nba-course-attainment-workbook",
    description:
      "Processes academic workbooks to calculate course outcome and PO/PSO attainment reports.",
    role: "Backend & data developer",
    tags: [
      "Python",
      "Flask",
      "OpenPyXL",
      "Pandas",
      "SQLite",
      "Excel automation",
      "HTML",
      "Testing",
    ],
    year: 2026,
    featured: false,
    image: "",
    overview:
      "A Python application that extracts CO–PO–PSO mapping data from Excel workbooks and produces formatted attainment summaries, student-wise scores and downloadable reports.",
    challenge:
      "Converting inconsistent academic workbook tables into reliable calculations while preserving the detailed structure required for institutional reporting.",
    approach:
      "The backend reads source and student-mark workbooks with openpyxl, applies CO, direct-attainment and PO/PSO formulas, and writes structured Excel output. Flask provides a web interface and SQLite records every calculation run and uploaded result.",
    url: "",
    repo: "https://github.com/Soham-student/NBA-PRJ",
    order: 4,
  },
  {
    title: "Oil Rig Asset Intelligence Copilot",
    slug: "oil-rig-asset-intelligence-copilot",
    description:
      "Evidence-based copilot for querying synthetic oil-field operations and learning from operator feedback.",
    role: "AI & full-stack developer",
    tags: [
      "Python",
      "FastAPI",
      "SQLite",
      "FTS5",
      "Vector retrieval",
      "LLM tool calling",
      "AI orchestration",
      "React",
      "TypeScript",
      "Docker",
    ],
    year: 2026,
    featured: true,
    image: "",
    overview:
      "An asset-intelligence assistant that combines deterministic backend tools, SQLite data views, hybrid document retrieval and an evidence-aware LLM agent to answer oil-field operations questions reliably.",
    challenge:
      "Complex questions require exact joins, derived operational conditions, compliance deadlines and user-specific corrections while preventing hallucinated calculations or cross-user memory leakage.",
    approach:
      "Built a reproducible Python ingestion pipeline and FastAPI backend around SQLite, derived views and FTS/vector retrieval. Structured tool calling, scoped memory and evidence filtering provide the orchestration layer; the React frontend renders cards, tables and charts and Docker supports portable deployment.",
    url: "",
    repo: "https://github.com/ProgrammerAdi-369/Oil-rig-CoPilot",
    order: 5,
  },
  {
    title: "Epi Culture Honeybee Dataset",
    slug: "epi-culture-honeybee-dataset",
    description:
      "Acquires, enriches and analyses honeybee ecology, biodiversity and economic-impact data.",
    role: "Data engineer & analyst",
    tags: [
      "Python",
      "R",
      "Pandas",
      "GBIF",
      "Data engineering",
      "EDA",
      "Visualization",
      "Data validation",
      "Automated pipelines",
      "HTML",
    ],
    year: 2026,
    featured: false,
    image: "",
    overview:
      "A reproducible data-engineering pipeline that combines honeybee occurrence records, scientific literature, economic measures and pollination research into a master analytical dataset.",
    challenge:
      "Distributed sources, changing formats and differing schemas make it difficult to produce consistent, traceable datasets and avoid silently introducing bad records.",
    approach:
      "Implemented acquisition, enrichment, integration and analysis stages with validation, automated scripts and exploratory/analytical visualizations. The pipeline produces master CSV/Excel datasets, schema catalogs and summary outputs that can support ML and statistical workflows.",
    url: "",
    repo: "https://github.com/Soham-student/Epi_culture",
    order: 6,
  },
];

export const skills = [
  {
    title: "Frontend",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      "Vite",
      "Responsive UI",
    ],
    order: 1,
  },
  {
    title: "Backend",
    items: [
      "Python",
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "Authentication",
    ],
    order: 2,
  },
  {
    title: "Data & ML",
    items: ["MongoDB", "SQLite", "Pandas", "OpenPyXL", "R", "Vector search"],
    order: 3,
  },
  {
    title: "AI & Platform",
    items: [
      "LLM orchestration",
      "Retrieval & RAG",
      "Tool calling",
      "Hugging Face",
      "Docker",
      "GitHub Actions",
    ],
    order: 4,
  },
];

export const experience = [
  {
    period: "2024 — Present",
    title: "Computer science student",
    org: "University coursework",
    description:
      "Studying data structures, databases, operating systems and algorithms while building full-stack, data and AI systems outside class.",
    order: 1,
  },
  {
    period: "2025 — Present",
    title: "Full-stack & AI engineering projects",
    org: "Independent",
    description:
      "Building React interfaces, Python and Node APIs, database models, ML/data pipelines, LLM tool orchestration and deployable applications.",
    order: 2,
  },
  {
    period: "2026",
    title: "AI and automation builds",
    org: "Hackathons & personal projects",
    description:
      "Designed evidence-based AI copilots, hardware-aware model partitioning, multilingual assistants and reproducible data workflows.",
    order: 3,
  },
  {
    period: "2025",
    title: "Open-source contributor",
    org: "Community",
    description:
      "Contributing fixes and small features to open-source projects, with attention to implementation quality and maintainability.",
    order: 4,
  },
  {
    period: "2025",
    title: "Hackathon participant",
    org: "Technical events",
    description:
      "Built and demoed real-time and AI-assisted products under time constraints, owning backend, data and integration responsibilities.",
    order: 5,
  },
  {
    period: "2024",
    title: "Web development club",
    org: "Community",
    description:
      "Helped run sessions on HTML, CSS and JavaScript fundamentals for first-year students.",
    order: 6,
  },
];
