import Ambient from '../components/Ambient.jsx'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead } from '../components/ui.jsx'
import Brand from '../components/Brand.jsx'
import RevealText from '../components/RevealText.jsx'
import ScrollZoom from '../components/ScrollZoom.jsx'
import HScroll from '../components/HScroll.jsx'
import Photo from '../components/Photo.jsx'
import { TEAM_PHOTOS, TEAM_PORTRAITS } from '../content/team.js'

export default function About() {
  return (
    <>
      <Seo title="Über uns | ARVENTAS" description="Wer ARVENTAS ist: aktuelles Off-Market-Geschäftsmodell, Mission und Arbeitsweise, Werte und deutschlandweiter Tätigkeitsbereich." />
      <PageHero tall image={TEAM_PHOTOS.guidance} crumb="Über uns" title="Persönliche Erfahrung. Gemeinsame Werte." lead="ARVENTAS verbindet ausgewählte Off-Market-Immobilien mit passenden Investoren – durch fundierte Analysen, persönliche Erfahrung und diskrete Transaktionsbegleitung." />

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

      <ScrollZoom left="Werte schaffen." right="Zukunft bauen." image={TEAM_PHOTOS.development} />

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Aktuelles Geschäftsmodell" title="Zugang, Analyse, Matching, Begleitung." normal />
        </div>
        <HScroll items={[
          { t: 'Zugang', p: 'Immobilien abseits öffentlicher Portale.', img: '/media/p/h-zugang.webp' },
          { t: 'Analyse', p: 'Wert, Potenzial und Risiken nachvollziehbar einordnen.', photo: TEAM_PHOTOS.analysis },
          { t: 'Matching', p: 'Suchprofil und Immobilieninformationen zusammenführen.', photo: TEAM_PHOTOS.market },
          { t: 'Begleitung', p: 'Persönliche Transaktionsbegleitung.', photo: TEAM_PHOTOS.conversation },
        ]} />
        <div className="wrap"><p className="rv" style={{ marginTop: 24, maxWidth: '62ch' }}>Die interne KI-Technologie unterstützt Objektanalysen und Prozesse. Sie ist kein öffentlich verkauftes Softwareprodukt.</p></div>
      </section>

      <section className="sec dark">
        <div className="wrap two">
          <div>
            <SectionHead eyebrow="Mission und Arbeitsweise" title="Daten prüfen. Menschen entscheiden." normal />
            <p className="rv">Jede freigegebene Analyse hat eine verantwortliche Person. Wir benennen Annahmen, trennen Einschätzung von Gutachten und machen offene Punkte sichtbar.</p>
          </div>
          <figure className="team-planning rv">
            <Photo image={TEAM_PHOTOS.review} sizes="(max-width: 860px) 100vw, 50vw" />
            <figcaption>Gemeinsam prüfen. Möglichkeiten besprechen.</figcaption>
          </figure>
        </div>
      </section>

      <section className="sec dark team-story" aria-labelledby="h-team">
        <div className="wrap">
          <div className="team-story-head">
            <header className="sec-head">
              <p className="eyebrow rv">Unser Team</p>
              <h2 id="h-team" className="h2 rv">Menschen hinter den Entscheidungen.</h2>
            </header>
            <p className="rv">Wir prüfen Unterlagen, besprechen Möglichkeiten und begleiten den nächsten Schritt persönlich. So verbinden wir Analyse und Austausch.</p>
          </div>
          <figure className="team-story-photo rv">
            <Photo image={TEAM_PHOTOS.strategy} />
            <figcaption>Immobilien gemeinsam betrachten. Entscheidungen persönlich begleiten.</figcaption>
          </figure>
          <ul id="team-portraets" className="team-portraits" aria-label="Porträts unseres Teams">
            {TEAM_PORTRAITS.map((portrait, i) => (
              <li key={portrait.src} className="team-portrait rv" style={{ '--d': (i % 3) * 70 }}>
                <Photo image={portrait} sizes="(max-width: 900px) 50vw, 33vw" />
              </li>
            ))}
          </ul>
          <div className="btn-row"><Btn to="/kontakt">Kontakt aufnehmen</Btn></div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <SectionHead eyebrow="Tätigkeitsbereich" title="Deutschlandweit." lead="Immobilienkompetenz für Eigentümer und Investoren in ganz Deutschland. ARVENTAS agiert ausschließlich deutschlandweit." />
          <div className="btn-row"><Btn to="/kontakt">Kontakt aufnehmen</Btn></div>
        </div>
      </section>
      </div>
      <CtaBand image="/media/p/hero-card-mfh.webp" />
    </>
  )
}
