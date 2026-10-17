import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead, Placeholder } from '../components/ui.jsx'
import Brand from '../components/Brand.jsx'

export default function About() {
  return (
    <>
      <Seo title="Über uns | ARVENTAS" description="Wer ARVENTAS ist: aktuelles Off-Market-Geschäftsmodell, Mission und Arbeitsweise, Werte und deutschlandweiter Tätigkeitsbereich." />
      <PageHero crumb="Über uns" title="Persönliche Erfahrung. Gemeinsame Werte." lead="ARVENTAS verbindet ausgewählte Off-Market-Immobilien mit passenden Investoren – durch fundierte Analysen, persönliche Erfahrung und diskrete Transaktionsbegleitung." />

      <section className="sec ivory">
        <div className="wrap two">
          <div>
            <SectionHead eyebrow="Wer wir sind" title={<>Wer <Brand /> ist.</>} normal />
            <p className="rv">Die Marke steht für zeitlose Eleganz, unaufdringliche Stärke, Präzision, Zurückhaltung und Vertrauen. Dieser Anspruch prägt unsere Arbeit: ruhig, klar und sorgfältig.</p>
            <h3 className="h3 rv" style={{ margin: '28px 0 10px' }}>Der Name</h3>
            <p className="rv">Der Markenname geht auf die Ideen „Assets“, „Architecture“ und „Ventures“ zurück (Brandbook).</p>
          </div>
          <div className="imgf rv" style={{ aspectRatio: '4/3' }}><img src="/media/facade-altbau.jpg" alt="Altbaufassade (Beispielbild)" loading="lazy" /></div>
        </div>
      </section>

      <section className="sec ivory" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="Aktuelles Geschäftsmodell" title="Zugang, Analyse, Matching, Begleitung." normal />
          <div className="cols3 c4 rv">
            <div><h3 className="h3">Zugang</h3><p>Immobilien abseits öffentlicher Portale.</p></div>
            <div><h3 className="h3">Analyse</h3><p>Wert, Potenzial und Risiken nachvollziehbar einordnen.</p></div>
            <div><h3 className="h3">Matching</h3><p>Suchprofil und Immobilieninformationen zusammenführen.</p></div>
            <div><h3 className="h3">Begleitung</h3><p>Persönliche Transaktionsbegleitung.</p></div>
          </div>
          <p className="rv" style={{ marginTop: 24, maxWidth: '62ch' }}>Die interne KI-Technologie unterstützt Objektanalysen und Prozesse. Sie ist kein öffentlich verkauftes Softwareprodukt.</p>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap two">
          <div>
            <SectionHead eyebrow="Mission und Arbeitsweise" title="Daten prüfen. Menschen entscheiden." normal />
            <p className="rv">Jede freigegebene Analyse hat eine verantwortliche Person. Wir benennen Annahmen, trennen Einschätzung von Gutachten und machen offene Punkte sichtbar.</p>
          </div>
          <div>
            <h3 className="h3 rv" style={{ marginBottom: 14 }}>Werte</h3>
            <ul className="checks rv" style={{ color: 'var(--ivory)' }}>
              <li>Präzision</li><li>Zurückhaltung</li><li>Vertrauen</li><li>Seriosität</li>
            </ul>
            <p className="rv" style={{ marginTop: 22, fontFamily: 'var(--font-head)', fontSize: 'clamp(20px,2vw,26px)', color: 'var(--ivory)' }}>Elegant. Selten. Zeitlos. Scharfsinnig.</p>
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
                {[[10, 'Gesellschaft A'], [180, 'Gesellschaft B'], [350, 'Gesellschaft C']].map(([x, t]) => (<g key={x}><rect x={x} y="104" width="160" height="46" fill="none" stroke="#192537" strokeDasharray="5 4" /><text x={x + 80} y="132" textAnchor="middle" fontSize="12" fill="#3d3f43">{t}</text></g>))}
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
    </>
  )
}
