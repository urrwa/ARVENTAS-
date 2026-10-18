import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Placeholder } from '../components/ui.jsx'
import Brand from '../components/Brand.jsx'
import RevealText from '../components/RevealText.jsx'
import ScrollZoom from '../components/ScrollZoom.jsx'
import HScroll from '../components/HScroll.jsx'

export default function About() {
  return (
    <>
      <Seo title="Über uns | ARVENTAS" description="Wer ARVENTAS ist: aktuelles Off-Market-Geschäftsmodell, Mission und Arbeitsweise, Werte und deutschlandweiter Tätigkeitsbereich." />
      <PageHero tall image="/media/buero-abend-2.webp" crumb="Über uns" title="Persönliche Erfahrung. Gemeinsame Werte." lead="ARVENTAS verbindet ausgewählte Off-Market-Immobilien mit passenden Investoren – durch fundierte Analysen, persönliche Erfahrung und diskrete Transaktionsbegleitung." />

      <div className="cover-over">
      <section className="sec ivory about-big-sec">
        <div className="wrap">
          <p className="eyebrow">Wer wir sind</p>
          <RevealText className="about-big" text="Die Marke steht für zeitlose Eleganz, unaufdringliche Stärke, Präzision, Zurückhaltung und Vertrauen. Dieser Anspruch prägt unsere Arbeit: ruhig, klar und sorgfältig." />
          <hr className="hair" />
          <div className="vals">
            {['Präzision', 'Zurückhaltung', 'Vertrauen', 'Seriosität'].map((v, i) => (
              <div key={v} className="val rv" style={{ '--d': i * 90 }}><span>0{i + 1}</span><strong>{v}</strong></div>
            ))}
          </div>
          <p className="rv about-name"><b>Der Name.</b> Der Markenname geht auf die Ideen „Assets“, „Architecture“ und „Ventures“ zurück (Brandbook).</p>
        </div>
      </section>

      <ScrollZoom left="Werte schaffen." right="Zukunft bauen." image="/media/kontakt-haus.webp" />

      <section className="sec ivory">
        <div className="wrap">
          <SectionHead eyebrow="Aktuelles Geschäftsmodell" title="Zugang, Analyse, Matching, Begleitung." normal />
        </div>
        <HScroll items={[
          { t: 'Zugang', p: 'Immobilien abseits öffentlicher Portale.', img: '/media/haus-abend.webp' },
          { t: 'Analyse', p: 'Wert, Potenzial und Risiken nachvollziehbar einordnen.', img: '/media/planunterlagen.webp' },
          { t: 'Matching', p: 'Suchprofil und Immobilieninformationen zusammenführen.', img: '/media/notizbuch.webp' },
          { t: 'Begleitung', p: 'Persönliche Transaktionsbegleitung.', img: '/media/vertrag-unterzeichnung.webp' },
        ]} />
        <div className="wrap"><p className="rv" style={{ marginTop: 24, maxWidth: '62ch' }}>Die interne KI-Technologie unterstützt Objektanalysen und Prozesse. Sie ist kein öffentlich verkauftes Softwareprodukt.</p></div>
      </section>

      <section className="sec dark">
        <div className="wrap two">
          <div>
            <SectionHead eyebrow="Mission und Arbeitsweise" title="Daten prüfen. Menschen entscheiden." normal />
            <p className="rv">Jede freigegebene Analyse hat eine verantwortliche Person. Wir benennen Annahmen, trennen Einschätzung von Gutachten und machen offene Punkte sichtbar.</p>
          </div>
          <div>
            <p className="rv" style={{ marginTop: 0, fontFamily: 'var(--font-head)', fontSize: 'clamp(20px,2vw,26px)', color: 'var(--ivory)' }}>Elegant. Selten. Zeitlos. Scharfsinnig.</p>
          </div>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap two">
          <div>
            <SectionHead eyebrow="Unternehmensstruktur" title="Tatsächliche Struktur und Verantwortung." normal />
            <p className="rv">Die Dachmarke und das Zusammenspiel spezialisierter Unternehmen werden hier erklärt. Wer Leistungen erbringt und Vertragspartner wird, stellen wir anhand der bestätigten Unternehmensstruktur transparent dar.</p>
            <div className="struct rv" aria-label="Reduziertes Strukturdiagramm (Platzhalter)">
              <svg viewBox="0 0 520 180" width="100%" role="img" aria-label="Reduziertes Strukturdiagramm als Platzhalter">
                <rect x="170" y="10" width="180" height="46" fill="none" stroke="#192537" strokeWidth="1.5" /><text x="260" y="38" textAnchor="middle" fontSize="13" fill="#0B0B0B">Dachmarke</text>
                <path d="M260 56 V80 M90 80 H430 M90 80 V104 M260 80 V104 M430 80 V104" stroke="#B09E80" strokeWidth="2" fill="none" />
                {[[10, 'Gesellschaft A'], [180, 'Gesellschaft B'], [350, 'Gesellschaft C']].map(([x, t]) => (<g key={x}><rect x={x} y="104" width="160" height="46" fill="none" stroke="#192537" strokeDasharray="5 4" /><text x={x + 80} y="132" textAnchor="middle" fontSize="12" fill="#0B0B0B" fillOpacity=".72">{t}</text></g>))}
              </svg>
              <p className="small" style={{ marginTop: 8 }}>Platzhalter: Bezeichnungen und Beziehungen werden nach Bestätigung der Unternehmensstruktur ergänzt. Keine pauschale Behauptung einer rechtlichen Risikotrennung oder Haftungsfreiheit.</p>
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Ansprechpartner" title="Echte Ansprechpartner." normal />
            <Placeholder title="Platzhalter – Team">Hier erscheinen bestätigte Profile mit Name, Rolle und Fachgebiet sowie ein authentisches Porträt. Vor Veröffentlichung ersetzen oder ausblenden. Keine erfundenen Namen, Rollen, Erfahrungsjahre oder Teamfotos.</Placeholder>
          </div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Tätigkeitsbereich" title="Deutschlandweit." lead="Immobilienkompetenz für Eigentümer und Investoren in ganz Deutschland. ARVENTAS agiert ausschließlich deutschlandweit." />
          <div className="btn-row"><Btn to="/kontakt">Kontakt aufnehmen</Btn></div>
        </div>
      </section>
      </div>
      <CtaBand image="/media/cta-abend-1.webp" />
    </>
  )
}
