import { sections, tocDesc } from '../content/sections.js'

export default function Toc() {
  return (
    <nav className="toc" aria-label="Inhaltsverzeichnis">
      <p className="eyebrow">Inhalt</p>
      <p className="toc__desc">{tocDesc}</p>
      <ol className="toc__grid">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}><span>{String(s.n).padStart(2, '0')}</span>{s.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
