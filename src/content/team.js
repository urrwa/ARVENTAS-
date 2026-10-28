// Vom Auftraggeber bereitgestellte Teamaufnahmen, passend zur gezeigten Tätigkeit.
const photo = (name, alt, width = 1800, height = 1005) => ({
  src: `/media/team/${name}-${width}.webp`,
  srcSet: `/media/team/${name}-800.webp 800w, /media/team/${name}-${width}.webp ${width}w`,
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
    src: `/media/team/team-portrait-${id}-1000.webp`,
    srcSet: `/media/team/team-portrait-${id}-480.webp 480w, /media/team/team-portrait-${id}-1000.webp 1000w`,
    width: 1000,
    height: 1000,
    alt: `Porträt eines Mitglieds des ARVENTAS-Teams (${i + 1}).`,
  }
})

// Startseite / Ablauf: ausschließlich die vom Auftraggeber gelieferten Teamaufnahmen.
export const TEAM_PROCESS_PHOTOS = {
  owner: [TEAM_PHOTOS.conversation, TEAM_PHOTOS.documents, TEAM_PHOTOS.analysis, TEAM_PHOTOS.planning, TEAM_PHOTOS.strategy, TEAM_PHOTOS.guidance],
  investor: [TEAM_PHOTOS.strategy, TEAM_PHOTOS.conversation, TEAM_PHOTOS.market, TEAM_PHOTOS.documents, TEAM_PHOTOS.planning, TEAM_PHOTOS.guidance],
}
