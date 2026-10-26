import { useEffect, useRef } from 'react'

// Startseiten-Kopf: Die Kamera fährt durch die Glasfront eines Büros hinaus auf die Stadt.
// Die Fahrt liegt als Bildfolge vor und wird auf eine Zeichenfläche gelegt, vom Scrollen gesteuert (vor und zurück, in jedem Browser gleich).
// Die beiden Zeilen ziehen dabei nach links und rechts weg (--t).
const N = 145
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (x) => x * x * (3 - 2 * x)
const src = (dir, i) => `/media/fahrt/${dir}2/f${String(i + 1).padStart(3, '0')}.webp`
export default function HomeRio() {
  const box = useRef(null), cv = useRef(null)
  useEffect(() => {
    const el = box.current, c = cv.current
    if (!el || !c) return
    const ctx = c.getContext('2d')
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dir = innerWidth < 860 ? 'm' : 'd'
    const imgs = new Array(N).fill(null)
    const ready = (i) => imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0
    let target = 0, cur = 0, raf = 0, shown = -1
    const fit = () => {
      const dpr = Math.min(2, devicePixelRatio || 1)
      c.width = Math.round(c.clientWidth * dpr); c.height = Math.round(c.clientHeight * dpr); shown = -1
    }
    const draw = (i) => {
      // Nächstes bereits geladenes Bild nehmen, falls das gewünschte noch fehlt.
      let k = -1
      for (let d = 0; d < N; d++) {
        if (i - d >= 0 && ready(i - d)) { k = i - d; break }
        if (i + d < N && ready(i + d)) { k = i + d; break }
      }
      if (k < 0 || k === shown) return
      shown = k
      const im = imgs[k]
      const s = Math.max(c.width / im.naturalWidth, c.height / im.naturalHeight)
      const w = im.naturalWidth * s, h = im.naturalHeight * s
      ctx.drawImage(im, (c.width - w) / 2, (c.height - h) / 2, w, h)
    }
    const read = () => { target = clamp(scrollY / Math.max(1, (el.offsetHeight - innerHeight) * 0.92)) }
    const step = () => {
      raf = 0
      cur += (target - cur) * 0.16
      if (Math.abs(target - cur) < 0.0004) cur = target
      el.style.setProperty('--t', ease(clamp(cur / 0.4)).toFixed(3))
      draw(Math.round(cur * (N - 1)))
      if (cur !== target) raf = requestAnimationFrame(step)
    }
    const on = () => { read(); if (!raf) raf = requestAnimationFrame(step) }
    const load = (i) => {
      if (imgs[i]) return
      const im = new Image(); im.decoding = 'async'; im.src = src(dir, i)
      im.onload = () => { shown = -1; on() }
      imgs[i] = im
    }
    // Zuerst jedes achte Bild (grobe Fahrt sofort sichtbar), dann alle übrigen.
    const order = []
    for (let i = 0; i < N; i += 8) order.push(i)
    order.push(N - 1)
    for (let i = 0; i < N; i++) if (!order.includes(i)) order.push(i)
    let q = 0, tm = 0
    const pump = () => { for (let n = 0; n < 6 && q < order.length; n++) load(order[q++]); if (q < order.length) tm = setTimeout(pump, 60) }
    fit(); read()
    if (calm) { target = 1; cur = 1; load(N - 1) } else cur = target
    el.style.setProperty('--t', calm ? 1 : ease(clamp(cur / 0.4)).toFixed(3))
    pump(); step()
    const rs = () => { fit(); on() }
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', rs)
    return () => { clearTimeout(tm); removeEventListener('scroll', on); removeEventListener('resize', rs); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="hf rh" ref={box} aria-label="Einführung">
      <div className="rh-stick">
        <canvas ref={cv} className="rh-img rh-cv" aria-hidden="true" />
        <div className="rh-shade" />
        <ul className="rh-kw" aria-label="Leistungen"><li>Eigentümer</li><li>Investoren</li><li>Objektreport</li></ul>
        <p className="rh-sub">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet, deutschlandweit.</p>
        <h1 className="rh-h" aria-label="ARVENTAS Immobilien. Kennen Deutschland.">
          <span className="rh-ln l" aria-hidden="true">Arventas<br />Immobilien</span>
          <span className="rh-ln r" aria-hidden="true">Kennen<br />Deutschland.</span>
        </h1>
      </div>
    </section>
  )
}
