import { Link } from 'react-router-dom'
import { ARTICLES, CATEGORIES } from '../content/data.js'
import Photo from './Photo.jsx'

// Kategorien als weiße Liste links über einem großen Foto (Vorbild Marketplace): Beim Überfahren öffnet sich die Zeile zum Foto,
// Text wird weiß, ein Pfeil erscheint, das Foto wechselt. Gilt für Startseite und Wissen-Seite.
const FALLBACK = { Entwicklungspotenziale: '/media/p/h-entwicklung.webp' }
const article = (c) => (c === 'Alle' ? ARTICLES[0] : ARTICLES.find((x) => x.cat === c))
const pic = (c, full) => { if (full && c === 'Alle') return '/media/p/u-eingang-stein.webp'; const a = article(c); return a ? a.img : FALLBACK[c] || '/media/p/ablauf-bibliothek.webp' }

export default function KnowledgeTabs({ cat, setCat, full, base = 'Alle', images = {} }) {
  return (
    <div className={'kl' + (full ? ' kl-full' : '')} onMouseLeave={() => setCat(base)}>
      <div className="kl-img" aria-hidden="true">
        {CATEGORIES.map((c) => <Photo key={c} className={cat === c ? 'on' : ''} image={images[c] || pic(c, full)} />)}
      </div>
      <ol className="kl-list" aria-label="Kategorien">
        {CATEGORIES.map((c, i) => {
          const a = article(c)
          const inner = <><small>0{i + 1}</small><span>{c}</span><i aria-hidden="true">→</i></>
          const on = cat === c
          const common = { className: `kl-row${on ? ' on' : ''}`, onMouseEnter: () => setCat(c), onFocus: () => setCat(c) }
          return (
            <li key={c}>
              <Link to={c === 'Alle' ? '/wissen' : a ? `/wissen/${a.slug}` : `/wissen?thema=${encodeURIComponent(c)}#beitraege`} {...common}>{inner}</Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
