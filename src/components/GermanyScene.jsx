import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Isometrischer Stadtplan als Vollbildszene (Blöcke und Straßen werden aus einem festen Zufallsmuster gebaut, keine echten Orte).
// Namensschilder zeigen die Themen der Lage-Betrachtung; das aktive wechselt von selbst und per Klick. Keine Zahlen, keine Standortangabe.
const N = 9, M = 7, CELL = 74, ROAD = 28, K = 0.866
const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
const P = (x, y, z = 0) => [(x - y) * K, (x + y) * 0.5 - z]
const PARKS = new Set(['3,2', '5,4'])
const LABELS = [
  { t: 'Standort', c: 1, r: 1 }, { t: 'Anbindung', c: 6, r: 0 }, { t: 'Versorgung', c: 0, r: 4 }, { t: 'Objekt', c: 4, r: 3, key: true },
  { t: 'Umfeld', c: 7, r: 4 }, { t: 'Entwicklung', c: 3, r: 6 },
]

function build() {
  const rand = rng(7), boxes = []
  for (let r = 0; r < M; r++) for (let c = 0; c < N; c++) {
    const x0 = c * CELL, y0 = r * CELL, size = CELL - ROAD
    if (PARKS.has(c + ',' + r)) { boxes.push({ x: x0, y: y0, w: size, d: size, h: 1, park: true }); continue }
    const split = rand() > 0.35, parts = split ? 2 : 1, s = split ? (size - 6) / 2 : size
    for (let i = 0; i < parts; i++) for (let j = 0; j < parts; j++) {
      if (split && rand() < 0.18) continue
      const key = c === 4 && r === 3 && i === 0 && j === 0
      boxes.push({ x: x0 + i * (s + 6), y: y0 + j * (s + 6), w: s, d: s, h: key ? 70 : 6 + Math.floor(rand() * 20), key })
    }
  }
  boxes.sort((a, b) => (a.x + a.w / 2 + a.y + a.d / 2) - (b.x + b.w / 2 + b.y + b.d / 2))
  return boxes
}
const pts = (a) => a.map((p) => p.join(',')).join(' ')

export default function GermanyScene() {
  const boxes = useMemo(build, [])
  const [on, setOn] = useState(3)
  const hold = useRef(false), root = useRef(null), live = useRef(false)
  const minX = P(0, M * CELL)[0] - 10, maxX = P(N * CELL, 0)[0] + 10, minY = P(0, 0, 90)[1] - 10, maxY = P(N * CELL, M * CELL)[1] + 10
  const W = maxX - minX, H = maxY - minY
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { live.current = e.isIntersecting }, { threshold: 0.3 })
    io.observe(root.current)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = reduce ? 0 : setInterval(() => { if (live.current && !hold.current) setOn((v) => (v + 1) % LABELS.length) }, 1800)
    return () => { io.disconnect(); clearInterval(id) }
  }, [])
  return (
    <div ref={root} className="gs" onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }}>
      <div className="gs-head">
        <p className="eyebrow">Deutschlandweit</p>
        <h2 id="h-de" className="h2">Deutschlandweit verbinden.</h2>
      </div>
      <div className="gs-stage">
        <div className="gs-map" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`${minX} ${minY} ${W} ${H}`} aria-hidden="true">
            {boxes.map((b, i) => {
              if (b.park) return <polygon key={i} className="gs-park" points={pts([P(b.x, b.y), P(b.x + b.w, b.y), P(b.x + b.w, b.y + b.d), P(b.x, b.y + b.d)])} />
              const { x, y, w, d, h } = b
              return (
                <g key={i} className={b.key ? 'gs-key' : ''}>
                  <polygon className="gs-l" points={pts([P(x, y + d), P(x + w, y + d), P(x + w, y + d, h), P(x, y + d, h)])} />
                  <polygon className="gs-r" points={pts([P(x + w, y), P(x + w, y + d), P(x + w, y + d, h), P(x + w, y, h)])} />
                  <polygon className="gs-t" points={pts([P(x, y, h), P(x + w, y, h), P(x + w, y + d, h), P(x, y + d, h)])} />
                </g>
              )
            })}
          </svg>
          {LABELS.map((l, i) => {
            const [sx, sy] = P(l.c * CELL + (CELL - ROAD) / 2, l.r * CELL + (CELL - ROAD) / 2, l.key ? 85 : 30)
            return <button key={l.t} type="button" tabIndex={-1} className={'gs-pill' + (i === on ? ' on' : '')} style={{ left: (sx - minX) / W * 100 + '%', top: (sy - minY) / H * 100 + '%' }} onClick={() => setOn(i)}>{l.t}</button>
          })}
        </div>
      </div>
      <div className="gs-foot">
        <span aria-live="polite">{LABELS[on].t}</span>
        <Link to="/kontakt">Region auswählen <i aria-hidden="true">→</i></Link>
      </div>
    </div>
  )
}
