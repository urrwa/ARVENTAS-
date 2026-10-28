import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProcessPinned from '../components/ProcessPinned.jsx'
import SituationList from '../components/SituationList.jsx'
import StepRows from '../components/StepRows.jsx'
import Seo from '../components/Seo.jsx'
import Letters from '../components/Letters.jsx'
import { Btn, SectionHead, Tabs, Faq } from '../components/ui.jsx'
import { SimpleTimeline } from '../components/ProcessTimeline.jsx'
import { LeadForm, OWNER_FIELDS } from '../components/forms.jsx'
import { OWNER_PROCESS, OWNER_FAQ } from '../content/data.js'
import { TEAM_PHOTOS } from '../content/team.js'

const PROCESS_IMG = [
  TEAM_PHOTOS.conversation,
  TEAM_PHOTOS.documents,
  TEAM_PHOTOS.market,
  TEAM_PHOTOS.development,
  TEAM_PHOTOS.strategy,
  TEAM_PHOTOS.guidance,
]

const SITUATIONS = [
  { id: 'privat', img: '/media/p/h-p-besprechung.webp', label: 'Private Eigentümer', t: 'Wert verstehen, bevor Sie entscheiden.', p: 'Als privater Immobilienbesitzer möchten Sie wissen, was Ihre Immobilie wert ist und welche Optionen es gibt. Eine sachliche Einordnung hilft, ohne dass Sie sich festlegen müssen.' },
  { id: 'mfh', img: '/media/p/u-weisse-wohnanlage.webp', label: 'Mehrfamilienhaus', t: 'Bestand strukturiert einordnen.', p: 'Bei Mehrfamilienhäusern spielen Mieterstruktur, Zustand und Potenziale zusammen. Wir ordnen diese Punkte nachvollziehbar ein, bevor ein Verkaufsweg gewählt wird.' },
  { id: 'erbe', img: '/media/p/h-p-begleitung.webp', label: 'Erbengemeinschaft', t: 'Eine gemeinsame Gesprächsgrundlage.', p: 'Mehrere Eigentümer haben oft unterschiedliche Interessen. Eine neutrale Einordnung von Wert und Optionen kann eine gemeinsame Grundlage für Entscheidungen schaffen.' },
  { id: 'verwalter', img: '/media/p/h-p-abschluss.webp', label: 'Nachlass- und Insolvenzverwalter', t: 'Zuverlässig und diskret.', p: 'Verwalter benötigen belastbare Informationen und einen verlässlichen Ansprechpartner. Wir prüfen Objekte sachlich und stimmen das weitere Vorgehen mit Ihnen ab.' },
  { id: 'bestand', img: '/media/p/u-luftbild.webp', label: 'Professionelle Bestandshalter', t: 'Portfolio gezielt betrachten.', p: 'Wenn einzelne Objekte aus einem Bestand zur Disposition stehen, hilft eine strukturierte Einordnung von Wert, Potenzial und Verkaufsoptionen.' },
]

export default function Owners() {
  const [sp] = useSearchParams()
  // Fotos öffnen sich beim Erscheinen von oben nach unten (wie in der Eröffnung)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.pic-open'))
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    // Beobachtet wird der Elternknoten, weil ein beschnittenes Element selbst nie als sichtbar gilt.
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.firstElementChild && els.forEach((p) => { if (p.parentElement === e.target) p.classList.add('in') }); io.unobserve(e.target) } }), { threshold: 0.25 })
    els.forEach((e) => io.observe(e.parentElement))
    return () => io.disconnect()
  }, [])
  return (
    <>
      <Seo title="Immobilie verkaufen | ARVENTAS" description="Immobilienwert verstehen, Optionen prüfen und gegebenenfalls diskret verkaufen – persönlich begleitet, deutschlandweit." />
      <section className="ow-op">
        <p className="ow-eb">Für Eigentümer</p>
        <h1 className="ow-h"><Letters text="Ihre Immobilie." per={30} max={900} delay={200} /><br /><Letters text="Unser Marktverständnis." per={30} max={1300} delay={700} /></h1>
        <div className="ow-pic">
          <img src="/media/p/zugang-eigentuemer-haus.webp" alt="" decoding="async" fetchpriority="high" />
          <div className="ow-card">
            <p>Immobilienwert verstehen, Optionen prüfen und gegebenenfalls diskret verkaufen.</p>
            <span>Diskret. Strukturiert. Persönlich.</span>
            <Btn href="#anfrage">Objektreport anfragen</Btn>
          </div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Erzählstruktur" title="Drei Schritte zur Klarheit." />
          <StepRows items={[
            { title: 'Situation verstehen.', text: 'Wir hören zu und ordnen Ihre Ausgangslage ein.', to: '/kontakt', photo: TEAM_PHOTOS.conversation },
            { title: 'Immobilie analysieren.', text: 'Daten und Unterlagen werden strukturiert geprüft.', to: '/objektreport', photo: TEAM_PHOTOS.documents },
            { title: 'Verkaufsweg entscheiden.', text: 'Gemeinsam wägen wir die Optionen ab, ohne Druck.', to: '/kontakt', photo: TEAM_PHOTOS.planning },
          ]} />
        </div>
      </section>

      <section className="sec dark sl-sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SituationList eyebrow="Situationen" title="Typische Eigentümersituationen" items={SITUATIONS} img={TEAM_PHOTOS.exchange} />
        </div>
      </section>

      <section className="sec dark pp-sec">
        <ProcessPinned eyebrow="Ablauf" title="So läuft es ab." steps={OWNER_PROCESS} images={PROCESS_IMG} />
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
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
