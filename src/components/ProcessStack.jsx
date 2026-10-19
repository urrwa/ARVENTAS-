import { useEffect, useRef } from 'react'
import { Btn } from './ui.jsx'
import Letters from './Letters.jsx'

// Gepinnte Kartenstapel-Sektion (Vorbild Foreal): Dunkle Rundkarten springen links nacheinander auf, die große Foto-Fläche wechselt mit,
// rechts stehen Aussage, Text und Button. Grund bleibt Marineblau.
const IMGS = ['cta-abend-1', 'buero-abend-2', 'gal-5', 'buero-abend-1', 'cta-abend-2']

export default function ProcessStack({ steps, lead, active = -1 }) {
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
  const n = steps.length
  return (
    <section className="pcs" ref={sec} style={{ '--n': n }}>
      <div className="pcs-stick">
        <span className="pcs-ghost" aria-hidden="true">ΛRVENTΛS</span>
        <div className="wrap pcs-grid">
          <ol className="pcs-cards">
            {steps.map((s, i) => (
              <li key={s.t} className={i === active ? 'on' : ''} aria-current={i === active ? 'step' : undefined} style={{ '--i': i }}>
                <span className="pcs-t">{s.t}</span>
                <span className="pcs-n">{String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ol>
          <div className="pcs-photo" aria-hidden="true">
            {steps.map((s, i) => <img key={i} src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" style={{ '--i': i }} />)}
          </div>
          <div className="pcs-txt">
            <h2 className="pcs-h"><Letters text="Nicht einzelne Maßnahmen." per={22} max={700} /><span className="pcs-l2"><Letters text="Ein verbundenes System." per={22} max={700} delay={500} /></span></h2>
            <p>{lead}</p>
            <Btn to="/kontakt" variant="gold">Potenzial analysieren</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
