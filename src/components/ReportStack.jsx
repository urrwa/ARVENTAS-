import { useEffect, useRef, useState } from 'react'
import { Btn } from './ui.jsx'
import ReportViewer, { PANELS } from './ReportViewer.jsx'

// Objektreport als Blätterstapel: Beim Scrollen heben sich die Seiten des Berichts nacheinander ab, rechts erscheint der passende Abschnitt.
// Schmale Bildschirme und reduzierte Bewegung: die ruhige Reiteransicht (ReportViewer).
const N = PANELS.length
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Schematische Seitenbilder (keine Zahlen, keine Werte).
const Art = ({ id }) => {
  const line = { stroke: '#071321', strokeOpacity: .22, strokeWidth: 1.4, fill: 'none' }
  const gold = { stroke: '#b8975f', strokeWidth: 2.4, fill: 'none', strokeLinecap: 'round' }
  const fill = { fill: '#071321', fillOpacity: .12 }
  const g = { fill: '#c8ad80', fillOpacity: .8 }
  switch (id) {
    case 'wert': return <g><rect x="0" y="0" width="200" height="8" {...fill} /><rect x="40" y="0" width="70" height="8" {...g} /><rect x="0" y="22" width="200" height="8" {...fill} /><rect x="70" y="22" width="60" height="8" {...g} /><rect x="0" y="44" width="200" height="8" {...fill} /><rect x="20" y="44" width="55" height="8" {...g} /></g>
    case 'standort': return <g>{[0, 40, 80, 120, 160, 200].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="64" {...line} />)}{[0, 32, 64].map((y) => <line key={y} x1="0" y1={y} x2="200" y2={y} {...line} />)}<path d="M0 50 C50 40 80 10 130 28 S190 18 200 8" {...line} strokeOpacity=".4" /><circle cx="112" cy="28" r="6" fill="#c8ad80" /><circle cx="112" cy="28" r="12" {...gold} strokeWidth="1.2" /></g>
    case 'potenzial': return <g>{[18, 34, 52, 30, 62].map((h, i) => <rect key={i} x={i * 40 + 4} y={64 - h} width="26" height={h} {...fill} />)}<rect x="164" y="2" width="26" height="62" fill="none" stroke="#b8975f" strokeWidth="1.6" strokeDasharray="4 4" /></g>
    case 'wirtschaft': return <g><line x1="0" y1="62" x2="200" y2="62" {...line} /><line x1="0" y1="32" x2="200" y2="32" {...line} /><path d="M0 52 L40 44 L80 48 L120 30 L160 34 L200 14" {...gold} /><path d="M0 56 L50 54 L100 58 L150 50 L200 52" {...line} strokeOpacity=".5" /></g>
    case 'hinweise': return <g>{[0, 22, 44].map((y, i) => <g key={y}><circle cx="8" cy={y + 8} r="6" fill="none" stroke="#071321" strokeOpacity=".4" strokeWidth="1.4" />{i < 2 && <path d={`M5 ${y + 8} L8 ${y + 11} L12 ${y + 5}`} {...gold} strokeWidth="1.8" />}<rect x="26" y={y + 4} width={150 - i * 26} height="8" {...fill} /></g>)}</g>
    default: return <g>{[8, 20, 32].map((r) => <circle key={r} cx="100" cy="32" r={r} {...line} strokeOpacity={0.45 - r / 100} />)}<circle cx="100" cy="32" r="4" fill="#c8ad80" /><path d="M100 32 L150 12" {...gold} strokeWidth="1.6" /><circle cx="150" cy="12" r="4" fill="none" stroke="#b8975f" strokeWidth="1.6" /><path d="M100 32 L56 52" {...line} strokeOpacity=".5" /><circle cx="56" cy="52" r="3.5" fill="none" stroke="#071321" strokeOpacity=".45" strokeWidth="1.4" /></g>
  }
}

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
    const el = box.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * ((k + 0.5) / N), behavior: 'smooth' })
  }
  const head = (
    <header className="sec-head rp-head">
      <p className="eyebrow rv">Objektreport</p>
      <h2 id="h-rep" className="h2 rv">Ein klares Bild.</h2>
      <p className="lead rv">Datenbasiert analysiert. Persönlich geprüft.</p>
    </header>
  )
  const cta = (
    <>
      <div className="btn-row">
        <Btn to="/objektreport#muster" variant="line">Muster ansehen</Btn>
        <Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn>
      </div>
      <p className="small" style={{ marginTop: 18 }}>Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen.</p>
    </>
  )
  if (flat) return <div className="wrap">{head}<ReportViewer id="muster-home" />{cta}</div>
  return (
    <div className="rp" ref={box}>
      <div className="rp-stick">
        <div className="wrap rp-grid">
          <div className="rp-left">
            {head}
            <ol className="rp-list" aria-label="Analyseebenen">
              {PANELS.map((p, k) => (
                <li key={p.id}><button type="button" className={k === a ? 'on' : ''} aria-current={k === a ? 'true' : undefined} onClick={() => jump(k)}><small>{p.small}</small><span>{p.label}</span></button></li>
              ))}
            </ol>
            {cta}
          </div>
          <div className="rp-stage">
            <p className="rp-num" key={a}><b>{PANELS[a].small}</b><span>{PANELS[a].label}</span></p>
            <div className="rp-scene" aria-hidden="true">
              <div className="rp-sheets">
                {PANELS.map((p, k) => (
                  <div key={p.id} className={'rp-sheet ' + (k < a ? 'gone' : k === a ? 'on' : 'under')} style={{ '--z': (N - 1 - k) * 22, '--d': Math.abs(k - a) }}>
                    <div className="rp-sh-top"><small>{p.small}</small><span>{p.label}</span></div>
                    <svg viewBox="0 0 200 64" className="rp-art"><Art id={p.id} /></svg>
                    <i /><i /><i className="s" />
                    <svg viewBox="0 0 200 64" className="rp-art b"><Art id={PANELS[(k + 2) % N].id} /></svg>
                    <i /><i className="s" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rp-card" role="region" aria-live="polite" aria-label={'Abschnitt ' + PANELS[a].label} key={PANELS[a].id}>
              <small className="rp-sec">{`Abschnitt ${PANELS[a].small} von 0${N}`}</small>
              {PANELS[a].render()}
            </div>
            <p className="rp-cap">Sechs Ebenen der Analyse, einzeln bewertet. Illustratives Muster – keine Objektbewertung.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
