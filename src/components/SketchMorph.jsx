import { useEffect, useRef } from 'react'
import Letters from './Letters.jsx'

// Rahmen mit Film (Vorbild Rivos): Das Gebäude entsteht von selbst aus der Skizze zum Render, sobald der Abschnitt im Bild ist.
// Film und Standbilder sind mit Higgsfield aus demselben Gebäude erzeugt.
export default function SketchMorph() {
  const root = useRef(null), vid = useRef(null)
  useEffect(() => {
    const v = vid.current, el = root.current
    if (!v || !el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    let loaded = false
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!loaded) { loaded = true; v.src = v.canPlayType('video/mp4; codecs="avc1.42E01E"') ? '/media/haus-entsteht.mp4' : '/media/haus-entsteht.webm'; v.load() }
        const p = v.play(); p && p.catch(() => {})
        el.classList.add('in')
      } else v.pause()
    }, { threshold: 0.35, rootMargin: '200px 0px' })
    io.observe(el)
    // Am Schleifenpunkt weich ins Weiß ausblenden
    const fade = () => { const d = v.duration; if (d) v.style.opacity = String(Math.max(0, Math.min(1, v.currentTime / 0.5, (d - v.currentTime) / 0.9))) }
    v.addEventListener('timeupdate', fade)
    return () => { io.disconnect(); v.removeEventListener('timeupdate', fade) }
  }, [])
  return (
    <section className="sm2" id="entwurf" ref={root} aria-label="Vom Entwurf zum Ergebnis">
      <div className="sm2-panel">
        <img className="sm2-poster" src="/media/haus-skizze.webp" alt="" width="1024" height="688" loading="lazy" decoding="async" />
        <video ref={vid} className="sm2-vid" poster="/media/haus-skizze.webp" muted loop playsInline preload="none" aria-label="Das Gebäude entsteht aus der Skizze" />
        <p className="sm2-cap"><small>(Unser System)</small><span><Letters text="Wir bauen Potenziale für morgen." per={24} max={900} /></span></p>
      </div>
    </section>
  )
}
