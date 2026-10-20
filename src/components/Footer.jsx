import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from './Consent.jsx'
import { HOME } from '../content/images.js'

// Fuß nach dem Vorbild Archter: Foto links (springt beim Erscheinen auf), Claim in der Mitte, Seitenliste rechts, große Wortmarke unten.
export default function Footer() {
  const { openSettings } = useConsent()
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <footer className="ftr3" ref={root}>
      <div className="wrap">
        <div className="ftr3-top">
          <div className="ftr3-photo"><img src={HOME.footer} alt="" loading="lazy" decoding="async" /></div>
          <div className="ftr3-mid">
            <h2 className="ftr3-h">Klarheit vor jeder Entscheidung.</h2>
            <p>Strategische Immobilienentwicklung mit System.</p>
            <Link to="/kontakt" className="ftr3-mail">Potenzial analysieren <span aria-hidden="true">→</span></Link>
          </div>
          <nav className="ftr3-pages" aria-label="Seiten">
            <h3>Seiten</h3>
            <ul>
              <li><Link to="/">Startseite</Link></li>
              <li><Link to="/leistungen">Leistungen</Link></li>
              <li><Link to="/system">System</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/ueber-uns">Über uns</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </nav>
        </div>
        <div className="ftr3-legal">
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <button type="button" className="lk" onClick={openSettings}>Cookie-Einstellungen</button>
          <span>© 2026 ARVENTAS</span>
        </div>
      </div>
      <svg className="ftr3-mark" viewBox="0 0 1000 170" aria-hidden="true" focusable="false">
        <text x="40" y="150" textLength="920" lengthAdjust="spacing">ΛRVENTΛS</text>
      </svg>
    </footer>
  )
}
