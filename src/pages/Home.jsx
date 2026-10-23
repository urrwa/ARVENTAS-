import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import HoverList from '../components/HoverList.jsx'
import HomeFilm from '../components/HomeFilm.jsx'
import { Btn, SectionHead, Placeholder } from '../components/ui.jsx'
import ReportViewer from '../components/ReportViewer.jsx'
import ProcessTimeline from '../components/ProcessTimeline.jsx'
import MatchingIllustration from '../components/MatchingIllustration.jsx'
import GermanyRegionSelector from '../components/GermanyRegionSelector.jsx'
import Brand from '../components/Brand.jsx'
import KnowledgeTabs from '../components/KnowledgeTabs.jsx'

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

// Zugangs-Kachel: beim Überfahren folgt ein kleines Bild dem Cursor und wechselt durch Beispielbilder (nur Maus).
function Door({ to, img, alt, eyebrow, title, text, cta, d, peek }) {
  const box = useRef(null), pv = useRef(null)
  const [on, setOn] = useState(false), [i, setI] = useState(0), [armed, setArmed] = useState(false)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 })
  useEffect(() => {
    if (!on) return
    const t = setInterval(() => setI((n) => (n + 1) % peek.length), 750)
    return () => clearInterval(t)
  }, [on, peek.length])
  const loop = () => {
    const q = pos.current
    q.x += (q.tx - q.x) * 0.14; q.y += (q.ty - q.y) * 0.14
    if (pv.current) pv.current.style.transform = `translate3d(${q.x}px, ${q.y}px, 0)`
    q.raf = Math.abs(q.tx - q.x) + Math.abs(q.ty - q.y) > 0.4 ? requestAnimationFrame(loop) : 0
  }
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = box.current.getBoundingClientRect(), q = pos.current
    q.tx = Math.min(Math.max(e.clientX - r.left, 130), r.width - 130); q.ty = Math.min(Math.max(e.clientY - r.top, 170), r.height - 210)
    if (!on) { q.x = q.tx; q.y = q.ty; setOn(true); setArmed(true) }
    if (!q.raf) q.raf = requestAnimationFrame(loop)
  }
  const leave = () => { setOn(false); cancelAnimationFrame(pos.current.raf); pos.current.raf = 0 }
  return (
    <Link ref={box} to={to} className="door rv" style={d ? { '--d': d } : undefined} onPointerMove={move} onPointerLeave={leave}>
      <img src={`/media/${img}.webp`} alt={alt} loading="lazy" />
      <div className="door-pv" ref={pv} data-on={on ? '1' : '0'} aria-hidden="true">
        {armed && <div className="door-pv-frame">{peek.map((n, k) => <img key={n} src={`/media/${n}.webp`} alt="" decoding="async" className={k === i ? 'on' : ''} />)}</div>}
        {armed && <span className="door-pv-n" data-notr>{String(i + 1).padStart(2, '0')} — {String(peek.length).padStart(2, '0')}</span>}
      </div>
      <div className="door-txt"><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{text}</p><span className="btn btn-gold">{cta} <span className="arr" aria-hidden="true">→</span></span></div>
    </Link>
  )
}

