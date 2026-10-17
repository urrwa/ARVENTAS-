import { Link } from 'react-router-dom'
import { Brandify } from './Brand.jsx'

export default function PageHero({ crumb, title, lead, children, image, tall }) {
  return (
    <section className={`phero dark${image ? ' has-img' : ''}${tall ? ' tall' : ''}`}>
      {image && <img className="phero-img" src={image} alt="" loading="eager" />}
      <div className="wrap">
        <p className="crumbs"><Link to="/">Start</Link> / {crumb}</p>
        <h1 className="h1 focus-in">{title}</h1>
        {lead && <div className="rise" style={{ '--rd': '260ms' }}><p className="lead"><Brandify>{lead}</Brandify></p></div>}
        {children}
      </div>
    </section>
  )
}
