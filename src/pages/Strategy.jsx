import Nav from '../components/Nav.jsx'
import Cover from '../components/Cover.jsx'
import Section from '../components/Section.jsx'
import { sections, meta } from '../content/sections.js'

export default function Strategy() {
  return (
    <>
      <Nav />
      <main>
        <Cover />
        {sections.map((s) => <Section key={s.id} s={s} />)}
      </main>
      <footer className="footer">
        <span>{meta.brand} — {meta.descriptor}</span>
        <span>{meta.facts[2][1]} · {meta.facts[3][1]}</span>
      </footer>
    </>
  )
}
