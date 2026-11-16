import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../scroll.js';

/**
 * Link to a section of the home page. On the home page it scrolls smoothly; from any other
 * page it navigates home and the ScrollManager scrolls to the section.
 * `local` scrolls within the current page (for sections that exist on this page too).
 */
export default function SectionLink({ id, local = false, onClick, children, ...rest }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handle(e) {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (local || pathname === '/') {
      scrollToId(id);
      if (!local) window.history.replaceState(null, '', id === 'top' ? '/' : `/#${id}`);
    } else {
      navigate({ pathname: '/', hash: `#${id}` });
    }
  }

  return (
    <a href={id === 'top' ? '/' : `/#${id}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
