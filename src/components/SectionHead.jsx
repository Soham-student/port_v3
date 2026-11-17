export default function SectionHead({ label }) {
  return (
    <div className="section-head reveal">
      <span className="mono section-head__label">{label}</span>
    </div>
  );
}

/** Shared loading / error placeholder for API-backed sections. */
export function Status({ state, children }) {
  if (state.error) {
    return (
      <p className="status" role="alert">
        Couldn’t load this section right now. Please refresh in a moment.
      </p>
    );
  }
  if (!state.data) {
    return (
      <div className="skeleton" aria-busy="true" aria-label="Loading">
        <span />
        <span />
        <span />
      </div>
    );
  }
  return children;
}
