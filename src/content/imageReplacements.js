import { PROVIDED_PHOTOS as photos } from './providedPhotos.js'

// Legacy people/hand imagery is replaced wherever an older page still uses it.
const groups = {
  consultation: ['h-p-begleitung', 'h-p-besprechung', 'h-p-erstgespraech', 'offmarket-gespraech', 'owner-beratung', 'owner-besprechung', 'owner-situation', 'partner-fachleute', 'u-paar-grundriss'],
  location: ['u-karte'],
  market: ['di.area.2'],
  documents: ['besichtigung', 'h-abschluss', 'home-analyse-hand', 'home-unterlagen', 'u-grundrisse', 'u-notizbuch'],
  handover: ['abschluss-beratung', 'h-p-abschluss', 'investor-begleitung', 'owner-unterlagen', 'u-handschlag-dunkel', 'u-handschlag-gold', 'u-schluessel'],
  matching: ['h-p-entscheidung', 'h-p-investor', 'investor-matching', 'owner-entscheidung', 'partner-ergaenzung', 'partner-hero', 'u-diagramme', 'u-modelle-charts'],
  report: ['hero-card-analyse', 'hero-card-daten', 'owner-analyse-bericht'],
  valuation: ['h-bewertung', 'u-aquarell', 'u-architekten-modelle', 'u-begutachtung-sandstein', 'u-begutachtung-travertin', 'u-holzhaus-rechner', 'u-holzhaus-stift', 'u-modell-skyline', 'u-modelle-tisch', 'u-modelle-unscharf', 'u-modelle-weiss', 'u-modellhaus-besp', 'u-papiermodell', 'vm.step.1', 'vm.step.4', 'wissen-bewertung'],
  city: ['aud.3', 'ma.area.1', 'ma.step.2', 'sys.step.0', 'vm.area.1', 'vm.step.0'],
}

export const IMAGE_REPLACEMENTS = Object.fromEntries(
  Object.entries(groups).flatMap(([topic, names]) => names.map(name => [`/media/p/${name}.webp`, photos[topic]])),
)
Object.assign(IMAGE_REPLACEMENTS, {
  '/media/besprechung.webp': photos.consultation,
  '/media/notizbuch.webp': photos.documents,
  '/media/planunterlagen.webp': photos.documents,
  '/media/vertrag-unterzeichnung.webp': photos.documents,
})

export const imagePath = src => IMAGE_REPLACEMENTS[src]?.src || src
export const replacePhoto = image => {
  const source = typeof image === 'string' ? { src: image, alt: '' } : image
  return IMAGE_REPLACEMENTS[source.src] || source
}
