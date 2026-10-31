import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { InvestorWizard } from '../components/forms.jsx'

export default function InvestorCircle() {
  return (
    <>
      <Seo title="Investorenkreis | ARVENTAS" description="Suchprofil anlegen: Region, Immobilientyp und Budgetband – für ausgewählte Off-Market-Immobilien in ganz Deutschland." />
      <PageHero image="/media/p/u-modell-skyline.webp" crumb="Investorenkreis" title="Ausgewählte Immobilien. Auf Ihre Ziele abgestimmt." lead="In vier kurzen Schritten legen Sie Ihr Suchprofil an. Bonitätsunterlagen werden nicht abgefragt. Zum Lesen der Informationsseiten ist keine Registrierung nötig." />
      <section className="sec dark">
        <div className="wrap"><div className="form-panel form-panel-wizard"><InvestorWizard /></div></div>
      </section>
    </>
  )
}
