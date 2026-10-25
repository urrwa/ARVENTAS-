import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from './Consent.jsx'

// Fuß wie in der Landingpage: links die Einladung zum Gespräch, rechts Navigation und Rechtliches, unten die Leiste mit Pfeil nach oben
// und eine sehr große, blasse Wortmarke, die unten angeschnitten ist.
export default function Footer() {
  const { openSettings } = useConsent()
  const mark = useRef(null)
  useEffect(() => {
    const el = mark.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('on'); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <footer className="sf">
      <div className="sf-in">
        <div className="sf-top">
          <div className="sf-cta">
            <h2>Eine Immobilie im Blick?<br />Gestalten wir den nächsten Schritt.</h2>
            <Link to="/kontakt" className="sf-btn"><i aria-hidden="true" />Gespräch beginnen</Link>
          </div>
          <nav className="sf-col" aria-label="Seiten">
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/immobilie-verkaufen">Eigentümer</Link></li>
              <li><Link to="/kapitalanlage-immobilien">Investoren</Link></li>
              <li><Link to="/objektreport">Objektreport</Link></li>
              <li><Link to="/ueber-uns">Über uns</Link></li>
              <li><Link to="/partner">Partner</Link></li>
              <li><Link to="/wissen">Wissen</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </nav>
          <div className="sf-col">
            <h3>Rechtliches</h3>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><button type="button" onClick={openSettings}>Cookie-Einstellungen</button></li>
            </ul>
          </div>
        </div>
        <div className="sf-bot">
          <span>© 2026 ARVENTAS</span>
          <button type="button" className="sf-up" aria-label="Nach oben" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
        </div>
      </div>
      <div className="sf-mark" ref={mark} aria-hidden="true">{[...'ARVENTAS'].map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>)}</div>
    </footer>
  )
}
