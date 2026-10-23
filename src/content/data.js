import { INSIGHTS_IMG } from './images.js'
// Inhalte und Auswahllisten. Keine erfundenen Zahlen, Referenzen oder Unternehmensdaten.
export const REGIONS = [
  { id: 'bw', name: 'Baden-Württemberg' }, { id: 'by', name: 'Bayern' }, { id: 'be', name: 'Berlin' },
  { id: 'bb', name: 'Brandenburg' }, { id: 'hb', name: 'Bremen' }, { id: 'hh', name: 'Hamburg' },
  { id: 'he', name: 'Hessen' }, { id: 'mv', name: 'Mecklenburg-Vorpommern' }, { id: 'ni', name: 'Niedersachsen' },
  { id: 'nw', name: 'Nordrhein-Westfalen' }, { id: 'rp', name: 'Rheinland-Pfalz' }, { id: 'sl', name: 'Saarland' },
  { id: 'sn', name: 'Sachsen' }, { id: 'st', name: 'Sachsen-Anhalt' }, { id: 'sh', name: 'Schleswig-Holstein' },
  { id: 'th', name: 'Thüringen' },
]

export const PROPERTY_TYPES = ['Mehrfamilienhaus', 'Wohn- und Geschäftshaus', 'Eigentumswohnungen (Paket)', 'Gewerbeimmobilie', 'Grundstück / Entwicklungsobjekt', 'Sonstiges']

export const OWNER_PROCESS = [
  { t: 'Erstkontakt', d: 'Anliegen und Ausgangslage klären.' },
  { t: 'Unterlagen', d: 'Vorhandene Objektunterlagen sichten.' },
  { t: 'Analyse', d: 'Wert, Potenzial und Risiken einordnen.' },
  { t: 'Besprechung', d: 'Ergebnis besprechen, gegebenenfalls Mandat.' },
  { t: 'Käuferauswahl', d: 'Passende Interessenten auswählen.' },
  { t: 'Transaktionsbegleitung', d: 'Persönlich begleitet bis zum Abschluss.' },
]
export const INVESTOR_PROCESS = [
  { t: 'Suchprofil', d: 'Region, Objektart und Budget festlegen.' },
  { t: 'Qualifizierung', d: 'Ziele und Erfahrung besprechen.' },
  { t: 'Matching', d: 'Profil und Immobilieninformationen zusammenführen.' },
  { t: 'Objektprüfung', d: 'Unterlagen und Analyse gemeinsam prüfen.' },
  { t: 'Entscheidung', d: 'Auf nachvollziehbarer Grundlage entscheiden.' },
  { t: 'Transaktionsbegleitung', d: 'Persönlich begleitet bis zum Abschluss.' },
]
export const PARTNER_PROCESS = [
  { t: 'Anfrage', d: 'Kurz Ihr Unternehmen und Ihr Anliegen schildern.' },
  { t: 'Kennenlernen', d: 'Gespräch über Schwerpunkte und Erwartungen.' },
  { t: 'Rollen klären', d: 'Zuständigkeiten und Schnittstellen festlegen.' },
  { t: 'Zusammenarbeit vereinbaren', d: 'Rahmen schriftlich festhalten.' },
]

