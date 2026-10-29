import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { useConsent } from '../components/Consent.jsx'

function CompanyAddress() {
  return <address className="legal-address"><strong>ARVENTAS GmbH</strong><br />Am Grund 11<br />86489 Deisenhausen<br /><span>Deutschland</span><br /><a href="mailto:info@arventas.de">info@arventas.de</a></address>
}

export function Impressum() {
  return (
    <>
      <Seo title="Impressum | ARVENTAS" description="Unternehmens- und Kontaktangaben der ARVENTAS GmbH, Am Grund 11, 86489 Deisenhausen." />
      <PageHero crumb="Impressum" title="Impressum" lead="Unternehmens- und Kontaktangaben." />
      <section className="sec dark"><div className="wrap legal legal-document">
        <p className="legal-date">Stand: 30. Oktober 2026</p>
        <aside className="legal-note"><strong>Entwurf zur Abstimmung</strong><p>Die bestätigten Unternehmensdaten sind eingetragen. Eine weitere unmittelbar erreichbare Kontaktmöglichkeit sowie gegebenenfalls erforderliche Steuer-, Erlaubnis- und Aufsichtsangaben sind noch zu bestätigen.</p></aside>
        <h2>Angaben gemäß § 5 DDG</h2>
        <CompanyAddress />
        <h2>Vertretung</h2>
        <p>Geschäftsführer: Ioannis Vozicis, Esref Yavuz und Roman Tränkle.</p>
        <h2>Handelsregister</h2>
        <dl className="legal-facts"><div><dt>Registergericht</dt><dd>Amtsgericht Memmingen</dd></div><div><dt>Registernummer</dt><dd>HRB 22526</dd></div></dl>
        <h2>Kontakt</h2>
        <p><span>E-Mail:</span> <a href="mailto:info@arventas.de">info@arventas.de</a><br /><span>Website:</span> <a href="https://www.arventas.de">www.arventas.de</a></p>
        <p>Für eine tatsächliche Kontaktaufnahme nutzen Sie bitte die angegebene E-Mail-Adresse. Die Website-Formulare sind derzeit als Demo gekennzeichnet und versenden keine Anfragen.</p>
      </div></section>
    </>
  )
}

