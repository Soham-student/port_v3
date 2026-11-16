import Lenis from 'lenis';

// Smooth (inertial) scrolling for the public site. Turned off for people who prefer
// reduced motion, and on the admin pages, which use native scrolling.
let lenis = null;
let rafId = 0;

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function startSmoothScroll() {
  if (lenis || reduced()) return;
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
  const frame = (t) => {
    lenis?.raf(t);
    rafId = requestAnimationFrame(frame);
  };
  rafId = requestAnimationFrame(frame);
}

export function stopSmoothScroll() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

export function scrollToY(y, immediate = false) {
  const top = Math.max(0, Math.round(y));
  if (lenis) {
    lenis.scrollTo(top, { immediate, duration: 1.3 });
    // Also set the native position so a stale in-flight scroll can't win.
    if (immediate) window.scrollTo(0, top);
  } else {
    window.scrollTo({ top, behavior: immediate || reduced() ? 'auto' : 'smooth' });
  }
}

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const offset = id === 'top' ? 0 : 72;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - offset, immediate);
  return true;
}

export const scrollToTop = () => scrollToY(0, true);
