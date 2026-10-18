import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Einstieg: Foto mit Text. Beim Scrollen blendet der Text aus, das Haus fährt heran, dann erscheint die Wortmarke mit dem Foto in den Buchstaben.
export default function Hero() {
  const wrap = useRef(null)
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('flat'); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hz" id="film" ref={wrap} aria-label="Einführung">
      <div className="hz-stick">
        <picture>
          <source media="(max-width: 859px)" srcSet="/media/hero-haus-sm.webp" />
          <img className="hz-img" src="/media/hero-haus.webp" alt="Moderne Villa im Abendlicht (KI-generiertes Beispielbild)" fetchpriority="high" />
        </picture>
        <div className="hz-shade" />
        <div className="hz-copy wrap">
          <p className="eyebrow">Off-Market Immobilien · Deutschlandweit</p>
          <h1 className="h1 hs-h1"><Letters text="Immobilien mit Potenzial. Zugang mit Vorsprung." per={34} /></h1>
          <p className="lead">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet.</p>
          <div className="btn-row">
            <Link to="/immobilie-verkaufen" className="btn btn-gold">Immobilie verkaufen <span className="arr" aria-hidden="true">→</span></Link>
            <Link to="/kapitalanlage-immobilien" className="btn btn-line">Immobilien entdecken <span className="arr" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hz-cover" aria-hidden="true" />
        <div className="hz-mark" aria-hidden="true">
          <span className="hz-word">ΛRVENTΛS</span>
          <span className="hz-sub">Werte schaffen. Zukunft bauen.</span>
        </div>
      </div>
    </section>
  )
}
