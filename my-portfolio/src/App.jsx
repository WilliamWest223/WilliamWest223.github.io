import { useEffect, useRef, useState } from 'react';
import {
  MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform,
} from 'motion/react';
import {
  AGENT_LIVE_SINCE, AGENT_TZ, CODE, COURSES, DIAGRAMS, EMAIL, FLAGSHIPS, GITHUB, HERO_PROOF, INDEX,
  MAILTO, NIGHT_LOG, NIGHT_RUN, PICTURES, RESUME, TIMELINE, TOOLBOX,
} from './data';

const ext = { target: '_blank', rel: 'noopener noreferrer' };
const EASE = [0.22, 1, 0.36, 1];

// Wall-clock parts in the agent's timezone, so the counter matches the real 03:00 cron.
function agentClock(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: AGENT_TZ, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(now).map((p) => [p.type, p.value]),
  );
  const today = Date.UTC(+parts.year, +parts.month - 1, +parts.day);
  const since = Date.UTC(...AGENT_LIVE_SINCE.split('-').map((n, i) => +n - (i === 1 ? 1 : 0)));
  const mins = +parts.hour * 60 + +parts.minute;
  const ranToday = mins >= 180;
  const nights = Math.round((today - since) / 864e5) + (ranToday ? 1 : 0);
  const untilNext = ranToday ? 1440 - mins + 180 : 180 - mins;
  return { nights, h: Math.floor(untilNext / 60), m: untilNext % 60 };
}

