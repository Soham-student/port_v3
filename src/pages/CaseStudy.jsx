import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import CoverArt from '../components/CoverArt.jsx';
import SectionLink from '../components/SectionLink.jsx';
import { Arrow } from '../components/Hero.jsx';
import { useList, useReveal } from '../hooks.js';

/** Image frame with a gentle parallax as the page scrolls. */
function Cover({ project }) {
  const frame = useRef(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const max = r.height * 0.05;
      const shift = (r.top + r.height / 2 - window.innerHeight / 2) * -0.06;
      el.style.setProperty('--py', `${Math.max(-max, Math.min(max, shift)).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // The wrapper (not clipped) is what the scroll-reveal observes; the figure inside wipes in.
    <div className="reveal-img reveal">
      <figure className="case__cover" ref={frame}>
        <div className="case__parallax">
          <div className="case__media">
            {project.image ? (
              <img src={project.image} alt={`${project.title} preview`} />
            ) : (
              <CoverArt seed={project.slug} />
            )}
          </div>
        </div>
      </figure>
    </div>
  );
}

const paragraphs = (text) => text.split(/\n{2,}/).filter(Boolean);

export default function CaseStudy() {
  const { slug } = useParams();
  const state = useList(`/projects/${slug}`);
  const p = state.data;
  useReveal(p);

  useEffect(() => {
    document.title = p ? `${p.title} — Soham Dengale` : 'Case study — Soham Dengale';
  }, [p]);

  const sections = p
    ? [
        ['Overview', p.overview],
        ['The challenge', p.challenge],
        ['The approach', p.approach],
      ].filter(([, text]) => text)
    : [];

  return (
    <Layout>
      <article className="case">
        <div className="container">
          <SectionLink id="work" className="case__back mono anim" style={{ '--d': '0.05s' }}>
            <Arrow dir="left" /> All work
          </SectionLink>

          {state.error ? (
            <div className="case__missing" role="alert">
              <h1 className="case__title">
                {state.error.status === 404 ? 'Not found' : 'Error'}
              </h1>
              <p className="lead">
                {state.error.status === 404
                  ? "That project doesn't exist (or was removed)."
                  : 'Couldn’t load this project. Please try again.'}
              </p>
              <Link to="/" className="btn btn--solid mono">
                Back home <Arrow />
              </Link>
            </div>
          ) : !p ? (
            <div className="skeleton case__skeleton" aria-busy="true" aria-label="Loading">
              <span />
              <span />
              <span />
            </div>
          ) : (
            <>

              <h1 className="case__title anim" style={{ '--d': '0.2s' }}>
                {p.title}
              </h1>
              <p className="lead case__lead anim" style={{ '--d': '0.34s' }}>
                {p.description}
              </p>

              <Cover project={p} />

              <div className="case__grid">
                <aside className="case__side reveal">
                  <dl>
                    <div>
                      <dt className="mono">Role</dt>
                      <dd>{p.role}</dd>
                    </div>
                    <div>
                      <dt className="mono">Year</dt>
                      <dd>{p.year}</dd>
                    </div>
                    <div>
                      <dt className="mono">Stack</dt>
                      <dd>
                        <ul className="tags tags--sm" aria-label="Technologies">
                          {p.tags.map((t) => (
                            <li key={t} className="tag mono">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {(p.url || p.repo) && (
                      <div>
                        <dt className="mono">Links</dt>
                        <dd className="case__links">
                          {p.url && (
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="case__link">
                              Live site <Arrow dir="ne" />
                            </a>
                          )}
                          {p.repo && (
                            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="case__link">
                              Source code <Arrow dir="ne" />
                            </a>
                          )}
                        </dd>
                      </div>
                    )}
                  </dl>
                </aside>

                <div className="case__main">
                  {sections.map(([label, text]) => (
                    <section className="case__section reveal" key={label}>
                      <h2 className="mono">{label}</h2>
                      {paragraphs(text).map((para) => (
                        <p key={para.slice(0, 30)}>{para}</p>
                      ))}
                    </section>
                  ))}
                </div>
              </div>




            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
