// Drei Stärken als große Zeilen: links Nummer, Titel und Satz, rechts ein breites Foto.
// Beim Scrollen bleibt jede Zeile oben haften und die nächste schiebt sich darüber.
export default function StrengthStack({ items }) {
  return (
    <ol className="ss">
      {items.map((it, i) => (
        <li key={it.t} className="ss-row" style={{ '--i': i }}>
          <div className="ss-txt">
            <small>({String(i + 1).padStart(2, '0')})</small>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
          <div className="ss-img"><img src={it.img} alt="" loading="lazy" decoding="async" /></div>
        </li>
      ))}
    </ol>
  )
}
