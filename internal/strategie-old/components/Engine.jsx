import { useRef } from 'react'
import { useGsap } from './useMotion.js'
import { engineStages } from '../content/sections.js'

export default function Engine() {
  const ref = useRef(null)
  useGsap(ref, (gsap) => {
    const stages = gsap.utils.toArray('.engine__stage', ref.current)
    const line = ref.current.querySelector('.engine__line')
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    tl.to(line, { scaleX: 1, duration: 2.2, ease: 'power2.inOut' })
    stages.forEach((s, i) => tl.add(() => s.classList.add('is-on'), (i / stages.length) * 2.2))
    tl.from(stages, { opacity: 0, y: 16, stagger: 0.25, duration: 0.6 }, 0)
  }, [])
  return (
    <div ref={ref} className="engine" role="list" aria-label="Die sechs Stufen der Engine">
      <div className="engine__line" aria-hidden="true" />
      {engineStages.map((s, i) => (
        <div key={s} className="engine__stage" role="listitem">
          <div className="engine__idx">0{i + 1}</div>
          <div className="engine__name">{s}</div>
        </div>
      ))}
      <div className="engine__loop" aria-hidden="true">Lernen → Sourcing</div>
    </div>
  )
}
