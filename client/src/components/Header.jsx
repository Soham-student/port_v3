import { useState } from 'react';
import { nav, site } from '../content.js';
import { useActiveSection, useScroll } from '../hooks.js';
import SectionLink from './SectionLink.jsx';

const ids = [...nav.map((n) => n.id), 'contact'];

export default function Header() {
  const { progress, scrolled } = useScroll();
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="container header__row">
        <SectionLink id="top" className="brand" onClick={close} aria-label={`${site.name} — top of page`}>
          <span className="brand__mark">{site.initials}</span>
          <span className="brand__name mono">{site.name}</span>
        </SectionLink>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="mono">{open ? 'Close' : 'Menu'}</span>
        </button>

        <nav id="site-nav" className="nav" aria-label="Primary">
          {nav.map((n) => (
            <SectionLink
              key={n.id}
              id={n.id}
              className={`nav__link mono${active === n.id ? ' is-active' : ''}`}
              onClick={close}
            >
              {n.label}
            </SectionLink>
          ))}
          <SectionLink
            id="contact"
            local
            className={`nav__cta mono${active === 'contact' ? ' is-active' : ''}`}
            onClick={close}
          >
            Contact
          </SectionLink>
        </nav>
      </div>
    </header>
  );
}
