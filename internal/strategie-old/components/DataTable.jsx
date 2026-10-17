export default function DataTable({ head = [], rows = [], emptyRows = 0 }) {
  const body = rows.length ? rows : Array.from({ length: emptyRows }, () => head.map(() => '—'))
  return (
    <div className="tablewrap rv">
      <table className="data stack">
        <thead><tr>{head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
        <tbody>
          {body.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j} data-label={head[j]}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
