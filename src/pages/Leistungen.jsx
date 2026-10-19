import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import HoverList from '../components/HoverList.jsx'
import InlineText from '../components/InlineText.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid, Split, GoldLine, Versus } from '../components/blocks.jsx'
import { SERVICE_LIST, BENEFITS, VERSUS } from '../content/site.js'

export default function Leistungen() {
  return (
    <>
      <Seo title="Leistungen | ARVENTAS" description="Fünf Leistungsbereiche, ein klares System: Marktanalyse, Immobilienbewertung, Strategische Analyse, Strategische Vermarktung und Development Intelligence." />
      <PageHero image="/media/buero-abend-2.webp" eyebrow="Leistungen" title="Fünf Leistungsbereiche. Ein klares System."
        lead="Von der Marktanalyse bis zur Entwicklung.">
        <div className="btn-row"><Btn to="/kontakt">Potenzial analysieren</Btn></div>
      </PageHero>

      <Sec eyebrow="Unser Ansatz" title="Nicht einzelne Leistungen. Ein verbundenes System.">
        <InlineText parts={['Immobilienentscheidungen entstehen selten durch', { img: '/media/gal-1.webp' }, 'einen einzelnen Faktor. Standort, Nachfrage,', { img: '/media/gal-3.webp' }, 'Preisentwicklung, Objektqualität,', { img: '/media/gal-6.webp' }, 'Risiko, Vermarktung und', { img: '/media/gal-8.webp' }, 'Entwicklungspotenzial müssen gemeinsam betrachtet werden.']} />
        <div className="inl-more">
          <p className="rv">ARVENTAS bringt diese Bereiche in eine klare Struktur. So entsteht aus einzelnen Informationen ein fundiertes Gesamtbild.</p>
          <GoldLine>Struktur ersetzt Zufall.</GoldLine>
        </div>
      </Sec>

      <Sec eyebrow="Leistungsübersicht" title="Unsere Kernleistungen im Überblick."
        lead="Jede Leistung erfüllt eine eigene Aufgabe. Zusammen bilden sie die Grundlage für datenbasierte Immobilienstrategie, gezielte Vermarktung und strukturierte Entwicklung.">
        <HoverList items={SERVICE_LIST.map((s) => ({ t: s.t, d: s.card, img: s.img, icon: s.icon, to: `/leistungen/${s.slug}` }))} />
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
