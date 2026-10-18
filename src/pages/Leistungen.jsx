import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid, Chain, Split, GoldLine, Versus, ServiceCards } from '../components/blocks.jsx'
import { SERVICE_LIST, CHAIN, AUDIENCES, BENEFITS, VERSUS } from '../content/site.js'

export default function Leistungen() {
  return (
    <>
      <Seo title="Leistungen | ARVENTAS" description="Fünf Leistungsbereiche, ein klares System: Marktanalyse, Immobilienbewertung, Strategische Analyse, Strategische Vermarktung und Development Intelligence." />
      <PageHero image="/media/buero-abend-2.webp" eyebrow="Leistungen" title="Fünf Leistungsbereiche. Ein klares System."
        lead="ARVENTAS verbindet Marktanalyse, Immobilienbewertung, strategische Analyse, Vermarktung und Development Intelligence zu einem strukturierten Ansatz für bessere Immobilienentscheidungen.">
        <div className="btn-row"><Btn to="/kontakt">Potenzial analysieren</Btn><Btn to="/kontakt?art=Strategiegespräch" variant="line">Strategiegespräch anfragen</Btn></div>
      </PageHero>

      <Sec eyebrow="Unser Ansatz" title="Nicht einzelne Leistungen. Ein verbundenes System.">
        <Split img="/media/buero-abend-1.webp" alt="Lounge hinter Glasfassade am Abend">
          <p className="rv">Immobilienentscheidungen entstehen selten durch einen einzelnen Faktor. Standort, Nachfrage, Preisentwicklung, Objektqualität, Risiko, Vermarktung und Entwicklungspotenzial müssen gemeinsam betrachtet werden.</p>
          <p className="rv">ARVENTAS bringt diese Bereiche in eine klare Struktur. So entsteht aus einzelnen Informationen ein fundiertes Gesamtbild.</p>
          <GoldLine>Struktur ersetzt Zufall.</GoldLine>
        </Split>
      </Sec>

      <Sec eyebrow="Leistungsübersicht" title="Unsere Kernleistungen im Überblick."
        lead="Jede Leistung erfüllt eine eigene Aufgabe. Zusammen bilden sie die Grundlage für datenbasierte Immobilienstrategie, gezielte Vermarktung und strukturierte Entwicklung.">
        <ServiceCards items={SERVICE_LIST} />
      </Sec>

      <Sec eyebrow="Das ARVENTAS System" title="Jede Leistung erfüllt eine Aufgabe. Gemeinsam entsteht Klarheit."
        lead="Die einzelnen Leistungsbereiche greifen ineinander. Marktanalyse zeigt Chancen, Immobilienbewertung ordnet Werte ein, Strategische Analyse prüft Risiken und Potenziale, Strategische Vermarktung übersetzt Erkenntnisse in Marktansprache. Development Intelligence verbindet alles zu einem klaren System.">
        <Chain items={CHAIN} />
        <GoldLine>Nicht mehr Informationen. Bessere Entscheidungen.</GoldLine>
      </Sec>

      <Sec eyebrow="Für wen" title="Für Immobilienentscheider, die Klarheit brauchen."
        lead="ARVENTAS richtet sich an Unternehmen und Partner, die Immobilienpotenziale nicht aus dem Bauchgefühl heraus bewerten wollen, sondern mit Struktur, Marktverständnis und strategischer Einordnung.">
        <IconGrid items={AUDIENCES} cols={5} />
      </Sec>

      <Sec eyebrow="Warum es wichtig ist" title="Immobilienpotenziale entstehen nicht zufällig. Sie werden erkannt, bewertet und strukturiert entwickelt."
        lead="Viele Entscheidungen im Immobilienmarkt basieren auf unvollständigen Informationen. ARVENTAS schafft ein klareres Bild: Wo liegt Potenzial? Welche Risiken bestehen? Wie realistisch ist die Vermarktung? Welche Strategie führt zum besten Ergebnis?">
        <IconGrid items={BENEFITS} cols={5} />
      </Sec>

      <Sec eyebrow="Der Unterschied" title="Klassisch betrachtet man Immobilien einzeln. ARVENTAS betrachtet das gesamte Potenzial.">
        <Versus {...VERSUS} />
      </Sec>

      <CtaBand image="/media/cta-abend-2.webp" title="Bereit, Immobilienpotenziale besser zu verstehen?" text="ARVENTAS unterstützt Sie dabei, Märkte, Objekte und Entwicklungschancen klarer zu bewerten und strategisch zu nutzen." />
    </>
  )
}
