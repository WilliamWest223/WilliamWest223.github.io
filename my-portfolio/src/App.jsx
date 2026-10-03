import Chip from './Chip';
import { EMAIL, FEATURES, GITHUB, LINKEDIN, PROJECTS, RESUME, REVISIONS, SMALLER } from './data';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-id">
        <span className="mono">WW-2028</span>
        <span className="masthead-title">William West</span>
      </div>
      <nav aria-label="Sections">
        <a href="#projects">Projects</a>
        <a href="#history">History</a>
        <a href="#contact">Contact</a>
        <a href={RESUME} {...ext}>Résumé</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="name">
      <div className="hero-copy">
        <h1 id="name">William<br />West</h1>
        <p className="hero-spec mono">Computer science, University of South Carolina, class of 2028</p>
        <p className="hero-lede">
          I build full-stack software and the tests that keep it honest. So far: a booking site
          for a paying client, a campus app with web and mobile clients on one Postgres backend,
          and an agent that has filed my coursework into Notion every night since April.
        </p>
        <p className="availability">
          <mark>Available</mark> Software engineering internship, summer 2027
        </p>
        <div className="actions">
          <a className="btn btn--solid" href={`mailto:${EMAIL}`}>Email me</a>
          <a className="btn" href={RESUME} {...ext}>Download résumé (PDF)</a>
        </div>
      </div>
      <Chip />
    </section>
  );
}

function SectionHead({ id, children, note }) {
  return (
    <div className="section-head">
      <h2 id={id}>{children}</h2>
      {note && <span className="mono">{note}</span>}
    </div>
  );
}

function Overview() {
  return (
    <section className="overview" aria-labelledby="features">
      <div>
        <SectionHead id="features">Features</SectionHead>
        <ul className="features">
          {FEATURES.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
      <div>
        <SectionHead id="description">Description</SectionHead>
        <div className="description">
          <p>
            I’m a junior at USC studying computer science. Coursework so far: software engineering
            (two semesters of team projects with real requirements, UML, and code review), C++ down
            to manual memory management, data structures, Unix, digital logic, and computer security.
          </p>
          <p>
            Outside class I build things I actually use, which is how most of the projects below
            started. I like knowing how a system works one layer under the code I’m writing, and
            I’d rather ship something small and real than describe something big.
          </p>
        </div>
      </div>
    </section>
  );
}

function Project({ p }) {
  return (
    <article className="project" aria-labelledby={p.id}>
      <header className="project-head">
        <div>
          <h3 id={p.id}>{p.name}</h3>
          <p className="project-summary">{p.summary}</p>
        </div>
        <dl className="project-meta mono">
          <div><dt>Type</dt><dd>{p.kind}</dd></div>
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Date</dt><dd>{p.date}</dd></div>
          <div><dt>Status</dt><dd><span className="status">{p.status}</span></dd></div>
        </dl>
      </header>
      <div className="project-body">
        <div>
          <ul className="bullets">
            {p.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <p className="stack mono">{p.stack.join(' · ')}</p>
        </div>
        <div className="project-side">
          <table className="specs">
            <caption>Characteristics</caption>
            <tbody>
              {p.specs.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
          {p.links.length > 0 && (
            <p className="links">
              {p.links.map((l) => <a key={l.href} href={l.href} {...ext}>{l.label} ↗</a>)}
            </p>
          )}
          {p.note && <p className="note">{p.note}</p>}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects" aria-labelledby="projects">
      <SectionHead id="projects" note={`${PROJECTS.length} featured`}>Projects</SectionHead>
      {PROJECTS.map((p) => <Project key={p.id} p={p} />)}

      <h3 className="smaller-title">Smaller builds</h3>
      <ul className="smaller">
        {SMALLER.map((s) => (
          <li key={s.name}>
            <div>
              <h4>{s.name}</h4>
              <p>{s.what}</p>
            </div>
            <p className="mono">{s.stack}</p>
            {s.href ? <a href={s.href} {...ext}>{s.linkLabel} ↗</a> : <span className="mono muted">No public link</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function History() {
  return (
    <section aria-labelledby="history">
      <SectionHead id="history" note="Newest first">Revision history</SectionHead>
      <table className="revisions">
        <thead>
          <tr><th scope="col">Date</th><th scope="col">Change</th><th scope="col">Notes</th></tr>
        </thead>
        <tbody>
          {REVISIONS.map(([d, what, notes]) => (
            <tr key={d + what}><td className="mono">{d}</td><td>{what}</td><td>{notes}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Contact() {
  const rows = [
    ['Email', EMAIL, `mailto:${EMAIL}`, 'Fastest way to reach me'],
    ['GitHub', 'WilliamWest223', GITHUB, 'Public code for the projects above'],
    ['LinkedIn', 'william-west', LINKEDIN, ''],
    ['Résumé', 'One-page PDF', RESUME, 'Updated September 2026'],
  ];
  return (
    <section className="contact" aria-labelledby="contact">
      <SectionHead id="contact">Contact</SectionHead>
      <p className="contact-lede">
        I’m looking for a software engineering internship for summer 2027, and I’m glad to talk
        through any project here in more depth.
      </p>
      <table className="ordering">
        <tbody>
          {rows.map(([k, label, href, note]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>
                <a href={href} {...(href.startsWith('mailto') ? {} : ext)}>{label}</a>
              </td>
              <td className="muted">{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function App() {
  return (
    <div className="sheet">
      <a className="skip" href="#projects">Skip to projects</a>
      <Masthead />
      <main>
        <Hero />
        <Overview />
        <Projects />
        <History />
        <Contact />
      </main>
      <footer className="footer mono">
        <span>© {new Date().getFullYear()} William West</span>
        <span>React + Vite · set in Archivo, Hanken Grotesk and IBM Plex Mono</span>
      </footer>
    </div>
  );
}
