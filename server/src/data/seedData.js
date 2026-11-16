// SAMPLE CONTENT. The Orbit case study is taken from the site design; everything else is
// placeholder text written so the pages look complete. Replace it all from /admin.

export const projects = [
  {
    title: 'Orbit',
    slug: 'orbit',
    description: 'Realtime product analytics for small SaaS teams.',
    role: 'Full-stack developer',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    year: 2025,
    featured: true,
    overview:
      "Orbit is a lightweight analytics product for teams who don't want a data engineer to answer simple questions. Events stream in from a small JS snippet, get aggregated per hour in MongoDB, and render as live dashboards.",
    challenge:
      'Keeping dashboards live without hammering the database. Naive per-view queries meant every open tab multiplied the load, and hourly aggregates drifted whenever an event arrived late.',
    approach:
      'The ingest path is a queue-backed writer that batches events and updates hourly buckets in a single operation, then pushes only the changed bucket to the browser over Socket.IO. Cached aggregate documents keep each dashboard widget to one read, and a re-index job rebuilds buckets when a late event lands.',
    order: 1,
  },
  {
    title: 'Ledger',
    slug: 'ledger',
    description: 'Invoicing and payment tracking built for freelancers.',
    role: 'Full-stack developer',
    tags: ['React', 'Express', 'MongoDB', 'Stripe'],
    year: 2025,
    featured: true,
    overview:
      "Ledger lets freelancers send professional invoices, track what's been paid and chase what hasn't, without a spreadsheet. Clients pay through a hosted Stripe checkout link, and every payment updates the invoice automatically.",
    challenge:
      "Keeping invoice state trustworthy. Payments can arrive twice, late or out of order, and a freelancer needs the dashboard to always show the truth about what they're owed.",
    approach:
      'Every invoice is a small state machine in MongoDB, and Stripe webhooks are the only thing allowed to move it to paid. Handlers are idempotent, keyed on the event id, so retries are harmless, and a nightly job reconciles against Stripe to catch anything that was missed.',
    order: 2,
  },
  {
    title: 'Threadline',
    slug: 'threadline',
    description: 'Collaborative documents with live cursors and versioning.',
    role: 'Full-stack developer',
    tags: ['React', 'TypeScript', 'Node.js', 'WebSockets'],
    year: 2024,
    featured: false,
    overview:
      'Threadline is a collaborative document editor where several people can type on the same page, see each other\'s cursors, and roll back to any earlier version.',
    challenge:
      'Concurrent edits. Two people typing in the same paragraph at the same moment must both end up with what they typed, in the same order, on every screen.',
    approach:
      'Edits travel over WebSockets as small operations that the server orders and transforms against anything that landed first, so every client converges on the same text. Snapshots are saved every few minutes and on idle, which powers version history and one-click restore.',
    order: 3,
  },
  {
    title: 'Brewlog',
    slug: 'brewlog',
    description: 'A tasting journal for people who care about their coffee.',
    role: 'Full-stack developer',
    tags: ['React', 'Express', 'MongoDB', 'Cloudinary'],
    year: 2024,
    featured: false,
    overview:
      'Brewlog is a journal for home brewers: log the beans, grind, ratio and timing of every cup, rate the result, and see which recipes you actually enjoy most.',
    challenge:
      'Making logging fast enough to do while the kettle is still hot. If it takes more than a few taps, people stop recording and the data becomes useless.',
    approach:
      'A single-screen form with sensible defaults copied from your last brew, optimistic saves so it feels instant, and photo uploads sent straight to Cloudinary. MongoDB aggregations power the "best recipes" and per-bean summaries.',
    order: 4,
  },
  {
    title: 'Pathfinder',
    slug: 'pathfinder',
    description: 'A job-application tracker with a kanban board and reminders.',
    role: 'Full-stack developer',
    tags: ['React', 'Node.js', 'MongoDB', 'Cron'],
    year: 2024,
    featured: false,
    overview:
      'Pathfinder keeps a job search organised: drag applications across Applied, Interview and Offer, attach notes and contacts, and get nudged when it is time to follow up.',
    challenge:
      'Reminders that are helpful rather than noisy. A fixed "follow up in 7 days" rule fired at the wrong times and got ignored within a week.',
    approach:
      'Reminders are derived from each application\'s stage and last activity, computed by a scheduled job and batched into one daily digest. Moving a card on the board is a single optimistic update that rolls back cleanly if the request fails.',
    order: 5,
  },
  {
    title: 'Atlas UI',
    slug: 'atlas-ui',
    description: 'A small, accessible component library for React.',
    role: 'Frontend developer',
    tags: ['React', 'TypeScript', 'Vite', 'Storybook'],
    year: 2025,
    featured: false,
    overview:
      'Atlas UI is a compact set of React components (buttons, dialogs, menus, form fields) built keyboard-first and documented in Storybook.',
    challenge:
      'Accessibility that holds up in real use: focus management in dialogs, correct roles and labels, and behaviour that stays consistent across browsers.',
    approach:
      'Each component starts from the WAI-ARIA authoring patterns, with keyboard and screen-reader behaviour covered by tests before any styling. Design tokens live in CSS variables so theming never touches component code.',
    order: 6,
  },
];

export const skills = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], order: 1 },
  { title: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Auth & sessions'], order: 2 },
  { title: 'Data', items: ['MongoDB', 'Mongoose', 'Schema design', 'Aggregations'], order: 3 },
  { title: 'Tooling', items: ['Git & GitHub', 'Vite', 'Docker', 'Testing'], order: 4 },
];

export const experience = [
  {
    period: '2024 — Present',
    title: 'Computer science student',
    org: 'University coursework',
    description:
      'Studying data structures, databases, operating systems and algorithms — and building full-stack applications outside class in parallel.',
    order: 1,
  },
  {
    period: '2025 — Present',
    title: 'Full-stack projects',
    org: 'Self-directed',
    description:
      'Designing and shipping my own products end to end: the data model, the Node API, the React interface and the deploy.',
    order: 2,
  },
  {
    period: '2025',
    title: 'Open-source contributor',
    org: 'Community',
    description:
      'Contributing fixes and small features to open-source projects in the JavaScript ecosystem, from documentation corrections to bug fixes with tests.',
    order: 3,
  },
  {
    period: '2025',
    title: 'Hackathon participant',
    org: 'Event',
    description:
      'Built and demoed a realtime team dashboard in 36 hours with a team of four, owning the Node API and the MongoDB schema.',
    order: 4,
  },
  {
    period: '2024',
    title: 'Web development club',
    org: 'Community',
    description:
      'Helped run weekly sessions on HTML, CSS and JavaScript fundamentals for first-year students.',
    order: 5,
  },
  {
    period: '2023 — 2024',
    title: 'Self-taught web developer',
    org: 'Independent',
    description:
      'Started with HTML, CSS and vanilla JavaScript, then moved into React and Node by building small projects and reading other people\'s code.',
    order: 6,
  },
];
