import { useEffect, useRef } from 'react'
import { Btn } from './ui.jsx'
import Letters from './Letters.jsx'

// Abschlusskarte (Vorbild Rivos): Das Foto öffnet sich beim Scrollen von oben nach unten, Aussage links, ein Button rechts.
export default function CtaBand({ image = '/media/cta-abend-1.webp', title = 'Bereit für bessere Immobilienentscheidungen?', btn = 'Potenzial analysieren', to = '/kontakt' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--q', 1); el.style.setProperty('--s', .5); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect(), vh = window.innerHeight
      el.style.setProperty('--q', Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.4))).toFixed(3))
      el.style.setProperty('--s', Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="cta2-wrap">
      <section className="cta2" ref={ref} aria-label="Nächster Schritt">
        <div className="cta2-pic"><img className="cta2-bg" src={image} alt="" loading="lazy" decoding="async" /></div>
        <div className="cta2-in">
          <div className="cta2-l">
            <p className="cta2-lab">(Nächster Schritt)</p>
            <h2 className="cta2-h"><Letters text={title} per={22} max={1200} /></h2>
          </div>
          <Btn to={to} variant="gold">{btn}</Btn>
        </div>
      </section>
    </div>
  )
}
