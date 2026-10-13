export default function Kpis({ items = [] }) {
  return (
    <div className="kpis rv">
      {items.map((k, i) => (
        <div className="kpi" key={i}>
          <div className="kpi__value">{k.value}</div>
          <div className="kpi__label">{k.label}</div>
        </div>
      ))}
    </div>
  )
}
