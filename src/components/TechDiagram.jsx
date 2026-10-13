import { useRef } from 'react'
import { useGsap } from './useMotion.js'
import { techSystems } from '../content/sections.js'

/* Systems named in the brief. Grouping into layers is a structural proposal to be
   confirmed against the strategy document (sources → automation/data → intelligence → measurement). */
const layers = [
  { cls: 'tech__row--3', label: 'Datenquellen', ids: ['onoffice', 'deepimmo', 'pricehubble'] },
  { cls: 'tech__row--3b', label: 'Automation & Daten', ids: ['n8n', 'supabase'] },
  { cls: 'tech__row--3b', label: 'Intelligenz & Messung', ids: ['llm', 'ga4'] },
]

export default function TechDiagram() {
  const ref = useRef(null)
  useGsap(ref, (gsap) => {
    gsap.from(gsap.utils.toArray('.tech__node', ref.current), {
      opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
  }, [])
  const byId = Object.fromEntries(techSystems.map((s) => [s.id, s]))
  return (
    <div ref={ref} className="tech" role="group" aria-label="Systemarchitektur">
      {layers.map((l, li) => (
        <div key={l.label} style={{ display: 'contents' }}>
          {li > 0 && <div className="tech__link" aria-hidden="true"><i /></div>}
          <div className={`tech__row ${l.cls}`}>
            {l.ids.map((id) => (
              <div className="tech__node" key={id}>
                <small>{l.label}</small>
                <strong>{byId[id].name}</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
