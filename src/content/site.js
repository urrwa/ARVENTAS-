// Inhalte der Website „Strategische Immobilienentwicklung mit System“.
// Grundlage sind die vom Auftraggeber gelieferten Seitenentwürfe (Struktur, Stil, Leistungsbereiche).
// Bewusst weggelassen: Kennzahlen, Kundenzitate, Referenzen, Namen und Kontaktdaten aus den Entwürfen, da nicht bestätigt.

import { SERVICE_IMG, SYSTEM_IMG } from './images.js'

export const CLAIM = 'Strategische Immobilienentwicklung mit System.'

export const SERVICE_NAV = [
  { to: '/leistungen/marktanalyse', t: 'Marktanalyse' },
  { to: '/leistungen/immobilienbewertung', t: 'Immobilienbewertung' },
  { to: '/leistungen/strategische-analyse', t: 'Strategische Analyse' },
  { to: '/leistungen/strategische-vermarktung', t: 'Strategische Vermarktung' },
  { to: '/leistungen/development-intelligence', t: 'Development Intelligence' },
]

// Das System in fünf Schritten (Reihenfolge einheitlich auf allen Seiten)
export const CHAIN = [
  { icon: 'chart', t: 'Markt verstehen' },
  { icon: 'building', t: 'Immobilie bewerten' },
  { icon: 'search', t: 'Potenzial analysieren' },
  { icon: 'target', t: 'Strategie entwickeln' },
  { icon: 'users', t: 'Vermarktung & Entwicklung steuern' },
]

export const AUDIENCES = [
  { icon: 'crane', t: 'Projektentwickler', d: 'Für Entwickler, die Chancen frühzeitig erkennen und Projekte strategisch einordnen wollen.' },
  { icon: 'user', t: 'Investoren', d: 'Für Investoren, die fundierte Entscheidungen auf Basis von Markt und Potenzial treffen möchten.' },
  { icon: 'building', t: 'Immobiliengesellschaften', d: 'Für Bestandshalter und Betreiber, die ihr Portfolio zukunftsorientiert steuern möchten.' },
  { icon: 'pin', t: 'Gewerbliche Eigentümer', d: 'Für Eigentümer, die Vermarktung, Nutzung und Entwicklung professionell planen wollen.' },
  { icon: 'handshake', t: 'Strategische Partner', d: 'Für Berater, Architekten und Partner, die mit fundierten Analysen arbeiten möchten.' },
]

export const BENEFITS = [
  { icon: 'eye', t: 'Mehr Klarheit', d: 'Ein vollständiges Bild statt fragmentierter Informationen.' },
  { icon: 'list', t: 'Bessere Priorisierung', d: 'Fokus auf Projekte mit echtem Potenzial und starker Grundlage.' },
  { icon: 'shield', t: 'Mehr Kontrolle', d: 'Risiken früh erkennen und Entscheidungen absichern.' },
  { icon: 'megaphone', t: 'Stärkere Vermarktung', d: 'Nachfrage verstehen und gezielt am Markt positionieren.' },
  { icon: 'trending', t: 'Strategischere Entwicklung', d: 'Projekte gezielt steuern und Wert nachhaltig schaffen.' },
]

export const VERSUS = {
  left: { t: 'Klassischer Ansatz', items: ['Objekt ansehen', 'Preis einschätzen', 'Vermarktung starten', 'Auf Nachfrage hoffen'] },
  right: { t: 'ARVENTAS Ansatz', items: ['Markt verstehen', 'Immobilie bewerten', 'Potenzial erkennen', 'Strategie entwickeln', 'Vermarktung und Entwicklung steuern'] },
  line: 'Wir verkaufen nicht einfach Immobilien. Wir erkennen Entwicklungspotenziale.',
}

