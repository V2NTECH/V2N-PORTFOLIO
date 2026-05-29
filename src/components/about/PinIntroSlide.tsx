export function PinIntroSlide() {
  return (
    <article
      className="ceo-pin__slide ceo-pin__slide--intro"
      data-pin-slide="intro"
      aria-labelledby="about-title"
      aria-hidden={false}
    >
      <div className="ceo-pin__slide-inner">
        <h2 id="about-title" className="ceo-pin__intro-title text-gradient-01">
          Quem Somos
        </h2>

        <p className="ceo-pin__intro-kicker">Liderança V2N</p>

        <div className="ceo-pin__intro-text">
          <p>
            A V2N nasceu da inquietação de quem não se conforma com o
            &ldquo;sempre foi feito assim&rdquo;. Fundada com o propósito de
            descomplicar e transformar o dia a dia das pessoas através da
            tecnologia, construímos soluções inteligentes, intuitivas e focadas
            na experiência do usuário.
          </p>
          <p>
            Acreditamos que a verdadeira inovação acontece quando aliamos
            excelência técnica a um profundo entendimento das necessidades
            humanas. Nosso foco é entregar apps, sites, sistemas e automações que
            não apenas resolvam problemas complexos, mas que ofereçam uma
            experiência digital limpa, ágil e acessível.
          </p>
          <p>
            Por trás de cada linha de código e de cada decisão de design, existe
            uma liderança apaixonada por construir o futuro.
          </p>
        </div>

        <p className="ceo-pin__intro-hint" aria-hidden>
          Role para continuar
        </p>
      </div>
    </article>
  )
}
