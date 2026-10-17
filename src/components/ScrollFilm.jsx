import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Scroll-gesteuerter Architekturfilm (Bildsequenz auf Canvas), wie in der freigegebenen Vorversion.
// Die Frames stammen aus dem bereitgestellten Clip (KI-generierte Illustration, kein ARVENTAS-Projekt).
// Zeitpunkte der Einblendungen (Sekunden im Quellfilm):
const CAPS = [
  { id: 'open', kind: 'open', at: [0, 5] },
  { id: 'zugang', at: [6.5, 20] },
  { id: 'analyse', at: [25.5, 37] },
  { id: 'matching', at: [43.5, 70] },
  { id: 'begleitung', at: [74, 103] },
  { id: 'close', kind: 'close', at: [107, 200] },
]
const BEHIND = 8, AHEAD = 20, PACK = 30
// Artefakt-Variante (nur zur Ansicht in Claude): relative Pfade und Frame-Pakete statt Einzeldateien.
const ART = !!import.meta.env.VITE_ARTIFACT
const BASE = ART ? '' : '/'
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export default function ScrollFilm() {
  const root = useRef(null)
  const cv = useRef(null)
  const curtain = useRef(null)
  const bar = useRef(null)
  const word = useRef(null)
  const stage = useRef(null)

  useEffect(() => {
    let dead = false
    const cleanups = []
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const rootEl = root.current, canvas = cv.current, ctx = canvas.getContext('2d', { alpha: false })
    const capEls = {}
    CAPS.forEach((c) => { capEls[c.id] = rootEl.querySelector('#c-' + c.id) })
    document.body.classList.add('lock')
    document.documentElement.classList.add('lock')
    const unlock = () => { document.body.classList.remove('lock'); document.documentElement.classList.remove('lock') }
    cleanups.push(unlock)

    let T = [], N = 0
    const blobs = {}, bitmaps = {}, pending = {}, pk = {}, pinf = {}
    let active = 0, target = 0, cur = 0, raf = 0, last = -1, started = false, ready = false
    const SET = innerWidth <= 860 ? 'sm' : 'lg'
    const url = (i) => `${BASE}frames/${SET}/f${String(i + 1).padStart(4, '0')}.webp`

    function toP(t) { let lo = 0, hi = T.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (T[m] < t) lo = m + 1; else hi = m } return lo / Math.max(1, T.length - 1) }
    function vis(p, w) { return p < w[1] ? clamp((p - w[0]) / (w[1] - w[0])) : p > w[2] ? clamp(1 - (p - w[2]) / (w[3] - w[2])) : 1 }
    function size() {
      const d = Math.min(devicePixelRatio || 1, 2), w = Math.min(Math.round(canvas.clientWidth * d), 1920)
      const h = Math.round(canvas.clientHeight * (w / canvas.clientWidth))
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; last = -1 }
    }
    function draw(b) {
      const cw = canvas.width, ch = canvas.height, s = Math.max(cw / b.width, ch / b.height), w = b.width * s, h = b.height * s
      ctx.imageSmoothingQuality = 'high'; ctx.drawImage(b, (cw - w) / 2, (ch - h) / 2, w, h)
    }
    function decode(i) {
      if (bitmaps[i] || !blobs[i] || pending[i]) return Promise.resolve()
      pending[i] = 1
      return createImageBitmap(blobs[i]).then((b) => { if (dead) b.close(); else bitmaps[i] = b }).catch(() => {}).then(() => { delete pending[i] })
    }
    function pump() {
      const c = Math.round(cur)
      for (let i = c - BEHIND; i <= c + AHEAD; i++) if (i >= 0 && i < N) decode(i)
      Object.keys(bitmaps).forEach((k) => { k = +k; if (k < c - BEHIND - 6 || k > c + AHEAD + 10) { bitmaps[k].close(); delete bitmaps[k] } })
    }
    function render() {
      const c = clamp(Math.round(cur), 0, N - 1); let i = c
      if (!bitmaps[i]) for (let d = 1; d <= 12; d++) { if (bitmaps[c - d]) { i = c - d; break } if (bitmaps[c + d]) { i = c + d; break } }
      if (bitmaps[i] && i !== last) { draw(bitmaps[i]); last = i }
    }
    const prog = () => { const r = rootEl.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)) }
    function caps(p) {
      CAPS.forEach((c) => {
        const v = vis(p, c.w), s = c.el.style
        s.opacity = v; s.visibility = v < 0.01 ? 'hidden' : 'visible'
        s.transform = `translate3d(0,${(1 - v) * 24}px,0)`; s.pointerEvents = v > 0.5 ? 'auto' : 'none'
      })
    }
    function tick() {
      raf = 0; const d = target - cur
      cur = Math.abs(d) < 0.02 ? target : cur + d * 0.14
      pump(); render(); caps(clamp(cur / (N - 1)))
      if (cur !== target) raf = requestAnimationFrame(tick)
    }
    const kick = () => { target = prog() * (N - 1); if (!raf) raf = requestAnimationFrame(tick) }
    function loadPack(p) {
      pinf[p] = 1; active++
      const done = () => {
        active--; delete pinf[p]
        if (!started && pk[0]) { started = true; begin() }
        next()
      }
      if (ART) {
        fetch(`${BASE}frames/${SET === 'sm' ? 'sm_p' : 'p'}${String(p).padStart(2, '0')}.json`).then((r) => r.json()).then((arr) => {
          arr.forEach((s, k) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let j = 0; j < bin.length; j++) u[j] = bin.charCodeAt(j); blobs[p * PACK + k] = new Blob([u], { type: 'image/webp' }) })
          pk[p] = 1
        }).catch(() => {}).then(done)
        return
      }
      const ps = []
      for (let k = 0; k < PACK; k++) {
        const i = p * PACK + k; if (i >= N) break
        ps.push(fetch(url(i)).then((r) => r.blob()).then((b) => { blobs[i] = b }).catch(() => {}))
      }
      Promise.all(ps).then(() => { pk[p] = 1 }).then(done)
    }
    function next() {
      if (dead) return
      const NP = Math.ceil(N / PACK)
      while (active < 3) {
        let best = -1, bd = 1e9; const cp = Math.floor(Math.round(cur) / PACK)
        for (let p = 0; p < NP; p++) { if (pk[p] || pinf[p]) continue; const d = p >= cp ? p - cp : (cp - p) * 3; if (d < bd) { bd = d; best = p } }
        if (best < 0) return
        loadPack(best)
      }
    }
    function begin() {
      cur = target = prog() * (N - 1)
      const ps = []; for (let k = 0; k < AHEAD; k++) ps.push(decode(clamp(Math.round(cur) + k, 0, N - 1)))
      Promise.all(ps).then(() => { if (dead) return; size(); render(); caps(prog()); ready = true })
    }

    // ---------- Intro: Ladelinie, dann Vorhang ----------
    function intro() {
      const stg = stage.current, cur_ = curtain.current, bar_ = bar.current, word_ = word.current
      if (reduce) { cur_.style.display = 'none'; stg.classList.add('live'); window.__introDone = true; window.dispatchEvent(new Event('arventas:intro')); unlock(); return }
      const t0 = performance.now(), MIN = 1200, W = 110
      const load = (now) => {
        if (dead) return
        let p = Math.min(1, (now - t0) / MIN); if (!ready) p = Math.min(p, 0.92)
        bar_.style.width = p * W + 'px'
        if (p < 1 || !ready) { requestAnimationFrame(load); return }
        word_.parentNode.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, delay: 150, fill: 'forwards' })
        setTimeout(() => {
          if (dead) return
          cur_.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 100% 0 0)' }], { duration: 800, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }).onfinish = () => { cur_.style.display = 'none' }
          stg.classList.add('live'); unlock(); window.__introDone = true
          window.dispatchEvent(new Event('arventas:intro'))
          try { dispatchEvent(new Event('scroll')) } catch (e) { /* ignorieren */ }
        }, 450)
      }
      requestAnimationFrame(load)
    }

    fetch(`${BASE}frames/manifest.json`).then((r) => r.json()).then((m) => {
      if (dead) return
      T = m.t; N = m.count
      CAPS.forEach((c) => {
        const a = toP(c.at[0]), b = c.at[1] >= T[T.length - 1] ? 3 : toP(c.at[1]), e = 0.012
        c.w = c.kind === 'open' ? [-1, -0.5, b - e, b] : c.kind === 'close' ? [a, a + e * 2, 2, 3] : [a, a + e, b - e, b]
        c.el = capEls[c.id]
      })
      size(); caps(0); next()
      window.addEventListener('scroll', kick, { passive: true })
      const onResize = () => { size(); last = -1; kick() }
      window.addEventListener('resize', onResize)
      cleanups.push(() => { window.removeEventListener('scroll', kick); window.removeEventListener('resize', onResize) })
    }).catch(() => { /* ohne Frames: Vorhang trotzdem öffnen */ ready = true })
    intro()

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
      Object.values(bitmaps).forEach((b) => b.close && b.close())
    }
  }, [])

  return (
    <section className="film" id="film" ref={root} aria-label="Architekturfilm: Einführung">
      <div className="stage" ref={stage}>
        <canvas ref={cv} id="cv" role="img" aria-label="Illustrativer Architekturfilm: Fassade, Wohnräume, Luftbild" />
        <div className="film-overlay" />
        <div className="cap open" id="c-open">
          <p className="eyebrow">Off-Market Immobilien · Deutschlandweit</p>
          <h1 className="h1 film-h1">Immobilien mit Potenzial.<br />Zugang mit Vorsprung.</h1>
          <p className="lead">Ausgewählte Immobilien. Fundierte Analysen. Persönlich begleitet.</p>
          <div className="btn-row">
            <Link to="/immobilie-verkaufen" className="btn btn-gold">Immobilie verkaufen <span className="arr" aria-hidden="true">→</span></Link>
            <Link to="/kapitalanlage-immobilien" className="btn btn-line">Immobilien entdecken <span className="arr" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="cap" id="c-zugang"><p className="eyebrow">01 — Zugang</p><p className="line">Immobilien abseits öffentlicher Portale.</p></div>
        <div className="cap right" id="c-analyse"><p className="eyebrow">02 — Analyse</p><p className="line">Wert, Potenzial und Risiken nachvollziehbar einordnen.</p></div>
        <div className="cap" id="c-matching"><p className="eyebrow">03 — Matching</p><p className="line">Suchprofil und Immobilieninformationen sinnvoll zusammenführen.</p></div>
        <div className="cap" id="c-begleitung"><p className="eyebrow">04 — Transaktionsbegleitung</p><p className="line">Persönlich begleitet zur fundierten Entscheidung.</p></div>
        <div className="cap close" id="c-close">
          <p className="line">Werte schaffen. Zukunft bauen.</p>
          <div className="btn-row"><a href="#zugaenge" className="btn btn-gold">Was möchten Sie bewegen? <span className="arr down" aria-hidden="true">↓</span></a></div>
        </div>
        <div className="film-note">Illustrative Visualisierung – kein ARVENTAS-Projekt</div>
        <div className="hint" aria-hidden="true"><span>Scrollen</span><i /></div>
        <div className="curtain" ref={curtain}>
          <div className="il">
            <span ref={word}><img src={`${BASE}media/arventas-logo.png`} alt="ARVENTAS" /></span>
            <i ref={bar} />
          </div>
        </div>
      </div>
    </section>
  )
}
