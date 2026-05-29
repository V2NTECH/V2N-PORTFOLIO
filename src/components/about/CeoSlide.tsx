import type { Ceo } from '../../data/ceos'

type CeoSlideProps = {
  ceo: Ceo
  index: number
  total: number
}

function StackIcon({ label }: { label: string }) {
  return (
    <span className="ceo-slide__stack-icon" title={label}>
      <span className="ceo-slide__stack-letter" aria-hidden>
        {label.slice(0, 2).toUpperCase()}
      </span>
      <span className="ceo-slide__stack-tooltip">{label}</span>
    </span>
  )
}

function SocialIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export function CeoSlide({ ceo, index, total }: CeoSlideProps) {
  const indexLabel = String(index + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')

  return (
    <article
      className="ceo-pin__slide ceo-slide"
      data-ceo-slide={index}
      aria-label={`Perfil de ${ceo.name}`}
      aria-hidden
    >
      <span className="ceo-slide__index" aria-hidden>
        {indexLabel}
        <span className="ceo-slide__index-sep">/</span>
        {totalLabel}
      </span>

      <div className="ceo-slide__stage">
        <div className="ceo-slide__name-wrap" data-ceo-part="name">
          <span
            className="ceo-slide__name-bg"
            data-length={ceo.name.length > 8 ? 'long' : undefined}
            aria-hidden
          >
            {ceo.name.toUpperCase().split('').map((char, i) => (
              <span key={`${ceo.id}-${char}-${i}`} className="ceo-slide__name-char">
                {char}
              </span>
            ))}
          </span>
        </div>

        <div className="ceo-slide__photo-wrap" data-ceo-part="photo">
          <img
            src={ceo.image}
            alt={ceo.name}
            className="ceo-slide__photo"
            loading={index === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        </div>

        <div className="ceo-slide__role" data-ceo-part="role">
          <span className="ceo-slide__role-line">{ceo.roleLines[0]}</span>
          <span className="ceo-slide__role-line ceo-slide__role-line--accent">
            {ceo.roleLines[1]}
          </span>
        </div>

        <div className="ceo-slide__ui-left" data-ceo-part="ui">
          <div className="ceo-slide__block">
            <span className="ceo-slide__label">Stacks</span>
            <div className="ceo-slide__stack-row">
              {ceo.stacks.map((stack) => (
                <StackIcon key={stack} label={stack} />
              ))}
            </div>
          </div>
          <div className="ceo-slide__block">
            <span className="ceo-slide__label">Redes Sociais</span>
            <div className="ceo-slide__social-row">
              {ceo.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="ceo-slide__social-icon"
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ceo-slide__ui-right" data-ceo-part="cta">
          <a href={ceo.siteUrl} className="ceo-slide__site-btn">
            SITE
            <svg
              className="ceo-slide__site-btn-arrow"
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
      </div>
    </article>
  )
}
