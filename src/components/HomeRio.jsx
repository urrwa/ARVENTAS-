import { useEffect, useRef } from 'react'

// Startseiten-Kopf: Die Kamera fährt durch die Glasfront eines Büros hinaus auf die Stadt.
// Zwei scharfe Fotos, vom Scrollen gesteuert (p: 0 bis 1): Das Innenbild wächst auf, die Rahmen ziehen zu den Seiten weg,
// darunter blendet das Außenbild ein und kommt zur Ruhe. Die beiden Zeilen ziehen nach links und rechts weg.
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (x) => x * x * (3 - 2 * x)
export default function HomeRio() {
  const box = useRef(null)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const inn = el.querySelector('.rh-in'), out = el.querySelector('.rh-out')
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    let target = 0, cur = 0, raf = 0
    const paint = (p) => {
      const a = ease(clamp(p / 0.62))
      inn.style.transform = `scale(${(1 + 1.7 * a).toFixed(3)})`
      inn.style.opacity = (1 - ease(clamp((p - 0.34) / 0.14))).toFixed(3)
      out.style.transform = `scale(${(2.0 - 1.0 * ease(clamp((p - 0.34) / 0.66))).toFixed(3)})`
      out.style.opacity = ease(clamp((p - 0.34) / 0.14)).toFixed(3)
      el.style.setProperty('--t', ease(clamp(p / 0.4)).toFixed(3))
    }
    if (calm) { paint(1); return }
    const read = () => { target = clamp(scrollY / Math.max(1, (el.offsetHeight - innerHeight) * 0.92)) }
    const draw = () => {
      raf = 0
      cur += (target - cur) * 0.14
      if (Math.abs(target - cur) < 0.0005) cur = target
      paint(cur)
      if (cur !== target) raf = requestAnimationFrame(draw)
    }
    const on = () => { read(); if (!raf) raf = requestAnimationFrame(draw) }
    read(); cur = target; paint(cur)
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf rh" ref={box} aria-label="Einführung">
      <div className="rh-stick">
        <img className="rh-img rh-out" src="/media/fahrt-aussen.webp" srcSet="/media/fahrt-aussen-sm.webp 1440w, /media/fahrt-aussen.webp 2880w" sizes="100vw" alt="Blick über Main und Skyline von Frankfurt in der Abenddämmerung (Illustrationsbild)" decoding="async" />
        <img className="rh-img rh-in" src="/media/fahrt-innen.webp" srcSet="/media/fahrt-innen-sm.webp 1440w, /media/fahrt-innen.webp 2880w" sizes="100vw" alt="" fetchpriority="high" decoding="async" />
        <div className="rh-shade" />
        <ul className="rh-kw" aria-label="Leistungen"><li>Eigentümer</li><li>Investoren</li><li>Objektreport</li></ul>
        <p className="rh-sub">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet, deutschlandweit.</p>
        <h1 className="rh-h" aria-label="ARVENTAS Immobilien. Kennen Deutschland.">
          <span className="rh-ln l" aria-hidden="true">ARVENTAS<br />IMMOBILIEN</span>
          <span className="rh-ln r" aria-hidden="true">KENNEN<br />DEUTSCHLAND</span>
        </h1>
      </div>
    </section>
  )
}
