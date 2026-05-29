import { type FormEvent, type RefObject, useState } from 'react'

export function ContactForm({ formRef }: { formRef: RefObject<HTMLFormElement | null> }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <form
      ref={formRef}
      className="contact-form glass-panel"
      onSubmit={handleSubmit}
      noValidate
    >
      <p className="contact-form__label" data-contact-reveal>
        Orçamento
      </p>

      <div className="contact-form__field" data-contact-reveal>
        <label htmlFor="contact-name">Nome</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="contact-form__field" data-contact-reveal>
        <label htmlFor="contact-email">E-mail</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="contact-form__field" data-contact-reveal>
        <label htmlFor="contact-type">Tipo de projeto</label>
        <select id="contact-type" name="projectType" defaultValue="" required>
          <option value="" disabled>
            Selecione
          </option>
          <option value="app">App</option>
          <option value="site">Site</option>
          <option value="sistema">Sistema</option>
          <option value="automacao">Automação</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="contact-form__field" data-contact-reveal>
        <label htmlFor="contact-message">Mensagem</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Conte sobre o seu projeto..."
          required
        />
      </div>

      <button type="submit" className="contact-form__submit" data-contact-reveal>
        {sent ? 'Mensagem enviada' : 'Enviar mensagem'}
        {!sent && (
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
        )}
      </button>

      {sent && (
        <p className="contact-form__success">
          Obrigado! Entraremos em contato em breve.
        </p>
      )}
    </form>
  )
}
