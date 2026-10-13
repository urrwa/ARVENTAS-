import DataTable from './DataTable.jsx'
import Kpis from './Kpis.jsx'

/* Renders content blocks from src/content/sections.js */
export default function Blocks({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h3': return <h3 key={i} className="rv">{b.text}</h3>
          case 'p': return <p key={i} className="rv">{b.text}</p>
          case 'list': return <ul key={i} className="rv">{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
          case 'note': return <p key={i} className="note rv">{b.text}</p>
          case 'kpis': return <Kpis key={i} items={b.items} />
          case 'table': return <DataTable key={i} head={b.head} rows={b.rows} />
          default: return null
        }
      })}
    </div>
  )
}

export function Pending({ children = 'Inhalt aus dem Strategiedokument folgt.' }) {
  return <p className="pending rv" role="note">{children}</p>
}
