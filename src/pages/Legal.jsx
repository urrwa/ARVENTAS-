import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Placeholder } from '../components/ui.jsx'
import { useConsent } from '../components/Consent.jsx'

// Vorbereitete Rechtsseiten. Inhalte müssen vor Veröffentlichung durch die Rechtsberatung geprüft und ergänzt werden.
export function Impressum() {
  return (
    <>
      <Seo title="Impressum | ARVENTAS" description="Impressum (vorbereitete Rechtsseite)." />
      <PageHero crumb="Impressum" title="Impressum" lead="Vorbereitete Rechtsseite. Die Angaben sind vor Veröffentlichung zu ergänzen." />
      <section className="sec dark"><div className="wrap legal">
        <Placeholder title="Angaben fehlen">Die folgenden Pflichtangaben liegen noch nicht als bestätigte Unternehmensdaten vor und werden nicht erfunden.</Placeholder>
        <h2>Anbieter</h2><p>[Firmierung, Rechtsform und Anschrift – ergänzen]</p>
        <h2>Vertretungsberechtigte</h2><p>[Namen der vertretungsberechtigten Personen – ergänzen]</p>
        <h2>Kontakt</h2><p>[Telefon und E-Mail – ergänzen]</p>
        <h2>Register und Steuernummern</h2><p>[Registergericht, Registernummer, Umsatzsteuer-ID – falls zutreffend ergänzen]</p>
        <h2>Aufsicht und Berufsrecht</h2><p>[Falls zutreffend: Erlaubnis, Aufsichtsbehörde – ergänzen]</p>
      </div></section>
    </>
  )
}
export function Datenschutz() {
  const { openSettings } = useConsent()
  return (
    <>
      <Seo title="Datenschutz | ARVENTAS" description="Datenschutzhinweise (vorbereitete Rechtsseite)." />
      <PageHero crumb="Datenschutz" title="Datenschutz" lead="Vorbereitete Rechtsseite. Rechtliche Prüfung und Ergänzung vor Veröffentlichung erforderlich." />
      <section className="sec dark"><div className="wrap legal">
        <Placeholder title="Entwurf">Dieser Text ist eine Gliederung ohne rechtliche Prüfung. Er stellt keine vollständige Datenschutzerklärung dar.</Placeholder>
        <h2>Verantwortlicher</h2><p>[Name und Kontaktdaten des Verantwortlichen – ergänzen]</p>
        <h2>Formulare und Anfragen</h2><p>In dieser Demo werden Formulareingaben nicht übertragen und nicht gespeichert. In der Live-Version werden Zwecke, Rechtsgrundlagen, Empfänger und Speicherdauer an dieser Stelle beschrieben. Marketingkommunikation erfolgt nur nach getrennter, freiwilliger Einwilligung.</p>
        <h2>Anbindung externer Systeme</h2><p>Geplante Systeme (CRM, Workflow- und Datenquellen) werden nur serverseitig angebunden. Der Browser erhält keine geheimen Schlüssel. [Beschreibung nach Freigabe ergänzen]</p>
        <h2>Cookies und Einwilligung</h2><p>Statistik- und Marketing-Dienste von Drittanbietern sind derzeit nicht eingebunden. Ihre Auswahl können Sie jederzeit ändern.</p>
        <p><button type="button" className="btn btn-marine" onClick={openSettings}>Cookie-Einstellungen öffnen</button></p>
        <h2>Ihre Rechte</h2><p>[Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit, Beschwerderecht – ergänzen]</p>
      </div></section>
    </>
  )
}
