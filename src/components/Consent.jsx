import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NECESSARY_ONLY = { necessary: true, statistics: false, marketing: false }
const Ctx = createContext({ openSettings() {}, consent: NECESSARY_ONLY })
export const useConsent = () => useContext(Ctx)
const KEY = 'arventas-consent'
const LEGAL_PATHS = new Set(['/impressum', '/datenschutz'])

function storedChoice() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (value && !Array.isArray(value) && value.necessary === true && typeof value.statistics === 'boolean' && typeof value.marketing === 'boolean') {
      return NECESSARY_ONLY
    }
  } catch (e) { /* Ohne verfügbaren Speicher bleibt die Auswahl für diesen Besuch im Arbeitsspeicher. */ }
  return null
}

// Einwilligungssteuerung. Es sind keine Analyse- oder Werbefunktionen von Drittanbietern eingebunden;
// ungenutzte Kategorien bleiben inaktiv und können nicht vorab freigegeben werden.
export function ConsentProvider({ children }) {
  const [saved] = useState(storedChoice)
  const [consent, setConsent] = useState(saved || NECESSARY_ONLY)
  const [hasChoice, setHasChoice] = useState(Boolean(saved))
  const [open, setOpen] = useState(!saved)
  const [manual, setManual] = useState(false)
  const [details, setDetails] = useState(false)
  const box = useRef(null)
  const { pathname } = useLocation()
  // Rechtsseiten sind auch ohne Auswahl lesbar; ihre eigenen Einstellungen bleiben aufrufbar.
  const visible = open && (manual || !LEGAL_PATHS.has(pathname))
  useEffect(() => {
    if (!visible) return
    const prev = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current && box.current.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return }
      if (e.key === 'Tab' && box.current) {
        const f = [...box.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
          .filter((el) => el.getClientRects().length > 0)
        const first = f[0], last = f[f.length - 1]
        if (!first) { e.preventDefault(); return }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === box.current)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
        else if (!box.current.contains(document.activeElement)) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      prev && prev.isConnected && prev.focus && prev.focus()
    }
  }, [visible])
  const save = () => {
    setConsent(NECESSARY_ONLY); setHasChoice(true); setOpen(false)
    try { localStorage.setItem(KEY, JSON.stringify(NECESSARY_ONLY)) } catch (e) { /* Auswahl gilt weiterhin für diesen Besuch. */ }
  }
  const showLegal = () => {
    setManual(false); setDetails(false); setOpen(!hasChoice)
  }
  return (
    <Ctx.Provider value={{ consent, openSettings: () => { setManual(true); setDetails(true); setOpen(true) } }}>
      <div className="consent-site" inert={visible || undefined}>{children}</div>
      {visible && (
        <div className="cookie-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-h" aria-describedby="cookie-intro" ref={box} tabIndex={-1}>
            <div className="cookie-top">
              <img src="/media/arventas-logo.png" width="132" height="80" alt="ARVENTAS" />
              <button type="button" className="cookie-close" aria-label="Cookie-Einstellungen schließen" onClick={() => setOpen(false)}><span aria-hidden="true">×</span></button>
            </div>
            <h2 id="cookie-h">Cookie-Einstellungen</h2>
            <p id="cookie-intro">Diese Demo setzt keine Statistik- oder Marketing-Dienste von Drittanbietern ein. Ihre Auswahl wird für eine spätere technische Einwilligungsumsetzung vorbereitet.</p>
            {details && <div className="cookie-options">
              <div className="cookie-option"><div><b>Notwendig</b><p>Für den Betrieb der Seite erforderlich. Immer aktiv.</p></div><input type="checkbox" checked disabled aria-label="Notwendig (immer aktiv)" /></div>
              <div className="cookie-option is-inactive"><div><b>Statistik</b><p>Derzeit nicht eingebunden.</p></div><input type="checkbox" checked={false} disabled aria-label="Statistik" /></div>
              <div className="cookie-option is-inactive"><div><b>Marketing</b><p>Derzeit nicht eingebunden.</p></div><input type="checkbox" checked={false} disabled aria-label="Marketing" /></div>
            </div>}
            <div className="cookie-actions">
              <button type="button" className="btn btn-gold" aria-label={details ? 'Auswahl speichern' : 'Nur Notwendige'} onClick={save}>{details ? 'Auswahl speichern' : 'Nur Notwendige'}</button>
              <button type="button" className="btn btn-line" aria-label={details ? 'Zurück' : 'Einstellungen'} onClick={() => setDetails(!details)}>{details ? 'Zurück' : 'Einstellungen'}</button>
            </div>
            <div className="cookie-legal"><Link to="/impressum" onClick={showLegal}>Impressum</Link><Link to="/datenschutz" onClick={showLegal}>Datenschutz</Link></div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
