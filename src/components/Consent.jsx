import { createContext, useContext, useEffect, useRef, useState } from 'react'

const Ctx = createContext({ openSettings() {}, consent: { necessary: true, statistics: false, marketing: false } })
export const useConsent = () => useContext(Ctx)
const KEY = 'arventas-consent'

// Einwilligungssteuerung. Es sind keine Analyse- oder Werbefunktionen von Drittanbietern eingebunden;
// Statistik und Marketing bleiben daher technisch inaktiv, bis Freigabe und Umsetzung vorliegen.
export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState({ necessary: true, statistics: false, marketing: false })
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(consent)
  const box = useRef(null)
  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) setConsent({ ...s, necessary: true }) } catch (e) { /* Speicher nicht verfügbar */ }
  }, [])
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    box.current && box.current.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && box.current) {
        const f = box.current.querySelectorAll('button, input')
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev && prev.focus && prev.focus() }
  }, [open])
  const save = (c) => {
    const v = { ...c, necessary: true }
    setConsent(v); setOpen(false)
    try { localStorage.setItem(KEY, JSON.stringify(v)) } catch (e) { /* ignorieren */ }
  }
  return (
    <Ctx.Provider value={{ consent, openSettings: () => { setDraft(consent); setOpen(true) } }}>
      {children}
      {open && (
        <div className="dlg-bg" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className="dlg" role="dialog" aria-modal="true" aria-labelledby="cookie-h" ref={box} tabIndex={-1}>
            <h2 id="cookie-h">Cookie-Einstellungen</h2>
            <p className="small">Diese Demo setzt keine Statistik- oder Marketing-Dienste von Drittanbietern ein. Ihre Auswahl wird für eine spätere technische Einwilligungsumsetzung vorbereitet.</p>
            <div className="row"><div><b>Notwendig</b><p>Für den Betrieb der Seite erforderlich. Immer aktiv.</p></div><input type="checkbox" checked disabled aria-label="Notwendig (immer aktiv)" /></div>
            <div className="row"><div><b>Statistik</b><p>Derzeit nicht eingebunden.</p></div><input type="checkbox" checked={draft.statistics} onChange={(e) => setDraft({ ...draft, statistics: e.target.checked })} aria-label="Statistik" /></div>
            <div className="row"><div><b>Marketing</b><p>Derzeit nicht eingebunden.</p></div><input type="checkbox" checked={draft.marketing} onChange={(e) => setDraft({ ...draft, marketing: e.target.checked })} aria-label="Marketing" /></div>
            <div className="btn-row">
              <button type="button" className="btn btn-marine" onClick={() => save(draft)}>Auswahl speichern</button>
              <button type="button" className="btn btn-line" style={{ color: 'var(--marine)' }} onClick={() => save({ statistics: false, marketing: false })}>Nur Notwendige</button>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
