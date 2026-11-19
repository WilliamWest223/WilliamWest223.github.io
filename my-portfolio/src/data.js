// Single place to update site content. Mirrors ~/resume/data/profile.json.
// Every number here is a fact from that file; framing may be bold, numbers may not move.
import lawncareShot from './assets/lawncare.jpg';
import horizonShot from './assets/horizon.jpg';

export const RESUME = '/William_West_Resume.pdf';
export const EMAIL = 'wwest0708@gmail.com';
export const GITHUB = 'https://github.com/WilliamWest223';
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Summer 2027 internship')}`;

// The Jarvis agent's first scheduled run; the page counts nights since.
export const AGENT_LIVE_SINCE = '2026-04-06';
// The agent's cron fires at 03:00 Columbia, SC time.
export const AGENT_TZ = 'America/New_York';

// Real screenshots of shipped sites, shown inside browser frames.
export const PICTURES = {
  lawncare: { src: lawncareShot, w: 1200, h: 750, alt: 'Lewis Lawn Care home page: a dark green hero reading “Lawns worth lingering on.” with quote and booking buttons' },
  horizon: { src: horizonShot, w: 1200, h: 750, alt: 'The Algorithmic Horizon title page with a serif headline and a dot-grid illustration' },
};

// Hero proof. `nights` is computed live from AGENT_LIVE_SINCE.
export const HERO_PROOF = [
  ['1,500+', 'automated tests in one solo project'],
  ['476', 'game levels across Python and JavaScript'],
  ['1', 'paying client, site live in production'],
];

// The signature sequence: one night of the Jarvis agent, in order.
export const NIGHT_RUN = [
  { head: 'Cron wakes the agent', body: 'No one is awake to press run. A schedule fires, and a Model Context Protocol skill starts deciding what to do next, step by step, instead of replaying fixed clicks.' },
  { head: 'It works inside my Chrome', body: 'University SSO (Shibboleth) rules out headless scraping, so the agent drives my own already-signed-in Chrome session over MCP. It never stores, types or sees a credential.' },
  { head: 'It reads five gradebooks', body: 'For each of 5 tracked courses it reads the Blackboard gradebook API straight from the page and pulls every assignment and due date.' },
  { head: 'It reconciles, not overwrites', body: 'A real delta against my Notion database, matched by name and due date. Pages that already hold my hand-written notes are never touched.' },
  { head: 'It reports, or it stops', body: 'A briefing is waiting when I wake. On an expired session or any unrecoverable error it texts me over iMessage and halts, with a hard guard against ever attempting a login.' },
];

