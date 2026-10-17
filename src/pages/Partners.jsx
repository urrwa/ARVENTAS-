import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Placeholder } from '../components/ui.jsx'
import { SimpleTimeline } from '../components/ProcessTimeline.jsx'
import { LeadForm, PARTNER_FIELDS } from '../components/forms.jsx'
import { PARTNER_PROCESS } from '../content/data.js'

export default function Partners() {
  return (
    <>
      <Seo title="Partnernetzwerk | ARVENTAS" description="Kompetenzen verbinden, Zusammenarbeit gestalten: Partneranfrage für geeignete Immobilienunternehmen, Verwalter und fachliche Multiplikatoren." />
      <PageHero crumb="Partner" title="Kompetenzen verbinden. Zusammenarbeit gestalten." lead="Für geeignete Immobilienunternehmen, Verwalter und fachliche Multiplikatoren.">
        <div className="btn-row"><Btn href="#anfrage">Partnerschaft anfragen</Btn></div>
      </PageHero>

      <section className="sec ivory">
        <div className="wrap">
          <div className="cols3 rv">
            <div><h3 className="h3">Welche Partner angesprochen werden</h3><p>Geeignete Immobilienunternehmen, Verwalter und fachliche Multiplikatoren, die Eigentümer oder Investoren betreuen.</p></div>
            <div><h3 className="h3">Was ARVENTAS ergänzt</h3><p>Zugang, fundierte Analyse, Matching und persönliche Transaktionsbegleitung.</p></div>
            <div><h3 className="h3">Wie Zuständigkeiten geklärt werden</h3><p>Rollen und Schnittstellen werden vor einer Zusammenarbeit besprochen und festgehalten. Vergütungsfragen werden individuell geklärt; es gibt keine automatischen Vergütungsversprechen.</p></div>
          </div>
        </div>
      </section>

      <section className="sec ivory" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="So beginnt die Zusammenarbeit" title="Anfrage, Kennenlernen, Rollen, Vereinbarung." normal />
          <SimpleTimeline steps={PARTNER_PROCESS} />
          <div style={{ marginTop: 40, maxWidth: 720 }}><Placeholder title="Partnerlogos">Partnerlogos erscheinen nur aus freigegebenen Originaldateien und erst nach Bestätigung der Beziehung und Nutzungsfreigabe. Derzeit werden keine Partner genannt.</Placeholder></div>
        </div>
      </section>

      <section className="sec dark" id="anfrage">
        <div className="wrap two">
          <div><SectionHead eyebrow="Partneranfrage" title="Partnerschaft anfragen." lead="Beschreiben Sie kurz Ihr Unternehmen und die gewünschte Zusammenarbeit." /></div>
          <div style={{ background: 'var(--ivory)', color: 'var(--ink)', padding: 'clamp(20px,3vw,40px)' }} className="on-ivory">
            <LeadForm id="par" fields={PARTNER_FIELDS} submitLabel="Anfrage absenden" doneTitle="Danke für Ihre Partneranfrage (Demo)." doneText="In der Live-Version würden wir uns bei Ihnen melden, um ein Kennenlernen zu vereinbaren." />
          </div>
        </div>
      </section>
    </>
  )
}
