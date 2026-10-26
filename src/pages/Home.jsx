import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import HomeVideo from '../components/HomeVideo.jsx'
import { Btn, SectionHead, Placeholder } from '../components/ui.jsx'
import ReportStack from '../components/ReportStack.jsx'
import ProcessTimeline from '../components/ProcessTimeline.jsx'
import StrengthStack from '../components/StrengthStack.jsx'
import PropertyDashboard from '../components/PropertyDashboard.jsx'
import Brand from '../components/Brand.jsx'
import KnowledgeTabs from '../components/KnowledgeTabs.jsx'
import GermanyMap from '../components/GermanyMap.jsx'

function DocSvg() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Schematische Reportseite mit Analysebausteinen">
      <rect width="400" height="300" fill="#192537" />
      <rect x="110" y="30" width="180" height="240" fill="#F5F3EF" />
      <g fill="none" stroke="#192537" strokeWidth="2" pathLength="1">
        <path className="draw" pathLength="1" d="M130 62 H210" />
        <path className="draw" pathLength="1" d="M130 92 H270" /><path className="draw" pathLength="1" d="M130 108 H250" />
        <path className="draw" pathLength="1" d="M130 190 H270" /><path className="draw" pathLength="1" d="M130 206 H240" />
      </g>
      <g fill="none" stroke="#B09E80" strokeWidth="3">
        <path className="draw" pathLength="1" d="M130 160 L160 140 L190 150 L220 124 L270 134" />
      </g>
    </svg>
  )
}
function ConnectSvg() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Schematische Verbindung zweier Seiten">
      <rect width="400" height="300" fill="#192537" />
      <g fill="none" stroke="#B09E80" strokeWidth="2.5">
        <path className="draw" pathLength="1" d="M90 90 C 170 90, 170 210, 250 210" />
        <path className="draw" pathLength="1" d="M90 150 C 170 150, 200 150, 310 150" />
        <path className="draw" pathLength="1" d="M90 210 C 170 210, 170 90, 250 90" />
      </g>
      <g fill="#F5F3EF"><rect x="74" y="74" width="32" height="32" /><rect x="74" y="134" width="32" height="32" /><rect x="74" y="194" width="32" height="32" /></g>
      <g fill="#B09E80"><rect x="250" y="74" width="32" height="32" /><rect x="294" y="134" width="32" height="32" /><rect x="250" y="194" width="32" height="32" /></g>
    </svg>
  )
}

// Zugangs-Kachel: großes Foto mit Text und Aktion (ganze Fläche ist ein Link).
function Door({ to, img, alt, eyebrow, title, text, cta, d }) {
  return (
    <Link to={to} className="door rv" style={d ? { '--d': d } : undefined}>
      <img src={`/media/${img}.webp`} alt={alt} loading="lazy" />
      <div className="door-txt"><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{text}</p><span className="btn btn-gold">{cta} <span className="arr" aria-hidden="true">→</span></span></div>
    </Link>
  )
}

