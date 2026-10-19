import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import JourneySplit from '../components/JourneySplit.jsx'
import RiseList from '../components/RiseList.jsx'
import StackRows from '../components/StackRows.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid, GoldLine, Split, Versus } from '../components/blocks.jsx'
import { SYSTEM, VERSUS } from '../content/site.js'

export default function System() {
  return (
    <>
      <Seo title="System | ARVENTAS" description="Ein klares System für bessere Immobilienentscheidungen: vom Marktsignal zur strategischen Einordnung." />
      <PageHero image="/media/cta-abend-2.webp" eyebrow="System" title="Ein klares System für bessere Immobilienentscheidungen."
        lead="Vom Marktsignal zur klaren Strategie.">
        <div className="btn-row"><Btn to="/kontakt">Potenzial analysieren</Btn></div>
      </PageHero>

      <Sec eyebrow="Warum ein System" title="Immobilienentscheidungen brauchen Struktur, nicht Vermutungen.">
        <Split img="/media/buero-abend-2.webp" alt="Besprechungsraum am Abend">
          <p className="rv">Viele Immobilienentscheidungen basieren auf fragmentierten Informationen: einem Standort, einem Preis, einem Kontakt, einem Markttrend oder einer einzelnen Gelegenheit.</p>
          <p className="rv">ARVENTAS betrachtet diese Elemente nicht isoliert. Wir verbinden sie zu einem strukturierten System, das unseren Kunden zeigt, wo Potenzial besteht, wie es bewertet werden sollte und welcher nächste Schritt sinnvoll ist.</p>
          <GoldLine>Struktur ersetzt Zufall.</GoldLine>
        </Split>
      </Sec>

      <JourneySplit items={SYSTEM.steps} label="Der Ablauf" title="Wie ARVENTAS Potenziale identifiziert, bewertet und entwickelt." />
      <Sec>
        <GoldLine>{SYSTEM.flow}</GoldLine>
      </Sec>

      <Sec eyebrow="Warum unser Ansatz" title="Warum unser Ansatz mehr Klarheit schafft."
        lead="Der Wert des ARVENTAS Systems liegt in der Verbindung von Analyse, Strategie und Umsetzung. Statt isolierter Einschätzungen erhalten Kunden eine strukturierte Sicht auf das gesamte Potenzial.">
        <StackRows items={SYSTEM.why} />
      </Sec>

      <Sec eyebrow="Der Unterschied" title="Klassische Immobilienarbeit betrachtet das Objekt. ARVENTAS betrachtet das volle Potenzial.">
        <Versus {...VERSUS} line="Wir reagieren nicht einfach auf den Markt. Wir strukturieren Entscheidungen, bevor sich der Markt bewegt." />
      </Sec>

      <RiseList items={SYSTEM.principles} title="Auf klaren Prinzipien aufgebaut." />

            <Sec eyebrow="Kundenergebnis" title="Was Kunden durch das ARVENTAS System gewinnen."
        lead="Am Ende des Prozesses erhalten Kunden keine isolierten Informationen. Sie erhalten einen klareren Blick auf Märkte, Chancen, Risiken und die mögliche strategische Richtung.">
        <IconGrid items={SYSTEM.gains} cols={5} />
        <GoldLine>Nicht mehr Komplexität. Mehr Klarheit.</GoldLine>
      </Sec>

      <Sec eyebrow="Anwendungsfälle" title="Wo das System Mehrwert schafft.">
        <IconGrid items={SYSTEM.cases} cols={5} />
      </Sec>

      <CtaBand image="/media/cta-abend-1.webp" title="Bereit, Ihre nächste Immobilienentscheidung zu strukturieren?" text="ARVENTAS unterstützt Sie dabei, Märkte, Immobilien und Entwicklungschancen durch ein klares System zu bewerten – bevor wichtige Entscheidungen getroffen werden." />
    </>
  )
}
