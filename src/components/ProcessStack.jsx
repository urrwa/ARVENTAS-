import { useEffect, useRef } from 'react'
import Letters from './Letters.jsx'
import ScrollWords from './ScrollWords.jsx'

// Gepinnte Prozess-Sektion: Liste baut sich auf, ein großes Bild schiebt sich von unten ein (Vorbild Archter-Process).
export default function ProcessStack({ steps, lead }) {
  const sec = useRef(null)
  useEffect(() => {
    const s = sec.current
    if (!s) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { s.style.setProperty('--p', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = s.getBoundingClientRect(), span = Math.max(1, r.height - window.innerHeight)
      s.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / span)).toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="ps" ref={sec}>
      <div className="ps-stick wrap">
        <h2 className="big-h ed big-h2 ps-h"><Letters text="Nicht einzelne Maßnahmen." per={26} /><span className="r"><Letters text="Ein verbundenes System." per={26} delay={500} /></span></h2>
        <div className="ps-body">
          <div className="ps-left">
            <ScrollWords className="feat-lead" text={lead} />
          </div>
          <ol className="ps-list">
            {steps.map((s, i) => (
              <li key={s.t} style={{ '--i': i }}><span className="n">({String(i + 1).padStart(2, '0')})</span><b>{s.t}</b></li>
            ))}
          </ol>
        </div>
        <div className="ps-img big" aria-hidden="true"><img src="/media/gal-5.webp" alt="" loading="lazy" decoding="async" /></div>
        <div className="ps-img small" aria-hidden="true"><img src="/media/gal-2.webp" alt="" loading="lazy" decoding="async" /></div>
      </div>
    </section>
  )
}
