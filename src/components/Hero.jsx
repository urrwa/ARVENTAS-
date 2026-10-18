import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Einstieg: Das Haus steht im Himmel vor der Überschrift. Beim Scrollen steigt es auf, die Überschrift sinkt weg,
// die Wortmarke zeichnet sich als Linie, füllt sich mit dem Foto, steigt ebenfalls auf, dann kommen die Wolken.
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
        <img className="hz-sky" src="/media/himmel2.webp" alt="" fetchpriority="high" />
        <div className="hz-behind">
          <h1 className="hz-h1"><Letters text="Immobilien mit Potenzial. Zugang mit Vorsprung." per={30} /></h1>
        </div>
        <div className="hz-mark" aria-hidden="true">
          <svg viewBox="0 0 1000 220" focusable="false">
            <defs>
              <pattern id="hz-pat" patternUnits="userSpaceOnUse" width="1000" height="220">
                <image href="/media/haus-fuellung.webp" width="1000" height="560" x="0" y="-250" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <text className="hz-fill" x="500" y="170" textAnchor="middle" textLength="940" lengthAdjust="spacing" fill="url(#hz-pat)">ΛRVENTΛS</text>
            <text className="hz-line" x="500" y="170" textAnchor="middle" textLength="940" lengthAdjust="spacing">ΛRVENTΛS</text>
          </svg>
          <span className="hz-sub">Werte schaffen. Zukunft bauen.</span>
        </div>
        <img className="hz-house" src="/media/haus2.webp" alt="Moderne Villa im Abendlicht (KI-generiertes Beispielbild)" fetchpriority="high" />
        <img className="hz-cloud-front" src="/media/wolken-bank.webp" alt="" />
        <div className="hz-copy">
          <p className="lead">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet.</p>
          <div className="btn-row">
            <Link to="/immobilie-verkaufen" className="btn btn-marine">Immobilie verkaufen <span className="arr" aria-hidden="true">→</span></Link>
            <Link to="/kapitalanlage-immobilien" className="btn btn-line">Immobilien entdecken <span className="arr" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hz-haze" aria-hidden="true" />
        <div className="hz-mist m1" aria-hidden="true"><img src="/media/wolken-schleier.webp" alt="" /></div>
        <div className="hz-mist m2" aria-hidden="true"><img src="/media/wolken-schleier.webp" alt="" /></div>
        <div className="hz-mist m3" aria-hidden="true"><img src="/media/wolken-schleier.webp" alt="" /></div>
        <div className="hz-navy" aria-hidden="true" />
      </div>
    </section>
  )
}
