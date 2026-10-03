import { PINS } from './data';

// DIP-16 drawn top-view: pin 1 top-left, counting down the left side,
// then up the right side to pin 16 at top-right.
const BODY = { x: 180, y: 40, w: 160, h: 340 };
const PITCH = 40;
const FIRST = 80;
const STUB = 22;

function pinGeometry(n) {
  const left = n <= 8;
  const row = left ? n - 1 : 16 - n;
  const y = FIRST + row * PITCH;
  return left
    ? { y, x1: BODY.x - STUB, x2: BODY.x, labelX: BODY.x - STUB - 10, numX: BODY.x + 12, anchor: 'end', numAnchor: 'start' }
    : { y, x1: BODY.x + BODY.w, x2: BODY.x + BODY.w + STUB, labelX: BODY.x + BODY.w + STUB + 10, numX: BODY.x + BODY.w - 12, anchor: 'start', numAnchor: 'end' };
}

function Pin({ pin }) {
  const g = pinGeometry(pin.n);
  const cls = ['pin', pin.href && 'pin--link', pin.muted && 'pin--muted'].filter(Boolean).join(' ');
  const body = (
    <>
      <rect className="pin-leg" x={g.x1} y={g.y - 5} width={STUB} height={10} />
      <text className="pin-num" x={g.numX} y={g.y + 4} textAnchor={g.numAnchor}>{pin.n}</text>
      <text className="pin-label" x={g.labelX} y={g.y + 4} textAnchor={g.anchor}>
        {pin.label}{pin.href ? ' ↗' : ''}
      </text>
    </>
  );
  const style = { '--i': pin.n };
  if (!pin.href) return <g className={cls} style={style}>{body}</g>;
  const external = pin.href.startsWith('http') || pin.href.endsWith('.pdf');
  return (
    <a
      className={cls}
      style={style}
      href={pin.href}
      aria-label={`Pin ${pin.n}: ${pin.label.toLowerCase()}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <rect className="pin-hit" x={g.anchor === 'end' ? 40 : g.x1} y={g.y - 16} width={g.anchor === 'end' ? g.x2 - 40 : 480 - g.x1} height={32} />
      {body}
    </a>
  );
}

export default function Chip() {
  return (
    <figure className="chip">
      <svg viewBox="40 20 440 380" role="group" aria-labelledby="chip-caption">
        <rect className="chip-body" x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} rx="4" />
        <path className="chip-notch" d={`M ${BODY.x + BODY.w / 2 - 14} ${BODY.y} a 14 14 0 0 0 28 0`} />
        <circle className="chip-dot" cx={BODY.x + 16} cy={BODY.y + 18} r="4" />
        <g className="chip-marking" transform={`translate(${BODY.x + BODY.w / 2} ${BODY.y + BODY.h / 2}) rotate(-90)`}>
          <text className="chip-part" textAnchor="middle" y="-6">WW-2028</text>
          <text className="chip-sub" textAnchor="middle" y="18">USC · COLUMBIA SC</text>
        </g>
        {PINS.map((p) => <Pin key={p.n} pin={p} />)}
      </svg>
      <figcaption id="chip-caption">
        <span>Figure 1.</span> Pin configuration, top view. Pins 13–16 are links.
      </figcaption>
    </figure>
  );
}
