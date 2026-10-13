import DataTable from './DataTable.jsx'
import Kpis from './Kpis.jsx'
import Timeline from './Timeline.jsx'

/* Renders content blocks from src/content/sections.js (verbatim German document).
   Consecutive `phase` blocks are grouped into one animated timeline. */
function group(blocks) {
  const out = []
  blocks.forEach((b) => {
    const last = out[out.length - 1]
    if (b.type === 'phase' && last && last.type === 'phases') last.items.push(b)
    else if (b.type === 'phase') out.push({ type: 'phases', items: [b] })
    else out.push(b)
  })
  return out
}

export default function Blocks({ blocks, ruler }) {
  return (
    <div className="prose">
      {group(blocks).map((b, i) => {
        switch (b.type) {
          case 'h3': return <h3 key={i} className="rv">{b.text}</h3>
          case 'p': return <p key={i} className="rv">{b.text}</p>
          case 'list': return <ul key={i} className="rv">{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
          case 'note': return <p key={i} className="note rv">{b.text}</p>
          case 'kpis': return <Kpis key={i} items={b.items} />
          case 'table': return <DataTable key={i} head={b.head} rows={b.rows} />
          case 'callout':
            return (
              <aside key={i} className="callout rv">
                {b.label && <div className="callout__label">{b.label}</div>}
                <p>{b.text}</p>
              </aside>
            )
          case 'cards':
            return (
              <div key={i} className="cards rv">
                {b.items.map((c, j) => (
                  <article className="card" key={j}>
                    <div className="card__tag">{c.tag}</div>
                    <h4 className="card__title">{c.title}</h4>
                    <p>{c.text}</p>
                  </article>
                ))}
              </div>
            )
          case 'steps':
            return (
              <ol key={i} className="steps rv">
                {b.items.map((c, j) => (
                  <li key={j}><span className="steps__n">{c.tag}</span><div><h4>{c.title}</h4><p>{c.text}</p></div></li>
                ))}
              </ol>
            )
          case 'nsteps':
            return (
              <ol key={i} className="steps steps--num rv">
                {b.items.map((c, j) => (
                  <li key={j}><span className="steps__n">{String(j + 1).padStart(2, '0')}</span><div><h4>{c.title}</h4><p>{c.text}</p></div></li>
                ))}
              </ol>
            )
          case 'panels':
            return (
              <div key={i} className="panels rv">
                {b.items.map((p, j) => (
                  <section className="panel" key={j}>
                    <h4 className="panel__head">{p.title}</h4>
                    <dl>
                      {p.rows.map(([k, v], r) => (<div key={r}><dt>{k}</dt><dd>{v}</dd></div>))}
                    </dl>
                  </section>
                ))}
              </div>
            )
          case 'phases': return <Timeline key={i} phases={b.items} ruler={ruler} />
          default: return null
        }
      })}
    </div>
  )
}
