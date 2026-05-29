import '../../styles/hero.css'
import { HeroNav } from './HeroNav'
import { HeroRibbon } from './HeroRibbon'
import { HeroTicker } from './HeroTicker'

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 0.5L8.57 5.18L13.5 5.18L9.47 8.14L11.04 12.82L7 9.86L2.96 12.82L4.53 8.14L0.5 5.18L5.43 5.18L7 0.5Z"
        fill="#F59E0B"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="hero relative flex min-h-svh flex-col overflow-hidden">
      <div className="hero__bg-base pointer-events-none absolute inset-0" />
      <div className="hero__bg-gradient pointer-events-none absolute inset-0" />
      <div className="hero__bg-rays pointer-events-none absolute inset-0" />
      <div className="hero__bg-spotlight pointer-events-none absolute inset-0" />
      <div className="hero__bg-vignette pointer-events-none absolute inset-0" />
      <div className="hero__bg-grain pointer-events-none absolute inset-0" />

      <HeroRibbon />
      <HeroNav />

      <div className="hero-content relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-32 pb-28 text-center sm:px-8 sm:pt-36 sm:pb-32">
        <span className="hero-badge hero-enter hero-enter--1 glass-panel mb-7 inline-flex items-center rounded-full px-5 py-2 text-[10px] font-semibold tracking-[0.22em] text-v2n-ice/90 uppercase sm:mb-9 sm:text-[11px]">
          V2N AGENCIA
        </span>

        <h1 className="hero-headline hero-enter hero-enter--2 max-w-[17ch] text-[clamp(1.75rem,5.8vw,3.35rem)] leading-[1.05] font-bold tracking-[-0.03em] uppercase">
          <span className="text-gradient-01 block">
            O futuro do desenvolvimento
            <br />
            é humano{' '}
            <span className="hero-headline__accent">+ AI</span>
          </span>
        </h1>

        <p className="hero-sub hero-enter hero-enter--3 mt-6 max-w-[44ch] text-[0.9375rem] leading-[1.65] font-light text-v2n-ice/75 sm:mt-7 sm:text-base">
          Do design ao código, a v2n cria o app, site ou automação que vai
          impulsionar os seus resultados.
        </p>

        <div className="hero-cta-wrap hero-enter hero-enter--4 mt-9 sm:mt-11">
          <a href="#orcamento" className="hero-cta glass-panel inline-flex rounded-full px-9 py-3.5 text-sm font-medium tracking-[0.02em] text-v2n-ice sm:px-11 sm:py-4">
            Faça seu orçamento
          </a>
        </div>

        <div className="hero-trust hero-enter hero-enter--5 mt-8 flex flex-col items-center gap-2.5 sm:mt-10">
          <div
            className="hero-trust__stars flex items-center gap-1"
            aria-label="5 estrelas"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <p className="text-[9px] font-medium tracking-[0.24em] text-v2n-ice/45 uppercase sm:text-[10px]">
            Empresas que confiam na V2N
          </p>
        </div>
      </div>

      <HeroTicker />
    </section>
  )
}