// ---------------------------------------------------------------- Leistungen
export const SERVICES = {
  marktanalyse: {
    slug: 'marktanalyse', icon: 'chart', t: 'Marktanalyse', active: 0,
    tag: 'Märkte verstehen. Chancen erkennen.',
    card: 'Wir analysieren Märkte, Standorte, Nachfrage, Preisbewegungen und regionale Potenziale.',
    list: ['Standortanalyse', 'Nachfrageentwicklung', 'Preisbewegungen', 'Marktdynamik', 'regionale Potenziale'],
    cta: 'Marktpotenzial analysieren', ctaLink: 'Mehr erfahren',
    title: 'Märkte verstehen. Chancen früher erkennen.',
    lead: ['ARVENTAS analysiert Standorte, Nachfrage, Preisentwicklung und regionale Entwicklungen, um Immobilienpotenziale fundiert einzuordnen.', 'Eine starke Immobilienentscheidung beginnt nicht beim Objekt, sondern beim Verständnis des Marktes: Wo entsteht Nachfrage? Wie entwickeln sich Preise? Welche Risiken sind sichtbar? Und wo liegt echtes Potenzial?'],
    whyEyebrow: 'Warum Marktanalyse', whyTitle: 'Der Markt entscheidet, ob ein Projekt funktioniert.',
    why: ['Immobilienwerte entstehen nicht isoliert. Nachfrage, Lagequalität, Preisentwicklung, Kaufkraft, Infrastruktur, Wettbewerb und regionale Dynamik beeinflussen, ob ein Standort langfristig tragfähig ist.', 'ARVENTAS betrachtet diese Faktoren im Zusammenhang. Dadurch entsteht ein klareres Bild darüber, welche Chancen ein Markt bietet und welche Entwicklungen kritisch geprüft werden müssen.'],
    whyLine: 'Nicht jede Lage ist ein Potenzial. Nicht jedes Angebot ist eine Chance.',
    factors: [{ icon: 'search', t: 'Nachfrage' }, { icon: 'chart', t: 'Preisentwicklung' }, { icon: 'route', t: 'Infrastruktur' }, { icon: 'scale', t: 'Wettbewerb' }, { icon: 'pin', t: 'Lagequalität' }],
    areasEyebrow: 'Analysebereiche', areasTitle: 'Die wichtigsten Marktinformationen auf einen Blick.',
    areasLead: 'Unsere Marktanalyse schafft eine strukturierte Grundlage für bessere Entscheidungen in Ankauf, Entwicklung, Vermarktung und Investition.',
    areas: [
      { icon: 'pin', t: 'Standortanalyse', d: 'Bewertung von Städten, Regionen, Mikrolagen und Entwicklungsgebieten.', list: ['Lagequalität', 'Infrastruktur', 'Erreichbarkeit', 'Umfeldentwicklung', 'Standortattraktivität'] },
      { icon: 'users', t: 'Nachfrageentwicklung', d: 'Bewertung der Nachfrage nach Nutzungsarten und Zielgruppen.', list: ['Nachfrage nach Nutzungsarten', 'Zielgruppenpotenzial', 'Such- und Marktverhalten', 'regionale Bedarfslage'] },
      { icon: 'trending', t: 'Preisbewegungen', d: 'Einordnung von Preisniveau und Marktveränderungen.', list: ['aktuelle Preisniveaus', 'historische Entwicklung', 'Preisstabilität', 'mögliche Über- oder Unterbewertung'] },
      { icon: 'scale', t: 'Wettbewerb & Angebot', d: 'Bewertung vorhandener Angebote, Konkurrenzumfeld und Verfügbarkeit.', list: ['Angebotsdichte', 'vergleichbare Objekte', 'Vermarktungssituation', 'Differenzierungsmöglichkeiten'] },
      { icon: 'compass', t: 'Regionale Potenziale', d: 'Erkennen von Wachstum, Chancen und strategischen Standorten.', list: ['Wachstumsregionen', 'Projektchancen', 'Entwicklungskorridore', 'Investitionspotenzial', 'Zukunftsfähigkeit'] },
    ],
    stepsEyebrow: 'Vorgehensweise', stepsTitle: 'Von Marktdaten zu klaren Entscheidungen.',
    stepsLead: 'ARVENTAS übersetzt Marktinformationen in eine verständliche Entscheidungsgrundlage. Ziel ist nicht, möglichst viele Daten zu sammeln, sondern relevante Informationen richtig einzuordnen.',
    steps: [
      { t: 'Markt definieren', d: 'Wir grenzen Region, Standort, Objektart und Zielsetzung klar ab.' },
      { t: 'Daten einordnen', d: 'Marktinformationen, Preisbewegungen, Nachfrage und Wettbewerb werden strukturiert betrachtet.' },
      { t: 'Potenziale erkennen', d: 'Chancen, Risiken und relevante Marktbewegungen werden sichtbar gemacht.' },
      { t: 'Strategie ableiten', d: 'Aus der Marktanalyse entsteht eine klare Grundlage für nächste Schritte.' },
    ],
    stepsLine: 'Nicht mehr Daten. Sondern bessere Orientierung.',
    questionsEyebrow: 'Fragen, die wir beantworten', questionsTitle: 'Welche Marktfragen vor einer Entscheidung wichtig sind.',
    questions: ['Ist der Standort für das geplante Vorhaben geeignet?', 'Wie entwickelt sich die Nachfrage in dieser Region?', 'Ist das aktuelle Preisniveau realistisch?', 'Welche Zielgruppen sind im Markt aktiv?', 'Wie stark ist der Wettbewerb?', 'Gibt es erkennbare Risiken oder Entwicklungschancen?', 'Welche Vermarktungsperspektive ist realistisch?', 'Welche Strategie passt zum Marktumfeld?'],
    resultEyebrow: 'Ergebnis', resultTitle: 'Ein klares Bild von Markt, Standort und Potenzial.',
    resultLead: 'Am Ende der Marktanalyse entsteht eine strukturierte Einschätzung, die zeigt, wie ein Markt einzuordnen ist, welche Chancen bestehen und welche Risiken berücksichtigt werden sollten.',
    results: [
      { icon: 'chart', t: 'Marktverständnis', d: 'Klares Bild von Nachfrage, Standortqualität und regionaler Entwicklung.' },
      { icon: 'target', t: 'Potenzialeinschätzung', d: 'Einordnung, ob und wo echte Chancen bestehen.' },
      { icon: 'shield', t: 'Risikobewertung', d: 'Frühzeitige Erkennung kritischer Markt- und Standortfaktoren.' },
      { icon: 'doc', t: 'Entscheidungsgrundlage', d: 'Fundierte Basis für Ankauf, Entwicklung, Verkauf oder Vermarktung.' },
      { icon: 'check', t: 'Strategische Empfehlung', d: 'Ableitung möglicher nächster Schritte.' },
    ],
    resultLine: 'Marktanalyse ist kein Bericht. Sie ist die Grundlage für bessere Entscheidungen.',
    systemText: 'Die Marktanalyse bildet die Grundlage für alle weiteren Schritte: Immobilienbewertung, strategische Analyse, Vermarktung und Entwicklung. Erst wenn Markt, Standort und Nachfrage verstanden sind, können Potenziale realistisch bewertet und strategisch genutzt werden.',
    systemTitle: 'Marktanalyse ist der erste Schritt im ARVENTAS System.',
    ctaTitle: 'Möchten Sie einen Markt oder Standort besser verstehen?',
    ctaText: 'ARVENTAS unterstützt Sie dabei, Marktbewegungen, Standortqualität und Entwicklungspotenziale klarer einzuordnen.',
    ctaBtn: 'Marktpotenzial analysieren',
  },
  immobilienbewertung: {
    slug: 'immobilienbewertung', icon: 'building', t: 'Immobilienbewertung', active: 1,
    tag: 'Immobilien realistisch und strategisch bewerten.',
    card: 'Wir bewerten Immobilien, Grundstücke und Lagen realistisch nach aktuellem Wert und Zukunftspotenzial.',
    list: ['Marktwertanalyse', 'Lagebewertung', 'Vergleichsobjekte', 'Chancen & Risiken', 'Entwicklungspotenzial'],
    cta: 'Immobilie bewerten lassen', ctaLink: 'Mehr erfahren',
    title: 'Immobilien realistisch bewerten. Potenziale klar erkennen.',
    lead: ['ARVENTAS bewertet Immobilien, Grundstücke und Standorte nicht nur nach aktuellem Marktwert, sondern auch nach Lagequalität, Objektzustand, Entwicklungschancen und strategischem Potenzial.', 'Eine gute Bewertung zeigt nicht nur, was eine Immobilie heute wert ist. Sie zeigt auch, welche Chancen, Risiken und Entwicklungsmöglichkeiten in ihr liegen.'],
    whyEyebrow: 'Warum Bewertung', whyTitle: 'Der Wert einer Immobilie ist mehr als eine Zahl.',
    why: ['Viele Immobilienentscheidungen scheitern daran, dass nur der aktuelle Preis betrachtet wird. Für eine fundierte Entscheidung braucht es ein besseres Gesamtbild: Marktwert, Lage, Zustand, Nachfrage, Vergleichsmärkte und zukünftiges Entwicklungspotenzial.', 'ARVENTAS verbindet klassische Bewertung mit strategischer Einordnung. So entsteht eine realistische Grundlage für Ankauf, Verkauf, Entwicklung oder Vermarktung.'],
    whyLine: 'Nicht nur bewerten. Verstehen, was möglich ist.',
    factors: [{ icon: 'chart', t: 'Marktwert' }, { icon: 'pin', t: 'Lage' }, { icon: 'doc', t: 'Zustand' }, { icon: 'users', t: 'Nachfrage' }, { icon: 'scale', t: 'Vergleichswerte' }],
    areasEyebrow: 'Bewertungsbereiche', areasTitle: 'Strukturierte Bewertung von Objekt, Lage und Potenzial.',
    areasLead: 'Unsere Immobilienbewertung schafft Klarheit darüber, wie ein Objekt aktuell einzuordnen ist und welche strategischen Möglichkeiten daraus entstehen können.',
    areas: [
      { icon: 'chart', t: 'Marktwertanalyse', d: 'Einordnung des aktuellen Marktwerts auf Basis relevanter Vergleichswerte und Marktdynamiken.', list: ['aktueller Marktwert', 'Preisniveau', 'Vergleichsobjekte', 'Marktumfeld'] },
      { icon: 'pin', t: 'Lagebewertung', d: 'Bewertung der Mikro- und Makrolage sowie der Standortqualität.', list: ['Infrastruktur', 'Umfeld', 'Erreichbarkeit', 'Nachfrage im Standort', 'Entwicklungsperspektive'] },
      { icon: 'building', t: 'Objektanalyse', d: 'Strukturierte Betrachtung von Zustand, Nutzung, Qualität und wirtschaftlicher Einordnung.', list: ['Objektzustand', 'Nutzungsart', 'Flächenstruktur', 'Vermietbarkeit', 'Modernisierungspotenzial'] },
      { icon: 'warning', t: 'Chancen & Risiken', d: 'Einordnung möglicher Wertreiber und kritischer Faktoren.', list: ['Marktrisiken', 'Leerstand', 'Preisrisiken', 'Entwicklungschancen', 'Vermarktungsfähigkeit'] },
      { icon: 'crane', t: 'Entwicklungspotenzial', d: 'Analyse, welche zukünftigen Möglichkeiten ein Objekt oder Grundstück bieten kann.', list: ['Umnutzung', 'Aufwertung', 'Projektentwicklung', 'Verkaufsstrategie', 'langfristige Wertsteigerung'] },
    ],
    stepsEyebrow: 'Vorgehensweise', stepsTitle: 'Von der Bewertung zur strategischen Einordnung.',
    stepsLead: 'ARVENTAS betrachtet Immobilien nicht isoliert. Bewertung, Marktumfeld und Entwicklungsperspektive werden zusammengeführt.',
    steps: [
      { t: 'Objekt verstehen', d: 'Wir erfassen Lage, Nutzung, Zustand und Ausgangssituation.' },
      { t: 'Markt einordnen', d: 'Vergleichsmärkte, Nachfrage und Standortdynamik werden bewertet.' },
      { t: 'Wert bestimmen', d: 'Der aktuelle Marktwert wird realistisch eingeordnet.' },
      { t: 'Potenzial analysieren', d: 'Chancen, Risiken und Entwicklungsmöglichkeiten werden sichtbar gemacht.' },
      { t: 'Strategie ableiten', d: 'Aus der Bewertung entsteht eine klare Grundlage für Verkauf, Vermarktung oder Entwicklung.' },
    ],
    stepsLine: 'Eine Bewertung ist erst wertvoll, wenn daraus Klarheit entsteht.',
    questionsEyebrow: 'Fragen, die wir beantworten', questionsTitle: 'Welche Bewertungsfragen vor einer Entscheidung wichtig sind.',
    questions: ['Was ist die Immobilie realistisch wert?', 'Ist der angebotene Preis marktgerecht?', 'Welche Lagequalität hat das Objekt?', 'Welche Chancen und Risiken bestehen?', 'Gibt es Entwicklungspotenzial?', 'Welche Vermarktungsperspektive ist realistisch?', 'Welche Strategie passt zum Objekt?'],
    resultEyebrow: 'Ergebnis', resultTitle: 'Ein klares Bild von Wert, Risiko und Potenzial.',
    resultLead: 'Am Ende der Bewertung steht eine strukturierte Einschätzung, die den aktuellen Wert und die strategischen Möglichkeiten eines Objekts besser verständlich macht.',
    results: [
      { icon: 'chart', t: 'Realistische Werteinschätzung', d: 'Klares Verständnis des aktuellen Marktwerts.' },
      { icon: 'pin', t: 'Standort- und Lageeinordnung', d: 'Bessere Einschätzung der Standortqualität.' },
      { icon: 'warning', t: 'Chancen- und Risikoübersicht', d: 'Transparente Darstellung relevanter Faktoren.' },
      { icon: 'target', t: 'Potenzialbewertung', d: 'Einordnung möglicher Entwicklungschancen.' },
      { icon: 'doc', t: 'Entscheidungsgrundlage', d: 'Fundierte Basis für Ankauf, Verkauf, Vermarktung oder Entwicklung.' },
    ],
    resultLine: 'Der richtige Wert entsteht aus Markt, Lage, Objekt und Potenzial.',
    systemText: 'Die Bewertung ist ein zentraler Baustein im ARVENTAS System. Sie verbindet Marktverständnis, Objektverständnis und Potenzialbewertung und schafft die Basis für strategische Analyse, Vermarktung und Entwicklung.',
    systemTitle: 'Immobilienbewertung ist die Grundlage für bessere Strategie.',
    ctaTitle: 'Möchten Sie den Wert und das Potenzial einer Immobilie besser verstehen?',
    ctaText: 'ARVENTAS unterstützt Sie dabei, Immobilien, Grundstücke und Standorte realistisch zu bewerten und strategisch einzuordnen.',
    ctaBtn: 'Immobilie bewerten lassen',
    note: 'Eine Bewertung durch ARVENTAS ersetzt kein verbindliches Verkehrswertgutachten eines Sachverständigen.',
  },
  'strategische-analyse': {
    slug: 'strategische-analyse', icon: 'search', t: 'Strategische Analyse', active: 2,
    tag: 'Potenziale, Risiken und Entscheidungen klar einordnen.',
    card: 'Wir analysieren Chancen, Risiken und Investmentlogik für fundierte Entscheidungen.',
    list: ['Potenzialanalyse', 'Risikoanalyse', 'Investment-Einschätzung', 'Entscheidungsgrundlagen', 'Strategieempfehlung'],
    cta: 'Analyse anfragen', ctaLink: 'Mehr erfahren',
    title: 'Potenziale erkennen. Risiken einordnen. Entscheidungen klarer treffen.',
    lead: ['ARVENTAS analysiert Immobilien, Standorte und Projekte strategisch, um Chancen, Risiken und Entwicklungsmöglichkeiten fundiert zu bewerten.', 'Eine gute Immobilienentscheidung braucht mehr als Zahlen. Sie braucht eine klare Sicht darauf: Was ist realistisch? Wo liegt eine Chance? Welche Risiken bestehen? Und welche Strategie führt zum besten Ergebnis?'],
    whyEyebrow: 'Warum Strategie', whyTitle: 'Nicht jedes Potenzial ist automatisch eine gute Entscheidung.',
    why: ['Immobilienprojekte werden oft auf Basis einzelner Informationen bewertet: Preis, Lage, Objektzustand oder Nachfrage. Doch erst im Zusammenspiel dieser Faktoren zeigt sich, ob eine Chance wirklich tragfähig ist.', 'ARVENTAS verbindet Marktverständnis, Bewertung, Risikoanalyse und Entwicklungsperspektive zu einer klaren strategischen Einschätzung.'],
    whyLine: 'Strategie beginnt dort, wo reine Bewertung endet.',
    factors: [{ icon: 'chart', t: 'Marktverständnis' }, { icon: 'building', t: 'Bewertung' }, { icon: 'warning', t: 'Risikoanalyse' }, { icon: 'compass', t: 'Entwicklungsperspektive' }, { icon: 'target', t: 'Entscheidung' }],
    areasEyebrow: 'Analysebereiche', areasTitle: 'Die wichtigsten Entscheidungsfaktoren im Überblick.',
    areasLead: 'Unsere strategische Analyse zeigt, welche Chancen und nächsten Schritte aus einem Objekt, Standort oder Projekt entstehen können.',
    areas: [
      { icon: 'compass', t: 'Potenzialanalyse', d: 'Einordnung, ob und wie sich ein Objekt, Grundstück oder Standort weiterentwickeln lässt.', list: ['Entwicklungsmöglichkeiten', 'Nutzungspotenzial', 'Standortpotenzial', 'Wertsteigerungschancen'] },
      { icon: 'warning', t: 'Risikoanalyse', d: 'Bewertung kritischer Faktoren, die Entscheidungen beeinflussen können.', list: ['Marktrisiken', 'Preisrisiken', 'Standortschwächen', 'Vermarktungsrisiken'] },
      { icon: 'trending', t: 'Investment-Einschätzung', d: 'Strategische Bewertung, ob ein Vorhaben wirtschaftlich sinnvoll und tragfähig wirkt.', list: ['Chancen-Risiko-Verhältnis', 'Marktlogik', 'langfristige Perspektive', 'Entscheidungssicherheit'] },
      { icon: 'route', t: 'Strategieempfehlung', d: 'Ableitung einer klaren Richtung für Ankauf, Verkauf, Entwicklung oder Vermarktung.', list: ['nächste Schritte', 'Positionierung', 'Prioritäten', 'Handlungsempfehlung'] },
    ],
    stepsEyebrow: 'Vorgehensweise', stepsTitle: 'Von der Ausgangslage zur klaren Strategie.',
    stepsLead: 'ARVENTAS betrachtet nicht nur einzelne Kennzahlen, sondern das Gesamtbild. Daraus entsteht eine strukturierte Entscheidungsgrundlage.',
    steps: [
      { t: 'Ausgangslage verstehen', d: 'Wir klären Ziel, Objekt, Standort und aktuelle Situation.' },
      { t: 'Informationen einordnen', d: 'Markt, Lage, Wert, Nachfrage und Risiken werden zusammen betrachtet.' },
      { t: 'Potenzial bewerten', d: 'Chancen und Grenzen des Vorhabens werden sichtbar gemacht.' },
      { t: 'Strategie ableiten', d: 'Aus der Analyse entsteht eine klare Empfehlung für die nächsten Schritte.' },
    ],
    stepsLine: 'Nicht reagieren. Strukturiert entscheiden.',
    questionsEyebrow: 'Fragen, die wir beantworten', questionsTitle: 'Welche strategischen Fragen vor einer Entscheidung wichtig sind.',
    questions: ['Hat das Objekt oder Grundstück echtes Entwicklungspotenzial?', 'Welche Risiken müssen vor einer Entscheidung beachtet werden?', 'Ist der Standort für das geplante Vorhaben geeignet?', 'Welche Strategie passt zum Marktumfeld?', 'Ist eine Vermarktung, Entwicklung oder Neupositionierung sinnvoll?', 'Welche nächsten Schritte sind realistisch und zielführend?'],
    resultEyebrow: 'Ergebnis', resultTitle: 'Eine klare Grundlage für bessere Entscheidungen.',
    resultLead: 'Am Ende der strategischen Analyse steht keine reine Datenübersicht, sondern eine verständliche Einordnung von Chance, Risiko und möglicher Vorgehensweise.',
    results: [
      { icon: 'target', t: 'Klare Potenzialeinschätzung', d: 'Sie sehen, wo echte Chancen bestehen.' },
      { icon: 'shield', t: 'Strukturierte Risikoübersicht', d: 'Kritische Faktoren werden frühzeitig sichtbar.' },
      { icon: 'route', t: 'Realistische Strategie', d: 'Nächste Schritte werden klar planbar.' },
      { icon: 'list', t: 'Bessere Priorisierung', d: 'Relevante Möglichkeiten werden von schwächeren Optionen getrennt.' },
      { icon: 'doc', t: 'Entscheidungsgrundlage', d: 'Eine fundierte Basis für Ankauf, Verkauf oder Entwicklung.' },
    ],
    resultLine: 'Mehr Klarheit. Weniger Unsicherheit. Bessere Entscheidungen.',
    systemText: 'Im ARVENTAS System folgt die strategische Analyse auf Marktverständnis und Immobilienbewertung. Sie ordnet ein, welche Potenziale realistisch sind und welche Strategie daraus entstehen kann.',
    systemTitle: 'Strategische Analyse verbindet Bewertung mit Entscheidung.',
    ctaTitle: 'Möchten Sie ein Potenzial strategisch einordnen lassen?',
    ctaText: 'ARVENTAS unterstützt Sie dabei, Chancen, Risiken und nächste Schritte klarer zu bewerten.',
    ctaBtn: 'Analyse anfragen',
  },
  'strategische-vermarktung': {
    slug: 'strategische-vermarktung', icon: 'megaphone', t: 'Strategische Vermarktung', active: 4,
    tag: 'Nachfrage verstehen. Vermarktung gezielt steuern.',
    card: 'Wir entwickeln marktgerechte Vermarktungs- und Vertriebsstrategien auf Basis von Nachfrage und Potenzial.',
    list: ['Verkaufsprognose', 'Nachfrageanalyse', 'Zielgruppenstrategie', 'Vertriebsstrategie', 'Lead Intelligence'],
    cta: 'Vermarktung planen', ctaLink: 'Mehr erfahren',
    title: 'Nachfrage verstehen. Vermarktung gezielt steuern.',
    lead: ['ARVENTAS entwickelt datenbasierte Vermarktungs- und Vertriebsstrategien für Immobilienprojekte, Grundstücke und Potenziale.', 'Erfolgreiche Vermarktung beginnt nicht mit einem Inserat. Sie beginnt mit Marktverständnis, Zielgruppenanalyse, klarer Positionierung und der richtigen Strategie.'],
    whyEyebrow: 'Warum Vermarktung', whyTitle: 'Verkaufserfolg entsteht vor dem Verkaufsstart.',
    why: ['Viele Immobilien werden vermarktet, bevor Nachfrage, Zielgruppe, Preispositionierung und Marktumfeld sauber eingeordnet wurden.', 'ARVENTAS betrachtet Vermarktung strategisch: Welche Zielgruppe ist relevant? Wie stark ist die Nachfrage? Welche Positionierung passt? Und welcher Vertriebsweg führt zum besten Ergebnis?'],
    whyLine: 'Vermarktung beginnt nicht beim Verkauf. Sie beginnt beim Verständnis des Marktes.',
    factors: [{ icon: 'users', t: 'Zielgruppe' }, { icon: 'chart', t: 'Nachfrage' }, { icon: 'tag', t: 'Positionierung' }, { icon: 'send', t: 'Vertriebsweg' }, { icon: 'euro', t: 'Preis' }],
    areasEyebrow: 'Vermarktungsbereiche', areasTitle: 'Die wichtigsten Faktoren für gezielte Immobilienvermarktung.',
    areasLead: 'Unsere strategische Vermarktung verbindet Marktanalyse, Nachfragebewertung, Positionierung und Vertriebslogik zu einem klaren Vorgehen.',
    areas: [
      { icon: 'trending', t: 'Verkaufsprognose', d: 'Einschätzung, wie realistisch eine erfolgreiche Vermarktung im aktuellen Marktumfeld ist.', list: ['Nachfragepotenzial', 'Marktaufnahmefähigkeit', 'realistische Verkaufschancen', 'Vermarktungsrisiken'] },
      { icon: 'users', t: 'Nachfrageanalyse', d: 'Bewertung, welche Zielgruppen im Markt aktiv sind und welche Nachfrage tatsächlich besteht.', list: ['Käufergruppen', 'Investoreninteresse', 'gewerbliche Nachfrage', 'regionale Bedarfslage'] },
      { icon: 'target', t: 'Zielgruppenstrategie', d: 'Klare Definition, welche Zielgruppen angesprochen werden sollen und welche Botschaft relevant ist.', list: ['Zielgruppenprofil', 'Nutzenargumente', 'Ansprache', 'Positionierung'] },
      { icon: 'send', t: 'Vertriebsstrategie', d: 'Entwicklung einer klaren Vorgehensweise für Vermarktung, Ansprache und Abschlussvorbereitung.', list: ['Vermarktungskanäle', 'Timing', 'Verkaufsargumentation', 'Lead-Qualifizierung'] },
      { icon: 'user', t: 'Lead Intelligence', d: 'Identifikation und Priorisierung relevanter Marktteilnehmer, Kontakte und Interessenten.', list: ['gewerbliche Kontakte', 'relevante Interessenten', 'Priorisierung', 'Akquisegrundlage'] },
    ],
    stepsEyebrow: 'Vorgehensweise', stepsTitle: 'Von der Nachfrage zur passenden Vermarktungsstrategie.',
    stepsLead: 'ARVENTAS entwickelt Vermarktung nicht aus dem Bauchgefühl heraus, sondern auf Basis von Markt, Objekt, Zielgruppe und Potenzial.',
    steps: [
      { t: 'Markt und Nachfrage verstehen', d: 'Wir analysieren Marktumfeld, Zielgruppen und Nachfragebewegungen.' },
      { t: 'Objekt oder Projekt positionieren', d: 'Wir definieren, wie das Potenzial im Markt wahrgenommen werden soll.' },
      { t: 'Vertriebsrichtung festlegen', d: 'Wir entwickeln die passende Ansprache, Kanäle und Botschaft.' },
      { t: 'Leads und Chancen einordnen', d: 'Relevante Kontakte und Potenziale werden strukturiert priorisiert.' },
      { t: 'Vermarktung gezielt steuern', d: 'Die Strategie wird in klare nächste Schritte übersetzt.' },
    ],
    stepsLine: 'Nicht einfach sichtbar werden. Richtig positioniert werden.',
    questionsEyebrow: 'Fragen, die wir beantworten', questionsTitle: 'Welche Vermarktungsfragen vor dem Marktstart wichtig sind.',
    questions: ['Wer ist die passende Zielgruppe für dieses Objekt oder Projekt?', 'Wie realistisch ist die Nachfrage im aktuellen Markt?', 'Welche Preis- und Positionierungsstrategie ist sinnvoll?', 'Welche Vermarktungskanäle passen zur Zielgruppe?', 'Welche Verkaufsargumente sind wirklich relevant?', 'Welche gewerblichen Kontakte oder Partner sind interessant?', 'Wie kann die Vermarktung strukturiert vorbereitet werden?'],
    resultEyebrow: 'Ergebnis', resultTitle: 'Eine klare Vermarktungsrichtung statt zufälliger Ansprache.',
    resultLead: 'Am Ende entsteht eine strukturierte Grundlage für die Vermarktung: Zielgruppe, Positionierung, Nachfrageeinschätzung, Vertriebsrichtung und nächste Schritte.',
    results: [
      { icon: 'target', t: 'Klare Zielgruppe', d: 'Sie wissen, wen Sie ansprechen sollten.' },
      { icon: 'tag', t: 'Bessere Positionierung', d: 'Das Objekt oder Projekt wird differenziert dargestellt.' },
      { icon: 'trending', t: 'Realistische Verkaufsprognose', d: 'Nachfrage und Marktaufnahme werden besser einschätzbar.' },
      { icon: 'megaphone', t: 'Strukturierte Vertriebsrichtung', d: 'Ansprache, Timing und Kanäle werden klarer.' },
      { icon: 'list', t: 'Priorisierte Potenziale', d: 'Relevante Kontakte und Chancen werden sichtbar.' },
    ],
    resultLine: 'Gute Vermarktung verkauft nicht nur. Sie schafft Richtung.',
    systemText: 'Im ARVENTAS System folgt Vermarktung nicht zufällig am Ende. Sie entsteht aus Marktanalyse, Immobilienbewertung und strategischer Einordnung. So wird aus Erkenntnis eine klare Vermarktungs- und Vertriebsstrategie.',
    systemTitle: 'Strategische Vermarktung verbindet Analyse mit Marktansprache.',
    ctaTitle: 'Möchten Sie Ihre Vermarktung strategischer vorbereiten?',
    ctaText: 'ARVENTAS unterstützt Sie dabei, Nachfrage, Zielgruppe und Vermarktungspotenzial klarer einzuordnen und gezielt zu nutzen.',
    ctaBtn: 'Vermarktung planen',
  },
  'development-intelligence': {
    slug: 'development-intelligence', icon: 'cube', t: 'Development Intelligence', active: -1,
    tag: 'Daten, Marktverständnis und Entwicklung klar verbinden.',
    card: 'Wir verbinden Daten, Analyse, Bewertung und Strategie zu einem klaren Entwicklungsbild.',
    list: ['datenbasierte Entwicklung', 'Markt- & Objektverständnis', 'strategische Steuerung', 'Potenzialerkennung', 'Entwicklung mit System'],
    cta: 'Development Intelligence entdecken', ctaLink: 'Mehr erfahren',
    title: 'Daten, Marktverständnis und Entwicklung klar verbinden.',
    lead: ['ARVENTAS verbindet Marktanalyse, Immobilienbewertung, strategische Analyse und Vermarktung zu einem klaren Entscheidungsbild für moderne Immobilienentwicklung.', 'Development Intelligence bedeutet: Immobilienpotenziale nicht isoliert betrachten, sondern im Zusammenhang von Markt, Objekt, Nachfrage, Risiko und Strategie bewerten.'],
    whyEyebrow: 'Warum Development Intelligence', whyTitle: 'Moderne Immobilienentwicklung braucht mehr als Erfahrung.',
    why: ['Viele Projekte werden auf Basis einzelner Einschätzungen gestartet: Lage, Preis, Nachfrage oder persönliches Bauchgefühl. Doch erfolgreiche Entwicklung entsteht erst, wenn alle relevanten Faktoren strukturiert zusammengeführt werden.', 'ARVENTAS schafft daraus ein klares Gesamtbild. So werden Chancen, Risiken und nächste Schritte besser sichtbar.'],
    whyLine: 'Nicht einzelne Informationen. Ein klares Entscheidungsbild.',
    factors: [{ icon: 'chart', t: 'Markt' }, { icon: 'building', t: 'Objekt' }, { icon: 'users', t: 'Nachfrage' }, { icon: 'route', t: 'Strategie' }, { icon: 'warning', t: 'Risiko' }],
    areasEyebrow: 'Kernbereiche', areasTitle: 'Die Verbindung aus Analyse, Bewertung und Strategie.',
    areasLead: 'Development Intelligence ist kein einzelner Service, sondern der übergeordnete Ansatz, der alle wichtigen Informationen für Immobilienentscheidungen zusammenführt.',
    areas: [
      { icon: 'database', t: 'Datenbasierte Entwicklung', d: 'Marktdaten und Immobilieninformationen werden gemeinsam betrachtet, um Entwicklungsmöglichkeiten besser zu verstehen.', list: ['Marktdaten', 'Objektinformationen', 'Standortfaktoren', 'Nachfrageindikatoren'] },
      { icon: 'layers', t: 'Markt- & Objektverständnis', d: 'Markt, Lage und Immobilie werden gemeinsam betrachtet, statt getrennt voneinander bewertet.', list: ['Marktdynamik', 'Objektqualität', 'Lagepotenzial', 'Nutzungsperspektive'] },
      { icon: 'route', t: 'Strategische Steuerung', d: 'Erkenntnisse werden in eine klare Richtung für Bewertung, Vermarktung und Entwicklung übersetzt.', list: ['Prioritäten', 'Entscheidungslogik', 'Strategieaufbau', 'nächste Schritte'] },
      { icon: 'compass', t: 'Potenzialerkennung', d: 'Chancen werden sichtbar gemacht und von schwächeren Optionen getrennt.', list: ['Entwicklungschancen', 'Wertsteigerung', 'Vermarktungspotenzial', 'Risikoeinordnung'] },
      { icon: 'infinity', t: 'Entwicklung mit System', d: 'Alle Bausteine greifen ineinander und schaffen eine klare Grundlage für Immobilienentscheidungen.', list: ['Analyse', 'Bewertung', 'Strategie', 'Vermarktung', 'Entwicklung'] },
    ],
    stepsEyebrow: 'Vorgehensweise', stepsTitle: 'Von einzelnen Informationen zum klaren Entwicklungsbild.',
    stepsLead: 'Development Intelligence verbindet relevante Informationen Schritt für Schritt zu einer klaren strategischen Grundlage.',
    steps: [
      { t: 'Ausgangslage verstehen', d: 'Wir klären Objekt, Standort, Zielsetzung und aktuelle Situation.' },
      { t: 'Markt und Objekt einordnen', d: 'Marktdynamik, Lagequalität, Objektzustand und Nachfrage werden zusammen betrachtet.' },
      { t: 'Potenzial bewerten', d: 'Chancen, Risiken und Entwicklungsmöglichkeiten werden strukturiert eingeordnet.' },
      { t: 'Strategie entwickeln', d: 'Aus den Erkenntnissen entsteht eine klare Richtung für Vermarktung, Entwicklung oder nächste Entscheidungen.' },
      { t: 'Umsetzung vorbereiten', d: 'Die nächsten Schritte werden verständlich, priorisiert und umsetzbar gemacht.' },
    ],
    stepsLine: 'Development Intelligence macht Komplexität entscheidbar.',
    questionsEyebrow: 'Fragen, die wir beantworten', questionsTitle: 'Welche Fragen vor einer Entwicklung entscheidend sind.',
    questions: ['Wo liegt das echte Potenzial eines Objekts oder Standorts?', 'Welche Markt- und Standortfaktoren beeinflussen die Entwicklung?', 'Welche Risiken müssen vorab berücksichtigt werden?', 'Welche Nutzung oder Strategie ist sinnvoll?', 'Wie realistisch ist die Vermarktung?', 'Welche nächsten Schritte schaffen den größten Mehrwert?'],
    resultEyebrow: 'Ergebnis', resultTitle: 'Ein klares Gesamtbild für bessere Immobilienentscheidungen.',
    resultLead: 'Am Ende entsteht keine isolierte Analyse, sondern eine strukturierte Einschätzung aus Markt, Objekt, Bewertung, Risiko, Vermarktung und Entwicklungsperspektive.',
    results: [
      { icon: 'chart', t: 'Besseres Marktverständnis', d: 'Sie verstehen, wie Markt und Standort das Potenzial beeinflussen.' },
      { icon: 'target', t: 'Klarere Potenzialeinschätzung', d: 'Chancen und Grenzen werden realistischer sichtbar.' },
      { icon: 'list', t: 'Strukturierte Entscheidungsgrundlage', d: 'Informationen werden nicht gesammelt, sondern sinnvoll eingeordnet.' },
      { icon: 'route', t: 'Strategische Entwicklungsrichtung', d: 'Nächste Schritte werden klarer planbar.' },
      { icon: 'shield', t: 'Mehr Kontrolle', d: 'Risiken, Prioritäten und Möglichkeiten werden transparenter.' },
    ],
    resultLine: 'Nicht mehr Komplexität. Mehr Klarheit.',
    systemText: 'Im ARVENTAS System ist Development Intelligence der verbindende Rahmen. Marktanalyse, Immobilienbewertung, strategische Analyse und Vermarktung greifen zusammen und schaffen eine klare Grundlage für Entwicklung.',
    systemTitle: 'Development Intelligence verbindet alle Bausteine.',
    ctaTitle: 'Möchten Sie Immobilienpotenziale ganzheitlich verstehen?',
    ctaText: 'ARVENTAS unterstützt Sie dabei, Märkte, Objekte und Entwicklungschancen strukturiert zusammenzuführen und strategisch nutzbar zu machen.',
    ctaBtn: 'Development Intelligence anfragen',
  },
}
// Bilder je Leistung und je Abschnitt kommen aus images.js
Object.entries(SERVICE_IMG).forEach(([slug, m]) => {
  const s = SERVICES[slug]
  s.img = m.card; s.hero = m.hero; s.ctaImg = m.cta
  ;['areas', 'steps', 'results'].forEach((k) => s[k].forEach((it, i) => { it.img = m[k][i] }))
})

