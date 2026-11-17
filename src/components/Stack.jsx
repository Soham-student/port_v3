import { stack } from '../content.js';
import { useList, useReveal } from '../hooks.js';
import { Status } from './SectionHead.jsx';

export default function Stack() {
  const state = useList('/skills');
  useReveal(state.data);

  return (
    <section className="section" id="stack">
      <div className="container">
        <h2 className="h2 reveal">{stack.title}</h2>
        <p className="sub reveal">{stack.sub}</p>

        <Status state={state}>
          <div className="stack-grid">
            {state.data?.map((g, i) => (
              <div className="stack-cell reveal" style={{ '--i': i }} key={g._id}>
                <div className="stack-col">
                  <div className="stack-col__head mono">
                    <span>{g.title}</span>
                    <span className="stack-col__idx">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Status>
      </div>
    </section>
  );
}
