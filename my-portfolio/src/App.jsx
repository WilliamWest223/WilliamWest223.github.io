import { useEffect, useRef, useState } from 'react';
import AgentTerminal from './AgentTerminal';
import { Flow, Icon, Reveal, Spotlight, TestGrid } from './ui';
import {
  COURSES, EMAIL, FILTERS, GITHUB, HERO_FACTS, LINKEDIN, PROJECTS, RESUME, TIMELINE, TOOLBOX,
} from './data';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="nav-name" href="#top">William West</a>
      <nav aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-cta" href={RESUME} {...ext}>Résumé</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Open to SWE internships · Summer 2027
          </p>
          <h1>
            I build <em>AI agents</em> and the software they run on.
          </h1>
          <p className="hero-lede">
            I’m William West, a computer science junior at the University of South Carolina.
            I ship full-stack products, run language models on my own hardware, and write
            agents that keep working after I log off — like the one shown here, which files
            my coursework every night at 3 AM.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">See my work</a>
            <a className="btn btn-ghost" href={RESUME} {...ext}><Icon name="file" /> Résumé</a>
            <a className="btn-icon" href={GITHUB} {...ext} aria-label="GitHub"><Icon name="github" /></a>
            <a className="btn-icon" href={LINKEDIN} {...ext} aria-label="LinkedIn"><Icon name="linkedin" /></a>
          </div>
          <dl className="hero-facts">
            {HERO_FACTS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="hero-term">
          <AgentTerminal />
        </div>
      </div>
    </section>
  );
}

function Visual({ v, eager }) {
  if (v.type === 'shot') {
    return (
      <div className="shot">
        <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
        <img src={v.src} alt={v.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width="1200" height="750" />
      </div>
    );
  }
  if (v.type === 'flow') return <Flow nodes={v.nodes} />;
  if (v.type === 'tests') return <TestGrid total={v.total} found={v.found} />;
  return (
    <div className="stat-visual">
      <span>{v.value}</span>
      <small>{v.label}</small>
    </div>
  );
}

function ProjectCard({ p, onOpen, index }) {
  return (
    <Spotlight className={`card card-${p.size}`} style={{ '--d': `${(index % 3) * 70}ms` }}>
      <div className="card-visual"><Visual v={p.visual} /></div>
      <div className="card-body">
        <p className="card-kind">{p.kind} · {p.date}</p>
        <h3>
          <button type="button" className="card-open" onClick={() => onOpen(p)}>
            {p.name}
          </button>
        </h3>
        <p className="card-summary">{p.summary}</p>
        <div className="card-foot">
          <ul className="chips" aria-label="Stack">
            {p.stack.slice(0, p.size === 'third' ? 2 : 4).map((s) => <li key={s}>{s}</li>)}
          </ul>
          <span className="card-more" aria-hidden="true">Details <Icon name="arrow" /></span>
        </div>
      </div>
    </Spotlight>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {project && (
        <div className="dialog-inner">
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
          <p className="card-kind">{project.kind} · {project.date} · <span className="pill">{project.status}</span></p>
          <h2 id="dialog-title">{project.name}</h2>
          <p className="dialog-summary">{project.summary}</p>
          {project.visual.type === 'shot' && <div className="dialog-visual"><Visual v={project.visual} eager /></div>}
          <div className="dialog-grid">
            <div>
              <h3 className="mini-head">What I built</h3>
              <ul className="bullets">
                {project.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
            <aside>
              <h3 className="mini-head">By the numbers</h3>
              <dl className="specs">
                {project.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                <div><dt>Role</dt><dd>{project.role}</dd></div>
              </dl>
              <ul className="chips">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              {project.links.length > 0 && (
                <div className="dialog-links">
                  {project.links.map((l, i) => (
                    <a key={l.href} className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost-light'}`} href={l.href} {...ext}>
                      {l.label} <Icon name="arrow" />
                    </a>
                  ))}
                </div>
              )}
              {project.note && <p className="dialog-note">{project.note}</p>}
            </aside>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Work() {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const shown = PROJECTS.filter((p) => filter === 'all' || p.tags.includes(filter));
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-top">
        <div>
          <p className="kicker">Selected work</p>
          <h2 id="work-title">Things I’ve built and shipped</h2>
        </div>
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="count">
                {f.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(f.id)).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className={`grid ${filter === 'all' ? '' : 'is-filtered'}`} key={filter}>
        {shown.map((p, i) => <ProjectCard key={p.id} p={p} index={i} onOpen={setOpen} />)}
      </div>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <Reveal className="about-copy">
        <p className="kicker">About</p>
        <h2 id="about-title">I like knowing how things work one layer down.</h2>
        <p>
          I’m in my third year of computer science at USC. Two semesters of software engineering
          put me on real teams with real requirements: elicitation interviews, UML, feature
          branches, code review, and test suites that have to pass before anything merges.
        </p>
        <p>
          Lately I’ve been going deep on AI — building tool-using agents on MCP, running
          open-weight models on my own Linux box, and studying where both models and web apps
          break. I’d rather understand something by building it than only read about it.
        </p>
        <ul className="chips chips-lg" aria-label="Coursework">
          {COURSES.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </Reveal>
      <Reveal className="toolbox">
        <h3 className="mini-head">Toolbox</h3>
        <dl>
          {TOOLBOX.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <h3 className="mini-head">Timeline</h3>
        <ol className="timeline">
          {TIMELINE.map(([date, what, note]) => (
            <li key={date + what}>
              <time>{date}</time>
              <div><strong>{what}</strong><span>{note}</span></div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <p className="kicker kicker-dark">Contact</p>
        <h2 id="contact-title">Hiring for summer 2027? Let’s talk.</h2>
        <p className="contact-lede">
          Email is the fastest way to reach me. I’m happy to walk through any project here,
          including the private ones.
        </p>
        <div className="contact-actions">
          <button type="button" className="copy" onClick={copy}>
            <span className="copy-email">{EMAIL}</span>
            <span className="copy-label" aria-live="polite">
              <Icon name={copied ? 'check' : 'copy'} /> {copied ? 'Copied' : 'Copy'}
            </span>
          </button>
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Email me</a>
        </div>
        <ul className="contact-links">
          <li><a href={GITHUB} {...ext}><Icon name="github" /> GitHub</a></li>
          <li><a href={LINKEDIN} {...ext}><Icon name="linkedin" /> LinkedIn</a></li>
          <li><a href={RESUME} {...ext}><Icon name="file" /> Résumé (PDF)</a></li>
        </ul>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} William West</span>
        <span>Built with React and Vite · Columbia, SC</span>
      </footer>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
