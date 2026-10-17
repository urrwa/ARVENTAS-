import { useEffect, useRef, useState } from 'react'

// Listenzeilen: Beim Hover wird die Zeile hervorgehoben und ein Bild folgt weich dem Cursor.
export default function HoverList({ items }) {
  const root = useRef(null)
  const pic = useRef(null)
  const [act, setAct] = useState(-1)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 })
  useEffect(() => {
    const el = root.current
    const p = pos.current
    const tick = () => {
      p.x += (p.tx - p.x) * 0.12; p.y += (p.ty - p.y) * 0.12
      if (pic.current) pic.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`
      p.raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const move = (e) => {
      const r = el.getBoundingClientRect()
      p.tx = e.clientX - r.left + 28; p.ty = e.clientY - r.top - 110
      if (!p.raf) p.raf = requestAnimationFrame(tick)
    }
    el.addEventListener('mousemove', move)
    return () => { el.removeEventListener('mousemove', move); p.raf && cancelAnimationFrame(p.raf) }
  }, [])
  return (
    <div className={`hl${act >= 0 ? ' has-act' : ''}`} ref={root} onMouseLeave={() => setAct(-1)}>
      {items.map((it, i) => (
        <article key={it.t} className={`hl-row${act === i ? ' act' : ''}`} onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} onBlur={() => setAct(-1)} tabIndex={0}>
          <span className="hl-n">0{i + 1}</span>
          <h3>{it.t}</h3>
          <p>{it.d}</p>
          <img className="hl-thumb" src={it.img} alt="" loading="lazy" />
        </article>
      ))}
      <div className="hl-pic" ref={pic} aria-hidden="true">
        {items.map((it, i) => <img key={it.t} src={it.img} alt="" className={act === i ? 'on' : ''} />)}
      </div>
    </div>
  )
}
