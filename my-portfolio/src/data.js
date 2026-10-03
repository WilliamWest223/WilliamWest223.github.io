// Single place to update site content. Mirrors ~/…/resume/profile.json.
import lawncareShot from './assets/lawncare.jpg';
import horizonShot from './assets/horizon.jpg';

export const RESUME = '/William_West_Resume.pdf';
export const EMAIL = 'wwest0708@gmail.com';
export const GITHUB = 'https://github.com/WilliamWest223';
export const LINKEDIN = 'https://linkedin.com/in/william-west';

// The Blackboard agent's first scheduled run; the hero counts nights since.
export const AGENT_LIVE_SINCE = '2026-04-06';

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web apps' },
  { id: 'automation', label: 'Automation & AI' },
  { id: 'team', label: 'Team projects' },
];

// `visual` picks the card's artwork: a screenshot, a flow diagram, or the test grid.
export const PROJECTS = [
  {
    id: 'lewis-lawn-care',
    name: 'Lewis Lawn Care',
    kind: 'Client work',
    tags: ['web'],
    size: 'wide',
    summary: 'Marketing and booking site for a lawn-care business in Columbia, SC. Built solo, from landing page to admin dashboard.',
    role: 'Freelance, sole developer',
    date: 'Jul 2026',
    status: 'Live',
    stack: ['Next.js 15', 'React', 'Node.js'],
    visual: { type: 'shot', src: lawncareShot, alt: 'Lewis Lawn Care home page: a dark green hero reading “Lawns worth lingering on.” with quote and booking buttons' },
    bullets: [
      'Instant-quote calculator and booking flow; the server checks availability and rejects double-bookings.',
      'Password-protected admin dashboard with KPI cards, quoted-pipeline totals, and per-lead status.',
      'Storage sits behind one interface, so Postgres can replace the JSON store without touching route handlers.',
      'Unblocked a failed production deploy by upgrading to Next.js 15.5.20 to patch CVEs.',
    ],
    specs: [['JavaScript', '1,487 lines'], ['Pages', '7'], ['API routes', '5']],
    links: [
      { label: 'Visit site', href: 'https://lawncare-com-iota.vercel.app' },
      { label: 'Code', href: 'https://github.com/WilliamWest223/lawncare.com' },
    ],
  },
  {
    id: 'blackboard-agent',
    name: 'Blackboard → Notion agent',
    kind: 'Personal project',
    tags: ['automation'],
    size: 'narrow',
    summary: 'Every night at 3:00 AM it pulls assignments for all five of my courses from Blackboard and files them in Notion.',
    role: 'Sole developer',
    date: 'Apr 2026 – now',
    status: 'Runs nightly',
    stack: ['Python', 'Playwright', 'Notion API', 'MCP', 'cron'],
    visual: { type: 'flow', nodes: ['cron fires at 03:00', 'Signed-in Chrome over MCP', 'Blackboard gradebook API', 'Notion assignment tracker'] },
    bullets: [
      'University SSO blocks headless browsers, so the agent drives my own signed-in Chrome over Model Context Protocol and reads the gradebook API from inside the page.',
      'When the session expires it texts me instead of retrying, and it has a hard guard against ever typing credentials.',
      'Since extended into a morning briefing that pulls together Notion, Gmail, and local git activity.',
    ],
    specs: [['Courses tracked', '5'], ['Schedule', 'Daily, 03:00'], ['Runs', 'Unattended']],
    links: [],
    note: 'Code is private because it touches my school account. Happy to walk through it.',
  },
  {
    id: 'party-town',
    name: 'Party Town',
    kind: 'Personal project',
    tags: ['web'],
    size: 'narrow',
    summary: 'Campus events app with a web client and a mobile client running on one shared Postgres backend.',
    role: 'Sole developer',
    date: 'Apr 2026',
    status: 'Prototype',
    stack: ['TypeScript', 'Next.js 16', 'Expo', 'Supabase', 'Postgres', 'Vitest'],
    visual: { type: 'flow', nodes: ['Next.js web + Expo mobile', 'Supabase auth', 'Postgres with Row Level Security'] },
    bullets: [
      'One monorepo ships a Next.js web app and an Expo mobile app against the same Supabase database.',
      'Student, venue, and admin permissions are enforced in the database with Row Level Security, not in the UI.',
      'A chaos-test suite attacks that security boundary; shared types are generated from the schema so both clients stay in sync.',
    ],
    specs: [['TypeScript', '9,524 lines'], ['Source files', '92'], ['SQL migrations', '6']],
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/partytown' }],
  },
  {
    id: 'method-men',
    name: 'Interview Prep MM',
    kind: 'CSCE 247 · 5-person team',
    tags: ['team'],
    size: 'wide',
    summary: 'A technical-interview practice platform: browse questions, submit solutions, vote, bookmark, and keep a streak.',
    role: 'Backend and full-stack developer',
    date: 'Feb – Apr 2026',
    status: 'Shipped',
    stack: ['Java', 'JavaFX', 'JUnit 5', 'Maven', 'Figma'],
    visual: { type: 'tests', total: 300, found: 3 },
    bullets: [
      'Wrote the core domain model (User, Player, Contributor, Question, Section, and a generic Votable interface).',
      'Built daily-question rotation, bookmarks, streaks, and admin moderation across a 14-branch workflow.',
      'My JUnit suites for the list managers found three real defects, filed as GitHub Issues.',
    ],
    specs: [['Java', '11,816 lines'], ['JUnit tests', '300'], ['FXML views', '36'], ['Team commits', '212']],
    links: [
      { label: 'Watch demo', href: 'https://youtu.be/7nblbT_5eB0' },
      { label: 'Code', href: 'https://github.com/WilliamWest223/method_men_interview_prep' },
    ],
  },
  {
    id: 'horizon',
    name: 'The Algorithmic Horizon',
    kind: 'ENGL 102',
    tags: ['web'],
    size: 'third',
    summary: 'One-page argument for proactive AI regulation, with data charts and a Turing-test mini-game.',
    role: 'Sole developer',
    date: 'Apr 2026',
    status: 'Live',
    stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    visual: { type: 'shot', src: horizonShot, alt: 'The Algorithmic Horizon title page with a serif headline and a dot-grid illustration' },
    bullets: [
      'Scroll-synced chapter navigation, lazy-loaded Chart.js visualizations, and accessible modal case studies.',
      'Interactive pieces: a job-risk analyzer and a Turing-test game with round tracking.',
    ],
    specs: [['Build step', 'None'], ['Hosting', 'Vercel']],
    links: [{ label: 'Visit site', href: 'https://airegulationadvocacy.vercel.app' }],
  },
  {
    id: 'calctutor',
    name: 'CalcTutor & ChemTutor',
    kind: 'Personal project',
    tags: ['web'],
    size: 'third',
    summary: 'Offline drill apps for Calc II and General Chemistry that name the exact mistake behind a wrong answer.',
    role: 'Sole developer',
    date: 'Sep 2026',
    status: 'In use',
    stack: ['JavaScript', 'No dependencies'],
    visual: { type: 'stat', value: '27', label: 'lessons, dated to the lecture calendar' },
    bullets: [
      'A wrong answer gets a diagnosis of the specific mistake, a picture of why it’s wrong, and a worked solution.',
      'Missed problems come back on a spaced schedule; the app opens on a catch-up queue of topics class has already covered.',
    ],
    specs: [['Dependencies', '0'], ['Lessons', '27']],
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/calctutor' }],
  },
  {
    id: 'brainrot',
    name: 'BrainRot StoryTutor',
    kind: 'Personal project',
    tags: ['web', 'automation'],
    size: 'third',
    summary: 'Turns study notes into narrated vertical video with animated captions.',
    role: 'Sole developer',
    date: 'Jan 2026',
    status: 'MVP',
    stack: ['Next.js 14', 'TypeScript', 'Canvas', 'MediaRecorder'],
    visual: { type: 'stat', value: '1080×1920', label: 'canvas rendered at 30 fps in the browser' },
    bullets: [
      'TF-IDF and a mnemonic builder pick 8–12 story beats, flashcards, and SRT captions with no LLM in the loop.',
      'Optional LLM and neural-voice integrations sit on top of browser speech synthesis, so it works without API keys.',
    ],
    specs: [['TypeScript', '3,219 lines']],
    links: [],
    note: 'Not on GitHub yet.',
  },
];

export const TOOLBOX = [
  ['Languages', 'Java, TypeScript, JavaScript, Python, C++, SQL, Bash'],
  ['Frameworks', 'React, Next.js, React Native (Expo), Node/Express, JavaFX'],
  ['Data', 'Postgres, Supabase (RLS), SQLite, Prisma'],
  ['Testing', 'JUnit 5, Vitest, Playwright'],
  ['Shipping', 'Git branching, PR review, Vercel, GitHub Pages'],
];

export const COURSES = [
  'Software Engineering', 'Advanced Programming (C++)', 'Data Structures',
  'Unix/Linux', 'Digital Logic', 'Computer Security',
];

// Newest first.
export const TIMELINE = [
  ['Sep 2026', 'CalcTutor & ChemTutor', 'Drill apps for this semester’s Calc II and Chem'],
  ['Jul 2026', 'Lewis Lawn Care', 'First paid client site, shipped to production'],
  ['Apr 2026', 'Party Town and the Blackboard agent', 'Web + mobile on one backend; the agent has run nightly since'],
  ['Feb 2026', 'Interview Prep MM', '5-person team, 300 tests'],
  ['Aug 2024', 'Started at USC', 'B.S. Computer Science, expected May 2028'],
];
