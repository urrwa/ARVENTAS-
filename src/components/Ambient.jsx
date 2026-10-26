import { useMemo } from 'react'

// Ruhiger Hintergrund wie in der Landingpage: tiefer Navy-Verlauf, weiche Lichtfelder und feine, geschwungene Linien. Liegt fest hinter allem und steht still.
function curve(cx, cy, r0, amp, freq, ph, a0, a1) {
  const pts = []
  for (let k = 0; k <= 72; k++) {
    const a = a0 + (a1 - a0) * k / 72
    const r = r0 + amp * Math.sin(freq * a + ph) + amp * 0.45 * Math.sin(freq * 2.3 * a + ph * 1.7)
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let k = 1; k < pts.length - 1; k++) {
    const [x, y] = pts[k], [x2, y2] = pts[k + 1]
    d += ` Q${x.toFixed(1)} ${y.toFixed(1)} ${((x + x2) / 2).toFixed(1)} ${((y + y2) / 2).toFixed(1)}`
  }
  const l = pts[pts.length - 1]
  return d + ` L${l[0].toFixed(1)} ${l[1].toFixed(1)}`
}

export default function Ambient() {
  const { upper, lower } = useMemo(() => ({
    upper: Array.from({ length: 9 }, (_, i) => curve(1720, -240, 520 + i * 92, 18 + i * 3, 3.2, i * 0.55, Math.PI * 0.42, Math.PI * 1.08)),
    lower: Array.from({ length: 7 }, (_, i) => curve(-260, 1280, 560 + i * 104, 20 + i * 2.5, 2.6, 1.2 + i * 0.4, Math.PI * 1.45, Math.PI * 2.08)),
  }), [])
  return (
    <div className="ambient" aria-hidden="true">
      <div className="amb-base" />
      <i className="amb-f amb-blue" />
      <i className="amb-f amb-steel" />
      <i className="amb-f amb-champ" />
      <i className="amb-f amb-deep" />
      <svg className="amb-lines" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <g className="amb-up">{upper.map((d, i) => <path key={i} d={d} style={{ opacity: 0.16 + (i % 3) * 0.05 }} />)}</g>
        <g className="amb-lo">{lower.map((d, i) => <path key={i} d={d} style={{ opacity: 0.12 + (i % 2) * 0.05 }} />)}</g>
      </svg>
      <div className="amb-vig" />
    </div>
  )
}