export const OWNER_FAQ = [
  { q: 'Welche Objekte werden geprüft?', a: 'Grundsätzlich Mehrfamilienhäuser, Wohn- und Geschäftshäuser sowie weitere Bestandsimmobilien. Der genaue Umfang wird im Erstgespräch gemeinsam festgelegt.', open: true },
  { q: 'Welche Unterlagen werden benötigt?', a: 'Das hängt vom Objekt ab. Welche Unterlagen hilfreich sind, wird im Erstgespräch gemeinsam geklärt; Sie müssen nichts vorab zusammenstellen.', open: true },
  { q: 'Wann entstehen Kosten?', a: 'Die Konditionen sind noch nicht freigegeben. Aussagen zu Kosten werden erst nach redaktioneller und kaufmännischer Freigabe veröffentlicht.', open: true },
  { q: 'Ist ein Verkaufsauftrag erforderlich?', a: 'Die Anfrage eines Objektreports ist unverbindlich im Sinne einer Erstprüfung. Ob und wann ein Mandat sinnvoll ist, wird nach der Besprechung entschieden. Verbindliche Regelungen folgen nach Freigabe.', open: true },
  { q: 'Wie wird die Vertraulichkeit gehandhabt?', a: 'Ihr Objekt wird nicht öffentlich beworben. Konkrete Adressen und Eigentümerdaten werden nicht öffentlich gezeigt. Die vertraglichen Vertraulichkeitsregeln werden nach Freigabe ergänzt.', open: true },
  { q: 'Wie wird die Bearbeitungszeit vereinbart?', a: 'Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen.', open: false },
]
export const CONTACT_FAQ = [
  { q: 'Welchen Zugang soll ich wählen?', a: 'Eigentümer, Investoren und Partner haben getrennte Wege. Wählen Sie oben den Zugang, der zu Ihrem Anliegen passt.', open: false },
  { q: 'Wie geht es nach meiner Anfrage weiter?', a: 'Wir prüfen Ihre Angaben und melden uns persönlich. Die genauen Abläufe werden vor der Veröffentlichung ergänzt.', open: true },
  { q: 'Wird meine Anfrage vertraulich behandelt?', a: 'Ihre Angaben werden nicht öffentlich gezeigt. Die vertraglichen Vertraulichkeitsregeln werden nach Freigabe ergänzt.', open: true },
  { q: 'Gibt es eine Online-Terminbuchung?', a: 'Derzeit nicht. Bitte senden Sie eine Terminanfrage über eines der Formulare; einen Termin vereinbaren wir persönlich mit Ihnen.', open: false },
]
export const INVESTOR_FAQ = [
  { q: 'Was bedeutet Off-Market?', a: 'Off-Market-Immobilien werden nicht über öffentliche Portale angeboten. Sie werden stattdessen gezielt an passende Interessenten vermittelt.', open: false },
  { q: 'Muss ich mich registrieren, um die Informationen zu lesen?', a: 'Nein. Die Informationsseiten sind ohne Registrierung zugänglich. Ein Suchprofil legen Sie nur an, wenn Sie passende Immobilien erhalten möchten.', open: false },
  { q: 'Welche Angaben benötigt das Suchprofil?', a: 'Region, Immobilientyp und Budgetband, dazu Erfahrung und Zeithorizont sowie Ihre Kontaktdaten. Bonitätsunterlagen werden im Erstformular nicht abgefragt.', open: false },
  { q: 'Erhalte ich Kaufempfehlungen oder Renditegarantien?', a: 'Nein. ARVENTAS gibt keine automatischen Kaufempfehlungen und keine Renditegarantien. Sie erhalten nachvollziehbare Informationen für Ihre eigene Entscheidung.', open: false },
  { q: 'Welche Kosten entstehen für Investoren?', a: 'Die Konditionen sind noch nicht freigegeben und werden nach Freigabe veröffentlicht.', open: true },
]
export const REPORT_FAQ = [
  { q: 'Ist der Objektreport ein Gutachten?', a: 'Nein. Eine Marktwerteinschätzung ist kein verbindliches Gutachten. Wenn Sie ein verbindliches Gutachten benötigen, wird dies gesondert besprochen.', open: false },
  { q: 'Wie lange dauert die Erstellung?', a: 'Umfang und Bearbeitungszeit nach Prüfung Ihrer Unterlagen.', open: false },
  { q: 'Was kostet der Objektreport?', a: 'Die Konditionen sind noch nicht freigegeben und werden nach Freigabe veröffentlicht.', open: true },
  { q: 'Sind rechtliche Vorprüfungen verbindlich?', a: 'Nein. Rechtliche Vorprüfungen sind Hinweise zur Orientierung und keine rechtsverbindliche Entscheidung.', open: false },
]

