import Seo from '../components/Seo.jsx'
import HomeFilm from '../components/HomeFilm.jsx'
import HoverList from '../components/HoverList.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn } from '../components/ui.jsx'
import JourneySplit from '../components/JourneySplit.jsx'
import ProcessStack from '../components/ProcessStack.jsx'
import AudienceCards from '../components/AudienceCards.jsx'
import CardTrack from '../components/CardTrack.jsx'
import Letters from '../components/Letters.jsx'
import ScrollWords from '../components/ScrollWords.jsx'
import { Sec, IconGrid, StepsRow, Chain, Split, GoldLine } from '../components/blocks.jsx'
import { AUDIENCES, CHAIN_CARDS, SERVICE_LIST, CLAIM } from '../content/site.js'

const PILLARS = [
  { icon: 'target', t: 'Strategisch', d: 'Wir denken über die Immobilie hinaus und fokussieren uns auf langfristiges Potenzial.' },
  { icon: 'chart', t: 'Datenbasiert', d: 'Entscheidungen basieren auf Marktinformationen, Bewertungslogik und strukturierter Analyse.' },
  { icon: 'network', t: 'Vernetzt', d: 'Analyse, Strategie und Vermarktung greifen ineinander und bilden ein System.' },
  { icon: 'diamond', t: 'Werteorientiert', d: 'Unser Fokus liegt auf Potenzialen, die nachhaltige Werte schaffen – für Menschen und Projekte.' },
]
const JOURNEY = [
  { icon: 'search', t: 'Den Markt verstehen', d: 'Wir analysieren Standorte, Nachfrage, Preisbewegungen und Marktdynamiken.' },
  { icon: 'building', t: 'Die Immobilie bewerten', d: 'Wir bewerten die Immobilie, ihren Wert, ihre Risiken und Entwicklungspotenziale.' },
  { icon: 'target', t: 'Die Chance erkennen', d: 'Wir unterscheiden relevantes Potenzial von Rauschen und definieren den Werttreiber.' },
  { icon: 'route', t: 'Die Strategie entwickeln', d: 'Wir entwickeln den richtigen Ansatz für Positionierung, Vermarktung und Entwicklung.' },
  { icon: 'send', t: 'Strukturiert vorgehen', d: 'Wir begleiten die nächsten Schritte mit Klarheit und einer strukturierten Basis.' },
]
const FACTS = [
  { n: '5', l: 'Leistungen', d: 'Von der Marktanalyse bis zur Development Intelligence.', img: 'turm', pos: '50% 30%' },
  { n: '5', l: 'Schritte', d: 'Vom Markt bis zur Steuerung von Vermarktung und Entwicklung.', img: 'turm', pos: '50% 78%' },
  { n: '1', l: 'System', d: 'Ein klarer Entscheidungsweg statt Einzelmaßnahmen.', img: 'cta-abend-2' },
]
const FOR = ['Klarere Strukturen für komplexe Entscheidungen.', 'Marktverständnis als Grundlage.', 'Strategien, die Wachstum schaffen.']

// Redaktioneller Abschnitt auf hellem Grund: Beschriftung, großer Blocksatz mit Wort-Reveal, kleines Bild mit Kurztext.
function Editorial() {
  return (
    <section className="edi" aria-label="Über ARVENTAS">
      <div className="wrap">
        <div className="edi-row">
          <p className="edi-label">(Über uns)</p>
          <ScrollWords className="edi-big ed" text="ARVENTAS ist kein klassisches Immobilienunternehmen. Wir verbinden Marktverständnis, Bewertung, strategische Analyse, Vermarktung und Entwicklung zu einem klaren System für bessere Immobilienentscheidungen." />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo title={`ARVENTAS | ${CLAIM}`} description="ARVENTAS verbindet Marktverständnis, Immobilienbewertung, Strategie und intelligente Vermarktung für fundierte Immobilienentscheidungen." />
      <HomeFilm />

      <Editorial />



      <Sec tone="light" className="feat big-sec">
        <h2 className="big-h ed big-h2"><Letters text="Struktur für bessere" per={30} /><span className="r"><Letters text="Immobilienentscheidungen." per={26} delay={600} /></span></h2>
        <ScrollWords className="feat-lead" text="ARVENTAS steht für einen klaren, strukturierten und strategischen Ansatz in der Immobilienentwicklung. Wir betrachten Immobilien nicht isoliert, sondern verbinden Markt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsrahmen." />
      </Sec>

      <CardTrack items={PILLARS} />

      <JourneySplit items={JOURNEY} label="Kundenjourney" title="Vom Marktsignal zur klaren Strategie." />

      <Sec tone="light" className="big-sec">
        <h2 className="big-h ed"><Letters text="Fünf Leistungen." per={30} /><span className="r"><Letters text="Ein System." per={30} delay={500} /></span></h2>
        <HoverList items={SERVICE_LIST.map((s) => ({ t: s.t, d: s.card, img: s.img, icon: s.icon, to: `/leistungen/${s.slug}` }))} />
        <div className="btn-row"><Btn to="/leistungen" variant="marine">Leistungen entdecken</Btn></div>
      </Sec>

      <ProcessStack facts={FACTS} links={SERVICE_LIST.map((s) => ({ t: s.t, to: `/leistungen/${s.slug}` }))} steps={CHAIN_CARDS} lead="Wir verbinden Markt, Objekt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsweg. So entstehen aus Informationen bessere Entscheidungen." />

      <Sec tone="light" eyebrow="Für wen wir arbeiten" title="Für Immobilienentscheider, die Klarheit brauchen.">
        <ul className="gl big rv">{FOR.map((x) => <li key={x}>{x}</li>)}</ul>
        <GoldLine>Wir sehen nicht nur heute. Wir bauen Potenziale für morgen.</GoldLine>
        <AudienceCards items={AUDIENCES} />
      </Sec>

      <CtaBand image="/media/cta-abend-1.webp" />
    </>
  )
}
