import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sections } from '../content/sections.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const bar = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => { const el = document.getElementById(s.id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  const cur = sections.find((s) => s.id === active)

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className="nav">
        <Link to="/" className="nav__brand" aria-label="ARVENTAS Startseite">ARVENTAS</Link>
        <div>
          {cur && <span className="nav__current eyebrow">{String(cur.n).padStart(2, '0')} / 16</span>}
          <button className="nav__btn" aria-expanded={open} aria-controls="toc-menu" onClick={() => setOpen(!open)}>
            {open ? 'Schließen' : 'Inhalt'}
          </button>
        </div>
      </header>
      <nav id="toc-menu" className={`menu ${open ? 'is-open' : ''}`} aria-label="Inhaltsverzeichnis" aria-hidden={!open}>
        <ol>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} tabIndex={open ? 0 : -1} className={active === s.id ? 'is-active' : ''}
                onClick={() => setOpen(false)}>
                <span>{String(s.n).padStart(2, '0')}</span>{s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
