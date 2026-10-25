import { useState } from 'react'
import { OWNER_PROCESS, INVESTOR_PROCESS } from '../content/data.js'

// Schlichter Ablauf: Auswahl Eigentümer / Investoren, darunter nummerierte Schritte mit Trennlinien.
export default function ProcessTimeline({ initial = 'owner' }) {
  const [who, setWho] = useState(initial)
  const steps = who === 'owner' ? OWNER_PROCESS : INVESTOR_PROCESS
  return (
    <div className="pls">
      <div className="toggle" role="tablist" aria-label="Prozess wählen">
        <button type="button" role="tab" aria-selected={who === 'owner'} onClick={() => setWho('owner')}>Für Eigentümer</button>
        <button type="button" role="tab" aria-selected={who === 'investor'} onClick={() => setWho('investor')}>Für Investoren</button>
      </div>
      <ol className="pls-list">
        {steps.map((s, i) => (
          <li key={who + s.t}><span>{String(i + 1).padStart(2, '0')}</span><b>{s.t}</b><p>{s.d}</p></li>
        ))}
      </ol>
    </div>
  )
}

export function SimpleTimeline({ steps }) {
  return (
    <ol className="tl rv" style={{ '--n': steps.length }}>
      {steps.map((s) => <li key={s.t}><b>{s.t}</b><span>{s.d}</span></li>)}
    </ol>
  )
}
