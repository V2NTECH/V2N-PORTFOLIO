import { useRef } from 'react'
import { projects } from '../../data/projects'
import { ProjectSlide } from './ProjectSlide'
import { ProjectsIntroSlide } from './ProjectsIntroSlide'
import { useProjectsPinnedScroll } from './useProjectsPinnedScroll'
import '../../styles/about.css'
import '../../styles/projects.css'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 4) % 100}%`,
  delay: i * 0.7,
  duration: 12 + (i % 6),
  size: 2 + (i % 2),
}))

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useProjectsPinnedScroll({
    container: containerRef,
    pin: pinRef,
    deck: deckRef,
    header: headerRef,
    bg: bgRef,
    glow: glowRef,
    fog: fogRef,
    progress: progressRef,
  })

  return (
    <section
      ref={containerRef}
      className="projects-pin"
      id="projetos"
      aria-label="Projetos V2N"
    >
      <div ref={pinRef} className="projects-pin__viewport">
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

        <div ref={headerRef} className="projects-pin__header">
          <p className="projects-pin__label">Showcase</p>
          <p className="projects-pin__hint">Role para o próximo</p>
        </div>

        <div className="ceo-pin__progress-track" aria-hidden>
          <div ref={progressRef} className="ceo-pin__progress-bar" />
        </div>

        <div ref={deckRef} className="projects-pin__deck">
          <ProjectsIntroSlide />
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
