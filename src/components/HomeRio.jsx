import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Startseiten-Kopf: Ein ruhiges Foto hinter einem Fensterrahmen. Beim Scrollen gleitet der Rahmen auseinander,
// das Foto öffnet sich zur ganzen Stadt und die beiden Zeilen ziehen nach links und rechts weg (--t: 0 bis 1).
export default function HomeRio() {
  const el = useRef(null)
  useEffect(() => {
    const box = el.current
    if (!box) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { box.style.setProperty('--t', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const span = Math.max(1, box.offsetHeight - innerHeight)
      box.style.setProperty('--t', Math.min(1, Math.max(0, scrollY / (span * 0.7))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf rh" ref={el} aria-label="Einführung">
      <div className="rh-stick">
        <img className="rh-photo" src="/media/rio-stadt.webp" srcSet="/media/rio-stadt-sm.webp 1200w, /media/rio-stadt.webp 2400w" sizes="100vw" alt="Blick über eine deutsche Stadt in der Abenddämmerung (Illustrationsbild)" fetchpriority="high" decoding="async" />
        <div className="rh-shade" />
        <div className="rh-frame" aria-hidden="true"><i className="rh-pane l" /><i className="rh-pane r" /></div>
        <p className="rh-eb">Off-Market Immobilien · Deutschlandweit</p>
        <p className="rh-sub">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet.</p>
        <h1 className="rh-h" aria-label="Immobilien mit Potenzial. Zugang mit Vorsprung.">
          <span className="rh-ln l"><Letters text="Immobilien mit Potenzial." per={30} max={1000} delay={200} /></span>
          <span className="rh-ln r"><Letters text="Zugang mit Vorsprung." per={30} max={900} delay={600} /></span>
        </h1>
        <div className="rh-cta">
          <Link to="/immobilie-verkaufen" className="btn btn-gold">Immobilie verkaufen <span className="arr" aria-hidden="true">→</span></Link>
          <Link to="/kapitalanlage-immobilien" className="btn btn-line">Immobilien entdecken <span className="arr" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}
