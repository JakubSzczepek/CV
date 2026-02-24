import { useLanguage } from '../context/LanguageContext'
import { IconEmailContact, IconGitHub, IconLinkedIn } from './Icons'

export default function Contact() {
  const { data } = useLanguage()
  const ui = data?.ui ?? {}
  const contact = ui.contact ?? {}
  const personal = data?.personal ?? {}
  const socialLinks = personal.social_links ?? {}

  return (
    <section className="contact section" id="contact">
      <div className="contact__container container">
        <div className="contact__content card">
          <h2 className="contact__title">{contact.title}</h2>
          <p className="contact__description">{contact.description}</p>

          <div className="contact__actions">
            <a
              href={`mailto:${personal.email ?? 'contact@example.com'}`}
              className="btn btn--primary btn--large"
            >
              <IconEmailContact size={24} />
              <span>{contact.email}</span>
            </a>
          </div>

          <div className="contact__social" id="contact-social-links">
            {socialLinks.github && (
              <a href={socialLinks.github} className="icon-btn icon-btn--large" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <IconGitHub size={28} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} className="icon-btn icon-btn--large" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <IconLinkedIn size={28} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
