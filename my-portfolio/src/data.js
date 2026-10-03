// Single place to update site content. Mirrors ~/…/resume/profile.json.

export const RESUME = '/William_West_Resume.pdf';
export const EMAIL = 'wwest0708@gmail.com';
export const GITHUB = 'https://github.com/WilliamWest223';
export const LINKEDIN = 'https://linkedin.com/in/william-west';

// Pins on the hero chip. Pins with an href are links; the rest are stack labels.
// DIP numbering: 1–8 run down the left side, 9–16 run up the right side.
export const PINS = [
  { n: 1, label: 'JAVA' },
  { n: 2, label: 'TYPESCRIPT' },
  { n: 3, label: 'PYTHON' },
  { n: 4, label: 'C++' },
  { n: 5, label: 'SQL' },
  { n: 6, label: 'REACT' },
  { n: 7, label: 'NEXT.JS' },
  { n: 8, label: 'GND', muted: true },
  { n: 9, label: 'GIT' },
  { n: 10, label: 'JUNIT' },
  { n: 11, label: 'PLAYWRIGHT' },
  { n: 12, label: 'POSTGRES' },
  { n: 13, label: 'RESUME', href: RESUME },
  { n: 14, label: 'LINKEDIN', href: LINKEDIN },
  { n: 15, label: 'GITHUB', href: GITHUB },
  { n: 16, label: 'EMAIL', href: `mailto:${EMAIL}` },
];

export const FEATURES = [
  'Shipped a booking site for a paying client, solo, from landing page to admin dashboard',
  'Builds on both sides of the API: React and Next.js up front, Postgres and Express behind',
  'Writes the tests: 300-test JUnit suite on a team project, chaos tests on a security boundary',
  'Runs software unattended: an agent that has synced coursework every night since April',
];

export const PROJECTS = [
  {
    id: 'lewis-lawn-care',
    name: 'Lewis Lawn Care',
    kind: 'Client work',
    summary: 'Marketing and booking site for a local lawn-care business in Columbia, SC.',
    role: 'Freelance, sole developer',
    date: 'Jul 2026',
    status: 'Live',
    stack: ['Next.js 15', 'React', 'Node.js'],
    bullets: [
      'Instant-quote calculator and booking flow; the server checks availability and rejects double-bookings.',
      'Password-protected admin dashboard with KPI cards, quoted-pipeline totals, and per-lead status.',
      'Storage sits behind one interface, so Postgres can replace the JSON store without touching route handlers.',
      'Unblocked a failed production deploy by upgrading to Next.js 15.5.20 to patch CVEs.',
    ],
    specs: [
      ['JavaScript', '1,487 lines'],
      ['Pages', '7'],
      ['API routes', '5'],
      ['Next.js', '15.5.20'],
    ],
    links: [
      { label: 'Visit live site', href: 'https://lawncare-com-iota.vercel.app' },
      { label: 'Code', href: 'https://github.com/WilliamWest223/lawncare.com' },
    ],
  },
  {
    id: 'party-town',
    name: 'Party Town',
    kind: 'Personal project',
    summary: 'Campus events app with a web client and a mobile client on one shared Postgres backend.',
    role: 'Sole developer',
    date: 'Apr 2026',
    status: 'Prototype',
    stack: ['TypeScript', 'Next.js 16', 'React Native (Expo)', 'Supabase', 'Postgres', 'Vitest'],
    bullets: [
      'One monorepo ships a Next.js web app and an Expo mobile app against the same Supabase database.',
      'Student, venue, and admin permissions are enforced in the database with Row Level Security, not in the UI.',
      'A chaos-test suite attacks that security boundary; shared types are generated from the schema so both clients stay in sync.',
    ],
    specs: [
      ['TypeScript', '9,524 lines'],
      ['Source files', '92'],
      ['SQL migrations', '6'],
      ['Clients', 'Web + iOS/Android'],
    ],
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/partytown' }],
  },
  {
    id: 'blackboard-agent',
    name: 'Blackboard → Notion agent',
    kind: 'Personal project',
    summary: 'Runs every night at 3:00 AM, pulls assignments for all five of my courses from Blackboard, and files them in Notion.',
    role: 'Sole developer',
    date: 'Apr 2026 – now',
    status: 'In daily use',
    stack: ['Python', 'Playwright', 'Notion API', 'Model Context Protocol', 'cron'],
    bullets: [
      'University SSO blocks headless browsers, so the agent drives my own signed-in Chrome over MCP and reads the gradebook API from inside the page.',
      'When the session expires it texts me instead of retrying, and it has a hard guard against ever typing credentials.',
      'Since extended into a morning briefing that pulls together Notion, Gmail, and local git activity.',
    ],
    specs: [
      ['Courses tracked', '5'],
      ['Schedule', 'Daily, 03:00'],
      ['Runs', 'Unattended'],
    ],
    links: [],
    note: 'Code is private because it touches my school account. Happy to walk through it.',
  },
  {
    id: 'method-men',
    name: 'Interview Prep MM',
    kind: 'CSCE 247 · 5-person team',
    summary: 'A technical-interview practice platform: browse questions, submit solutions, vote, bookmark, and keep a streak.',
    role: 'Backend and full-stack developer',
    date: 'Feb – Apr 2026',
    status: 'Shipped',
    stack: ['Java', 'JavaFX', 'JUnit 5', 'Maven', 'Figma'],
    bullets: [
      'Wrote the core domain model (User, Player, Contributor, Question, Section, and a generic Votable interface).',
      'Built daily-question rotation, bookmarks, streaks, and admin moderation across a 14-branch workflow.',
      'My JUnit suites for the list managers found three real defects, filed as GitHub Issues.',
    ],
    specs: [
      ['Java', '11,816 lines'],
      ['JUnit tests', '300'],
      ['FXML views', '36'],
      ['Team commits', '212'],
    ],
    links: [
      { label: 'Watch demo', href: 'https://youtu.be/7nblbT_5eB0' },
      { label: 'Code', href: 'https://github.com/WilliamWest223/method_men_interview_prep' },
    ],
  },
];

