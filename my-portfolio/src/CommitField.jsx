import { useEffect, useRef } from 'react';

// A GitHub-style contribution grid drawn on canvas. Cells near the pointer light up,
// and a slow diagonal wave passes through. Static when reduced motion is requested.
const CELL = 13;
const GAP = 5;
const STEP = CELL + GAP;
const RADIUS = 170;

function seeded(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function CommitField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    const target = { x: -1e4, y: -1e4 };
    const mouse = { x: -1e4, y: -1e4 };
    let w = 0, h = 0, cols = 0, rows = 0, base = new Float32Array(0);
    let raf = 0, visible = true;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / STEP) + 1;
      rows = Math.ceil(h / STEP) + 1;
      base = new Float32Array(cols * rows);
      for (let i = 0; i < base.length; i++) {
        const r1 = seeded(i + 7);
        base[i] = r1 > 0.85 ? (r1 - 0.85) / 0.15 : 0;
      }
      draw(performance.now());
    }

    function draw(now) {
      const t = (now - start) / 1000;
      mouse.x += (target.x - mouse.x) * 0.18;
      mouse.y += (target.y - mouse.y) * 0.18;
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const cx = x * STEP + CELL / 2;
          const cy = y * STEP + CELL / 2;
          const d = Math.hypot(cx - mouse.x, cy - mouse.y);
          const near = d < RADIUS ? (1 - d / RADIUS) ** 1.6 : 0;
          const wave = reduce ? 0 : Math.max(0, Math.sin(x * 0.16 + y * 0.09 - t * 0.9)) ** 14;
          const v = Math.min(1, base[i] * 0.38 + wave * 0.28 + near);
          ctx.fillStyle = v < 0.04
            ? 'rgba(148, 163, 214, 0.06)'
            : `rgba(245, 165, 36, ${0.06 + v * 0.8})`;
          ctx.beginPath();
          ctx.roundRect(x * STEP, y * STEP, CELL, CELL, 3);
          ctx.fill();
        }
      }
    }

    function loop(now) {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (reduce) { mouse.x = target.x; mouse.y = target.y; draw(performance.now()); }
    }
    function onLeave() {
      target.x = -1e4; target.y = -1e4;
      if (reduce) { mouse.x = target.x; mouse.y = target.y; draw(performance.now()); }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="commit-field" aria-hidden="true" />;
}
