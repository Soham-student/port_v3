import { Link } from 'react-router-dom';
import { site } from '../content.js';
import { Arrow } from './Hero.jsx';
import SectionLink from './SectionLink.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <div>
            <p className="footer__name">{site.name}</p>
            <p className="mono footer__tag">Full-stack engineer · React · Node · Databases</p>
          </div>
          <nav className="footer__links mono" aria-label="Footer">
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <SectionLink id="contact" local>
              Contact
            </SectionLink>
            <Link to="/admin">Admin</Link>
            <SectionLink id="top" local className="footer__top">
              Top <Arrow dir="up" />
            </SectionLink>
          </nav>
        </div>
        <p className="mono footer__copy">© {year} — Designed &amp; built by {site.name}</p>
      </div>
    </footer>
  );
}
