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
      <PageHero image="/media/notizbuch.jpg" crumb="Wissen" title="Hinter die Fassade schauen." lead="Off-Market verstehen. Immobilien bewerten. Potenziale einordnen." />
      <section className="sec ivory">
        <div className="wrap">
          <div className="cats" role="group" aria-label="Kategorien">
            {CATEGORIES.map((c) => <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          {lead ? (
            <>
              <Link to={`/wissen/${lead.slug}`} className="know-main rv" style={{ marginBottom: 36, display: 'block' }}>
                <img src={lead.img} alt="" loading="lazy" /><div className="t"><span className="tagd">Entwurf</span><h3>{lead.title}</h3><p style={{ color: 'var(--ivory)', margin: '8px 0 0', maxWidth: '48ch' }}>{lead.teaser}</p></div>
              </Link>
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
