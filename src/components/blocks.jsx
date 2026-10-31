import Photo from './Photo.jsx'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { SectionHead } from './ui.jsx'

// Weiche Trennstellen in langen Wortverbindungen (nur sichtbar, wenn ein Umbruch nötig ist).
export const hy = (t) => t.replace(/(Immobilien|Entscheidungs|Potenzial|Risiko|Markt|Standort|Vermarktungs|Entwicklungs)(?=[a-zäöüß]{4,})/g, '$1\u00AD')

// Bausteine der Seiten im dunklen Stil: Icon-Karten, Schrittreihen, Systemkette, Gegenüberstellung.
export const Sec = ({ id, eyebrow, title, lead, children, className = '', tone = 'dark' }) => (
  <section id={id} className={`sec ${tone} ${className}`}>
    <div className="wrap">
      {title && <SectionHead eyebrow={eyebrow} title={title} lead={lead} />}
      {children}
    </div>
  </section>
)

export const Ring = ({ name, size = 22 }) => <span className="ring"><Icon name={name} size={size} /></span>

export function IconGrid({ items, cols = 5, lists = true, numbered = false }) {
  return (
    <div className={`igrid c${cols}`}>
      {items.map((it, i) => {
        const inner = (
          <>
            <Ring name={it.icon} />
            <h3>{hy(it.t)}</h3>
            {it.d && <p>{it.d}</p>}
            {lists && it.list && <ul className="gl">{it.list.map((x) => <li key={x}>{x}</li>)}</ul>}
            {numbered && <span className="num">{String(i + 1).padStart(2, '0')}<small>Prinzip</small></span>}
            {it.link && <span className="more">{it.link} <span aria-hidden="true">→</span></span>}
          </>
        )
        return it.to
          ? <Link key={it.t} to={it.to} className="icard rv" style={{ '--d': i * 70 }}>{inner}</Link>
          : <article key={it.t} className="icard rv" style={{ '--d': i * 70 }}>{inner}</article>
      })}
    </div>
  )
}

export function StepsRow({ items }) {
  return (
    <ol className="srow rv" style={{ '--n': items.length }}>
      {items.map((s, i) => (
        <li key={s.t}>
          <span className="sn">{String(i + 1).padStart(2, '0')}</span>
          {s.icon && <Ring name={s.icon} />}
          <b>{s.t}</b>
          <span>{s.d}</span>
        </li>
      ))}
    </ol>
  )
}

export function Chain({ items, active = -1 }) {
  return (
    <ol className="chain rv" style={{ '--n': items.length }}>
      {items.map((s, i) => (
        <li key={s.t} className={i === active ? 'on' : ''} aria-current={i === active ? 'step' : undefined}>
          <span className="ring big"><Icon name={s.icon} size={26} /></span>
          <b>{s.t}</b>
        </li>
      ))}
    </ol>
  )
}

const QI = ['search', 'chart', 'pin', 'scale', 'users', 'target', 'megaphone', 'chess']
export function Questions({ items }) {
  return (
    <ul className="qgrid">
      {items.map((q, i) => (
        <li key={q} className="rv" style={{ '--d': i * 60 }}>
          <Ring name={QI[i % QI.length]} size={20} />
          <span><small>{String(i + 1).padStart(2, '0')}</small>{q}</span>
        </li>
      ))}
    </ul>
  )
}

export const GoldLine = ({ children }) => <p className="gline rv">{children}</p>

export function Versus({ left, right, line }) {
  const wrap = useRef(null)
  const [t, setT] = useState({ l: -1, r: -1, done: false })
  const nl = left.items.length, nr = right.items.length
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setT({ l: nl, r: nr, done: true }); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect(), vh = window.innerHeight
      const pinned = window.innerWidth >= 861
      // Fortschritt 0..1: am Desktop gepinnt über die Scrollstrecke, mobil beim Durchlauf durchs Bild
      const p = pinned ? -r.top / Math.max(1, r.height - vh * 0.7) + 0.05 : (vh * 0.85 - r.top) / (r.height * 0.95)
      const c = Math.min(1, Math.max(0, p))
      const l = Math.min(nl, Math.floor(Math.min(1, c / 0.62) * (nl + 1)) - 1)
      const rr = Math.min(nr, Math.floor(Math.min(1, c / 0.34) * (nr + 1)) - 1)
      const done = c > 0.7
      setT((x) => (x.l === l && x.r === rr && x.done === done ? x : { l, r: rr, done }))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [nl, nr])
  const st = (cur, i) => (i < cur ? 'done' : i === cur ? 'on' : '')
  return (
    <div className="vs3-wrap" ref={wrap}>
    <div className={`vs3${t.done ? ' fin' : ''}`}>
      <div className="vs3-p old">
        <p className="vs3-h">{left.t}</p>
        <span className="vs3-bar"><i style={{ transform: `scaleX(${Math.min(1, Math.max(0, t.l) / left.items.length)})` }} /></span>
        <ul>{left.items.map((x, i) => <li key={x} className={st(t.l, i)}><span className="ring" aria-hidden="true" />{x}</li>)}</ul>
      </div>
      <span className="vs3-mid" aria-hidden="true">VS.</span>
      <div className="vs3-p new">
        <p className="vs3-h">{right.t}</p>
        <span className="vs3-bar"><i style={{ transform: `scaleX(${Math.min(1, Math.max(0, t.r) / right.items.length)})` }} /></span>
        <ul>{right.items.map((x, i) => <li key={x} className={st(t.r, i)}><span className="ring" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.3l2.2 2.2 4.8-5" /></svg></span>{x}</li>)}</ul>
      </div>
      {line && <p className="vs3-line">{line}</p>}
    </div>
    </div>
  )
}

export function Split({ img, children, flip = false, alt = '' }) {
  return (
    <div className={`split${flip ? ' flip' : ''}`}>
      <div className="split-img rv"><Photo src={img} alt={alt} loading="lazy" decoding="async" /></div>
      <div className="split-txt">{children}</div>
    </div>
  )
}

export function ServiceCards({ items }) {
  return (
    <div className="igrid c5 svc">
      {items.map((s, i) => (
        <article key={s.slug} className="icard svc-card rv" style={{ '--d': i * 70 }}>
          <div className="svc-img"><Photo src={s.img} alt="" loading="lazy" decoding="async" /></div>
          <Ring name={s.icon} />
          <h3>{hy(s.t)}</h3>
          <p className="svc-tag">{s.tag}</p>
          <p>{s.card}</p>
          <ul className="gl">{s.list.map((x) => <li key={x}>{x}</li>)}</ul>
          <Link className="btn btn-line svc-btn" to={`/leistungen/${s.slug}`}>{s.ctaLink} <span className="arr" aria-hidden="true">→</span></Link>
        </article>
      ))}
    </div>
  )
}
