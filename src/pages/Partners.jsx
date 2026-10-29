import Seo from '../components/Seo.jsx'
import Brand from '../components/Brand.jsx'
import PageHero from '../components/PageHero.jsx'
import ParallaxCards from '../components/ParallaxCards.jsx'
import { Btn, SectionHead } from '../components/ui.jsx'
import { SimpleTimeline } from '../components/ProcessTimeline.jsx'
import { LeadForm, PARTNER_FIELDS } from '../components/forms.jsx'
import { PARTNER_PROCESS } from '../content/data.js'
import { EDITORIAL_PHOTOS } from '../content/editorialPhotos.js'

export default function Partners() {
  return (
    <>
      <Seo title="Partnernetzwerk | ARVENTAS" description="Kompetenzen verbinden, Zusammenarbeit gestalten: Partneranfrage für geeignete Immobilienunternehmen, Verwalter und fachliche Multiplikatoren." />
      <PageHero fadeOut blur image="/media/p/partner-hero.webp" crumb="Partner" title="Kompetenzen verbinden. Zusammenarbeit gestalten." lead="Für geeignete Immobilienunternehmen, Verwalter und fachliche Multiplikatoren.">
        <div className="btn-row"><Btn href="#anfrage">Partnerschaft anfragen</Btn></div>
      </PageHero>

      <section className="sec dark over-photo pc-sec">
        <div className="wrap">
          <ParallaxCards inside items={[
            { title: 'Welche Partner angesprochen werden', text: 'Geeignete Immobilienunternehmen, Verwalter und fachliche Multiplikatoren, die Eigentümer oder Investoren betreuen.', img: '/media/p/partner-fachleute.webp', ratio: '4 / 5', speed: 1 },
            { title: <>Was <Brand /> ergänzt</>, text: 'Zugang, fundierte Analyse, Matching und persönliche Transaktionsbegleitung.', img: '/media/p/partner-ergaenzung.webp', ratio: '3 / 4', speed: 1.8 },
            { title: 'Wie Zuständigkeiten geklärt werden', text: 'Rollen und Schnittstellen werden vor einer Zusammenarbeit besprochen und festgehalten. Vergütungsfragen werden individuell geklärt; es gibt keine automatischen Vergütungsversprechen.', img: EDITORIAL_PHOTOS.partnerRoles.src, ratio: '21 / 9', speed: 0.7, wide: true },
          ]} />
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="So beginnt die Zusammenarbeit" title="Anfrage, Kennenlernen, Rollen, Vereinbarung." normal />
          <SimpleTimeline steps={PARTNER_PROCESS} />
        </div>
      </section>

      <section className="sec dark" id="anfrage">
        <div className="wrap two">
          <div><SectionHead eyebrow="Partneranfrage" title="Partnerschaft anfragen." lead="Beschreiben Sie kurz Ihr Unternehmen und die gewünschte Zusammenarbeit." /></div>
          <div className="form-panel">
            <LeadForm id="par" fields={PARTNER_FIELDS} submitLabel="Anfrage absenden" doneTitle="Danke für Ihre Partneranfrage (Demo)." doneText="In der Live-Version würden wir uns bei Ihnen melden, um ein Kennenlernen zu vereinbaren." />
          </div>
        </div>
      </section>
    </>
  )
}
