import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import Strategy from './pages/Strategy.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* "/" is a placeholder: the homepage is designed separately (Scroll Site Generator). */}
        <Route path="/" element={<Home />} />
        <Route path="/strategie" element={<Strategy />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
