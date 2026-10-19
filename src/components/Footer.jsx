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
          <div className="ftr-photo" aria-hidden="true"><img src="/media/gal-4.webp" alt="" loading="lazy" decoding="async" /></div>
          <div className="ftr-lead">
            <Link to="/" className="ftr-logo" aria-label="ARVENTAS – zur Startseite"><img src="/media/arventas-logo.png" alt="ARVENTAS" width="300" height="182" loading="lazy" /></Link>
            <p className="ftr-slogan"><span>Strategische Immobilienentwicklung</span> <span className="soft">mit System.</span></p>
            <div className="btn-row"><Btn to="/kontakt" variant="gold">Potenzial analysieren</Btn></div>
          </div>
          <div className="ftr-cols">
            <nav aria-label="Navigation"><h4>Navigation</h4><ul>
              <li><Link to="/">Startseite</Link></li>
              <li><Link to="/leistungen">Leistungen</Link></li>
              <li><Link to="/system">System</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/ueber-uns">Über uns</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul></nav>
          </div>
        </div>
        <div className="ftr-bot">
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <button type="button" className="lk" onClick={openSettings}>Cookie-Einstellungen</button>
          <span className="ftr-brand"><Brand /></span>
        </div>
      </div>
      <svg ref={mark} className="ftr-mark" viewBox="0 0 1000 170" aria-hidden="true" focusable="false">
        <text x="40" y="150" textLength="920" lengthAdjust="spacing">ΛRVENTΛS</text>
      </svg>
    </footer>
  )
}
