import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Startseiten-Kopf als Scroll-Film: Die Kamera fährt durch die Glastür in die Lounge (aus dem Kundenfoto erzeugt).
// Der Fortschritt des Scrollens steuert die Videozeit. Text minimal: kurze fette Aussage unten links, Handlungskarte unten rechts.
export default function HomeFilm() {
  const wrap = useRef(null), vid = useRef(null)
  useEffect(() => {
    const w = wrap.current, v = vid.current
    if (!w || !v) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { w.style.setProperty('--p', 0); return }
    const mp4 = v.canPlayType('video/mp4; codecs="avc1.42E01E"')
    v.src = !mp4 ? '/media/haus-film.webm' : window.innerWidth < 860 ? '/media/haus-film-sm.mp4' : '/media/haus-film.mp4'
    let target = 0, cur = 0, raf = 0
    const calc = () => {
      const r = w.getBoundingClientRect(), span = Math.max(1, r.height - 2 * window.innerHeight) // letzte Bildschirmhöhe: nächster Abschnitt schiebt sich über den stehenden Film
      target = Math.min(1, Math.max(0, -r.top / span))
    }
    const tick = () => {
      raf = 0
      cur += (target - cur) * 0.18
      if (Math.abs(target - cur) < 0.0004) cur = target
      w.style.setProperty('--p', cur.toFixed(4))
      if (v.readyState >= 2 && v.duration) { const t = cur * (v.duration - 0.05); if (Math.abs(v.currentTime - t) > 0.012) v.currentTime = t }
      if (cur !== target) raf = requestAnimationFrame(tick)
    }
    const on = () => { calc(); if (!raf) raf = requestAnimationFrame(tick) }
    calc(); cur = target; tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    v.addEventListener('loadeddata', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); v.removeEventListener('loadeddata', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf" ref={wrap} aria-label="Einführung">
      <div className="hf-stick">
        <video ref={vid} className="hf-vid" poster="/media/haus-film-poster.webp" muted playsInline preload="auto" aria-hidden="true" />
        <div className="hf-shade" />
        <h1 className="hf-split" aria-label="Strategische Immobilienentwicklung mit System.">
          <span className="hf-part l"><Letters text="Strategische Immobilienentwicklung" per={38} max={1300} delay={200} /></span>
          <span className="hf-line" aria-hidden="true" />
          <span className="hf-part r"><Letters text="mit System." per={60} max={700} delay={1100} /></span>
        </h1>
        <div className="hh-card hf-card">
          <Link to="/kontakt" className="hh-a main"><span>Potenzial analysieren</span><i aria-hidden="true">→</i></Link>
          <Link to="/kontakt?art=Strategiegespräch" className="hh-a"><span>Strategiegespräch anfragen</span><i aria-hidden="true">→</i></Link>
        </div>
      </div>
    </section>
  )
}
