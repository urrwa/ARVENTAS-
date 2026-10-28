// Vom Auftraggeber bereitgestellte Teamaufnahmen, passend zur gezeigten Tätigkeit.
const photo = (name, alt) => ({
  src: `/media/team/${name}-1800.webp`,
  srcSet: `/media/team/${name}-800.webp 800w, /media/team/${name}-1800.webp 1800w`,
  width: 1800,
  height: 1005,
  alt,
})

export const TEAM_PHOTOS = {
  strategy: photo('team-strategie', 'Das ARVENTAS-Team bespricht Immobilienprojekte vor einer Präsentation.'),
  documents: photo('team-unterlagen', 'Das ARVENTAS-Team prüft gemeinsam Objektunterlagen und Grundrisse.'),
  analysis: photo('team-objektanalyse', 'Das ARVENTAS-Team vergleicht Immobilieninformationen, Grundrisse und Analysen am Bildschirm.'),
  planning: photo('team-projektplanung', 'Das ARVENTAS-Team bespricht Grundrisse und mögliche nächste Schritte am Planungstisch.'),
  market: photo('team-marktabgleich', 'Das ARVENTAS-Team gleicht Objektunterlagen mit Standort- und Marktdaten am Bildschirm ab.'),
  conversation: photo('team-erstgespraech', 'Mitglieder des ARVENTAS-Teams im persönlichen Gespräch mit einem Tablet.'),
  guidance: photo('team-begleitung', 'Mitglieder des ARVENTAS-Teams besprechen gemeinsam Immobilienfragen in einer Sitzgruppe.'),
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
