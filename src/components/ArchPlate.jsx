import { useRef } from 'react'
import { useGsap, isMobile } from './useMotion.js'

/* Procedural architectural plates (SVG) — stand-ins until licensed photography
   of Bavarian / Baden-Württemberg buildings is dropped in. Pass `src` to use a
   real photo instead; the mask reveal and parallax stay identical. */

function windows(cols, rows, x0, y0, w, h, gx, gy, lit = []) {
  const out = []
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const on = lit.includes(r * cols + c)
      out.push(
        <rect key={`${r}-${c}`} x={x0 + c * (w + gx)} y={y0 + r * (h + gy)} width={w} height={h}
          fill={on ? '#c9a672' : '#0d0c0a'} opacity={on ? 0.85 : 1} stroke="#3a352c" strokeWidth="1.5" />
      )
    }
  return out
}

const plates = {
  altbau: (
    <>
      <rect width="800" height="1000" fill="#1c1a16" />
      <rect y="0" width="800" height="560" fill="#2a2620" />
      <path d="M120 360 400 120 680 360V1000H120z" fill="#8a7b66" />
      <path d="M120 360 400 120 680 360" fill="none" stroke="#c9b79b" strokeWidth="6" />
      <rect x="120" y="360" width="560" height="12" fill="#c9b79b" />
      {windows(4, 4, 175, 410, 70, 110, 55, 55, [1, 6, 10])}
      <rect x="120" y="940" width="560" height="60" fill="#5b5043" />
      <path d="M330 1000V860a70 70 0 0 1 140 0v140z" fill="#0d0c0a" />
      <circle cx="400" cy="250" r="34" fill="#0d0c0a" stroke="#c9b79b" strokeWidth="5" />
    </>
  ),
  multi: (
    <>
      <rect width="800" height="1000" fill="#16191a" />
      <rect x="60" y="240" width="680" height="760" fill="#6f7778" />
      <rect x="60" y="200" width="680" height="40" fill="#a2a9aa" />
      {windows(6, 6, 95, 270, 70, 90, 28, 38, [3, 8, 15, 22, 28])}
      <rect x="60" y="900" width="680" height="100" fill="#3d4344" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={95 + i * 98} y="660" width="70" height="8" fill="#202425" />)}
    </>
  ),
  mixed: (
    <>
      <rect width="800" height="1000" fill="#1a1815" />
      <rect x="40" y="320" width="440" height="680" fill="#9c9486" />
      <rect x="480" y="160" width="280" height="840" fill="#4a4741" />
      <rect x="40" y="800" width="720" height="200" fill="#26231f" />
      <rect x="70" y="830" width="380" height="170" fill="#c9a672" opacity=".35" />
      <rect x="500" y="830" width="240" height="170" fill="#c9a672" opacity=".25" />
      {windows(4, 4, 70, 350, 70, 80, 30, 30, [2, 5, 9])}
      {windows(3, 8, 505, 190, 56, 56, 28, 24, [4, 11, 17])}
    </>
  ),
  detail: (
    <>
      <rect width="800" height="1000" fill="#1d1b17" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={i * 120} y="0" width="60" height="1000" fill="#2d2a24" />
      ))}
      <path d="M0 220H800M0 440H800M0 660H800M0 880H800" stroke="#b58f63" strokeWidth="3" opacity=".7" />
      <rect x="140" y="280" width="260" height="360" fill="#0d0c0a" stroke="#b58f63" strokeWidth="6" />
      <path d="M140 640 400 280" stroke="#b58f63" strokeWidth="2" opacity=".5" />
      <rect x="470" y="450" width="200" height="420" fill="#8a7b66" />
    </>
  ),
}

export default function ArchPlate({ variant = 'altbau', wide = false, src, alt = '', className = '' }) {
  const ref = useRef(null)

  useGsap(ref, (gsap) => {
    const inner = ref.current.querySelector('.plate__inner')
    gsap.fromTo(ref.current, { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    if (!isMobile())
      gsap.fromTo(inner, { yPercent: -6, scale: 1.08 }, { yPercent: 6, scale: 1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  }, [])

  return (
    <div ref={ref} className={`plate ${wide ? 'plate--wide' : ''} ${className}`} role="img"
      aria-label={alt || 'Architektonische Darstellung'}>
      <div className="plate__inner">
        {src ? (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {plates[variant] || plates.altbau}
          </svg>
        )}
      </div>
    </div>
  )
}
