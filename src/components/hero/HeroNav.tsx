import logoBranca from '../../assets/img/logoBranca.png'

type NavLink = { label: string; href: string; active?: boolean }

const navLinks: NavLink[] = [
  { label: 'Home', href: '#', active: true },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Liderança', href: '#quem-somos' },
  { label: 'Projetos', href: '#projetos' },
]

export function HeroNav() {
  const left = navLinks.slice(0, 2)
  const right = navLinks.slice(2)

  return (
    <nav
      className="glass-nav hero-enter hero-enter--nav absolute top-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-0.5 rounded-full px-2 py-1.5 sm:top-8 sm:gap-1 sm:px-2.5"
      aria-label="Navegação principal"
    >
      <div className="flex items-center">
        {left.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={
              item.active
                ? 'hero-nav__link hero-nav__link--active'
                : 'hero-nav__link'
            }
            aria-current={item.active ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        href="/"
        className="mx-2 flex h-10 w-10 shrink-0 items-center justify-center sm:mx-3 sm:h-11 sm:w-11"
        aria-label="V2N Agência — início"
      >
        <img
          src={logoBranca}
          alt=""
          className="hero-nav__logo h-7 w-auto object-contain sm:h-8"
          width={36}
          height={32}
          draggable={false}
        />
      </a>

      <div className="flex items-center">
        {right.map((item) => (
          <a key={item.label} href={item.href} className="hero-nav__link">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
