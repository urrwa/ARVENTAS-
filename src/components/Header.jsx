import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import LangToggle from './LangToggle.jsx'
import { useMenu } from './MenuContext.jsx'

export const NAV = [
  { to: '/immobilie-verkaufen', label: 'Für Eigentümer' },
  { to: '/kapitalanlage-immobilien', label: 'Für Investoren' },
  { to: '/objektreport', label: 'Objektreport' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/wissen', label: 'Wissen' },
]

export default function Header() {
  const { open, setOpen } = useMenu()
  const burger = useRef(null)
  const isHome = useLocation().pathname === '/'
  const [top, setTop] = useState(true)
  // Startseite: Leiste liegt zunächst klar über dem Foto und wird beim Scrollen flächig.
  useEffect(() => {
    const f = () => setTop(window.scrollY < 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  // Nach dem Schließen springt der Fokus zurück auf den Menü-Knopf
  const wasOpen = useRef(false)
  useEffect(() => {
    if (wasOpen.current && !open && burger.current) burger.current.focus()
    wasOpen.current = open
  }, [open])
  return (
    <header className={`hdr${isHome && top ? ' clear' : ''}`} inert={open || undefined}>
      <div className="hdr-in">
        <Link to="/" className="logo" aria-label="ARVENTAS – zur Startseite">
          <img src="/media/arventas-logo.png" alt="ARVENTAS" width="132" height="80" />
        </Link>
        <nav className="nav" aria-label="Hauptnavigation">
          {NAV.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className="nl">{l.label}</NavLink>)}
          <Link to="/kontakt" className="btn btn-gold">Beratung anfragen</Link>
        </nav>
        <LangToggle />
        <button ref={burger} className="burger" type="button" aria-expanded={open} aria-controls="push-menu" aria-label="Menü öffnen" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
