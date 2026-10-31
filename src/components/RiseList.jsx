import Photo from './Photo.jsx'
import { useEffect, useRef } from 'react'
import { Btn } from './ui.jsx'

// Gepinnte Liste: Zeilen setzen sich nacheinander, ein breiter Bildstreifen wächst von unten und wechselt mit der aktiven Zeile (Vorbild Arlo).
const IMGS = ['real/baulucke', 'real/modell-skyline', 'real/eingang-travertin', 'real/glasfassaden', 'real/besprechungsraum']

export default function RiseList({ items, title, cta }) {
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
  const n = items.length
  return (
    <section className="rl" ref={sec} style={{ '--n': n }}>
      <div className="rl-stick">
        <div className="wrap rl-top">
          <h2 className="rl-h">{title}</h2>
          {cta && <Btn to={cta.to} variant="gold">{cta.t}</Btn>}
        </div>
        <div className="wrap"><ol className="rl-list">
          {items.map((it, i) => (
            <li key={it.t} style={{ '--i': i }}>
              <span className="n">({String(i + 1).padStart(2, '0')})</span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </li>
          ))}
        </ol></div>
        <div className="rl-band" aria-hidden="true">
          {items.map((it, i) => <Photo key={i} src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" style={{ '--i': i }} />)}
        </div>
      </div>
    </section>
  )
}
