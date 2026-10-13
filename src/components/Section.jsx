import { useRef } from 'react'
import { useGsap, revealAll } from './useMotion.js'
import ArchPlate from './ArchPlate.jsx'
import Blocks, { Pending } from './Blocks.jsx'
import DataTable from './DataTable.jsx'
import Engine from './Engine.jsx'
import Timeline from './Timeline.jsx'
import TechDiagram from './TechDiagram.jsx'
import Kpis from './Kpis.jsx'

const theme = { thesis: 'charcoal', compare: 'ivory', table: 'ivory', funnel: 'charcoal', roadmap: 'charcoal', launch: 'ivory' }

function Head({ s, wide }) {
  const n = String(s.n).padStart(2, '0')
  return (
    <header className="section__head">
      <div className="section__num rv" aria-hidden="true">{n}</div>
      <p className="eyebrow rv">Abschnitt {n} / 16</p>
      <h2 className={`section__title rv ${wide ? 'section__title--wide' : ''}`}>{s.title}</h2>
    </header>
  )
}

function Body({ s }) {
  return s.body.length ? <Blocks blocks={s.body} /> : <Pending />
}

// Structural scaffolds — headings/labels only, values remain empty until the document supplies them.
const launchPhases = [1, 2, 3].map((i) => ({
  tag: `Phase ${i}`, name: '', fields: [['Meilensteine', ''], ['Exit-Kriterien', '']],
}))
const roadmapPhases = [1, 2, 3, 4].map((i) => ({
  tag: `Phase ${i}`, name: '', fields: [['Zeitraum', ''], ['Ziele', '']],
}))
const funnelHead = ['Funnel-Stufe', 'Kennzahl', 'Ziel']

export default function Section({ s }) {
  const ref = useRef(null)
  useGsap(ref, (gsap) => revealAll(gsap, ref.current), [])
  const t = theme[s.layout] || ''
  const cls = `section ${t ? `section--${t}` : ''}`

  let inner
  switch (s.layout) {
    case 'thesis':
      inner = (
        <>
          <Head s={s} wide />
          <div className="editorial"><div className="editorial__body"><Body s={s} /></div></div>
          <div style={{ marginTop: 80 }}><ArchPlate variant={s.visual} wide alt="Historische Fassade" /></div>
        </>
      )
      break
    case 'compare':
      inner = (
        <>
          <Head s={s} wide />
          <Body s={s} />
          <DataTable head={s.table.head.map((h, i) => h || (i === 0 ? 'Kriterium' : h))} rows={s.table.rows} emptyRows={3} />
        </>
      )
      break
    case 'engine':
      inner = (<><Head s={s} wide /><Engine /><div style={{ marginTop: 56 }}><Body s={s} /></div></>)
      break
    case 'launch':
      inner = (
        <>
          <Head s={s} />
          <Body s={s} />
          <Timeline phases={launchPhases} ruler={['Tag 0', 'Tag 100']} />
        </>
      )
      break
    case 'funnel':
      inner = (<><Head s={s} wide /><Body s={s} /><DataTable head={funnelHead} emptyRows={4} /></>)
      break
    case 'tech':
      inner = (<><Head s={s} wide /><Body s={s} /><TechDiagram /></>)
      break
    case 'roadmap':
      inner = (<><Head s={s} wide /><Body s={s} /><Timeline phases={roadmapPhases} ruler={['Monat 1', 'Monat 12']} /></>)
      break
    case 'table':
      inner = (<><Head s={s} wide /><Body s={s} /></>)
      break
    case 'closing':
      inner = (
        <div className="closing">
          <Head s={s} wide />
          <Body s={s} />
          <a className="closing__cta" href="#these">Zurück zur These ↑</a>
        </div>
      )
      break
    case 'editorial':
      inner = (<><Head s={s} wide /><div className="editorial"><div className="editorial__body"><Body s={s} /></div></div></>)
      break
    default:
      inner = (
        <>
          <Head s={s} />
          <div className={`split ${s.flip ? 'split--flip' : ''}`}>
            <div className="split__text"><Body s={s} /></div>
            <div className="split__media"><ArchPlate variant={s.visual} alt="Architekturdetail" /></div>
          </div>
        </>
      )
  }
  return (
    <>
      <section ref={ref} id={s.id} className={cls} >{inner}</section>
      {[2, 5, 9, 12, 14].includes(s.n) && (
        <div className="band" aria-hidden="true"><ArchPlate variant={['mixed', 'multi', 'altbau', 'detail', 'mixed'][[2, 5, 9, 12, 14].indexOf(s.n)]} wide className="plate--band" /></div>
      )}
    </>
  )
}
