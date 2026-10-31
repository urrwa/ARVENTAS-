// Gemeinsame Ausgabe für vorhandene Bildpfade und responsive Teamaufnahmen.
export default function Photo({ image, sizes = '100vw', loading = 'lazy', ...props }) {
  const source = typeof image === 'string' ? { src: image, alt: '' } : image
  return <img {...source} sizes={source.srcSet ? sizes : undefined} loading={loading} decoding="async" {...props} />
}
