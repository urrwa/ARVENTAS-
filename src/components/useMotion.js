import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches

/** Run a GSAP setup scoped to a ref; auto-reverts on unmount. Skipped under reduced motion. */
export function useGsap(ref, setup, deps = []) {
  useLayoutEffect(() => {
    if (!ref.current) return
    if (reducedMotion()) {
      ref.current.querySelectorAll('.rv').forEach((el) => el.classList.add('is-in'))
      return
    }
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger), ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Fade/rise reveal for every `.rv` inside the ref. */
export function revealAll(gsap, root) {
  gsap.utils.toArray('.rv', root).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
    )
  })
}

export { gsap, ScrollTrigger }
