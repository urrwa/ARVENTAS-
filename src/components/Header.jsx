import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import LangToggle from './LangToggle.jsx'
import { useMenu } from './MenuContext.jsx'

const links = [
  { to: '/immobilie-verkaufen', label: 'Für Eigentümer' },
  { to: '/kapitalanlage-immobilien', label: 'Für Investoren' },
  { to: '/objektreport', label: 'Objektreport' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/wissen', label: 'Wissen' },
]

export default function Header() {
  const { open, setOpen } = useMenu()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [state, setState] = useState({ pre: false, over: isHome })
  const burger = useRef(null)
  // Startseite: Header liegt transparent über dem Film (erst nach dem Intro sichtbar), danach flache Marine-Leiste.
  useEffect(() => {
    if (!isHome) { setState({ pre: false, over: false }); return }
    const calc = () => {
      const film = document.getElementById('film')
      const over = film ? film.getBoundingClientRect().bottom > 90 : false
      setState({ pre: false, over })
    }
    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    window.addEventListener('arventas:intro', calc)
    return () => { window.removeEventListener('scroll', calc); window.removeEventListener('resize', calc); window.removeEventListener('arventas:intro', calc) }
  }, [isHome])
  // Nach dem Schließen springt der Fokus zurück auf den Menü-Knopf
  const wasOpen = useRef(false)
  useEffect(() => {
    if (wasOpen.current && !open && burger.current) burger.current.focus()
    wasOpen.current = open
  }, [open])
  return (
    <header className={`hdr${isHome ? ' fixed' : ''}${state.over ? ' clear' : ''}${state.pre ? ' pre' : ''}`} inert={open || undefined}>
      <div className="hdr-in">
        <Link to="/" className="logo" aria-label="ARVENTAS – zur Startseite">
          <img src="/media/arventas-logo.png" alt="ARVENTAS" width="132" height="80" />
        </Link>
        <nav className="nav" aria-label="Hauptnavigation">
          {links.map((l) => <NavLink key={l.to} to={l.to} className="nl">{l.label}</NavLink>)}
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