// Flagship case studies, shown inline in full.
export const FLAGSHIPS = [
  {
    id: 'codegames',
    name: 'CodeGames',
    pitch: 'A browser-side code execution sandbox wrapped in a game.',
    date: 'Oct 2026 – now',
    fact: 'Pre-launch',
    art: 'codegames',
    problem: 'Teaching Python and JavaScript means running code a stranger typed. CodeGames runs it in the browser, where the code is the game, and keeps progress on the device unless the learner signs in to sync.',
    built: [
      '238 levels in each of Python and JavaScript, plus a 13-level DOM side quest and a 13-level defensive-security side quest.',
      'Offline-first: progress is local by default, with optional cross-device sync through Supabase magic-link or one-time-code sign-in.',
    ],
    decision: 'Untrusted learner code never touches a server. JavaScript runs in isolated Web Workers; Python runs in Pyodide (WebAssembly) with per-run memory isolation and an interrupt buffer that kills runaway loops.',
    numbers: [['Levels', '476 + 26 side-quest'], ['Automated tests', '1,500+'], ['Server-side execution', 'None']],
    proof: '1,500+ automated tests, including one that solves every level in both languages, Playwright e2e and security suites, and a CI check that fails the build on forbidden DOM and storage sinks.',
    stack: 'TypeScript, React, Vite, Pyodide, Web Workers, Supabase, Playwright, Vitest',
    links: [{ label: 'Read the code', href: 'https://github.com/WilliamWest223/codegames' }],
    note: 'Public mirror of a private dev repo. Not launched yet: custom domain and launch are pending.',
  },
  {
    id: 'jarvis',
    name: 'Jarvis',
    pitch: 'Autonomous agent infrastructure that runs unattended every night.',
    date: 'Apr 2026 – now',
    fact: 'Daily at 03:00',
    art: 'jarvis',
    problem: 'Five courses, one LMS behind university SSO, and assignments scattered across it. I wanted the state of my semester reconciled before I wake up, without handing a bot my password.',
    built: [
      'An MCP skill: a tool-using agent that chooses its next step, not a one-off script.',
      'A Notion sync that diffs by name and due date and leaves hand-written notes alone.',
    ],
    decision: 'Shibboleth SSO rules out headless scraping, and storing credentials was off the table. So the agent works inside my own signed-in Chrome over MCP and reads the gradebook API from the page. It fails safe: on any unrecoverable error it texts me and stops.',
    numbers: [['Courses tracked', '5'], ['Schedule', 'Daily · 03:00'], ['Runs', 'Unattended']],
    proof: 'Scheduled nightly at 03:00 since April 6, 2026.',
    stack: 'Python, MCP, Chrome automation, Notion API, iMessage, cron',
    links: [{ label: 'Read the code', href: 'https://github.com/WilliamWest223/jarvis-study-agent' }],
    note: 'The public repo is a sanitized template; the live setup stays private.',
  },
  {
    id: 'party-town',
    name: 'Party Town',
    pitch: 'A multi-tenant platform with database-enforced access control.',
    date: 'Apr 2026',
    fact: 'Web + mobile',
    art: 'party-town',
    problem: 'A campus-events platform has students, venues and admins who must never see each other’s data, across a web app and a native mobile app.',
    built: [
      'One TypeScript monorepo ships a Next.js web app and an Expo mobile app against a single Supabase Postgres database.',
      'Shared types generated from the schema keep both clients in lock-step.',
    ],
    decision: 'Access control lives in the database, not the UI. Student, venue and admin tiers are enforced with Postgres Row Level Security, and a chaos-test suite attacks that boundary on purpose.',
    numbers: [['TypeScript', '9,524 lines'], ['Source files', '92'], ['SQL migrations', '6']],
    proof: 'The database itself refuses to leak data a role should not see.',
    stack: 'TypeScript, Next.js 16, React Native (Expo), Supabase, Postgres, Vitest',
    links: [{ label: 'Read the code', href: 'https://github.com/WilliamWest223/partytown' }],
  },
];

// The rest of the work. `picture` keys into PICTURES; `readout` is shown when there is no screenshot.
export const INDEX = [
  {
    id: 'lewis-lawn-care', name: 'Lewis Lawn Care', meta: 'Paid client · Jul 2026', picture: 'lawncare',
    body: 'Marketing and booking site shipped solo for a paying lawn-care client in Columbia, SC: instant-quote calculator, a booking flow whose server rejects double-bookings, and a password-protected admin dashboard. 1,487 lines, 7 pages, 5 API routes.',
    links: [{ label: 'Visit site', href: 'https://lawncare-com-iota.vercel.app' }, { label: 'Code', href: 'https://github.com/WilliamWest223/lawncare.com' }],
  },
  {
    id: 'method-men', name: 'Interview Prep MM', meta: '5-person team · 2026', readout: [['tests', '300'], ['java', '11,816 lines'], ['commits', '212 (team)'], ['team', '5 people']],
    body: 'Technical-interview practice platform, CSCE 247. I authored the core domain model the team built on; my JUnit suites caught three real defects before the demo. 300 tests, 11,816 lines of Java, 212 team commits.',
    links: [{ label: 'Watch demo', href: 'https://youtu.be/7nblbT_5eB0' }, { label: 'Code', href: 'https://github.com/WilliamWest223/method_men_interview_prep' }],
  },
  {
    id: 'local-video', name: 'Notes-to-video engine', meta: 'Local-first AI · 2025', readout: [['llm', 'Llama 3.1 via Ollama'], ['image', 'Stable Diffusion'], ['voice', 'XTTS v2'], ['video', 'MoviePy'], ['cloud calls', '0']],
    body: 'Four-stage pipeline that turns study notes into a narrated video with zero cloud calls: Llama 3.1 via Ollama, Stable Diffusion, XTTS v2 and MoviePy behind FastAPI, with LLM output forced into validated JSON.',
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/notes-to-video' }],
  },
  {
    id: 'llm-lab', name: 'LLM security lab', meta: 'Self-directed · 2026', readout: [['host', 'ThinkPad, Linux'], ['models', 'open-weight, local'], ['tests', 'prompt injection, jailbreaks'], ['targets', 'CTF and owned only']],
    body: 'A ThinkPad reflashed to Linux running open-weight models locally. I write prompt-injection and jailbreak tests to map where guardrails hold, and practise web-app pentesting on CTF and owned, authorized targets only.',
    links: [],
  },
  {
    id: 'horizon', name: 'Algorithmic Horizon', meta: 'ENGL 102 · Apr 2026', picture: 'horizon',
    body: 'One-page argument for proactive AI regulation with lazy-loaded Chart.js data, a job-risk analyzer and a Turing-test game, in vanilla JavaScript with no build step.',
    links: [{ label: 'Visit site', href: 'https://airegulationadvocacy.vercel.app' }],
  },
  {
    id: 'calctutor', name: 'CalcTutor & ChemTutor', meta: 'Zero dependencies · Sep 2026', readout: [['lessons', '27'], ['dependencies', '0'], ['network', 'offline']],
    body: 'Offline drill apps for Calc II and Chem that diagnose the exact mistake behind a wrong answer and resurface it on a spaced schedule. 27 lessons dated to the live lecture calendar.',
    links: [{ label: 'Code', href: 'https://github.com/WilliamWest223/calctutor' }],
  },
  {
    id: 'brainrot', name: 'BrainRot StoryTutor', meta: 'Browser-native · Jan 2026', readout: [['canvas', '1080×1920'], ['frame rate', '30 fps'], ['beats', 'TF-IDF, no LLM required']],
    body: 'Short-form study clips rendered client-side on a 1080×1920 canvas at 30 fps. A TF-IDF pipeline pulls story beats and captions with no LLM required; LLM and neural voice are optional upgrades.',
    links: [],
  },
];

