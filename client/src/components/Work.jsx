import { Link } from "react-router-dom";
import { work } from "../content.js";
import { useList, useReveal } from "../hooks.js";
import SectionHead, { Status } from "./SectionHead.jsx";

function ArrowUpRight() {
  return (
    <svg
      className='arrow'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M4 12 12 4M5.5 4H12v6.5' />
    </svg>
  );
}

function Row({ project, index }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link className='row row--link' to={`/work/${project.slug}`}>
      <span className='mono row__num'>{num}</span>
      <div className='row__main'>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <ul className='tags' aria-label='Technologies'>
        {(Array.isArray(project.tags) ? project.tags : []).map((t) => (
          <li key={t} className='tag mono'>
            {t}
          </li>
        ))}
      </ul>
      <span className='mono row__meta'>
        {project.year} <ArrowUpRight />
      </span>
    </Link>
  );
}

export default function Work() {
  const state = useList("/projects");
  useReveal(state.data);

  return (
    <section className='section' id='work'>
      <div className='container'>
        <SectionHead num='01' label='Selected work' />
        <h2 className='h2 reveal'>{work.title}</h2>
        <p className='sub reveal'>{work.sub}</p>

        <div className='rows'>
          <Status state={state}>
            {state.data?.length === 0 && (
              <p className='status'>Projects coming soon.</p>
            )}
            {state.data?.map((p, i) => (
              <div className='reveal' key={p._id}>
                <Row project={p} index={i} />
              </div>
            ))}
          </Status>
        </div>
      </div>
    </section>
  );
}
