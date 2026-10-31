import Ambient from '../components/Ambient.jsx'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn, SectionHead } from '../components/ui.jsx'
import RevealText from '../components/RevealText.jsx'
import ScrollZoom from '../components/ScrollZoom.jsx'
import HScroll from '../components/HScroll.jsx'
import Photo from '../components/Photo.jsx'
import { TEAM_PHOTOS, TEAM_PORTRAITS } from '../content/team.js'
import { EDITORIAL_PHOTOS } from '../content/editorialPhotos.js'

const VALUES = [
  { title: 'Präzision', icon: 'target', detail: 'Sorgfältig prüfen.' },
  { title: 'Zurückhaltung', icon: 'lock', detail: 'Diskret handeln.' },
  { title: 'Vertrauen', icon: 'handshake', detail: 'Persönlich begleiten.' },
  { title: 'Seriosität', icon: 'scale', detail: 'Verantwortlich entscheiden.' },
]

function ValueDiagram({ kind }) {
  return <svg className={`about-value-diagram about-value-diagram-${kind}`} viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
    {kind === 'target' && <>
      <path className="value-guide" d="M100 8v32m0 80v32M28 80h32m80 0h32" />
      <circle className="value-guide" cx="100" cy="80" r="58" />
      <circle className="value-trace" pathLength="1" cx="100" cy="80" r="38" />
      <path className="value-trace" pathLength="1" d="M100 60v40M80 80h40" />
      <circle className="value-dot" cx="100" cy="80" r="3" />
    </>}
    {kind === 'lock' && <>
      <path className="value-guide" d="M30 138h140M44 128V24h112v104" />
      <path className="value-trace" pathLength="1" d="M64 128V38h29v90M107 128V38h29v90" />
      <path className="value-guide" d="M78 50v66m44-66v66M100 14v12" />
      <circle className="value-dot" cx="100" cy="83" r="3" />
    </>}
    {kind === 'handshake' && <>
      <path className="value-guide" d="M22 80h28m100 0h28M100 16v22m0 84v22" />
      <circle className="value-trace" pathLength="1" cx="78" cy="80" r="42" />
      <circle className="value-trace" pathLength="1" cx="122" cy="80" r="42" />
      <path className="value-guide" d="M100 44v72" />
      <circle className="value-dot" cx="100" cy="80" r="3" />
    </>}
    {kind === 'scale' && <>
      <path className="value-guide" d="M24 138h152M100 16v16" />
      <path className="value-trace" pathLength="1" d="M100 38v92M74 130h52M42 54h116" />
      <path className="value-trace" pathLength="1" d="M54 54l-22 48h44L54 54Zm92 0-22 48h44l-22-48Z" />
      <circle className="value-dot" cx="100" cy="54" r="3" />
    </>}
  </svg>
}

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
          <figure className="about-values" aria-labelledby="about-values-title">
            <figcaption className="about-values-heading">
              <h2 id="about-values-title">Unsere Werte</h2>
            </figcaption>
            <ul className="about-values-list">
              {VALUES.map((value, i) => (
                <li key={value.title} className="about-value rv" style={{ '--d': (i % 2) * 100 }}>
                  <span className="about-value-number" aria-hidden="true">0{i + 1}</span>
                  <ValueDiagram kind={value.icon} />
                  <div className="about-value-copy">
                    <h3>{value.title}</h3>
                    <p>{value.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </figure>
          <p className="rv about-name"><b>Der Name.</b> Der Markenname geht auf die Ideen „Assets“, „Architecture“ und „Ventures“ zurück (Brandbook).</p>
        </div>
      </section>

      <ScrollZoom left="Werte schaffen." right="Zukunft bauen." image={EDITORIAL_PHOTOS.knowledgeOverview} />

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
