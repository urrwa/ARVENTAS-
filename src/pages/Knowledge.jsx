import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import KnowledgeTabs from '../components/KnowledgeTabs.jsx'
import { ARTICLES } from '../content/data.js'

export default function Knowledge() {
  const [cat, setCat] = useState('Alle')
  const list = ARTICLES.filter((a) => cat === 'Alle' || a.cat === cat)
  const lead = list[0]
  return (
    <>
      <Seo title="Wissen | ARVENTAS" description="Wissen und Marktinformationen: Off-Market verstehen, Immobilien bewerten, Potenziale einordnen." />
      <h1 className="sr-only">Wissen: Hinter die Fassade schauen.</h1>
      <KnowledgeTabs full cat={cat} setCat={setCat} />
      <section className="sec dark">
        <div className="wrap">
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
      <CtaBand image="/media/p/u-skyline-nacht.webp" />
    </>
  )
}
