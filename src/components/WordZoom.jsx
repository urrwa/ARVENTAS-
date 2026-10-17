import { useEffect, useRef, useState } from 'react'
import Letters from './Letters.jsx'

// Wort erscheint, zwischen den Wortteilen wechseln kleine Fotos, beim Scrollen öffnet sich das Foto auf Vollbild.
export default function WordZoom({ left, right, images }) {
  const wrap = useRef(null)
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 1300)
    return () => clearInterval(t)
  }, [images.length])
  useEffect(() => {
    const el = wrap.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el && el.style.setProperty('--p', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="wz" ref={wrap}>
      <div className="wz-stick">
        <div className="wz-row">
          <span className="wz-w"><Letters text={left} per={60} /></span>
          <span className="wz-slot">
            {images.map((src, i) => <img key={src} src={src} alt="" className={i === idx ? 'on' : ''} />)}
          </span>
          <span className="wz-w"><Letters text={right} per={60} delay={300} /></span>
        </div>
        <div className="wz-full" aria-hidden="true">
          {images.map((src, i) => <img key={src} src={src} alt="" className={i === idx ? 'on' : ''} />)}
        </div>
      </div>
    </section>
  )
}
