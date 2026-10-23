import { useEffect, useRef, useState } from 'react'

// Breite Bildpaneele nebeneinander: das aktive öffnet sich mit Zoom, die anderen bleiben als schmale Streifen.
// Pfeile, Klick und Tasten wechseln; läuft von selbst, solange sichtbar. Schmal: Paneele untereinander.
export default function PanelSlider({ items, label }) {
  const [a, setA] = useState(0)
  const root = useRef(null), live = useRef(false), hold = useRef(false)
  const n = items.length
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { live.current = e.isIntersecting }, { threshold: 0.4 })
    io.observe(root.current)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = reduce ? 0 : setInterval(() => { if (live.current && !hold.current) setA((v) => (v + 1) % n) }, 5200)
    return () => { io.disconnect(); clearInterval(id) }
  }, [n])
  const go = (d) => setA((v) => (v + d + n) % n)
  return (
    <div ref={root} className="ps" role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}
      onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }}>
      {items.map((it, i) => (
        <article key={it.t} className={'ps-p' + (i === a ? ' on' : '')} onClick={() => setA(i)} aria-current={i === a}>
          <img src={it.img} alt="" loading="lazy" />
          <div className="ps-c">
            <b>{it.t}</b>
            <p>{it.d}</p>
          </div>
          <span className="ps-n" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        </article>
      ))}
      <div className="ps-nav">
        <button type="button" aria-label="Zurück" onClick={() => go(-1)}>←</button>
        <button type="button" aria-label="Weiter" onClick={() => go(1)}>→</button>
      </div>
    </div>
  )
}
