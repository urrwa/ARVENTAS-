import { useRef } from 'react'
import { useGsap } from './useMotion.js'

/* Phase timeline. phases: [{ name, weeks, items: [], gate }] — all text from the document. */
export default function Timeline({ phases, ruler }) {
  const ref = useRef(null)
  useGsap(ref, (gsap) => {
    gsap.from(gsap.utils.toArray('.tl__item', ref.current), {
      opacity: 0, y: 24, stagger: 0.18, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
    const fill = ref.current.querySelector('.ruler__fill')
    if (fill) gsap.to(fill, { scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 70%', scrub: true } })
  }, [])
  return (
    <div ref={ref} className="tlwrap">
      {ruler && (
        <>
          <div className="ruler" aria-hidden="true">{ruler.map((r) => <span key={r}>{r}</span>)}</div>
          <div className="ruler__bar" aria-hidden="true"><div className="ruler__fill" /></div>
        </>
      )}
      <ol className="timeline timeline--row" style={{ '--cols': phases.length }}>
        {phases.map((p, i) => (
          <li className="tl__item" key={i}>
            <div className="tl__tag">{p.weeks}</div>
            <div className="tl__name">{p.name}</div>
            <ul className="tl__list">{p.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
            {p.gate && <div className="tl__gate">{p.gate}</div>}
          </li>
        ))}
      </ol>
    </div>
  )
}
