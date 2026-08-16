import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fade + rise reveal, staggered, fired once when the target enters the viewport. */
export function revealUp(
  targets: gsap.TweenTarget,
  opts: { stagger?: number; delay?: number; trigger?: Element | string; start?: string } = {},
) {
  if (reducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 })
    return
  }
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: opts.stagger ?? 0,
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger: opts.trigger ?? (targets as Element),
      start: opts.start ?? 'top 85%',
      once: true,
    },
  })
}

/** Animates a number counting up when the element scrolls into view. */
export function countUp(
  el: Element,
  target: number,
  opts: { suffix?: string; prefix?: string; duration?: number; trigger?: Element } = {},
) {
  const obj = { val: 0 }
  const write = () => {
    el.textContent = `${opts.prefix ?? ''}${Math.round(obj.val)}${opts.suffix ?? ''}`
  }
  if (reducedMotion()) {
    obj.val = target
    write()
    return
  }
  gsap.to(obj, {
    val: target,
    duration: opts.duration ?? 1.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: opts.trigger ?? el,
      start: 'top 85%',
      once: true,
    },
    onUpdate: write,
  })
}

/** Draws an SVG line/path via stroke-dashoffset when it enters the viewport (or immediately). */
export function drawPath(
  path: SVGPathElement | SVGPathElement[],
  opts: { trigger?: Element | string; immediate?: boolean; duration?: number; delay?: number } = {},
) {
  const paths = Array.isArray(path) ? path : [path]
  if (reducedMotion()) {
    paths.forEach((p) => p.style.strokeDashoffset = '0')
    return
  }
  paths.forEach((p) => {
    const len = p.getTotalLength()
    p.style.strokeDasharray = `${len}`
    p.style.strokeDashoffset = `${len}`
  })
  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: opts.duration ?? 1.6,
    ease: 'power2.inOut',
    delay: opts.delay ?? 0,
    stagger: 0.15,
    scrollTrigger: opts.immediate
      ? undefined
      : {
          trigger: opts.trigger ?? (paths[0] as unknown as Element),
          start: 'top 80%',
          once: true,
        },
  })
}

export { gsap, ScrollTrigger }
