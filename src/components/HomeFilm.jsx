import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Startseiten-Kopf als Scroll-Film: Die Kamera fährt durch die Glastür in die Lounge (aus dem Kundenfoto erzeugt).
// Der Fortschritt des Scrollens steuert die Videozeit. Text minimal: kurze fette Aussage unten links, Handlungskarte unten rechts.
function CountUp({ to }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return }
    let raf = 0, t0 = 0
    const tick = (t) => { if (!t0) t0 = t; const k = Math.min(1, (t - t0) / 1600); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick) }
    const id = setTimeout(() => { raf = requestAnimationFrame(tick) }, 900)
    return () => { clearTimeout(id); cancelAnimationFrame(raf) }
  }, [to])
  return n
}

export default function HomeFilm() {
  const wrap = useRef(null), vid = useRef(null)
  useEffect(() => {
    const w = wrap.current, v = vid.current
    if (!w || !v) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { w.style.setProperty('--p', 0); return }
    const mp4 = v.canPlayType('video/mp4; codecs="avc1.42E01E"')
    const src = !mp4 ? '/media/haus-film.webm' : window.innerWidth < 860 ? '/media/haus-film-sm.mp4' : '/media/haus-film.mp4'
    // Die große Videodatei erst nach dem Laden der Seite holen, damit Text, Poster und Bilder zuerst da sind.
    const start = () => { v.preload = 'auto'; v.src = src; v.load() }
    let idle = 0, tm = 0
    const go = () => { if ('requestIdleCallback' in window) idle = requestIdleCallback(start, { timeout: 1500 }); else tm = setTimeout(start, 600) }
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true })
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
    return () => { window.removeEventListener('load', go); idle && cancelIdleCallback(idle); clearTimeout(tm); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); v.removeEventListener('loadeddata', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf" ref={wrap} aria-label="Einführung">
      <div className="hf-stick">
        <video ref={vid} className="hf-vid" poster="/media/haus-film-poster.webp" muted playsInline preload="none" aria-hidden="true" />
        <div className="hf-shade" />
        <div className="hf-rv">
          <h1 className="hf-h" aria-label="Strategische Immobilienentwicklung mit System.">
            <span className="hf-ln"><Letters text="Strategische" per={38} max={900} delay={200} /></span>
            <span className="hf-ln"><Letters text="Immobilienentwicklung" per={38} max={1000} delay={450} /></span>
            <span className="hf-ln"><Letters text="mit System." per={50} max={700} delay={900} /></span>
          </h1>
          <p className="hf-sub">Markt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsweg verbunden.</p>
          <a href="#entwurf" className="hf-see"><i aria-hidden="true">▶</i><span>So entsteht Klarheit</span></a>
          <ul className="hf-stats">
            <li><b><CountUp to={5} /></b><span>Leistungen</span></li>
            <li><b><CountUp to={5} /></b><span>Schritte</span></li>
          </ul>
          <Link to="/leistungen" className="hf-mini">
            <img src="/media/gal-4.webp" alt="" width="120" height="120" loading="lazy" decoding="async" />
            <span>Ein System für bessere Immobilienentscheidungen.</span>
            <em>Leistungen ansehen <i aria-hidden="true">→</i></em>
          </Link>
        </div>
      </div>
    </section>
  )
}
