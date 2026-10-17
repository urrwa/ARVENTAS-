import { Link } from 'react-router-dom'
import Letters from './Letters.jsx'
import { Brandify } from './Brand.jsx'

export default function PageHero({ crumb, title, lead, children, image, tall }) {
  return (
    <section className={`phero dark${image ? ' has-img' : ''}${tall ? ' tall' : ''}`}>
      {image && <img className="phero-img" src={image} alt="" loading="eager" />}
      <div className="wrap">
        <p className="crumbs"><Link to="/">Start</Link> / {crumb}</p>
        <h1 className="h1">{typeof title === 'string' ? <Letters text={title} per={45} /> : title}</h1>
        {lead && <p className="lead">{typeof lead === 'string' ? <Letters text={lead} per={14} max={1400} delay={500} /> : <Brandify>{lead}</Brandify>}</p>}
        {children}
      </div>
    </section>
  )
}
