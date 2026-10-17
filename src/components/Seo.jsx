import { useEffect } from 'react'
import { tr } from '../i18n.js'
import { useLang } from './LangToggle.jsx'

// Setzt Seitentitel und Beschreibung. Keine erfundenen strukturierten Unternehmensdaten.
export default function Seo({ title, description }) {
  const lang = useLang()
  useEffect(() => {
    document.title = tr(title)
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    if (description) m.content = tr(description)
  }, [title, description, lang])
  return null
}
