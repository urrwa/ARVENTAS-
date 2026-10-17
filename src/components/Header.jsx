import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const links = [
  { to: '/immobilie-verkaufen', label: 'Für Eigentümer' },
  { to: '/kapitalanlage-immobilien', label: 'Für Investoren' },
  { to: '/objektreport', label: 'Objektreport' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/wissen', label: 'Wissen' },
]
const mobileOnly = [
  { to: '/partner', label: 'Partner' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [state, setState] = useState({ pre: isHome && !window.__introDone, over: isHome })
  const nav = useRef(null)
  const burger = useRef(null)
  useEffect(() => setOpen(false), [pathname])
  // Startseite: Header liegt transparent über dem Film (erst nach dem Intro sichtbar), danach flache Marine-Leiste.
  useEffect(() => {
    if (!isHome) { setState({ pre: false, over: false }); return }
    const calc = () => {
      const film = document.getElementById('film')
      const over = film ? film.getBoundingClientRect().bottom > 90 : false
      setState({ pre: !window.__introDone, over })
    }
    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    window.addEventListener('arventas:intro', calc)
    return () => { window.removeEventListener('scroll', calc); window.removeEventListener('resize', calc); window.removeEventListener('arventas:intro', calc) }
  }, [isHome])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const first = nav.current && nav.current.querySelector('a')
    first && first.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); burger.current && burger.current.focus() }
      if (e.key === 'Tab') { // Fokus bleibt im geöffneten Menü
        const f = [burger.current, ...nav.current.querySelectorAll('a')]
        const a = f.indexOf(document.activeElement)
        if (e.shiftKey && a <= 0) { e.preventDefault(); f[f.length - 1].focus() }
        else if (!e.shiftKey && a === f.length - 1) { e.preventDefault(); f[0].focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])
  return (
    <header className={`hdr${isHome ? ' fixed' : ''}${state.over && !open ? ' clear' : ''}${state.pre ? ' pre' : ''}`}>
      <div className="hdr-in">
        <Link to="/" className="logo" aria-label="ARVENTAS – zur Startseite">
          <img src="/media/arventas-logo.png" alt="ARVENTAS" width="119" height="72" />
        </Link>
        <button ref={burger} className="burger" type="button" aria-expanded={open} aria-controls="hauptnavigation" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav ref={nav} id="hauptnavigation" className={`nav${open ? ' open' : ''}`} aria-label="Hauptnavigation">
          {links.map((l) => <NavLink key={l.to} to={l.to} className="nl">{l.label}</NavLink>)}
          {mobileOnly.map((l) => <NavLink key={l.to} to={l.to} className="nl nl-m">{l.label}</NavLink>)}
          <Link to="/kontakt" className="btn btn-gold">Beratung anfragen</Link>
        </nav>
      </div>
      
    </header>
  )
}
