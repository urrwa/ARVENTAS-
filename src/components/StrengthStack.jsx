import Photo from './Photo.jsx'

// Drei Stärken als vollflächige Karten mit runden Ecken: Foto füllt die Karte, Nummer, Titel und Satz liegen darüber.
// Beim Scrollen bleibt jede Zeile oben haften und die nächste schiebt sich darüber.
export default function StrengthStack({ items }) {
  return (
    <ol className="ss">
      {items.map((it, i) => (
        <li key={it.t} className={`ss-row${it.photo ? ' ss-team' : ''}`} style={{ '--i': i }}>
          <div className="ss-img"><Photo image={it.photo || it.img} /></div>
          <div className="ss-txt">
            <small>({String(i + 1).padStart(2, '0')})</small>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
