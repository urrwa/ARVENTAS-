import { useEffect, useRef } from 'react'

// Startseiten-Kopf: Die Kamera fährt durch die Glasfront eines Büros hinaus auf die Stadt.
// Der Film wird vom Scrollen gesteuert (vor und zurück); die beiden Zeilen ziehen dabei nach links und rechts weg (--t).
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (x) => x * x * (3 - 2 * x)
export default function HomeRio() {
  const box = useRef(null), vid = useRef(null)
  useEffect(() => {
    const el = box.current, v = vid.current
    if (!el || !v) return
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    v.src = innerWidth < 860 ? '/media/fahrt-sm.mp4' : '/media/fahrt.mp4'
    let target = 0, cur = 0, raf = 0, last = -1
    const read = () => { target = clamp(scrollY / Math.max(1, (el.offsetHeight - innerHeight) * 0.92)) }
    const draw = () => {
      raf = 0
      cur += (target - cur) * 0.14
      if (Math.abs(target - cur) < 0.0005) cur = target
      el.style.setProperty('--t', ease(clamp(cur / 0.4)).toFixed(3))
      if (v.duration && Math.abs(cur - last) > 0.0004) {
        last = cur
        const tm = cur * v.duration
        if (v.fastSeek) v.fastSeek(tm); else v.currentTime = tm
      }
      if (cur !== target) raf = requestAnimationFrame(draw)
    }
    const on = () => { read(); if (!raf) raf = requestAnimationFrame(draw) }
    const meta = () => { if (calm) { v.currentTime = v.duration; el.style.setProperty('--t', 1) } else { last = -1; on() } }
    v.addEventListener('loadedmetadata', meta)
    read(); cur = target; el.style.setProperty('--t', calm ? 1 : 0)
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { v.removeEventListener('loadedmetadata', meta); removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf rh" ref={box} aria-label="Einführung">
      <div className="rh-stick">
        <video ref={vid} className="rh-img" poster="/media/fahrt-innen.webp" muted playsInline preload="auto" aria-hidden="true" />
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