export default function Home() {
  const [wcat, setWcat] = useState('Alle')
  const doorsRef = useRef(null)
  // Zwei Wege: beim Hereinscrollen wächst die linke Karte auf volle Größe, die rechte hebt sich in die Reihe.
  useEffect(() => {
    const el = doorsRef.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75)))
      el.style.setProperty('--dp', p.toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  // Sticky-Cover: Abschnitt bleibt stehen, sobald sein Unterkante den unteren Bildrand erreicht (top negativ bei hohen Abschnitten).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.stick-under'))
    const set = () => els.forEach((el) => { el.style.top = Math.min(0, window.innerHeight - el.offsetHeight) + 'px' })
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])
  // Bilder weiter unten sofort nach dem Laden der Seite holen, damit sie beim Scrollen schon da sind (statt erst kurz vor dem Sichtbereich).
  useEffect(() => {
    const warm = () => document.querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager' })
    const go = () => { if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 2500 }); else setTimeout(warm, 1200) }
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true })
    return () => window.removeEventListener('load', go)
  }, [])
  return (
    <>
      <Seo title="ARVENTAS | Off-Market-Immobilien deutschlandweit" description="Ausgewählte Off-Market-Immobilien, fundierte Objektanalysen und persönliche Begleitung für Eigentümer und Investoren in ganz Deutschland." />
      <HomeVideo />

      {/* 02 – Zwei visuelle Zugänge */}
      <section id="zugaenge" className="sec dark doors-sec" aria-labelledby="h-zug">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Ihr Einstieg</p><h2 id="h-zug" className="h2 rv">Wie können wir Ihnen helfen?</h2></header>
          <div className="doors" ref={doorsRef}>
            <Door to="/immobilie-verkaufen" img="p/zugang-eigentuemer" alt="Gepflegte Stadtvilla in der Abenddämmerung (Beispielbild)" eyebrow="Für Eigentümer" title="Meine Immobilie verkaufen." text="Diskret. Strukturiert. Persönlich." cta="Objektreport anfragen" />
            <Door to="/kapitalanlage-immobilien" img="p/zugang-investor" alt="Modernes Mehrfamilienhaus mit Natursteinfassade (Beispielbild)" eyebrow="Für Investoren" title="Passende Immobilien finden." text="Ausgewählt. Analysiert. Auf Ihr Profil abgestimmt." cta="Suchprofil erstellen" d={120} />
          </div>
        </div>
      </section>

      {/* 03 – Drei Stärken */}
      <section className="sec dark ss-sec" aria-labelledby="h-str">
        <div className="wrap">
          <SectionHead eyebrow="Leistungslogik" title="Drei Stärken. Ein Zusammenhang." />
        </div>
        <StrengthStack items={[
            { t: 'Zugang', d: 'Immobilien abseits öffentlicher Portale.', img: '/media/p/h-zugang.webp', icon: 'key' },
            { t: 'Analyse', d: 'Wert, Potenzial und Risiken nachvollziehbar einordnen.', img: '/media/p/h-analyse.webp', icon: 'chart' },
            { t: 'Abwicklung', d: 'Persönlich begleitet zur fundierten Entscheidung.', img: '/media/p/h-p-begleitung.webp', icon: 'hand' },
          ]} />
      </section>

      {/* 04 – Objektreport als Blätterstapel */}
      <section className="sec dark rp-sec" aria-labelledby="h-rep">
        <ReportStack />
      </section>

      {/* 05 – Zwei nachvollziehbare Prozesse */}
      <section className="sec dark proc-sec" aria-labelledby="h-proc">
        <div className="wrap">
          <SectionHead eyebrow="Ablauf" title="Der Ablauf." />
          <ProcessTimeline />
        </div>
      </section>

      {/* 06 – Eigentümer */}
      {/* Für Eigentümer: entfällt, weil Zwei Wege und Ablauf den Eigentümer schon abdecken */}

      {/* 07 – Investoren und Matching */}
      <section className="sec dark ink wide-sec" aria-labelledby="h-match">
        <div className="wrap">
          <SectionHead eyebrow="Für Investoren" title="Nicht jedes Objekt. Das passende." lead="Suchprofil und Immobilieninformationen sinnvoll zusammenführen." />
          <PropertyDashboard />
          <div className="btn-row"><Btn to="/investorenkreis" variant="marine">Suchprofil erstellen</Btn></div>
        </div>
      </section>

      {/* 08 – Menschen: ausgeblendet, bis bestätigte Porträts und Profile vorliegen (siehe docs/abgleich-masterprompt.md) */}

      {/* 09 – Deutschlandweit: Karte der Bundesländer mit Regionsauswahl */}
      <section id="regionen" className="sec dark gm-sec" aria-labelledby="h-de">
        <div className="wrap"><GermanyMap /></div>
      </section>

      {/* 10 – Wissen als Editorial */}
      <section className="sec dark wis-sec" aria-labelledby="h-wis">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Wissen</p><h2 id="h-wis" className="h2 rv">Hinter die Fassade schauen.</h2></header>
        </div>
        <KnowledgeTabs full cat={wcat} setCat={setWcat} />
        <div className="wrap">
          <div className="btn-row"><Btn to="/wissen">Wissen entdecken</Btn></div>
          <p className="small muted" style={{ marginTop: 16 }}>Entwürfe sind gekennzeichnet und keine aktuelle Recherche oder Marktdaten.</p>
        </div>
      </section>

      {/* 11 – Kontaktentscheidung */}
      <section className="sec dark kx" aria-labelledby="h-next">
        <div className="wrap kx-in">
          <figure className="kx-pic"><img src="/media/p/kontakt-treppe.webp" alt="" loading="lazy" /><figcaption>Illustrationsbild</figcaption></figure>
          <div className="kx-card">
            <p className="eyebrow rv">Kontakt</p>
            <h2 id="h-next" className="h2 rv">Was ist Ihr nächster Schritt?</h2>
            <nav className="kx-list rv" aria-label="Nächster Schritt">
              <Link to="/immobilie-verkaufen#anfrage"><small>Für Eigentümer</small><b>Immobilie prüfen lassen</b><span className="kx-go" aria-hidden="true">→</span></Link>
              <Link to="/investorenkreis"><small>Für Investoren</small><b>Investmentprofil erstellen</b><span className="kx-go" aria-hidden="true">→</span></Link>
              <Link to="/partner#anfrage"><small>Für Partner</small><b>Partnerschaft besprechen</b><span className="kx-go" aria-hidden="true">→</span></Link>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}
