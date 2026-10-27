import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

// Startseiten-Kopf: stiller Schwarzweiß-Film (Hände auf Plänen, Frankfurt, Luftbild) als Hintergrund, Überschrift links unten, kleine Karte rechts unten.
export default function HomeVideo() {
  const vid = useRef(null)
  useEffect(() => {
    const v = vid.current
    if (!v) return
    const save = navigator.connection && navigator.connection.saveData
    if (save || matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); v.removeAttribute('autoplay'); v.querySelectorAll('source').forEach((x) => x.remove()); v.load(); return }
    if (innerWidth <= 900) {
      // Mobil: Video erst nach dem Laden der Seite holen, damit Bild und Text zuerst erscheinen
      const srcs = [...v.querySelectorAll('source')].map((x) => [x.src, x.type])
      v.querySelectorAll('source').forEach((x) => x.remove())
      const go = () => setTimeout(() => { srcs.forEach(([src, type]) => { const el = document.createElement('source'); el.src = src; el.type = type; v.appendChild(el) }); v.load(); const q = v.play(); if (q && q.catch) q.catch(() => {}) }, 1500)
      if (document.readyState === 'complete') go(); else addEventListener('load', go, { once: true })
      return
    }
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }, [])
  return (
    <section className="hv" aria-label="Einführung">
      <video ref={vid} className="hv-vid" autoPlay muted loop playsInline preload="metadata" poster={typeof window !== 'undefined' && window.innerWidth <= 900 ? '/media/hero/poster-sm.webp' : '/media/hero/poster.webp'} aria-hidden="true">
        <source src="/media/hero/montage.webm" type="video/webm" />
        <source src="/media/hero/montage.mp4" type="video/mp4" />
      </video>
      <div className="hv-shade" />
      <div className="hv-copy">
        <h1 className="hv-h"><span>Arventas Immobilien</span><span>Kennen Deutschland.</span></h1>
        <p className="hv-sub">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet, deutschlandweit.</p>
        <Link to="/immobilie-verkaufen#anfrage" className="hv-go"><span aria-hidden="true">↗</span> Objektreport anfragen</Link>
      </div>
      <aside className="hv-card">
        <img src="/media/p/ablauf-modell.webp" alt="" loading="lazy" />
        <p>Datenbasiert analysiert. Persönlich geprüft.</p>
        <Link to="/objektreport#muster" className="hv-go"><span aria-hidden="true">↗</span> Muster ansehen</Link>
      </aside>
      <span className="hv-mouse" aria-hidden="true"><i /></span>
    </section>
  )
}
