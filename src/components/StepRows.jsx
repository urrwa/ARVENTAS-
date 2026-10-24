import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Große Schrittzeilen: Foto blendet beim Hover/Fokus ein, auf Touch-Geräten bei Annäherung zur Bildschirmmitte.
export default function StepRows({ items }) {
  const root = useRef(null)
  useEffect(() => {
    const rows = Array.from(root.current.querySelectorAll('.step-row'))
    if (!('IntersectionObserver' in window) || window.matchMedia('(hover: hover)').matches) return
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '-40% 0px -40% 0px' })
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])
  return (
    <div className="step-rows" ref={root}>
      {items.map((s, i) => (
        <Link key={s.title} to={s.to} className="step-row">
          <img src={s.img} alt="" loading="eager" decoding="async" />
          <span className="sr-no">{i + 1}</span>
          <span className="sr-text">{s.text}</span>
          <span className="sr-title">{s.title}</span>
          <span className="sr-arr" aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  )
}
