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
  return (
    <div className="versus rv">
      <div className="vs-col">
        <h3>{left.t}</h3>
        <ul className="xl">{left.items.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <span className="vs-mid" aria-hidden="true">VS.</span>
      <div className="vs-col gold">
        <h3>{right.t}</h3>
        <ul className="cl">{right.items.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      {line && <p className="gline vs-line">{line}</p>}
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
