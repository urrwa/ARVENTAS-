import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Startseiten-Kopf: Die Kamera fährt durch die Glasfront eines Büros hinaus auf die Stadt.
// Der Film wird vom Scrollen gesteuert (--p: 0 bis 1); die beiden Zeilen ziehen dabei nach links und rechts weg (--t).
export default function HomeRio() {
  const box = useRef(null), vid = useRef(null)
  useEffect(() => {
    const el = box.current, v = vid.current
    if (!el || !v) return
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = innerWidth < 860
    v.src = small ? '/media/rio-scrub-sm.mp4' : '/media/rio-scrub.mp4'
    let target = 0, cur = 0, raf = 0, last = -1
    const ease = (x) => x * x * (3 - 2 * x)
    const read = () => {
      const span = Math.max(1, el.offsetHeight - innerHeight)
      target = Math.min(1, Math.max(0, scrollY / (span * 0.92)))
    }
    const draw = () => {
      raf = 0
      cur += (target - cur) * 0.14
      if (Math.abs(target - cur) < 0.0005) cur = target
      const t = ease(Math.min(1, cur / 0.45))
      el.style.setProperty('--t', t.toFixed(3))
      if (v.duration && Math.abs(cur - last) > 0.0005) {
        last = cur
        const tm = cur * v.duration
        if (v.fastSeek) v.fastSeek(tm); else v.currentTime = tm
      }
      if (cur !== target) raf = requestAnimationFrame(draw)
    }
    const on = () => { read(); if (!raf) raf = requestAnimationFrame(draw) }
    const meta = () => { if (calm) { v.currentTime = v.duration; el.style.setProperty('--t', 1) } else on() }
    v.addEventListener('loadedmetadata', meta)
    read(); if (!calm) { cur = target; el.style.setProperty('--t', 0) }
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { v.removeEventListener('loadedmetadata', meta); removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf rh" ref={box} aria-label="Einführung">
      <div className="rh-stick">
        <video ref={vid} className="rh-photo" poster="/media/rio-poster.webp" muted playsInline preload="auto" aria-hidden="true" />
        <div className="rh-shade" />
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
