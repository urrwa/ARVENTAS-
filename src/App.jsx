import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { ConsentProvider } from './components/Consent.jsx'
import { MenuProvider, useMenu } from './components/MenuContext.jsx'
import MenuPanel from './components/MenuPanel.jsx'
import Home from './pages/Home.jsx'
import Owners from './pages/Owners.jsx'
import InvestorsPage from './pages/Investors.jsx'
import InvestorCircle from './pages/InvestorCircle.jsx'
import ReportPage from './pages/ReportPage.jsx'
import About from './pages/About.jsx'
import Partners from './pages/Partners.jsx'
import Knowledge from './pages/Knowledge.jsx'
import Article from './pages/Article.jsx'
import Contact from './pages/Contact.jsx'
import { Impressum, Datenschutz } from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

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

function Shell() {
  const { pathname, hash } = useLocation()
  const { open } = useMenu()
  const main = useRef(null)
  useReveal(pathname)
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
