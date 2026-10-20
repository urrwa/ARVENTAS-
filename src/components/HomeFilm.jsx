import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'
import FilmModal from './FilmModal.jsx'
import { HOME } from '../content/images.js'

// Startseiten-Kopf (Vorbild Rivos): Der Film läuft von selbst in Dauerschleife, Aussage links, Zahlen unten links, Karte unten rechts.
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
  const [show, setShow] = useState(false)
  const close = useCallback(() => setShow(false), [])
  useEffect(() => {
    const v = vid.current
    if (!v) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mp4 = v.canPlayType('video/mp4; codecs="avc1.42E01E"')
    const src = !mp4 ? '/media/haus-film.webm' : window.innerWidth < 860 ? '/media/haus-film-sm.mp4' : '/media/haus-film.mp4'
    // Die große Videodatei erst nach dem Laden der Seite holen, damit Text, Poster und Bilder zuerst da sind.
    const start = () => { v.preload = 'auto'; v.src = src; v.load(); const p = v.play(); p && p.catch(() => {}) }
    let idle = 0, tm = 0
    const go = () => { if ('requestIdleCallback' in window) idle = requestIdleCallback(start, { timeout: 1500 }); else tm = setTimeout(start, 600) }
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true })
    // Der Film läuft vor und zurück (Hin-und-Her-Schleife), daher braucht der Schleifenpunkt keine Überblendung.
    const vis = () => { if (document.hidden) v.pause(); else { const p = v.play(); p && p.catch(() => {}) } }
    document.addEventListener('visibilitychange', vis)
    return () => { window.removeEventListener('load', go); idle && cancelIdleCallback(idle); clearTimeout(tm); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return (
    <section className="hf" ref={wrap} aria-label="Einführung">
      <div className="hf-stick">
        <video ref={vid} className="hf-vid" poster="/media/haus-film-poster.webp" muted loop playsInline autoPlay preload="none" aria-hidden="true" />
        <div className="hf-shade" />
        <div className="hf-rv">
          <h1 className="hf-h" aria-label="Strategische Immobilienentwicklung mit System.">
            <span className="hf-ln"><Letters text="Strategische" per={38} max={900} delay={200} /></span>
            <span className="hf-ln"><Letters text="Immobilienentwicklung" per={38} max={1000} delay={450} /></span>
            <span className="hf-ln"><Letters text="mit System." per={50} max={700} delay={900} /></span>
          </h1>
          <p className="hf-sub">Markt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsweg verbunden.</p>
          <button type="button" className="hf-see" onClick={() => setShow(true)} aria-haspopup="dialog"><i aria-hidden="true">▶</i><span>So entsteht Klarheit</span></button>
          <ul className="hf-stats">
            <li><b><CountUp to={200} />+</b><span>Abgeschlossene Projekte</span></li>
            <li><b><CountUp to={70} />+</b><span>Zufriedene Kunden</span></li>
            <li><b>$<CountUp to={10} />M</b><span>Projektvolumen</span></li>
          </ul>
          <Link to="/leistungen" className="hf-mini">
            <img src={HOME.miniCard} alt="" width="120" height="120" loading="lazy" decoding="async" />
            <span>Ein System für bessere Immobilienentscheidungen.</span>
            <em>Leistungen ansehen <i aria-hidden="true">→</i></em>
          </Link>
        </div>
      </div>
      {show && <FilmModal onClose={close} />}
    </section>
  )
}
