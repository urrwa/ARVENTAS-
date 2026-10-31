import Photo from './Photo.jsx'
import { useEffect, useRef, useState } from 'react'

// Bühne mit Bildwechsel (Vorbild Reise-Slider): Ein Foto füllt die Fläche, groß die Aussage, unten Pfeile, Fortschrittsbalken und Zähler,
// rechts die nächsten Punkte als kleine Karten. Wechselt von selbst, solange sie sichtbar ist und nicht berührt wird. Fotos sind die vom Auftraggeber gelieferten.
const nn = (i) => String(i + 1).padStart(2, '0')

export default function FeatureSlider({ items, images, label }) {
  const root = useRef(null)
  const [a, setA] = useState(0)
  const [run, setRun] = useState(false)
  const [hold, setHold] = useState(false)
  const n = items.length
  const go = (i) => setA((i + n) % n)

  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const it = items[a]
  const next = [1, 2, 3].filter((k) => k < n).map((k) => (a + k) % n)

  return (
    <div className="fsl" ref={root} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      {items.map((x, i) => <Photo key={x.t} className={`fsl-bg${i === a ? ' on' : ''}`} src={images[i % images.length]} alt="" loading="lazy" decoding="async" />)}
      <div className="fsl-shade" />
      <p className="fsl-tag">{label}</p>
      <div className="fsl-main" key={a}>
        <h3>{it.t}</h3>
        <p>{it.d}</p>
      </div>
      <ul className="fsl-next">
        {next.map((i, k) => (
          <li key={items[i].t} style={{ '--k': k }}>
            <button type="button" onClick={() => go(i)} aria-label={items[i].t}>
              <Photo src={images[i % images.length]} alt="" loading="lazy" decoding="async" />
              <span><small>{nn(i)}</small>{items[i].t.replace('erkennung', '\u00ADerkennung')}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="fsl-ctl">
        <button type="button" onClick={() => go(a - 1)} aria-label="Zurück">←</button>
        <button type="button" onClick={() => go(a + 1)} aria-label="Weiter">→</button>
        <span className="fsl-bar"><i key={a} className={run && !hold && !reduce ? 'go' : ''} onAnimationEnd={() => go(a + 1)} /></span>
        <span className="fsl-no">{nn(a)} / {nn(n - 1)}</span>
      </div>
    </div>
  )
}
