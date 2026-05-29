import { useRef } from 'react'
import { ceos } from '../../data/ceos'
import { CeoSlide } from './CeoSlide'
import { PinIntroSlide } from './PinIntroSlide'
import { useCeoPinnedScroll } from './useCeoPinnedScroll'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 4) % 100}%`,
  delay: i * 0.7,
  duration: 12 + (i % 6),
  size: 2 + (i % 2),
}))

export function CeoPinnedShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useCeoPinnedScroll({
    container: containerRef,
    pin: pinRef,
    header: headerRef,
    bg: bgRef,
    glow: glowRef,
    fog: fogRef,
    progress: progressRef,
  })

  return (
    <section
      ref={containerRef}
      className="ceo-pin"
      id="quem-somos"
      aria-label="Quem somos e liderança V2N"
    >
      <div ref={pinRef} className="ceo-pin__viewport">
        <div ref={bgRef} className="ceo-pin__bg" aria-hidden>
          <div className="ceo-pin__bg-solid" />
          <div ref={fogRef} className="ceo-pin__fog" />
          <div ref={glowRef} className="ceo-pin__glow" />
          <div className="ceo-pin__particles">
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className="ceo-pin__particle"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>
          <div className="ceo-pin__vignette" />
        </div>

        <div ref={headerRef} className="ceo-pin__header">
          <p className="ceo-pin__label">Fundadores</p>
          <p className="ceo-pin__hint">Role para os próximos</p>
        </div>

        <div className="ceo-pin__progress-track" aria-hidden>
          <div ref={progressRef} className="ceo-pin__progress-bar" />
        </div>

        <div className="ceo-pin__slides">
          <PinIntroSlide />
          {ceos.map((ceo, index) => (
            <CeoSlide key={ceo.id} ceo={ceo} index={index} total={ceos.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