export const TOOLBOX = [
  ['AI and agents', 'MCP, Anthropic and OpenAI APIs, local LLMs (Ollama, Llama), prompt engineering, RAG and TF-IDF'],
  ['Security', 'Web-app pentesting, LLM red-teaming, jailbreak and prompt-injection testing'],
  ['Languages', 'Java, TypeScript, Python, C++, SQL, Bash'],
  ['Frameworks', 'React, Next.js, React Native (Expo), Node/Express, FastAPI, JavaFX'],
  ['Data', 'Postgres, Supabase (RLS), SQLite, Prisma'],
  ['Browser runtime', 'Pyodide / WebAssembly, Web Workers'],
  ['Testing and ops', 'JUnit 5, Vitest, Playwright, Git branching, Vercel'],
];

export const COURSES = [
  'Software Engineering', 'Advanced Programming (C++)', 'Data Structures',
  'Unix/Linux', 'Digital Logic', 'Computer Security',
];

// Newest first.
export const TIMELINE = [
  ['Oct 2026', 'CodeGames', 'Browser sandbox for learning Python and JavaScript, 1,500+ tests'],
  ['Sep 2026', 'CalcTutor & ChemTutor', 'Drill apps for this semester’s Calc II and Chem'],
  ['Jul 2026', 'Lewis Lawn Care', 'First paid client site, shipped to production'],
  ['Apr 2026', 'Party Town + Jarvis', 'Web + mobile on one backend; the agent has run nightly since'],
  ['Feb 2026', 'Interview Prep MM', '5-person team, 300 tests'],
  ['2025', 'Notes-to-video engine', 'Full generative stack on my own hardware'],
  ['Aug 2024', 'Started at USC', 'B.S. Computer Science, expected May 2028'],
];

// The 03:00 run as a log, one block per NIGHT_RUN step. Paths and calls come from the skill file
// (jarvis-study-agent/skill/assignment-tracker.md); no counts beyond the facts above.
export const NIGHT_LOG = [
  [['$', 'cron 0 3 * * *  →  claude skill assignment-tracker'], ['ok', 'agent awake · no human watching']],
  [['>', 'mcp chrome: tabs_context_mcp { createIfEmpty: true }'], ['>', 'navigate <BLACKBOARD_BASE_URL>/ultra/course'], ['ok', 'session already signed in · no credentials handled']],
  [['>', 'GET /learn/api/public/v2/courses/{id}/gradebook/columns?limit=200'], ['ok', '5 courses read from inside the page']],
  [['>', 'notion: diff by name + due date'], ['ok', 'new rows added · pages with notes left untouched']],
  [['ok', 'daily briefing written'], ['!', 'on expired session: iMessage operator, then stop']],
];

