import { Link } from 'react-router-dom'

// Hohe Bildkarten mit Titel auf dem Bild; beim Hover wächst unten ein dunkles Feld mit Titel und Teaser nach oben (Vorbild Lumora).
export default function ArticleCards({ items }) {
  return (
    <div className="acs">
      {items.map((a, i) => (
        <Link key={a.slug} to={`/insights/${a.slug}`} className="ac" style={{ '--i': i }}>
          <img src={a.img} alt="" loading="lazy" decoding="async" />
          <span className="ac-tag">Entwurf</span>
          <span className="ac-title">{a.title}</span>
          <span className="ac-panel">
            <b>{a.title}</b>
            <span>{a.teaser}</span>
            <i className="ac-more">Beitrag lesen <span aria-hidden="true">→</span></i>
          </span>
        </Link>
      ))}
    </div>
  )
}
