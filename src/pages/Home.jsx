import Seo from '../components/Seo.jsx'
import HomeHero from '../components/HomeHero.jsx'
import HoverList from '../components/HoverList.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid, StepsRow, Chain, Split, GoldLine } from '../components/blocks.jsx'
import { AUDIENCES, CHAIN, SERVICE_LIST, CLAIM } from '../content/site.js'

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
const FOR = ['Klarere Strukturen für komplexe Entscheidungen.', 'Bessere Priorisierung von Chancen und Risiken.', 'Marktverständnis als Grundlage.', 'Strategien, die Wachstum schaffen.', 'Entwicklungspotenziale erkennen und nutzen.']

export default function Home() {
  return (
    <>
      <Seo title={`ARVENTAS | ${CLAIM}`} description="ARVENTAS verbindet Marktverständnis, Immobilienbewertung, Strategie und intelligente Vermarktung für fundierte Immobilienentscheidungen." />
      <HomeHero />

      <Sec eyebrow="Wofür ARVENTAS steht" title="Struktur für bessere Immobilienentscheidungen."
        lead="ARVENTAS steht für einen klaren, strukturierten und strategischen Ansatz in der Immobilienentwicklung. Wir betrachten Immobilien nicht isoliert, sondern verbinden Markt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsrahmen.">
        <IconGrid items={PILLARS} cols={4} />
      </Sec>

      <Sec eyebrow="Einleitung zum Unternehmen" title={<>ARVENTAS ist kein klassisches Immobilienunternehmen.</>}>
        <Split img="/media/buero-abend-2.webp" alt="Beleuchteter Besprechungsraum am Abend">
          <p className="rv">Wir sind ein strategisches Immobilien-System, das Marktverständnis, Bewertung, Strategie und intelligente Vermarktung verbindet und so fundierte Entscheidungen ermöglicht.</p>
          <GoldLine>Nicht Makler. Nicht klassisches Bauunternehmen. Ein strukturierter Real-Estate-Intelligence- und Entwicklungspartner.</GoldLine>
        </Split>
      </Sec>

      <Sec eyebrow="Kundenjourney" title="Vom Marktsignal zur klaren Strategie.">
        <StepsRow items={JOURNEY} />
      </Sec>

      <Sec eyebrow="Leistungsübersicht" title="Ein System. Fünf strategische Leistungsbereiche.">
        <HoverList items={SERVICE_LIST.map((s) => ({ t: s.t, d: s.card, img: s.img, icon: s.icon, to: `/leistungen/${s.slug}` }))} />
        <div className="btn-row"><Btn to="/leistungen" variant="line">Leistungen entdecken</Btn></div>
      </Sec>

      <Sec eyebrow="Leistungen greifen ineinander" title="Nicht einzelne Maßnahmen. Ein verbundenes System."
        lead="Wir verbinden Markt, Objekt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsweg. So entstehen aus Informationen bessere Entscheidungen.">
        <Chain items={CHAIN} />
      </Sec>

      <Sec eyebrow="Für wen wir arbeiten" title="Für Immobilienentscheider, die Klarheit brauchen.">
        <ul className="gl big rv">{FOR.map((x) => <li key={x}>{x}</li>)}</ul>
        <GoldLine>Wir sehen nicht nur heute. Wir bauen Potenziale für morgen.</GoldLine>
        <IconGrid items={AUDIENCES} cols={5} />
      </Sec>

      <CtaBand image="/media/cta-abend-1.webp" />
    </>
  )
}
