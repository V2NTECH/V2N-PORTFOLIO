import type { Project } from '../../data/projects'

type ProjectSlideProps = {
  project: Project
  index: number
  total: number
}

export function ProjectSlide({ project, index, total }: ProjectSlideProps) {
  const indexLabel = String(index + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')

  return (
    <article
      className="projects-pin__slide project-slide"
      data-project-slide={index}
      aria-label={`Projeto ${project.name}`}
      aria-hidden
    >
      <span className="project-slide__index" aria-hidden>
        {indexLabel}
        <span className="project-slide__index-sep">/</span>
        {totalLabel}
      </span>

      <div className="project-slide__stage">
        <div className="project-slide__meta" data-project-part="meta">
          <span className="project-slide__category">{project.category}</span>
          <h3 className="project-slide__title">{project.name}</h3>
          <p className="project-slide__desc">{project.description}</p>
          <ul className="project-slide__tags">
            {project.tags.map((tag) => (
              <li key={tag} className="project-slide__tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-slide__mockup-wrap" data-project-part="mockup">
          <div className="project-slide__mockup-glow" aria-hidden />
          <div className="project-slide__mockup-glass" aria-hidden />
          <img
            src={project.image}
            alt={project.name}
            className="project-slide__mockup"
            loading={index === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
          <div className="project-slide__reflection" aria-hidden />
        </div>

        <a href={project.url} className="project-slide__cta">
          Ver projeto
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  )
}
