import { about } from '../content.js';
import { useReveal } from '../hooks.js';
import SectionHead from './SectionHead.jsx';

export default function About() {
  useReveal();
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead num="04" label="About" />
        <div className="about">
          <h2 className="about__statement reveal">{about.statement}</h2>
          <div className="about__copy reveal">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
