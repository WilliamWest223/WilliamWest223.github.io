import { useEffect, useRef, useState } from 'react';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Calls back once when the element first scrolls into view.
function useOnceVisible(ref, onVisible, threshold = 0.2) {
  const cb = useRef(onVisible);
  useEffect(() => { cb.current = onVisible; });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { cb.current(); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
}

export function CountUp({ value, format = (n) => n.toLocaleString('en-US') }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);
  const started = useRef(false);

  useOnceVisible(ref, () => {
    if (started.current) return;
    started.current = true;
    if (prefersReduced()) { setShown(value); return; }
    const t0 = performance.now();
    const dur = 1300;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setShown(Math.round(value * (1 - (1 - p) ** 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, 0.4);

  return (
    <span ref={ref} aria-label={format(value)}>
      <span aria-hidden="true">{format(shown)}</span>
    </span>
  );
}

export function Reveal({ className = '', children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useOnceVisible(ref, () => setInView(true), 0.12);
  return (
    <div ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} {...rest}>
      {children}
    </div>
  );
}

// Card whose border lights up where the pointer is.
export function Spotlight({ className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article className={`spot ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </article>
  );
}

export function Flow({ nodes }) {
  return (
    <ol className="flow" aria-label={`Data flow: ${nodes.join(', then ')}`}>
      {nodes.map((n, i) => (
        <li key={n} style={{ '--i': i }}>
          <span className="flow-node">{n}</span>
        </li>
      ))}
    </ol>
  );
}

export function TestGrid({ total, found }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useOnceVisible(ref, () => setRun(true), 0.35);
  // Spread the defect cells through the grid instead of bunching them.
  const marks = new Set(Array.from({ length: found }, (_, k) => Math.floor(((k + 0.5) / found) * total) + 7));
  return (
    <div ref={ref} className={`tests ${run ? 'is-run' : ''}`} role="img" aria-label={`${total} JUnit tests; ${found} surfaced real defects`}>
      <div className="tests-grid">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={marks.has(i) ? 'is-bug' : ''} style={{ '--i': i }} />
        ))}
      </div>
      <p className="tests-legend">
        <span><i className="dot" /> {total} tests</span>
        <span><i className="dot is-bug" /> {found} real defects found</span>
      </p>
    </div>
  );
}

export function Icon({ name }) {
  const paths = {
    github: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
    linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
    arrow: 'M7 17 17 7M9 7h8v8',
    copy: 'M9 9h10v10H9zM5 15V5h10',
    check: 'm5 12 4.5 4.5L19 7',
    close: 'M6 6l12 12M18 6 6 18',
    file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5',
  };
  const filled = name === 'github' || name === 'linkedin';
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}
