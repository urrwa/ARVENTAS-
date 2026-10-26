import { useState } from 'react'
import WordZoom from '../components/WordZoom.jsx'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn, SectionHead, Faq, Tabs } from '../components/ui.jsx'
import PanelSlider from '../components/PanelSlider.jsx'
import { INVESTOR_FAQ } from '../content/data.js'

const STEPS = [
  { eb: 'Schritt 1', t: 'Suchprofil und Auswahl', d: 'Region, Immobilientyp und Budgetband bilden Ihr Suchprofil. Daraus entsteht eine gezielte Auswahl.', img: '/media/p/h-suchprofil.webp' },
  { eb: 'Schritt 2', t: 'Objektanalyse', d: 'Wert, Potenzial und Risiken werden nachvollziehbar eingeordnet, mit Quellen und Annahmen.', img: '/media/p/h-bewertung.webp' },
  { eb: 'Schritt 3', t: 'Persönliche Begleitung', d: 'Ein fester Ansprechpartner begleitet Sie von der Prüfung bis zur Entscheidung.', img: '/media/p/h-p-investor.webp' },
]
const MATRIX = [
  { id: 'lage', label: 'Lage', q: ['Wie ist die Mikrolage einzuordnen?', 'Welche Entwicklung ist im Umfeld bekannt?', 'Wie gut sind Anbindung und Versorgung?'] },
  { id: 'miete', label: 'Miete', q: ['Wie ist die Mietstruktur aufgebaut?', 'Welche Vertragslaufzeiten bestehen?', 'Wie ist das Mietniveau im Vergleich zum Umfeld einzuordnen?'] },
  { id: 'kosten', label: 'Kosten', q: ['Welche Bewirtschaftungskosten sind angesetzt?', 'Wie ist der Instandhaltungsstand?', 'Welche Investitionen sind absehbar?'] },
  { id: 'fin', label: 'Finanzierung', q: ['Welche Finanzierungsstruktur ist vorgesehen?', 'Wie wirken sich Zinsänderungen aus?', 'Welche Eigenkapitalanforderungen sind zu klären?'] },
  { id: 'risiko', label: 'Risiken', q: ['Welche rechtlichen Risiken sind zu prüfen?', 'Welche Marktrisiken bestehen?', 'Welche Annahmen sind besonders sensibel?'] },
]

export default function InvestorsPage() {
  return (
    <>
      <Seo title="Kapitalanlage-Immobilien | ARVENTAS" description="Ausgewählte Off-Market-Immobilien für Investoren: Suchprofil, Objektanalyse, Chancen und Risiken – persönlich begleitet, deutschlandweit." />
      <h1 className="sr-only">Investieren beginnt mit dem richtigen Zugang.</h1>

      <WordZoom left="Off-Market" right="verständlich erklärt." images={['/media/p/zugang-investor.webp', '/media/p/h-zugang.webp', '/media/p/ablauf-fassade.webp', '/media/p/h-p-objekt.webp']} />
      <section className="sec dark wz-after">
        <div className="wrap">
          <p className="eyebrow">Off-Market</p>
          <p className="rv">Off-Market-Immobilien werden nicht über öffentliche Portale angeboten. Sie werden gezielt an passende Interessenten vermittelt. Das bedeutet nicht, dass sie automatisch besser sind. Entscheidend bleibt eine sorgfältige Prüfung.</p>
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="Vorgehen" title="Suchprofil, Analyse und Begleitung." normal />
        </div>
      </section>
      <PanelSlider label="Vorgehen" items={STEPS} />
      <section className="sec dark" style={{ padding: 0 }}>
        <div className="wrap">
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Prüfmatrix" title="Chancen und Risiken prüfen." lead="Fünf Bereiche, die vor jeder Entscheidung betrachtet werden sollten. Die Matrix zeigt Prüffragen, keine Empfehlungen." />
          <div className="rv on-ivory" style={{ color: 'var(--ink)' }}>
            <Tabs label="Prüfmatrix" items={MATRIX} className="matrix" listClass="matrix-l" panelClass="matrix-r" vertical
              renderPanel={(m) => (<><h3 className="h3" style={{ marginBottom: 14 }}>{m.label}</h3><ul>{m.q.map((x) => <li key={x}>{x}</li>)}</ul><p className="small" style={{ marginTop: 18, color: 'var(--ink-soft)' }}>Keine automatischen Kaufempfehlungen oder Renditegarantien.</p></>)} />
          </div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap two">
          <div><SectionHead eyebrow="Investorenkreis" title="Ausgewählte Immobilien. Auf Ihre Ziele abgestimmt." normal />
            <p className="rv">Im Investorenkreis hinterlegen Sie Ihr Suchprofil. Die Informationsseiten können Sie ohne Registrierung lesen.</p>
            <div className="btn-row"><Btn to="/investorenkreis" variant="marine">Suchprofil erstellen</Btn></div></div>
          <div><SectionHead eyebrow="FAQ" title="Häufige Fragen" normal /><Faq items={INVESTOR_FAQ} /></div>
        </div>
      </section>
      <CtaBand image="/media/p/u-buero-daemmerung.webp" />
    </>
  )
}