export const SERVICE_LIST = SERVICE_NAV.map((n) => SERVICES[n.to.split('/').pop()])

// ---------------------------------------------------------------- System
export const SYSTEM = {
  steps: [
    { icon: 'search', t: 'Markt verstehen', d: 'Wir analysieren Standorte, Nachfrage, Preisbewegungen und Marktdynamiken, um relevante Chancen zu erkennen.' },
    { icon: 'building', t: 'Immobilie bewerten', d: 'Wir bewerten die Immobilie, das Grundstück, den Standort und den möglichen Wert aus strategischer Perspektive.' },
    { icon: 'target', t: 'Potenzial identifizieren', d: 'Wir bestimmen, wie viel echtes Entwicklungs-, Investment- oder Vertriebspotenzial besteht.' },
    { icon: 'route', t: 'Strategie aufbauen', d: 'Wir definieren den richtigen Ansatz für Positionierung, Vertrieb, Entwicklung und Entscheidungsfindung.' },
    { icon: 'send', t: 'Nächste Schritte strukturieren', d: 'Wir helfen dabei, die Strategie in einen klaren Weg für Umsetzung, Zusammenarbeit oder weitere Bewertung zu überführen.' },
  ],
  flow: 'Marktverständnis → Immobilienbewertung → Potenzialanalyse → Strategieentwicklung → Strukturierte Umsetzung',
  why: [
    { icon: 'bulb', t: 'Klarere Entscheidungen', d: 'Isolierte Informationen werden zu einem klaren Entscheidungsrahmen gebündelt.' },
    { icon: 'list', t: 'Bessere Priorisierung', d: 'Nicht jede Immobilie ist die Chance. Das System hilft zu erkennen, worauf es ankommt.' },
    { icon: 'shield', t: 'Weniger Unsicherheit', d: 'Risiken, Marktdynamiken und Entwicklungsfaktoren werden berücksichtigt, bevor Entscheidungen getroffen werden.' },
    { icon: 'trending', t: 'Stärkere Strategie', d: 'Marktüberblick, Bewertung und Vertrieb werden verbunden, bevor Maßnahmen beginnen.' },
    { icon: 'eye', t: 'Mehr Kontrolle', d: 'Der Prozess schafft Transparenz über Chancen, Risiken und die nächsten Schritte.' },
  ],
  principles: [
    { icon: 'database', t: 'Datenbasiert', d: 'Entscheidungen werden durch Marktinformationen, Bewertungslogik und strukturierte Analysen gestützt.' },
    { icon: 'chess', t: 'Strategisch', d: 'Jeder Schritt ist mit einem klaren Ziel und einer langfristigen Wertschöpfung verbunden.' },
    { icon: 'network', t: 'Vernetzt', d: 'Markt, Immobilie, Risiko, Nachfrage, Vertrieb und Entwicklung werden gemeinsam betrachtet.' },
    { icon: 'shield', t: 'Kontrolliert', d: 'Chancen und Risiken werden bewertet, bevor Ressourcen eingesetzt werden.' },
    { icon: 'expand', t: 'Skalierbar', d: 'Das System lässt sich auf unterschiedliche Standorte, Assetklassen und Projektsituationen anwenden.' },
  ],
  gains: [
    { icon: 'chart', t: 'Besseres Marktverständnis', d: 'Sie erkennen, wie Standort, Nachfrage und Marktbewegung zusammenhängen.' },
    { icon: 'target', t: 'Klarere Potenzialbewertung', d: 'Sie sehen, ob eine Immobilie, ein Grundstück oder ein Projekt strategischen Wert hat.' },
    { icon: 'doc', t: 'Realistische Entscheidungsgrundlage', d: 'Sie erhalten eine strukturierte Sicht anstelle voneinander getrennter Faktoren.' },
    { icon: 'megaphone', t: 'Stärkere Vertriebsrichtung', d: 'Sie verstehen, wie Positionierung und Timing den Markterfolg beeinflussen.' },
    { icon: 'route', t: 'Strategischere Entwicklung', d: 'Sie können mit einem klareren Plan und stärkerer Kontrolle vorangehen.' },
  ],
  cases: [
    { icon: 'search', t: 'Vor dem Ankauf', d: 'Verstehen, ob eine Immobilie oder ein Grundstück echtes Potenzial hat, bevor Kapital gebunden wird.' },
    { icon: 'crane', t: 'Vor der Entwicklung', d: 'Marktnachfrage, Risiken und Möglichkeiten bewerten, bevor die Planung beginnt.' },
    { icon: 'megaphone', t: 'Vor der Vermarktung', d: 'Positionierung, Zielgruppen und Timing definieren, bevor der Marktauftritt startet.' },
    { icon: 'layers', t: 'Für Portfoliostrategien', d: 'Erkennen, welche Assets Aufmerksamkeit, Repositionierung oder weitere Analyse verdienen.' },
    { icon: 'handshake', t: 'Für strategische Partnerschaften', d: 'Eine klarere Grundlage für die Zusammenarbeit zwischen Eigentümern, Investoren und Partnern schaffen.' },
  ],
}

