// Static copy for the hero, about and footer. Projects, experience, skills and
// messages come from the API and are managed in /admin.

export const site = {
  name: "Soham Dengale",
  first: "Soham",
  last: "Dengale",
  initials: "SD",
  availability: "Open to internships, PPOs & full-time roles",
  github: "https://github.com/Soham-student",
  linkedin: "https://www.linkedin.com/",
  leetcode: "https://leetcode.com/",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
];

export const hero = {
  tagline: "Building intelligent, end-to-end systems.",
  intro:
    "I build complete software systems — from responsive React interfaces and reliable APIs to machine-learning pipelines, AI orchestration and automated deployments.",
  facts: [
    {
      label: "Currently working with",
      value: "React · Python · Node.js · AI/ML",
    },
    { label: "Focus", value: "Full-stack engineering & applied AI" },
    {
      label: "Infrastructure",
      value: "MongoDB · SQLite · Docker · GitHub Actions",
    },
    { label: "Based", value: "India · working worldwide" },
  ],
};

export const work = {
  title: "Products I've designed, built and shipped.",
  sub: "From backend architecture and data pipelines to AI agents, orchestration and deployment.",
};

export const stack = {
  title: "Tools I reach for.",
  sub: "A cross-disciplinary stack for building, automating and deploying complete systems.",
};

export const experienceCopy = { title: "Where I've worked." };

export const about = {
  statement:
    "I turn complex requirements into practical systems — measured, observable and easy to maintain.",
  paragraphs: [
    "I'm Soham Dengale, a computer science student and full-stack developer working across interfaces, backend services, data pipelines and applied AI.",
    "I build React and TypeScript frontends, Python and Node.js APIs, database-backed applications and ML workflows. I am also interested in AI orchestration: deterministic tools, retrieval, memory, model routing and evidence-aware responses that make LLM systems more reliable.",
    "I care about testing, observability, reproducible builds and CI/CD, and I am looking for opportunities to contribute across the full lifecycle of a real product.",
  ],
};

export const contactCopy = {
  title: ["Get in", "touch."],
  body: "Tell me about the engineering problem you are solving — full-stack, ML, AI orchestration or deployment — and I’ll get back to you.",
};
