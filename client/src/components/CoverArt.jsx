import { useMemo } from 'react';

// Deterministic PRNG so each project gets its own stable cover.
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Dark, monochrome "circuit" artwork with a blue glow. Used when a project has no image. */
export default function CoverArt({ seed }) {
  const shapes = useMemo(() => {
    const rnd = seeded(seed);
    const out = [];
    for (let i = 0; i < 190; i++) {
      const w = 20 + Math.floor(rnd() * 9) * 20;
      const h = 20 + Math.floor(rnd() * 5) * 20;
      out.push({
        x: Math.floor(rnd() * 90) * 20 - 200,
        y: Math.floor(rnd() * 40) * 20 - 100,
        w,
        h,
        l: 20 + Math.floor(rnd() * 46),
        o: 0.16 + rnd() * 0.4,
        line: rnd() > 0.55,
      });
    }
    return out;
  }, [seed]);

  return (
    <svg
      className="cover-art"
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`bloom-${seed}`} cx="22%" cy="0%" r="55%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="#bbb" stopOpacity="0.25" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glow-${seed}`}>
          <stop offset="0" stopColor="#2f6bff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#2f6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`fade-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="1600" height="700" fill="#0b0b0c" />
      <g transform="translate(260 0) skewX(-32)">
        {shapes.map((s, i) =>
          s.line ? (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w * 2}
              height="2"
              fill={`hsl(0 0% ${s.l + 25}%)`}
              opacity={s.o + 0.2}
            />
          ) : (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              fill={`hsl(0 0% ${s.l}%)`}
              stroke="#000"
              strokeWidth="2"
              opacity={s.o}
            />
          )
        )}
      </g>
      <rect width="1600" height="700" fill={`url(#bloom-${seed})`} />
      <rect width="1600" height="700" fill={`url(#fade-${seed})`} />
      <circle className="cover-art__glow" cx="880" cy="700" r="130" fill={`url(#glow-${seed})`} />
    </svg>
  );
}
