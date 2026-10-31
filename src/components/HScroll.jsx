import { useRef } from 'react'
import Photo from './Photo.jsx'

// Horizontale Kartenleiste mit Pfeilen (Scroll-Snap).
export default function HScroll({ items }) {
  const ref = useRef(null)
  const go = (d) => { const el = ref.current; if (el) el.scrollBy({ left: d * Math.min(el.clientWidth * 0.8, 480), behavior: 'smooth' }) }
  return (
    <div className="hs">
      <div className="hs-track" ref={ref} tabIndex={0} role="group" aria-label="Geschäftsmodell">
        {items.map((it, i) => (
          <article key={it.t} className="hs-card">
            <div className="hs-img"><Photo image={it.photo || it.img} sizes="(max-width: 860px) 80vw, 420px" /></div>
            <span className="hs-no">0{i + 1}</span>
            <h3>{it.t}</h3>
            <p>{it.p}</p>
          </article>
        ))}
      </div>
      <div className="hs-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Zurück">←</button>
        <button type="button" onClick={() => go(1)} aria-label="Weiter">→</button>
      </div>
    </div>
  )
}
