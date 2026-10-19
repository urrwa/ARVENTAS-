import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import AudienceCards from '../components/AudienceCards.jsx'
import ScrollWords from '../components/ScrollWords.jsx'
import Letters from '../components/Letters.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, Versus } from '../components/blocks.jsx'
import { ABOUT, VERSUS, AUDIENCES } from '../content/site.js'

// Seitenaufbau nach dem Vorbild Archter-Studio: Studio-Absatz mit Bild, dunkle Haltung, großer Ansatz-Absatz, Mission/Zukunft über Vollbild.
export default function About() {
  return (
    <>
      <Seo title="Über uns | ARVENTAS" description="ARVENTAS steht für Struktur, Strategie und nachhaltige Immobilienentwicklung." />
      <PageHero image="/media/buero-abend-2.webp" eyebrow="Über uns" title="Struktur. Strategie. Entwicklung."
        lead="Immobilienpotenziale strukturiert bewerten und entwickeln.">
        <div className="btn-row"><Btn to="/kontakt">Potenzial analysieren</Btn></div>
      </PageHero>

      <section className="ab-studio">
        <div className="wrap ab-studio-in">
          <p className="ab-label">(Unsere Mission)</p>
          <div className="ab-studio-txt">
            <ScrollWords className="ab-lead" text="Wir schaffen Klarheit, bevor Entscheidungen getroffen werden. Standort, Nachfrage, Preisentwicklung, Risiko, Vermarktung und Entwicklungspotenzial bringen wir in eine klare Struktur. So werden Potenziale sichtbar und Risiken besser einzuordnen." />
          </div>
          <div className="ab-studio-img"><img src="/media/buero-abend-1.webp" alt="Lounge hinter Glasfassade am Abend" loading="lazy" decoding="async" /></div>
        </div>
      </section>

      <section className="ab-dark">
        <div className="wrap ab-dark-in">
          <div className="ab-dark-img"><img src="/media/cta-abend-1.webp" alt="Bürogebäude am Abend" loading="lazy" decoding="async" /></div>
          <div className="ab-dark-txt">
            <p className="ab-label">(Unsere Haltung)</p>
            <h2 className="ab-h">Nicht schneller entscheiden. Besser entscheiden.</h2>
            <p>Wir glauben an Marktverständnis, klare Analyse, realistische Bewertung und strategische Umsetzung.</p>
            <div className="btn-row"><Btn to="/kontakt" variant="gold">Mit uns arbeiten</Btn></div>
          </div>
        </div>
      </section>

      <section className="ab-approach">
        <div className="wrap">
          <p className="ab-label">(Unser Unterschied)</p>
          <ScrollWords className="ab-big" text="Wir sind keine klassische Makler- oder Baufirma. Unser Ansatz beginnt früher: Wir analysieren Markt und Standort, bewerten Potenziale, ordnen Risiken ein und entwickeln daraus eine klare Strategie." />
        </div>
      </section>

      <Sec>
        <Versus {...VERSUS} />
      </Sec>

      <section className="ab-mv">
        <img className="ab-mv-bg" src="/media/cta-abend-2.webp" alt="" loading="lazy" decoding="async" />
        <div className="wrap ab-mv-cards">
          <article>
            <h3>Partnernetzwerk</h3>
            <p>Starke Ergebnisse entstehen durch passende Partner. Qualität, Verlässlichkeit, Struktur und Langfristigkeit.</p>
          </article>
          <article>
            <h3>Zukunft</h3>
            <p>Moderne Immobilienentwicklung braucht mehr als Erfahrung. Früher erkennen, besser bewerten, gezielter handeln.</p>
          </article>
        </div>
      </section>

      <section className="pr">
        <div className="wrap">
          <p className="ab-label">(Unsere Haltung im Detail)</p>
          <h2 className="pr-h"><Letters text="Vier Prinzipien." per={34} /></h2>
          <ol className="pr-list">
            {ABOUT.stance.map((it, i) => (
              <li key={it.t} style={{ '--i': i }} className="rv">
                <span className="pr-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Sec eyebrow="Für wen" title="Für Entscheider mit Anspruch.">
        <AudienceCards items={AUDIENCES} />
      </Sec>

      <CtaBand image="/media/cta-abend-2.webp" title="Lassen Sie uns Immobilienpotenziale klarer einordnen." text="ARVENTAS unterstützt Sie dabei, Märkte, Objekte und Entwicklungschancen besser zu verstehen und strategisch nutzbar zu machen." />
    </>
  )
}
