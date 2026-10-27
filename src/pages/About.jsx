import Ambient from '../components/Ambient.jsx'
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
      <PageHero tall image="/media/p/u-lounge-gespraech.webp" crumb="Über uns" title="Persönliche Erfahrung. Gemeinsame Werte." lead="ARVENTAS verbindet ausgewählte Off-Market-Immobilien mit passenden Investoren – durch fundierte Analysen, persönliche Erfahrung und diskrete Transaktionsbegleitung." />

      <div className="cover-over">
      <div className="cover-amb"><Ambient /></div>
      <section className="sec dark about-big-sec">
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

      <ScrollZoom left="Werte schaffen." right="Zukunft bauen." image="/media/p/h-entwicklung.webp" />

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Aktuelles Geschäftsmodell" title="Zugang, Analyse, Matching, Begleitung." normal />
        </div>
        <HScroll items={[
          { t: 'Zugang', p: 'Immobilien abseits öffentlicher Portale.', img: '/media/p/h-zugang.webp' },
          { t: 'Analyse', p: 'Wert, Potenzial und Risiken nachvollziehbar einordnen.', img: '/media/p/h-analyse.webp' },
          { t: 'Matching', p: 'Suchprofil und Immobilieninformationen zusammenführen.', img: '/media/p/h-matching.webp' },
          { t: 'Begleitung', p: 'Persönliche Transaktionsbegleitung.', img: '/media/p/h-p-begleitung.webp' },
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

      <section className="sec dark org-sec">
        <div className="wrap">
          <div className="org-head org-head2">
            <SectionHead eyebrow="Ansprechpartner" title="Echte Ansprechpartner." normal />
          </div>
          <div className="team rv">
            {[0, 1, 2].map((i) => (
              <div key={i} className="team-card">
                <span className="team-pic" aria-hidden="true"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="8.5" r="3.6" /><path d="M4.5 20c.8-4 3.6-6 7.5-6s6.7 2 7.5 6" /></svg></span>
                <dl>
                  <div><dt>Name</dt><dd /></div>
                  <div><dt>Rolle</dt><dd /></div>
                  <div><dt>Fachgebiet</dt><dd /></div>
                </dl>
              </div>
            ))}
          </div>
          <Placeholder title="Platzhalter – Team">Hier erscheinen bestätigte Profile mit Name, Rolle und Fachgebiet sowie ein authentisches Porträt. Vor Veröffentlichung ersetzen oder ausblenden. Keine erfundenen Namen, Rollen, Erfahrungsjahre oder Teamfotos.</Placeholder>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Tätigkeitsbereich" title="Deutschlandweit." lead="Immobilienkompetenz für Eigentümer und Investoren in ganz Deutschland. ARVENTAS agiert ausschließlich deutschlandweit." />
          <div className="btn-row"><Btn to="/kontakt">Kontakt aufnehmen</Btn></div>
        </div>
      </section>
      </div>
      <CtaBand image="/media/p/u-glasfassaden.webp" />
    </>
  )
}
