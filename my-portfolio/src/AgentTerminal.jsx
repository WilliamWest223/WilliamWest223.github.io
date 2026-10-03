import { useEffect, useRef, useState } from 'react';

// A macOS-style window that "replays" the Jarvis agent's nightly run.
// Lines appear one at a time on load; reduced motion shows them all at once.
const LINES = [
  { t: 'cmd', text: '$ jarvis --run nightly' },
  { t: 'dim', text: '03:00  agent waking · 5 courses queued' },
  { t: 'ok', text: 'chrome session authenticated  (Shibboleth SSO)' },
  { t: 'ok', text: 'gradebook scraped  ·  41 items' },
  { t: 'ok', text: 'reconciled vs Notion  ·  3 new assignments' },
  { t: 'ok', text: 'daily briefing written' },
  { t: 'ok', text: 'TLDR texted to operator' },
  { t: 'done', text: '✓ run complete in 42s' },
];

export default function AgentTerminal() {
  const reduce = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [count, setCount] = useState(reduce ? LINES.length : 0);
  const hostRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = hostRef.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      let i = 0;
      const next = () => {
        i += 1;
        setCount(i);
        if (i < LINES.length) {
          timer = setTimeout(next, i === 1 ? 500 : 620);
        }
      };
      let timer = setTimeout(next, 450);
      cleanup = () => clearTimeout(timer);
    }, { threshold: 0.35 });
    let cleanup = () => {};
    io.observe(el);
    return () => { io.disconnect(); cleanup(); };
  }, [reduce]);

  const done = count >= LINES.length;

  return (
    <figure className="term" ref={hostRef} aria-label="A replay of the nightly agent run">
      <div className="term-bar" aria-hidden="true">
        <span className="term-dots"><i /><i /><i /></span>
        <span className="term-title">jarvis@thinkpad · ~/agents</span>
        <span className={`term-live ${done ? 'is-done' : ''}`}>{done ? 'done' : 'live'}</span>
      </div>
      <div className="term-body">
        {LINES.slice(0, count).map((l, i) => (
          <p key={i} className={`term-line term-${l.t}`}>
            {l.t === 'ok' && <span className="term-check" aria-hidden="true">✓</span>}
            <span>{l.text}</span>
          </p>
        ))}
        {!done && <span className="term-cursor" aria-hidden="true" />}
      </div>
    </figure>
  );
}