export function Datenschutz() {
  const { openSettings } = useConsent()
  return (
    <>
      <Seo title="Datenschutz | ARVENTAS" description="Datenschutzhinweise zu Hosting, Browser-Einstellungen, Demo-Formularen und Kontaktaufnahme bei ARVENTAS." />
      <PageHero crumb="Datenschutz" title="Datenschutz" lead="Informationen zum Umgang mit Ihren Daten." />
      <section className="sec dark"><div className="wrap legal legal-document">
        <p className="legal-date">Stand: 30. Oktober 2026</p>
        <aside className="legal-note"><strong>Entwurf zur Abstimmung</strong><p>Diese Hinweise beschreiben den aktuellen Website-Stand. Angaben zu Hosting-Verträgen, Serverprotokollen, Speicherfristen und möglichen Drittlandübermittlungen sind vor der endgültigen Freigabe zu ergänzen.</p></aside>
        <h2>1. Verantwortlicher</h2>
        <p>Verantwortlich für die Datenverarbeitung im Zusammenhang mit dieser Website ist:</p>
        <CompanyAddress />
        <h2>2. Bereitstellung und Hosting</h2>
        <p>Beim Aufruf der Website werden technische Verbindungsdaten verarbeitet, insbesondere Ihre IP-Adresse, die angeforderte Adresse oder Datei, der Zeitpunkt des Zugriffs und vom Browser übermittelte Informationen. Dies dient der Auslieferung der Website und ihrem sicheren Betrieb. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO.</p>
        <p>Die Domain arventas.de wird bei Hostinger gehostet. Die Vorschau unter arventas.vercel.app wird über Vercel bereitgestellt. Der jeweils eingesetzte Hosting-Anbieter erhält die für die Auslieferung notwendigen Verbindungsdaten. Konkrete Protokollierungs- und Löschfristen sowie mögliche internationale Datenübermittlungen werden anhand der tatsächlich eingesetzten Dienste ergänzt.</p>
        <p className="legal-provider-links"><a href="https://www.hostinger.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutz bei Hostinger</a><a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Datenschutz bei Vercel</a></p>
        <h2>3. Browser-Einstellungen und Cookies</h2>
        <p>Die Website speichert Ihre Spracheinstellung (arventas-lang) und Ihre Auswahl im Cookie-Dialog (arventas-consent) im Local Storage Ihres Browsers. Diese Einträge werden durch den Website-Code nicht an ARVENTAS übertragen und bleiben gespeichert, bis Sie sie ändern oder löschen.</p>
        <p>Diese Speicherung berücksichtigt die von Ihnen gewählten Funktionen. Soweit sie hierfür unbedingt erforderlich ist, richtet sie sich nach § 25 Abs. 2 Nr. 2 TDDDG. Eine gegebenenfalls damit verbundene Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 Abs. 1 Buchst. f DSGVO.</p>
        <p>Im aktuellen Website-Stand sind keine Statistik- oder Marketing-Dienste eingebunden. Diese Kategorien bleiben im Cookie-Dialog deaktiviert. Sie können Ihre Auswahl über die Cookie-Einstellungen ändern oder die Website-Daten in Ihrem Browser löschen.</p>
        <p><button type="button" className="btn btn-line" onClick={openSettings}>Cookie-Einstellungen öffnen</button></p>
        <h2>4. Formulare und Suchprofil</h2>
        <p>Die Website-Formulare und das Suchprofil laufen derzeit im Demo-Modus. Der Website-Code verarbeitet Eingaben im Arbeitsspeicher Ihres Browsers, übermittelt sie nicht an ARVENTAS und legt sie weder auf einem Server noch im Local Storage ab. Eine angezeigte Bestätigung simuliert einen Versand.</p>
        <p>Nutzen Sie die Demo-Formulare nicht für eine tatsächlich zu übermittelnde oder fristgebundene Anfrage. Für eine direkte Kontaktaufnahme steht Ihnen info@arventas.de zur Verfügung. Vor Einrichtung eines tatsächlichen Formularversands werden diese Hinweise angepasst.</p>
        <h2>5. Kontaktaufnahme per E-Mail</h2>
        <p>Wenn Sie uns unmittelbar per E-Mail kontaktieren, verarbeiten wir die mitgeteilten Angaben zur Bearbeitung Ihres Anliegens. Vertragsbezogene Anfragen richten sich nach Art. 6 Abs. 1 Buchst. b DSGVO, sonstige Korrespondenz nach Art. 6 Abs. 1 Buchst. f DSGVO. Wir bewahren diese Angaben nur so lange auf, wie sie für die Bearbeitung oder aufgrund anwendbarer gesetzlicher Aufbewahrungspflichten erforderlich sind.</p>
        <h2>6. Schriftarten und Medien</h2>
        <p>Schriftarten, Bilder und Videos werden über das Hosting dieser Website ausgeliefert. Der Website-Code lädt dafür keine Inhalte direkt von Google Fonts, YouTube oder Unsplash nach. Bildquellenangaben sind keine Einbindung externer Tracking-Dienste.</p>
        <h2>7. Ihre Rechte</h2>
        <p>Bei Vorliegen der gesetzlichen Voraussetzungen haben Sie insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit nach Art. 15 bis 20 DSGVO. Gegen eine Verarbeitung auf Grundlage berechtigter Interessen können Sie aus Gründen Ihrer besonderen Situation Widerspruch nach Art. 21 DSGVO einlegen. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.</p>
        <p>Zur Ausübung Ihrer Rechte können Sie sich an die oben genannte Adresse oder E-Mail-Adresse wenden. Außerdem können Sie sich nach Art. 77 DSGVO bei einer zuständigen Datenschutzaufsichtsbehörde beschweren, insbesondere an Ihrem Aufenthaltsort, Arbeitsplatz oder dem Ort des vermuteten Verstoßes.</p>
        <p><a href="https://www.lda.bayern.de/de/beschwerde.html" target="_blank" rel="noopener noreferrer">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</a></p>
        <h2>8. Aktualisierung</h2>
        <p>Diese Hinweise werden angepasst, wenn sich die Website oder ihre Datenverarbeitung ändert. Neue Statistik-, Marketing- oder Formular-Dienste werden erst nach entsprechender Information und, soweit erforderlich, Einwilligung eingeführt.</p>
      </div></section>
    </>
  )
}
