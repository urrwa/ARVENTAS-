import { useState } from 'react'
import { OWNER_PROCESS, INVESTOR_PROCESS } from '../content/data.js'

// Zwei nachvollziehbare Prozesse. Die Schritte bleiben ohne Animation lesbar (Liste), mobil vertikal.
export default function ProcessTimeline({ initial = 'owner' }) {
  const [who, setWho] = useState(initial)
  const steps = who === 'owner' ? OWNER_PROCESS : INVESTOR_PROCESS
  return (
    <div>
      <div className="toggle" role="tablist" aria-label="Prozess wählen">
        <button type="button" role="tab" aria-selected={who === 'owner'} onClick={() => setWho('owner')}>Für Eigentümer</button>
        <button type="button" role="tab" aria-selected={who === 'investor'} onClick={() => setWho('investor')}>Für Investoren</button>
      </div>
      <ol className="tl rv" key={who} style={{ '--n': steps.length }}>
        {steps.map((s) => <li key={s.t}><b>{s.t}</b><span>{s.d}</span></li>)}
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
