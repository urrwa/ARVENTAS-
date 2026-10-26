import { useEffect, useRef, useState } from 'react'

// Angeheftete Szene: Überschrift und Fortschrittslinie bleiben stehen, die Karten laufen beim Scrollen seitlich durch; die aktive Karte ist hell, die übrigen gedimmt.
// Schmale Bildschirme und reduzierte Bewegung: einfache Liste untereinander.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

function Card({ it, k, on }) {
  return (
    <article className={'st-card' + (on ? ' on' : '') + (it.img ? ' has-img' : '')} aria-current={on ? 'true' : undefined}>
      {it.img && <div className="st-pic"><img src={it.img} alt="" loading="lazy" decoding="async" /></div>}
      <div className="st-body">
        <small>{String(k + 1).padStart(2, '0')} / {String(it.total).padStart(2, '0')}</small>
        <h3>{it.t}</h3>
        {it.d && <p>{it.d}</p>}
        {it.list && <ul>{it.list.map((x) => <li key={x}>{x}</li>)}</ul>}
        {it.note && <p className="st-note">{it.note}</p>}
      </div>
    </article>
  )
}

export default function ScrollTrack({ eyebrow, title, lead, items, id }) {
  const box = useRef(null), track = useRef(null)
  const [flat, setFlat] = useState(false)
  const [p, setP] = useState(0)
  const n = items.length
  const all = items.map((it) => ({ ...it, total: n }))
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
      const el = box.current, tr = track.current
      if (!el || !tr) return
      const r = el.getBoundingClientRect()
      const t = clamp(-r.top / Math.max(1, el.offsetHeight - innerHeight), 0, 1)
      setP(t)
      const first = tr.children[0], last = tr.children[n - 1]
      if (first && last) {
        const cw = first.offsetWidth, gap = parseFloat(getComputedStyle(tr).columnGap) || 0
        const travel = Math.max(0, (n - 1) * (cw + gap))
        tr.style.transform = `translate3d(${(-t * travel).toFixed(1)}px,0,0)`
      }
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [flat, n])
  const a = clamp(Math.round(p * (n - 1)), 0, n - 1)
  const head = (
    <header className="st-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2 st-h" id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  )
  if (flat) return <div className="wrap st-flat">{head}<div className="st-list">{all.map((it, k) => <Card key={it.t} it={it} k={k} on />)}</div></div>
  const jump = (k) => {
    const el = box.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * (n > 1 ? k / (n - 1) : 0), behavior: 'smooth' })
  }
  return (
    <div className="st" ref={box} style={{ height: `${n * 90 + 100}svh` }}>
      <div className="st-stick">
        <div className="st-top">{head}</div>
        <div className="st-line" aria-hidden="true">
          <i className="st-fill" style={{ transform: `scaleX(${p})` }} />
          {all.map((it, k) => <b key={it.t} className={k <= a ? 'on' : ''} style={{ left: `${n > 1 ? k / (n - 1) * 100 : 0}%` }} onClick={() => jump(k)} />)}
        </div>
        <div className="st-view"><div className="st-track" ref={track}>{all.map((it, k) => <Card key={it.t} it={it} k={k} on={k === a} />)}</div></div>
      </div>
    </div>
  )
}
