import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { ConsentProvider } from './components/Consent.jsx'
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
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [key])
}

function Shell() {
  const { pathname, hash } = useLocation()
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
    </>
  )
}

export default function App() {
  return (
    <ConsentProvider>
      <Shell />
    </ConsentProvider>
  )
}
