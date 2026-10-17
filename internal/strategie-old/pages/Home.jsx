import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ScrollFilm from '../components/ScrollFilm.jsx'
import Engine from '../components/Engine.jsx'
import { useGsap, revealAll } from '../components/useMotion.js'
import { meta } from '../content/sections.js'
import doc from '../content/doc.json'

// All copy below is taken from the supplied German strategy document (doc.json).
const thesis = doc.sections.s01.blocks.find((b) => b.type === 'callout')
const pillars = doc.sections.s05.blocks.find((b) => b.type === 'table' && b.head[0] === 'Säule')

export default function Home() {
  const page = useRef(null)
  useGsap(page, (gsap) => revealAll(gsap, page.current), [])
  return (
    <div ref={page}>
      <header className="nav">
        <Link to="/" className="nav__brand" aria-label="ARVENTAS Startseite">ARVENTAS</Link>
      </header>
      <main>
        <ScrollFilm />

        <section className="section home__manifesto" aria-labelledby="manifesto">
          <p className="eyebrow rv">{thesis.label}</p>
          <h2 id="manifesto" className="home__thesis rv">{thesis.text}</h2>
        </section>

        <section className="section section--charcoal" aria-label="Die drei Beweissäulen">
          <p className="eyebrow rv">Die drei Beweissäulen</p>
          <div className="pillars">
            {pillars.rows.map(([name, means], i) => (
              <article className="pillar rv" key={name}>
                <span className="pillar__n">0{i + 1}</span>
                <h3>{name}</h3>
                <p>{means}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="Die Engine">
          <p className="eyebrow rv">Die Engine</p>
          <h2 className="section__title section__title--wide rv">{doc.sections.s04.subtitle}</h2>
          <Engine />
        </section>

        <section className="section section--final" aria-label="Strategie">
          <p className="final__text rv">{meta.title}</p>
          <Link className="link-arrow" to="/strategie">Zur Strategie →</Link>
        </section>
      </main>
      <footer className="footer">
        <span>{meta.brand} — {meta.descriptor}</span>
      </footer>
    </div>
  )
}
