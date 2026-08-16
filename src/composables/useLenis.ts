import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let started = false

/**
 * Sets up Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger stays
 * in sync. Skipped entirely under prefers-reduced-motion — native scroll is
 * used instead.
 */
export function useLenis() {
  if (started) return { lenis }
  started = true

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return { lenis: null }
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  document.documentElement.classList.add('has-lenis')

  return { lenis }
}

export function getLenis() {
  return lenis
}
