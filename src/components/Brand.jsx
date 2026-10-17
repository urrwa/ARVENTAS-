// Brandbook: Der Markenname wird sichtbar stets mit dem griechischen Lambda geschrieben: ΛRVENTΛS.
// Für Screenreader, Titel, URLs, E-Mail-Adressen und rechtliche Firmierungen gilt die technische Lesefassung „ARVENTAS".
export default function Brand() {
  return <span className="brand"><span aria-hidden="true">ΛRVENTΛS</span><span className="sr">ARVENTAS</span></span>
}
