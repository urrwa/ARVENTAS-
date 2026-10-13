import { Link } from 'react-router-dom'

/* PLACEHOLDER — the homepage will be recreated separately from a supplied design.
   Intentionally minimal; do not design here. Replace this file's contents when the
   homepage arrives. The design system in src/styles/global.css is shared. */
export default function Home() {
  return (
    <main className="home-placeholder">
      <p className="eyebrow">ARVENTAS</p>
      <h1 className="display">Startseite folgt.</h1>
      <Link className="link-arrow" to="/strategie">Zur Strategie →</Link>
    </main>
  )
}
