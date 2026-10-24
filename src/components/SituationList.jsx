import { useEffect, useRef, useState } from 'react'

// Links bleibt ein Foto stehen (wechselt mit dem Abschnitt in der Mitte), rechts steht die Überschrift fest und die Situationen laufen darunter durch.
// Große, helle Ziffern wie im Vorbild; auf schmalen Bildschirmen steht das Foto oben und die Liste folgt.
export default function SituationList({ items, eyebrow, title }) {
  const [a, setA] = useState(0)
  const root = useRef(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const rows = Array.from(root.current.querySelectorAll('.sl-item'))
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setA(Number(e.target.dataset.i)) }), { rootMargin: '-45% 0px -45% 0px' })
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])
  return (
    <div className="sl" ref={root}>
      <div className="sl-pic" aria-hidden="true">
        {items.map((it, i) => <img key={it.id} src={it.img} alt="" loading="lazy" decoding="async" className={i === a ? 'on' : ''} />)}
      </div>
      <div className="sl-main">
        <header className="sl-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
        </header>
        <ol className="sl-list">
          {items.map((it, i) => (
            <li key={it.id} className={'sl-item' + (i === a ? ' on' : '')} data-i={i}>
              <span className="sl-no" aria-hidden="true">{i + 1}</span>
              <div>
                <small>{it.label}</small>
                <h3>{it.t}</h3>
                <p>{it.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
