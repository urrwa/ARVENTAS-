// Goldene Linien-Icons (24er Raster, 1.4 Strichstärke). Dekorativ, daher aria-hidden.
const P = {
  key: <><circle cx="8" cy="12" r="3.5" /><path d="M11.5 12H21M17 12v3M20 12v2.5" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  hand: <><path d="M3 12l4-3 4 1 3-2 5 4-5 5-4 1-7-3z" /><path d="M7 9l4 4" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r=".8" /></>,
  building: <><path d="M5 21V4h9v17M14 9h5v12M2 21h20M8 8h3M8 12h3M8 16h3" /></>,
  shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6" /></>,
}
export default function Icon({ name, size = 22 }) {
  return <svg className="ico" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[name]}</svg>
}
