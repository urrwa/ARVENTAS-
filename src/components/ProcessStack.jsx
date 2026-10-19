import { useEffect, useRef } from 'react'
import { Btn } from './ui.jsx'
import Letters from './Letters.jsx'

// Nach Foreal: Intro mit großer Wortmarke, darunter laufen hohe Fotokarten normal durch,
// während Gebäudefoto und Text rechts stehen bleiben. Grund bleibt Marineblau.
const IMGS = ['gal-5', 'buero-abend-2', 'cta-abend-2', 'buero-abend-1', 'gal-2']
const BG = '/media/turm.webp'

export default function ProcessStack({ steps, lead, active = -1 }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const cards = [...el.querySelectorAll('.fl-card')]
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { cards.forEach((c) => c.classList.add('in')); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.25 })
    cards.forEach((c) => io.observe(c))
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.querySelector('.fl-intro').getBoundingClientRect()
      el.style.setProperty('--g', Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))).toFixed(3))
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
    </section>
  )
}
