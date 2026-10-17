import { Tabs } from './ui.jsx'

// Interaktive Musteransicht des Objektreports. Rein illustrativ: keine Werte, Renditen, Bewertungen oder Käuferzahlen.
const STAMP = 'Illustratives Muster – keine Objektbewertung'

const Row = ({ label, children }) => <div className="rep-row"><b>{label}</b><div>{children}</div></div>
const Bar = ({ w, l, band }) => <div className={`bar${band ? ' band' : ''}`} style={{ '--w': w, '--l': l }}><i /></div>

const PANELS = [
  { id: 'wert', label: 'Marktwert', small: '01', render: () => (
    <>
      <h3>Marktwert einordnen</h3>
      <p>Mehrere Verfahren werden nebeneinandergestellt. Die Darstellung zeigt nur das Prinzip einer Spanne, keine Zahlen.</p>
      <div className="rep-rows">
        <Row label="Vergleichswert"><Bar band l="22%" w="38%" /></Row>
        <Row label="Ertragswert"><Bar band l="34%" w="34%" /></Row>
        <Row label="Sachwert"><Bar band l="14%" w="30%" /></Row>
      </div>
      <p className="rep-note">Eine Marktwerteinschätzung ist kein verbindliches Gutachten. Darstellung schematisch.</p>
    </>) },
  { id: 'standort', label: 'Standort', small: '02', render: () => (
    <>
      <h3>Standort prüfen</h3>
      <p>Der Standort wird anhand nachvollziehbarer Kriterien beschrieben. Jeder Baustein nennt Quelle und Stand.</p>
      <div className="rep-rows">
        <Row label="Mikrolage">Umfeld, Erreichbarkeit und Nutzungsmix</Row>
        <Row label="Infrastruktur">Anbindung, Versorgung, Bildungs- und Mobilitätsangebote</Row>
        <Row label="Entwicklung">Planungsstand und bekannte Vorhaben im Umfeld</Row>
      </div>
      <p className="rep-note">Inhalte beispielhaft. Kein Standortbefund.</p>
    </>) },
  { id: 'potenzial', label: 'Potenzial', small: '03', render: () => (
    <>
      <h3>Potenziale benennen</h3>
      <p>Möglichkeiten werden als Prüffragen formuliert, nicht als Zusage.</p>
      <div className="rep-rows">
        <Row label="Bestandsoptimierung">Prüfstatus: offen</Row>
        <Row label="Nachverdichtung">Prüfstatus: offen</Row>
        <Row label="Nutzungsänderung">Prüfstatus: offen</Row>
      </div>
      <p className="rep-note">Rechtliche Vorprüfungen sind keine rechtsverbindliche Entscheidung.</p>
    </>) },
  { id: 'wirtschaft', label: 'Wirtschaftlichkeit', small: '04', render: () => (
    <>
      <h3>Szenarien vergleichen</h3>
      <p>Wirtschaftliche Szenarien zeigen, wie sich Annahmen auswirken. Hier ohne Zahlen, nur als Prinzip.</p>
      <div className="rep-rows">
        <Row label="Basisszenario"><Bar w="55%" /></Row>
        <Row label="Chancenszenario"><Bar w="72%" /></Row>
        <Row label="Risikoszenario"><Bar w="38%" /></Row>
      </div>
      <p className="rep-note">Eingangsgrößen: Mieteinnahmen, Bewirtschaftung, Instandhaltung, Finanzierung. Keine Renditegarantie.</p>
    </>) },
  { id: 'hinweise', label: 'Prüfhinweise', small: '05', render: () => (
    <>
      <h3>Offene Punkte sichtbar machen</h3>
      <p>Der Bericht benennt, was noch zu prüfen ist, bevor eine Entscheidung getroffen werden sollte.</p>
      <ul className="checks">
        <li>Vollständigkeit und Aktualität der Objektunterlagen</li>
        <li>Mietverhältnisse und Vertragslage</li>
        <li>Baulicher Zustand und Instandhaltungsstand</li>
        <li>Rechtliche Rahmenbedingungen am Standort</li>
      </ul>
      <p className="rep-note">Beispielhafte Prüfhinweise. Menschliche Freigabe vor jeder Weitergabe.</p>
    </>) },
  { id: 'nachfrage', label: 'Nachfrage', small: '06', render: () => (
    <>
      <h3>Nachfrage einschätzen</h3>
      <p>Die Nachfrage wird über passende Suchprofile beschrieben: Region, Budgetband und Immobilientyp.</p>
      <div className="rep-rows">
        <Row label="Profilpassung">Welche Suchprofile zum Objekt passen könnten</Row>
        <Row label="Annahmen">Welche Annahmen der Einschätzung zugrunde liegen</Row>
      </div>
      <p className="rep-note">Keine Käuferzahlen, keine Live-Nachfrage.</p>
    </>) },
]

export default function ReportViewer({ id }) {
  return (
    <div id={id} className="rep-wrap">
      <Tabs
        label="Analyseebenen des Objektreports (Muster)"
        items={PANELS}
        className="rep" listClass="rep-tabs" panelClass="rep-panel" tabClass="rep-tab" vertical
        renderPanel={(p) => (<><span className="rep-stamp">{STAMP}</span>{p.render()}</>)}
      />
    </div>
  )
}
