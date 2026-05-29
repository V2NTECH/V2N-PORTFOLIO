import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** ~1 viewport por slide (intro + 3 CEOs) */
const SCROLL_PER_SLIDE = 1.05

type PinnedRefs = {
  container: RefObject<HTMLElement | null>
  pin: RefObject<HTMLDivElement | null>
  header: RefObject<HTMLDivElement | null>
  bg: RefObject<HTMLDivElement | null>
  glow: RefObject<HTMLDivElement | null>
  fog: RefObject<HTMLDivElement | null>
  progress: RefObject<HTMLDivElement | null>
}

function getScrollDistance(slideCount: number) {
  return window.innerHeight * slideCount * SCROLL_PER_SLIDE
}

export function useCeoPinnedScroll(refs: PinnedRefs) {
  useLayoutEffect(() => {
    const { container, pin, header, bg, glow, fog, progress } = refs
    if (!container.current || !pin.current) return

    const slides = gsap.utils.toArray<HTMLElement>(
      '.ceo-pin__slide',
      container.current,
    )
    if (slides.length < 2) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scrollDistance = () => getScrollDistance(slides.length)

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(slides, { clearProps: 'all', opacity: 1, xPercent: 0 })
        if (header.current) gsap.set(header.current, { opacity: 1 })
        slides.forEach((s, i) => {
          s.style.visibility = i === 0 ? 'visible' : 'hidden'
          s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true')
        })
        return
      }

      const enterFrom = {
        xPercent: 115,
        opacity: 0,
        scale: 0.92,
        filter: 'blur(22px)',
      }

      const enterTo = {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        ease: 'power3.out',
      }

      const exitTo = {
        xPercent: -35,
        opacity: 0,
        scale: 0.96,
        filter: 'blur(14px)',
        ease: 'power2.inOut',
      }

      gsap.set(slides, {
        ...enterFrom,
        visibility: 'hidden',
        zIndex: 0,
      })

      gsap.set(slides[0], {
        ...enterTo,
        visibility: 'visible',
        zIndex: 1,
      })
      slides[0].setAttribute('aria-hidden', 'false')

      if (header.current) {
        gsap.set(header.current, { opacity: 0, y: -8 })
      }

      gsap.set(bg.current, { yPercent: 0 })
      gsap.set(glow.current, { opacity: 0.35 })
      gsap.set(fog.current, { opacity: 0.4 })
      gsap.set(progress.current, { scaleX: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      const segment = 1
      const enterDur = 0.85
      const exitDur = 0.45

      slides.forEach((slide, i) => {
        if (i === 0) return

        const pos = i * segment
        const prev = slides[i - 1]

        tl.to(
          prev,
          {
            ...exitTo,
            duration: exitDur,
            onStart: () => prev.setAttribute('aria-hidden', 'true'),
          },
          pos - 0.12,
        )

        tl.fromTo(
          slide,
          { ...enterFrom, visibility: 'visible', zIndex: i + 1 },
          {
            ...enterTo,
            duration: enterDur,
            onStart: () => {
              slide.setAttribute('aria-hidden', 'false')
              slides.forEach((s, j) => {
                if (j !== i) s.setAttribute('aria-hidden', 'true')
              })
              if (header.current && i >= 1) {
                gsap.to(header.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.35,
                  overwrite: 'auto',
                })
              }
            },
          },
          pos,
        )
      })

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: () => `+=${scrollDistance()}`,
        pin: pin.current,
        scrub: 1.15,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress.current) {
            gsap.set(progress.current, { scaleX: self.progress })
          }
        },
      })

      gsap.to(bg.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${scrollDistance()}`,
          scrub: 1.4,
        },
      })

      gsap.to(fog.current, {
        opacity: 0.75,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${scrollDistance()}`,
          scrub: 1.2,
        },
      })

      gsap.to(glow.current, {
        opacity: 1,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${scrollDistance()}`,
          scrub: 1.2,
        },
      })
    }, container)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
