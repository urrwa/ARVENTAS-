import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

// Geteilte Bühne: links bleibt das Bild stehen und wechselt, rechts scrollen die Schritte (Titel oben, Text unten). Vorbild Archter.
const IMGS = ['gal-1', 'gal-2', 'gal-3', 'gal-5', 'gal-7']
export default function JourneySplit({ items, label, title }) {
  const [act, setAct] = useState(0)
  const blocks = useRef([])
  useEffect(() => {
    let raf = 0
    const run = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      let best = 0, bd = 1e9
      blocks.current.forEach((b, i) => { if (!b) return; const r = b.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i } })
      setAct(best)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="js" aria-label={title}>
      <div className="js-img" aria-hidden="true">
        {items.map((it, i) => <img key={it.t} src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" className={act === i ? 'on' : ''} />)}
        <span className="js-count" data-notr>{String(act + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
      </div>
      <div className="js-list">
        {items.map((it, i) => (
          <article key={it.t} className={`js-step${act === i ? ' on' : ''}`} ref={(el) => (blocks.current[i] = el)}>
            <div className="js-top">
              {i === 0 && <p className="js-label">{label}</p>}
              <span className="ring"><Icon name={it.icon} size={20} /></span>
              <h3>{it.t}</h3>
            </div>
            <p className="js-text">{it.d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
