import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from './Consent.jsx'
import Brand from './Brand.jsx'
import { Btn } from './ui.jsx'

export default function Footer() {
  const { openSettings } = useConsent()
  const mark = useRef(null)
  useEffect(() => {
    const el = mark.current
    if (!el || !('IntersectionObserver' in window)) { el && el.classList.add('on'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('on'); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-lead">
            <Link to="/" className="ftr-logo" aria-label="ARVENTAS – zur Startseite"><img src="/media/arventas-logo.png" alt="ARVENTAS" width="300" height="182" loading="lazy" /></Link>
            <p className="ftr-slogan"><span>Werte schaffen.</span> <span className="soft">Zukunft bauen.</span></p>
            <div className="btn-row"><Btn to="/kontakt" variant="gold">Beratung anfragen</Btn></div>
          </div>
          <div className="ftr-cols">
            <nav aria-label="Wege"><h4>Wege</h4><ul>
              <li><Link to="/immobilie-verkaufen">Für Eigentümer</Link></li>
              <li><Link to="/kapitalanlage-immobilien">Für Investoren</Link></li>
              <li><Link to="/objektreport">Objektreport</Link></li>
            </ul></nav>
            <nav aria-label="Unternehmen"><h4>Unternehmen</h4><ul>
              <li><Link to="/ueber-uns">Über uns</Link></li>
              <li><Link to="/partner">Partner</Link></li>
              <li><Link to="/wissen">Wissen</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul></nav>
            <nav aria-label="Rechtliches"><h4>Rechtliches</h4><ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><button type="button" className="lk" onClick={openSettings}>Cookie-Einstellungen</button></li>
            </ul></nav>
          </div>
        </div>
        <div className="ftr-bot">
          <span><Brand /> · Off-Market-Immobilien in Deutschland</span>
        </div>
      </div>
      <svg ref={mark} className="ftr-mark" viewBox="0 0 1000 170" aria-hidden="true" focusable="false">
        <text x="40" y="150" textLength="920" lengthAdjust="spacing">ΛRVENTΛS</text>
      </svg>
    </footer>
  )
}
