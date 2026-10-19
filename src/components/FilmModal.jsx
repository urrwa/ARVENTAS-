import { useEffect, useRef } from 'react'

// Film im Fenster (Vorbild Rivos): Das Gebäude entsteht aus der Skizze zum Render. Öffnet über den Knopf im Kopf, schließt mit dem Kreuz.
// Film und Standbild sind mit Higgsfield aus demselben Gebäude erzeugt.
export default function FilmModal({ onClose }) {
  const vid = useRef(null), box = useRef(null)
  useEffect(() => {
    const v = vid.current
    v.src = v.canPlayType('video/mp4; codecs="avc1.42E01E"') ? '/media/haus-entsteht.mp4' : '/media/haus-entsteht.webm'
    const p = v.play(); p && p.catch(() => {})
    const key = (e) => { if (e.key === 'Escape') onClose() }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', key)
    box.current.querySelector('button').focus()
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', key) }
  }, [onClose])
  return (
    <div className="fm" role="dialog" aria-modal="true" aria-label="Vom Entwurf zum Ergebnis" onClick={onClose}>
      <div className="fm-panel" ref={box} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="fm-x" onClick={onClose} aria-label="Schließen"><span /><span /></button>
        <video ref={vid} className="fm-vid" poster="/media/haus-skizze.webp" muted loop playsInline aria-label="Das Gebäude entsteht aus der Skizze" />
      </div>
    </div>
  )
}
