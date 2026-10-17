import { useRef } from 'react'
import { useGsap } from './useMotion.js'
import ArchPlate from './ArchPlate.jsx'
import { meta } from '../content/sections.js'

/* Document cover for the strategy page (exact supplied text).
   NOTE: the site's cinematic homepage hero is designed separately. */
export default function Cover() {
  const ref = useRef(null)
  useGsap(ref, (gsap) => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.cover__brand', { opacity: 0, letterSpacing: '1.2em', duration: 1.6 })
      .from('.cover__title .line > span', { yPercent: 110, duration: 1.2, stagger: 0.12 }, '-=1')
      .from('.cover__lede, .eyebrow.cover__desc', { opacity: 0, y: 24, duration: 1, stagger: 0.1 }, '-=0.6')
      .from('.cover__facts > div', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, '-=0.6')
  }, [])
  const [a, b] = ['Go-to-Market-', '& Wachstumsstrategie']
  return (
    <section ref={ref} className="cover" aria-labelledby="doc-title">
      <div className="cover__plate" aria-hidden="true"><ArchPlate variant="multi" /></div>
      <div className="cover__body">
        <p className="cover__brand">{meta.brand}</p>
        <p className="eyebrow cover__desc" style={{ marginTop: 20 }}>{meta.descriptor}</p>
        <h1 id="doc-title" className="display cover__title">
          <span className="line" style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block' }}>{a}</span></span>
          <span className="line" style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block' }}>{b}</span></span>
        </h1>
        <p className="cover__lede">{meta.lede}</p>
      </div>
      <dl className="cover__facts">
        {meta.facts.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
    </section>
  )
}
