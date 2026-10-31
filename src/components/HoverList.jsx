import Photo from './Photo.jsx'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Listenzeilen: Beim Hover wird die Zeile hervorgehoben und ein Bild folgt weich dem Cursor.
export default function HoverList({ items }) {
  const root = useRef(null)
  const pic = useRef(null)
  const [act, setAct] = useState(-1)
  const st = useRef({ x: 0, y: 0, tx: 0, ty: 0, cx: 0, cy: 0, raf: 0, on: false, init: false })
  useEffect(() => {
    const el = root.current, s = st.current
    const aim = () => {
      const r = el.getBoundingClientRect(), pc = pic.current
      if (!pc) return
      s.tx = s.cx - r.left + 22
      s.ty = s.cy - r.top - pc.offsetHeight / 2
    }
    const tick = () => {
      aim()
      if (!s.init) { s.x = s.tx; s.y = s.ty; s.init = true }
      s.x += (s.tx - s.x) * 0.34; s.y += (s.ty - s.y) * 0.34
      if (pic.current) pic.current.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`
      s.raf = s.on || Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.4 ? requestAnimationFrame(tick) : 0
    }
    const kick = () => { if (!s.raf) s.raf = requestAnimationFrame(tick) }
    const enter = (e) => { s.cx = e.clientX; s.cy = e.clientY; s.on = true; s.init = false; kick() }
    const move = (e) => { s.cx = e.clientX; s.cy = e.clientY; s.on = true; kick() }
    const leave = () => { s.on = false }
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); s.raf && cancelAnimationFrame(s.raf) }
  }, [])
  return (
    <div className={`hl${act >= 0 ? ' has-act' : ''}`} ref={root} onMouseLeave={() => setAct(-1)}>
      {items.map((it, i) => (
        <article key={it.t} className={`hl-row${act === i ? ' act' : ''}`} onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} onBlur={() => setAct(-1)} tabIndex={0}>
          <span className="hl-n">({String(i + 1).padStart(2, '0')})</span>
          <h3>{it.to ? <Link to={it.to} className="hl-link">{it.t}</Link> : it.t}</h3>
          <p>{it.d}</p>
          <Photo className="hl-thumb" src={it.img} alt="" loading="lazy" decoding="async" />
        </article>
      ))}
      <div className="hl-pic" ref={pic} aria-hidden="true">
        {items.map((it, i) => <Photo key={it.t} src={it.img} alt="" loading="eager" decoding="async" className={act === i ? 'on' : ''} />)}
      </div>
    </div>
  )
}
