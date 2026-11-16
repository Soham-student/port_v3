import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Portfolio from './pages/Portfolio.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import AdminApp from './pages/admin/AdminApp.jsx';
import { scrollToId, scrollToTop, startSmoothScroll, stopSmoothScroll } from './scroll.js';

/** Smooth scrolling on the public site; native scrolling in the admin. */
function SmoothScroll() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith('/admin');
  useEffect(() => {
    if (admin) stopSmoothScroll();
    else startSmoothScroll();
  }, [admin]);
  useEffect(() => stopSmoothScroll, []);
  return null;
}

/** Scrolls to the top (or to a #section) whenever the page changes. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prev = useRef(null);

  useEffect(() => {
    const samePage = prev.current === pathname;
    prev.current = pathname;
    const id = hash.slice(1);
    if (!id) {
      if (samePage) return;
      scrollToTop();
      // Once more after layout settles, in case a scroll was still in flight.
      const t = setTimeout(scrollToTop, 120);
      return () => clearTimeout(t);
    }
    scrollToId(id, { immediate: !samePage });
    if (samePage) return;
    // Content above the target loads in after navigation and shifts layout; re-aim.
    const timers = [500, 1200].map((ms) => setTimeout(() => scrollToId(id, { immediate: true }), ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </>
  );
}
