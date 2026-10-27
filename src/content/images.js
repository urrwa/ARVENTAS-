// Zentrale Bildzuordnung der Website: Jede Zeile nennt Seite, Abschnitt und Bild.
// Bilder liegen unter public/media/p/. Namen mit "u-" sind vom Auftraggeber gelieferte Fotos, alle anderen sind mit KI erzeugte Fotos.
// Eine Stelle ändern heißt nur: hier den Dateinamen austauschen.
const p = (k) => `/media/p/${k}.webp`

// ---- Startseite
export const HOME = {
  pillars: ['home.pil.0', 'home.pil.1', 'home.pil.2', 'home.pil.3'].map(p), // "Strategisch / Datenbasiert / Vernetzt / Werteorientiert"
  pillarsBg: p('ablauf-luftbild'),                                       // Hintergrund hinter den Karten
  process: ['home.proc.0', 'home.proc.1', 'home.proc.2', 'home.proc.3', 'home.proc.4'].map(p), // Markt verstehen … Vermarktung & Entwicklung steuern
  system: 'u-modelle-tisch',                                                // Kachel "1 System"
  audience: ['aud.0', 'aud.1', 'u-weisse-wohnanlage', 'aud.3', 'u-lounge-fenster'].map(p), // Projektentwickler, Investoren, Gesellschaften, Eigentümer, Partner
  miniCard: p('home.mini'),                                                 // kleine Karte unten rechts im Kopf
  footer: p('u-eingang-stein'),                                             // Fußzeile (darf sich wiederholen)
  cta: p('ablauf-wohnhaus'),
}

// ---- Seitenköpfe und Abschlussbänder
export const PAGES = {
  leistungen: { hero: p('ablauf-strasse'), cta: p('mfh-balkone') },
  system: { hero: p('owner-situation'), split: p('hero-card-mfh'), cta: p('ablauf-tuer') },
  insights: { hero: p('sa.area.0'), cta: p('u-holzhaeuser') },
  about: { hero: p('home-unterlagen'), studio: p('u-holzhaus-rechner'), dark: p('bw.res.2'), mv: p('sa.res.2'), cta: p('vm.res.0') },
  kontakt: { hero: p('vm.area.3'), cta: p('bw.res.4') },
}

// ---- Leistungsseiten (je Bereich: Karte in der Liste, Kopf, Abschluss, dazu Fachgebiete / Ablauf / Ergebnis in Reihenfolge)
export const SERVICE_IMG = {
  marktanalyse: {
    card: p('u-luftbild'), hero: p('ablauf-luftbild'), cta: p('u-architekten-modelle'),
    areas: ['ma.area.0', 'ma.area.1', 'ma.area.2', 'ma.area.3', 'ma.area.4'].map(p),
    steps: ['ma.step.0', 'ma.step.1', 'ma.step.2', 'ma.step.3'].map(p),
    results: ['ma.res.0', 'ma.res.1', 'ma.res.2', 'ma.res.3', 'ma.res.4'].map(p),
  },
  immobilienbewertung: {
    card: p('u-weisse-wohnanlage'), hero: p('u-begutachtung-travertin'), cta: p('u-papiermodell'),
    areas: ['bw.area.0', 'bw.area.1', 'bw.area.2', 'bw.area.3', 'bw.area.4'].map(p),
    steps: ['bw.step.0', 'bw.step.1', 'bw.step.2', 'bw.step.3', 'bw.step.4'].map(p),
    results: ['bw.res.0', 'bw.res.1', 'bw.res.2', 'bw.res.3', 'bw.res.4'].map(p),
  },
  'strategische-analyse': {
    card: p('u-karte'), hero: p('u-modell-dunkel'), cta: p('u-diagramme'),
    areas: ['sa.area.0', 'sa.area.1', 'sa.area.2', 'sa.area.3'].map(p),
    steps: ['sa.step.0', 'sa.step.1', 'sa.step.2', 'sa.step.3'].map(p),
    results: ['sa.res.0', 'sa.res.1', 'sa.res.2', 'sa.res.3', 'sa.res.4'].map(p),
  },
  'strategische-vermarktung': {
    card: p('u-besprechungsraum'), hero: p('u-eingang-travertin'), cta: p('u-notizbuch'),
    areas: ['vm.area.0', 'vm.area.1', 'vm.area.2', 'vm.area.3', 'vm.area.4'].map(p),
    steps: ['vm.step.0', 'vm.step.1', 'vm.step.2', 'vm.step.3', 'vm.step.4'].map(p),
    results: ['vm.res.0', 'vm.res.1', 'vm.res.2', 'vm.res.3', 'vm.res.4'].map(p),
  },
  'development-intelligence': {
    card: p('u-modell-skyline'), hero: p('u-baulucke'), cta: p('ablauf-besprechung'),
    areas: ['di.area.0', 'di.area.1', 'di.area.2', 'di.area.3', 'di.area.4'].map(p),
    steps: ['di.step.0', 'di.step.1', 'di.step.2', 'di.step.3', 'di.step.4'].map(p),
    results: ['di.res.0', 'di.res.1', 'di.res.2', 'di.res.3', 'di.res.4'].map(p),
  },
}

// ---- Leistungen-Übersicht: Bilder im Fließtext
export const INLINE = ['u-altstadt', 'u-aquarell', 'u-modelle-unscharf', 'u-holzhaus-stift'].map(p)

// ---- System
export const SYSTEM_IMG = {
  steps: ['sys.step.0', 'sys.step.1', 'sys.step.2', 'sys.step.3', 'sys.step.4'].map(p),
  why: ['sys.why.0', 'sys.why.1', 'u-modelle-charts', 'u-grundrisse', 'u-paar-grundriss'].map(p),
  cases: ['ablauf-eingang', 'di.step.3', 'vm.res.1', 'di.area.0', 'u-modellhaus-besp'].map(p),
}

// ---- Insights
export const INSIGHTS_IMG = {
  stair: ['ma.area.2', 'ma.area.0', 'vm.area.0', 'bw.res.3', 'ma.res.3'].map(p),   // Marktberichte, Standortanalysen, Trends, Fachartikel, Archiv
  slider: ['vm.step.2', 'bw.step.2', 'di.step.0', 'sa.area.3'].map(p), // Warum Insights
  articles: { 'off-market-verstehen': p('u-eingang-travertin'), 'immobilien-bewerten': p('u-begutachtung-sandstein'), 'potenziale-einordnen': p('u-baulucke'), 'kapitalanlage-einordnen': p('mfh-balkone'), 'marktinformationen-einordnen': p('u-altstadt') },
}
