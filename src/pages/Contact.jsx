import { useSearchParams, Link } from 'react-router-dom'
import RevealText from '../components/RevealText.jsx'
import Ambient from '../components/Ambient.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { SectionHead, Tabs, Placeholder, Faq } from '../components/ui.jsx'
import { CONTACT_FAQ } from '../content/data.js'
import { LeadForm, OWNER_FIELDS, PARTNER_FIELDS } from '../components/forms.jsx'
import { TEAM_PHOTOS } from '../content/team.js'
import { PROVIDED_PHOTOS } from '../content/providedPhotos.js'
import Photo from '../components/Photo.jsx'

export default function Contact() {
  const [sp] = useSearchParams()
  const region = sp.get('region') || ''
  const items = [
    { id: 'eig', label: 'Eigentümer' },
    { id: 'inv', label: 'Investoren' },
    { id: 'par', label: 'Partner' },
  ]
  return (
    <>
      <Seo title="Kontakt | ARVENTAS" description="Lassen Sie uns über Ihre Möglichkeiten sprechen: getrennte Zugänge für Eigentümer, Investoren und Partner." />
      <PageHero fadeOut blur image={TEAM_PHOTOS.conversation} crumb="Kontakt" title="Lassen Sie uns über Ihre Möglichkeiten sprechen." lead="Wählen Sie den passenden Zugang. Eigentümer, Investoren und Partner haben getrennte Wege." />
      <div className="cover-over">
      <section className="sec dark over-photo">
        <div className="wrap contact-grid">
          <div className="contact-intro">
            <RevealText className="contact-statement" text="Schreiben Sie uns. Wir antworten persönlich und vertraulich." />
            <hr className="hair" />
            <p className="rv">Wählen Sie den passenden Zugang und senden Sie uns Ihr Anliegen über das Formular.</p>
          </div>
          <div className="contact-card">
          {region && <p className="small" style={{ marginBottom: 20 }}>Vorgewählte Region: <b>{region}</b></p>}
          <Tabs label="Zugang wählen" items={items} panelClass="tabs-panel" renderPanel={(t) => (
            t.id === 'eig' ? <LeadForm key="eig" id="k-eig" fields={OWNER_FIELDS} submitLabel="Anfrage absenden" defaults={{ ort: region }} doneTitle="Danke für Ihre Anfrage (Demo)." doneText="In der Live-Version würden wir uns bei Ihnen melden." />
            : t.id === 'inv' ? (<div><h3 className="h3">Suchprofil für Investoren</h3><p>Für Investoren gibt es ein eigenes, mehrstufiges Formular.</p><div className="btn-row"><Link className="btn btn-marine" to={region ? `/investorenkreis?region=${encodeURIComponent(region)}` : '/investorenkreis'}>Suchprofil erstellen <span className="arr" aria-hidden="true">→</span></Link></div></div>)
            : <LeadForm key="par" id="k-par" fields={PARTNER_FIELDS} submitLabel="Anfrage absenden" doneTitle="Danke für Ihre Partneranfrage (Demo)." doneText="In der Live-Version würden wir uns bei Ihnen melden." />
          )} />
          </div>
        </div>
      </section>
      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap two">
          <div><SectionHead eyebrow="Termin" title="Termin anfragen." normal /><figure className="appointment-photo rv"><Photo image={PROVIDED_PHOTOS.timing} sizes="(max-width: 860px) 100vw, 50vw" /></figure><p className="rv">Einen Termin vereinbaren wir persönlich mit Ihnen. Eine Online-Buchung ist derzeit nicht eingerichtet; deshalb bitten wir um eine Terminanfrage über eines der Formulare.</p></div>
          <Placeholder title="Platzhalter – Kontaktdaten">Verifizierte Telefon-, E-Mail- und Unternehmensdaten werden vor Veröffentlichung ergänzt. Es werden keine Daten aus alten Website-Mockups übernommen.</Placeholder>
        </div>
      </section>
      <section className="sec dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Häufige Fragen" normal />
          <Faq items={CONTACT_FAQ} />
        </div>
      </section>
      </div>
    </>
  )
}
