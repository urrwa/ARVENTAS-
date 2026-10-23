import { useEffect, useRef, useState } from 'react'
import { OWNER_PROCESS, INVESTOR_PROCESS } from '../content/data.js'

// Zwei nachvollziehbare Prozesse als Karten, die beim Scrollen nacheinander einlaufen (links/rechts im Wechsel); frühere Karten bleiben gedimmt stehen.
// Schmale Bildschirme und reduzierte Bewegung: alle Karten stehen sofort, ohne Fixierung.
const pic = (k) => `/media/p/${k}.webp`
const IMG = {
  owner: ['home.proc.0', 'home.proc.1', 'home.proc.2', 'home.proc.3', 'home.proc.4', 'sys.step.0'].map(pic),
  investor: ['bw.step.0', 'bw.step.1', 'bw.step.2', 'bw.step.3', 'bw.step.4', 'sa.step.0'].map(pic),
}
export default function ProcessTimeline({ initial = 'owner' }) {
  const [who, setWho] = useState(initial)
  const [a, setA] = useState(0)
  const [sh, setSh] = useState(0)
  const [flat, setFlat] = useState(false)
  const box = useRef(null)
  const steps = who === 'owner' ? OWNER_PROCESS : INVESTOR_PROCESS
  const n = steps.length
  useEffect(() => {
    const mq = matchMedia('(max-width: 860px), (prefers-reduced-motion: reduce), (max-height: 640px)')
    const el = box.current
    let raf = 0
    const calc = () => {
      raf = 0
      if (mq.matches) return
      const r = el.getBoundingClientRect(), span = r.height - innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      setA(Math.min(n - 1, Math.floor(p * n * 0.999)))
    }
    const tick = () => { raf = raf || requestAnimationFrame(calc) }
    const mode = () => { setFlat(mq.matches); tick() }
    mode()
    addEventListener('scroll', tick, { passive: true }); addEventListener('resize', mode)
    return () => { removeEventListener('scroll', tick); removeEventListener('resize', mode); cancelAnimationFrame(raf) }
  }, [n])
  useEffect(() => {
    if (sh > a) { setSh(a); return }
    if (sh < a) { const t = setTimeout(() => setSh(sh + 1), 520); return () => clearTimeout(t) }
  }, [sh, a])
  const pick = (w) => { setWho(w); setA(0); setSh(0) }
  return (
    <div ref={box} className={'prc' + (flat ? ' flat' : '')} style={{ '--n': n }}>
      <div className="prc-stage">
        <div className="toggle" role="tablist" aria-label="Prozess wählen">
          <button type="button" role="tab" aria-selected={who === 'owner'} onClick={() => pick('owner')}>Für Eigentümer</button>
          <button type="button" role="tab" aria-selected={who === 'investor'} onClick={() => pick('investor')}>Für Investoren</button>
        </div>
        <ol className="prc-grid">
          {steps.map((s, i) => (
            <li key={who + s.t} className={flat || i < sh ? 'seen' : i === sh ? 'now' : ''} style={{ '--side': i % 2 ? 1 : -1 }}>
              <img src={IMG[who][i]} alt="" loading="lazy" />
              <div>
                <b>{s.t}</b>
                <p>{s.d}</p>
                <small>Schritt {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</small>
              </div>
              <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </div>
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
