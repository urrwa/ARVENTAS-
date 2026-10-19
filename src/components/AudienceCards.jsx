import { useEffect, useRef, useState } from 'react'

// Zielgruppen als Bühne (Vorbild Vistahaven): Das aktive Foto steht groß, die übrigen Punkte stehen als schmale, senkrechte Reiter daneben.
// Beim Scrollen öffnet sich ein Punkt nach dem anderen; Pfeile und Reiter springen direkt dorthin. Fotos sind die vom Auftraggeber gelieferten.
const IMGS = ['/media/gal-6.webp', '/media/gal-7.webp', '/media/gal-5.webp', '/media/gal-8.webp', '/media/buero-abend-1.webp']
const nn = (i) => String(i + 1).padStart(2, '0')

export default function AudienceCards({ items }) {
  const root = useRef(null)
  const [a, setA] = useState(0)
  const n = items.length
  // Beim Scrollen öffnet sich ein Punkt nach dem anderen, die Bühne bleibt dabei stehen.
  useEffect(() => {
    const el = root.current
    if (!el) return
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect(), span = Math.max(1, r.height - window.innerHeight)
      const p = Math.min(0.9999, Math.max(0, -r.top / span))
      setA(Math.floor(p * n))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [n])
  // Reiter und Pfeile springen an die passende Stelle im Scrollweg.
  const go = (i) => {
    const el = root.current
    if (!el) return
    const k = (i + n) % n, r = el.getBoundingClientRect(), span = Math.max(1, r.height - window.innerHeight)
    window.scrollTo({ top: window.scrollY + r.top + span * ((k + 0.5) / n), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const it = items[a]
  return (
    <div className="aud3-pin" ref={root} style={{ '--n': n }}>
    <div className="aud3">
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
    </div>
  )
}
