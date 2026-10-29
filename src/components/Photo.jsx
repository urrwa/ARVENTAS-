// Gemeinsame Ausgabe für vorhandene Bildpfade und responsive Teamaufnahmen.
import { replacePhoto } from '../content/imageReplacements.js'

export default function Photo({ image, sizes = '100vw', loading = 'lazy', ...props }) {
  const source = replacePhoto(image)
  return <img {...source} sizes={source.srcSet ? sizes : undefined} loading={loading} decoding="async" {...props} />
}
