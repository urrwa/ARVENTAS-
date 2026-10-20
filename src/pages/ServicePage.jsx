import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import JourneySplit from '../components/JourneySplit.jsx'
import StackRows from '../components/StackRows.jsx'
import { Btn } from '../components/ui.jsx'
import { Sec, Chain, Questions, GoldLine, Split } from '../components/blocks.jsx'
import { SERVICES } from '../content/site.js'
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
      <PageHero image={s.hero} crumb={<><Link to="/leistungen">Leistungen</Link> / {s.t}</>} eyebrow={s.t} title={s.title}>
        <div className="btn-row"><Btn to={q}>{s.cta}</Btn></div>
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

      <Sec eyebrow={s.areasEyebrow} title={s.areasTitle}>
        <StackRows items={s.areas} />
      </Sec>

      <JourneySplit items={s.steps} label={s.stepsEyebrow} title={s.stepsTitle} />
      <Sec>
        <GoldLine>{s.stepsLine}</GoldLine>
      </Sec>

      <Sec eyebrow={s.questionsEyebrow} title={s.questionsTitle}>
        <Questions items={s.questions} />
      </Sec>

      <Sec eyebrow={s.resultEyebrow} title={s.resultTitle}>
        <StackRows items={s.results} />
        <GoldLine>{s.resultLine}</GoldLine>
        {s.note && <p className="small muted">{s.note}</p>}
      </Sec>

      <CtaBand image={s.hero === '/media/real/buero-sonnenuntergang.webp' ? '/media/real/buero-daemmerung.webp' : '/media/real/buero-sonnenuntergang.webp'} title={s.ctaTitle} text={s.ctaText} btn={s.ctaBtn} to={q} />
    </>
  )
}
