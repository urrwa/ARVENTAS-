import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, IconGrid, StepsRow, Chain, Questions, GoldLine, Split } from '../components/blocks.jsx'
import { SERVICES, CHAIN } from '../content/site.js'
import NotFound from './NotFound.jsx'

// Einheitliche Vorlage für die fünf Leistungsseiten.
export default function ServicePage() {
  const { slug } = useParams()
  const s = SERVICES[slug]
  if (!s) return <NotFound />
  const q = `/kontakt?art=${encodeURIComponent(s.t)}`
  return (
    <>
      <Seo title={`${s.t} | ARVENTAS`} description={s.lead[0]} />
      <PageHero image={s.hero} crumb={<><Link to="/leistungen">Leistungen</Link> / {s.t}</>} eyebrow={s.t} title={s.title} lead={s.lead[0]}>
        <p className="hero-sub">{s.lead[1]}</p>
        <div className="btn-row"><Btn to={q}>{s.cta}</Btn><Btn to="/kontakt?art=Strategiegespräch" variant="line">Strategiegespräch anfragen</Btn></div>
      </PageHero>

      <Sec eyebrow={s.whyEyebrow} title={s.whyTitle}>
        <div className="why">
          <div>
            {s.why.map((t) => <p key={t} className="rv">{t}</p>)}
            <GoldLine>{s.whyLine}</GoldLine>
          </div>
          <Chain items={s.factors} />
        </div>
      </Sec>

      <Sec eyebrow={s.areasEyebrow} title={s.areasTitle} lead={s.areasLead}>
        <IconGrid items={s.areas} cols={s.areas.length} />
      </Sec>

            <Sec eyebrow={s.stepsEyebrow} title={s.stepsTitle} lead={s.stepsLead}>
        <StepsRow items={s.steps} />
        <GoldLine>{s.stepsLine}</GoldLine>
      </Sec>

      <Sec eyebrow={s.questionsEyebrow} title={s.questionsTitle}>
        <Questions items={s.questions} />
      </Sec>

      <Sec eyebrow={s.resultEyebrow} title={s.resultTitle} lead={s.resultLead}>
        <IconGrid items={s.results} cols={5} />
        <GoldLine>{s.resultLine}</GoldLine>
        {s.note && <p className="small muted">{s.note}</p>}
      </Sec>

      <Sec eyebrow="Im System" title={s.systemTitle} lead={s.systemText}>
        <Chain items={CHAIN} active={s.active} />
      </Sec>

      <CtaBand image={s.hero === '/media/cta-abend-1.webp' ? '/media/cta-abend-2.webp' : '/media/cta-abend-1.webp'} title={s.ctaTitle} text={s.ctaText} btn={s.ctaBtn} to={q} />
    </>
  )
}
