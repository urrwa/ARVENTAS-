import { useEffect, useRef, useState } from 'react'
import map from '@svg-maps/germany'
import { REGIONS } from '../content/data.js'

// Animiertes Dashboard als Prinzipdarstellung (Vorbild: dunkle Property-Dashboards). Alle Inhalte sind schematisch:
// keine Zahlen, Preise, Renditen, Trefferzahlen oder angebotenen Objekte. Die Ansichten wechseln von selbst und per Auswahl.
const VIEWS = [
  { id: 'uebersicht', label: 'Übersicht', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
  { id: 'wert', label: 'Marktwert', icon: 'M3 17l5-6 4 3 8-9' },
  { id: 'profil', label: 'Suchprofil', icon: 'M4 6h16M7 12h10M10 18h4' },
  { id: 'karte', label: 'Karte', icon: 'M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { id: 'objekt', label: 'Objektdaten', icon: 'M4 21V9l8-6 8 6v12zM9 21v-6h6v6' },
]
const REGION_CH = ['Bundesweit', 'Süddeutschland', 'Westdeutschland', 'Norddeutschland', 'Ostdeutschland']
const TYPE_CH = ['Mehrfamilienhaus', 'Wohn- und Geschäftshaus', 'Gewerbeimmobilie', 'Grundstück']
const BUDGET = ['bis 500.000 €', '500.000 – 2 Mio. €', '2 – 5 Mio. €', 'ab 5 Mio. €']
const TABS = [
  ['Lage', 'Umfeld, Erreichbarkeit und Nutzungsmix. Jeder Baustein nennt Quelle und Stand.'],
  ['Zustand', 'Bauweise, Instandhaltung und bekannte Unterlagen werden strukturiert erfasst.'],
  ['Potenzial', 'Möglichkeiten erscheinen als Prüffragen, nicht als Zusage.'],
  ['Prüfpunkte', 'Offene Punkte vor einer Entscheidung, mit menschlicher Freigabe.'],
]
const IMG = ['/media/p/u-eingang-travertin.webp', '/media/p/u-begutachtung-travertin.webp', '/media/p/u-modell-dunkel.webp']
const CYCLE = ['bw', 'by', 'nw', 'he', 'sn', 'ni']

const Icon = ({ d }) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>

function Donut() {
  const seg = [['Daten', 0, 0.34], ['Standort', 0.36, 0.3], ['Potenzial', 0.68, 0.3]]
  const R = 52, C = 2 * Math.PI * R
  return (
    <div className="pd-donut">
      <svg viewBox="0 0 140 140" role="img" aria-label="Schematisches Ringdiagramm der Analysebausteine Daten, Standort, Potenzial ohne Werte">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(245,243,239,.12)" strokeWidth="12" />
        {seg.map(([n, o, l], i) => (
          <circle key={n} className="pd-arc" cx="70" cy="70" r={R} fill="none" stroke={i === 0 ? '#B09E80' : i === 1 ? '#F5F3EF' : '#6C7B93'} strokeWidth="12"
            strokeDasharray={`${l * C} ${C}`} strokeDashoffset={-o * C} style={{ '--i': i }} transform="rotate(-90 70 70)" />
        ))}
      </svg>
      <ul>{seg.map(([n], i) => <li key={n}><i style={{ background: i === 0 ? '#B09E80' : i === 1 ? '#F5F3EF' : '#6C7B93' }} />{n}</li>)}</ul>
    </div>
  )
}

function Overview() {
  const cards = [['Zugang', 'Abseits öffentlicher Portale'], ['Analyse', 'Wert, Potenzial, Risiken'], ['Matching', 'Suchprofil und Objekt'], ['Begleitung', 'Persönlich bis zur Entscheidung']]
  return (
    <div className="pd-ov">
      <div className="pd-cards">{cards.map(([t, d], i) => <div key={t} className="pd-card" style={{ '--i': i }}><span>0{i + 1}</span><b>{t}</b><small>{d}</small></div>)}</div>
      <div className="pd-panel"><h4>Analysebausteine</h4><Donut /></div>
    </div>
  )
}

function Value() {
  return (
    <div className="pd-val">
      <div className="pd-panel pd-chart">
        <h4>Marktwert einordnen</h4>
        <svg viewBox="0 0 400 160" role="img" aria-label="Schematische Kurve ohne Werte">
          {[40, 80, 120].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(245,243,239,.08)" />)}
          <path className="pd-line" pathLength="1" d="M0 120 C 50 110, 70 60, 120 80 S 190 130, 240 70 S 330 30, 400 50" fill="none" stroke="#B09E80" strokeWidth="2.5" />
          {[[120, 80], [240, 70], [330, 40]].map(([x, y], i) => <circle key={i} className="pd-dot" cx={x} cy={y} r="5" fill="#192537" stroke="#F5F3EF" strokeWidth="2" style={{ '--i': i }} />)}
        </svg>
        <p className="pd-note">Schematische Darstellung, keine Werte.</p>
      </div>
      <div className="pd-panel">
        <h4>Verfahren</h4>
        {[['Vergleichswert', '22%', '38%'], ['Ertragswert', '34%', '34%'], ['Sachwert', '14%', '30%']].map(([n, l, w], i) => (
          <div key={n} className="pd-row"><span>{n}</span><div className="pd-track"><i style={{ '--l': l, '--w': w, '--i': i }} /></div></div>
        ))}
        <p className="pd-note">Eine Marktwerteinschätzung ist kein verbindliches Gutachten.</p>
      </div>
    </div>
  )
}

function Profile({ s }) {
  const { region, type, budget, setRegion, setType, setBudget } = s
  const bi = BUDGET.indexOf(budget)
  return (
    <div className="pd-prof">
      <div className="pd-panel">
        <h4>Region</h4><div className="pd-chips">{REGION_CH.map((v) => <button key={v} type="button" aria-pressed={region === v} onClick={() => setRegion(v)}>{v}</button>)}</div>
        <h4>Immobilientyp</h4><div className="pd-chips">{TYPE_CH.map((v) => <button key={v} type="button" aria-pressed={type === v} onClick={() => setType(v)}>{v}</button>)}</div>
        <h4>Budgetband</h4>
        <div className="pd-range" role="radiogroup" aria-label="Budgetband">
          <i className="pd-thumb" style={{ '--p': bi }} aria-hidden="true" />
          {BUDGET.map((v) => <button key={v} type="button" role="radio" aria-checked={budget === v} onClick={() => setBudget(v)}><span>{v}</span></button>)}
        </div>
      </div>
      <div className="pd-panel pd-sum">
        <h4>Ihr Suchprofil</h4>
        <dl>
          {[['Region', region], ['Typ', type], ['Budget', budget]].map(([k, v], i) => <div key={k} style={{ '--i': i }}><dt>{k}</dt><dd key={v}>{v}</dd></div>)}
        </dl>
        <p className="pd-note">Prinzipdarstellung. Keine Live-Abfrage, keine Trefferzahlen.</p>
      </div>
    </div>
  )
}

function MapView({ sel, setSel }) {
  const [c, setC] = useState(null)
  const refs = useRef({})
  useEffect(() => { const p = refs.current[sel]; if (p) { const b = p.getBBox(); setC([b.x + b.width / 2, b.y + b.height / 2]) } }, [sel])
  const name = REGIONS.find((r) => r.id === sel)?.name
  return (
    <div className="pd-map">
      <div className="pd-panel pd-mapbox">
        <svg viewBox={map.viewBox} role="group" aria-label="Deutschlandkarte">
          {map.locations.map((l) => <path key={l.id} ref={(e) => { refs.current[l.id] = e }} d={l.path} className={sel === l.id ? 'on' : ''} onClick={() => setSel(l.id)} />)}
          {c && <g className="pd-ping" key={sel} transform={`translate(${c[0]} ${c[1]})`}><circle r="4" fill="#B09E80" /><circle r="4" fill="none" stroke="#B09E80" className="r1" /><circle r="4" fill="none" stroke="#B09E80" className="r2" /></g>}
        </svg>
      </div>
      <div className="pd-panel pd-sum">
        <h4>Bundesland</h4>
        <p className="pd-big" key={sel}>{name}</p>
        <ul className="pd-list">{REGIONS.slice(0, 8).map((r) => <li key={r.id}><button type="button" aria-pressed={sel === r.id} onClick={() => setSel(r.id)}>{r.name}</button></li>)}</ul>
        <p className="pd-note">Keine Standortangabe, keine Nachfrage.</p>
      </div>
    </div>
  )
}

function ObjectView() {
  const [t, setT] = useState(0)
  return (
    <div className="pd-obj">
      <div className="pd-gal">{IMG.map((s, i) => <img key={s} src={s} alt="" loading="lazy" style={{ '--i': i }} />)}</div>
      <div className="pd-panel">
        <div className="pd-tabs" role="tablist">{TABS.map(([n], i) => <button key={n} role="tab" type="button" aria-selected={t === i} onClick={() => setT(i)}>{n}</button>)}</div>
        <p className="pd-tx" key={t}>{TABS[t][1]}</p>
        <p className="pd-note">Beispieltext. Beispielbilder, keine Objekte von ARVENTAS.</p>
      </div>
    </div>
  )
}

export default function PropertyDashboard() {
  const [view, setView] = useState('uebersicht')
  const [region, setRegion] = useState(REGION_CH[0]), [type, setType] = useState(TYPE_CH[0]), [budget, setBudget] = useState(BUDGET[1])
  const [sel, setSel] = useState('by')
  const root = useRef(null), live = useRef(false), hold = useRef(false)
  useEffect(() => {
    const el = root.current
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { live.current = e.isIntersecting; el.classList.toggle('in', e.isIntersecting) }, { threshold: 0.35 }) : null
    io ? io.observe(el) : el.classList.add('in')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = reduce ? 0 : setInterval(() => {
      if (!live.current || hold.current) return
      setView((v) => VIEWS[(VIEWS.findIndex((x) => x.id === v) + 1) % VIEWS.length].id)
    }, 6500)
    return () => { io && io.disconnect(); id && clearInterval(id) }
  }, [])
  useEffect(() => {
    if (view !== 'karte' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const id = setInterval(() => { if (!hold.current) { i = (i + 1) % CYCLE.length; setSel(CYCLE[i]) } }, 1600)
    return () => clearInterval(id)
  }, [view])
  const S = { region, type, budget, setRegion, setType, setBudget }
  return (
    <div className="pd" ref={root} onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }} onFocus={() => { hold.current = true }} onBlur={() => { hold.current = false }}>
      <div className="pd-bar" aria-hidden="true"><i /><i /><i /><span>Illustratives Muster – keine Objektbewertung</span></div>
      <div className="pd-body">
        <nav className="pd-side" aria-label="Dashboard-Ansichten">
          {VIEWS.map((v) => <button key={v.id} type="button" aria-current={view === v.id ? 'true' : undefined} onClick={() => setView(v.id)}><Icon d={v.icon} /><span>{v.label}</span></button>)}
        </nav>
        <div className="pd-stage">
          <div className="pd-view" key={view}>
            {view === 'uebersicht' && <Overview />}
            {view === 'wert' && <Value />}
            {view === 'profil' && <Profile s={S} />}
            {view === 'karte' && <MapView sel={sel} setSel={setSel} />}
            {view === 'objekt' && <ObjectView />}
          </div>
        </div>
      </div>
    </div>
  )
}
