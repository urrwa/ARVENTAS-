import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { ConsentProvider } from './components/Consent.jsx'
import { MenuProvider, useMenu } from './components/MenuContext.jsx'
import MenuPanel from './components/MenuPanel.jsx'
import Home from './pages/Home.jsx'
const Owners = lazy(() => import('./pages/Owners.jsx'))
const InvestorsPage = lazy(() => import('./pages/Investors.jsx'))
const InvestorCircle = lazy(() => import('./pages/InvestorCircle.jsx'))
const ReportPage = lazy(() => import('./pages/ReportPage.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Partners = lazy(() => import('./pages/Partners.jsx'))
const Knowledge = lazy(() => import('./pages/Knowledge.jsx'))
const Article = lazy(() => import('./pages/Article.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Impressum = lazy(() => import('./pages/Legal.jsx').then((m) => ({ default: m.Impressum })))
const Datenschutz = lazy(() => import('./pages/Legal.jsx').then((m) => ({ default: m.Datenschutz })))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Scroll-Reveal (400–700 ms, siehe global.css). Beobachtet nach jedem Routenwechsel alle neuen .rv/.tl/.tri-Elemente.
function useReveal(key) {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv:not(.in), .tl:not(.in), .tri:not(.in)')]
    if (!els.length) return
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    // Reveal startet schon vor dem Sichtbarwerden (rootMargin), damit schnelles Scrollen keine leeren Flächen zeigt.
    const pending = new Set(els)
    const show = (e) => { e.classList.add('in'); pending.delete(e); io.unobserve(e) }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) show(e.target) })
    }, { threshold: 0, rootMargin: '0px 0px 25% 0px' })
    els.forEach((e) => io.observe(e))
    // Sicherheitsnetz: Elemente, die beim schnellen Scrollen übersprungen wurden, werden nachträglich eingeblendet.
    let raf = 0
    const sweep = () => { raf = 0; pending.forEach((e) => { if (e.getBoundingClientRect().top < innerHeight * 1.25) show(e) }) }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep) }
    window.addEventListener('scroll', onScroll, { passive: true })
    sweep()
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [key])
}

// Bilder reagieren leicht auf die Mausbewegung (sanfte Parallaxe über CSS-Variablen).
function useMouseParallax() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Nur sichtbare Bilder werden direkt bewegt (kein Root-Variablenwechsel, kein globales Style-Recalc).
    const SEL = '.phero-img, .imgf img, .choose-img img, .hs-img img, .step-row img, .door img'
    const vis = new Set(), seen = new WeakSet()
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target))))
    const scan = () => document.querySelectorAll(SEL).forEach((el) => { if (!seen.has(el)) { seen.add(el); io.observe(el) } })
    scan(); const t = setInterval(scan, 1500)
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0
    const tick = () => {
      x += (tx - x) * 0.1; y += (ty - y) * 0.1
      vis.forEach((el) => { el.style.translate = `${(x * -12).toFixed(1)}px ${(y * -8).toFixed(1)}px` })
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(tick) : 0
    }
    const move = (e) => { tx = (e.clientX / window.innerWidth) * 2 - 1; ty = (e.clientY / window.innerHeight) * 2 - 1; if (!raf) raf = requestAnimationFrame(tick) }
    window.addEventListener('mousemove', move, { passive: true })
    return () => { window.removeEventListener('mousemove', move); clearInterval(t); io.disconnect(); raf && cancelAnimationFrame(raf) }
  }, [])
}

// Scroll-Geschwindigkeit als CSS-Variable (--sv: -1..1, --sa: 0..1): Bilder biegen sich beim Scrollen leicht.
function useScrollBend() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover)').matches) return
    const root = document.documentElement
    let last = window.scrollY, v = 0, raf = 0
    const tick = () => {
      const y = window.scrollY
      const target = Math.max(-1, Math.min(1, (y - last) / 38))
      last = y
      v += (target - v) * 0.14
      if (Math.abs(v) < 0.002 && Math.abs(target) < 0.002) v = 0
      root.style.setProperty('--sv', v.toFixed(4)); root.style.setProperty('--sa', Math.abs(v).toFixed(4))
      raf = v !== 0 || target !== 0 ? requestAnimationFrame(tick) : 0
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); raf && cancelAnimationFrame(raf) }
  }, [])
}

function Shell() {
  const { pathname, hash } = useLocation()
  const { open } = useMenu()
  const main = useRef(null)
  useReveal(pathname)
  useMouseParallax()
  useScrollBend()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
    // Fokusführung: nach Seitenwechsel springt der Fokus an den Seitenanfang
    main.current && main.current.focus({ preventScroll: true })
  }, [pathname, hash])
  return (
    <>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <Header />
      <div className="page" inert={open || undefined}>
      <main id="main" ref={main} tabIndex={-1} style={{ outline: 'none' }}>
        <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/immobilie-verkaufen" element={<Owners />} />
          <Route path="/kapitalanlage-immobilien" element={<InvestorsPage />} />
          <Route path="/investorenkreis" element={<InvestorCircle />} />
          <Route path="/objektreport" element={<ReportPage />} />
          <Route path="/ueber-uns" element={<About />} />
          <Route path="/partner" element={<Partners />} />
          <Route path="/wissen" element={<Knowledge />} />
          <Route path="/wissen/:slug" element={<Article />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      </div>
      <MenuPanel />
    </>
  )
}

export default function App() {
  return (
    <ConsentProvider>
      <MenuProvider>
        <Shell />
      </MenuProvider>
    </ConsentProvider>
  )
}
