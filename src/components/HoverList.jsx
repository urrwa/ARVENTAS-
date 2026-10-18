import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

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
      p.x += (p.tx - p.x) * 0.3; p.y += (p.ty - p.y) * 0.3
      if (pic.current) pic.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`
      p.raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    let r = el.getBoundingClientRect()
    const upd = () => { r = el.getBoundingClientRect() }
    window.addEventListener('scroll', upd, { passive: true })
    const move = (e) => {
      p.tx = e.clientX - r.left + 28; p.ty = e.clientY - r.top - 110
      if (!p.raf) p.raf = requestAnimationFrame(tick)
    }
    el.addEventListener('mousemove', move)
    return () => { window.removeEventListener('scroll', upd); el.removeEventListener('mousemove', move); p.raf && cancelAnimationFrame(p.raf) }
  }, [])
  return (
    <div className={`hl${act >= 0 ? ' has-act' : ''}`} ref={root} onMouseLeave={() => setAct(-1)}>
      {items.map((it, i) => (
        <article key={it.t} className={`hl-row${act === i ? ' act' : ''}`} onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} onBlur={() => setAct(-1)} tabIndex={0}>
          <span className="hl-n">{it.icon ? <span className="hl-ico"><Icon name={it.icon} /></span> : `0${i + 1}`}</span>
          <h3>{it.to ? <Link to={it.to} className="hl-link">{it.t}</Link> : it.t}</h3>
          <p>{it.d}</p>
          <img className="hl-thumb" src={it.img} alt="" loading="lazy" decoding="async" />
        </article>
      ))}
      <div className="hl-pic" ref={pic} aria-hidden="true">
        {items.map((it, i) => <img key={it.t} src={it.img} alt="" decoding="async" className={act === i ? 'on' : ''} />)}
      </div>
    </div>
  )
}
