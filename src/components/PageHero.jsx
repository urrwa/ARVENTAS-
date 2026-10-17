import { Link } from 'react-router-dom'
import { Brandify } from './Brand.jsx'

export default function PageHero({ crumb, title, lead, children }) {
  return (
    <section className="phero dark">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Start</Link> / {crumb}</p>
        <h1 className="h1 rv">{title}</h1>
        {lead && <p className="lead rv" style={{ '--d': 80 }}><Brandify>{lead}</Brandify></p>}
        {children}
      </div>
    </section>
  )
}
