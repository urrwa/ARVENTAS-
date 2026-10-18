import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid, GoldLine, Split, Versus } from '../components/blocks.jsx'
import { ABOUT, VERSUS, AUDIENCES } from '../content/site.js'

export default function About() {
  return (
    <>
      <Seo title="Über uns | ARVENTAS" description="ARVENTAS steht für Struktur, Strategie und nachhaltige Immobilienentwicklung." />
      <PageHero image="/media/buero-abend-2.webp" eyebrow="Über uns" title="ARVENTAS steht für Struktur, Strategie und nachhaltige Immobilienentwicklung."
        lead="ARVENTAS ist kein klassisches Immobilienunternehmen. Wir verbinden Marktverständnis, Bewertung, strategische Analyse, Vermarktung und Entwicklung zu einem klaren System für bessere Immobilienentscheidungen.">
        <p className="hero-sub">Unser Anspruch ist es, Immobilienpotenziale nicht zufällig zu erkennen, sondern strukturiert zu bewerten und strategisch weiterzuentwickeln.</p>
        <div className="btn-row"><Btn to="/kontakt">Potenzial analysieren</Btn><Btn to="/kontakt?art=Strategiegespräch" variant="line">Strategiegespräch anfragen</Btn></div>
      </PageHero>

      <Sec eyebrow="Übersicht" title="Einblick in ARVENTAS, unsere Haltung und unser Netzwerk."
        lead="Diese Seite zeigt, wofür ARVENTAS steht, wie wir denken und warum unser Ansatz für moderne Immobilienentwicklung anders ist.">
        <IconGrid items={ABOUT.overview} cols={4} />
      </Sec>

      <Sec eyebrow="Unsere Mission" title="Wir schaffen Klarheit, bevor Entscheidungen getroffen werden.">
        <div className="why">
          <div>
            <p className="rv">Immobilienentscheidungen sind komplex: Standort, Nachfrage, Preisentwicklung, Risiko, Vermarktung und Entwicklungspotenzial beeinflussen den Erfolg eines Projekts. ARVENTAS bringt diese Faktoren in eine klare Struktur.</p>
            <p className="rv">Unser Ziel ist es, Potenziale sichtbar zu machen, Risiken besser einzuordnen und Entscheidungsgrundlagen zu schaffen, die strategisch verwertbar sind.</p>
            <GoldLine>Wir erkennen Potenziale, bewerten Möglichkeiten und schaffen Struktur für nachhaltige Entwicklung.</GoldLine>
          </div>
          <IconGrid items={ABOUT.missionRing} cols={3} />
        </div>
      </Sec>

      <Sec eyebrow="Unsere Haltung" title="Nicht schneller entscheiden. Besser entscheiden.">
        <Split img="/media/cta-abend-1.webp" flip alt="Bürogebäude am Abend">
          <p className="rv">Wir glauben nicht an zufällige Immobilienentscheidungen. Wir glauben an Marktverständnis, klare Analyse, realistische Bewertung und strategische Umsetzung. ARVENTAS betrachtet Immobilien nicht isoliert. Wir betrachten das Zusammenspiel aus Markt, Objekt, Nachfrage, Risiko und Entwicklungsperspektive.</p>
        </Split>
        <IconGrid items={ABOUT.stance} cols={4} />
      </Sec>

      <Sec eyebrow="Unser Unterschied" title="Wir sind keine klassische Makler- oder Baufirma."
        lead="ARVENTAS arbeitet nicht nach dem Prinzip, Objekte anzubieten, Preise zu schätzen, zu vermarkten und abzuwarten. Unser Ansatz beginnt früher: Wir analysieren Markt und Standort, bewerten Potenziale, ordnen Risiken ein und entwickeln daraus eine klare Strategie.">
        <Versus {...VERSUS} />
      </Sec>

      <Sec eyebrow="Partnernetzwerk" title="Starke Ergebnisse entstehen durch passende Partner."
        lead="ARVENTAS arbeitet mit ausgewählten Partnern, die fachlich, strategisch und charakterlich zu unserem System passen. Dabei geht es nicht um Masse, sondern um Qualität, Verlässlichkeit und Passung.">
        <IconGrid items={ABOUT.partners} cols={4} />
        <GoldLine>Partner werden nicht gesammelt. Sie werden passend integriert.</GoldLine>
      </Sec>

      <Sec eyebrow="Für wen" title="Für Entscheider, die Immobilienpotenziale klarer verstehen wollen."
        lead="ARVENTAS richtet sich an Unternehmen und Partner, die vor wichtigen Immobilienentscheidungen mehr Klarheit, Struktur und strategische Einordnung benötigen.">
        <IconGrid items={AUDIENCES} cols={5} />
      </Sec>

      <Sec eyebrow="Zukunft" title="Moderne Immobilienentwicklung braucht mehr als Erfahrung."
        lead="Der Immobilienmarkt verändert sich: Nachfrage, Finanzierung, Standorte, Nutzungskonzepte und Marktlogik entwickeln sich ständig weiter. Deshalb braucht es bessere Grundlagen für Projekte, Partnerschaften und Entwicklungschancen.">
        <IconGrid items={ABOUT.future} cols={4} />
      </Sec>

      <CtaBand image="/media/cta-abend-2.webp" title="Lassen Sie uns Immobilienpotenziale klarer einordnen." text="ARVENTAS unterstützt Sie dabei, Märkte, Objekte und Entwicklungschancen besser zu verstehen und strategisch nutzbar zu machen." />
    </>
  )
}
