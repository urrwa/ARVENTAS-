import { Btn } from './ui.jsx'

// Abschlussband: Vollbildfoto mit zentralem Text und Button. Bleibt stehen, der Footer schiebt sich darüber (Vorbild Archter).
export default function CtaBand({ image = '/media/cta-abend-1.webp', title = 'Bereit für bessere Immobilienentscheidungen?', text = 'ARVENTAS hilft Ihnen, Potenziale klarer zu bewerten, Risiken besser einzuordnen und Strategien gezielt zu entwickeln.', btn = 'Potenzial analysieren', to = '/kontakt' }) {
  return (
    <div className="ctab-wrap">
      <section className="ctab dark" aria-label="Nächster Schritt">
        <img className="ctab-bg" src={image} alt="" loading="lazy" decoding="async" />
        <div className="ctab-mid">
          <h2 className="h2">{title}</h2>
          <p>{text}</p>
          <div className="btn-row">
            <Btn to={to}>{btn}</Btn>
            <Btn to="/kontakt?art=Strategiegespräch" variant="line">Strategiegespräch anfragen</Btn>
          </div>
        </div>
      </section>
    </div>
  )
}
