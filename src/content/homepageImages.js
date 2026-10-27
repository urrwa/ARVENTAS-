// Homepage-only imagery. Existing shared media and other pages are left unchanged.
// Generated scenes are illustrations, not ARVENTAS projects, staff portraits or live inventory.
// Some category-specific photos are curated from the supplied repository (see docs/homepage-image-update.md).
const photo = (name) => `/media/homepage/${name}.webp`

export const HOMEPAGE_IMAGES = {
  heroCard: '/media/p/hero-card-mfh.webp',
  ownerEntry: photo('owner-residential-building'),
  investorEntry: photo('investor-residential-building'),
  strengths: {
    access: photo('discreet-property-access'),
    analysis: photo('analysis-desk'),
    transaction: photo('consultation-wide'),
  },
  process: {
    owner: [
      'consultation-square', 'property-documents', 'valuation-review',
      'consultation-square', 'search-region', 'transaction-handover',
    ].map(photo),
    investor: [
      'search-region', 'consultation-square', 'valuation-review',
      'property-viewing', 'consultation-square', 'transaction-handover',
    ].map(photo),
  },
  matching: [
    ['investor-residential-building', 'owner-residential-building', 'residential-neighbourhood'],
    ['mixed-use-street', 'mixed-use-street', 'mixed-use-street'],
    ['commercial-office', 'commercial-interior', 'commercial-office'],
    ['development-land', 'urban-development-site', 'development-construction'],
  ].map((row) => row.map(photo)),
  knowledge: {
    Alle: photo('owner-residential-building'),
    'Off-Market': photo('discreet-property-access'),
    Immobilienbewertung: photo('valuation-review'),
    Kapitalanlage: photo('investor-residential-building'),
    Entwicklungspotenziale: photo('architectural-model'),
    Marktinformationen: photo('residential-neighbourhood'),
  },
  contact: photo('modern-office-entrance'),
}
