export function ProjectsIntroSlide() {
  return (
    <article
      className="projects-pin__slide projects-pin__slide--intro"
      data-pin-slide="intro"
      aria-labelledby="projects-title"
      aria-hidden={false}
    >
      <div className="projects-pin__slide-inner">
        <p className="projects-pin__eyebrow">Showcase V2N</p>
        <h2 id="projects-title" className="projects-pin__intro-title text-gradient-01">
          Projetos
        </h2>
        <p className="projects-pin__intro-kicker">Experiências digitais premium</p>
        <div className="projects-pin__intro-text">
          <p>
            Cada projeto é uma peça de engenharia e design — apps, sites e sistemas
            construídos para resolver problemas reais com elegância e performance.
          </p>
        </div>
        <p className="projects-pin__intro-hint" aria-hidden>
          Role para explorar
        </p>
      </div>
    </article>
  )
}
