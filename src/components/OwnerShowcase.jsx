import Photo from './Photo.jsx'
import { useEffect, useRef, useState } from 'react'

// Vollflächige Bühne mit zwei Bildhälften: Die nächste Hälfte schiebt sich von rechts nach links.
// Die Bühne bleibt beim Scrollen stehen, der Scrollfortschritt wechselt die Bildhälften. Die helle Karte unten zeigt den Punkt, der Pfeil scrollt zum nächsten.
export default function OwnerShowcase({ items, children }) {
  const [a, setA] = useState(0)
  const box = useRef(null)
  const n = items.length
  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const r = box.current.getBoundingClientRect(), span = r.height - innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      setA(Math.min(n - 1, Math.floor(p * n * 0.999)))
    }
    const tick = () => { raf = raf || requestAnimationFrame(calc) }
    tick()
    addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick)
    return () => { removeEventListener('scroll', tick); removeEventListener('resize', tick); cancelAnimationFrame(raf) }
  }, [n])
  const go = (i) => {
    const el = box.current, span = el.offsetHeight - innerHeight
    scrollTo({ top: el.getBoundingClientRect().top + scrollY + ((i + 0.5) / n) * span, behavior: 'smooth' })
  }
  return (
    <div ref={box} className="os-scroll" style={{ '--n': n }}><div className="os">
      <div className="os-bg" aria-hidden="true">
        {items.map((it, i) => {
          const pos = (i - a + n) % n
          return <div key={it.t} className="os-p" style={{ left: pos * 50 + '%', transition: pos === n - 1 ? 'none' : undefined }}><Photo src={it.img} alt="" loading="lazy" /></div>
        })}
      </div>
      <div className="os-top">{children}</div>
      <div className="os-card" aria-live="polite">
        <Photo key={a} src={items[a].img} alt="" loading="eager" />
        <div><small>{String(a + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</small><b>{items[a].t}</b></div>
        <button type="button" aria-label="Weiter" onClick={() => go((a + 1) % n)}>→</button>
      </div>
    </div></div>
  )
}
