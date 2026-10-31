import Photo from './Photo.jsx'
import { useEffect, useRef } from 'react'

// Nummerierte Zeilen: Zahl, Titel mit Text, Bild rechts. Beim Scrollen öffnet sich das Bild von unten, die Linie zeichnet sich (Vorbild Haven).
const IMGS = ['real/begutachtung-travertin', 'real/modell-skyline', 'real/eingang-travertin', 'real/karte', 'real/glasfassaden', 'real/modell-dunkel', 'real/baulucke']

export default function StackRows({ items }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const rows = [...el.children]
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { rows.forEach((r) => r.style.setProperty('--q', 1)); return }
    let raf = 0
    const run = () => {
      raf = 0
      const vh = window.innerHeight
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect()
        r.style.setProperty('--q', Math.min(1, Math.max(0, (vh * 0.92 - b.top) / (vh * 0.5))).toFixed(3))
        const nx = rows[i + 1]
        // Verdeckung durch die nächste Zeile: 0 = frei, 1 = ganz überdeckt
        const c = nx ? Math.min(1, Math.max(0, 1 - (nx.getBoundingClientRect().top - b.top) / b.height)) : 0
        r.style.setProperty('--c', c.toFixed(3))
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="srows" ref={root}>
      {items.map((it, i) => (
        <article key={it.t} className="sr-row" style={{ '--i': i }}>
          <span className="sr-n">{String(i + 1).padStart(2, '0')}</span>
          <div className="sr-t">
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
          <div className="sr-img" aria-hidden="true"><Photo src={it.img || `/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" /></div>
        </article>
      ))}
    </div>
  )
}
