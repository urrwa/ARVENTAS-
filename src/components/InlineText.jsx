// Großer Absatz mit kleinen Bildern zwischen den Wörtern; beim Hover (oder Tippen) wächst ein Bild weich über den Text (Vorbild Webloom).
export default function InlineText({ parts }) {
  return (
    <p className="inl">
      {parts.map((p, i) => (typeof p === 'string'
        ? <span key={i}>{p}</span>
        : <span key={i} className="inl-i" tabIndex={0}><img src={p.img} alt="" loading="lazy" decoding="async" /></span>))}
    </p>
  )
}
