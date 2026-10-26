import { Roll } from './ui.jsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'
import FilmModal from './FilmModal.jsx'
import { HOME } from '../content/images.js'

// Startseiten-Kopf (Vorbild Rivos): Der Film läuft von selbst in Dauerschleife, Aussage links, Zahlen unten links, Karte unten rechts.
export default function HomeFilm() {
  const wrap = useRef(null), vid = useRef(null)
  const [show, setShow] = useState(false)
  const close = useCallback(() => setShow(false), [])
  // Beim Laden füllt der Film den ganzen Bildschirm; beim Scrollen zieht er sich zum gerundeten Rahmen zusammen (--k: 0 bis 1).
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--k', 1); return }
    let raf = 0
    const run = () => { raf = 0; el.style.setProperty('--k', Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.45))).toFixed(3)) }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  useEffect(() => {
    const v = vid.current
    if (!v) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mp4 = v.canPlayType('video/mp4; codecs="avc1.42E01E"')
    const src = !mp4 ? '/media/haus-film-md.webm' : window.innerWidth < 860 ? '/media/haus-film-sm.mp4' : '/media/haus-film-md.mp4'
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
          <p className="hf-eb">Off-Market Immobilien · Deutschlandweit</p>
          <h1 className="hf-h" aria-label="Immobilien mit Potenzial. Zugang mit Vorsprung.">
            <span className="hf-ln"><Letters text="Immobilien mit Potenzial." per={34} max={1100} delay={200} /></span>
            <span className="hf-ln"><Letters text="Zugang mit Vorsprung." per={34} max={1000} delay={650} /></span>
          </h1>
          <p className="hf-sub">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet.</p>
          <div className="hf-cta">
            <Link to="/immobilie-verkaufen" className="btn btn-gold"><Roll>Immobilie verkaufen</Roll> <span className="arr" aria-hidden="true">→</span></Link>
            <Link to="/kapitalanlage-immobilien" className="btn btn-line">Immobilien entdecken <span className="arr" aria-hidden="true">→</span></Link>
          </div>
          <button type="button" className="hf-see" onClick={() => setShow(true)} aria-haspopup="dialog"><i aria-hidden="true">▶</i><span>So entsteht Klarheit</span></button>
          <Link to="/objektreport" className="hf-mini">
            <img src={HOME.miniCard} alt="" width="120" height="120" loading="lazy" decoding="async" />
            <span>Objektreport: datenbasiert analysiert, persönlich geprüft.</span>
            <em>Objektreport ansehen <i aria-hidden="true">→</i></em>
          </Link>
        </div>
      </div>
      {show && <FilmModal onClose={close} />}
    </section>
  )
}
