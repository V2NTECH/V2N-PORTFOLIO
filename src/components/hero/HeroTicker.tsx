import { useLayoutEffect, useMemo, useRef, useState } from 'react'

const brands = [
  'Urgente',
  'NIAJ',
  'Fazendo Comuns',
  'Canil da bela vista',
  'V2N Finance',
] as const

type TickerItem = { key: string; name: (typeof brands)[number] }

function buildItems(repeatSets: number): TickerItem[] {
  return Array.from({ length: repeatSets }, (_, setIndex) =>
    brands.map((name) => ({
      key: `${setIndex}-${name}`,
      name,
    })),
  ).flat()
}

export function HeroTicker() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLUListElement>(null)
  const [repeatSets, setRepeatSets] = useState(4)

  const items = useMemo(() => buildItems(repeatSets), [repeatSets])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const measure = measureRef.current
    const track = trackRef.current
    const strip = stripRef.current
    if (!viewport || !measure || !track || !strip) return

    const sync = () => {
      const vpWidth = viewport.offsetWidth
      const setWidth = measure.offsetWidth
      if (vpWidth < 1 || setWidth < 1) return

      /* Pelo menos 2× a viewport por faixa para nunca aparecer buraco */
      const needed = Math.max(3, Math.ceil((vpWidth * 2.25) / setWidth))
      setRepeatSets((prev) => (prev === needed ? prev : needed))

      const shift = strip.offsetWidth
      track.style.setProperty('--marquee-shift', `-${shift}px`)
      const duration = Math.max(28, Math.min(90, shift / 45))
      track.style.setProperty('--marquee-duration', `${duration}s`)
    }

    sync()

    const ro = new ResizeObserver(sync)
    ro.observe(viewport)
    ro.observe(measure)
    ro.observe(strip)

    return () => ro.disconnect()
  }, [repeatSets, items])

  return (
    <div
      className="hero-ticker-wrap absolute right-0 bottom-0 left-0 z-20 overflow-hidden py-5 sm:py-6"
      aria-hidden
    >
      <ul ref={measureRef} className="hero-ticker__strip hero-ticker__strip--measure">
        {brands.map((name) => (
          <li key={`m-${name}`} className="hero-ticker__item">
            <span>{name}</span>
            <span className="hero-ticker__dot" />
          </li>
        ))}
      </ul>

      <div ref={viewportRef} className="hero-ticker-viewport">
        <div ref={trackRef} className="hero-ticker-track">
          <ul ref={stripRef} className="hero-ticker__strip">
            {items.map((item) => (
              <li key={`a-${item.key}`} className="hero-ticker__item">
                <span>{item.name}</span>
                <span className="hero-ticker__dot" />
              </li>
            ))}
          </ul>
          <ul className="hero-ticker__strip" aria-hidden>
            {items.map((item) => (
              <li key={`b-${item.key}`} className="hero-ticker__item">
                <span>{item.name}</span>
                <span className="hero-ticker__dot" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
