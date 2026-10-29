import { PROVIDED_PHOTOS as photos } from './providedPhotos.js'

// Supplied working scenes, matched to the activity described by each section.
export const TEAM_PHOTOS = {
  exchange: photos.consultation,
  strategy: photos.matching,
  documents: photos.documents,
  analysis: photos.market,
  planning: photos.valuation,
  market: photos.location,
  conversation: photos.consultation,
  guidance: photos.handover,
  development: photos.valuation,
  review: photos.documents,
}

export const TEAM_PROCESS_PHOTOS = {
  owner: [photos.consultation, photos.documents, photos.market, photos.report, photos.matching, photos.handover],
  investor: [photos.location, photos.consultation, photos.matching, photos.documents, photos.valuation, photos.handover],
}
