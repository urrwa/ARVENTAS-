import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Ctx = createContext({ open: false, setOpen() {} })
export const useMenu = () => useContext(Ctx)

// Push-Menü: Zustand und Seitenklasse. Beim Öffnen wird die Seite nach links geschoben (CSS, global.css),
// das Scrollen der Seite ist gesperrt, der Seiteninhalt ist währenddessen nicht bedienbar (inert).
export function MenuProvider({ children }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>
}
