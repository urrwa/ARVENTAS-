import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import map from '@svg-maps/germany'
import { REGIONS } from '../content/data.js'

// Deutschlandkarte als schräge, erhabene Fläche über die ganze Bildschirmbreite. Namensschilder (Landeshauptstädte, reine Geografie)
// liegen auf den Bundesländern; das aktive wechselt von selbst und per Klick. Keine Standort- oder Nachfrageangabe.
const PILLS = { hh: 'Hamburg', be: 'Berlin', by: 'München', nw: 'Düsseldorf', bw: 'Stuttgart', sn: 'Dresden', ni: 'Hannover', he: 'Wiesbaden' }
const IDS = Object.keys(PILLS)
const [, , VW, VH] = map.viewBox.split(' ').map(Number)

export default function GermanyScene() {
  const [on, setOn] = useState(IDS[0])
  const [c, setC] = useState({})
  const hold = useRef(false), root = useRef(null), live = useRef(false), probe = useRef(null)
  useLayoutEffect(() => {
    const out = {}
    probe.current.querySelectorAll('path').forEach((p) => { const b = p.getBBox(); out[p.dataset.id] = [(b.x + b.width / 2) / VW * 100, (b.y + b.height / 2) / VH * 100] })
    setC(out)
  }, [])
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { live.current = e.isIntersecting }, { threshold: 0.3 })
    io.observe(root.current)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = reduce ? 0 : setInterval(() => { if (live.current && !hold.current) setOn((v) => IDS[(IDS.indexOf(v) + 1) % IDS.length]) }, 1800)
    return () => { io.disconnect(); clearInterval(id) }
  }, [])
  const name = (id) => REGIONS.find((r) => r.id === id)?.name
  return (
    <div ref={root} className="gs" onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }}>
      <div className="gs-head">
        <p className="eyebrow">Deutschlandweit</p>
        <h2 id="h-de" className="h2">Regional verstehen. Deutschlandweit verbinden.</h2>
      </div>
      <div className="gs-stage" aria-hidden="true">
        <div className="gs-plane" style={{ aspectRatio: `${VW} / ${VH}` }}>
          {[3, 2, 1].map((k) => (
            <svg key={k} className="gs-layer" viewBox={map.viewBox} style={{ transform: `translateZ(${-k * 7}px)` }}>
              {map.locations.map((l) => <path key={l.id} d={l.path} />)}
            </svg>
          ))}
          <svg ref={probe} className="gs-layer gs-top" viewBox={map.viewBox}>
            {map.locations.map((l) => <path key={l.id} data-id={l.id} d={l.path} className={l.id === on ? 'on' : ''} />)}
          </svg>
          {IDS.map((id) => c[id] && (
            <button key={id} type="button" className={'gs-pill' + (id === on ? ' on' : '')} style={{ left: c[id][0] + '%', top: c[id][1] + '%' }} onClick={() => setOn(id)} tabIndex={-1}>{PILLS[id]}</button>
          ))}
        </div>
      </div>
      <div className="gs-foot">
        <span aria-live="polite">{name(on)}</span>
        <Link to={`/kontakt?region=${encodeURIComponent(name(on))}`}>Region auswählen <i aria-hidden="true">→</i></Link>
      </div>
    </div>
  )
}
