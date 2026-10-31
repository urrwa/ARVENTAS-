// Vom Auftraggeber bereitgestellte Teamaufnahmen, passend zur gezeigten Tätigkeit.
const photo = (name, alt, width = 2752, height = 1536) => ({
  src: `/media/team/${name}-hq-${width}.webp`,
  srcSet: [800, ...(width > 1600 ? [1600] : []), width].map((w) => `/media/team/${name}-hq-${w}.webp ${w}w`).join(', '),
  width,
  height,
  alt,
})

export const TEAM_PHOTOS = {
  exchange: photo('team-austausch', 'Mitglieder des ARVENTAS-Teams im persönlichen Austausch bei einer Tasse Kaffee.', 1352, 747),
  strategy: photo('team-strategie', 'Das ARVENTAS-Team bespricht Immobilienprojekte vor einer Präsentation.'),
  documents: photo('team-unterlagen', 'Das ARVENTAS-Team prüft gemeinsam Objektunterlagen und Grundrisse.'),
  analysis: photo('team-objektanalyse', 'Das ARVENTAS-Team vergleicht Immobilieninformationen, Grundrisse und Analysen am Bildschirm.'),
  planning: photo('team-projektplanung', 'Das ARVENTAS-Team bespricht Grundrisse und mögliche nächste Schritte am Planungstisch.'),
  market: photo('team-marktabgleich', 'Das ARVENTAS-Team gleicht Objektunterlagen mit Standort- und Marktdaten am Bildschirm ab.'),
  conversation: photo('team-erstgespraech', 'Mitglieder des ARVENTAS-Teams im persönlichen Gespräch mit einem Tablet.'),
  guidance: photo('team-begleitung', 'Mitglieder des ARVENTAS-Teams besprechen gemeinsam Immobilienfragen in einer Sitzgruppe.'),
  development: photo('team-modellplanung', 'Gemeinsame Besprechung eines Architekturmodells, von Grundrissen und Materialmustern.', 1357, 762),
  review: photo('team-planpruefung', 'Gemeinsame Prüfung und Besprechung von Grundrissen am Planungstisch.', 1347, 762),
}

// Einzelporträts in der vom Auftraggeber gelieferten Reihenfolge; Namen und Rollen bleiben offen.
export const TEAM_PORTRAITS = Array.from({ length: 6 }, (_, i) => {
  const id = String(i + 1).padStart(2, '0')
  return {
    src: `/media/team/team-portrait-${id}-hq-1254.webp`,
    srcSet: [480, 1000, 1254].map((w) => `/media/team/team-portrait-${id}-hq-${w}.webp ${w}w`).join(', '),
    width: 1254,
    height: 1254,
    alt: `Porträt eines Mitglieds des ARVENTAS-Teams (${i + 1}).`,
  }
})

// Startseite / Ablauf: ursprüngliche, zum jeweiligen Schritt passende Illustrationsbilder.
const originalProcessPhoto = (name) => ({ src: `/media/p/${name}.webp` })
export const TEAM_PROCESS_PHOTOS = {
  owner: ['owner-beratung', 'home-unterlagen', 'home-analyse-hand', 'owner-situation', 'h-kaeufer', 'abschluss-beratung'].map(originalProcessPhoto),
  investor: ['h-suchprofil', 'partner-ergaenzung', 'investor-matching', 'besichtigung', 'partner-fachleute', 'abschluss-beratung'].map(originalProcessPhoto),
}
