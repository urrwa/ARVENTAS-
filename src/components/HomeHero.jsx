import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'

// Startseiten-Kopf: ein großes Foto, kurze Aussage unten links (Blocksatz, fett), eine Handlungskarte unten rechts.
export default function HomeHero() {
  return (
    <section className="hh" aria-label="Einführung">
      <img className="hh-img" src="/media/buero-abend-1.webp" alt="" fetchPriority="high" decoding="async" />
      <div className="hh-in">
        <h1 className="hh-h1 ed"><Letters text="Strategische Immobilienentwicklung mit System: Struktur, Marktverständnis und klare Entscheidungen." per={14} max={1100} /></h1>
        <div className="hh-card">
          <Link to="/kontakt" className="hh-a main"><span>Potenzial analysieren</span><i aria-hidden="true">→</i></Link>
          <Link to="/kontakt?art=Strategiegespräch" className="hh-a"><span>Strategiegespräch anfragen</span><i aria-hidden="true">→</i></Link>
        </div>
      </div>
    </section>
  )
}
