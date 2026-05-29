import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ContactRefs = {
  section: RefObject<HTMLElement | null>
  intro: RefObject<HTMLDivElement | null>
  form: RefObject<HTMLFormElement | null>
  footer: RefObject<HTMLElement | null>
  glow: RefObject<HTMLDivElement | null>
}

export function useContactAnimations(refs: ContactRefs) {
  useLayoutEffect(() => {
    const { section, intro, form, footer, glow } = refs
    if (!section.current || !intro.current || !form.current) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const introItems = gsap.utils.toArray<HTMLElement>(
      '[data-contact-reveal]',
      intro.current,
    )
    const formItems = gsap.utils.toArray<HTMLElement>(
      '[data-contact-reveal]',
      form.current,
    )

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([...introItems, ...formItems], { opacity: 1, y: 0, filter: 'none' })
        return
      }

      gsap.set([...introItems, ...formItems], {
        opacity: 0,
        y: 36,
        filter: 'blur(10px)',
      })

      if (footer.current) {
        gsap.set(footer.current, { opacity: 0, y: 20 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top 72%',
          end: 'top 25%',
          scrub: 1.1,
        },
      })

      tl.to(introItems, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.08,
        ease: 'power3.out',
        duration: 0.6,
      }).to(
        formItems,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.06,
          ease: 'power3.out',
          duration: 0.55,
        },
        0.12,
      )

      if (footer.current) {
        gsap.to(footer.current, {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer.current,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 1,
          },
        })
      }

      if (glow.current) {
        gsap.to(glow.current, {
          opacity: 0.55,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        })
      }
    }, section)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
