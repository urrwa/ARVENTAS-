import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import LangToggle from './LangToggle.jsx'
import { useMenu } from './MenuContext.jsx'

export const NAV = [
  { to: '/', label: 'Startseite', end: true },
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/system', label: 'System' },
  { to: '/insights', label: 'Insights' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const { open, setOpen } = useMenu()
  const burger = useRef(null)
  // Nach dem Schließen springt der Fokus zurück auf den Menü-Knopf
  const wasOpen = useRef(false)
  useEffect(() => {
    if (wasOpen.current && !open && burger.current) burger.current.focus()
    wasOpen.current = open
  }, [open])
  return (
    <header className="hdr" inert={open || undefined}>
      <div className="hdr-in">
        <Link to="/" className="logo" aria-label="ARVENTAS – zur Startseite">
          <img src="/media/arventas-logo.png" alt="ARVENTAS" width="132" height="80" />
        </Link>
        <nav className="nav" aria-label="Hauptnavigation">
          {NAV.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className="nl">{l.label}</NavLink>)}
          <Link to="/kontakt" className="btn btn-gold">Potenzial analysieren</Link>
        </nav>
        <LangToggle />
        <button ref={burger} className="burger" type="button" aria-expanded={open} aria-controls="push-menu" aria-label="Menü öffnen" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