export const ARTICLES = [
  {
    slug: 'off-market-verstehen', cat: 'Off-Market', title: 'Off-Market verstehen', img: INSIGHTS_IMG.articles['off-market-verstehen'],
    teaser: 'Was Off-Market bedeutet, wie der Zugang funktioniert und worauf Sie achten sollten.',
    sections: [
      { h: 'Was bedeutet Off-Market?', p: ['Off-Market-Immobilien werden nicht über öffentliche Immobilienportale vermarktet. Der Kreis der Interessenten ist begrenzt, die Ansprache erfolgt persönlich.'] },
      { h: 'Warum entscheiden sich Eigentümer dafür?', p: ['Typische Beweggründe sind Diskretion, Planbarkeit und ein kontrollierter Kreis von Interessenten. Welche Gründe im Einzelfall überwiegen, ist individuell verschieden.'] },
      { h: 'Worauf sollten Investoren achten?', p: ['Auch bei Off-Market-Objekten gilt: Informationen prüfen, Annahmen hinterfragen, Unterlagen vollständig sichten. Ein nicht öffentliches Angebot ist kein Qualitätsmerkmal an sich.'] },
    ],
    steps: 'Wenn Sie wissen möchten, wie ein Objekt eingeordnet werden kann, ist der Objektreport der nächste Schritt.',
  },
  {
    slug: 'immobilien-bewerten', cat: 'Immobilienbewertung', title: 'Immobilien bewerten', img: INSIGHTS_IMG.articles['immobilien-bewerten'],
    teaser: 'Marktwerteinschätzung und Gutachten unterscheiden – und typische Bewertungsverfahren einordnen.',
    sections: [
      { h: 'Marktwerteinschätzung ist kein Gutachten', p: ['Eine Marktwerteinschätzung gibt eine fundierte Orientierung. Ein verbindliches Gutachten wird von einem dafür qualifizierten Sachverständigen erstellt und ist eine eigene Leistung.'] },
      { h: 'Typische Verfahren', p: ['In Deutschland sind das Vergleichswertverfahren, das Ertragswertverfahren und das Sachwertverfahren gebräuchlich. Welches Verfahren geeignet ist, hängt von der Objektart ab.'] },
      { h: 'Annahmen sichtbar machen', p: ['Jede Bewertung beruht auf Annahmen. Ein guter Bericht benennt Datenquellen, Stand und Annahmen, damit Sie die Ergebnisse nachvollziehen können.'] },
    ],
    steps: 'Im Objektreport werden Herkunft von Daten und Annahmen je Baustein ausgewiesen.',
  },
  {
    slug: 'potenziale-einordnen', cat: 'Entwicklungspotenziale', title: 'Potenziale einordnen', img: INSIGHTS_IMG.articles['potenziale-einordnen'],
    teaser: 'Wie sich Entwicklungspotenziale systematisch und ohne Versprechen einordnen lassen.',
    sections: [
      { h: 'Potenzial ist keine Zusage', p: ['Potenziale beschreiben Möglichkeiten, keine Ergebnisse. Ob sie sich realisieren lassen, hängt von Baurecht, Zustand, Markt und Finanzierung ab.'] },
      { h: 'Typische Fragestellungen', p: ['Bestandsoptimierung, Nachverdichtung oder Nutzungsänderung sind gängige Überlegungen. Jede davon braucht eine eigene rechtliche und wirtschaftliche Prüfung.'] },
      { h: 'Vorprüfung statt Entscheidung', p: ['Rechtliche Vorprüfungen dienen der Orientierung. Sie ersetzen keine verbindliche Auskunft der zuständigen Stellen.'] },
    ],
    steps: 'Im Objektreport finden Sie Prüfhinweise, die offene Punkte benennen.',
  },
]
export const CATEGORIES = ['Alle', 'Off-Market', 'Immobilienbewertung', 'Kapitalanlage', 'Entwicklungspotenziale', 'Marktinformationen']
