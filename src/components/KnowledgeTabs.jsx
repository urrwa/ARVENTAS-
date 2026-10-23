import { Link } from 'react-router-dom'
import { ARTICLES, CATEGORIES } from '../content/data.js'

// Kategorien als Aufklapp-Liste links, großes Foto im Rahmen rechts (Wissen-Seite und Startseite).
export default function KnowledgeTabs({ cat, setCat }) {
  return (
    <div className="ktabs">
            <div className="ktabs-list" role="tablist" aria-label="Kategorien">
              {CATEGORIES.map((c, ci) => {
                const a = c === 'Alle' ? ARTICLES[0] : ARTICLES.find((x) => x.cat === c)
                const on = cat === c
                return (
                  <div key={c} className={`kt${on ? ' on' : ''}`}>
                    <button type="button" role="tab" aria-selected={on} onClick={() => setCat(c)} onMouseEnter={() => setCat(c)}><span className="kt-no">0{ci + 1}</span>{c}</button>
                    <div className="kt-body"><div className="kt-in">
                      <p>{a ? a.teaser : 'In dieser Kategorie sind noch keine Beiträge ausgearbeitet.'}</p>
                      {a && <Link to={`/wissen/${a.slug}`} className="kt-link" tabIndex={on ? 0 : -1}>Beitrag lesen <span aria-hidden="true">→</span></Link>}
                    </div></div>
                  </div>
                )
              })}
            </div>
            <div className="kframe" aria-hidden="true">
              <span className="kf-cap">{cat}</span>
              {CATEGORIES.map((c) => {
                const a = c === 'Alle' ? ARTICLES[0] : ARTICLES.find((x) => x.cat === c)
                return <img key={c} className={cat === c ? 'on' : ''} src={a ? a.img : '/media/p/ma.res.3.webp'} alt="" loading="lazy" />
              })}
            </div>
          </div>
  )
}