// ---------------------------------------------------------------- Insights
export const INSIGHT_AREAS = [
  { icon: 'chart', t: 'Marktberichte', d: 'Einschätzungen zu Nachfrage, Preisen und Marktentwicklung.' },
  { icon: 'pin', t: 'Standortanalysen', d: 'Einordnung von Regionen, Mikrolagen und Entwicklungschancen.' },
  { icon: 'trending', t: 'Trends & Entwicklungen', d: 'Veränderungen im Immobilienmarkt frühzeitig erkennen.' },
  { icon: 'doc', t: 'Fachartikel', d: 'Strategisches Wissen zu Bewertung, Vermarktung und Entwicklung.' },
  { icon: 'layers', t: 'Insights Archiv', d: 'Gesammelte Beiträge und Analysen zur späteren Recherche.' },
]
export const INSIGHT_WHY = [
  { icon: 'compass', t: 'Mehr Orientierung', d: 'Relevante Informationen werden verständlich eingeordnet.' },
  { icon: 'list', t: 'Bessere Vorbereitung', d: 'Entscheidungen entstehen auf fundierter Grundlage.' },
  { icon: 'search', t: 'Frühere Potenzialerkennung', d: 'Chancen werden sichtbar, bevor sie offensichtlich sind.' },
  { icon: 'chess', t: 'Mehr strategische Klarheit', d: 'Märkte, Objekte und Entwicklungsmöglichkeiten werden gemeinsam betrachtet.' },
]

