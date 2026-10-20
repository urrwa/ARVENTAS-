import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Icon from '../components/Icon.jsx'
import { Sec, Ring } from '../components/blocks.jsx'
import { LeadForm } from '../components/forms.jsx'
import { CONTACT_TYPES } from '../content/site.js'

const FIELDS = [
  { name: 'name', label: 'Vorname / Nachname', required: true, auto: 'name' },
  { name: 'firma', label: 'Unternehmen', auto: 'organization' },
  { name: 'email', label: 'E-Mail-Adresse', type: 'email', required: true, auto: 'email' },
  { name: 'phone', label: 'Telefonnummer', type: 'tel', auto: 'tel' },
  { name: 'art', label: 'Art der Anfrage', type: 'select', options: CONTACT_TYPES, required: true },
  { name: 'nachricht', label: 'Nachricht', type: 'textarea', required: true, help: 'Beschreiben Sie kurz Ausgangslage, Ziel und mögliche Immobilie, Standort oder Projekt. Bitte keine vertraulichen Adressen angeben.' },
]

export default function Contact() {
  const [sp] = useSearchParams()
  const art = CONTACT_TYPES.includes(sp.get('art')) ? sp.get('art') : ''
  return (
    <>
      <Seo title="Kontakt | ARVENTAS" description="Lassen Sie uns Immobilienpotenziale klarer einordnen: Anfrage senden oder Strategiegespräch anfragen." />
      <PageHero tall fadeOut image="/media/real/besprechungsraum.webp" eyebrow="Kontakt" title="Lassen Sie uns Immobilienpotenziale klarer einordnen."
        lead="Strukturierte Analyse, klare Einordnung." />
      <Sec id="anfrage" className="gstage">
        <div className="contact-grid2">
          <div className="cbox rv">
            <p className="eyebrow">Anfrage senden</p>
            <h2 className="h3">Worum geht es bei Ihrer Anfrage?</h2>
            <p>Teilen Sie uns kurz mit, worum es geht. Wir prüfen Ihre Anfrage und melden uns mit einer ersten Einschätzung.</p>
            <LeadForm key={art} id="k-anfrage" fields={FIELDS} defaults={{ art }} submitLabel="Anfrage absenden" doneTitle="Danke für Ihre Anfrage (Demo)." doneText="In der Live-Version würden wir uns bei Ihnen melden." />
          </div>
        </div>
      </Sec>
      <Sec id="direkt">
        <div className="direct-wrap">
        <aside className="direct" aria-label="Direkter Kontakt">
            <p className="eyebrow">Direkter Kontakt</p>
            <h2 className="h3">Sie erreichen ARVENTAS direkt.</h2>
            <ul className="clist">
              <li><Ring name="mail" /><span><b>E-Mail</b>Wird vor Veröffentlichung ergänzt</span></li>
              <li><Ring name="phone" /><span><b>Telefon</b>Wird vor Veröffentlichung ergänzt</span></li>
              <li><Ring name="pin" /><span><b>Standort</b>Deutschland</span></li>
              <li><Ring name="clock" /><span><b>Erreichbarkeit</b>Wird vor Veröffentlichung ergänzt</span></li>
            </ul>
            <p className="small muted">Verifizierte Kontaktdaten werden vor Veröffentlichung ergänzt. Es werden keine Daten aus Entwurfsvorlagen übernommen.</p>
          </aside>
        </div>
      </Sec>
      <CtaBand image="/media/real/buero-daemmerung.webp" title="Bereit für eine strukturierte Einschätzung?" text="Senden Sie uns Ihre Anfrage und lassen Sie uns prüfen, welches Potenzial in Ihrem Markt, Objekt oder Projekt steckt." btn="Anfrage senden" to="/kontakt#anfrage" />
    </>
  )
}
