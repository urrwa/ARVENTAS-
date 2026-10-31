import { useState } from 'react'
import WordZoom from '../components/WordZoom.jsx'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn, SectionHead, Faq } from '../components/ui.jsx'
import ScrollTrack from '../components/ScrollTrack.jsx'
import ScrollList from '../components/ScrollList.jsx'
import { INVESTOR_FAQ } from '../content/data.js'

const STEPS = [
  { eb: 'Schritt 1', t: 'Suchprofil und Auswahl', d: 'Region, Immobilientyp und Budgetband bilden Ihr Suchprofil. Daraus entsteht eine gezielte Auswahl.', img: '/media/p/h-suchprofil.webp' },
  { eb: 'Schritt 2', t: 'Objektanalyse', d: 'Wert, Potenzial und Risiken werden nachvollziehbar eingeordnet, mit Quellen und Annahmen.', img: '/media/p/owner-analyse-karte.webp' },
  { eb: 'Schritt 3', t: 'Persönliche Begleitung', d: 'Ein fester Ansprechpartner begleitet Sie von der Prüfung bis zur Entscheidung.', img: '/media/p/investor-begleitung.webp' },
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

      <WordZoom left="Off-Market" right="verständlich erklärt." images={['wohnviertel', 'fassaden', 'wohnstrasse'].map((name) => ({ thumbnail: `/media/investors/off-market-${name}.webp`, src: `/media/investors/off-market-${name}-hd.webp` }))} />
      <section className="sec dark wz-after">
        <div className="wrap">
          <p className="eyebrow">Off-Market</p>
          <p className="rv">Off-Market-Immobilien werden nicht über öffentliche Portale angeboten. Sie werden gezielt an passende Interessenten vermittelt. Das bedeutet nicht, dass sie automatisch besser sind. Entscheidend bleibt eine sorgfältige Prüfung.</p>
        </div>
      </section>

      <ScrollList id="h-vorgehen" eyebrow="Vorgehen" title="Suchprofil, Analyse und Begleitung." items={STEPS} />
      <ScrollTrack id="h-matrix" eyebrow="Prüfmatrix" title="Chancen und Risiken prüfen." lead="Fünf Bereiche, die vor jeder Entscheidung betrachtet werden sollten. Die Matrix zeigt Prüffragen, keine Empfehlungen."
        items={MATRIX.map((m) => ({ t: m.label, list: m.q, note: 'Keine automatischen Kaufempfehlungen oder Renditezusagen.' }))} />

      <section className="sec dark">
        <div className="wrap two">
          <div><SectionHead eyebrow="Investorenkreis" title="Ausgewählte Immobilien. Auf Ihre Ziele abgestimmt." normal />
            <p className="rv">Im Investorenkreis hinterlegen Sie Ihr Suchprofil. Die Informationsseiten können Sie ohne Registrierung lesen.</p>
            <div className="btn-row"><Btn to="/investorenkreis" variant="marine">Suchprofil erstellen</Btn></div></div>
          <div><SectionHead eyebrow="FAQ" title="Häufige Fragen" normal /><Faq items={INVESTOR_FAQ} /></div>
        </div>
      </section>
      <CtaBand image="/media/p/mfh-balkone.webp" />
    </>
  )
}
