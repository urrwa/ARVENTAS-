import { useEffect, useRef } from 'react'

// Ruhendes, weichgezeichnetes Bild als Bühne: Die große Überschrift blendet beim Scrollen aus, der Inhalt schiebt sich darüber.
export default function StillCover({ image, eyebrow, title, lead, id, children }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      el.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / (innerHeight * 0.7))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="rg" ref={root} aria-labelledby={id}>
      <div className="rg-bg" aria-hidden="true"><img src={image} alt="" loading="lazy" /></div>
      <div className="rg-title">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      <div className="wrap rg-wrap rg-free">{children}</div>
    </section>
  )
}