export const SMALLER = [
  {
    name: 'CalcTutor & ChemTutor',
    what: 'Offline drill apps for Calculus II and General Chemistry. A wrong answer gets a diagnosis of the specific mistake, and misses come back on a spaced schedule. 27 lessons dated to the lecture calendar.',
    stack: 'JavaScript · no dependencies',
    href: 'https://github.com/WilliamWest223/calctutor',
    linkLabel: 'Code',
  },
  {
    name: 'BrainRot StoryTutor',
    what: 'Turns study notes into narrated vertical video: a 1080×1920 canvas at 30 fps with captions. TF-IDF picks the story beats, so it works with no API keys.',
    stack: 'Next.js 14 · Canvas · MediaRecorder',
  },
  {
    name: 'The Algorithmic Horizon',
    what: 'One-page argument for proactive AI regulation, built for ENGL 102, with data charts and a Turing-test mini-game.',
    stack: 'HTML · CSS · JavaScript · Chart.js',
    href: 'https://airegulationadvocacy.vercel.app',
    linkLabel: 'Visit site',
  },
];

// Newest first, like a datasheet's revision table.
export const REVISIONS = [
  ['Sep 2026', 'CalcTutor & ChemTutor', 'Drill apps for this semester’s Calc II and Chem'],
  ['Jul 2026', 'Lewis Lawn Care', 'First paid client site, shipped to production'],
  ['Apr 2026', 'Party Town', 'Web + mobile on one Postgres backend'],
  ['Apr 2026', 'Blackboard → Notion agent', 'Has run nightly since'],
  ['Feb 2026', 'Interview Prep MM', '5-person team, 300 tests'],
  ['Jan 2026', 'BrainRot StoryTutor', 'Notes → narrated video'],
  ['Aug 2024', 'Started at USC', 'B.S. Computer Science'],
];
