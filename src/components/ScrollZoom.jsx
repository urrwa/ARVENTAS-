import { useEffect, useRef } from 'react'
import Letters from './Letters.jsx'

// Scroll-Zoom: Das Foto wächst von einem kleinen Rahmen zwischen zwei Wörtern auf Vollbild.
export default function ScrollZoom({ left, right, image }) {
  const wrap = useRef(null)
  useEffect(() => {
    const el = wrap.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el && el.style.setProperty('--p', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="sz" ref={wrap}>
      <div className="sz-stick">
        <span className="sz-word sz-l"><Letters text={left} /></span>
        <div className="sz-img"><img src={image} alt="" loading="lazy" /></div>
        <span className="sz-word sz-r"><Letters text={right} /></span>
      </div>
    </section>
  )
}
