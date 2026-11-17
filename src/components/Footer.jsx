import { site } from '../content.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__col">
          <div className="footer__name">
            <span>{site.first}</span>
            <span>{site.last}</span>
          </div>
          <nav className="footer__links mono" aria-label="Footer">
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={site.leetcode} target="_blank" rel="noopener noreferrer">
              LeetCode
            </a>
          </nav>
        </div>
        <p className="mono footer__copy">©{year} - {site.name}</p>
      </div>
    </footer>
  );
}
