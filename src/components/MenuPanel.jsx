import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import LangToggle from './LangToggle.jsx'
import { useMenu } from './MenuContext.jsx'
import { useConsent } from './Consent.jsx'

const items = [
  { to: '/immobilie-verkaufen', label: 'Für Eigentümer' },
  { to: '/kapitalanlage-immobilien', label: 'Für Investoren' },
  { to: '/objektreport', label: 'Objektreport' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/wissen', label: 'Wissen' },
  { to: '/partner', label: 'Partner' },
  { to: '/kontakt', label: 'Kontakt' },
]

// Push-Menü: Seitenpanel von rechts, die Seite wird nach links geschoben. Links erscheinen gestaffelt,
// beim Hover läuft ein Balken hinter dem Link durch.
export default function MenuPanel() {
  const { open, setOpen } = useMenu()
  const { pathname } = useLocation()
  const { openSettings } = useConsent()
  const box = useRef(null)
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => { const a = box.current && box.current.querySelector('.plink'); a && a.focus() }, 120)
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key === 'Tab' && box.current) { // Fokus bleibt im geöffneten Menü
        const f = [...box.current.querySelectorAll('a, button')].filter((x) => !x.disabled)
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey) }
  }, [open, setOpen])
  return (
    <>
      <div className="scrim" onClick={() => setOpen(false)} aria-hidden="true" />
      <aside id="push-menu" ref={box} className="panel" aria-label="Hauptmenü" aria-hidden={!open} inert={!open || undefined}>
        <div className="panel-top">
          <button type="button" className="panel-x" aria-label="Menü schließen" onClick={() => setOpen(false)}><span /><span /></button>
        </div>
        <nav aria-label="Menü">
          <ul className="plist">
            {items.map((it, i) => (
              <li key={it.to} style={{ '--i': i }}>
                <Link to={it.to} className="plink" aria-current={pathname === it.to ? 'page' : undefined}>{it.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/kontakt" className="btn btn-marine panel-cta">Beratung anfragen <span className="arr" aria-hidden="true">→</span></Link>
        <div className="panel-bot">
          <div>
            <h4>Rechtliches</h4>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><button type="button" onClick={() => { setOpen(false); setTimeout(openSettings, 300) }}>Cookie-Einstellungen</button></li>
            </ul>
          </div>
          <div>
            <h4>Sprache / Language</h4>
            <LangToggle />
          </div>
        </div>
      </aside>
    </>
  )
}
