import { useEffect, useRef } from 'react'
import Photo from './Photo.jsx'

// Versetzte Fotokarten: Spalten laufen beim Scrollen mit unterschiedlicher Geschwindigkeit, Fotos werden beim Erscheinen aufgezogen.
export default function ParallaxCards({ items, inside = false }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    const cards = Array.from(el.querySelectorAll('.pc-card'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const run = () => {
      raf = 0
      const vh = window.innerHeight
      cards.forEach((c) => {
        const r = c.getBoundingClientRect()
        const o = Math.max(-1.2, Math.min(1.2, (r.top + r.height / 2 - vh / 2) / vh))
        c.style.setProperty('--o', o.toFixed(3))
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    if (!reduce) { run(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on) }
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.2 }) : null
    cards.forEach((c) => (io ? io.observe(c) : c.classList.add('in')))
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf); io && io.disconnect() }
  }, [])
  return (
    <div className={`pc${inside ? ' pc-in' : ''}`} ref={root}>
      {items.map((it, i) => (
        <article key={i} className={`pc-card${it.wide ? ' wide' : ''}`} style={{ '--s': it.speed ?? 1, '--i': i }}>
          <div className="pc-img" style={{ aspectRatio: it.ratio || '4 / 5' }}>
            <Photo image={it.photo || it.img} />
            <div className="pc-cap"><h3 className="pc-t">{it.title}</h3>{inside && <p>{it.text}</p>}</div>
          </div>
          {!inside && <p>{it.text}</p>}
        </article>
      ))}
    </div>
  )
}
