import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Faq } from '../components/ui.jsx'
import ParallaxCards from '../components/ParallaxCards.jsx'
import ReportViewer from '../components/ReportViewer.jsx'
import { SimpleTimeline } from '../components/ProcessTimeline.jsx'
import { REPORT_FAQ } from '../content/data.js'

const BLOCKS = [
  ['Marktwert', 'Einordnung des Werts anhand nachvollziehbarer Verfahren.', '/media/baustein-marktwert.webp'],
  ['Standort', 'Beschreibung von Lage, Umfeld und Entwicklung.', '/media/baustein-lage.webp'],
  ['Potenzial', 'Möglichkeiten als Prüffragen, nicht als Zusage.', '/media/baustein-potenzial.webp'],
  ['Wirtschaftlichkeit', 'Szenarien, die den Einfluss von Annahmen zeigen.', '/media/baustein-rentabilitaet.webp'],
  ['Prüfhinweise', 'Offene Punkte, die vor einer Entscheidung zu klären sind.', '/media/baustein-pruefhinweise.webp'],
  ['Nachfrage', 'Passende Suchprofile, ohne Käuferzahlen.', '/media/baustein-nachfrage.webp'],
]
const FLOW = [
  { t: 'Anfrage', d: 'Sie schildern Ihr Anliegen.' },
  { t: 'Unterlagen prüfen', d: 'Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen.' },
  { t: 'Analyse', d: 'Bausteine werden erarbeitet.' },
  { t: 'Menschliche Freigabe', d: 'Jede Analyse wird persönlich geprüft.' },
  { t: 'Besprechung', d: 'Sie erhalten den Bericht und besprechen ihn.' },
]

export default function ReportPage() {
  return (
    <>
      <Seo title="Objektreport | ARVENTAS" description="Immobilien verstehen, Entscheidungen fundieren: der Objektreport mit Marktwerteinschätzung, Standort, Potenzial und Prüfhinweisen." />
      <PageHero fadeOut blur image="/media/p/u-diagramme.webp" crumb="Objektreport" title="Immobilien verstehen. Entscheidungen fundieren." lead="Datenbasiert analysiert. Persönlich geprüft.">
        <div className="btn-row"><Btn href="#muster" variant="line">Muster ansehen</Btn><Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn></div>
      </PageHero>

      <section className="sec dark over-photo pc-sec">
        <div className="wrap">
          <SectionHead eyebrow="Analysebausteine" title="Sechs Bausteine, ein Bild." normal />
          <ParallaxCards inside items={BLOCKS.map(([title, text, img], i) => ({ title, text, img, ratio: i % 3 === 1 ? '3 / 4' : '4 / 5', speed: [1, 1.7, 0.8, 1.3, 0.9, 1.6][i] }))} />
        </div>
      </section>

      <section className="sec dark" id="muster">
        <div className="wrap">
          <SectionHead eyebrow="Interaktive Musteransicht" title="So kann ein Objektreport aussehen." lead="Wählen Sie eine Analyseebene. Das Muster ist rein illustrativ." />
          <div className="rv"><ReportViewer id="muster-page" /></div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap two">
          <div><SectionHead eyebrow="Herkunft von Daten und Annahmen" title="Nachvollziehbar statt behauptet." normal />
            <p className="rv">Im Bericht wird je Baustein ausgewiesen, welche Quelle, welcher Stand und welche Annahmen zugrunde liegen. Annahmen sind als solche gekennzeichnet.</p></div>
          <div><SectionHead eyebrow="Einordnung" title="Marktwerteinschätzung und Gutachten." normal />
            <p className="rv">Eine Marktwerteinschätzung ist kein verbindliches Gutachten. Rechtliche Vorprüfungen sind keine rechtsverbindliche Entscheidung. Wirtschaftliche Szenarien sind keine Renditegarantie.</p></div>
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="Ablauf" title="Vom Anliegen zum Bericht." normal />
          <SimpleTimeline steps={FLOW} />
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Häufige Fragen" normal />
          <Faq items={REPORT_FAQ} />
          <div className="btn-row"><Btn to="/immobilie-verkaufen#anfrage" variant="marine">Objektreport anfragen</Btn></div>
        </div>
      </section>
      <CtaBand image="/media/p/u-buero-sonnenuntergang.webp" />
    </>
  )
}
