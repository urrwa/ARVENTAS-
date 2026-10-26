import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from './Consent.jsx'

// Fuß wie in der Landingpage: links die Einladung zum Gespräch, rechts Navigation und Rechtliches, unten die Leiste mit Pfeil nach oben
// und eine sehr große, blasse Wortmarke, die unten angeschnitten ist.
// Wortmarke aus den Buchstabenformen des Logos (weit gesetzte, geometrische Versalien; das A ohne Querstrich).
const GLYPH = {
  A: 'M2 100 L40 0 L78 100',
  R: 'M8 100 V0 H46 C76 0 76 50 46 50 H8 M44 50 L76 100',
  V: 'M2 0 L40 100 L78 0',
  E: 'M72 0 H8 V100 H72 M8 50 H62',
  N: 'M8 100 V0 L72 100 V0',
  T: 'M0 0 H80 M40 0 V100',
  S: 'M72 18 C60 -4 10 -4 10 26 C10 54 72 46 72 76 C72 106 20 104 6 80',
}
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
      <div className="sf-mark" ref={mark} aria-hidden="true">{[...'ARVENTAS'].map((c, i) => <span key={i} style={{ '--i': i }}><svg viewBox="-9 -9 98 118" className={'g' + c}><path d={GLYPH[c]} /></svg></span>)}</div>
    </footer>
  )
}
