// Single place to update site content. Mirrors ~/…/resume/profile.json.
import lawncareShot from './assets/lawncare.jpg';
import horizonShot from './assets/horizon.jpg';

export const RESUME = '/William_West_Resume.pdf';
export const EMAIL = 'wwest0708@gmail.com';
export const GITHUB = 'https://github.com/WilliamWest223';
export const LINKEDIN = 'https://linkedin.com/in/william-west';

// The Jarvis agent's first scheduled run; the hero counts nights since.
export const AGENT_LIVE_SINCE = '2026-04-06';

// Short, honest proof points for the hero.
export const HERO_FACTS = [
  ['AI agents', 'built on MCP'],
  ['Local LLMs', 'self-hosted on Linux'],
  ['Paying client', 'shipped to production'],
  ['Nightly agent', 'running unattended'],
];

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & agents' },
  { id: 'web', label: 'Web apps' },
  { id: 'team', label: 'Team projects' },
];

// `visual` picks the card's artwork: a screenshot, a flow diagram, a test grid, or a stat.
export const PROJECTS = [
  {
    id: 'jarvis',
    name: 'Jarvis — autonomous study agent',
    kind: 'Personal project',
    tags: ['ai'],
    size: 'wide',
    summary: 'An AI agent that runs itself every night at 3 AM: it reads my university LMS through a live browser, reconciles what it finds against a Notion database, writes me a briefing, and texts me if anything breaks.',
    role: 'Sole developer',
    date: 'Apr 2026 – now',
    status: 'Runs nightly',
    stack: ['Python', 'MCP', 'Chrome automation', 'Notion API', 'iMessage', 'cron'],
    visual: { type: 'flow', nodes: ['03:00 · cron wakes the agent', 'drives a live Chrome session (MCP)', 'reads the Blackboard gradebook', 'syncs Notion, then texts me'] },
    bullets: [
      'Written as a Model Context Protocol skill — a tool-using agent, not a one-off script. It decides what to do at each step instead of replaying fixed clicks.',
      'University SSO (Shibboleth) blocks headless scrapers, so the agent drives my own authenticated Chrome over MCP and queries the gradebook API from inside the page — the approach that actually gets through.',
      'Does a real delta: it reconciles scraped assignments against a Notion database by name *and* due date, never overwriting pages that already hold my hand-written notes.',
      'Built to fail safely: on an expired session or any unrecoverable error it texts me over iMessage and stops, with a hard guard that it will never type credentials or attempt a login.',
    ],
    specs: [['Courses tracked', '5'], ['Schedule', 'Daily · 03:00'], ['Runs', 'Unattended'], ['Interface', 'MCP skill']],
    links: [],
    note: 'Private — it touches my school account and personal data. I’m glad to screen-share a run.',
  },
  {
    id: 'local-video',
    name: 'Local-first notes-to-video engine',
    kind: 'Personal project',
    tags: ['ai'],
    size: 'narrow',
    summary: 'A four-stage AI pipeline that turns messy study notes into a narrated video — running entirely on my own hardware, with no cloud API in the loop.',
    role: 'Sole developer',
    date: '2025 – 2026',
    status: 'Working',
    stack: ['Python', 'FastAPI', 'Ollama · Llama 3.1', 'Stable Diffusion', 'XTTS v2', 'MoviePy'],
    visual: { type: 'flow', nodes: ['Llama 3.1 structures the notes', 'Stable Diffusion paints scenes', 'XTTS v2 narrates', 'MoviePy assembles the MP4'] },
    bullets: [
      'Runs a local LLM (Llama 3.1 8B via Ollama), image diffusion (Stable Diffusion 2.1), and neural TTS (XTTS v2) on-device — proof I can stand up a full generative stack without renting one.',
      'A FastAPI service splits the work into four stages (organize → script + image prompts → narrate → assemble) so any stage can be rerun on its own.',
      'The LLM calls are forced into strict JSON and validated, with a stubbed fallback so the pipeline still produces output when a model is missing.',
    ],
    specs: [['Python', '~1,500 lines'], ['Models', 'All local'], ['Stages', '4'], ['Cloud calls', '0']],
    links: [],
    note: 'Private for now — happy to walk through the code.',
  },
  {
    id: 'local-llm-lab',
    name: 'Linux LLM & security lab',
    kind: 'Self-directed',
    tags: ['ai'],
    size: 'narrow',
    summary: 'I reflashed an old ThinkPad to Linux and turned it into a private box for running local language models and studying web-application security hands-on.',
    role: 'Self-directed',
    date: '2026',
    status: 'Ongoing',
    stack: ['Linux', 'Local LLMs', 'Web security', 'Adversarial prompting'],
    visual: { type: 'stat', value: 'On-device', label: 'local models on a Linux ThinkPad — no cloud, no data leaving the box' },
    bullets: [
      'Wiped and reinstalled Linux on a spare ThinkPad to get a clean, controllable environment for running open-weight models locally.',
      'Use it as a sandbox to study how LLMs behave under adversarial prompting and where web apps break — the offensive side of the security material from my coursework, on targets I own.',
      'Pairs with my Computer Security class: I’d rather understand an attack by building it in a lab than only read about it.',
    ],
    specs: [['Host', 'ThinkPad · Linux'], ['Models', 'Open-weight, local'], ['Scope', 'Lab only']],
    links: [],
    note: 'Lab work on hardware and targets I own.',
  },
  {
    id: 'party-town',
    name: 'Party Town',
    kind: 'Personal project',
    tags: ['web'],
    size: 'wide',
    summary: 'A campus-events platform with a web app and a native mobile app sharing one Postgres backend — with access control enforced in the database, not just the UI.',
    role: 'Sole developer',
    date: 'Apr 2026',
    status: 'Prototype',
    stack: ['TypeScript', 'Next.js 16', 'React Native (Expo)', 'Supabase', 'Postgres', 'Vitest'],
    visual: { type: 'flow', nodes: ['Next.js web + Expo mobile', 'Supabase auth', 'Postgres with Row Level Security'] },
    bullets: [
      'One TypeScript monorepo ships a Next.js web app and an Expo mobile app against a single Supabase Postgres database.',
      'Student, venue, and admin tiers are enforced with Postgres Row Level Security, so the database itself refuses to leak data a role shouldn’t see.',
      'I wrote a chaos-test suite that attacks that security boundary on purpose, and generate shared types from the schema so both clients stay in lock-step.',
    ],
    specs: [['TypeScript', '9,524 lines'], ['Source files', '92'], ['SQL migrations', '6'], ['Clients', 'Web + mobile']],
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/partytown' }],
  },
  {
    id: 'lewis-lawn-care',
    name: 'Lewis Lawn Care',
    kind: 'Client work',
    tags: ['web'],
    size: 'wide',
    summary: 'A marketing and booking site I built and shipped solo for a paying lawn-care client in Columbia, SC — landing page through admin dashboard.',
    role: 'Freelance, sole developer',
    date: 'Jul 2026',
    status: 'Live',
    stack: ['Next.js 15', 'React', 'Node.js'],
    visual: { type: 'shot', src: lawncareShot, alt: 'Lewis Lawn Care home page: a dark green hero reading “Lawns worth lingering on.” with quote and booking buttons' },
    bullets: [
      'Real client, real deadline: I owned the whole thing, from the first wireframe to the production deploy.',
      'Built an instant-quote calculator and a booking flow whose server checks availability and rejects double-bookings.',
      'Shipped a password-protected admin dashboard with KPI cards, quoted-pipeline totals, and per-lead status tracking.',
      'Put the storage behind one interface so Postgres can replace the JSON store without touching a single route handler.',
    ],
    specs: [['JavaScript', '1,487 lines'], ['Pages', '7'], ['API routes', '5']],
    links: [
      { label: 'Visit site', href: 'https://lawncare-com-iota.vercel.app' },
      { label: 'Code', href: 'https://github.com/WilliamWest223/lawncare.com' },
    ],
  },
  {
    id: 'method-men',
    name: 'Interview Prep MM',
    kind: 'CSCE 247 · 5-person team',
    tags: ['team'],
    size: 'narrow',
    summary: 'A technical-interview practice platform built with a five-person team under a full software-engineering process.',
    role: 'Backend & full-stack developer',
    date: 'Feb – Apr 2026',
    status: 'Shipped',
    stack: ['Java', 'JavaFX', 'JUnit 5', 'Maven', 'Figma'],
    visual: { type: 'tests', total: 300, found: 3 },
    bullets: [
      'Authored the core domain model (User, Player, Contributor, Question, Section, and a generic Votable interface) that the rest of the team built on.',
      'Shipped daily-question rotation, bookmarks, streaks, and admin moderation across a 14-branch feature-branch workflow.',
      'My JUnit suites for the list managers caught three real defects — filed as GitHub Issues and fixed before the demo.',
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
    summary: 'A one-page argument for proactive AI regulation, with live data charts and a Turing-test mini-game.',
    role: 'Sole developer',
    date: 'Apr 2026',
    status: 'Live',
    stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    visual: { type: 'shot', src: horizonShot, alt: 'The Algorithmic Horizon title page with a serif headline and a dot-grid illustration' },
    bullets: [
      'Scroll-synced chapter navigation, lazy-loaded Chart.js visualizations, and accessible modal case studies.',
      'Interactive pieces — a job-risk analyzer and a Turing-test game with round tracking — written in vanilla JS, no framework.',
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
    summary: 'Offline drill apps for Calc II and Chem that name the exact mistake behind a wrong answer and resurface it on a spaced schedule.',
    role: 'Sole developer',
    date: 'Sep 2026',
    status: 'In use',
    stack: ['JavaScript', 'No dependencies'],
    visual: { type: 'stat', value: '27', label: 'lessons, dated to the live lecture calendar' },
    bullets: [
      'A wrong answer gets a diagnosis of the specific error, a picture of why it’s wrong, and a worked solution.',
      'Misses come back on a spaced schedule, and the app opens on a catch-up queue of topics class has already covered.',
    ],
    specs: [['Dependencies', '0'], ['Lessons', '27']],
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/calctutor' }],
  },
  {
    id: 'brainrot',
    name: 'BrainRot StoryTutor',
    kind: 'Personal project',
    tags: ['ai', 'web'],
    size: 'third',
    summary: 'The browser-native take on notes-to-video: short-form study clips rendered client-side, with LLM and neural-voice as optional upgrades.',
    role: 'Sole developer',
    date: 'Jan 2026',
    status: 'MVP',
    stack: ['Next.js 14', 'TypeScript', 'Canvas', 'MediaRecorder'],
    visual: { type: 'stat', value: '1080×1920', label: 'canvas rendered at 30 fps, right in the browser' },
    bullets: [
      'A deterministic TF-IDF and mnemonic pipeline pulls 8–12 story beats, flashcards, and SRT captions with no LLM required.',
      'Optional LLM and neural-TTS layers sit on top of browser speech synthesis, so it degrades gracefully to zero API keys.',
    ],
    specs: [['TypeScript', '3,219 lines']],
    links: [],
    note: 'Not on GitHub yet.',
  },
];

export const TOOLBOX = [
  ['AI / agents', 'MCP, Anthropic & OpenAI APIs, local LLMs (Ollama/Llama), prompt engineering, RAG & TF-IDF'],
  ['Languages', 'Java, TypeScript, Python, C++, SQL, Bash'],
  ['Frameworks', 'React, Next.js, React Native (Expo), Node/Express, FastAPI, JavaFX'],
  ['Data', 'Postgres, Supabase (RLS), SQLite, Prisma'],
  ['Testing & ops', 'JUnit 5, Vitest, Playwright, Git branching, Vercel'],
];

export const COURSES = [
  'Software Engineering', 'Advanced Programming (C++)', 'Data Structures',
  'Unix/Linux', 'Digital Logic', 'Computer Security',
];

// Newest first.
export const TIMELINE = [
  ['Sep 2026', 'CalcTutor & ChemTutor', 'Drill apps for this semester’s Calc II and Chem'],
  ['Jul 2026', 'Lewis Lawn Care', 'First paid client site, shipped to production'],
  ['Apr 2026', 'Party Town + Jarvis agent', 'Web + mobile on one backend; the agent has run nightly since'],
  ['Feb 2026', 'Interview Prep MM', '5-person team, 300 tests'],
  ['2025', 'Local-first AI video engine', 'Full generative stack running on my own hardware'],
  ['Aug 2024', 'Started at USC', 'B.S. Computer Science, expected May 2028'],
];
