import { useEffect, useRef, useState } from 'react'
import { OWNER_PROCESS, INVESTOR_PROCESS } from '../content/data.js'

// Zwei nachvollziehbare Prozesse als laufende Schrittfolge: großer Zähler links, rechts die Schritte mit wanderndem Marker und Fortschrittslinie.
// Wechselt von selbst, solange der Abschnitt sichtbar ist; Klick springt zum Schritt. Ohne Bewegung (reduzierte Bewegung) sind alle Schritte offen.
export default function ProcessTimeline({ initial = 'owner' }) {
  const [who, setWho] = useState(initial)
  const [a, setA] = useState(0)
  const list = useRef(null), root = useRef(null), live = useRef(false), hold = useRef(false)
  const steps = who === 'owner' ? OWNER_PROCESS : INVESTOR_PROCESS
  const n = steps.length
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    const el = root.current
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { live.current = e.isIntersecting }, { threshold: 0.3 }) : null
    io && io.observe(el)
    return () => io && io.disconnect()
  }, [])
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => { if (live.current && !hold.current) setA((v) => (v + 1) % n) }, 3600)
    return () => clearInterval(id)
  }, [n, reduce, who])
  useEffect(() => {
    const ol = list.current; if (!ol) return
    const place = () => { const li = ol.children[a + 1]; if (li) ol.style.setProperty('--y', (li.offsetTop + 14) + 'px') }
    place(); const t = setTimeout(place, 560)
    addEventListener('resize', place)
    return () => { clearTimeout(t); removeEventListener('resize', place) }
  }, [a, who])
  const pick = (w) => { setWho(w); setA(0) }
  return (
    <div ref={root}>
      <div className="toggle" role="tablist" aria-label="Prozess wählen">
        <button type="button" role="tab" aria-selected={who === 'owner'} onClick={() => pick('owner')}>Für Eigentümer</button>
        <button type="button" role="tab" aria-selected={who === 'investor'} onClick={() => pick('investor')}>Für Investoren</button>
      </div>
      <div className="pj" onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }}>
        <div className="pj-count" aria-hidden="true">
          <b key={who + a}>{String(a + 1).padStart(2, '0')}</b>
          <span>/ {String(n).padStart(2, '0')}</span>
        </div>
        <ol ref={list} className="pj-list" style={{ '--a': a, '--n': n }}>
          <i className="pj-dot" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={who + s.t} className={i === a || reduce ? 'on' : i < a ? 'done' : ''} style={{ '--i': i }}>
              <button type="button" aria-expanded={i === a || reduce} onClick={() => setA(i)}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                <b>{s.t}</b>
              </button>
              <div className="pj-d"><p>{s.d}</p><u key={a} /></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function SimpleTimeline({ steps }) {
  return (
    <ol className="tl rv" style={{ '--n': steps.length }}>
      {steps.map((s) => <li key={s.t}><b>{s.t}</b><span>{s.d}</span></li>)}
    </ol>
  )
}
