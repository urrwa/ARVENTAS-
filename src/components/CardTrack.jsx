import Photo from './Photo.jsx'
import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import { HOME } from '../content/images.js'

// Gepinnte Kartenreihe: Vertikales Scrollen schiebt die Karten seitlich, die mittlere Karte ist hervorgehoben (Vorbild Contemo).
export default function CardTrack({ items }) {
  const sec = useRef(null), track = useRef(null)
  useEffect(() => {
    const s = sec.current, t = track.current
    if (!s || !t) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, cur = 0, target = 0, act = -1
    const cards = [...t.children]
    const calc = () => {
      const r = s.getBoundingClientRect(), span = Math.max(1, r.height - window.innerHeight)
      target = Math.min(1, Math.max(0, -r.top / span))
    }
    const apply = () => {
      raf = 0
      cur += (target - cur) * 0.28
      if (Math.abs(target - cur) < 0.0005) cur = target
      const vw = window.innerWidth
      const first = cards[0], last = cards[cards.length - 1]
      const from = vw / 2 - (first.offsetLeft + first.offsetWidth / 2)
      const to = vw / 2 - (last.offsetLeft + last.offsetWidth / 2)
      t.style.transform = `translate3d(${(from + (to - from) * cur).toFixed(1)}px,0,0)`
      let best = 0, bd = 1e9
      cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 + (from + (to - from) * cur) - vw / 2); if (d < bd) { bd = d; best = i } })
      if (best !== act) { cards.forEach((c, i) => c.classList.toggle('on', i === best)); act = best }
      if (cur !== target) raf = requestAnimationFrame(apply)
    }
    const on = () => { calc(); if (!raf) raf = requestAnimationFrame(apply) }
    if (reduce) { cards[0].classList.add('on'); return }
    calc(); cur = target; apply()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="ct" ref={sec}>
      <div className="ct-stick">
        <Photo className="ct-bg" src={HOME.pillarsBg} alt="" loading="lazy" decoding="async" />
        <div className="ct-track" ref={track}>
          {items.map((it, i) => (
            <article key={it.t} className="ct-card">
              <div className="ct-top"><span className="ring"><Icon name={it.icon} size={20} /></span><span className="ct-n">{String(i + 1).padStart(2, '0')}</span></div>
              <div className="ct-img"><Photo src={HOME.pillars[i % HOME.pillars.length]} alt="" loading="lazy" decoding="async" /></div>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
