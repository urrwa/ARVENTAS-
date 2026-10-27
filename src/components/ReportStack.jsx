import { useEffect, useRef, useState } from 'react'
import { Btn } from './ui.jsx'
import { PANELS } from './ReportViewer.jsx'

// Objektreport als Blätterstapel: Beim Scrollen heben sich die Seiten des Berichts nacheinander ab, rechts erscheint der passende Abschnitt.
// Schmale Bildschirme und reduzierte Bewegung: die ruhige Reiteransicht (ReportViewer).

// Jede Ebene beantwortet eine einfache Frage; die Seite rechts zeigt, wie die Antwort im Report aussieht.
const QA = {
  wert: ['Was ist die Immobilie ungefähr wert?', 'Mehrere Bewertungsverfahren nebeneinander, als Spanne und nicht als Einzelzahl.'],
  standort: ['Wie ist der Standort einzuordnen?', 'Lage, Umfeld und Anbindung verständlich zusammengefasst.'],
  potenzial: ['Was wäre möglich?', 'Modernisierung, Ausbau oder Umnutzung, mit Chancen und Grenzen.'],
  wirtschaft: ['Rechnet sich das Objekt?', 'Verschiedene Szenarien im Vergleich, ohne Renditezusage.'],
  hinweise: ['Was sollte vor einer Entscheidung geprüft werden?', 'Offene Punkte und Hinweise, nach Wichtigkeit geordnet.'],
  nachfrage: ['Wer könnte sich dafür interessieren?', 'Einschätzung, welche Interessentengruppen zum Objekt passen.'],
}

const N = PANELS.length
const STAGES = N + 1 // 0 = geschlossener Bericht, 1..N = aufgeschlagene Kapitel
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const ICON = {
  scale: 'M12 4v16M6 20h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z',
  coins: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5',
  house: 'M4 21V9l8-6 8 6v12zM9 21v-6h6v6',
  pin: 'M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 17h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  swap: 'M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4',
  chart: 'M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  wrench: 'M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 0-2-2zM16 3l2 2',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M17 14c2.8 0 5 2.2 5 5',
}
const Ic = ({ n }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICON[n]} /></svg>
// Bild und Symbole je Kapitel (Beispielbilder, keine echten Objekte, keine Zahlen).
const VIS = {
  wert: { img: 'ablauf-wohnhaus', img2: 'ablauf-fassade', icon: 'scale', chips: [['scale', 'Vergleich'], ['coins', 'Ertrag'], ['house', 'Substanz']] },
  standort: { img: 'ablauf-luftbild', img2: 'ablauf-strasse', icon: 'pin', chips: [['pin', 'Mikrolage'], ['route', 'Anbindung'], ['trend', 'Entwicklung']] },
  potenzial: { img: 'h-entwicklung', img2: 'ablauf-modell', icon: 'layers', chips: [['house', 'Bestand'], ['layers', 'Verdichtung'], ['swap', 'Nutzung']] },
  wirtschaft: { img: 'h-analyse', img2: 'ablauf-bibliothek', icon: 'chart', chips: [['chart', 'Basis'], ['trend', 'Chancen'], ['shield', 'Risiken']] },
  hinweise: { img: 'ablauf-schreibtisch', img2: 'ablauf-fenster', icon: 'shield', chips: [['doc', 'Unterlagen'], ['wrench', 'Zustand'], ['scale', 'Recht']] },
  nachfrage: { img: 'ablauf-strasse', img2: 'ablauf-eingang', icon: 'people', chips: [['people', 'Profile'], ['pin', 'Region'], ['coins', 'Budget']] },
}

const QPage = ({ k }) => {
  const p = PANELS[k]
  const [q, ans] = QA[p.id]
  const v = VIS[p.id]
  return (
    <div className="bk-q">
      <div className="bk-qtop"><div><small>Frage</small><b>{p.small}</b></div><span className="bk-badge"><Ic n={v.icon} /></span></div>
      <h3>{q}</h3>
      <p>{ans}</p>
      <figure className="bk-pic"><img src={`/media/p/${v.img}.webp`} alt="" loading="lazy" /><figcaption>Beispielbild</figcaption></figure>
    </div>
  )
}
const CPage = ({ k }) => (
  <div className="bk-c">
    <small className="rp-sec">{`Objektreport · ${PANELS[k].small} ${PANELS[k].label}`}</small>
    {PANELS[k].render()}
    <ul className="bk-chips">{VIS[PANELS[k].id].chips.map(([ic, t]) => <li key={t}><Ic n={ic} /><span>{t}</span></li>)}</ul>
    <figure className="bk-strip"><img src={`/media/p/${VIS[PANELS[k].id].img2}.webp`} alt="" loading="lazy" /></figure>
  </div>
)

// Objektreport als Kartenraster über einem weichgezeichneten Bild: Die Überschrift blendet beim Scrollen aus, die sechs Kapitel schieben sich als große Bildkarten darüber.
// Ein Klick öffnet die Report-Seite des Kapitels (Frage und Antwort).
export default function ReportStack() {
  const root = useRef(null)
  const [open, setOpen] = useState(null)
  useEffect(() => {
    const el = root.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (-r.top) / (innerHeight * 0.7)))
      el.style.setProperty('--p', p.toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  useEffect(() => {
    if (open == null) return
    const key = (e) => { if (e.key === 'Escape') setOpen(null) }
    addEventListener('keydown', key)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [open])
  return (
    <div className="rg" ref={root}>
      <div className="rg-bg" aria-hidden="true"><img src="/media/p/ablauf-bibliothek.webp" alt="" loading="lazy" /></div>
      <div className="rg-title">
        <p className="eyebrow">Objektreport</p>
        <h2 id="h-rep">Ein klares Bild.</h2>
        <p className="lead">Datenbasiert analysiert. Persönlich geprüft.</p>
      </div>
      <div className="wrap rg-wrap">
        <ul className="rg-grid">
          {PANELS.map((p, k) => {
            const v = VIS[p.id]
            return (
              <li key={p.id}>
                <button type="button" className="rg-card" onClick={() => setOpen(k)} aria-label={`${p.small} ${p.label}: ${QA[p.id][0]}`}>
                  <img src={`/media/p/${v.img}.webp`} alt="" loading="lazy" />
                  <span className="rg-no">{p.small} · {p.label}</span>
                  <span className="bk-badge rg-ic"><Ic n={v.icon} /></span>
                  <span className="rg-cap"><b>{QA[p.id][0]}</b><em>{QA[p.id][1]}</em><i>Report-Seite ansehen <u aria-hidden="true">→</u></i></span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="rg-cta">
          <div className="btn-row">
            <Btn to="/objektreport#muster" variant="line">Muster ansehen</Btn>
            <Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn>
          </div>
          <p className="small rp-note">Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen. Beispielbilder und Muster, keine Objektbewertung.</p>
        </div>
      </div>
      {open != null && (
        <div className="rg-modal" role="dialog" aria-modal="true" aria-label={PANELS[open].label} onClick={() => setOpen(null)}>
          <div className="rg-sheet" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="rg-x" onClick={() => setOpen(null)} aria-label="Schließen">×</button>
            <div className="rg-pg"><QPage k={open} /></div>
            <div className="rg-pg"><CPage k={open} /></div>
          </div>
        </div>
      )}
    </div>
  )
}
