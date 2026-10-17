import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Tabs, Faq, Placeholder } from '../components/ui.jsx'
import { SimpleTimeline } from '../components/ProcessTimeline.jsx'
import { LeadForm, OWNER_FIELDS } from '../components/forms.jsx'
import { OWNER_PROCESS, OWNER_FAQ } from '../content/data.js'

const SITUATIONS = [
  { id: 'privat', label: 'Private Eigentümer', t: 'Wert verstehen, bevor Sie entscheiden.', p: 'Als privater Immobilienbesitzer möchten Sie wissen, was Ihre Immobilie wert ist und welche Optionen es gibt. Eine sachliche Einordnung hilft, ohne dass Sie sich festlegen müssen.' },
  { id: 'mfh', label: 'Mehrfamilienhaus', t: 'Bestand strukturiert einordnen.', p: 'Bei Mehrfamilienhäusern spielen Mieterstruktur, Zustand und Potenziale zusammen. Wir ordnen diese Punkte nachvollziehbar ein, bevor ein Verkaufsweg gewählt wird.' },
  { id: 'erbe', label: 'Erbengemeinschaft', t: 'Eine gemeinsame Gesprächsgrundlage.', p: 'Mehrere Eigentümer haben oft unterschiedliche Interessen. Eine neutrale Einordnung von Wert und Optionen kann eine gemeinsame Grundlage für Entscheidungen schaffen.' },
  { id: 'verwalter', label: 'Nachlass- und Insolvenzverwalter', t: 'Zuverlässig und diskret.', p: 'Verwalter benötigen belastbare Informationen und einen verlässlichen Ansprechpartner. Wir prüfen Objekte sachlich und stimmen das weitere Vorgehen mit Ihnen ab.' },
  { id: 'bestand', label: 'Professionelle Bestandshalter', t: 'Portfolio gezielt betrachten.', p: 'Wenn einzelne Objekte aus einem Bestand zur Disposition stehen, hilft eine strukturierte Einordnung von Wert, Potenzial und Verkaufsoptionen.' },
]

export default function Owners() {
  const [sp] = useSearchParams()
  return (
    <>
      <Seo title="Immobilie verkaufen | ARVENTAS" description="Immobilienwert verstehen, Optionen prüfen und gegebenenfalls diskret verkaufen – persönlich begleitet, deutschlandweit." />
      <PageHero image="/media/facade-altbau.jpg" crumb="Für Eigentümer" title="Ihre Immobilie. Unser Marktverständnis." lead="Immobilienwert verstehen, Optionen prüfen und gegebenenfalls diskret verkaufen.">
        <div className="btn-row"><Btn href="#anfrage">Objektreport anfragen</Btn></div>
      </PageHero>

      <section className="sec ivory">
        <div className="wrap">
          <SectionHead eyebrow="Erzählstruktur" title="Drei Schritte zur Klarheit." />
          <ol className="steps3 rv"><li>Situation verstehen.</li><li>Immobilie analysieren.</li><li>Verkaufsweg entscheiden.</li></ol>
        </div>
      </section>

      <section className="sec ivory" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="Situationen" title="Typische Eigentümersituationen" normal />
          <Tabs label="Eigentümersituationen" items={SITUATIONS} renderPanel={(s) => (<><h3 className="h3">{s.t}</h3><p>{s.p}</p></>)} />
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap two">
          <div><SectionHead eyebrow="Diskreter Verkaufsansatz" title="Kein öffentliches Schaufenster." normal />
            <p className="rv">Ihr Objekt wird nicht über öffentliche Portale beworben. Der Kreis der Interessenten wird gezielt ausgewählt. Konkrete Adressen werden nicht öffentlich gezeigt.</p>
            <div className="btn-row"><Btn to="/objektreport">Objektreport ansehen</Btn></div></div>
          <div className="imgf rv" style={{ aspectRatio: '4/3' }}><img src="/media/facade-altbau.jpg" alt="Altbaufassade (Beispielbild)" loading="lazy" /></div>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap">
          <SectionHead eyebrow="Ablauf" title="So läuft es ab." />
          <SimpleTimeline steps={OWNER_PROCESS} />
        </div>
      </section>

      <section className="sec ivory" style={{ paddingTop: 0 }}>
        <div className="wrap two">
          <div><SectionHead eyebrow="Persönliche Zuständigkeit" title="Ein Ansprechpartner für Ihr Anliegen." normal />
            <p className="rv">Ihr Anliegen wird von einer festen Person betreut. Wer das ist, zeigen wir hier, sobald bestätigte Profile vorliegen.</p></div>
          <Placeholder title="Platzhalter – Ansprechpartner">Name, Rolle und Fachgebiet nach Bestätigung ergänzen oder diesen Bereich vor Veröffentlichung ausblenden.</Placeholder>
        </div>
      </section>

      <section className="sec ivory" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Häufige Fragen" normal />
          <Faq items={OWNER_FAQ} />
        </div>
      </section>

      <section className="sec dark" id="anfrage">
        <div className="wrap two">
          <div><SectionHead eyebrow="Anfrage" title="Objektreport anfragen." lead="Schildern Sie kurz Ihr Anliegen. Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen." /></div>
          <div style={{ background: 'var(--ivory)', color: 'var(--ink)', padding: 'clamp(20px,3vw,40px)' }} className="on-ivory">
            <LeadForm id="eig" fields={OWNER_FIELDS} submitLabel="Anfrage absenden" defaults={{ ort: sp.get('region') || '' }}
              doneTitle="Danke für Ihre Anfrage (Demo)." doneText="In der Live-Version würden wir Ihre Anfrage prüfen und uns bei Ihnen melden." />
          </div>
        </div>
      </section>
    </>
  )
}
