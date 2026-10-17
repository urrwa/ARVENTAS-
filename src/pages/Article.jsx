import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, Placeholder } from '../components/ui.jsx'
import { ARTICLES } from '../content/data.js'
import NotFound from './NotFound.jsx'

// Beitragsvorlage: Überschriften, Quellen, Annahmen und nächste Schritte. Entwurfsinhalte sind gekennzeichnet.
export default function Article() {
  const { slug } = useParams()
  const a = ARTICLES.find((x) => x.slug === slug)
  if (!a) return <NotFound />
  return (
    <>
      <Seo title={`${a.title} | Wissen | ARVENTAS`} description={a.teaser} />
      <PageHero crumb={<><Link to="/wissen">Wissen</Link> / {a.title}</>} title={a.title} lead={a.teaser}>
        <p style={{ marginTop: 20 }}><span className="tagd">Entwurf</span></p>
      </PageHero>
      <section className="sec ivory">
        <div className="wrap">
          <article className="art">
            <Placeholder title="Entwurf">Dieser Beitrag ist ein Entwurf und keine aktuelle Recherche. Quellen, Stand und redaktionelle Freigabe sind noch offen.</Placeholder>
            {a.sections.map((s) => (<div key={s.h}><h2>{s.h}</h2>{s.p.map((t) => <p key={t}>{t}</p>)}</div>))}
            <h2>Quellen und Annahmen</h2>
            <p>Quellen: noch zu ergänzen. Annahmen: werden im ausgearbeiteten Beitrag je Aussage benannt.</p>
            <h2>Nächster Schritt</h2>
            <p>{a.steps}</p>
            <div className="btn-row"><Btn to="/objektreport" variant="marine">Zum Objektreport</Btn><Btn to="/wissen" variant="line">Alle Beiträge</Btn></div>
          </article>
        </div>
      </section>
    </>
  )
}
