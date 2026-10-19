import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Listenzeilen: Beim Hover wird die Zeile hervorgehoben und ein Bild folgt weich dem Cursor.
export default function HoverList({ items }) {
  const root = useRef(null)
  const pic = useRef(null)
  const rows = useRef([])
  const [act, setAct] = useState(0)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, init: false })
  useEffect(() => {
    const p = pos.current
    const tick = () => {
      p.x += (p.tx - p.x) * 0.16; p.y += (p.ty - p.y) * 0.16
      if (pic.current) pic.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`
      p.raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const place = () => {
      const row = rows.current[act], el = root.current, pc = pic.current
      if (!row || !el || !pc) return
      const txt = row.querySelector('p')
      const er = el.getBoundingClientRect()
      const gap = Math.max(16, window.innerWidth * 0.015)
      p.tx = txt.getBoundingClientRect().left - er.left - pc.offsetWidth - gap
      p.ty = row.offsetTop + row.offsetHeight / 2 - pc.offsetHeight / 2
      if (!p.init) { p.x = p.tx; p.y = p.ty; p.init = true }
      if (!p.raf) p.raf = requestAnimationFrame(tick)
    }
    place()
    window.addEventListener('resize', place)
    return () => { window.removeEventListener('resize', place); p.raf && cancelAnimationFrame(p.raf) }
  }, [act])
  return (
    <div className="hl has-act" ref={root}>
      {items.map((it, i) => (
        <article key={it.t} ref={(el) => (rows.current[i] = el)} className={`hl-row${act === i ? ' act' : ''}`} onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} tabIndex={0}>
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
