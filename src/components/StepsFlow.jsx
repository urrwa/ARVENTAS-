import { useEffect, useRef } from 'react'

// Schlangenlinie durch die Schritte: Text und Bild wechseln die Seite, die goldene Linie färbt sich beim Scrollen ein (Vorbild steps-flow).
const IMGS = ['cta-abend-1', 'buero-abend-2', 'gal-5', 'buero-abend-1', 'cta-abend-2']

export default function StepsFlow({ items, title }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const rows = [...el.querySelectorAll('.sf-step')]
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { rows.forEach((r) => r.classList.add('on')); return }
    let raf = 0
    const run = () => {
      raf = 0
      const vh = window.innerHeight
      rows.forEach((r) => {
        const b = r.getBoundingClientRect()
        r.classList.toggle('on', b.top < vh * 0.62)
        r.style.setProperty('--f', Math.min(1, Math.max(0, (vh * 0.62 - b.top) / (b.height * 0.9))).toFixed(3))
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="sf" ref={root}>
      <div className="wrap">
        <h2 className="sf-h">{title}</h2>
        <ol className="sf-list">
          {items.map((it, i) => (
            <li key={it.t} className={`sf-step ${i % 2 ? 'even' : 'odd'}`}>
              <div className="sf-txt">
                <span className="sf-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
              <div className="sf-img"><img src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" /></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
