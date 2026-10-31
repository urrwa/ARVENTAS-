import Photo from './Photo.jsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Treppe aus Karten (Vorbild Framer-Ablauf): Die Karten steigen versetzt ab, eine feine Linie verbindet die Punkte,
// ein goldener Strich wandert Stück für Stück entlang. Bei Berührung zeigt die Karte ihren Text. Fotos sind die vom Auftraggeber gelieferten.
const nn = (i) => String(i + 1).padStart(2, '0')

export default function StairFlow({ items, images }) {
  const root = useRef(null), dots = useRef([])
  const [paths, setPaths] = useState([])
  const [act, setAct] = useState(0)
  const [seen, setSeen] = useState(false)
  const n = items.length

  useLayoutEffect(() => {
    const el = root.current
    const calc = () => {
      const o = el.getBoundingClientRect()
      const pts = dots.current.map((d) => { const r = d.getBoundingClientRect(); return [r.left - o.left + r.width / 2, r.top - o.top + r.height / 2] })
      setPaths(pts.slice(0, -1).map(([x1, y1], i) => {
        const [x2, y2] = pts[i + 1], lift = Math.max(26, Math.abs(x2 - x1) * 0.16)
        return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${((x1 + x2) / 2).toFixed(1)} ${(Math.min(y1, y2) - lift).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
      }))
    }
    calc()
    const ro = new ResizeObserver(calc)
    ro.observe(el)
    return () => ro.disconnect()
  }, [n])

  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setAct((v) => (v + 1) % (n + 1)), 1300)
    return () => clearInterval(id)
  }, [seen, n])

  return (
    <div className={`stf${seen ? ' in' : ''}`} ref={root} style={{ '--n': n }}>
      <svg className="stf-svg" aria-hidden="true">
        {paths.map((d, i) => (
          <g key={i}>
            <path d={d} className="stf-line" />
            <path d={d} className={`stf-hi${act > i && act <= n ? ' on' : ''}`} pathLength="1" />
          </g>
        ))}
      </svg>
      <ol className="stf-list">
        {items.map((it, i) => (
          <li key={it.t} style={{ '--i': i }}>
            <span className={`stf-n${act > i || !seen ? ' on' : ''}`} ref={(e) => { dots.current[i] = e }}>{nn(i)}</span>
            <a className="stf-card" tabIndex={0}>
              <span className="stf-img"><Photo src={images[i % images.length]} alt="" loading="lazy" decoding="async" /><span className="stf-d">{it.d}</span></span>
              <b>{it.t}</b>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