function useAgentClock() {
  const [clock, setClock] = useState(() => agentClock());
  useEffect(() => {
    const id = setInterval(() => setClock(agentClock()), 30000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

// Entrance for the parts of a section: rises once as it enters, never stays hidden under reduced motion.
function Rise({ as = 'div', delay = 0, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

// Minimal highlighter for the quoted excerpts: comments, strings, keywords, numbers.
const KEYWORDS = {
  ts: 'const|let|new|await|return|if|typeof|this|type|async',
  js: 'const|let|new|await|return|if|typeof|this|async',
  sql: 'CREATE|POLICY|ON|FOR|UPDATE|TO|USING|WITH|CHECK|EXISTS|SELECT|FROM|WHERE|AND',
};
function highlight(code, lang) {
  const comment = lang === 'sql' ? '--[^\\n]*' : '\\/\\/[^\\n]*';
  const re = new RegExp(`(${comment})|('(?:[^'\\\\]|\\\\.)*'|"[^"]*"|\`[^\`]*\`)|\\b(${KEYWORDS[lang]})\\b|\\b(\\d+)\\b`, 'g');
  const out = [];
  let last = 0;
  for (const m of code.matchAll(re)) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] ? 'tk-c' : m[2] ? 'tk-s' : m[3] ? 'tk-k' : 'tk-n';
    out.push(<span key={m.index} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}

function Chrome({ title, children }) {
  return (
    <div className="win-bar">
      <span className="dots" aria-hidden="true"><i /><i /><i /></span>
      <span className="win-title">{title}</span>
      {children}
    </div>
  );
}

function Code({ file, lang, code, className = '' }) {
  return (
    <figure className={`win code ${className}`} data-ui>
      <Chrome title={file} />
      <pre><code>{highlight(code, lang)}</code></pre>
    </figure>
  );
}

function Terminal({ title, lines, className = '' }) {
  return (
    <figure className={`win term ${className}`} data-ui>
      <Chrome title={title} />
      <pre>{lines.map(([k, t], i) => (
        <span key={i} className={`ln ln-${k === '$' ? 'cmd' : k === 'ok' ? 'ok' : k === '!' ? 'warn' : 'out'}`}>
          <span className="ln-k">{k === 'ok' ? 'ok' : k}</span>{t}{'\n'}
        </span>
      ))}</pre>
    </figure>
  );
}

function Diagram({ d }) {
  const byId = Object.fromEntries(d.nodes.map((n) => [n.id, n]));
  return (
    <figure className="win diagram" data-ui>
      <svg viewBox="0 0 640 220" role="img" aria-label={d.label}>
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 8 4 0 8z" className="dg-head" />
          </marker>
        </defs>
        {d.edges.map(([a, b]) => {
          const s = byId[a]; const t = byId[b];
          const x1 = s.x + s.w; const y1 = s.y + 20; const x2 = t.x; const y2 = t.y + 20;
          const mx = (x1 + x2) / 2;
          return <path key={a + b} className="dg-edge" d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2 - 2} ${y2}`} markerEnd="url(#arrow)" />;
        })}
        {d.nodes.map((n) => (
          <g key={n.id} className={n.hot ? 'dg-node is-hot' : 'dg-node'}>
            <rect x={n.x} y={n.y} width={n.w} height="40" rx="7" />
            <text x={n.x + 12} y={n.y + 17} className="dg-t">{n.t}</text>
            <text x={n.x + 12} y={n.y + 32} className="dg-s">{n.s}</text>
          </g>
        ))}
      </svg>
      <figcaption>{d.note}</figcaption>
    </figure>
  );
}

function Browser({ k, eager }) {
  const p = PICTURES[k];
  const host = k === 'lawncare' ? 'lawncare-com-iota.vercel.app' : 'airegulationadvocacy.vercel.app';
  return (
    <figure className="win browser" data-ui>
      <Chrome title={host} />
      <img src={p.src} width={p.w} height={p.h} alt={p.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  );
}

function Bar() {
  return (
    <nav className="bar" aria-label="Sections">
      <a className="wordmark" href="#top"><span className="mark" aria-hidden="true" />William West</a>
      <span className="bar-links">
        <a href="#night">03:00 run</a>
        <a href="#work">Work</a>
        <a href="#index">Index</a>
        <a href="#about">About</a>
      </span>
      <a className="bar-action" href={RESUME} {...ext}>Résumé</a>
    </nav>
  );
}

function Hero({ clock }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const backY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -110]);
  return (
    <header className="hero" id="top" ref={ref}>
      <Bar />
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p className="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <span className="pulse" aria-hidden="true" />
            Jarvis live for {clock.nights} nights. Next run in {clock.h}h {clock.m}m.
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}>
            My code runs while I sleep.
          </motion.h1>
          <Rise as="p" className="lede" delay={0.15}>
            I’m William West, a CS junior at the University of South Carolina (May 2028). I build agents that
            run themselves at 03:00, sandboxes for untrusted code and sites for paying clients. Seeking Summer
            2027 SWE and AI internships.
          </Rise>
          <Rise className="actions" delay={0.25}>
            <a className="btn" href={RESUME} {...ext}>Open the résumé</a>
            <a className="btn btn-ghost" href={MAILTO}>{EMAIL}</a>
            <a className="link" href={GITHUB} {...ext}>GitHub ↗</a>
          </Rise>
          <Rise as="dl" className="proof" delay={0.35}>
            <div><dt>{clock.nights}</dt><dd>nights since the agent went live</dd></div>
            {HERO_PROOF.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
          </Rise>
        </div>
        <div className="hero-stack">
          <motion.div className="stack-back" style={{ y: backY }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
            <Code {...CODE.codegames[0]} />
          </motion.div>
          <motion.div className="stack-front" style={{ y: frontY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}>
            <Terminal
              title="codegames — test"
              lines={[
                ['$', 'npm test'],
                ['>', 'unit · every level solved in Python and JavaScript'],
                ['>', 'playwright e2e · security suites · DOM sink check'],
                ['ok', '1,500+ passed'],
              ]}
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
}

// The signature: one night of the Jarvis agent, typed out by the scroll while the terminal pins.
const LOG_LINES = NIGHT_LOG.flatMap((block, step) => block.map(([k, t]) => ({ k, t, step })));
const LOG_CHARS = LOG_LINES.reduce((n, l) => n + l.t.length, 0);

function NightRun({ clock }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? LOG_CHARS : 0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setTyped(Math.round(Math.min(1, v * 1.12) * LOG_CHARS));
  });
  const shown = reduce ? LOG_CHARS : typed;
  let left = shown;
  let active = 0;
  const lines = [];
  for (const l of LOG_LINES) {
    if (left <= 0) break;
    const n = Math.min(l.t.length, left);
    lines.push({ ...l, text: l.t.slice(0, n), done: n === l.t.length });
    left -= n;
    active = l.step;
  }
  return (
    <section className="night" id="night" ref={ref} aria-labelledby="night-title">
      <div className="night-pin">
        <h2 id="night-title" className="night-title">03:00. Nobody is awake.</h2>
        <figure className="win term run" data-ui aria-label="The Jarvis agent's nightly run, as a log">
          <Chrome title="jarvis — assignment-tracker">
            <span className="run-state">{shown >= LOG_CHARS ? 'exit 0' : 'running'}</span>
          </Chrome>
          <pre className="run-log">
            <span className="ln ln-dim">{`night ${clock.nights} since 2026-04-06 · next run in ${clock.h}h ${clock.m}m\n`}</span>
            {lines.map((l, i) => (
              <span key={i} className={`ln ln-${l.k === '$' ? 'cmd' : l.k === 'ok' ? 'ok' : l.k === '!' ? 'warn' : 'out'}`}>
                <span className="ln-k">{l.k}</span>{l.text}
                {!l.done && <span className="caret" aria-hidden="true" />}{'\n'}
              </span>
            ))}
            {shown === 0 && <span className="caret" aria-hidden="true" />}
          </pre>
          <div className="run-track" aria-hidden="true">
            {NIGHT_RUN.map((s, i) => <span key={s.head} className={lines.length && i <= active ? 'on' : undefined} />)}
          </div>
        </figure>
      </div>
      <ol className="night-steps">
        {NIGHT_RUN.map((s, i) => (
          <li key={s.head} className={lines.length && i === active ? 'step is-active' : 'step'}>
            <h3>{s.head}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Flagship({ f, flip }) {
  return (
    <article className={flip ? 'flagship is-flip' : 'flagship'} id={f.id} aria-labelledby={`${f.id}-name`}>
      <header className="fs-head">
        <Rise as="h3" id={`${f.id}-name`}>{f.name}</Rise>
        <Rise as="p" className="fs-meta" delay={0.06}>{f.date} · {f.fact}</Rise>
        <Rise as="p" className="fs-pitch" delay={0.1}>{f.pitch}</Rise>
      </header>
      <div className="fs-grid">
        <div className="case">
          <Rise as="p" delay={0.06}>{f.problem}</Rise>
          <Rise as="ul" className="built" delay={0.12}>{f.built.map((b) => <li key={b}>{b}</li>)}</Rise>
          <Rise className="case-call" delay={0.18}>
            <h4>The hard call</h4>
            <p>{f.decision}</p>
          </Rise>
          <Rise as="dl" className="case-numbers" delay={0.24}>
            {f.numbers.map(([k, v]) => <div key={k}><dt>{v}</dt><dd>{k}</dd></div>)}
          </Rise>
          <Rise as="p" delay={0.3}>{f.proof}</Rise>
          <p className="case-small">{f.stack}{f.note ? `. ${f.note}` : ''}</p>
          <p className="case-links">
            {f.links.map((l) => <a key={l.href} className="link" href={l.href} {...ext}>{l.label} ↗</a>)}
          </p>
        </div>
        <div className="artifacts">
          <Rise delay={0.1}><Diagram d={DIAGRAMS[f.art]} /></Rise>
          {CODE[f.art].map((c, i) => <Rise key={c.file} delay={0.18 + i * 0.08}><Code {...c} /></Rise>)}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <Rise as="h2" id="work-title" className="section-title">Three systems, built solo</Rise>
      {FLAGSHIPS.map((f, i) => <Flagship key={f.id} f={f} flip={i % 2 === 1} />)}
    </section>
  );
}

function Index() {
  const [active, setActive] = useState(INDEX[0].id);
  const current = INDEX.find((i) => i.id === active);
  return (
    <section className="index" id="index" aria-labelledby="index-title">
      <div className="index-pic" aria-live="polite">
        <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }}>
          {current.picture
            ? <Browser k={current.picture} />
            : <Terminal title={`${current.id} — facts`} lines={current.readout.map(([k, v]) => ['>', `${k.padEnd(13)}${v}`])} />}
        </motion.div>
      </div>
      <div className="index-list">
        <Rise as="h2" id="index-title" className="section-title">And the rest of the work</Rise>
        <ul>
          {INDEX.map((item) => (
            <motion.li
              key={item.id}
              className={item.id === active ? 'is-active' : undefined}
              onMouseEnter={() => setActive(item.id)}
              onFocus={() => setActive(item.id)}
              onViewportEnter={() => setActive(item.id)}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              tabIndex={-1}
            >
              <div className="row-head">
                <h3>{item.name}</h3>
                <span>{item.meta}</span>
              </div>
              <p>{item.body}</p>
              {item.links.length > 0 && (
                <p className="case-links">
                  {item.links.map((l) => <a key={l.href} className="link" href={l.href} {...ext}>{l.label} ↗</a>)}
                </p>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-copy">
        <Rise as="h2" id="about-title" className="section-title">Columbia, SC, class of 2028</Rise>
        <Rise as="p" className="about-lead" delay={0.06}>
          B.S. Computer Science at the University of South Carolina, a junior graduating May 2028.
          Coursework: {COURSES.join(', ')}.
        </Rise>
        <Rise as="ol" className="timeline" delay={0.12}>
          {TIMELINE.map(([when, what, detail]) => (
            <li key={when + what}>
              <span className="tl-when">{when}</span>
              <span className="tl-what">{what}</span>
              <span className="tl-detail">{detail}</span>
            </li>
          ))}
        </Rise>
      </div>
      <Rise as="dl" className="toolbox" delay={0.12}>
        {TOOLBOX.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </Rise>
    </section>
  );
}

function Footer() {
  return (
    <footer className="close" id="contact">
      <div className="close-top">
        <Rise as="h2" className="close-title">Summer 2027. Let’s build.</Rise>
        <Rise className="close-actions" delay={0.1}>
          <a className="btn" href={MAILTO}>Email William</a>
          <a className="link" href={GITHUB} {...ext}>GitHub ↗</a>
          <a className="link" href={RESUME} {...ext}>Résumé (PDF) ↗</a>
        </Rise>
      </div>
      <p className="fine">William West · {EMAIL} · Built with React, Vite and Motion.</p>
    </footer>
  );
}

export default function App() {
  const clock = useAgentClock();
  return (
    <MotionConfig reducedMotion="user">
      <Hero clock={clock} />
      <main>
        <NightRun clock={clock} />
        <Work />
        <Index />
        <About />
      </main>
      <Footer />
    </MotionConfig>
  );
}
