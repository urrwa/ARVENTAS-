import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATES, MAP_VIEWBOX } from '../content/germany.js'

// Matching als Prinzipdarstellung auf einem Laptop-Bildschirm: Region, Budget und Immobilientyp wechseln langsam von selbst (pausiert beim Überfahren),
// die Karte hebt die Region hervor, rechts erscheinen Platzhalter-Treffer. Keine Zahlen, keine echten Objekte, keine Trefferzahlen.
const REG = ['bayern', 'hessen', 'nordrhein-westfalen', 'berlin', 'baden-wuerttemberg', 'hamburg']
const NAME = (id) => STATES.find((s) => s.id === id)
const TYPES = ['Mehrfamilienhaus', 'Wohn- und Geschäftshaus', 'Gewerbeimmobilie', 'Grundstück']
const BUDGET = ['bis 500.000 €', '500.000 – 2 Mio. €', '2 – 5 Mio. €', 'ab 5 Mio. €']
const ICON = {
  pin: 'M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  coins: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5',
  house: 'M4 21V9l8-6 8 6v12zM9 21v-6h6v6',
}
const TI = ['M5 20V8l7-4 7 4v12zM9 20v-5h6v5', 'M4 20V10l5-3v13zM9 20V6l6-2v16zM15 20v-8l5 2v6z', 'M3 20V9h8v11zM13 20V4h8v16z', 'M3 18l5-8 4 5 3-4 6 7z']

export default function InvestorLaptop() {
  const [i] = useState(0)
  const [manual, setManual] = useState(null)
  const live = useRef(false), root = useRef(null)
  useEffect(() => {
    const el = root.current
    const io = new IntersectionObserver(([e]) => { live.current = e.isIntersecting }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const m = manual || {}
  const regId = m.reg || REG[i]
  const type = m.type != null ? m.type : i % TYPES.length
  const bud = m.bud != null ? m.bud : (i + 1) % BUDGET.length
  const st = NAME(regId)
  const pick = (o) => setManual({ reg: regId, type, bud, ...o })
  const to = `/investorenkreis?region=${encodeURIComponent(st.name)}&typ=${encodeURIComponent(TYPES[type] === 'Grundstück' ? 'Grundstück / Entwicklungsobjekt' : TYPES[type])}&budget=${encodeURIComponent(BUDGET[bud])}`
  return (
    <div className="il" ref={root}>
      <div className="il-copy">
        <p className="eyebrow">Für Investoren</p>
        <h2 className="h2" id="h-match">Nicht jede Immobilie. Die richtige.</h2>
      </div>
      <div className="il-dev" >
        <div className="il-lap">
          <div className="il-scr">
            <div className="il-l">
              <p className="il-h">Region</p>
              <div className="il-sel"><span key={regId}>{st.name}</span><i aria-hidden="true">⌄</i></div>
              <div className="il-regs">{REG.map((r) => <button key={r} type="button" className={r === regId ? 'on' : ''} onClick={() => pick({ reg: r })} aria-label={NAME(r).name} title={NAME(r).name} />)}</div>
              <p className="il-h">Budget</p>
              <div className="il-bud">{BUDGET.map((b, k) => <button key={b} type="button" className={k === bud ? 'on' : ''} onClick={() => pick({ bud: k })}><span>{b}</span></button>)}</div>
              <p className="il-h">Immobilientyp</p>
              <div className="il-types">{TYPES.map((t, k) => (
                <button key={t} type="button" className={k === type ? 'on' : ''} onClick={() => pick({ type: k })}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={TI[k]} /></svg><span>{t}</span></button>
              ))}</div>
            </div>
            <div className="il-map">
              <svg viewBox={MAP_VIEWBOX} aria-hidden="true">
                {STATES.map((s) => <path key={s.id} d={s.d} className={s.id === regId ? 'on' : ''} />)}
                <g key={regId} className="il-ping" transform={`translate(${st.cx} ${st.cy})`}><circle r="5" /><circle r="5" className="r" /></g>
              </svg>
            </div>
            <div className="il-r" key={'r' + regId + type + bud}>
              <p className="il-h">Passende Objekte</p>
              {[0, 1, 2].map((k) => (
                <div className="il-card" key={k} style={{ '--k': k }}>
                  <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={TI[type]} /></svg></i>
                  <div><b /><b className="s" /><span className="il-chips"><em>{TYPES[type]}</em><em>{st.name}</em></span></div>
                </div>
              ))}
              <p className="il-n">Beispielansicht, keine echten Objekte.</p>
              <p className="il-sum">{st.name} · {BUDGET[bud]}</p>
            </div>
          </div>
        </div>
        <div className="il-base" aria-hidden="true" />
        <div className="il-cta"><Link to={to} className="btn btn-gold">Suchprofil erstellen <span className="arr" aria-hidden="true">→</span></Link></div>
      </div>
    </div>
  )
}
