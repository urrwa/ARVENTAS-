import { useEffect, useRef } from 'react'

// Ruhige Zielgruppen-Zeile: ein breites Foto öffnet sich beim Scrollen, darunter fünf schlichte Textspalten mit Haarlinie.
export default function AudienceCards({ items }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--q', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect(), vh = window.innerHeight
      el.style.setProperty('--q', Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.55))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="aud2" ref={root}>
      <div className="aud2-band" aria-hidden="true"><img src="/media/buero-abend-1.webp" alt="" loading="lazy" decoding="async" /></div>
      <ol className="aud2-cols">
        {items.map((it, i) => (
          <li key={it.t} style={{ '--i': i }}>
            <span className="n">({String(i + 1).padStart(2, '0')})</span>
            <h3>{it.t.replace('gesellschaften', '\u00ADgesellschaften')}</h3>
            <p>{it.d}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
