import { useEffect, useRef, useState } from 'react';
import {
  MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform,
} from 'motion/react';
import {
  AGENT_LIVE_SINCE, AGENT_TZ, COURSES, EMAIL, FLAGSHIPS, GITHUB, HERO_PROOF, INDEX, MAILTO,
  NIGHT_RUN, PICTURES, RESUME, TIMELINE, TOOLBOX,
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

function Pic({ k, className, eager, style }) {
  const p = PICTURES[k];
  return (
    <motion.img
      className={className}
      src={p.src} width={p.w} height={p.h} alt={p.alt}
      loading={eager ? 'eager' : 'lazy'} decoding="async" style={style}
    />
  );
}

function Hero({ clock }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.14, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-photo" aria-hidden="true">
        <Pic k="racks" eager style={{ scale, y }} />
      </div>
      <nav className="bar" aria-label="Sections">
        <a className="wordmark" href="#top">William West</a>
        <span className="bar-links">
          <a href="#night">The 03:00 run</a>
          <a href="#work">Work</a>
          <a href="#index">Index</a>
          <a href="#about">About</a>
        </span>
        <a className="bar-action" href={RESUME} {...ext}>Résumé</a>
      </nav>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <h1 className="card-title"><span>William</span> <span>West</span></h1>
        <Rise className="card-facts" delay={0.15}>
          <p>CS at the University of South Carolina, May 2028</p>
          <p>Seeking Summer 2027 SWE and AI internships</p>
          <p>Columbia, SC</p>
        </Rise>
        <Rise as="p" className="card-statement" delay={0.25}>
          I build software that keeps working after I log off: an agent that runs itself at 03:00,
          a sandbox for untrusted code, and sites for paying clients.
        </Rise>
        <Rise as="dl" className="proof" delay={0.35}>
          <div><dt>{clock.nights}</dt><dd>nights since the agent went live</dd></div>
          {HERO_PROOF.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
        </Rise>
        <Rise className="card-actions" delay={0.45}>
          <a className="btn" href={RESUME} {...ext}>Open the résumé</a>
          <a className="link" href={MAILTO}>{EMAIL}</a>
          <a className="link" href={GITHUB} {...ext}>GitHub</a>
        </Rise>
      </motion.div>
    </header>
  );
}

// The signature: one night of the Jarvis agent. The clock pins while the steps of the run pass.
function NightRun({ clock }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const clockScale = useTransform(scrollYProgress, [0, 0.2, 1], reduce ? [1, 1, 1] : [0.88, 1, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(NIGHT_RUN.length - 1, Math.max(0, Math.floor(v * NIGHT_RUN.length))));
  });
  return (
    <section className="night" id="night" ref={ref} aria-labelledby="night-title">
      <div className="night-pin">
        <h2 id="night-title" className="sr-only">While you sleep, it runs</h2>
        <motion.p className="clock" aria-label="03:00, when the agent runs" style={{ scale: clockScale }}>
          03:00
        </motion.p>
        <div className="night-meta">
          <p className="night-now" aria-live="polite">
            <motion.span key={active} initial={reduce ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>
              {NIGHT_RUN[active].head}
            </motion.span>
          </p>
          <div className="track" aria-hidden="true"><motion.span style={{ scaleX: reduce ? 1 : fill }} /></div>
          <p className="night-count">Night {clock.nights} since launch. Next run in {clock.h}h {clock.m}m.</p>
        </div>
      </div>
      <ol className="night-steps">
        {NIGHT_RUN.map((s) => <Step key={s.head} step={s} reduce={reduce} />)}
      </ol>
    </section>
  );
}

function Step({ step, reduce }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  return (
    <li className="step" ref={ref}>
      <motion.div style={{ y, scale }}>
        <h3>{step.head}</h3>
        <p>{step.body}</p>
      </motion.div>
    </li>
  );
}

function Flagship({ f }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);
  return (
    <article className="flagship" id={f.id} aria-labelledby={`${f.id}-name`}>
      <figure className="panel" ref={ref}>
        <Pic k={f.picture} style={{ y }} />
        <figcaption className="panel-row">
          <span>{f.date}</span>
          <h3 id={`${f.id}-name`}>{f.name}</h3>
          <span>{f.fact}</span>
        </figcaption>
      </figure>
      <div className="case">
        <Rise as="p" className="case-pitch">{f.pitch}</Rise>
        <div className="case-body">
          <Rise as="p" delay={0.06}>{f.problem}</Rise>
          <Rise as="ul" delay={0.12}>{f.built.map((b) => <li key={b}>{b}</li>)}</Rise>
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
            {f.links.map((l) => <a key={l.href} className="link" href={l.href} {...ext}>{l.label}</a>)}
          </p>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <Rise as="h2" id="work-title" className="section-title">Three systems, built solo</Rise>
      {FLAGSHIPS.map((f) => <Flagship key={f.id} f={f} />)}
    </section>
  );
}

function Index() {
  const [active, setActive] = useState(INDEX[0].id);
  const current = INDEX.find((i) => i.id === active);
  return (
    <section className="index" id="index" aria-labelledby="index-title">
      <div className="index-pic" aria-hidden="true">
        <motion.div key={current.picture} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Pic k={current.picture} />
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
                  {item.links.map((l) => <a key={l.href} className="link" href={l.href} {...ext}>{l.label}</a>)}
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
      <figure className="about-pic">
        <Pic k="horseshoe" />
      </figure>
      <div className="about-copy">
        <Rise as="h2" id="about-title" className="section-title">Columbia, SC, class of 2028</Rise>
        <Rise as="p" className="about-lead" delay={0.06}>
          B.S. Computer Science at the University of South Carolina, a junior graduating May 2028.
          Coursework: {COURSES.join(', ')}.
        </Rise>
        <Rise as="dl" className="toolbox" delay={0.12}>
          {TOOLBOX.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </Rise>
      </div>
      <Rise as="ol" className="timeline">
        {TIMELINE.map(([when, what, detail]) => (
          <li key={when + what}>
            <span className="tl-when">{when}</span>
            <span className="tl-what">{what}</span>
            <span className="tl-detail">{detail}</span>
          </li>
        ))}
      </Rise>
    </section>
  );
}

function Footer() {
  const credits = Object.values(PICTURES).filter((p) => p.credit);
  return (
    <footer className="close" id="contact">
      <div className="close-top">
        <div>
          <Rise as="h2" className="close-title">Summer 2027. Let’s build.</Rise>
          <Rise delay={0.1}><a className="btn btn-inverse" href={MAILTO}>Email William</a></Rise>
        </div>
        <Rise as="ul" className="close-links" delay={0.15}>
          <li><a className="link" href={MAILTO}>{EMAIL}</a></li>
          <li><a className="link" href={GITHUB} {...ext}>GitHub</a></li>
          <li><a className="link" href={RESUME} {...ext}>Résumé (PDF)</a></li>
        </Rise>
      </div>
      <p className="credits">
        Pictures, shown as the world around the work:{' '}
        {credits.map((p, i) => (
          <span key={p.credit.page}>
            <a href={p.credit.page} {...ext}>“{p.credit.title}”</a> by {p.credit.by},{' '}
            <a href={p.credit.licenseUrl} {...ext}>{p.credit.license}</a>{i < credits.length - 1 ? '; ' : '.'}
          </span>
        ))}
      </p>
      <p className="wordmark-big" aria-hidden="true">William West</p>
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
