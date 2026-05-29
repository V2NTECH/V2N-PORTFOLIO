import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCROLL_PER_SLIDE = 1.15

type PinnedRefs = {
  container: RefObject<HTMLElement | null>
  pin: RefObject<HTMLDivElement | null>
  deck: RefObject<HTMLDivElement | null>
  header: RefObject<HTMLDivElement | null>
  bg: RefObject<HTMLDivElement | null>
  glow: RefObject<HTMLDivElement | null>
  fog: RefObject<HTMLDivElement | null>
  progress: RefObject<HTMLDivElement | null>
}

function getScrollDistance(slideCount: number) {
  return window.innerHeight * slideCount * SCROLL_PER_SLIDE
}

export function useProjectsPinnedScroll(refs: PinnedRefs) {
  useLayoutEffect(() => {
    const { container, pin, deck, header, bg, glow, fog, progress } = refs
    if (!container.current || !pin.current || !deck.current) return

    const slides = gsap.utils.toArray<HTMLElement>(
      '.projects-pin__slide',
      container.current,
    )
    if (slides.length < 2) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scrollDistance = () => getScrollDistance(slides.length)

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(slides, { clearProps: 'all', opacity: 1, scale: 1 })
        if (header.current) gsap.set(header.current, { opacity: 1 })
        slides.forEach((s, i) => {
          s.style.visibility = i === 0 ? 'visible' : 'hidden'
          s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true')
        })
        return
      }

      gsap.set(deck.current, { perspective: 1400, transformStyle: 'preserve-3d' })

      const enterFrom = {
        z: -320,
        y: 48,
        scale: 0.86,
        rotationX: 6,
        opacity: 0.25,
        filter: 'blur(14px)',
      }

      const enterTo = {
        z: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power3.out',
      }

      const exitTo = {
        z: -480,
        y: 64,
        scale: 0.76,
        rotationX: 10,
        opacity: 0,
        filter: 'blur(22px)',
        ease: 'power3.inOut',
      }

      gsap.set(slides, {
        ...enterFrom,
        visibility: 'hidden',
        zIndex: 0,
        transformOrigin: '50% 50%',
      })

      gsap.set(slides[0], {
        ...enterTo,
        visibility: 'visible',
        zIndex: 1,
      })
      slides[0].setAttribute('aria-hidden', 'false')

      if (header.current) {
        gsap.set(header.current, { opacity: 0, y: -10 })
      }

      gsap.set(bg.current, { yPercent: 0 })
      gsap.set(glow.current, { opacity: 0.35 })
      gsap.set(fog.current, { opacity: 0.4 })
      gsap.set(progress.current, { scaleX: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      const segment = 1
      const enterDur = 0.9
      const exitDur = 0.55

      slides.forEach((slide, i) => {
        if (i === 0) return

        const pos = i * segment
        const prev = slides[i - 1]
        const mockup = slide.querySelector('[data-project-part="mockup"]')
        const prevMockup = prev.querySelector('[data-project-part="mockup"]')

        tl.to(
          prev,
          {
            ...exitTo,
            duration: exitDur,
            onStart: () => {
              prev.setAttribute('aria-hidden', 'true')
              if (prevMockup) {
                gsap.to(prevMockup, {
                  y: 30,
                  scale: 0.92,
                  opacity: 0.4,
                  duration: exitDur,
                  ease: 'power3.in',
                })
              }
            },
          },
          pos - 0.14,
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
                  duration: 0.4,
                  overwrite: 'auto',
                })
              }
              if (mockup) {
                gsap.fromTo(
                  mockup,
                  { y: 40, scale: 0.94, opacity: 0.5 },
                  { y: 0, scale: 1, opacity: 1, duration: enterDur, ease: 'power3.out' },
                )
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
        scrub: 1.2,
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
