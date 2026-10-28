import { useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'

// Angeheftete Szene: links nummerierte Zeilen, die aktive öffnet sich mit Text; rechts wechselt das große Bild. Scrollen oder Anklicken schaltet weiter.
// Schmale Bildschirme und reduzierte Bewegung: Zeilen untereinander, je mit Bild.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
export default function ScrollList({ eyebrow, title, items, id }) {
  const box = useRef(null)
  const [flat, setFlat] = useState(false)
  const [p, setP] = useState(0)
  const n = items.length
  useEffect(() => {
    const mq = matchMedia('(max-width: 860px), (prefers-reduced-motion: reduce)')
    const sync = () => setFlat(mq.matches)
    sync(); mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    if (flat) return
    let raf = 0
    const tick = () => {
      raf = 0
      const el = box.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setP(clamp(-r.top / Math.max(1, el.offsetHeight - innerHeight), 0, 0.9999))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [flat])
  const a = Math.floor(p * n)
  const jump = (k) => {
    const el = box.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * ((k + 0.5) / n), behavior: 'smooth' })
  }
  if (flat) {
    return (
      <div className="wrap sl2-flat">
        <p className="eyebrow">{eyebrow}</p><h2 className="h2" id={id}>{title}</h2>
        <ol>{items.map((it, k) => (
          <li key={it.t}>{(it.photo || it.img) && <Photo image={it.photo || it.img} sizes="(max-width: 860px) 100vw, 50vw" />}<small>{String(k + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</small><h3>{it.t}</h3><p>{it.d}</p></li>
        ))}</ol>
      </div>
    )
  }
  return (
    <div className="sl2" ref={box} style={{ height: `${n * 85 + 100}svh` }}>
      <div className="sl2-stick">
        <div className="sl2-grid">
          <div className="sl2-left">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2" id={id}>{title}</h2>
            <ol className="sl2-rows">
              {items.map((it, k) => (
                <li key={it.t} className={k === a ? 'on' : ''}>
                  <button type="button" onClick={() => jump(k)} aria-current={k === a ? 'true' : undefined}>
                    <small>{String(k + 1).padStart(2, '0')}</small>
                    <span className="t">{it.t}</span>
                    <i aria-hidden="true">{k === a ? '↗' : '→'}</i>
                  </button>
                  <div className="d"><p>{it.d}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="sl2-pic" aria-hidden="true">
            {items.map((it, k) => <Photo key={it.t} image={it.photo || it.img} sizes="50vw" className={k === a ? 'on' : ''} />)}
            <span className="sl2-no">{String(a + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          </div>
          <div className="sl2-lvl" aria-hidden="true"><i style={{ transform: `scaleY(${(a + 1) / n})` }} /><span>{`Schritt ${a + 1}`}</span></div>
        </div>
      </div>
    </div>
  )
}
