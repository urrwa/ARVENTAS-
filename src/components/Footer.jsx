import { Link } from 'react-router-dom'
import { useConsent } from './Consent.jsx'

// Schlichter Fuß direkt unter der Abschlusskarte (Vorbild Rivos): Marke und Claim links, drei Linkspalten rechts, Zeile mit Copyright.
export default function Footer() {
  const { openSettings } = useConsent()
  return (
    <footer className="ftr2">
      <div className="wrap">
        <div className="ftr2-top">
          <div className="ftr2-brand">
            <Link to="/" className="ftr2-logo" aria-label="ARVENTAS – zur Startseite"><img src="/media/arventas-logo.png" alt="ARVENTAS" width="360" height="219" loading="lazy" /></Link>
            <p>Strategische Immobilienentwicklung mit System.</p>
          </div>
          <div className="ftr2-cols">
            <ul>
              <li><Link to="/">Startseite</Link></li>
              <li><Link to="/leistungen">Leistungen</Link></li>
              <li><Link to="/ueber-uns">Über uns</Link></li>
            </ul>
            <ul>
              <li><Link to="/system">System</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><button type="button" className="lk" onClick={openSettings}>Cookie-Einstellungen</button></li>
            </ul>
          </div>
        </div>
        <div className="ftr2-bot">
          <span>© 2026 ARVENTAS</span>
          <span>Strategische Immobilienentwicklung</span>
        </div>
      </div>
    </footer>
  )
}
