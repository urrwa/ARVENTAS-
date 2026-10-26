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
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Beim Scrollen wechseln die Seiten des Berichts: Die vorderste Seite gleitet weg, die nächste rückt nach vorn; links ändern sich Kapitel, Frage und Antwort.
// Schmale Bildschirme und reduzierte Bewegung: ruhige Ansicht ohne Scroll-Bühne, Kapitel per Klick.
export default function ReportStack() {
  const box = useRef(null)
  const [flat, setFlat] = useState(false)
  const [a, setA] = useState(0)
  useEffect(() => {
    const mq = matchMedia('(max-width: 860px), (prefers-reduced-motion: reduce)')
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
      setA(Math.floor(t * N))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [flat])
  const jump = (k) => {
    if (flat) { setA(k); return }
    const el = box.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * ((k + 0.5) / N), behavior: 'smooth' })
  }
  const [q, ans] = QA[PANELS[a].id]
  return (
    <div className={'rps' + (flat ? ' flat' : '')} ref={box}>
      <div className="rps-stick">
        <div className="rps-bg" aria-hidden="true"><img src="/media/p/report-desk.webp" alt="" loading="lazy" /></div>
        <div className="wrap rps-in">
          <div className="rps-left">
            <header className="sec-head rp-head">
              <p className="eyebrow rv">Objektreport</p>
              <h2 id="h-rep" className="h2 rv">Ein klares Bild.</h2>
              <p className="lead rv">Datenbasiert analysiert. Persönlich geprüft.</p>
            </header>
            <ol className="rpx-list" aria-label="Analyseebenen">
              {PANELS.map((p, k) => (
                <li key={p.id}><button type="button" className={k === a ? 'on' : ''} aria-current={k === a ? 'true' : undefined} onClick={() => jump(k)}><small>{p.small}</small><span>{p.label}</span></button></li>
              ))}
            </ol>
            <div className="rpx-qa" key={a} aria-live="polite">
              <p className="rpx-q">{q}</p>
              <p className="rpx-a">{ans}</p>
            </div>
            <div className="btn-row">
              <Btn to="/objektreport#muster" variant="line">Muster ansehen</Btn>
              <Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn>
            </div>
            <p className="small rp-note">Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen. Muster, keine Objektbewertung.</p>
          </div>
          <div className="rps-pages" role="region" aria-live="polite" aria-label={'Abschnitt ' + PANELS[a].label}>
            {PANELS.map((p, k) => (
              <article key={p.id} className={'rps-page ' + (k < a ? 'gone' : k === a ? 'on' : 'next')} style={{ '--o': Math.max(0, k - a) }} aria-hidden={k === a ? undefined : 'true'}>
                <small className="rp-sec">{`Objektreport · ${p.small} ${p.label}`}</small>
                {p.render()}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
