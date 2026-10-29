import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Faq } from '../components/ui.jsx'
import ParallaxCards from '../components/ParallaxCards.jsx'
import ReportStack from '../components/ReportStack.jsx'
import StackScene from '../components/StackScene.jsx'
import { REPORT_FAQ } from '../content/data.js'
import { PROVIDED_PHOTOS } from '../content/providedPhotos.js'

const BLOCKS = [
  ['Marktwert', 'Einordnung des Werts anhand nachvollziehbarer Verfahren.', '/media/baustein-marktwert.webp'],
  ['Standort', 'Beschreibung von Lage, Umfeld und Entwicklung.', '/media/baustein-lage.webp'],
  ['Potenzial', 'Möglichkeiten als Prüffragen, nicht als Zusage.', '/media/baustein-potenzial.webp'],
  ['Wirtschaftlichkeit', 'Szenarien, die den Einfluss von Annahmen zeigen.', '/media/baustein-rentabilitaet.webp'],
  ['Prüfhinweise', 'Offene Punkte, die vor einer Entscheidung zu klären sind.', '/media/baustein-pruefhinweise.webp'],
  ['Nachfrage', 'Passende Suchprofile, ohne Käuferzahlen.', PROVIDED_PHOTOS.matching.src],
]
const FLOW = [
  { t: 'Anfrage', d: 'Sie schildern Ihr Anliegen.' },
  { t: 'Unterlagen prüfen', d: 'Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen.' },
  { t: 'Analyse', d: 'Bausteine werden erarbeitet.' },
  { t: 'Menschliche Freigabe', d: 'Jede Analyse wird persönlich geprüft.' },
  { t: 'Besprechung', d: 'Sie erhalten den Bericht und besprechen ihn.' },
]

const SCENE = [
  { label: 'Herkunft von Daten und Annahmen', icon: 'doc', photo: PROVIDED_PHOTOS.documents, title: 'Nachvollziehbar statt behauptet.', text: 'Im Bericht wird je Baustein ausgewiesen, welche Quelle, welcher Stand und welche Annahmen zugrunde liegen. Annahmen sind als solche gekennzeichnet.' },
  { label: 'Einordnung', icon: 'scale', img: '/media/p/home-analyse-hand.webp', title: 'Marktwerteinschätzung und Gutachten.', text: 'Eine Marktwerteinschätzung ist kein verbindliches Gutachten. Rechtliche Vorprüfungen sind keine rechtsverbindliche Entscheidung. Wirtschaftliche Szenarien sind keine Renditegarantie.' },
  { label: 'Ablauf', icon: 'route', photo: PROVIDED_PHOTOS.handover, title: 'Vom Anliegen zum Bericht.', steps: FLOW },
]

export default function ReportPage() {
  return (
    <>
      <Seo title="Objektreport | ARVENTAS" description="Immobilien verstehen, Entscheidungen fundieren: der Objektreport mit Marktwerteinschätzung, Standort, Potenzial und Prüfhinweisen." />
      <PageHero fadeOut blur image="/media/p/u-diagramme.webp" crumb="Objektreport" title="Immobilien verstehen. Entscheidungen fundieren." lead="Datenbasiert analysiert. Persönlich geprüft.">
        <div className="btn-row"><Btn href="#muster" variant="line">Muster ansehen</Btn><Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn></div>
      </PageHero>

      <section className="rp-over" aria-labelledby="h-bausteine">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Analysebausteine</p><h2 id="h-bausteine" className="h2 rv">Sechs Bausteine, ein Bild.</h2></header>
          <ParallaxCards inside items={BLOCKS.map(([title, text, img], i) => ({ title, text, img, ratio: i % 3 === 1 ? '3 / 4' : '4 / 5', speed: [1, 1.7, 0.8, 1.3, 0.9, 1.6][i] }))} />
        </div>
      </section>

      <section id="muster" className="sec dark" style={{ padding: 0 }} aria-labelledby="h-muster">
        <ReportStack eyebrow="Interaktive Musteransicht" title="So kann ein Objektreport aussehen." lead="Blättern Sie durch das Muster. Es ist rein illustrativ." hid="h-muster" />
      </section>

      <StackScene id="h-transparenz" title="Nachvollziehbar statt behauptet." items={SCENE} />

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Häufige Fragen" normal />
          <Faq items={REPORT_FAQ} />
          <div className="btn-row"><Btn to="/immobilie-verkaufen#anfrage" variant="marine">Objektreport anfragen</Btn></div>
        </div>
      </section>
      <CtaBand image="/media/p/ablauf-wohnhaus.webp" />
    </>
  )
}
