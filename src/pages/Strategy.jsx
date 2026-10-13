import Nav from '../components/Nav.jsx'
import Cover from '../components/Cover.jsx'
import Section from '../components/Section.jsx'
import Kpis from '../components/Kpis.jsx'
import Toc from '../components/Toc.jsx'
import { sections, meta, kpis, finalRec, disclaimer } from '../content/sections.js'

export default function Strategy() {
  return (
    <>
      <Nav />
      <main>
        <Cover />
        <section className="section section--intro" aria-label="Kennzahlen und Inhalt">
          <Kpis items={kpis} />
          <Toc />
        </section>
        {sections.map((s) => <Section key={s.id} s={s} />)}
        {finalRec && (
          <section className="section section--final" aria-label={finalRec.label}>
            <p className="eyebrow rv">{finalRec.label}</p>
            <p className="final__text rv">{finalRec.text}</p>
          </section>
        )}
      </main>
      <footer className="footer">
        <span>{meta.brand} — {meta.descriptor}</span>
        <p className="footer__note">{disclaimer}</p>
      </footer>
    </>
  )
}
