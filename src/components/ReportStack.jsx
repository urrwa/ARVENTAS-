import { useState } from 'react'
import { Btn } from './ui.jsx'
import { PANELS } from './ReportViewer.jsx'

// Objektreport als Blätterstapel: Beim Scrollen heben sich die Seiten des Berichts nacheinander ab, rechts erscheint der passende Abschnitt.
// Schmale Bildschirme und reduzierte Bewegung: die ruhige Reiteransicht (ReportViewer).

// Jede Ebene beantwortet eine einfache Frage; die Seite rechts zeigt, wie die Antwort im Report aussieht.
const QA = {
  wert: ['Was ist die Immobilie ungefähr wert?', 'Mehrere Bewertungsverfahren nebeneinander, als Spanne und nicht als Einzelzahl.'],
  standort: ['Wie ist der Standort einzuordnen?', 'Lage, Umfeld und Anbindung verständlich zusammengefasst.'],
  potenzial: ['Was wäre möglich?', 'Modernisierung, Ausbau oder Umnutzung, mit Chancen und Grenzen.'],
  wirtschaft: ['Rechnet sich das Objekt?', 'Verschiedene Szenarien im Vergleich, ohne Renditezusage.'],
  hinweise: ['Was sollte vor einer Entscheidung geprüft werden?', 'Offene Punkte und Hinweise, nach Wichtigkeit geordnet.'],
  nachfrage: ['Wer könnte sich dafür interessieren?', 'Einschätzung, welche Interessentengruppen zum Objekt passen.'],
}

export default function ReportStack() {
  const [a, setA] = useState(0)
  const [q, ans] = QA[PANELS[a].id]
  return (
    <div className="rpx">
      <div className="rpx-bg" aria-hidden="true"><img src="/media/p/report-photo.webp" alt="" loading="lazy" /></div>
      <div className="wrap rpx-in">
        <header className="sec-head rp-head">
          <p className="eyebrow rv">Objektreport</p>
          <h2 id="h-rep" className="h2 rv">Ein klares Bild.</h2>
          <p className="lead rv">Datenbasiert analysiert. Persönlich geprüft.</p>
        </header>
        <ol className="rpx-list" aria-label="Analyseebenen">
          {PANELS.map((p, k) => (
            <li key={p.id}><button type="button" className={k === a ? 'on' : ''} aria-current={k === a ? 'true' : undefined} onMouseEnter={() => setA(k)} onFocus={() => setA(k)} onClick={() => setA(k)}><small>{p.small}</small><span>{p.label}</span></button></li>
          ))}
        </ol>
        <div className="rpx-qa" key={a} aria-live="polite">
          <p className="rpx-q">{q}</p>
          <p className="rpx-a">{ans}</p>
        </div>
        <div className="btn-row">
          <Btn to="/objektreport#muster" variant="line">Muster ansehen</Btn>
          <Btn to="/immobilie-verkaufen#anfrage">Objektreport anfragen</Btn>
        </div>
        <p className="small rp-note">Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen. Beispielbild, keine Objektbewertung.</p>
      </div>
    </div>
  )
}
