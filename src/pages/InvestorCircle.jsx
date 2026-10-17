import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { InvestorWizard } from '../components/forms.jsx'

export default function InvestorCircle() {
  return (
    <>
      <Seo title="Investorenkreis | ARVENTAS" description="Suchprofil anlegen: Region, Immobilientyp und Budgetband – für ausgewählte Off-Market-Immobilien in ganz Deutschland." />
      <PageHero crumb="Investorenkreis" title="Ausgewählte Immobilien. Auf Ihre Ziele abgestimmt." lead="In vier kurzen Schritten legen Sie Ihr Suchprofil an. Bonitätsunterlagen werden nicht abgefragt. Zum Lesen der Informationsseiten ist keine Registrierung nötig." />
      <section className="sec ivory">
        <div className="wrap"><InvestorWizard /></div>
      </section>
    </>
  )
}
