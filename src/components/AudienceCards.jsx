import { useEffect, useRef, useState } from 'react'

// Zielgruppen als Bühne (Vorbild Vistahaven): Das aktive Foto steht groß, die übrigen Punkte stehen als schmale, senkrechte Reiter daneben.
// Pfeile, Reiter und der Takt (nur wenn sichtbar) wechseln den Punkt. Fotos sind die vom Auftraggeber gelieferten.
const IMGS = ['/media/gal-6.webp', '/media/gal-7.webp', '/media/gal-5.webp', '/media/gal-8.webp', '/media/buero-abend-1.webp']
const nn = (i) => String(i + 1).padStart(2, '0')

export default function AudienceCards({ items }) {
  const root = useRef(null)
  const [a, setA] = useState(0)
  const hold = useRef(false), seen = useRef(false)
  const n = items.length
  const go = (i) => setA((i + n) % n)
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting }, { threshold: 0.4 })
    io.observe(el)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = reduce ? 0 : setInterval(() => { if (seen.current && !hold.current) setA((v) => (v + 1) % n) }, 6000)
    return () => { io.disconnect(); id && clearInterval(id) }
  }, [n])
  const it = items[a]
  return (
    <div className="aud3" ref={root} onMouseEnter={() => { hold.current = true }} onMouseLeave={() => { hold.current = false }} onFocus={() => { hold.current = true }} onBlur={() => { hold.current = false }}>
      <div className="aud3-txt" key={a}>
        <h3>{it.t.replace('gesellschaften', '\u00ADgesellschaften')}</h3>
        <p>{it.d}</p>
      </div>
      <div className="aud3-stage">
        <div className="aud3-arrows">
          <button type="button" onClick={() => go(a - 1)} aria-label="Zurück">←</button>
          <button type="button" onClick={() => go(a + 1)} aria-label="Weiter">→</button>
        </div>
        <div className="aud3-row">
          {items.map((x, i) => i === a ? (
            <figure key={x.t} className="aud3-card">
              {items.map((y, j) => <img key={y.t} src={IMGS[j % IMGS.length]} alt="" className={j === a ? 'on' : ''} loading="lazy" decoding="async" />)}
              <figcaption><b>{nn(i)}</b><span>{x.t}</span></figcaption>
            </figure>
          ) : (
            <button key={x.t} type="button" className="aud3-tab" onClick={() => go(i)} aria-label={x.t}>
              <b>{nn(i)}</b><span>{x.t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
