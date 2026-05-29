import { useRef } from 'react'
import logoBranca from '../../assets/img/logoBranca.png'
import { ContactForm } from './ContactForm'
import { useContactAnimations } from './useContactAnimations'
import '../../styles/about.css'
import '../../styles/contact.css'

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 15 + 3) % 100}%`,
  delay: i * 0.8,
  duration: 13 + (i % 5),
  size: 2 + (i % 2),
}))

const channels = [
  {
    label: 'E-mail',
    value: 'contato@v2n.dev',
    href: 'mailto:contato@v2n.dev',
  },
  {
    label: 'WhatsApp',
    value: '+55 (11) 99999-9999',
    href: 'https://wa.me/5511999999999',
  },
  {
    label: 'Instagram',
    value: '@v2n.agencia',
    href: 'https://instagram.com',
  },
] as const

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useContactAnimations({
    section: sectionRef,
    intro: introRef,
    form: formRef,
    footer: footerRef,
    glow: glowRef,
  })

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact__bg ceo-pin__bg" aria-hidden>
        <div className="ceo-pin__bg-solid" />
        <div className="ceo-pin__fog" />
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

      <div className="contact__inner">
        <div ref={introRef} className="contact__intro">
          <p className="contact__eyebrow" data-contact-reveal>
            Vamos conversar
          </p>
          <h2 id="contact-title" className="contact__title text-gradient-01" data-contact-reveal>
            Contato
          </h2>
          <p className="contact__text" data-contact-reveal>
            Conte sua ideia — app, site, sistema ou automação. A V2N transforma
            complexidade em experiências digitais elegantes e performáticas.
          </p>

          <ul className="contact__channels">
            {channels.map((channel) => (
              <li key={channel.label} data-contact-reveal>
                <a href={channel.href} className="contact__channel" target="_blank" rel="noreferrer">
                  <span className="contact__channel-label">{channel.label}</span>
                  <span className="contact__channel-value">{channel.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm formRef={formRef} />
      </div>

      <footer ref={footerRef} className="contact__footer">
        <img
          src={logoBranca}
          alt="V2N Agência"
          className="contact__footer-logo"
          width={40}
          height={36}
          draggable={false}
        />
        <p className="contact__footer-copy">
          © {new Date().getFullYear()} V2N Agência. Todos os direitos reservados.
        </p>
      </footer>
    </section>
  )
}
