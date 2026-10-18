import { useEffect, useRef } from 'react'
import Seo from '../components/Seo.jsx'
import HomeFilm from '../components/HomeFilm.jsx'
import HoverList from '../components/HoverList.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn } from '../components/ui.jsx'
import Letters from '../components/Letters.jsx'
import ScrollWords from '../components/ScrollWords.jsx'
import { Link } from 'react-router-dom'
import { Sec, IconGrid, StepsRow, Chain, Split, GoldLine } from '../components/blocks.jsx'
import { AUDIENCES, CHAIN, SERVICE_LIST, CLAIM } from '../content/site.js'

const PILLARS = [
  { icon: 'target', t: 'Strategisch', d: 'Wir denken über die Immobilie hinaus und fokussieren uns auf langfristiges Potenzial.' },
  { icon: 'chart', t: 'Datenbasiert', d: 'Entscheidungen basieren auf Marktinformationen, Bewertungslogik und strukturierter Analyse.' },
  { icon: 'network', t: 'Vernetzt', d: 'Analyse, Strategie und Vermarktung greifen ineinander und bilden ein System.' },
  { icon: 'diamond', t: 'Werteorientiert', d: 'Unser Fokus liegt auf Potenzialen, die nachhaltige Werte schaffen – für Menschen und Projekte.' },
]
const JOURNEY = [
  { icon: 'search', t: 'Den Markt verstehen', d: 'Wir analysieren Standorte, Nachfrage, Preisbewegungen und Marktdynamiken.' },
  { icon: 'building', t: 'Die Immobilie bewerten', d: 'Wir bewerten die Immobilie, ihren Wert, ihre Risiken und Entwicklungspotenziale.' },
  { icon: 'target', t: 'Die Chance erkennen', d: 'Wir unterscheiden relevantes Potenzial von Rauschen und definieren den Werttreiber.' },
  { icon: 'route', t: 'Die Strategie entwickeln', d: 'Wir entwickeln den richtigen Ansatz für Positionierung, Vermarktung und Entwicklung.' },
  { icon: 'send', t: 'Strukturiert vorgehen', d: 'Wir begleiten die nächsten Schritte mit Klarheit und einer strukturierten Basis.' },
]
const FOR = ['Klarere Strukturen für komplexe Entscheidungen.', 'Bessere Priorisierung von Chancen und Risiken.', 'Marktverständnis als Grundlage.', 'Strategien, die Wachstum schaffen.', 'Entwicklungspotenziale erkennen und nutzen.']

// Redaktioneller Abschnitt auf hellem Grund: Beschriftung, großer Blocksatz mit Wort-Reveal, kleines Bild mit Kurztext.
// Verstreute Bildkacheln fügen sich beim Scrollen zu einem Raster zusammen.
const GAL = [[0, 150], [1, -40], [2, 210], [3, 20], [4, -90], [5, 120], [6, -20], [7, 190]]
function Gallery() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', 1); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect(), vh = window.innerHeight
      el.style.setProperty('--p', Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.75))).toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); raf && cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="gal-sec" aria-hidden="true">
      <div className="wrap">
        <div className="gal" ref={ref}>
          {GAL.map(([i, dy]) => <div key={i} className="gal-t" style={{ '--dy': `${dy}px` }}><img src={`/media/gal-${i + 1}.webp`} alt="" loading="lazy" decoding="async" /></div>)}
        </div>
      </div>
    </section>
  )
}

function Editorial() {
  return (
    <section className="edi" aria-label="Über ARVENTAS">
      <div className="wrap">
        <div className="edi-row">
          <p className="edi-label">(Über uns)</p>
          <ScrollWords className="edi-big ed" text="ARVENTAS ist kein klassisches Immobilienunternehmen. Wir verbinden Marktverständnis, Bewertung, strategische Analyse, Vermarktung und Entwicklung zu einem klaren System für bessere Immobilienentscheidungen." />
        </div>
        <div className="edi-row2">
          <div className="edi-img rv"><img src="/media/buero-abend-2.webp" alt="" loading="lazy" decoding="async" /></div>
          <p className="edi-small ed rv">Wir denken über die Immobilie hinaus und fokussieren uns auf langfristiges Potenzial.</p>
          <Link to="/ueber-uns" className="edi-btn rv"><span>Über uns</span><i aria-hidden="true">→</i></Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo title={`ARVENTAS | ${CLAIM}`} description="ARVENTAS verbindet Marktverständnis, Immobilienbewertung, Strategie und intelligente Vermarktung für fundierte Immobilienentscheidungen." />
      <HomeFilm />

      <Editorial />

      <Gallery />

      <Sec tone="light" className="feat" eyebrow="Wofür ARVENTAS steht" title="Struktur für bessere Immobilienentscheidungen."
        lead="ARVENTAS steht für einen klaren, strukturierten und strategischen Ansatz in der Immobilienentwicklung. Wir betrachten Immobilien nicht isoliert, sondern verbinden Markt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsrahmen.">
        <IconGrid items={PILLARS} cols={4} numbered />
      </Sec>

      <Sec tone="light" eyebrow="Kundenjourney" title="Vom Marktsignal zur klaren Strategie.">
        <StepsRow items={JOURNEY} />
      </Sec>

      <Sec tone="light" className="big-sec">
        <h2 className="big-h ed"><Letters text="Fünf Leistungen." per={30} /><span className="r"><Letters text="Ein System." per={30} delay={500} /></span></h2>
        <HoverList items={SERVICE_LIST.map((s) => ({ t: s.t, d: s.card, img: s.img, icon: s.icon, to: `/leistungen/${s.slug}` }))} />
        <div className="btn-row"><Btn to="/leistungen" variant="marine">Leistungen entdecken</Btn></div>
      </Sec>

      <Sec tone="light" eyebrow="Leistungen greifen ineinander" title="Nicht einzelne Maßnahmen. Ein verbundenes System."
        lead="Wir verbinden Markt, Objekt, Bewertung, Strategie und Vermarktung zu einem klaren Entscheidungsweg. So entstehen aus Informationen bessere Entscheidungen.">
        <Chain items={CHAIN} />
      </Sec>

      <Sec tone="light" eyebrow="Für wen wir arbeiten" title="Für Immobilienentscheider, die Klarheit brauchen.">
        <ul className="gl big rv">{FOR.map((x) => <li key={x}>{x}</li>)}</ul>
        <GoldLine>Wir sehen nicht nur heute. Wir bauen Potenziale für morgen.</GoldLine>
        <IconGrid items={AUDIENCES} cols={5} />
      </Sec>

      <CtaBand image="/media/cta-abend-1.webp" />
    </>
  )
}
