import Photo from './Photo.jsx'
import { useRef, useState } from 'react'
import { Btn } from './ui.jsx'

// Aufklapp-Liste: Die aktive Zeile öffnet sich zu einem großen Bild mit Titel und Detailkarte, die anderen bleiben schmale Zeilen mit Vorschaubild (Vorbild Showcase-Accordion).
const IMGS = ['real/baulucke', 'real/modell-skyline', 'real/eingang-travertin', 'real/glasfassaden', 'real/besprechungsraum']

export default function CaseAccordion({ items }) {
  const [open, setOpen] = useState(0)
  const tm = useRef(0)
  const hover = (i) => { clearTimeout(tm.current); tm.current = setTimeout(() => setOpen(i), 160) }
  return (
    <div className="ca" role="list">
      {items.map((it, i) => {
        const on = open === i
        const img = it.img || `/media/${IMGS[i % IMGS.length]}.webp`
        return (
          <article key={it.t} role="listitem" className={`ca-item${on ? ' on' : ''}`} onMouseEnter={() => hover(i)} onMouseLeave={() => clearTimeout(tm.current)}>
            <button type="button" className="ca-row" aria-expanded={on} onClick={() => setOpen(i)} onFocus={() => setOpen(i)}>
              <span className="ca-n">({String(i + 1).padStart(2, '0')})</span>
              <span className="ca-t">{it.t}</span>
              <span className="ca-plus" aria-hidden="true" />
              <Photo className="ca-thumb" src={img} alt="" loading="lazy" decoding="async" />
            </button>
            <div className="ca-panel">
              <div className="ca-inner">
                <div className="ca-big">
                  <Photo src={img} alt="" loading="lazy" decoding="async" />
                  <span className="ca-card">
                    <b>{it.t}</b>
                    <p>{it.d}</p>
                    <Btn to={`/kontakt?art=${encodeURIComponent('Strategiegespräch')}`} variant="gold">Anfrage</Btn>
                  </span>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
