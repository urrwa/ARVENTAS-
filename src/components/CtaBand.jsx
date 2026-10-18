import { Btn } from './ui.jsx'

// Abschlussband am Seitenende: Text links, Foto rechts. Fotos: Bildmaterial des Kunden (Abendarchitektur).
export default function CtaBand({ image = '/media/cta-abend-1.webp' }) {
  return (
    <section className="ctab dark" aria-labelledby="h-ctab">
      <div className="wrap">
        <div className="ctab-box rv">
          <div className="ctab-txt">
            <p className="eyebrow">Nächster Schritt</p>
            <h2 id="h-ctab" className="h2">Bereit für ein erstes Gespräch?</h2>
            <p>Senden Sie uns Ihre Anfrage. Wir prüfen sie sorgfältig und melden uns persönlich bei Ihnen.</p>
            <div className="btn-row"><Btn to="/kontakt">Anfrage senden</Btn></div>
          </div>
          <div className="ctab-img"><img src={image} alt="" loading="lazy" decoding="async" /></div>
        </div>
      </div>
    </section>
  )
}
