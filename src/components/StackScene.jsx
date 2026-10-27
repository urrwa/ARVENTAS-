import { useEffect, useRef, useState } from 'react'

// Gepinnte Szene: links Überschrift und Liste, rechts große Bildkarten, die beim Scrollen eine nach der anderen von unten über die vorige gleiten.
// Schmale Bildschirme und reduzierte Bewegung: Karten untereinander.
const ICON = {
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  scale: 'M12 4v16M6 20h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 17h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6',
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export default function StackScene({ eyebrow, title, lead, items, id }) {
  const box = useRef(null)
  const [flat, setFlat] = useState(false)
  const [a, setA] = useState(0)
  const n = items.length
  useEffect(() => {
    const mq = matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)')
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
      const t = clamp(-r.top / Math.max(1, el.offsetHeight - innerHeight), 0, 0.9999)
      setA(Math.floor(t * n))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [flat, n])
  const jump = (k) => {
    const el = box.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * ((k + 0.5) / n), behavior: 'smooth' })
  }
  const head = (
    <header className="ss2-head">
      {eyebrow && <p className="eyebrow rv">{eyebrow}</p>}
      <h2 id={id} className="h2 rv">{title}</h2>
      {lead && <p className="lead rv">{lead}</p>}
    </header>
  )
  const card = (it, k) => (
    <article key={k} className={'ss2-card' + (flat ? '' : k < a ? ' under' : k === a ? ' on' : ' next')} style={flat ? undefined : { '--d': a - k }} aria-hidden={!flat && k !== a ? 'true' : undefined}>
      <img src={it.img} alt="" loading="lazy" />
      <span className="ss2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICON[it.icon]} /></svg></span>
      <span className="ss2-no">{String(k + 1).padStart(2, '0')}</span>
      <div className="ss2-cap">
        <h3>{it.title}</h3>
        {it.text && <p>{it.text}</p>}
        {it.steps && <ol>{it.steps.map((s, i) => <li key={i}><b>{i + 1}. {s.t}</b><span>{s.d}</span></li>)}</ol>}
      </div>
    </article>
  )
  if (flat) return <div className="wrap ss2-flat">{head}<div className="ss2-stack">{items.map(card)}</div></div>
  return (
    <div className="ss2" ref={box} style={{ height: `${n * 80 + 100}svh` }}>
      <div className="ss2-stick">
        <div className="wrap ss2-grid">
          <div className="ss2-left">
            {head}
            <ol className="ss2-list" aria-label={title}>
              {items.map((it, k) => (
                <li key={k}><button type="button" className={k === a ? 'on' : ''} onClick={() => jump(k)}>{it.label}</button></li>
              ))}
            </ol>
          </div>
          <div className="ss2-stack">{items.map(card)}</div>
        </div>
      </div>
    </div>
  )
}
