import { useEffect, useRef } from 'react'
import Letters from './Letters.jsx'

// Gepinnte Fläche (Vorbild Rivos): Das Gebäude entsteht beim Scrollen aus Hilfslinien, wird zur Skizze, dann zum Render.
// Bilder sind mit Higgsfield aus demselben Gebäude erzeugt (Skizze, Zwischenstand, Render).
export default function SketchMorph() {
  const ref = useRef(null)
  useEffect(() => {
    const s = ref.current
    if (!s) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { s.style.setProperty('--p', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = s.getBoundingClientRect(), span = Math.max(1, r.height - window.innerHeight)
      s.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / span)).toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="sm" id="entwurf" ref={ref} aria-label="Vom Entwurf zum Ergebnis">
      <div className="sm-stick">
        <div className="sm-panel">
          <svg className="sm-guides" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
            <g fill="none" stroke="#0E0E0E" strokeWidth="1" vectorEffect="non-scaling-stroke">
              <path d="M0 0 L1000 560 M1000 0 L0 560 M0 280 L1000 280 M500 0 L500 560 M120 560 L420 300 L880 560 M300 90 L520 190 L760 60" />
            </g>
          </svg>
          <img className="sm-i s1" src="/media/haus-skizze.webp" alt="" width="1024" height="688" loading="lazy" decoding="async" />
          <img className="sm-i s2" src="/media/haus-halb.webp" alt="" width="1024" height="688" loading="lazy" decoding="async" />
          <img className="sm-i s3" src="/media/haus-render.webp" alt="Gebäude als Render" width="1024" height="688" loading="lazy" decoding="async" />
          <p className="sm-cap"><small>(Unser System)</small><span><Letters text="Wir bauen Potenziale für morgen." per={24} max={900} /></span></p>
        </div>
      </div>
    </section>
  )
}
