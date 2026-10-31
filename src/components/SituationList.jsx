import { useEffect, useRef } from 'react'
import Photo from './Photo.jsx'

// Der Abschnitt bleibt beim Scrollen stehen: links ein festes Foto, rechts eine feste Überschrift. Die Situationen laufen darunter nach oben durch
// und blenden am oberen Rand aus. Schmal: normale Liste ohne Fixierung.
export default function SituationList({ items, eyebrow, title, img }) {
  const box = useRef(null), view = useRef(null), track = useRef(null)
  useEffect(() => {
    const mq = matchMedia('(max-width: 860px), (prefers-reduced-motion: reduce)')
    let raf = 0
    const calc = () => {
      raf = 0
      const t = track.current, v = view.current
      if (!t || !v) return
      const rows = Array.from(t.children)
      if (mq.matches) { t.style.transform = ''; rows.forEach((r) => { r.style.opacity = '' }); return }
      const r = box.current.getBoundingClientRect(), span = r.height - innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      const max = Math.max(0, t.offsetHeight - v.clientHeight)
      const y = -p * max
      t.style.transform = `translate3d(0, ${y}px, 0)`
      rows.forEach((row) => { const top = row.offsetTop + y; row.style.opacity = Math.min(1, Math.max(0, 1 + top / (row.offsetHeight * 0.7))).toFixed(3) })
    }
    const tick = () => { raf = raf || requestAnimationFrame(calc) }
    tick()
    addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick)
    return () => { removeEventListener('scroll', tick); removeEventListener('resize', tick); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="sl" ref={box}>
      <div className="sl-stage">
        <div className="sl-pic pic-open"><Photo image={img} sizes="(max-width: 860px) 92vw, 42vw" /></div>
        <div className="sl-main">
          <header className="sl-head">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2">{title}</h2>
          </header>
          <div className="sl-view" ref={view}>
            <ol className="sl-list" ref={track}>
              {items.map((it, i) => (
                <li key={it.id} className="sl-item">
                  <span className="sl-no" aria-hidden="true">{i + 1}</span>
                  <div>
                    <small>{it.label}</small>
                    <h3>{it.t}</h3>
                    <p>{it.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
