// Static copy for the hero, about and footer. Projects, experience, skills and
// messages come from the API and are managed in /admin.

export const site = {
  name: 'Soham Dengale',
  first: 'Soham',
  last: 'Dengale',
  initials: 'SD',
  availability: '',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  leetcode: 'https://leetcode.com/',
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
];

export const hero = {
  tagline: 'Thoughtful code. Practical solutions.',
  intro:
    'I build full-stack web products end to end — React interfaces on top of Node APIs and document databases — with an eye for structure, speed and detail.',
  facts: [
    { label: 'Currently working with', value: 'React · Node.js · Express · MongoDB' },
    { label: 'Focus', value: 'Full-stack web architecture & UI' },
    { label: 'Stack', value: 'React · Node · Express · MongoDB' },
    { label: 'Based', value: 'India · working worldwide' },
  ],
};

export const work = {
  title: "Products I've designed, built and shipped.",
  sub: 'Full-stack builds — each one starts at the data model and ends at the interface.',
};

export const stack = {
  title: 'Tools I reach for.',
  sub: 'A focused set I know deeply, chosen for reliability over novelty.',
};

export const experienceCopy = { title: "Where I've worked." };

export const about = {
  statement:
    'I write code with intent — small, readable systems that solve the problem in front of them.',
  paragraphs: [
    "I'm Soham Dengale, a computer science student and full-stack developer. My work sits in the overlap of clean data modelling and considered interface design — a product feels obvious to use when the structure underneath is honest.",
    'Most of what I build is React on the front, Node and Express behind it, with a document database holding the state. I write the tests that matter, keep the bundle small, and treat accessibility as a baseline rather than a feature.',
  ],
};

export const contactCopy = {
  title: ['Get in', 'touch.'],
  body: "Tell me about your project and what you're building. Every message comes straight to me, and I usually reply within a day.",
};
