import { useEffect, useRef } from 'react'

// Großer Absatz mit kleinen Bildern zwischen den Wörtern: Teile blenden beim Scrollen nacheinander ein,
// beim Hover (oder Tippen) wächst ein Bild weich über den Text (Vorbild Webloom).
export default function InlineText({ parts }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect(), vh = window.innerHeight
      el.style.setProperty('--p', Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (vh * 0.5))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <p className="inl" ref={ref} style={{ '--n': parts.length }}>
      {parts.map((p, i) => (typeof p === 'string'
        ? <span key={i} className="inl-t" style={{ '--i': i }}>{p}</span>
        : <span key={i} className="inl-i" style={{ '--i': i }} tabIndex={0}><img src={p.img} alt="" loading="lazy" decoding="async" /></span>))}
    </p>
  )
}