export default function Home() {
  const [wcat, setWcat] = useState('Alle')
  // Sticky-Cover: Abschnitt bleibt stehen, sobald sein Unterkante den unteren Bildrand erreicht (top negativ bei hohen Abschnitten).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.stick-under'))
    const set = () => els.forEach((el) => { el.style.top = Math.min(0, window.innerHeight - el.offsetHeight) + 'px' })
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])
  return (
    <>
      <Seo title="ARVENTAS | Off-Market-Immobilien deutschlandweit" description="Ausgewählte Off-Market-Immobilien, fundierte Objektanalysen und persönliche Begleitung für Eigentümer und Investoren in ganz Deutschland." />
      <HomeFilm />

      {/* 02 – Zwei visuelle Zugänge */}
      <section id="zugaenge" className="sec dark doors-sec" aria-labelledby="h-zug">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Zwei Wege</p><h2 id="h-zug" className="h2 rv">Was möchten Sie bewegen?</h2></header>
        </div>
          <div className="doors">
            <Door to="/immobilie-verkaufen" img="p/u-eingang-travertin" alt="Wohnhaus mit Naturstein-Fassade (Beispielbild)" eyebrow="Für Eigentümer" title="Meine Immobilie verkaufen." text="Diskret. Strukturiert. Persönlich." cta="Objektreport anfragen"
              peek={['p/u-schluessel', 'p/bw.step.3', 'p/bw.step.2', 'p/bw.area.4', 'p/u-besprechungsraum', 'p/u-eingang-stein']} />
            <Door to="/kapitalanlage-immobilien" img="p/vm.area.2" alt="Reihenhäuser im Morgenlicht (Beispielbild)" eyebrow="Für Investoren" title="Passende Immobilien finden." text="Ausgewählt. Analysiert. Auf Ihr Profil abgestimmt." cta="Suchprofil erstellen" d={120}
              peek={['p/u-luftbild', 'p/vm.res.1', 'p/u-notizbuch', 'p/ma.area.2', 'p/ma.area.0', 'p/di.area.3']} />
          </div>
      </section>

      {/* 03 – Drei Stärken */}
      <section className="sec dark" aria-labelledby="h-str">
        <div className="wrap">
          <SectionHead eyebrow="Leistungslogik" title="Drei Stärken. Ein Zusammenhang." />
          <HoverList items={[
            { t: 'Zugang', d: 'Immobilien abseits öffentlicher Portale.', img: '/media/p/u-altstadt.webp', icon: 'key' },
            { t: 'Analyse', d: 'Wert, Potenzial und Risiken nachvollziehbar einordnen.', img: '/media/p/u-karte.webp', icon: 'chart' },
            { t: 'Abwicklung', d: 'Persönlich begleitet zur fundierten Entscheidung.', img: '/media/p/u-handschlag-dunkel.webp', icon: 'hand' },
          ]} />
        </div>
      </section>

      {/* 04 – Interaktiver Objektreport */}
      <section className="sec dark" aria-labelledby="h-rep">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Objektreport</p><h2 id="h-rep" className="h2 rv">Nicht nur ein Wert.<br />Ein klares Bild.</h2><p className="lead rv">Datenbasiert analysiert. Persönlich geprüft.</p></header>
          <div className="rv"><ReportViewer id="muster-home" /></div>
          <div className="btn-row">
            <Btn to="/objektreport#muster" variant="line">Muster ansehen</Btn>
            <Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn>
          </div>
          <p className="small" style={{ marginTop: 18 }}>Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen.</p>
        </div>
      </section>

      {/* 05 – Zwei nachvollziehbare Prozesse */}
      <section className="sec dark" aria-labelledby="h-proc">
        <div className="wrap">
          <SectionHead eyebrow="Ablauf" title="Vom ersten Gespräch zum nächsten Schritt." />
          <ProcessTimeline />
        </div>
      </section>

      {/* 06 – Eigentümer */}
      <section className="sec dark" aria-labelledby="h-own">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Für Eigentümer</p><h2 id="h-own" className="h2 rv">Ihr Eigentum.<br />Kein öffentliches Schaufenster.</h2><p className="lead rv">Wert, Potenziale und Verkaufswege klären – mit einem persönlichen Ansprechpartner.</p></header>
          <div className="windows rv" aria-hidden="true">
            <div><img src="/media/p/bw.step.0.webp" alt="" loading="lazy" /></div>
            <div><img src="/media/p/bw.area.0.webp" alt="" loading="lazy" /></div>
            <div><img src="/media/p/bw.res.2.webp" alt="" loading="lazy" /></div>
          </div>
          <ul className="labels rv"><li><span>01</span>Wert verstehen.</li><li><span>02</span>Optionen prüfen.</li><li><span>03</span>Diskret vermarkten.</li></ul>
          <div className="btn-row"><Btn to="/immobilie-verkaufen#anfrage">Objektprüfung anfragen</Btn></div>
          <p className="small muted" style={{ marginTop: 16 }}>Beispielbilder, keine Objekte von <Brand />. Es werden keine vertraulichen Adressen gezeigt.</p>
        </div>
      </section>

      {/* 07 – Investoren und Matching */}
      <section className="sec dark" aria-labelledby="h-match">
        <div className="wrap">
          <SectionHead eyebrow="Für Investoren" title="Nicht jedes Objekt. Das passende." lead="Suchprofil und Immobilieninformationen sinnvoll zusammenführen." />
          <MatchingIllustration />
          <div className="btn-row"><Btn to="/investorenkreis" variant="marine">Suchprofil erstellen</Btn></div>
        </div>
      </section>

      {/* 08 – Persönliche Verantwortung */}
      <section className="sec dark stick-under" aria-labelledby="h-team">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Menschen</p><h2 id="h-team" className="h2 rv">Daten prüfen.<br />Menschen entscheiden.</h2><p className="lead rv">Persönliche Verantwortung hinter jeder freigegebenen Analyse.</p></header>
          <div className="team">
            <div className="portrait rv"><div><b>Porträt folgt</b>Platzhalter für ein echtes Editorial-Porträt mit Fachgebiet. Vor Veröffentlichung ersetzen oder ausblenden.</div></div>
            <div className="profiles rv">
              <p className="small muted">Platzhalter – bestätigte Profile folgen. Keine erfundenen Namen oder Rollen.</p>
              <div className="prof"><div className="av" /><div><b>Profil folgt</b><small>Name, Rolle und Fachgebiet nach Bestätigung</small></div></div>
              <div className="prof"><div className="av" /><div><b>Profil folgt</b><small>Name, Rolle und Fachgebiet nach Bestätigung</small></div></div>
            </div>
          </div>
          <div className="btn-row"><Btn to="/ueber-uns">Unser Team kennenlernen</Btn></div>
        </div>
      </section>

      {/* 09 – Deutschlandweit */}
      <section className="sec dark cover-next" aria-labelledby="h-de">
        <div className="wrap">
          <SectionHead eyebrow="Deutschlandweit" title="Regional verstehen. Deutschlandweit verbinden." lead="Immobilienkompetenz für Eigentümer und Investoren in ganz Deutschland." />
          <GermanyRegionSelector />
        </div>
      </section>

      {/* 10 – Wissen als Editorial */}
      <section className="sec ivory" aria-labelledby="h-wis">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Wissen</p><h2 id="h-wis" className="h2 rv">Hinter die Fassade schauen.</h2></header>
          <KnowledgeTabs cat={wcat} setCat={setWcat} />
          <div className="btn-row"><Btn to="/wissen" variant="marine">Wissen entdecken</Btn></div>
          <p className="small muted" style={{ marginTop: 16 }}>Entwürfe sind gekennzeichnet und keine aktuelle Recherche oder Marktdaten.</p>
        </div>
      </section>

      {/* 11 – Kontaktentscheidung */}
      <section className="sec dark" aria-labelledby="h-next">
        <div className="wrap">
          <header className="sec-head"><p className="eyebrow rv">Kontakt</p><h2 id="h-next" className="h2 rv">Was ist Ihr nächster Schritt?</h2></header>
          <div className="choose">
            <nav className="choose-list rv" aria-label="Nächster Schritt">
              <Link to="/immobilie-verkaufen#anfrage">Immobilie prüfen lassen <span className="arr" aria-hidden="true">→</span></Link>
              <Link to="/investorenkreis">Investmentprofil erstellen <span className="arr" aria-hidden="true">→</span></Link>
              <Link to="/partner#anfrage">Partnerschaft besprechen <span className="arr" aria-hidden="true">→</span></Link>
            </nav>
            <div className="choose-img rv"><img src="/media/p/u-lounge-fenster.webp" alt="" loading="lazy" style={{ objectPosition: '50% 20%' }} /></div>
          </div>
          <p className="small" style={{ marginTop: 20 }}>Die Auswahl führt zum passenden Formular.</p>
        </div>
      </section>
    </>
  )
}
