import { useRef } from 'react'
import { useGsap, revealAll } from './useMotion.js'
import ArchPlate from './ArchPlate.jsx'
import Blocks from './Blocks.jsx'
import Engine from './Engine.jsx'
import TechDiagram from './TechDiagram.jsx'

const theme = { thesis: 'charcoal', table: 'ivory', funnel: 'charcoal', roadmap: 'charcoal', launch: 'ivory', compare: 'ivory' }
const rulers = { launch: ['Tag 0', 'Tag 100'], roadmap: ['Monat 1', 'Monat 12'] }
const bands = { 2: 'mixed', 5: 'multi', 9: 'altbau', 12: 'detail', 14: 'mixed' }

function Head({ s, plate }) {
  const n = String(s.n).padStart(2, '0')
  return (
    <header className={`section__head ${plate ? 'section__head--plate' : ''}`}>
      <div className="section__headtext">
        <div className="section__num rv" aria-hidden="true">{n}</div>
        <p className="eyebrow rv">Abschnitt {n} / 16</p>
        <h2 className="section__title section__title--wide rv">{s.title}</h2>
        {s.subtitle && <p className="section__sub rv">{s.subtitle}</p>}
      </div>
      {plate && <div className="section__plate"><ArchPlate variant={s.visual} alt="Architekturdetail" /></div>}
    </header>
  )
}

export default function Section({ s }) {
  const ref = useRef(null)
  useGsap(ref, (gsap) => revealAll(gsap, ref.current), [])
  const t = theme[s.layout]
  const plate = s.layout === 'split' || s.layout === 'thesis'

  let body
  if (s.layout === 'tech') {
    const table = s.body.find((b) => b.type === 'table')
    const before = s.body.slice(0, s.body.indexOf(table))
    const after = s.body.slice(s.body.indexOf(table) + 1)
    body = (<><Blocks blocks={before} /><TechDiagram table={table} /><Blocks blocks={after} /></>)
  } else {
    body = (
      <>
        {s.layout === 'engine' && <Engine />}
        <Blocks blocks={s.body} ruler={rulers[s.layout]} />
      </>
    )
  }

  return (
    <>
      <section ref={ref} id={s.id} className={`section section--${s.layout} ${t ? `section--${t}` : ''}`}>
        <Head s={s} plate={plate} />
        {body}
      </section>
      {bands[s.n] && (
        <div className="band" aria-hidden="true"><ArchPlate variant={bands[s.n]} wide /></div>
      )}
    </>
  )
}
