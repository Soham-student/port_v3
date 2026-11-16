import { hero, site } from '../content.js';
import SectionLink from './SectionLink.jsx';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow mono anim" style={{ '--d': '0.05s' }}>
          <span className="dot" aria-hidden="true" />
          {site.availability}
        </p>

        <h1 className="hero__name" aria-label={site.name}>
          <span className="hero__solid anim" style={{ '--d': '0.15s' }} aria-hidden="true">
            {site.first}
          </span>
          <span className="hero__outline anim" style={{ '--d': '0.3s' }} aria-hidden="true">
            {site.last}
          </span>
        </h1>

        <div className="hero__body">
          <div className="hero__copy">
            <h2 className="hero__tagline anim" style={{ '--d': '0.55s' }}>{hero.tagline}</h2>
            <p className="lead anim" style={{ '--d': '0.65s' }}>{hero.intro}</p>
            <div className="btn-row anim" style={{ '--d': '0.78s' }}>
              <SectionLink id="work" className="btn btn--solid mono">
                Selected work <Arrow />
              </SectionLink>
              <SectionLink id="contact" local className="btn btn--ghost mono">
                Get in touch
              </SectionLink>
            </div>
          </div>

          <dl className="hero__facts">
            {hero.facts.map((f, i) => (
              <div key={f.label} className="anim" style={{ '--d': `${0.8 + i * 0.09}s` }}>
                <dt className="mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** dir: right (default) | left | up | ne */
export function Arrow({ dir = 'right', up = false }) {
  const d = up ? 'up' : dir;
  const paths = {
    right: 'M3 8h10M8.5 3.5 13 8l-4.5 4.5',
    left: 'M13 8H3M7.5 3.5 3 8l4.5 4.5',
    up: 'M8 13V3M3.5 7.5 8 3l4.5 4.5',
    ne: 'M4 12 12 4M5.5 4H12v6.5',
  };
  return (
    <svg
      className={`arrow arrow--${d}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[d]} />
    </svg>
  );
}
