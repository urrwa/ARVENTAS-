import { useEffect } from 'react'

// Setzt Seitentitel und Beschreibung. Keine erfundenen strukturierten Unternehmensdaten.
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    if (description) m.content = description
  }, [title, description])
  return null
}
