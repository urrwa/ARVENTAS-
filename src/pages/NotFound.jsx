import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { Btn } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Seite nicht gefunden | ARVENTAS" description="Diese Seite existiert nicht." />
      <PageHero crumb="Fehler" title="Seite nicht gefunden." lead="Die gesuchte Seite gibt es nicht oder nicht mehr.">
        <div className="btn-row"><Btn to="/">Zur Startseite</Btn><Btn to="/kontakt" variant="line">Kontakt</Btn></div>
      </PageHero>
    </>
  )
}
