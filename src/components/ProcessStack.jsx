import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Btn } from './ui.jsx'
import Letters from './Letters.jsx'

// Nach Foreal: Intro mit großer Wortmarke, darunter laufen hohe Fotokarten normal durch,
// während Gebäudefoto und Text rechts stehen bleiben. Grund bleibt Marineblau.
const IMGS = ['real/frankfurt-main', 'real/begutachtung-travertin', 'real/baulucke', 'real/modell-dunkel', 'real/eingang-travertin']
const BG = '/media/turm.webp'

export default function ProcessStack({ steps, lead, active = -1, facts, links }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const cards = [...el.querySelectorAll('.fl-card, .fl-fact')]
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { cards.forEach((c) => c.classList.add('in')); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.25 })
    cards.forEach((c) => io.observe(c))
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.querySelector('.fl-intro').getBoundingClientRect()
      el.style.setProperty('--g', Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))).toFixed(3))
      const b = el.querySelector('.fl-body').getBoundingClientRect()
      el.style.setProperty('--pan', Math.min(1, Math.max(0, -b.top / Math.max(1, b.height - window.innerHeight))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="fl" ref={root}>
      <div className="fl-intro">
        <svg className="fl-ghost" viewBox="0 0 1000 190" aria-hidden="true" focusable="false"><text x="40" y="160" textLength="920" lengthAdjust="spacing">ΛRVENTΛS</text></svg>
        <p><small>Über uns</small>Entdecken</p>
      </div>
      <div className="wrap fl-body">
        <ol className="fl-cards">
          {steps.map((s, i) => (
            <li key={s.t} className={`fl-card${i === active ? ' on' : ''}`} aria-current={i === active ? 'step' : undefined} style={{ '--i': i }}>
              <img src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" />
              <span className="fl-info">
                <span className="fl-row"><b>{s.t}</b><i>{String(i + 1).padStart(2, '0')}</i></span>
                {s.d && <span className="fl-d">{s.d}</span>}
              </span>
            </li>
          ))}
        </ol>
        <div className="fl-photo" aria-hidden="true"><img src={BG} alt="" width="1000" height="2275" loading="lazy" decoding="async" /></div>
        <div className="fl-txt">
          <div className="fl-txt-in">
            <p className="fl-lab">(Unser System)</p>
            <h2 className="fl-h"><Letters text="Nicht einzelne Maßnahmen." per={22} max={700} /><span className="fl-l2"><Letters text="Ein verbundenes System." per={22} max={700} delay={500} /></span></h2>
            <p className="fl-p">{lead}</p>
            <Btn to="/kontakt" variant="gold">Potenzial analysieren</Btn>
          </div>
        </div>
      </div>
      {facts && (
        <div className="wrap fl-facts">
          {facts.map((f, i) => (
            <article key={f.l} className={`fl-fact f${i + 1}`}>
              <b>{f.n}</b>
              <span className="fl-fl">{f.l}</span>
              <p>{f.d}</p>
              <img src={`/media/${f.img}.webp`} alt="" loading="lazy" decoding="async" style={{ '--pos': f.pos }} />
            </article>
          ))}
        </div>
      )}
      {links && (
        <div className="wrap fl-links">
          <ul>
            {links.map((l) => <li key={l.to}><Link to={l.to}><span aria-hidden="true">↘</span>{l.t}</Link></li>)}
            <li className="all"><Link to="/leistungen"><span aria-hidden="true">↘</span>Alle Leistungen</Link></li>
          </ul>
        </div>
      )}
    </section>
  )
}
