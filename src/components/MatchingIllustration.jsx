import { useState } from 'react'

const REGION = ['Bundesweit', 'Süddeutschland', 'Westdeutschland', 'Norddeutschland', 'Ostdeutschland']
const BUDGET = ['bis 500.000 €', '500.000 – 2 Mio. €', '2 – 5 Mio. €', 'ab 5 Mio. €']
const TYPE = ['Mehrfamilienhaus', 'Wohn- und Geschäftshaus', 'Gewerbeimmobilie', 'Grundstück']

function Group({ legend, items, value, onChange }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="chips">
        {items.map((v) => <button key={v} type="button" className="chip" aria-pressed={value === v} onClick={() => onChange(v)}>{v}</button>)}
      </div>
    </fieldset>
  )
}

// Prinzipdarstellung. Keine Live-Bestandsabfrage, keine Trefferzahlen, keine angebotenen Objekte.
export default function MatchingIllustration() {
  const [region, setRegion] = useState(REGION[0])
  const [budget, setBudget] = useState(BUDGET[1])
  const [type, setType] = useState(TYPE[0])
  const crit = [
    { k: 'Region', v: region, y: 70, broad: region === 'Bundesweit' },
    { k: 'Budget', v: budget, y: 180, broad: false },
    { k: 'Immobilientyp', v: type, y: 290, broad: false },
  ]
  const info = [
    { k: 'Lage', y: 70 }, { k: 'Größe & Zustand', y: 180 }, { k: 'Wirtschaftlichkeit', y: 290 },
  ]
  return (
    <div className="match">
      <div className="mctl">
        <Group legend="Region" items={REGION} value={region} onChange={setRegion} />
        <Group legend="Budgetband" items={BUDGET} value={budget} onChange={setBudget} />
        <Group legend="Immobilientyp" items={TYPE} value={type} onChange={setType} />
      </div>
      <div>
        <div className="mviz">
          <svg viewBox="0 0 640 360" role="img" aria-label={`Prinzipdarstellung: Ihr Suchprofil mit Region ${region}, Budgetband ${budget} und Immobilientyp ${type} wird mit Immobilieninformationen abgeglichen.`}>
            <rect x="0" y="0" width="640" height="360" fill="#fff" />
            {/* Linien Kriterien -> Profil */}
            {crit.map((c, i) => <path key={'a' + i} className="ml" d={`M170 ${c.y} C 230 ${c.y}, 240 180, 290 180`} fill="none" stroke="#192537" strokeWidth={c.broad ? 1.5 : 3} strokeOpacity={c.broad ? 0.45 : 1} />)}
            {/* Linien Profil -> Immobilieninformationen */}
            {info.map((n, i) => <path key={'b' + i} className="ml" d={`M350 180 C 400 180, 410 ${n.y}, 470 ${n.y}`} fill="none" stroke="#B09E80" strokeWidth={3} />)}
            {/* Profil-Knoten */}
            <g><rect x="290" y="150" width="60" height="60" fill="#192537" /><text x="320" y="186" textAnchor="middle" fill="#F5F3EF" fontSize="11" letterSpacing="1">PROFIL</text></g>
            {/* Kriterien */}
            {crit.map((c, i) => (
              <g key={'c' + i} className="mn">
                <rect x="14" y={c.y - 28} width="156" height="56" fill="none" stroke="#192537" strokeWidth="1.2" />
                <text x="26" y={c.y - 8} fontSize="10" fill="#3d3f43" letterSpacing="1.4">{c.k.toUpperCase()}</text>
                <text x="26" y={c.y + 12} fontSize="13" fontWeight="600" fill="#0B0B0B">{c.v.length > 20 ? c.v.slice(0, 19) + '…' : c.v}</text>
              </g>
            ))}
            {/* Immobilieninformationen */}
            {info.map((n, i) => (
              <g key={'d' + i} className="mn">
                <rect x="470" y={n.y - 28} width="156" height="56" fill="none" stroke="#B09E80" strokeWidth="1.4" />
                <text x="482" y={n.y - 8} fontSize="10" fill="#3d3f43" letterSpacing="1.4">INFORMATION</text>
                <text x="482" y={n.y + 12} fontSize="13" fontWeight="600" fill="#0B0B0B">{n.k}</text>
              </g>
            ))}
          </svg>
        </div>
        <p className="mnote">Prinzipdarstellung, keine Live-Bestandsabfrage. Es werden keine Trefferzahlen oder konkreten Objekte angezeigt. Die Auswahl verändert die dargestellten Verbindungen und Kriterien.</p>
      </div>
    </div>
  )
}
