import { useState } from 'react'
import { Link } from 'react-router-dom'
import map from '@svg-maps/germany'
import { REGIONS } from '../content/data.js'

// Geografisch korrekte Deutschlandkarte (Bundesländer, @svg-maps/germany, Lizenz CC BY 4.0) mit gleichwertiger Regionenliste.
// Die Auswahl dient nur der Vorbelegung des Anfrageformulars; sie ist keine Standortangabe.
export default function GermanyRegionSelector({ compact = false }) {
  const [sel, setSel] = useState(null)
  const name = (id) => REGIONS.find((r) => r.id === id)?.name
  const toggle = (id) => setSel((s) => (s === id ? null : id))
  return (
    <div className="germany">
      <svg className="map-svg" viewBox={map.viewBox} role="group" aria-label="Deutschlandkarte: Bundesland auswählen">
        {map.locations.map((l) => (
          <path key={l.id} d={l.path} role="button" tabIndex={0} aria-pressed={sel === l.id} aria-label={name(l.id)}
            onClick={() => toggle(l.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(l.id) } }}>
            <title>{name(l.id)}</title>
          </path>
        ))}
      </svg>
      <div>
        <p className="eyebrow" style={{ color: 'var(--marine)' }}>Bundesland</p>
        <div className="reg-sel" aria-live="polite">{sel ? name(sel) : 'Noch keine Region gewählt'}</div>
        <div className="reg-list" role="group" aria-label="Regionenliste">
          {REGIONS.map((r) => <button key={r.id} type="button" aria-pressed={sel === r.id} onClick={() => toggle(r.id)}>{r.name}</button>)}
        </div>
        <Link className="btn btn-marine" to={sel ? `/kontakt?region=${encodeURIComponent(name(sel))}` : '/kontakt'}>Region auswählen <span className="arr" aria-hidden="true">→</span></Link>
        {!compact && <p className="small muted" style={{ marginTop: 16 }}>Deutschlandweit tätig. Die Auswahl ist keine Standortangabe und zeigt keine Nachfrage. Kartendaten: @svg-maps/germany, CC BY 4.0.</p>}
      </div>
    </div>
  )
}
