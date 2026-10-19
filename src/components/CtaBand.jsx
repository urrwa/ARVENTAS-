import { Btn } from './ui.jsx'
import Letters from './Letters.jsx'

// Abschlusskarte (Vorbild Rivos): breite, abgesetzte Karte mit Foto, Aussage links, ein Button rechts.
export default function CtaBand({ image = '/media/cta-abend-1.webp', title = 'Bereit für bessere Immobilienentscheidungen?', btn = 'Potenzial analysieren', to = '/kontakt' }) {
  return (
    <div className="cta2-wrap">
      <section className="cta2" aria-label="Nächster Schritt">
        <img className="cta2-bg" src={image} alt="" loading="lazy" decoding="async" />
        <div className="cta2-in">
          <h2 className="cta2-h"><Letters text={title} per={22} max={1200} /></h2>
          <Btn to={to} variant="gold">{btn}</Btn>
        </div>
      </section>
    </div>
  )
}
