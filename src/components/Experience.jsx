import { experienceCopy } from '../content.js';
import { useList, useReveal } from '../hooks.js';
import { Status } from './SectionHead.jsx';

export default function Experience() {
  const state = useList('/experience');
  useReveal(state.data);

  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="h2 reveal">{experienceCopy.title}</h2>

        <div className="timeline">
          <Status state={state}>
            {state.data?.map((e) => (
              <article className="job reveal" key={e._id}>
                <p className="mono job__period">{e.period}</p>
                <div className="job__body">
                  <h3>{e.title}</h3>
                  <p className="mono job__org">{e.org}</p>
                  <p>{e.description}</p>
                </div>
              </article>
            ))}
          </Status>
        </div>
      </div>
    </section>
  );
}
