import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { ARTICLES, CATEGORIES } from '../content/data.js'

export default function Knowledge() {
  const [cat, setCat] = useState('Alle')
  const list = ARTICLES.filter((a) => cat === 'Alle' || a.cat === cat)
  const lead = list[0]
  return (
    <>
      <Seo title="Wissen | ARVENTAS" description="Wissen und Marktinformationen: Off-Market verstehen, Immobilien bewerten, Potenziale einordnen." />
      <PageHero image="/media/notizbuch.webp" crumb="Wissen" title="Hinter die Fassade schauen." lead="Off-Market verstehen. Immobilien bewerten. Potenziale einordnen." />
      <section className="sec ivory">
        <div className="wrap">
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
                return <img key={c} className={cat === c ? 'on' : ''} src={a ? a.img : '/media/notizbuch.webp'} alt="" loading="lazy" />
              })}
            </div>
          </div>
          {lead ? (
            <>
              <ul className="alist">
                {list.map((a) => (
                  <li key={a.slug}><Link to={`/wissen/${a.slug}`}><small>{a.cat}</small><h3>{a.title}</h3><span className="tagd" style={{ margin: 0 }}>Entwurf</span></Link></li>
                ))}
              </ul>
            </>
          ) : (
            <p>In dieser Kategorie sind noch keine Beiträge ausgearbeitet. Wir zeigen nur Inhalte, die tatsächlich erarbeitet wurden.</p>
          )}
          <p className="small muted" style={{ marginTop: 32 }}>Alle Beiträge sind Entwürfe und stellen keine aktuelle Recherche und keine Marktdaten dar. Veröffentlichungsdaten und Expertenzitate werden erst nach redaktioneller Freigabe ergänzt.</p>
        </div>
      </section>
    </>
  )
}
