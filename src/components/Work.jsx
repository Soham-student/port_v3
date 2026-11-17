import { Link } from 'react-router-dom';
import { work } from '../content.js';
import { useList, useReveal } from '../hooks.js';
import { Status } from './SectionHead.jsx';

function Row({ project }) {
  return (
    <Link className="row row--link" to={`/work/${project.slug}`}>
      <span className="mono row__num" aria-hidden="true" />
      <div className="row__main">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <ul className="tags" aria-label="Technologies">
        {project.tags.map((t) => (
          <li key={t} className="tag mono">
            {t}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export default function Work() {
  const state = useList('/projects');
  useReveal(state.data);

  return (
    <section className="section" id="work">
      <div className="container">
        <h2 className="h2 reveal">{work.title}</h2>
        <p className="sub reveal">{work.sub}</p>

        <div className="rows">
          <Status state={state}>
            {state.data?.length === 0 && <p className="status">Projects coming soon.</p>}
            {state.data?.map((p, i) => (
              <div className="reveal" key={p._id}>
                <Row project={p} index={i} />
              </div>
            ))}
          </Status>
        </div>
      </div>
    </section>
  );
}
