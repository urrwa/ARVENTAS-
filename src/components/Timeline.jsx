import { useRef } from 'react'
import { useGsap } from './useMotion.js'

/* Generic phase timeline. `phases`: [{ tag, name, fields: [[label, value]] }].
   Empty values render as an em dash so the structure is visible but nothing is invented. */
export default function Timeline({ phases, ruler }) {
  const ref = useRef(null)
  useGsap(ref, (gsap) => {
    gsap.from(gsap.utils.toArray('.tl__item', ref.current), {
      opacity: 0, y: 24, stagger: 0.18, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
    const fill = ref.current.querySelector('.ruler__fill')
    if (fill) gsap.to(fill, { scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true } })
  }, [])
  return (
    <div ref={ref}>
      {ruler && (
        <>
          <div className="ruler">{ruler.map((r) => <span key={r}>{r}</span>)}</div>
          <div className="ruler__bar"><div className="ruler__fill" /></div>
        </>
      )}
      <ol className="timeline timeline--row" style={{ '--cols': phases.length, listStyle: 'none', padding: 0 }}>
        {phases.map((p, i) => (
          <li className="tl__item" key={i}>
            <div className="tl__tag">{p.tag}</div>
            <div className="tl__name">{p.name || '—'}</div>
            {(p.fields || []).map(([l, v]) => (
              <div className="tl__field" key={l}><b>{l}</b>{v || '—'}</div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  )
}
