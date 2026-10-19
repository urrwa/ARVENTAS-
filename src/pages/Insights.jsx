import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import ArticleCards from '../components/ArticleCards.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid } from '../components/blocks.jsx'
import { INSIGHT_AREAS, INSIGHT_WHY } from '../content/site.js'
import { ARTICLES } from '../content/data.js'

export default function Insights() {
  return (
    <>
      <Seo title="Insights | ARVENTAS" description="Marktverständnis für bessere Immobilienentscheidungen: Einblicke in Märkte, Standorte, Trends und Entwicklungspotenziale." />
      <PageHero image="/media/cta-abend-1.webp" eyebrow="Insights" title="Marktverständnis für bessere Immobilienentscheidungen."
        lead="Märkte nicht nur beobachten, sondern verstehen.">
        <div className="btn-row"><Btn to="/insights/off-market-verstehen">Insights entdecken</Btn></div>
      </PageHero>

      <Sec eyebrow="Übersicht" title="Alle Marktimpulse auf einen Blick."
        lead="Die Insights-Seite bündelt relevante Inhalte rund um Immobilienmärkte, Standortentwicklung, Marktbewegungen und strategische Immobilienentscheidungen.">
        <IconGrid items={INSIGHT_AREAS} cols={5} />
        <p className="small muted">Die Bereiche werden schrittweise mit geprüften Inhalten gefüllt. Bis dahin sind die Beiträge unten Entwürfe.</p>
      </Sec>

      <Sec eyebrow="Fachartikel" title="Wissen, das Immobilienentscheidungen verbessert.">
        <ArticleCards items={ARTICLES} />
        <p className="small muted">Entwürfe sind gekennzeichnet und keine aktuelle Recherche oder Marktdaten.</p>
      </Sec>

      <Sec eyebrow="Warum Insights" title="Wer Märkte besser versteht, entscheidet klarer."
        lead="Viele Immobilienentscheidungen entstehen unter Unsicherheit. Gute Insights helfen, Märkte, Standorte, Risiken und Chancen besser zu verstehen, bevor Kapital, Zeit und Ressourcen gebunden werden.">
        <IconGrid items={INSIGHT_WHY} cols={4} />
      </Sec>

      <CtaBand image="/media/cta-abend-2.webp" title="Sie möchten einen Markt oder Standort genauer verstehen?" text="ARVENTAS unterstützt Sie dabei, Marktinformationen richtig einzuordnen und daraus klare Immobilienstrategien abzuleiten." btn="Potenzial analysieren" />
    </>
  )
}
