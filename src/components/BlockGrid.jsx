import { useEffect, useRef } from 'react'

// Bausteinkarten: Foto wird beim Scrollen von links nach rechts aufgezogen.
export default function BlockGrid({ items }) {
  const root = useRef(null)
  useEffect(() => {
    const cards = Array.from(root.current.querySelectorAll('.bl-card'))
    if (!('IntersectionObserver' in window)) { cards.forEach((c) => c.classList.add('in')); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.25 })
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])
  return (
    <div className="bl-grid" ref={root}>
      {items.map(([t, d, img], i) => (
        <article key={t} className="bl-card" style={{ '--i': i % 3 }}>
          <div className="bl-img"><img src={img} alt="" loading="lazy" /></div>
          <h3 className="h3">{t}</h3>
          <p>{d}</p>
        </article>
      ))}
    </div>
  )
}
