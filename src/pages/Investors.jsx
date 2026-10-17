import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Faq, Tabs } from '../components/ui.jsx'
import { INVESTOR_FAQ } from '../content/data.js'

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
      <PageHero image="/media/stadt-luftbild.jpg" crumb="Für Investoren" title="Investieren beginnt mit dem richtigen Zugang." lead="Passende Immobilien finden und Entscheidungen auf Grundlage nachvollziehbarer Informationen treffen.">
        <div className="btn-row"><Btn to="/investorenkreis">Suchprofil erstellen</Btn></div>
      </PageHero>

      <section className="sec ivory">
        <div className="wrap two">
          <div><SectionHead eyebrow="Off-Market" title="Off-Market verständlich erklärt." normal />
            <p className="rv">Off-Market-Immobilien werden nicht über öffentliche Portale angeboten. Sie werden gezielt an passende Interessenten vermittelt. Das bedeutet nicht, dass sie automatisch besser sind. Entscheidend bleibt eine sorgfältige Prüfung.</p></div>
          <div className="imgf rv" style={{ aspectRatio: '4/3' }}><img src="/media/haus-abend.jpg" alt="Wohnhaus im Abendlicht (Beispielbild)" loading="lazy" /></div>
        </div>
      </section>

      <section className="sec ivory" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="Vorgehen" title="Suchprofil, Analyse und Begleitung." normal />
          <div className="cols3 rv">
            <div><h3 className="h3">Suchprofil und Auswahl</h3><p>Region, Immobilientyp und Budgetband bilden Ihr Suchprofil. Daraus entsteht eine gezielte Auswahl.</p></div>
            <div><h3 className="h3">Objektanalyse</h3><p>Wert, Potenzial und Risiken werden nachvollziehbar eingeordnet, mit Quellen und Annahmen.</p></div>
            <div><h3 className="h3">Persönliche Begleitung</h3><p>Ein fester Ansprechpartner begleitet Sie von der Prüfung bis zur Entscheidung.</p></div>
          </div>
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

      <section className="sec ivory">
        <div className="wrap two">
          <div><SectionHead eyebrow="Investorenkreis" title="Ausgewählte Immobilien. Auf Ihre Ziele abgestimmt." normal />
            <p className="rv">Im Investorenkreis hinterlegen Sie Ihr Suchprofil. Die Informationsseiten können Sie ohne Registrierung lesen.</p>
            <div className="btn-row"><Btn to="/investorenkreis" variant="marine">Suchprofil erstellen</Btn></div></div>
          <div><SectionHead eyebrow="FAQ" title="Häufige Fragen" normal /><Faq items={INVESTOR_FAQ} /></div>
        </div>
      </section>
    </>
  )
}
