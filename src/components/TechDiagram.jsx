import { useRef } from 'react'
import { useGsap } from './useMotion.js'

/* Systems architecture from the document's table (Ebene / System / Rolle).
   Layout: backbone on top, sources, orchestration, storage + generation, measurement. */
const rows = [
  ['onOffice'],
  ['DeepImmo', 'PriceHubble'],
  ['n8n'],
  ['Supabase', 'LLM-Ebene'],
  ['GA4 + serverseitiges Tracking'],
]

export default function TechDiagram({ table }) {
  const ref = useRef(null)
  useGsap(ref, (gsap) => {
    gsap.from(gsap.utils.toArray('.tech__node', ref.current), {
      opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
    gsap.from(gsap.utils.toArray('.tech__link i', ref.current), {
      scaleY: 0, transformOrigin: 'top', stagger: 0.15, duration: 0.5,
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
  }, [])
  const by = Object.fromEntries(table.rows.map(([ebene, sys, rolle]) => [sys, { ebene, rolle }]))
  return (
    <div ref={ref} className="tech" role="group" aria-label="Systemarchitektur">
      {rows.map((r, i) => (
        <div key={i} className="tech__layer">
          {i > 0 && <div className="tech__link" aria-hidden="true"><i /></div>}
          <div className="tech__row" style={{ '--n': r.length }}>
            {r.map((name) => (
              <div className="tech__node" key={name}>
                <small>{by[name]?.ebene}</small>
                <strong>{name}</strong>
                <p>{by[name]?.rolle}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