// Short excerpts quoted verbatim from the real repos (file paths in `file`).
export const CODE = {
  codegames: [
    {
      file: 'apps/web/src/engine/host.ts', lang: 'ts', code:
`this.interrupt = new Int32Array(new SharedArrayBuffer(4));
worker.postMessage({ type: 'interrupt-buffer', buffer: this.interrupt });

// Ask Python to stop (SIGINT); keep the worker if it answers in time.
Atomics.store(interrupt, 0, 2);`,
    },
    {
      file: 'apps/web/src/engine/py.worker.ts', lang: 'ts', code:
`if (message.type === 'interrupt-buffer') {
  // Python checks this flag while it runs: the host sets it to 2 (SIGINT) to stop a runaway loop.
  (await pyodide).setInterruptBuffer(message.buffer);
  return;
}`,
    },
  ],
  jarvis: [
    {
      file: 'skill/assignment-tracker.md', lang: 'js', code:
`const layout = document.querySelector('bb-base-layout');
const $http = angular.element(layout).injector().get('$http');
Promise.all(courses.map(c =>
  $http.get(\`/learn/api/public/v2/courses/\${c.id}/gradebook/columns?limit=200&fields=id,name,due,grading\`)
    .then(r => ({ ...c, items: r.data.results || [] }))
    .catch(() => ({ ...c, items: [] }))
)).then(r => { window.__gradebook = r; });`,
    },
  ],
  'party-town': [
    {
      file: 'supabase/migrations/20260410020359_initial_schema.sql', lang: 'sql', code:
`CREATE POLICY "orgs_update_own"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "orgs_update_verification_admin"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );`,
    },
  ],
};

// Architecture diagrams: nodes on a 640×220 canvas, edges by node id. `hot` marks the boundary that matters.
export const DIAGRAMS = {
  codegames: {
    label: 'CodeGames runtime: learner code never leaves the browser',
    nodes: [
      { id: 'ed', x: 20, y: 90, w: 130, t: 'Editor', s: 'learner code' },
      { id: 'host', x: 230, y: 90, w: 150, t: 'Host', s: 'nonce · timeout' },
      { id: 'js', x: 470, y: 30, w: 150, t: 'Web Worker', s: 'JavaScript', hot: true },
      { id: 'py', x: 470, y: 150, w: 150, t: 'Pyodide worker', s: 'Python · WASM', hot: true },
    ],
    edges: [['ed', 'host'], ['host', 'js'], ['host', 'py']],
    note: 'server-side execution: none',
  },
  jarvis: {
    label: 'Jarvis nightly run: cron to agent to signed-in Chrome to Notion',
    nodes: [
      { id: 'cron', x: 20, y: 90, w: 110, t: 'cron', s: '03:00 daily' },
      { id: 'mcp', x: 170, y: 90, w: 130, t: 'MCP skill', s: 'chooses next step' },
      { id: 'chrome', x: 340, y: 30, w: 140, t: 'Chrome', s: 'already signed in', hot: true },
      { id: 'bb', x: 500, y: 30, w: 120, t: 'Blackboard', s: 'gradebook API' },
      { id: 'notion', x: 340, y: 150, w: 140, t: 'Notion', s: 'diff, not overwrite' },
      { id: 'imsg', x: 500, y: 150, w: 120, t: 'iMessage', s: 'on error: stop' },
    ],
    edges: [['cron', 'mcp'], ['mcp', 'chrome'], ['chrome', 'bb'], ['mcp', 'notion'], ['notion', 'imsg']],
    note: 'credentials stored: none',
  },
  'party-town': {
    label: 'Party Town: two clients, one database that enforces every role',
    nodes: [
      { id: 'web', x: 20, y: 30, w: 150, t: 'Next.js web', s: 'students · venues' },
      { id: 'app', x: 20, y: 150, w: 150, t: 'Expo mobile', s: 'React Native' },
      { id: 'types', x: 245, y: 90, w: 150, t: 'Shared types', s: 'generated from schema' },
      { id: 'db', x: 470, y: 90, w: 150, t: 'Postgres RLS', s: 'student · venue · admin', hot: true },
    ],
    edges: [['web', 'types'], ['app', 'types'], ['types', 'db']],
    note: 'access control lives in the database',
  },
};
