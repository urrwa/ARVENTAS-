import { useEffect, useRef } from 'react'

// Zweispaltige Karten: Beim Scrollen öffnen sich die Bilder von unten (Clip-Reveal mit Zoom), rechte Spalte versetzt.
// Kopfzeile über dem Bild; beim Hover kippt sie in Elfenbein (Vorbild Selaras-Works).
const IMGS = ['gal-1', 'gal-3', 'gal-6', 'gal-7', 'gal-8']

export default function AudienceCards({ items }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const cards = [...el.children]
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { cards.forEach((c) => c.style.setProperty('--q', 1)); return }
    let raf = 0
    const run = () => {
      raf = 0
      const vh = window.innerHeight
      cards.forEach((c) => {
        const r = c.getBoundingClientRect()
        const q = Math.min(1, Math.max(0, (vh * 0.92 - r.top) / (vh * 0.5)))
        c.style.setProperty('--q', q.toFixed(3))
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="aud" ref={root}>
      {items.map((it, i) => (
        <article key={it.t} className="aud-card">
          <div className="aud-bar">
            <span className="n">({String(i + 1).padStart(2, '0')})</span>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
          <div className="aud-img"><img src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" /></div>
        </article>
      ))}
    </div>
  )
}
