import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { reducedMotion } from './useMotion.js'

/* Scroll-scrubbed film: a frame sequence (public/frames, built by scripts/build_frames.py
   from source/hero.mp4) drawn to a canvas, driven by scroll progress through a sticky stage.
   - Frames are fetched as blobs (nearest-to-playhead first) and only a small window around the
     playhead is decoded to bitmaps, so memory stays bounded.
   - The playhead eases toward the scroll target, so scrubbing stays smooth in both directions.
   - Normal page scroll is never hijacked. */

const BEHIND = 8
const AHEAD = 20
const CONCURRENCY = 6

// Captions: German brand copy from the ARVENTAS strategy document (section 5 "Positionierungsaussage",
// the three pillars, and the cover descriptor). Timing is expressed in SOURCE-VIDEO seconds
// (`at: [in, out]`) and mapped to scroll progress through the frame times in manifest.json, so the
// captions stay on the right shot however the frames are sampled.
const CAPTIONS = [
  { id: 'open', kind: 'open', at: [0, 5] },
  { id: 'zugang', tag: '01 — Zugang', text: 'Wir finden Objekte, die nicht am Markt sind,', at: [6.5, 20] },
  { id: 'analyse', tag: '02 — Analyse', text: 'bewerten sie in Tagen statt Wochen,', at: [25.5, 37], right: true },
  { id: 'abwicklung', tag: '03 — Abwicklung', text: 'und bringen sie zum passenden Eigentümer oder Investor.', at: [43.5, 70] },
  { id: 'region', tag: 'Off-Market Immobilien-Intelligenz', text: 'Bayern & Baden-Württemberg', at: [74, 103] },
  { id: 'close', kind: 'close', at: [107, 200] },
]
// source seconds -> progress (0..1) using the manifest's frame times
const toProgress = (t, times) => {
  let lo = 0, hi = times.length - 1
  while (lo < hi) { const m = (lo + hi) >> 1; if (times[m] < t) lo = m + 1; else hi = m }
  return lo / Math.max(1, times.length - 1)
}
const windowFor = (c, times) => {
  const a = toProgress(c.at[0], times), b = c.at[1] >= times[times.length - 1] ? 3 : toProgress(c.at[1], times)
  const e = 0.012
  if (c.kind === 'open') return [-1, -0.5, b - e, b]
  if (c.kind === 'close') return [a, a + e * 2, 2, 3]
  return [a, a + e, b - e, b]
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const vis = (p, [a, b, c, d]) => (p < b ? clamp((p - a) / (b - a)) : p > c ? clamp(1 - (p - c) / (d - c)) : 1)

export default function ScrollFilm() {
  const root = useRef(null)
  const canvas = useRef(null)
  const caps = useRef({})
  const [ready, setReady] = useState(false)
  const [still, setStill] = useState(false)
  const [set, setSet] = useState(null)

  useEffect(() => {
    setStill(reducedMotion())
    setSet(window.matchMedia('(max-width: 860px)').matches ? 'sm' : 'lg')
  }, [])

  useEffect(() => {
    if (!set || still) return
    let alive = true
    const cvs = canvas.current
    const ctx = cvs.getContext('2d', { alpha: false })
    let count = 0
    let wins = {}
    const blobs = new Map()
    const bitmaps = new Map()
    const pending = new Set()
    let target = 0
    let current = 0
    let raf = 0
    let lastDrawn = -1
    const url = (i) => `/frames/${set}/f${String(i + 1).padStart(4, '0')}.webp`

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.min(Math.round(cvs.clientWidth * dpr), 1920)
      const h = Math.round(cvs.clientHeight * (w / cvs.clientWidth))
      if (cvs.width !== w || cvs.height !== h) { cvs.width = w; cvs.height = h; lastDrawn = -1 }
    }

    const draw = (bmp) => {
      const cw = cvs.width, ch = cvs.height
      const s = Math.max(cw / bmp.width, ch / bmp.height) // cover
      const w = bmp.width * s, h = bmp.height * s
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(bmp, (cw - w) / 2, (ch - h) / 2, w, h)
    }

    const decode = async (i) => {
      if (bitmaps.has(i) || !blobs.has(i) || pending.has(i)) return
      pending.add(i)
      try {
        const bmp = await createImageBitmap(blobs.get(i))
        if (!alive) return bmp.close()
        bitmaps.set(i, bmp)
      } finally { pending.delete(i) }
    }

    const pump = () => {
      const c = Math.round(current)
      for (let i = c - BEHIND; i <= c + AHEAD; i++) if (i >= 0 && i < count) decode(i)
      for (const [i, b] of bitmaps) if (i < c - BEHIND - 6 || i > c + AHEAD + 10) { b.close(); bitmaps.delete(i) }
    }

    const render = () => {
      const c = clamp(Math.round(current), 0, count - 1)
      let i = c
      if (!bitmaps.has(i)) {
        for (let d = 1; d <= 12; d++) {
          if (bitmaps.has(c - d)) { i = c - d; break }
          if (bitmaps.has(c + d)) { i = c + d; break }
        }
      }
      if (bitmaps.has(i) && i !== lastDrawn) { draw(bitmaps.get(i)); lastDrawn = i }
    }

    const progress = () => {
      const r = root.current.getBoundingClientRect()
      return clamp(-r.top / Math.max(1, r.height - window.innerHeight))
    }

    const captions = (p) => {
      CAPTIONS.forEach((c) => {
        const el = caps.current[c.id]
        if (!el || !wins[c.id]) return
        const v = vis(p, wins[c.id])
        el.style.opacity = v
        el.style.transform = `translate3d(0, ${(1 - v) * 24}px, 0)`
        el.style.visibility = v < 0.01 ? 'hidden' : 'visible'
        el.style.pointerEvents = v > 0.5 ? 'auto' : 'none'
      })
    }

    const tick = () => {
      raf = 0
      const diff = target - current
      current = Math.abs(diff) < 0.02 ? target : current + diff * 0.14
      pump(); render()
      captions(clamp(current / Math.max(1, count - 1)))
      if (current !== target) raf = requestAnimationFrame(tick)
    }
    const kick = () => { target = progress() * (count - 1); if (!raf) raf = requestAnimationFrame(tick) }

    // fetch queue: nearest-to-playhead first
    let active = 0
    const next = () => {
      if (!alive) return
      while (active < CONCURRENCY) {
        let best = -1, bd = 1e9
        const c = Math.round(current)
        for (let i = 0; i < count; i++) if (!blobs.has(i) && !inflight.has(i)) { const d = i >= c ? i - c : (c - i) * 3; if (d < bd) { bd = d; best = i } }
        if (best < 0) return
        inflight.add(best); active++
        fetch(url(best)).then((r) => r.blob()).then((b) => { blobs.set(best, b) }).catch(() => {})
          .finally(() => { inflight.delete(best); active--; if (alive) { if (!ready0 && blobs.size >= 24) { ready0 = true; start() } next() } })
      }
    }
    const inflight = new Set()
    let ready0 = false
    const start = async () => {
      current = target = progress() * (count - 1)
      await Promise.all(Array.from({ length: AHEAD }, (_, k) => decode(clamp(Math.round(current) + k, 0, count - 1))))
      if (!alive) return
      resize(); render(); captions(progress()); setReady(true)
    }

    fetch('/frames/manifest.json').then((r) => r.json()).then((m) => {
      count = m.count
      CAPTIONS.forEach((c) => { wins[c.id] = windowFor(c, m.t) })
      next()
    })

    const onResize = () => { resize(); lastDrawn = -1; kick() }
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', onResize)
      bitmaps.forEach((b) => b.close())
    }
  }, [set, still]) // eslint-disable-line react-hooks/exhaustive-deps

  const setCap = (id) => (el) => { if (el) caps.current[id] = el }
  const poster = set ? `/frames/${set}/f0001.webp` : undefined

  return (
    <section ref={root} className={`film ${still ? 'film--still' : ''} ${ready ? 'is-ready' : ''}`} aria-label="ARVENTAS — Film">
      <div className="film__stage">
        {still ? (
          <img className="film__canvas" src={poster} alt="Architekturaufnahme eines Mehrfamilienhauses" />
        ) : (
          <canvas ref={canvas} className="film__canvas" role="img" aria-label="Architekturfilm: Fassade, Wohnraum, Schlafzimmer, Luftbild, Dachterrasse" />
        )}
        <div className="film__shade" aria-hidden="true" />

        <div className="cap cap--open" ref={setCap('open')}>
          <p className="cap__brand">ARVENTAS</p>
          <h1 className="cap__descriptor">OFF-MARKET IMMOBILIEN-INTELLIGENZ · BAYERN &amp; BADEN-WÜRTTEMBERG</h1>
        </div>
        {CAPTIONS.filter((c) => c.text).map((c) => (
          <div className={`cap cap--line ${c.right ? 'cap--right' : ''}`} key={c.id} ref={setCap(c.id)}>
            <p className="eyebrow">{c.tag}</p>
            <p className="cap__line">{c.text}</p>
          </div>
        ))}
        <div className="cap cap--close" ref={setCap('close')}>
          <p className="cap__brand">ARVENTAS</p>
          <Link className="link-arrow" to="/strategie">Zur Strategie →</Link>
        </div>

        <div className="film__hint" aria-hidden="true"><span>Scrollen</span><i /></div>
      </div>
    </section>
  )
}
