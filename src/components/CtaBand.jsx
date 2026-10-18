import { Btn } from './ui.jsx'

// Abschlussband am Seitenende: Text links, Foto rechts. Fotos: Bildmaterial des Kunden (Abendarchitektur).
export default function CtaBand({ image = '/media/cta-abend-1.webp', title = 'Bereit für bessere Immobilienentscheidungen?', text = 'ARVENTAS hilft Ihnen, Potenziale klarer zu bewerten, Risiken besser einzuordnen und Strategien gezielt zu entwickeln.', btn = 'Potenzial analysieren', to = '/kontakt' }) {
  return (
    <section className="ctab dark" aria-label="Nächster Schritt">
      <div className="wrap">
        <div className="ctab-box rv">
          <div className="ctab-txt">
            <p className="eyebrow">Nächster Schritt</p>
            <h2 className="h2">{title}</h2>
            <p>{text}</p>
            <div className="btn-row">
              <Btn to={to}>{btn}</Btn>
              <Btn to="/kontakt?art=Strategiegespräch" variant="line">Strategiegespräch anfragen</Btn>
            </div>
            <p className="ctab-claim small">ARVENTAS – Strategische Immobilienentwicklung mit System.</p>
          </div>
          <div className="ctab-img"><img src={image} alt="" loading="lazy" decoding="async" /></div>
        </div>
      </div>
    </section>
  )
}
