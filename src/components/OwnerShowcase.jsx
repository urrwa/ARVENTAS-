import { useEffect, useRef, useState } from 'react'

// Vollflächige Bühne mit zwei Bildhälften: Die nächste Hälfte schiebt sich von rechts nach links.
// Eine helle Karte unten zeigt den aktuellen Punkt, der Pfeil wechselt weiter. Läuft von selbst, solange sichtbar.
export default function OwnerShowcase({ items, children }) {
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
  return (
    <div ref={root} className="os" onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }}>
      <div className="os-bg" aria-hidden="true">
        {items.map((it, i) => {
          const pos = (i - a + n) % n
          return <div key={it.t} className="os-p" style={{ left: pos * 50 + '%', transition: pos === n - 1 ? 'none' : undefined }}><img src={it.img} alt="" loading="lazy" /></div>
        })}
      </div>
      <div className="os-top">{children}</div>
      <div className="os-card" aria-live="polite">
        <img key={a} src={items[a].img} alt="" />
        <div><small>{String(a + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</small><b>{items[a].t}</b></div>
        <button type="button" aria-label="Weiter" onClick={() => setA((a + 1) % n)}>→</button>
      </div>
    </div>
  )
}
