import { useEffect, useRef, useState } from 'react'

// Abschnitt bleibt stehen: links gleiten hohe Fotos nacheinander nach oben, rechts wechselt der Text zum jeweiligen Schritt.
// Schmale Bildschirme und reduzierte Bewegung: Schritte stehen untereinander, jeweils mit Foto.
export default function ProcessPinned({ steps, images, eyebrow, title }) {
  const box = useRef(null), track = useRef(null)
  const [a, setA] = useState(0)
  const n = steps.length
  useEffect(() => {
    const mq = matchMedia('(max-width: 860px), (prefers-reduced-motion: reduce)')
    let raf = 0
    const calc = () => {
      raf = 0
      const t = track.current
      if (!t) return
      if (mq.matches) { t.style.transform = ''; return }
      const r = box.current.getBoundingClientRect(), span = r.height - innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      const step = t.children[1] ? t.children[1].offsetTop - t.children[0].offsetTop : 0
      t.style.transform = `translate3d(0, ${-p * (n - 1) * step}px, 0)`
      setA(Math.round(p * (n - 1)))
    }
    const tick = () => { raf = raf || requestAnimationFrame(calc) }
    tick()
    addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick)
    return () => { removeEventListener('scroll', tick); removeEventListener('resize', tick); cancelAnimationFrame(raf) }
  }, [n])
  return (
    <div className="pp" ref={box} style={{ '--n': n }}>
      <div className="pp-stage">
        <div className="pp-col" aria-hidden="true">
          <div className="pp-track" ref={track}>
            {steps.map((s, i) => <div key={s.t} className="pp-pic"><img src={images[i % images.length]} alt="" loading="lazy" decoding="async" /></div>)}
          </div>
        </div>
        <div className="pp-txt">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
          <div className="pp-now" key={a} aria-live="polite">
            <span>{String(a + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <h3>{steps[a].t}</h3>
            <p>{steps[a].d}</p>
          </div>
        </div>
      </div>
      <ol className="pp-flat">
        {steps.map((s, i) => (
          <li key={s.t}><img src={images[i % images.length]} alt="" loading="lazy" decoding="async" /><div><span>{String(i + 1).padStart(2, '0')}</span><h3>{s.t}</h3><p>{s.d}</p></div></li>
        ))}
      </ol>
    </div>
  )
}
