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
  const ref = useRef(null)
  const [t, setT] = useState({ l: -1, r: -1, done: false })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nl = left.items.length, nr = right.items.length
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setT({ l: nl, r: nr, done: true }); return }
    const timers = []
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      // links: langsam und ohne Abschluss, rechts: zügig bis zum Ziel
      for (let i = 0; i <= nl; i++) timers.push(setTimeout(() => setT((x) => ({ ...x, l: i })), 500 + i * 1000))
      for (let i = 0; i <= nr; i++) timers.push(setTimeout(() => setT((x) => ({ ...x, r: i })), 500 + i * 520))
      timers.push(setTimeout(() => setT((x) => ({ ...x, done: true })), 500 + Math.max(nl * 1000, nr * 520) + 300))
    }, { threshold: 0.35 })
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [left.items.length, right.items.length])
  const st = (cur, i) => (i < cur ? 'done' : i === cur ? 'on' : '')
  return (
    <div className={`vs3${t.done ? ' fin' : ''}`} ref={ref}>
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
  )
}

export function Split({ img, children, flip = false, alt = '' }) {
  return (
    <div className={`split${flip ? ' flip' : ''}`}>
      <div className="split-img rv"><img src={img} alt={alt} loading="lazy" decoding="async" /></div>
      <div className="split-txt">{children}</div>
    </div>
  )
}

export function ServiceCards({ items }) {
  return (
    <div className="igrid c5 svc">
      {items.map((s, i) => (
        <article key={s.slug} className="icard svc-card rv" style={{ '--d': i * 70 }}>
          <div className="svc-img"><img src={s.img} alt="" loading="lazy" decoding="async" /></div>
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
