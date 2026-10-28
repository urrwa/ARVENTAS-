import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import KnowledgeTabs from '../components/KnowledgeTabs.jsx'
import { CATEGORIES } from '../content/data.js'
import { KNOWLEDGE_CATEGORY_PHOTOS } from '../content/knowledgePhotos.js'

export default function Knowledge() {
  const [sp] = useSearchParams()
  const fromUrl = CATEGORIES.includes(sp.get('thema')) ? sp.get('thema') : 'Alle'
  const [cat, setCat] = useState(fromUrl)
  // Aufruf von der Startseite oder per Link: Kategorie aus der Adresse übernehmen und zur Beitragsliste springen.
  useEffect(() => {
    setCat(fromUrl)
    if (window.location.hash === '#beitraege') setTimeout(() => { const el = document.getElementById('beitraege'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 80)
  }, [fromUrl])
  return (
    <>
      <Seo title="Wissen | ARVENTAS" description="Wissen und Marktinformationen: Off-Market verstehen, Immobilien bewerten, Potenziale einordnen." />
      <h1 className="sr-only">Wissen: Hinter die Fassade schauen.</h1>
      <KnowledgeTabs full cat={cat} setCat={setCat} base={fromUrl} images={KNOWLEDGE_CATEGORY_PHOTOS} />
      <section className="sec dark" id="beitraege">
        <div className="wrap">
          <p className="small muted">Alle Beiträge sind Entwürfe und stellen keine aktuelle Recherche und keine Marktdaten dar. Veröffentlichungsdaten und Expertenzitate werden erst nach redaktioneller Freigabe ergänzt.</p>
        </div>
      </section>
      <CtaBand image="/media/p/u-skyline-nacht.webp" />
    </>
  )
}
