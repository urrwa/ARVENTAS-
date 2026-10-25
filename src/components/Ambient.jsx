// Ruhiger Hintergrund wie in der Landingpage: tiefer Navy-Verlauf mit vier langsam driftenden Lichtfeldern.
// Liegt fest hinter allem; bei reduzierter Bewegung stehen die Felder still.
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="amb-base" />
      <i className="amb-f amb-blue" />
      <i className="amb-f amb-steel" />
      <i className="amb-f amb-champ" />
      <i className="amb-f amb-deep" />
    </div>
  )
}