// ---------------------------------------------------------------- Über uns
export const ABOUT = {
  overview: [
    { icon: 'target', t: 'Unsere Mission', d: 'Warum ARVENTAS existiert und welchen Mehrwert wir schaffen.' },
    { icon: 'user', t: 'Unsere Haltung', d: 'Wie wir Immobilienpotenziale betrachten und Entscheidungen vorbereiten.' },
    { icon: 'network', t: 'Partnernetzwerk', d: 'Warum Zusammenarbeit für uns auf Qualität, Struktur und Vertrauen basiert.' },
    { icon: 'trending', t: 'Zukunft & Entwicklung', d: 'Wie wir Immobilienentwicklung langfristig, datenbasiert und strategisch denken.' },
  ],
  missionRing: [
    { icon: 'chart', t: 'Markt', d: 'Trends, Nachfrage & Marktentwicklung' },
    { icon: 'building', t: 'Objekt', d: 'Lage, Zustand & Eigenschaften' },
    { icon: 'users', t: 'Nachfrage', d: 'Bedarf, Zielgruppen & Nutzungspotenzial' },
    { icon: 'shield', t: 'Risiko', d: 'Risiken erkennen & realistisch bewerten' },
    { icon: 'crane', t: 'Entwicklung', d: 'Potenziale nutzen & Werte schaffen' },
    { icon: 'megaphone', t: 'Vermarktung', d: 'Strategisch positionieren & erfolgreich platzieren' },
  ],
  stance: [
    { icon: 'grid', t: 'Struktur statt Zufall', d: 'Entscheidungen brauchen eine klare Grundlage.' },
    { icon: 'search', t: 'Marktverständnis statt Bauchgefühl', d: 'Potenziale erkennen wir dort, wo Nachfrage, Lage und Strategie zusammenpassen.' },
    { icon: 'diamond', t: 'Qualität statt Masse', d: 'Nicht jedes Objekt ist relevant. Entscheidend ist das richtige Potenzial.' },
    { icon: 'hourglass', t: 'Langfristigkeit statt kurzfristiger Aktion', d: 'Immobilienentwicklung muss über den Moment hinaus gedacht werden.' },
  ],
  partners: [
    { icon: 'diamond', t: 'Qualität', d: 'Zusammenarbeit mit Partnern, die fachlich überzeugen.' },
    { icon: 'shield', t: 'Verlässlichkeit', d: 'Klare Kommunikation und gemeinsame Verantwortung.' },
    { icon: 'network', t: 'Struktur', d: 'Jeder Partner erfüllt eine klare Rolle im Gesamtprozess.' },
    { icon: 'infinity', t: 'Langfristigkeit', d: 'Wir bauen Beziehungen, keine Einmalkontakte.' },
  ],
  future: [
    { icon: 'eye', t: 'Früher erkennen', d: 'Potenziale sichtbar machen, bevor sie offensichtlich sind.' },
    { icon: 'chart', t: 'Besser bewerten', d: 'Chancen und Risiken strukturiert einordnen.' },
    { icon: 'target', t: 'Gezielter handeln', d: 'Strategien entwickeln, die zum Markt und zum Projekt passen.' },
    { icon: 'leaf', t: 'Nachhaltig entwickeln', d: 'Werte schaffen, die langfristig Bestand haben.' },
  ],
}

export const CONTACT_TYPES = ['Marktanalyse', 'Immobilienbewertung', 'Strategische Analyse', 'Strategische Vermarktung', 'Development Intelligence', 'Strategiegespräch', 'Partnerschaft', 'Sonstiges']

// Schritte der Kette mit der Kurzbeschreibung der zugehörigen Leistung (vorhandener Kundentext).
export const CHAIN_CARDS = CHAIN.map((c, i) => ({ ...c, d: SERVICE_LIST[i].card }))

;['steps', 'why', 'cases'].forEach((k) => SYSTEM[k].forEach((it, i) => { it.img = SYSTEM_IMG[k][i] }))
