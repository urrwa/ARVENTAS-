import { useState } from 'react'
import { Link } from 'react-router-dom'
import map from '@svg-maps/germany'
import { REGIONS } from '../content/data.js'

// Landeshauptstädte (öffentliche Geografie, keine Standort- oder Nachfrageangabe).
const CAPITALS = {
  bw: 'Stuttgart', by: 'München', be: 'Berlin', bb: 'Potsdam', hb: 'Bremen', hh: 'Hamburg', he: 'Wiesbaden', mv: 'Schwerin',
  ni: 'Hannover', nw: 'Düsseldorf', rp: 'Mainz', sl: 'Saarbrücken', sn: 'Dresden', st: 'Magdeburg', sh: 'Kiel', th: 'Erfurt',
}

// Geografisch korrekte Deutschlandkarte (Bundesländer, @svg-maps/germany, Lizenz CC BY 4.0) mit gleichwertiger Regionenliste.
// Die Auswahl dient nur der Vorbelegung des Anfrageformulars; sie ist keine Standortangabe.
export default function GermanyRegionSelector({ compact = false }) {
  const [sel, setSel] = useState(null)
  const [hov, setHov] = useState(null)
  const name = (id) => REGIONS.find((r) => r.id === id)?.name
  const toggle = (id) => setSel((s) => (s === id ? null : id))
  const shown = hov || sel
  return (
    <div className="germany">
      <div className="map-wrap">
        <svg className="map-svg" viewBox={map.viewBox} role="group" aria-label="Deutschlandkarte: Bundesland auswählen">
          {map.locations.map((l) => (
            <path key={l.id} d={l.path} role="button" tabIndex={0} aria-pressed={sel === l.id} aria-label={name(l.id)}
              onClick={() => toggle(l.id)} onMouseEnter={() => setHov(l.id)} onMouseLeave={() => setHov(null)}
              onFocus={() => setHov(l.id)} onBlur={() => setHov(null)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(l.id) } }} />
          ))}
        </svg>
        <div className="map-card" aria-hidden="true" data-on={shown ? '1' : '0'}>
          <span className="eyebrow">Bundesland</span>
          <strong>{shown ? name(shown) : ''}</strong>
          <span className="small muted">{shown ? <><span>Landeshauptstadt</span> {CAPITALS[shown]}</> : ''}</span>
        </div>
      </div>
      <div>
        <p className="eyebrow" style={{ color: 'var(--marine)' }}>Bundesland</p>
        <div className="reg-sel" aria-live="polite">{sel ? name(sel) : 'Noch keine Region gewählt'}</div>
        <details className="reg-more">
          <summary>Liste anzeigen</summary>
          <div className="reg-list" role="group" aria-label="Regionenliste">
            {REGIONS.map((r) => <button key={r.id} type="button" aria-pressed={sel === r.id} onClick={() => toggle(r.id)}>{r.name}</button>)}
          </div>
        </details>
        <Link className="btn btn-marine" to={sel ? `/kontakt?region=${encodeURIComponent(name(sel))}` : '/kontakt'}>Region auswählen <span className="arr" aria-hidden="true">→</span></Link>
        {!compact && <p className="small muted" style={{ marginTop: 16 }}>Deutschlandweit tätig. Die Auswahl ist keine Standortangabe und zeigt keine Nachfrage. Kartendaten: @svg-maps/germany, CC BY 4.0.</p>}
      </div>
    </div>
  )
}
