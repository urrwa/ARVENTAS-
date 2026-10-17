import { Link } from 'react-router-dom'
import { useId, useRef, useState } from 'react'
import Brand, { Brandify } from './Brand.jsx'
import RevealText from './RevealText.jsx'
import Letters from './Letters.jsx'

export const Arrow = () => <span className="arr" aria-hidden="true">→</span>

export function Btn({ to, href, variant = 'gold', children, ...rest }) {
  const cls = `btn btn-${variant}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}<Arrow /></Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}<Arrow /></a>
  return <button className={cls} {...rest}>{children}</button>
}

export function SectionHead({ eyebrow, title, lead, h = 'h2', normal = false, delay = 0 }) {
  const H = h
  return (
    <header className="sec-head">
      {eyebrow && <p className="eyebrow rv">{eyebrow}</p>}
      <H className={`${h === 'h1' ? 'h1' : 'h2'}${normal ? ' normal' : ''}${typeof title === 'string' ? '' : ' rv'}`} style={{ '--d': delay }}>{typeof title === 'string' ? <Letters text={title} /> : title}</H>
      {lead && (typeof lead === 'string' ? <RevealText text={lead} className="lead" /> : <p className="lead rv" style={{ '--d': delay + 80 }}><Brandify>{lead}</Brandify></p>)}
    </header>
  )
}

// Eindeutig gekennzeichneter Platzhalter für fehlende Originaldaten (Briefing Abschnitt 15).
export function Placeholder({ title = 'Platzhalter', children }) {
  return <div className="ph"><b>{title}</b>{children}</div>
}

export function DemoNotice() {
  return <p className="demo"><b>Demo</b>Ihre Angaben werden nicht versendet.</p>
}

// Zugängliche Tabs (WAI-ARIA Tabs Pattern, Pfeiltasten, Home/End)
export function Tabs({ label, items, className = 'tabs', listClass = 'tabs-list', panelClass = 'tabs-panel', tabClass, initial = 0, vertical = false, renderPanel }) {
  const [i, setI] = useState(initial)
  const base = useId()
  const refs = useRef([])
  const go = (n) => { const k = (n + items.length) % items.length; setI(k); refs.current[k] && refs.current[k].focus() }
  const onKey = (e) => {
    const next = vertical ? 'ArrowDown' : 'ArrowRight', prev = vertical ? 'ArrowUp' : 'ArrowLeft'
    if (e.key === next || (vertical && e.key === 'ArrowRight')) { e.preventDefault(); go(i + 1) }
    else if (e.key === prev || (vertical && e.key === 'ArrowLeft')) { e.preventDefault(); go(i - 1) }
    else if (e.key === 'Home') { e.preventDefault(); go(0) }
    else if (e.key === 'End') { e.preventDefault(); go(items.length - 1) }
  }
  return (
    <div className={className}>
      <div className={listClass} role="tablist" aria-label={label} aria-orientation={vertical ? 'vertical' : 'horizontal'} onKeyDown={onKey}>
        {items.map((t, k) => (
          <button key={t.id} ref={(el) => (refs.current[k] = el)} role="tab" id={`${base}-t${k}`} aria-controls={`${base}-p${k}`}
            aria-selected={i === k} tabIndex={i === k ? 0 : -1} className={tabClass} onClick={() => setI(k)} type="button">
            {t.label}{t.small && <small>{t.small}</small>}
          </button>
        ))}
      </div>
      <div className={panelClass} role="tabpanel" id={`${base}-p${i}`} aria-labelledby={`${base}-t${i}`} tabIndex={0}>
        {renderPanel ? renderPanel(items[i], i) : items[i].content}
      </div>
    </div>
  )
}

export function Faq({ items }) {
  const [open, setOpen] = useState(-1)
  const uid = useId()
  return (
    <div className="faq">
      {items.map((q, i) => {
        const on = open === i
        return (
          <div key={q.q} className={`faq-item${on ? ' on' : ''}`}>
            <h3 className="faq-q">
              <button type="button" id={`${uid}-b${i}`} aria-expanded={on} aria-controls={`${uid}-p${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <span>{q.q}</span><i aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-panel" id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} inert={!on}>
              <div className="faq-clip">
                <div className="ans">
                  {q.open && <span className="tagd">Redaktionelle Freigabe offen</span>}
                  <p><Brandify>{q.a}</Brandify></p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
