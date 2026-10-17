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

// The homepage (3D scroll film) is the static page public/home.html, served at "/" by vercel.json.
// Client-side navigation to "/" must hit the server for a full page load.
function ToHome() {
  useEffect(() => {
    if (import.meta.env.PROD) window.location.replace('/')
  }, [])
  return import.meta.env.PROD ? null : <Home />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* "/" is a placeholder: the homepage is designed separately (Scroll Site Generator). */}
        <Route path="/" element={<ToHome />} />
        <Route path="/strategie" element={<Strategy />} />
        <Route path="*" element={<ToHome />} />
      </Routes>
    </>
  )
}
