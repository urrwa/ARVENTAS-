import { Link } from 'react-router-dom'
import { ARTICLES, CATEGORIES } from '../content/data.js'

// Kategorien als weiße Liste links über einem großen Foto (Vorbild Marketplace): Beim Überfahren öffnet sich die Zeile zum Foto,
// Text wird weiß, ein Pfeil erscheint, das Foto wechselt. Gilt für Startseite und Wissen-Seite.
const FALLBACK = { Kapitalanlage: '/media/p/zugang-investor.webp', Entwicklungspotenziale: '/media/p/h-entwicklung.webp', Marktinformationen: '/media/p/ablauf-luftbild.webp' }
const article = (c) => (c === 'Alle' ? ARTICLES[0] : ARTICLES.find((x) => x.cat === c))
const pic = (c) => { const a = article(c); return a ? a.img : FALLBACK[c] || '/media/p/ablauf-bibliothek.webp' }

export default function KnowledgeTabs({ cat, setCat, full }) {
  return (
    <div className={'kl' + (full ? ' kl-full' : '')} onMouseLeave={() => setCat('Alle')}>
      <div className="kl-img" aria-hidden="true">
        {CATEGORIES.map((c) => <img key={c} className={cat === c ? 'on' : ''} src={pic(c)} alt="" loading="lazy" decoding="async" />)}
      </div>
      <ol className="kl-list" aria-label="Kategorien">
        {CATEGORIES.map((c, i) => {
          const a = article(c)
          const inner = <><small>0{i + 1}</small><span>{c}</span><i aria-hidden="true">→</i></>
          const on = cat === c
          const common = { className: `kl-row${on ? ' on' : ''}`, onMouseEnter: () => setCat(c), onFocus: () => setCat(c) }
          return (
            <li key={c}>
              {a ? <Link to={`/wissen/${a.slug}`} {...common}>{inner}</Link> : <button type="button" {...common} onClick={() => setCat(c)}>{inner}</button>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
