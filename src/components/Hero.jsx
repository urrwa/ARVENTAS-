import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Statischer Einstieg: Foto, Überschrift, Kurztext, zwei Aktionen (Briefing Sektion 01).
export default function Hero() {
  return (
    <section className="hero-static" id="film" aria-label="Einführung">
      <picture>
        <source media="(max-width: 859px)" srcSet="/media/hero-haus-sm.webp" />
        <img className="hs-bg" src="/media/hero-haus.webp" alt="Moderne Villa im Abendlicht (KI-generiertes Beispielbild)" fetchpriority="high" />
      </picture>
      <div className="hs-shade" />
      <div className="hs-copy wrap">
        <p className="eyebrow">Off-Market Immobilien · Deutschlandweit</p>
        <h1 className="h1 hs-h1"><Letters text="Immobilien mit Potenzial. Zugang mit Vorsprung." per={34} /></h1>
        <p className="lead">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet.</p>
        <div className="btn-row">
          <Link to="/immobilie-verkaufen" className="btn btn-gold">Immobilie verkaufen <span className="arr" aria-hidden="true">→</span></Link>
          <Link to="/kapitalanlage-immobilien" className="btn btn-line">Immobilien entdecken <span className="arr" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}
