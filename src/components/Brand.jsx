// Brandbook: Der Markenname wird sichtbar stets mit dem griechischen Lambda geschrieben: ΛRVENTΛS.
// Für Screenreader, Titel, URLs, E-Mail-Adressen und rechtliche Firmierungen gilt die technische Lesefassung „ARVENTAS".
export default function Brand() {
  return <span className="brand"><span aria-hidden="true">ΛRVENTΛS</span><span className="sr">ARVENTAS</span></span>
}

// Ersetzt jedes „ARVENTAS" in einem Text durch die Markenschreibweise (ΛRVENTΛS) und behält die Lesefassung für Screenreader.
export function Brandify({ children }) {
  const s = typeof children === 'string' ? children : null
  if (s == null || !s.includes('ARVENTAS')) return children
  return s.split('ARVENTAS').flatMap((part, i) => (i ? [<Brand key={'b' + i} />, part] : [part]))
}
