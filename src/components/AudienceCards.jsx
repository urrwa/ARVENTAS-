// Zweispaltige Karten mit Kopfzeile über dem Bild; beim Hover kippt die Kopfzeile in Elfenbein (Vorbild Selaras-Works).
const IMGS = ['gal-1', 'gal-3', 'gal-6', 'gal-7', 'gal-8']

export default function AudienceCards({ items }) {
  return (
    <div className="aud">
      {items.map((it, i) => (
        <article key={it.t} className="aud-card rv" style={{ '--d': `${(i % 2) * 120}ms` }}>
          <div className="aud-bar">
            <span className="n">({String(i + 1).padStart(2, '0')})</span>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
          <div className="aud-img"><img src={`/media/${IMGS[i % IMGS.length]}.webp`} alt="" loading="lazy" decoding="async" /></div>
        </article>
      ))}
    </div>
  )
}
