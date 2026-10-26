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

const QPage = ({ k }) => {
  const p = PANELS[k]
  const [q, ans] = QA[p.id]
  return (
    <div className="bk-q">
      <small>Frage</small>
      <b>{p.small}</b>
      <h3>{q}</h3>
      <p>{ans}</p>
      <em>{p.label}</em>
    </div>
  )
}
const CPage = ({ k }) => (
  <div className="bk-c">
    <small className="rp-sec">{`Objektreport · ${PANELS[k].small} ${PANELS[k].label}`}</small>
    {PANELS[k].render()}
  </div>
)

// Der Bericht blättert sich beim Scrollen auf: links die Frage des Kapitels, rechts die Seite mit der Antwort.
// Schmale Bildschirme und reduzierte Bewegung: alle Kapitel untereinander.
export default function ReportStack() {
  const box = useRef(null)
  const [flat, setFlat] = useState(false)
  const [a, setA] = useState(0)
  useEffect(() => {
    const mq = matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)')
    const sync = () => setFlat(mq.matches)
    sync(); mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    if (flat) return
    let raf = 0
    const tick = () => {
      raf = 0
      const el = box.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const t = clamp(-r.top / Math.max(1, el.offsetHeight - innerHeight), 0, 0.9999)
      setA(Math.floor(t * STAGES))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [flat])
  const jump = (k) => {
    const el = box.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * ((k + 0.5) / STAGES), behavior: 'smooth' })
  }
  const head = (
    <header className="bk-head">
      <div>
        <p className="eyebrow rv">Objektreport</p>
        <h2 id="h-rep" className="h2 rv">Ein klares Bild.</h2>
        <p className="lead rv">Datenbasiert analysiert. Persönlich geprüft.</p>
      </div>
      <div className="bk-cta">
        <div className="btn-row">
          <Btn to="/objektreport#muster" variant="line">Muster ansehen</Btn>
          <Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn>
        </div>
        <p className="small rp-note">Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen. Muster, keine Objektbewertung.</p>
      </div>
    </header>
  )
  if (flat) {
    return (
      <div className="wrap">
        {head}
        <div className="bk-flat">
          {PANELS.map((p, k) => (<div key={p.id} className="bk-flat-i"><QPage k={k} /><CPage k={k} /></div>))}
        </div>
      </div>
    )
  }
  return (
    <div className="bk" ref={box}>
      <div className="bk-stick">
        <div className="wrap bk-in">
          {head}
          <div className={'bk-book' + (a === 0 ? ' closed' : '')} role="region" aria-live="polite" aria-label={a === 0 ? 'Objektreport, geschlossen' : 'Kapitel ' + PANELS[a - 1].label}>
            {Array.from({ length: N + 1 }, (_, i) => (
              <div key={i} className={'bk-leaf' + (i < a ? ' turned' : '')} style={{ zIndex: i < a ? i + 1 : N + 1 - i }}>
                <div className="bk-face front">
                  {i === 0 ? (
                    <div className="bk-cover"><img src="/media/arventas-logo.png" alt="" /><b>Objektreport</b><span>Muster</span></div>
                  ) : <CPage k={i - 1} />}
                </div>
                <div className="bk-face back">{i < N ? <QPage k={i} /> : null}</div>
              </div>
            ))}
          </div>
          <ol className="bk-steps" aria-label="Kapitel">
            {PANELS.map((p, k) => (
              <li key={p.id}><button type="button" className={a === k + 1 ? 'on' : ''} onClick={() => jump(k + 1)}><small>{p.small}</small><span>{p.label}</span></button></li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
